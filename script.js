const users = [
  { name: "Akash", bio: "Frontend developer", role: "Frontend", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e" },
  { name: "Rahul", bio: "Backend developer", role: "Backend", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" },
  { name: "Ritik", bio: "Full stack learner", role: "Fullstack", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2" },
  { name: "Richa", bio: "Good communicator", role: "Product", img: "https://images.unsplash.com/photo-1769265114273-a0b862b53527?w=1000&auto=format&fit=crop&q=60" },
  { name: "Sarfraz", bio: "Front-end engineer", role: "Frontend", img: "https://images.unsplash.com/photo-1769540209381-fe235a5d9355?w=1000&auto=format&fit=crop&q=60" },
  { name: "Sam", bio: "QA specialist", role: "QA", img: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39" }
];

const searchInput = document.getElementById("searchInput");
const userGrid = document.getElementById("userGrid");
const stats = document.getElementById("stats");
const filterChips = document.getElementById("filterChips");
const clearBtn = document.getElementById("clearBtn");
const sortSelect = document.getElementById("sortSelect");
const fuzzyCheck = document.getElementById("fuzzyCheck");

let selectedRole = "All";
let selectedCardIndex = -1;

function clampIndex(i, max) {
  if (i < 0) return max - 1;
  if (i >= max) return 0;
  return i;
}

function formatHighlight(text, query) {
  if (!query) return text;
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return text.replace(re, "<mark class='match'>$1</mark>");
}

let currentRenderUsers = [];

function showUserDetail(user) {
  const detail = `✅ Selected: ${user.name}\nRole: ${user.role}\nBio: ${user.bio}`;
  stats.textContent = detail;
}

function updateCardSelection() {
  const cards = Array.from(userGrid.querySelectorAll(".card"));
  cards.forEach((card, i) => {
    card.classList.toggle("selected", i === selectedCardIndex);
    if (i === selectedCardIndex) {
      card.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  });
}

function renderUsers(list, query = "") {
  currentRenderUsers = list;
  selectedCardIndex = -1;
  userGrid.innerHTML = "";

  if (!list.length) {
    userGrid.innerHTML = `<div class='col-span-full text-center py-10 text-[#ccc]'>No users found. Try broader terms (e.g., "+frontend -qa", "#backend").</div>`;
    stats.textContent = "0 results";
    return;
  }

  stats.textContent = `${list.length} result${list.length === 1 ? "" : "s"}`;

  list.forEach((user, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.index = index;

    const img = document.createElement("img");
    img.src = user.img;
    img.className = "bg-img";
    img.alt = user.name;

    const blur = document.createElement("div");
    blur.className = "blurred-layer";

    const content = document.createElement("div");
    content.className = "content";

    const nameEl = document.createElement("h3");
    nameEl.className = "text-xl font-bold";
    nameEl.innerHTML = formatHighlight(user.name, query);

    const roleEl = document.createElement("p");
    roleEl.className = "text-[13px] mb-1 opacity-80";
    roleEl.innerHTML = `<strong>Role:</strong> ${formatHighlight(user.role, query)}`;

    const bioEl = document.createElement("p");
    bioEl.innerHTML = formatHighlight(user.bio, query);

    content.appendChild(nameEl);
    content.appendChild(roleEl);
    content.appendChild(bioEl);

    card.appendChild(img);
    card.appendChild(blur);
    card.appendChild(content);

    card.addEventListener("click", () => {
      selectedCardIndex = index;
      updateCardSelection();
      showUserDetail(user);
    });

    userGrid.appendChild(card);
  });
}

function buildRoleFilters() {
  const roles = ["All", ...new Set(users.map((u) => u.role))];
  filterChips.innerHTML = "";

  roles.forEach((role) => {
    const btn = document.createElement("button");
    btn.className = `px-3 py-1.5 rounded-full text-sm ${selectedRole === role ? "bg-blue-500 text-white" : "bg-[#222] text-[#bbb] hover:bg-[#2f2f2f]"}`;
    btn.textContent = role;
    btn.addEventListener("click", () => {
      selectedRole = role;
      buildRoleFilters();
      performSearch();
    });

    filterChips.appendChild(btn);
  });
}

function parseSearchTerms(query) {
  const tokens = query.trim().split(/\s+/).filter(Boolean);
  return {
    required: tokens.filter((t) => t.startsWith("+")).map((t) => t.slice(1).toLowerCase()),
    excluded: tokens.filter((t) => t.startsWith("-")).map((t) => t.slice(1).toLowerCase()),
    roleTag: tokens.find((t) => t.startsWith("#"))?.slice(1).toLowerCase(),
    free: tokens
      .filter((t) => !/^[+#-]/.test(t))
      .map((t) => t.toLowerCase()),
  };
}

function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[a.length][b.length];
}

function fuzzyTokenMatch(source, token) {
  if (source.includes(token)) return true;
  const words = source.split(/[^a-z0-9]+/g);
  return words.some((word) => word && levenshtein(word, token) <= 1);
}

function performSearch() {
  const inputValue = searchInput.value.trim();
  const lowerInput = inputValue.toLowerCase();
  const { required, excluded, roleTag, free } = parseSearchTerms(inputValue);

  if (roleTag) {
    selectedRole = users.some((u) => u.role.toLowerCase() === roleTag) ? roleTag.charAt(0).toUpperCase() + roleTag.slice(1) : selectedRole;
    buildRoleFilters();
  }

  const fuzzy = fuzzyCheck.checked;

  let filtered = users.filter((user) => {
    const userText = `${user.name} ${user.bio} ${user.role}`.toLowerCase();

    if (selectedRole !== "All" && user.role.toLowerCase() !== selectedRole.toLowerCase()) return false;

    if (required.some((term) => !userText.includes(term))) return false;
    if (excluded.some((term) => userText.includes(term))) return false;

    if (!free.length) return true;

    return free.every((token) => (fuzzy ? fuzzyTokenMatch(userText, token) : userText.includes(token)));
  });

  const sortMode = sortSelect.value;

  filtered.sort((a, b) => {
    if (sortMode === "az") return a.name.localeCompare(b.name);
    if (sortMode === "za") return b.name.localeCompare(a.name);
    if (sortMode === "role") return a.role.localeCompare(b.role) || a.name.localeCompare(b.name);

    const score = (user) => {
      let scoreValue = 0;
      const userText = `${user.name} ${user.bio}`.toLowerCase();

      if (lowerInput && user.name.toLowerCase().startsWith(lowerInput)) scoreValue += 120;
      if (lowerInput && user.bio.toLowerCase().startsWith(lowerInput)) scoreValue += 90;
      if (lowerInput && userText.includes(lowerInput)) scoreValue += 70;

      free.forEach((token) => {
        if (user.name.toLowerCase().includes(token)) scoreValue += 20;
        if (user.bio.toLowerCase().includes(token)) scoreValue += 10;
        if (user.role.toLowerCase().includes(token)) scoreValue += 15;
      });

      return scoreValue;
    };

    return score(b) - score(a);
  });

  renderUsers(filtered, lowerInput);
}

const debounce = (fn, ms = 200) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
};

searchInput.addEventListener("input", debounce(performSearch, 200));

searchInput.addEventListener("keydown", (event) => {
  const cards = Array.from(userGrid.querySelectorAll(".card"));
  if (!cards.length) return;

  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    const direction = event.key === "ArrowDown" ? 1 : -1;
    selectedCardIndex = clampIndex(selectedCardIndex + direction, cards.length);
    updateCardSelection();
  }

  if (event.key === "Enter" && selectedCardIndex >= 0) {
    event.preventDefault();
    const user = currentRenderUsers[selectedCardIndex];
    if (user) showUserDetail(user);
  }
});

sortSelect.addEventListener("change", performSearch);
fuzzyCheck.addEventListener("change", performSearch);

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  selectedRole = "All";
  sortSelect.value = "relevance";
  fuzzyCheck.checked = false;
  buildRoleFilters();
  performSearch();
});

buildRoleFilters();
performSearch();