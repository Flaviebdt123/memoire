// Stockage des données : Supabase (partagé entre les 3) ou localStorage (mode démo).
// Chaque élément = { id, kind, ...champs }. En base : table "items" (id, kind, data jsonb).

window.Store = (function () {
  const LOCAL_KEY = "memoire-items-v1";
  const items = new Map();
  const listeners = [];
  let client = null;

  const notify = () => listeners.forEach(cb => cb());

  function rowToItem(row) {
    return { ...(row.data || {}), id: row.id, kind: row.kind, updated_at: row.updated_at };
  }

  function itemToRow(item) {
    const { id, kind, updated_at, ...data } = item;
    return { id, kind, data, updated_at };
  }

  function saveLocal() {
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify([...items.values()])); } catch (e) { /* stockage indisponible */ }
  }

  function loadLocal() {
    items.clear();
    try {
      const raw = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
      raw.forEach(it => items.set(it.id, it));
    } catch (e) { /* stockage indisponible */ }
  }

  async function init() {
    const { SUPABASE_URL, SUPABASE_ANON_KEY } = window.APP_CONFIG || {};
    if (SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase) {
      client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      const { data, error } = await client.from("items").select("*");
      if (error) throw error;
      items.clear();
      data.forEach(row => items.set(row.id, rowToItem(row)));

      client
        .channel("items-changes")
        .on("postgres_changes", { event: "*", schema: "public", table: "items" }, payload => {
          if (payload.eventType === "DELETE") items.delete(payload.old.id);
          else items.set(payload.new.id, rowToItem(payload.new));
          notify();
        })
        .subscribe();
    } else {
      loadLocal();
      window.addEventListener("storage", e => {
        if (e.key === LOCAL_KEY) { loadLocal(); notify(); }
      });
    }

    for (const batch of window.SEED_BATCHES) {
      if (!items.has(batch.flag)) await seed(batch);
    }
  }

  // Chaque lot n'est ajouté qu'une fois : supprimer un élément ne le fait pas revenir.
  async function seed({ flag, items: batch }) {
    const missing = batch.filter(it => !items.has(it.id));
    const now = new Date().toISOString();
    const all = [...missing, { id: flag, kind: "meta" }].map(it => ({ ...it, updated_at: now }));
    all.forEach(it => items.set(it.id, it));
    if (client) {
      const { error } = await client.from("items").upsert(all.map(itemToRow), { onConflict: "id", ignoreDuplicates: true });
      if (error) console.error(error);
    } else saveLocal();
  }

  async function save(item) {
    const full = { ...item, id: item.id || item.kind + "-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), updated_at: new Date().toISOString() };
    items.set(full.id, full);
    notify();
    if (client) {
      const { error } = await client.from("items").upsert(itemToRow(full));
      if (error) { alert("Erreur d'enregistrement : " + error.message); console.error(error); }
    } else saveLocal();
    return full;
  }

  async function remove(id) {
    items.delete(id);
    notify();
    if (client) {
      const { error } = await client.from("items").delete().eq("id", id);
      if (error) { alert("Erreur de suppression : " + error.message); console.error(error); }
    } else saveLocal();
  }

  return {
    init,
    save,
    remove,
    get: id => items.get(id),
    all: kind => [...items.values()].filter(it => it.kind === kind),
    onChange: cb => listeners.push(cb),
    get shared() { return !!client; },
  };
})();
