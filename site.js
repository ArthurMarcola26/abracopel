(function () {
  const D = window.ABRA;
  const page = document.body.dataset.page || "";

  /* ---------- Ícones (traço único, estilo Lucide) ---------- */
  const ICONS = {
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    news: '<path d="M4 4h13v16H6a2 2 0 0 1-2-2z"/><path d="M17 8h3v10a2 2 0 0 1-2 2"/><path d="M8 8h5M8 12h5M8 16h3"/>',
    cap: '<path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.3c2 .8 3.5 2.6 3.5 5.7"/>',
    flame: '<path d="M12 22c4 0 7-2.8 7-6.7 0-3-1.8-5-3.5-6.8-.4 1.6-1.3 2.6-2.5 3 .4-3.5-.9-6.7-3.5-9.5-.2 3.3-2 5.4-3.6 7.3C4.8 11.6 5 13.7 5 15.3 5 19.2 8 22 12 22z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v17H6a2 2 0 0 0-2 2z"/><path d="M4 20V5"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14.5-1.5 7 5-3 5 3-1.5-7"/>',
    building: '<path d="M4 21V4h10v17M14 9h6v12M2 21h20M8 8h2M8 12h2M8 16h2"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    ext: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    pin: '<path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    wrench: '<path d="M14.7 6.3a4 4 0 0 0 5 5L21 12.6 12.6 21a2.1 2.1 0 0 1-3-3L18 9.6z"/><path d="M14.7 6.3 17 4l3 3"/>',
    plug: '<path d="M12 22v-5"/><path d="M9 8V2M15 8V2"/><path d="M6 8h12v4a6 6 0 0 1-12 0V8z"/>',
    pencil: '<path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>',
    chart: '<path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>',
    heart: '<path d="M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.7A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'
  };
  const svg = (n, cls) =>
    `<svg class="icon ${cls || ""}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ""}</svg>`;
  const hydrateIcons = (root) =>
    (root || document).querySelectorAll("[data-icon]").forEach((el) => {
      el.outerHTML = svg(el.dataset.icon, el.className);
    });

  /* ---------- Padrão de circuito (gráfico decorativo) ---------- */
  function circuit() {
    let p = "";
    const seed = [
      [40, 60, 220, 60, 220, 140, 360, 140],
      [0, 220, 120, 220, 160, 260, 340, 260, 340, 320, 520, 320],
      [600, 40, 600, 120, 700, 120, 700, 220, 860, 220],
      [900, 360, 780, 360, 740, 400, 740, 480, 620, 480],
      [120, 420, 120, 520, 260, 520, 300, 560, 480, 560],
      [980, 90, 1100, 90, 1100, 190, 1240, 190],
      [1000, 520, 1000, 440, 1120, 440, 1160, 400, 1280, 400]
    ];
    seed.forEach((s) => {
      const pts = [];
      for (let i = 0; i < s.length; i += 2) pts.push(s[i] + "," + s[i + 1]);
      p += `<polyline points="${pts.join(" ")}" fill="none" stroke="#f2dc35" stroke-opacity=".55" stroke-width="1.4"/>`;
      p += `<circle cx="${s[s.length - 2]}" cy="${s[s.length - 1]}" r="4" fill="#06166b" stroke="#f2dc35" stroke-width="1.6"/>`;
    });
    return `<svg class="circuit" viewBox="0 0 1300 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${p}</svg>`;
  }
  document.querySelectorAll("[data-circuit]").forEach((el) => el.insertAdjacentHTML("afterbegin", circuit()));

  /* ---------- Cabeçalho ---------- */
  const NAV = [
    ["quem-somos", "quem-somos.html", "Quem somos"],
    ["projetos", "projetos.html", "Projetos"],
    ["estatisticas", "estatisticas.html", "Estatísticas"],
    ["noticias", "noticias.html", "Notícias"],
    ["educacao", "educacao.html", "Concursos e educação"],
    ["selo", "selo.html", "Selo"],
    ["contato", "contato.html", "Contato"]
  ];
  const headerHTML = `
  <header class="header"><div class="container">
    <a class="brand" href="index.html" aria-label="ABRACOPEL, página inicial"><img src="assets/logo-abracopel.gif" alt="ABRACOPEL - Associação Brasileira de Conscientização para os Perigos da Eletricidade" width="106" height="62"></a>
    <nav class="nav" id="nav" aria-label="Principal">
      <button class="icon-btn navclose" id="navclose" aria-label="Fechar menu">${svg("x")}</button>
      ${NAV.map(([k, h, t]) => `<a class="link" href="${h}" ${page === k ? 'aria-current="page"' : ""}>${t}</a>`).join("")}
      <button class="icon-btn" id="opensearch" aria-label="Buscar no site">${svg("search")}</button>
      <a class="btn btn-yellow" href="seja-abracopelense.html">Seja Abracopelense</a>
    </nav>
    <button class="icon-btn burger" id="burger" aria-label="Abrir menu" aria-controls="nav" aria-expanded="false">${svg("menu")}</button>
  </div></header>
  <div class="scrim" id="scrim"></div>
  <div class="search" id="search" role="dialog" aria-modal="true" aria-label="Buscar no site">
    <button class="icon-btn close" id="closesearch" aria-label="Fechar busca">${svg("x")}</button>
    <div class="search-box">
      <label for="q" style="color:#aeb7e3">Buscar páginas e notícias</label>
      <input id="q" type="search" placeholder="Ex.: incêndio, concurso, Selo..." autocomplete="off">
      <ul class="search-results" id="results"></ul>
    </div>
  </div>`;
  const h = document.getElementById("site-header");
  if (h) h.innerHTML = '<a class="skip" href="#main">Ir para o conteúdo</a>' + headerHTML;

  /* ---------- Rodapé ---------- */
  const f = document.getElementById("site-footer");
  if (f)
    f.innerHTML = `
  <footer class="footer"><div class="container">
    <div class="cols">
      <div>
        <a class="brand" href="index.html"><img src="assets/logo-abracopel.gif" alt="ABRACOPEL" width="123" height="72"></a>
        <p>Associação civil sem fins lucrativos que trabalha para conscientizar a população brasileira, por meio da informação e da formação de profissionais, sobre os perigos da eletricidade.</p>
      </div>
      <div><h4>Institucional</h4><ul>
        <li><a href="quem-somos.html">Quem somos</a></li>
        <li><a href="projetos.html">Projetos</a></li>
        <li><a href="estatisticas.html">Estatísticas</a></li>
        <li><a href="educacao.html">Concursos e educação</a></li>
        <li><a href="selo.html">Selo ABRACOPEL</a></li>
        <li><a href="seja-abracopelense.html">Seja Abracopelense</a></li>
      </ul></div>
      <div><h4>Contato</h4><ul>
        <li><a href="noticias.html">Notícias</a></li>
        <li><a href="contato.html">Fale conosco</a></li>
        <li><a href="mailto:${D.email}">${D.email}</a></li>
        <li><a href="tel:+${D.phoneRaw}">${D.phone}</a></li>
        <li><a href="${D.siteOficial}" target="_blank" rel="noopener">Site oficial ${svg("ext")}</a></li>
      </ul></div>
      <div>
        <h4>Newsletter</h4>
        <p>Receba alertas de segurança e novidades da ABRACOPEL.</p>
        <form class="news-form" data-form="newsletter" novalidate>
          <label class="sr" for="nl" style="position:absolute;left:-999px">E-mail</label>
          <input id="nl" name="email" type="email" placeholder="seu@email.com" required>
          <button class="btn btn-navy" type="submit" aria-label="Assinar newsletter">${svg("arrow")}</button>
        </form>
        <p class="form-msg" id="nl-msg" role="status"></p>
      </div>
    </div>
    <div class="legal">
      <span>© ${new Date().getFullYear()} ABRACOPEL. Marca e logo pertencem à ABRACOPEL.</span>
      <span>Conteúdo institucional e informativo sobre segurança com eletricidade.</span>
    </div>
  </div></footer>`;

  hydrateIcons();

  /* ---------- Menu mobile ---------- */
  const nav = document.getElementById("nav"), scrim = document.getElementById("scrim"), burger = document.getElementById("burger");
  const setNav = (open) => {
    nav.classList.toggle("open", open);
    scrim.classList.toggle("on", open);
    burger.setAttribute("aria-expanded", open);
  };
  burger?.addEventListener("click", () => setNav(true));
  document.getElementById("navclose")?.addEventListener("click", () => setNav(false));
  scrim?.addEventListener("click", () => setNav(false));

  /* ---------- Busca ---------- */
  const S = document.getElementById("search"), Q = document.getElementById("q"), R = document.getElementById("results");
  const index = D.paginas.map((p) => ({ t: p.t, u: p.u, d: p.d })).concat(
    D.noticias.map((n) => ({ t: n.titulo, u: "artigo.html?id=" + n.id, d: n.cat + " · " + n.fonte }))
  );
  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  function runSearch() {
    const q = norm(Q.value.trim());
    const list = q ? index.filter((i) => norm(i.t + " " + i.d).includes(q)) : index.slice(0, 9);
    R.innerHTML = list.length
      ? list.map((i) => `<li><a href="${i.u}">${i.t}<small>${i.d}</small></a></li>`).join("")
      : '<li style="color:#aeb7e3;padding:14px 0">Nenhum resultado encontrado.</li>';
  }
  const openSearch = () => { setNav(false); S.classList.add("on"); runSearch(); Q.focus(); };
  const closeSearch = () => S.classList.remove("on");
  document.getElementById("opensearch")?.addEventListener("click", openSearch);
  document.getElementById("closesearch")?.addEventListener("click", closeSearch);
  Q?.addEventListener("input", runSearch);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeSearch(); setNav(false); } });

  /* ---------- Revelar ao rolar ---------- */
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 })
    : null;
  document.querySelectorAll(".reveal").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));

  /* ---------- Barras animadas ---------- */
  const fmt = (n) => n.toLocaleString("pt-BR");
  document.querySelectorAll("[data-bars]").forEach((box) => {
    const key = box.dataset.bars; // "ocorrencias" | "mortes"
    const rows = D.incendios.filter((r) => r[key] != null);
    const max = Math.max(...rows.map((r) => r[key]));
    box.innerHTML = rows.map((r) => `
      <div class="bar-row"><span>${r.ano}</span>
      <div class="bar-track" role="img" aria-label="${r.ano}: ${fmt(r[key])}"><div class="bar-fill ${key === "mortes" ? "y" : ""}" data-w="${(r[key] / max) * 100}"></div></div>
      <b>${fmt(r[key])}</b></div>`).join("");
    const go = () => box.querySelectorAll(".bar-fill").forEach((b) => (b.style.width = b.dataset.w + "%"));
    io ? new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { go(); o.disconnect(); } }, { threshold: 0.3 }).observe(box) : go();
  });

  /* ---------- Cartões de notícia ---------- */
  const cardNews = (n) => `
    <article class="card reveal">
      <div class="card-media news-media">${n.imagem ? `<img src="${n.imagem}" alt="${n.imagemAlt || ("Imagem relacionada: " + n.titulo)}" loading="lazy" referrerpolicy="no-referrer">` : `${circuit()}${svg("news")}`}</div>
      <div class="card-body">
        <span class="tag">${n.cat}</span>
        <h3>${n.titulo}</h3>
        <span class="meta">${n.data} · ${n.fonte}</span>
        <p>${n.resumo}</p>
        <a class="more" href="artigo.html?id=${n.id}">Ler resumo ${svg("arrow")}</a>
      </div>
    </article>`;
  const newsHome = document.getElementById("news-home");
  if (newsHome) {
    newsHome.innerHTML = D.noticias.slice(0, 3).map(cardNews).join("");
    newsHome.querySelectorAll(".reveal").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));
  }

  const newsList = document.getElementById("news-list");
  if (newsList) {
    const cats = ["Todas", ...new Set(D.noticias.map((n) => n.cat))];
    const bar = document.getElementById("news-filters");
    const draw = (c) => {
      newsList.innerHTML = D.noticias.filter((n) => c === "Todas" || n.cat === c).map(cardNews).join("");
      newsList.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
      bar.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.c === c));
    };
    bar.innerHTML = cats.map((c) => `<button class="pill" data-c="${c}" aria-pressed="false">${c}</button>`).join("");
    bar.addEventListener("click", (e) => e.target.dataset.c && draw(e.target.dataset.c));
    draw("Todas");
  }

  /* ---------- Página de artigo ---------- */
  const art = document.getElementById("article");
  if (art) {
    const id = new URLSearchParams(location.search).get("id");
    const n = D.noticias.find((x) => x.id === id) || D.noticias[0];
    document.title = n.titulo + " | ABRACOPEL";
    art.innerHTML = `
      <span class="tag">${n.cat}</span>
      <h1 style="font-size:clamp(1.8rem,3.4vw,2.6rem);margin-top:.3em">${n.titulo}</h1>
      <p class="meta">${n.data} · Fonte: ${n.fonte}</p>
      <div class="rule"></div>
      ${n.imagem ? `<figure class="article-photo"><img src="${n.imagem}" alt="${n.imagemAlt || ("Imagem relacionada: " + n.titulo)}" loading="lazy" referrerpolicy="no-referrer">${n.creditoImagem ? `<figcaption>${n.creditoImagem}</figcaption>` : ""}</figure>` : ""}
      ${n.corpo.map((p) => `<p>${p}</p>`).join("")}
      <div class="source-box">Resumo elaborado a partir de reportagem publicada por ${n.fonte}.
        <br><a href="${n.url}" target="_blank" rel="noopener">Ler a matéria original ${svg("ext")}</a></div>
      <p style="margin-top:32px"><a class="btn btn-line" href="noticias.html">${svg("arrow")} Voltar às notícias</a></p>`;
  }

  /* ---------- Formulários (prontos para integração) ----------
     Para ligar a um serviço, defina data-endpoint no <form>.
     Sem endpoint, abre o e-mail do usuário com os dados preenchidos. */
  document.querySelectorAll("form[data-form]").forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const msg = form.parentElement.querySelector(".form-msg") || form.querySelector(".form-msg");
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const data = Object.fromEntries(new FormData(form).entries());
      const endpoint = form.dataset.endpoint;
      if (endpoint) {
        try {
          const r = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
          if (!r.ok) throw 0;
          msg.textContent = "Mensagem enviada. Obrigado!"; form.reset();
        } catch { msg.textContent = "Não foi possível enviar agora. Tente novamente ou escreva para " + D.email + "."; }
        return;
      }
      const subject = form.dataset.form === "newsletter" ? "Newsletter ABRACOPEL" : (data.assunto || "Contato pelo site");
      const body = Object.entries(data).map(([k, v]) => k + ": " + v).join("\n");
      location.href = `mailto:${D.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      msg.textContent = "Abrimos seu aplicativo de e-mail com a mensagem pronta para envio.";
    });
  });
})();
