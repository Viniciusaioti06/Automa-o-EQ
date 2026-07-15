(() => {
  const form = document.getElementById('quoteForm');
  const subject = form?.querySelector('[name="subject"]');
  const message = form?.querySelector('[name="message"]');
  const count = document.getElementById('charCount');

  document.querySelectorAll('.solution-item[data-subject]').forEach(item => {
    item.addEventListener('click', () => {
      if (!subject) return;
      subject.value = item.dataset.subject || '';
      setTimeout(() => subject.closest('.input-shell')?.classList.add('is-highlighted'), 250);
      setTimeout(() => subject.closest('.input-shell')?.classList.remove('is-highlighted'), 1300);
    });
  });

  message?.addEventListener('input', () => {
    if (count) count.textContent = String(message.value.length);
  });

  const formatPhone = value => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  form?.querySelector('[name="phone"]')?.addEventListener('input', event => {
    event.target.value = formatPhone(event.target.value);
  });

  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    form.classList.add('is-sending');
    const button = form.querySelector('button[type="submit"]');
    const original = button.innerHTML;
    button.textContent = 'Preparando mensagem...';

    const data = new FormData(form);
    const text = [
      'Olá! Gostaria de solicitar atendimento.',
      '',
      `Nome: ${data.get('name')}`,
      `Empresa: ${data.get('company') || 'Não informada'}`,
      `Telefone: ${data.get('phone') || 'Não informado'}`,
      `Interesse: ${data.get('subject')}`,
      '',
      `Mensagem: ${data.get('message') || 'Gostaria de mais informações sobre essa solução.'}`
    ].join('\n');

    setTimeout(() => {
      window.open(`https://wa.me/5545999359260?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      form.classList.remove('is-sending');
      button.innerHTML = original;
    }, 350);
  });
})();
