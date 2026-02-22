document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get button and change state
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;

      btn.disabled = true;
      btn.innerHTML =
        '<i data-lucide="loader-2" class="animate-spin"></i> Đang gửi...';
      lucide.createIcons();

      // Simulate API call
      setTimeout(() => {
        alert(
          "Cảm ơn bạn đã liên hệ! Tin nhắn của bạn đã được gửi thành công.",
        );
        contactForm.reset();

        btn.disabled = false;
        btn.innerHTML = originalText;
        lucide.createIcons();
      }, 1500);
    });
  }
});
