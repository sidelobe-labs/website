(() => {
  const button = document.querySelector("[data-copy-email]");
  const status = document.querySelector(".copy-status");

  if (!button || !status) return;

  const email = button.dataset.copyEmail;

  const copyFallback = () => {
    const area = document.createElement("textarea");
    area.value = email;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  };

  button.addEventListener("click", async () => {
    let copied = false;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
        copied = true;
      } else {
        copied = copyFallback();
      }
    } catch {
      copied = copyFallback();
    }

    status.textContent = copied ? "Email copied." : email;
    button.textContent = copied ? "Copied" : "Copy email";

    window.setTimeout(() => {
      status.textContent = "";
      button.textContent = "Copy email";
    }, 2200);
  });
})();
