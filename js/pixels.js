// Les trois filles en pixel qui se baladent en bas du site.
// Flavie fait des croche-pieds, Anna tire les cheveux, Anaelle met des claques.
// Cliquer sur une fille la lance sur la plus proche. Aucune donnée n'est enregistrée hormis afficher/masquer.

(function () {
  const S = 3;           // taille d'un pixel à l'écran (px)
  const GROUND = 31;     // ligne du sol, en pixels de sprite
  const H = 19;          // hauteur d'un sprite
  const W = 12;          // largeur d'un sprite
  const PREF = "pixels-off";

  // Têtes (lignes 0-8). H cheveux, S peau, E œil, C joue, M bouche.
  const HEADS = {
    anaelle: [ // carré
      "...HHHHHH...",
      "..HHHHHHHH..",
      ".HHHHHHHHHH.",
      ".HHSSSSSSHH.",
      ".HSSSSSSSSH.",
      ".HSESSSSESH.",
      ".HSCSSSSCSH.",
      ".HHSSMMSSHH.",
      ".HH..SS..HH.",
    ],
    anna: [ // queue de cheval
      "...HHHHHH.HH",
      "..HHHHHHHHHH",
      "..HHHHHHHH.H",
      "..HSSSSSSH.H",
      "..SSSSSSSS..",
      "..SESSSSES..",
      "..SCSSSSCS..",
      "...SSMMSS...",
      ".....SS.....",
    ],
    flavie: [ // cheveux longs
      "...HHHHHH...",
      "..HHHHHHHH..",
      ".HHHHHHHHHH.",
      ".HHSSSSSSHH.",
      ".HSSSSSSSSH.",
      ".HSESSSSESH.",
      ".HSCSSSSCSH.",
      ".HSSSMMSSSH.",
      ".HH..SS..HH.",
    ],
  };
  const BODY = [
    "..TTTTTTTT..",
    ".TTTTTTTTTT.",
    ".TTTTTTTTTT.",
    ".S.TTTTTT.S.",
    "...TTTTTT...",
    "...PPPPPP...",
  ];
  const LEGS = [
    ["...PP..PP...", "...PP..PP...", "...PP..PP...", "...BB..BB..."],
    ["...PP..PP...", "...PP..PP...", "...PP..BB...", "...BB......."],
    ["...PP..PP...", "...PP..PP...", "...BB..PP...", ".......BB..."],
  ];
  const LOOK = {
    anaelle: { hair: "#6b3e26", skin: "#f2cfae", pants: "#2f2f33" },
    anna:    { hair: "#2a2220", skin: "#e8b98f", pants: "#56657f" },
    flavie:  { hair: "#d9b46a", skin: "#f5d6bb", pants: "#3d3a36" },
  };
  const MOVES = {
    anaelle: { reach: 11, act: 0.7, hit: 0.25, label: "met une claque" },
    anna:    { reach: 12, act: 1.4, hit: 0.25, label: "tire les cheveux" },
    flavie:  { reach: 11, act: 0.8, hit: 0.3, label: "fait un croche-pied" },
  };
  // Bras ou jambe tendus pendant l'attaque (coordonnées côté où elle regarde).
  const ACT_PIXELS = {
    anaelle: { clear: [[10, 10], [10, 11], [10, 12]], add: [[10, 9, "T"], [11, 8, "T"], [12, 7, "T"], [13, 6, "S"], [14, 6, "S"], [13, 5, "S"], [14, 5, "S"]] },
    anna:    { clear: [[10, 10], [10, 11], [10, 12]], add: [[10, 9, "T"], [11, 8, "T"], [12, 7, "T"], [12, 6, "T"], [13, 5, "S"], [13, 4, "S"], [14, 3, "S"], [15, 2, "S"], [14, 2, "S"]] },
    flavie:  { clear: [[7, 15], [8, 15], [7, 16], [8, 16], [7, 17], [8, 17], [7, 18], [8, 18]], add: [[8, 15, "P"], [9, 16, "P"], [10, 16, "P"], [11, 17, "P"], [12, 17, "P"], [13, 17, "B"], [14, 17, "B"], [13, 18, "B"]] },
  };

  const reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function readPref() { try { return localStorage.getItem(PREF); } catch (e) { return null; } }
  function writePref(v) { try { localStorage.setItem(PREF, v); } catch (e) { /* ignoré */ } }
  let enabled = readPref() === null ? !reduced : readPref() !== "1";

  // ---------- DOM ----------
  const strip = document.createElement("div");
  strip.className = "pixel-strip";
  strip.setAttribute("aria-label", "Les trois autrices en pixel");
  const canvas = document.createElement("canvas");
  strip.appendChild(canvas);
  document.body.appendChild(strip);
  const ctx = canvas.getContext("2d");

  const toggle = document.createElement("button");
  toggle.className = "pixel-toggle";
  toggle.type = "button";
  document.querySelector(".side-foot")?.appendChild(toggle);
  toggle.addEventListener("click", () => {
    enabled = !enabled;
    writePref(enabled ? "0" : "1");
    applyEnabled();
  });

  let widthU = 100;
  function resize() {
    const r = strip.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(r.width * dpr);
    canvas.height = Math.round(r.height * dpr);
    canvas.style.width = r.width + "px";
    canvas.style.height = r.height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = false;
    widthU = Math.floor(r.width / S);
    girls.forEach(g => { g.x = Math.min(g.x, maxX()); });
  }
  const maxX = () => Math.max(0, widthU - W);

  // ---------- Filles ----------
  const rand = (a, b) => a + Math.random() * (b - a);
  const girls = TEAM.map((p, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pixel-girl";
    btn.title = `${p.short} ${MOVES[p.id].label}`;
    btn.setAttribute("aria-label", `${p.short} : ${MOVES[p.id].label}`);
    strip.appendChild(btn);
    const g = {
      id: p.id, name: p.short, color: p.color, btn,
      x: 20 + i * 45, dir: i % 2 ? -1 : 1, speed: rand(11, 15),
      state: "walk", t: rand(2, 5), walkT: 0, cd: rand(3, 7),
      target: null, hit: false, vx: 0, fallDir: 1, fallP: 0, blush: 0,
      bubble: null, bubbleT: 0,
    };
    btn.addEventListener("click", () => provoke(g, true));
    return g;
  });

  const free = g => g.state === "walk" || g.state === "idle";
  function say(g, text, t = 1.1) { g.bubble = text; g.bubbleT = t; }

  function provoke(g, forced) {
    if (!free(g)) return;
    const others = girls.filter(o => o !== g && free(o));
    if (!others.length) { if (forced) say(g, "…", 0.8); return; }
    const target = others.sort((a, b) => Math.abs(a.x - g.x) - Math.abs(b.x - g.x))[0];
    if (!forced && Math.abs(target.x - g.x) > 70) return;
    g.state = "seek"; g.target = target; g.t = 6;
  }

  function strike(g) {
    const v = g.target;
    if (g.id === "anaelle") {
      say(g, "PAF !", 0.9);
      v.state = "hurt"; v.t = 1.3; v.vx = g.dir * 34; v.blush = 1.6; v.dir = -g.dir;
      setTimeout(() => v.state === "hurt" && say(v, "aïe", 0.8), 150);
    } else if (g.id === "anna") {
      v.state = "pulled"; v.t = MOVES.anna.act - MOVES.anna.hit; v.blush = 1.4;
      say(v, "aïïïe !", 1.1);
    } else {
      v.state = "fallen"; v.t = 2.2; v.fallP = 0; v.fallDir = g.dir; v.dir = g.dir;
      say(v, "boum", 1.2);
      setTimeout(() => say(g, "oups", 0.9), 300);
    }
  }

  function update(g, dt) {
    g.cd -= dt;
    g.bubbleT -= dt; if (g.bubbleT <= 0) g.bubble = null;
    g.blush = Math.max(0, g.blush - dt);
    const m = MOVES[g.id];

    switch (g.state) {
      case "walk":
        g.x += g.dir * g.speed * dt;
        g.walkT += dt;
        g.t -= dt;
        if (g.t <= 0) {
          if (Math.random() < 0.35) { g.state = "idle"; g.t = rand(0.8, 2.5); }
          else { g.dir = Math.random() < 0.5 ? -1 : 1; g.t = rand(2, 6); }
        }
        if (g.cd <= 0) { g.cd = rand(1, 3); if (Math.random() < 0.45) provoke(g, false); }
        break;
      case "idle":
        g.t -= dt;
        if (g.t <= 0) { g.state = "walk"; g.t = rand(2, 6); if (Math.random() < 0.5) g.dir *= -1; }
        break;
      case "seek": {
        const v = g.target;
        g.t -= dt;
        if (!free(v) || g.t <= 0) { g.state = "walk"; g.t = rand(1, 3); g.target = null; break; }
        const dx = v.x - g.x;
        g.dir = Math.sign(dx) || 1;
        // Collée au bord : on se retourne pour avoir la place.
        if (Math.abs(dx) < m.reach - 1) {
          g.x -= g.dir * g.speed * 1.4 * dt; g.walkT += dt;
          if (g.x <= 0 || g.x >= maxX()) { v.x += g.dir * g.speed * 1.4 * dt; }
        } else if (Math.abs(dx) > m.reach + 1) {
          g.x += g.dir * g.speed * 1.8 * dt; g.walkT += dt;
        } else {
          g.x = Math.min(Math.max(v.x - g.dir * m.reach, 0), maxX());
          v.x = g.x + g.dir * m.reach;
          g.state = "act"; g.t = m.act; g.hit = false;
          v.state = "frozen"; v.dir = -g.dir;
        }
        break;
      }
      case "act":
        g.t -= dt;
        if (!g.hit && m.act - g.t >= m.hit) { g.hit = true; strike(g); }
        if (g.hit && g.id === "anna" && g.target.state === "pulled") {
          const nx = g.x - g.dir * 9 * dt;
          if (nx > 0 && nx < maxX()) { g.x = nx; g.target.x -= g.dir * 9 * dt; }
        }
        if (g.t <= 0) {
          if (g.target.state === "frozen") g.target.state = "walk";
          g.state = "walk"; g.t = rand(2, 4); g.cd = rand(6, 14); g.target = null;
          g.dir *= -1;
        }
        break;
      case "frozen":
        break;
      case "hurt":
      case "pulled":
        g.x += g.vx * dt; g.vx *= Math.pow(0.02, dt);
        g.t -= dt;
        if (g.t <= 0) { g.state = "idle"; g.t = rand(0.5, 1.2); g.vx = 0; }
        break;
      case "fallen":
        g.fallP = Math.min(1, g.fallP + dt / 0.22);
        g.t -= dt;
        if (g.t <= 0) { g.state = "idle"; g.t = rand(0.4, 1); g.fallP = 0; say(g, "grr", 0.8); }
        break;
    }
    if (g.x < 0) { g.x = 0; if (g.state === "walk") g.dir = 1; }
    if (g.x > maxX()) { g.x = maxX(); if (g.state === "walk") g.dir = -1; }
  }

  // ---------- Dessin ----------
  function sprite(g) {
    const moving = g.state === "walk" || g.state === "seek";
    const legs = moving ? LEGS[[0, 1, 0, 2][Math.floor(g.walkT * 7) % 4]] : LEGS[0];
    const rows = HEADS[g.id].concat(BODY, legs);
    const px = new Map();
    rows.forEach((row, r) => [...row].forEach((ch, c) => { if (ch !== ".") px.set(c + "," + r, ch); }));
    if (g.id === "flavie") [[1, 9], [10, 9], [1, 10], [10, 10]].forEach(([c, r]) => px.set(c + "," + r, "H"));
    if (g.state === "act") {
      const a = ACT_PIXELS[g.id];
      a.clear.forEach(([c, r]) => px.delete(c + "," + r));
      a.add.forEach(([c, r, ch]) => px.set(c + "," + r, ch));
    }
    if (g.state === "fallen" || g.state === "pulled") {
      px.set("2,5", "E"); px.set("9,5", "E"); // yeux plissés
    }
    return px;
  }

  function colorOf(ch, g) {
    const l = LOOK[g.id];
    switch (ch) {
      case "H": return l.hair;
      case "S": return l.skin;
      case "C": return g.blush > 0 ? "#e2756b" : l.skin;
      case "E": return "#1a1a1a";
      case "M": return "#b5574b";
      case "T": return g.color;
      case "P": return l.pants;
      case "B": return "#1f1f1f";
    }
    return null;
  }

  function drawSprite(g, ox, oy) {
    for (const [key, ch] of sprite(g)) {
      const [c, r] = key.split(",").map(Number);
      const col = g.dir > 0 ? c : W - 1 - c;
      ctx.fillStyle = colorOf(ch, g);
      ctx.fillRect((ox + col) * S, (oy + r) * S, S, S);
    }
  }

  function star(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * S, (y - 1) * S, S, S * 3);
    ctx.fillRect((x - 1) * S, y * S, S * 3, S);
  }

  let ink = "#1a1a1a", paper = "#fbfaf6", line = "#d9d4c7", tick = 0;
  function readColors() {
    const cs = getComputedStyle(document.documentElement);
    ink = cs.getPropertyValue("--text").trim() || ink;
    paper = cs.getPropertyValue("--surface").trim() || paper;
    line = cs.getPropertyValue("--line").trim() || line;
  }

  function bubble(text, cx, y) {
    ctx.font = '500 11px "DM Mono", ui-monospace, monospace';
    const w = Math.ceil(ctx.measureText(text).width) + 10;
    const x = Math.round(Math.min(Math.max(cx - w / 2, 2), widthU * S - w - 2));
    ctx.fillStyle = paper; ctx.fillRect(x, y - 15, w, 15);
    ctx.strokeStyle = ink; ctx.lineWidth = 1; ctx.strokeRect(x + 0.5, y - 14.5, w - 1, 14);
    ctx.fillStyle = ink; ctx.textBaseline = "middle"; ctx.fillText(text, x + 5, y - 7);
  }

  function draw(time) {
    if (tick++ % 60 === 0) readColors();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = line;
    ctx.fillRect(0, GROUND * S, widthU * S, 1);

    // Les victimes d'abord, l'attaquante par-dessus.
    const order = [...girls].sort((a, b) => (a.state === "act") - (b.state === "act"));
    for (const g of order) {
      const x = Math.round(g.x);
      const shake = (g.state === "pulled" || g.state === "hurt") ? (Math.floor(time / 60) % 2 ? 1 : -1) * (g.state === "pulled" ? 1 : 0) : 0;
      let headX, headY;
      if (g.state === "fallen") {
        const p = g.fallP;
        ctx.save();
        ctx.translate((x + W / 2) * S, (GROUND - 6 * p) * S);
        ctx.rotate(g.fallDir * p * Math.PI / 2);
        drawSprite(g, -W / 2, -H);
        ctx.restore();
        headX = x + W / 2 + g.fallDir * 16 * p; headY = GROUND - 8;
      } else {
        drawSprite(g, x + shake, GROUND - H);
        headX = x + W / 2; headY = GROUND - H - 1;
      }
      if (g.state === "fallen" || g.state === "hurt") {
        const a = time / 220;
        star(headX + Math.cos(a) * 6, headY - 2 + Math.sin(a) * 1.5, "#e6b84a");
        star(headX + Math.cos(a + Math.PI) * 6, headY - 2 + Math.sin(a + Math.PI) * 1.5, "#e6b84a");
      }
      g.btn.style.transform = `translate(${x * S}px, ${(GROUND - H) * S}px)`;
    }
    for (const g of girls) {
      if (!g.bubble) continue;
      const fallen = g.state === "fallen";
      const cx = (Math.round(g.x) + W / 2 + (fallen ? g.fallDir * 14 * g.fallP : 0)) * S;
      bubble(g.bubble, cx, (fallen ? GROUND - 13 : GROUND - H - 4) * S);
    }
  }

  let last = 0, raf = 0;
  function loop(time) {
    const dt = Math.min(0.05, Math.max(0, (time - last) / 1000 || 0));
    last = time;
    girls.forEach(g => update(g, dt));
    draw(time);
    raf = requestAnimationFrame(loop);
  }

  function applyEnabled() {
    strip.hidden = !enabled;
    toggle.textContent = enabled ? "cacher les filles" : "faire venir les filles";
    cancelAnimationFrame(raf);
    if (enabled) { resize(); last = performance.now(); raf = requestAnimationFrame(loop); }
  }

  window.addEventListener("resize", () => enabled && resize());
  applyEnabled();
})();
