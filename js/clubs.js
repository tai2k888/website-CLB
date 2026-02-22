// Clubs page functionality

let filteredClubs = [...clubsData];
let currentCategory = "all";
let searchTerm = "";

// Render clubs
function renderClubs() {
  const grid = document.getElementById("clubsGrid");
  const emptyState = document.getElementById("emptyState");
  const resultsCount = document.getElementById("resultsCount");

  if (filteredClubs.length === 0) {
    grid.style.display = "none";
    emptyState.style.display = "block";
  } else {
    grid.style.display = "grid";
    emptyState.style.display = "none";

    grid.innerHTML = filteredClubs
      .map(
        (club) => `
            <div class="card club-card">
                <div class="club-image">
                    <img src="${club.image}" alt="${club.name}" loading="lazy">
                    <span class="club-badge ${club.category}">${club.categoryName}</span>
                </div>
                <div class="club-content">
                    <h3 class="club-title">${club.name}</h3>
                    <p class="club-desc">${club.shortDesc}</p>
                    <div class="club-tags" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
                        ${club.tags
                          .slice(0, 3)
                          .map(
                            (tag) => `
                            <span style="font-size: 0.75rem; padding: 0.25rem 0.5rem; background: var(--gray-100); color: var(--text-secondary); border-radius: 0.25rem;">${tag}</span>
                        `,
                          )
                          .join("")}
                    </div>
                    <div class="club-footer">
                        <span class="club-members">
                            <i data-lucide="users"></i>
                            ${club.members} thành viên
                        </span>
                        <a href="club-${club.id}.html" class="club-link">Tìm hiểu thêm →</a>
                    </div>
                </div>
            </div>
        `,
      )
      .join("");

    lucide.createIcons();
  }

  resultsCount.textContent = filteredClubs.length;
}

// Filter clubs
function filterClubs() {
  filteredClubs = clubsData.filter((club) => {
    // Category filter
    const matchesCategory =
      currentCategory === "all" || club.category === currentCategory;

    // Search filter
    const matchesSearch =
      !searchTerm ||
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  renderClubs();
}

// Category filter buttons
document.getElementById("categoryFilter").addEventListener("click", (e) => {
  if (e.target.classList.contains("filter-btn")) {
    // Remove active class from all buttons
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add active class to clicked button
    e.target.classList.add("active");

    // Update current category
    currentCategory = e.target.dataset.category;

    // Filter clubs
    filterClubs();
  }
});

// Search input
document.getElementById("searchInput").addEventListener("input", (e) => {
  searchTerm = e.target.value;
  filterClubs();
});

// Clear filters
document.getElementById("clearFilters").addEventListener("click", () => {
  // Reset category
  currentCategory = "all";
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document.querySelector('[data-category="all"]').classList.add("active");

  // Reset search
  searchTerm = "";
  document.getElementById("searchInput").value = "";

  // Filter clubs
  filterClubs();
});

// Check URL parameters for category
const urlParams = new URLSearchParams(window.location.search);
const categoryParam = urlParams.get("category");
if (categoryParam) {
  currentCategory = categoryParam;
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.category === categoryParam) {
      btn.classList.add("active");
    }
  });
}

// Initial render
filterClubs();
