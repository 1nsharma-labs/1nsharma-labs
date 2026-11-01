(() => {
  const zones = {
    ai: { index:"01", kicker:"BUILD / AI SYSTEMS", title:"Intelligence with boundaries.", description:"Designing AI-native workflows where automation stays useful, observable, and accountable.", href:"#projects", label:"Explore projects" },
    labs: { index:"02", kicker:"EXPERIMENT / ENGINEERING LABS", title:"Make the system understandable.", description:"Software engineering, developer tooling, open-source experiments, and the infrastructure behind reliable products.", href:"https://github.com/1nsharma?tab=repositories", label:"Browse repositories" },
    products: { index:"03", kicker:"SHIP / PRODUCT WORLD", title:"Solve real operational problems.", description:"Products and prototypes across retail, solar, local-business workflows, and digital identity.", href:"#projects", label:"View selected work" },
    research: { index:"04", kicker:"DISCOVER / RESEARCH OUTPOST", title:"Explore beyond the interface.", description:"Research interests include AI alignment, explainability, cybersecurity, provenance, and emerging computing systems.", href:"https://github.com/1nsharma-labs", label:"Visit labs" }
  };
  const zoneButtons = [...document.querySelectorAll(".zone")];
  const player = document.querySelector(".player");
  let current = "ai";
  let activeFilter = "all";
  const positions = { ai:"18%", labs:"43%", products:"78%", research:"62%" };
  function selectZone(key) {
    const data = zones[key];
    if (!data) return;
    current = key;
    zoneButtons.forEach((button) => {
      const active = button.dataset.zone === key;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    document.getElementById("zone-index").textContent = data.index;
    document.getElementById("zone-kicker").textContent = data.kicker;
    document.getElementById("zone-title").textContent = data.title;
    document.getElementById("zone-description").textContent = data.description;
    const link = document.getElementById("zone-link");
    link.href = data.href;
    link.textContent = data.label + " ↗";
    player.style.left = positions[key];
  }
  zoneButtons.forEach((button) => button.addEventListener("click", () => selectZone(button.dataset.zone)));
  document.addEventListener("keydown", (event) => {
    const target = event.target;
    if (target && ["INPUT","TEXTAREA","SELECT"].includes(target.tagName)) return;
    if (!["ArrowLeft","ArrowRight","a","d","A","D"].includes(event.key)) return;
    const order = ["ai","labs","products","research"];
    const index = order.indexOf(current);
    const next = event.key === "ArrowLeft" || event.key.toLowerCase() === "a" ? (index + order.length - 1) % order.length : (index + 1) % order.length;
    event.preventDefault();
    selectZone(order[next]);
  });

  function applyFilter() {
    document.querySelectorAll(".project-card").forEach((card) => {
      card.hidden = activeFilter !== "all" && card.dataset.category !== activeFilter;
    });
  }
  document.querySelectorAll(".filter").forEach((button) => button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll(".filter").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    applyFilter();
  }));

  function element(tag, className, value) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (value !== undefined) node.textContent = value;
    return node;
  }
  function renderProjects(items) {
    const grid = document.getElementById("project-grid");
    const fragment = document.createDocumentFragment();
    items.forEach((project, index) => {
      const category = ["product","research","engineering"].includes(project.category) ? project.category : "engineering";
      const card = element("article", "project-card" + (project.featured ? " featured" : ""));
      card.dataset.category = category;
      const top = element("div", "card-top");
      top.append(element("span", "", (project.featured ? "FEATURED" : "PUBLIC REPOSITORY") + " / " + String(index + 1).padStart(2,"0")));
      top.append(element("span", "card-symbol", category === "research" ? "⌬" : category === "product" ? "✳" : "◈"));
      card.append(top);
      card.append(element("h3", "", project.name || project.fullName));
      card.append(element("p", "", project.description || "Public repository — description not provided."));
      const tags = element("div", "tag-row");
      [category.toUpperCase(), project.language, project.scope].filter(Boolean).slice(0,3).forEach((tag) => tags.append(element("span", "", String(tag).toUpperCase())));
      card.append(tags);
      const anchor = element("a", "", "Explore repository ↗");
      anchor.href = project.url;
      anchor.target = "_blank";
      anchor.rel = "noreferrer";
      card.append(anchor);
      fragment.append(card);
    });
    grid.replaceChildren(fragment);
    applyFilter();
  }
  fetch("projects.json", { cache:"no-store" })
    .then((response) => { if (!response.ok) throw new Error("Project registry unavailable"); return response.json(); })
    .then((registry) => { if (Array.isArray(registry.projects) && registry.projects.length) renderProjects(registry.projects); })
    .catch(() => { /* Keep curated HTML cards as an offline/local-preview fallback. */ });
  selectZone("ai");
})();