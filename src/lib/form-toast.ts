import Swal from "sweetalert2";

const FormToast = Swal.mixin({
  toast: true,
  position: "bottom-start",
  showConfirmButton: false,
  timer: 6000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const ERROR_ICON = `<span class="form-toast-icon" aria-hidden="true">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M9 9l6 6M15 9l-6 6" />
  </svg>
</span>`;

const SUCCESS_ICON = `<span class="form-toast-icon" aria-hidden="true">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12.5l2.5 2.5 5.5-5.5" />
  </svg>
</span>`;

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatToastContent(messages: string[]) {
  const items = messages.filter(Boolean);
  if (items.length === 0) return "";
  if (items.length === 1) {
    return `<ul class="form-toast-list form-toast-list-single"><li>${escapeHtml(items[0])}</li></ul>`;
  }
  return `<ul class="form-toast-list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function toastBody(icon: string, content: string) {
  return `<div class="form-toast-body">${icon}<div class="form-toast-content">${content}</div></div>`;
}

export function showFormErrorToast(message: string | string[]) {
  const messages = Array.isArray(message) ? message : [message];
  const content = formatToastContent(messages);
  if (!content) return Promise.resolve();

  return FormToast.fire({
    icon: false,
    title: undefined,
    html: toastBody(ERROR_ICON, content),
    customClass: {
      popup: "form-toast form-toast-error",
      htmlContainer: "form-toast-html",
      timerProgressBar: "form-toast-progress",
    },
  });
}

export function showFormSuccessToast(message: string) {
  return FormToast.fire({
    icon: false,
    title: undefined,
    timer: 4500,
    html: toastBody(SUCCESS_ICON, `<p class="form-toast-text">${escapeHtml(message)}</p>`),
    customClass: {
      popup: "form-toast form-toast-success",
      htmlContainer: "form-toast-html",
      timerProgressBar: "form-toast-progress",
    },
  });
}
