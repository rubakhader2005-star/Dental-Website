const toggleBtn = document.querySelector('[data-mobile-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

const currentPage = document.body.dataset.page;
const toast = document.querySelector("[data-toast]");
const yearSlot = document.querySelector("[data-year]");
toggleBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});


document.querySelectorAll("[data-nav]").forEach((link) => {
  if (link.dataset.nav === currentPage) {
    link.classList.add("active");
  }
});

if (yearSlot) {
  yearSlot.textContent = new Date().getFullYear();
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

document.querySelectorAll("[data-booking-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const requiredFields = [...form.querySelectorAll("[required]")];
    const isInvalid = requiredFields.some((field) => !field.value.trim());

    if (isInvalid) {
      showToast("يرجى تعبئة الحقول المطلوبة قبل إرسال النموذج.");
      return;
    }

    form.reset();
    showToast("تم إرسال طلبك بنجاح. سنتواصل معك قريبًا.");
  });
});

document.querySelectorAll("[data-accordion-item]").forEach((item) => {
  const trigger = item.querySelector("[data-accordion-trigger]");
  const panel = item.querySelector("[data-accordion-panel]");

  if (!trigger || !panel) return;

  if (item.classList.contains("open")) {
    panel.style.maxHeight = `${panel.scrollHeight}px`;
  }

  trigger.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    document.querySelectorAll("[data-accordion-item]").forEach((otherItem) => {
      const otherPanel = otherItem.querySelector("[data-accordion-panel]");
      otherItem.classList.remove("open");
      if (otherPanel) otherPanel.style.maxHeight = null;
    });

    if (!isOpen) {
      item.classList.add("open");
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    }
  });
});
