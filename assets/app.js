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
    thresholds: "Seuils d’alerte",
    users: "Utilisateurs & rôles",
    monitor: "Monitoring technique",
    retention: "Rétention & audit",
  };

  const topicPosts = {
    emploi: {
      title: "Emploi jeunes — publications liées",
      items: [
        ["MK", "X", "Positif", "pos", "« Le discours sur l’emploi des jeunes a clairement marqué. On attend les actes. »"],
        ["AN", "TikTok", "Positif", "pos", "Clip formation / stages — bons retours en commentaires."],
        ["HP", "Facebook", "Neutre", "neu", "Demande de calendrier concret pour les recrutements annoncés."],
      ],
    },
    securite: {
      title: "Sécurité urbaine — publications liées",
      items: [
        ["DT", "Facebook", "Négatif", "neg", "Mécontentement local sur la sécurité nocturne."],
        ["JL", "X", "Neutre", "neu", "Relai d’un fait divers — ton factuel, engagement moyen."],
        ["SR", "X", "Négatif", "neg", "Thread critique sur la présence policière le soir."],
      ],
    },
    infra: {
      title: "Infrastructures — publications liées",
      items: [
        ["JL", "Facebook", "Neutre", "neu", "Question sur le calendrier des travaux routiers."],
        ["MK", "X", "Positif", "pos", "Photos avant/après d’un tronçon réhabilité — bons partages."],
      ],
    },
    rumeurs: {
      title: "Rumeurs — publications liées",
      items: [
        ["SR", "X", "Négatif", "neg", "Thread critique viral — à traiter en priorité com."],
        ["HP", "X", "Neutre", "neu", "Demande de clarification officielle sur une rumeur circulante."],
        ["DT", "Facebook", "Négatif", "neg", "Commentaires en chaîne — tonalité défavorable."],
      ],
    },
    sante: {
      title: "Santé — publications liées",
      items: [
        ["AN", "Facebook", "Positif", "pos", "Mention d’une action santé communautaire bien reçue."],
        ["JL", "X", "Neutre", "neu", "Question sur l’accès aux centres de santé de proximité."],
      ],
    },
    education: {
      title: "Éducation — publications liées",
      items: [
        ["MK", "Facebook", "Positif", "pos", "Soutien aux initiatives scolaires locales."],
        ["HP", "X", "Neutre", "neu", "Comparaison avec une annonce précédente — ton mesuré."],
      ],
    },
  };

  function toast(message) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("show"), 2600);
  }

  function feedHtml(items) {
    return items
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

  function setView(name) {
    document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
    document.querySelectorAll(".nav-item").forEach((n) => n.classList.remove("active"));
    const view = document.getElementById(`view-${name}`);
    const nav = document.querySelector(`.nav-item[data-view="${name}"]`);
    if (view) view.classList.add("active");
    if (nav) nav.classList.add("active");
    const title = document.getElementById("page-title");
    if (title && titles[name]) title.textContent = titles[name];

    const addBtn = document.getElementById("btn-add-source");
    if (addBtn) addBtn.style.display = name === "sources" || !name ? "" : name === "sources" ? "" : "none";
    if (addBtn) {
      addBtn.style.display = name === "sources" ? "inline-flex" : "none";
    }

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
    feed.innerHTML = feedHtml([
      ["MK", "X", "Positif", "pos", "Emploi des jeunes : beaucoup d’échos positifs après le meeting."],
      ["JL", "Facebook", "Neutre", "neu", "Question factuelle sur le calendrier des travaux routiers."],
      ["SR", "X", "Négatif", "neg", "Critique virale sur une rumeur — à traiter en priorité com."],
      ["AN", "TikTok", "Positif", "pos", "Clip court bien reçu sur la jeunesse et la formation."],
      ["DT", "Facebook", "Négatif", "neg", "Mécontentement local sur la sécurité nocturne."],
      ["HP", "X", "Neutre", "neu", "Comparaison avec une annonce précédente — ton mesuré."],
    ]);
  }

  // Topic drill-down
  const topicDetail = document.getElementById("topic-detail");
  const topicFeed = document.getElementById("topic-feed");
  const topicTitle = document.getElementById("topic-detail-title");

  document.querySelectorAll("[data-topic]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.topic;
      const data = topicPosts[key];
      if (!data || !topicDetail) return;
      document.querySelectorAll("[data-topic]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      topicTitle.textContent = data.title;
      topicFeed.innerHTML = feedHtml(data.items);
      topicDetail.classList.add("open");
      topicDetail.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });

  const closeTopic = document.getElementById("topic-detail-close");
  if (closeTopic) {
    closeTopic.addEventListener("click", () => {
      topicDetail?.classList.remove("open");
      document.querySelectorAll("[data-topic]").forEach((b) => b.classList.remove("active"));
    });
  }

  // Exports (maquette)
  document.querySelectorAll("[data-export]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const kind = btn.dataset.export;
      toast(
        kind === "pdf"
          ? "Export PDF simulé — rapport synthèse prêt (maquette)."
          : "Export Excel simulé — indicateurs + extrait publications."
      );
    });
  });

  // Modal add source
  const modal = document.getElementById("modal-source");
  const openSource = document.getElementById("btn-add-source");
  const formSource = document.getElementById("form-add-source");

  function openModal() {
    if (!modal) return;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  if (openSource) openSource.addEventListener("click", openModal);

  document.querySelectorAll("[data-close-modal]").forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (formSource) {
    formSource.addEventListener("submit", (e) => {
      e.preventDefault();
      const value = document.getElementById("source-value")?.value?.trim();
      const platform = document.getElementById("source-platform")?.value;
      const type = document.getElementById("source-type")?.value;
      if (!value) return;
      const tbody = document.querySelector("#view-sources tbody");
      if (tbody) {
        const typeLabel = { hashtag: "Hashtag", keyword: "Mot-clé", account: "Compte", mention: "Mention" }[type] || type;
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${typeLabel}</td>
          <td><strong>${value}</strong></td>
          <td>${platform.replace(" / Twitter", "").replace("X", "X")}</td>
          <td><span class="status ok">Actif</span></td>
          <td>0</td>
          <td><button class="btn btn-ghost" style="padding:6px 10px;font-size:0.78rem" type="button">Éditer</button></td>`;
        tbody.prepend(tr);
      }
      formSource.reset();
      closeModal();
      toast(`Source « ${value} » ajoutée (maquette).`);
      setView("sources");
    });
  }

  // Thresholds
  const defaults = { volume: "2.0", negatif: "45", viral: "210" };

  function formatThreshold(key, value) {
    if (key === "volume") return `× ${Number(value).toFixed(1).replace(".", ",")}`;
    if (key === "negatif") return `${value} %`;
    return `+${value} %`;
  }

  document.querySelectorAll("[data-threshold]").forEach((input) => {
    const key = input.dataset.threshold;
    const out = document.querySelector(`[data-out="${key}"]`);
    const sync = () => {
      if (out) out.textContent = formatThreshold(key, input.value);
    };
    input.addEventListener("input", sync);
    sync();
  });

  document.getElementById("btn-save-thresholds")?.addEventListener("click", () => {
    toast("Seuils d’alerte enregistrés (maquette).");
  });

  document.getElementById("btn-reset-thresholds")?.addEventListener("click", () => {
    Object.entries(defaults).forEach(([key, value]) => {
      const input = document.querySelector(`[data-threshold="${key}"]`);
      const out = document.querySelector(`[data-out="${key}"]`);
      if (input) input.value = value;
      if (out) out.textContent = formatThreshold(key, value);
    });
    toast("Seuils réinitialisés.");
  });

  // Hide add-source outside sources view on load
  if (document.getElementById("btn-add-source")) {
    const active = document.querySelector(".nav-item.active")?.dataset.view || "sources";
    setView(active);
  }
})();
