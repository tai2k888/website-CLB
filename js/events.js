document.addEventListener("DOMContentLoaded", () => {
  const eventsGrid = document.getElementById("eventsPageGrid");
  const emptyState = document.getElementById("emptyState");
  const filterTabs = document.querySelectorAll(".filter-tab");

  let currentStatus = "upcoming";

  // Format date helper
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("vi-VN", options);
  }

  // Render events function
  function renderEvents() {
    // Filter events based on current status
    // Note: In a real app, you might compare dates. Here we use the 'status' field from data.js
    const filteredEvents = eventsData.filter((event) => {
      if (currentStatus === "upcoming") {
        return event.status === "upcoming";
      } else {
        return event.status === "past";
      }
    });

    if (filteredEvents.length === 0) {
      eventsGrid.style.display = "none";
      emptyState.style.display = "block";
    } else {
      eventsGrid.style.display = "grid";
      emptyState.style.display = "none";

      eventsGrid.innerHTML = filteredEvents
        .map(
          (event) => `
                <div class="card event-card fade-in">
                    <div class="event-image">
                        <img src="${event.image}" alt="${event.title}" loading="lazy">
                        <div class="event-overlay"></div>
                    </div>
                    <div class="event-content">
                        <div class="event-date">
                            <i data-lucide="calendar"></i>
                            ${formatDate(event.date)} • ${event.time}
                        </div>
                        <h3 class="event-title">${event.title}</h3>
                        <p class="event-desc">${event.description}</p>
                        <div class="event-location">
                            <i data-lucide="map-pin" style="width: 1rem; height: 1rem; display: inline-block; vertical-align: text-bottom;"></i>
                            ${event.location}
                        </div>
                        <div style="margin-top: 1.5rem;">
                            <a href="register.html" class="btn btn-secondary" style="width: 100%; justify-content: center;">Đăng ký tham gia</a>
                        </div>
                    </div>
                </div>
            `,
        )
        .join("");

      // Reinitialize icons
      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }
    }
  }

  // Handle tab clicks
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Update active state
      filterTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // Update status and re-render
      currentStatus = tab.dataset.status;
      renderEvents();
    });
  });

  // Initial render
  renderEvents();
});
