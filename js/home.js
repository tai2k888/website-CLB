// Home page functionality

// Format date to Vietnamese
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("vi-VN", options);
}

// Load featured clubs
function loadFeaturedClubs() {
  const grid = document.getElementById("featuredClubsGrid");
  if (!grid) return;

  const featured = clubsData.slice(0, 3);

  grid.innerHTML = featured
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

  // Reinitialize Lucide icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

// Load upcoming events
function loadUpcomingEvents() {
  const grid = document.getElementById("upcomingEventsGrid");
  if (!grid) return;

  const upcoming = eventsData
    .filter((event) => event.status === "upcoming")
    .slice(0, 3);

  grid.innerHTML = upcoming
    .map(
      (event) => `
        <div class="card event-card">
            <div class="event-image">
                <img src="${event.image}" alt="${event.title}" loading="lazy">
            </div>
            <div class="event-content">
                <div class="event-date">${formatDate(event.date)} • ${event.time}</div>
                <h3 class="event-title">${event.title}</h3>
                <p class="event-desc">${event.description}</p>
                <div class="event-location">📍 ${event.location}</div>
            </div>
        </div>
    `,
    )
    .join("");
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all cards
  document.querySelectorAll(".club-card, .event-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(card);
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  loadFeaturedClubs();
  loadUpcomingEvents();

  // Initialize scroll animations after a short delay
  setTimeout(() => {
    initScrollAnimations();
  }, 100);
});
