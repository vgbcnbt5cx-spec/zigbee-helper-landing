// Прокрутка к форме
function scrollToForm() {
  const el = document.getElementById('contact-form');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Отправка формы в Telegram
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedbackForm');
  const successEl = document.getElementById('formSuccess');

  if (!form || !successEl) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = {
      name: this.name.value.trim(),
      phone: this.phone.value.trim(),
      email: this.email.value.trim(),
      message: this.message.value.trim()
    };

    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    const text =
      '🆕 Новая заявка с лендинга Zigbee Helper:%0A' +
      'Имя: ' + encodeURIComponent(formData.name) + '%0A' +
      'Телефон: ' + encodeURIComponent(formData.phone) + '%0A' +
      'Email: ' + encodeURIComponent(formData.email) + '%0A' +
      'Сообщение: ' + encodeURIComponent(formData.message);

    // === Твой токен и чат ID ===
    const BOT_TOKEN = "8211567856:AAFlKKq1G7ucLb2GuD2EuCS-MTGN6LrQQmg";
    const CHAT_ID = "5010208653";
    if (!BOT_TOKEN) {
      alert('BOT_TOKEN отсутствует!');
      return;
    }

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${text}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Ошибка запроса');

      successEl.style.display = 'block';
      this.reset();

    } catch (err) {
      console.error(err);
      alert('Ошибка: не удалось отправить заявку.');
    }
  });
});
