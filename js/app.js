// Плавная прокрутка к форме
document.addEventListener("click", (e) => {
  const target = e.target.closest("[data-scroll]");
  if (!target) return;
  const id = target.getAttribute("data-scroll");
  const el = document.querySelector(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
});

// Отправка формы в Telegram
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const successEl = document.getElementById("formSuccess");
  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      name: this.name.value.trim(),
      phone: this.phone.value.trim(),
      email: this.email.value.trim(),
      message: this.message.value.trim(),
    };

    if (!formData.name || !formData.phone || !formData.message) {
      alert("Пожалуйста, заполните имя, телефон и сообщение.");
      return;
    }

    const text =
      "🆕 Новая заявка с лендинга Zigbee Helper:%0A" +
      "Имя: " +
      encodeURIComponent(formData.name) +
      "%0A" +
      "Телефон: " +
      encodeURIComponent(formData.phone) +
      "%0A" +
      "Email: " +
      encodeURIComponent(formData.email || "не указан") +
      "%0A" +
      "Сообщение: " +
      encodeURIComponent(formData.message);

    // 👉 ВСТАВЬ СВОЙ BOT_TOKEN И CHAT_ID
    // BOT_TOKEN бери у @BotFather, CHAT_ID — из getUpdates.
    const BOT_TOKEN = "ВСТАВЬ_СВОЙ_BOT_TOKEN_ЗДЕСЬ";
    const CHAT_ID = "ВСТАВЬ_СВОЙ_CHAT_ID_ЗДЕСЬ";

    if (!BOT_TOKEN || !CHAT_ID) {
      alert("Не задан BOT_TOKEN или CHAT_ID в js/app.js");
      return;
    }

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${text}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Response not OK");

      successEl.style.display = "block";
      this.reset();
    } catch (err) {
      console.error(err);
      alert("Ошибка: не удалось отправить заявку в Telegram. Проверьте настройки бота.");
    }
  });
});
