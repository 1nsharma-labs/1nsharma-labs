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
  const positions = { ai:"18%", labs:"43%", products:"78%", research:"62%" };
  function selectZone(key, moveFocus = false) {
    const data = zones[key];
    if (!data) return;
    current = key;
    zoneButtons.forEach((button) => {
      const active = button.dataset.zone === key;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
      if (active && moveFocus) button.focus();
    });
    document.getElementById("zone-index").textContent = data.index;
    document.getElementById("zone-kicker").textContent = data.kicker;
    document.getElementById("zone-title").textContent = data.title;
    document.getElementById("zone-description").textContent = data.description;
    const link = document.getElementById("zone-link");
    link.href = data.href;
    link.innerHTML = data.label + " <span>↗</span>";
    player.style.left = positions[key];
  }
  zoneButtons.forEach((button) => button.addEventListener("click", () => selectZone(button.dataset.zone)));
  document.addEventListener("keydown", (event) => {
    const target = event.target;
    if (target && ["INPUT","TEXTAREA","SELECT"].includes(target.tagName)) return;
    const keys = ["ArrowLeft","ArrowRight","a","d","A","D"];
    if (!keys.includes(event.key)) return;
    const order = ["ai","labs","products","research"];
    const index = order.indexOf(current);
    const next = event.key === "ArrowLeft" || event.key.toLowerCase() === "a" ? (index + order.length - 1) % order.length : (index + 1) % order.length;
    event.preventDefault();
    selectZone(order[next]);
  });
  document.querySelectorAll(".filter").forEach((button) => button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll(".filter").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll(".project-card").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  }));
  selectZone("ai");
})();