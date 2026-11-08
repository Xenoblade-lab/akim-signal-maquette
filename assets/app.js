(() => {
  const titles = {
    overview: "Vue d’ensemble",
    platforms: "Par plateforme",
    themes: "Thématiques & opinions",
    alerts: "Alertes",
    feed: "Publications",
    about: "À propos maquette",
    sources: "Sources de données",
    connectors: "Connecteurs & API",
    users: "Utilisateurs & rôles",
    monitor: "Monitoring technique",
    retention: "Rétention & audit",
  };

  function setView(name) {
    document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
    document.querySelectorAll(".nav-item").forEach((n) => n.classList.remove("active"));
    const view = document.getElementById(`view-${name}`);
    const nav = document.querySelector(`.nav-item[data-view="${name}"]`);
    if (view) view.classList.add("active");
    if (nav) nav.classList.add("active");
    const title = document.getElementById("page-title");
    if (title && titles[name]) title.textContent = titles[name];
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.querySelectorAll(".nav-item[data-view]").forEach((btn) => {
    btn.addEventListener("click", () => setView(btn.dataset.view));
  });

  document.querySelectorAll("[data-goto]").forEach((btn) => {
    btn.addEventListener("click", () => setView(btn.dataset.goto));
  });

  document.querySelectorAll(".pill-switch").forEach((group) => {
    group.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        group.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });
  });

  function renderBars(container, values, negIndexes = []) {
    if (!container) return;
    container.innerHTML = "";
    values.forEach((v, i) => {
      const bar = document.createElement("div");
      bar.className = "bar" + (negIndexes.includes(i) ? " neg" : "");
      bar.style.height = `${Math.max(8, v)}%`;
      bar.title = `J${i + 1} · ${v}`;
      container.appendChild(bar);
    });
  }

  renderBars(
    document.getElementById("chart-mentions"),
    [28, 34, 30, 42, 38, 55, 48, 62, 58, 70, 66, 52, 60, 74, 68, 80, 72, 64, 78, 85, 70, 60, 72, 88, 76, 69, 82, 90, 84, 78],
    [8, 17, 23]
  );

  renderBars(
    document.getElementById("chart-themes"),
    [90, 75, 62, 48, 40, 36, 28, 22],
    [3]
  );

  document.querySelectorAll(".spark").forEach((el) => {
    const vals = (el.dataset.spark || "").split(",").map(Number).filter(Boolean);
    const max = Math.max(...vals, 1);
    el.innerHTML = vals
      .map((v) => `<span style="height:${Math.round((v / max) * 100)}%"></span>`)
      .join("");
  });

  const feed = document.getElementById("full-feed");
  if (feed) {
    const items = [
      ["MK", "X", "Positif", "pos", "Emploi des jeunes : beaucoup d’échos positifs après le meeting."],
      ["JL", "Facebook", "Neutre", "neu", "Question factuelle sur le calendrier des travaux routiers."],
      ["SR", "X", "Négatif", "neg", "Critique virale sur une rumeur — à traiter en priorité com."],
      ["AN", "TikTok", "Positif", "pos", "Clip court bien reçu sur la jeunesse et la formation."],
      ["DT", "Facebook", "Négatif", "neg", "Mécontentement local sur la sécurité nocturne."],
      ["HP", "X", "Neutre", "neu", "Comparaison avec une annonce précédente — ton mesuré."],
    ];
    feed.innerHTML = items
      .map(
        ([av, plat, label, cls, text]) => `
      <div class="feed-item">
        <div class="avatar">${av}</div>
        <div>
          <div class="meta">${plat} · démo · Kinshasa</div>
          <div class="text">${text}</div>
        </div>
        <span class="badge ${cls}">${label}</span>
      </div>`
      )
      .join("");
  }
})();
