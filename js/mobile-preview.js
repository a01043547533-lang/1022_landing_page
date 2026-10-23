(() => {
  const button = document.querySelector('.lp-mobile-btn');
  const dialog = document.querySelector('#lp-mobile');
  if (!button || !dialog || typeof dialog.showModal !== 'function') return;
  const frame = dialog.querySelector('iframe');
  const qr = dialog.querySelector('.lp-mobile-qr');
  const pageUrl = location.href.split('#')[0];

  function renderQr() {
    if (qr.dataset.done) return;
    qr.dataset.done = '1';
    if (!/^https?:/.test(location.protocol)) {
      qr.textContent = '사이트를 인터넷에 올리면 휴대폰 카메라로 찍을 수 있는 QR 코드가 여기에 나타납니다.';
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    script.onload = () => new window.QRCode(qr, { text: pageUrl, width: 144, height: 144, colorDark: '#171717', colorLight: '#ffffff' });
    script.onerror = () => { qr.textContent = 'QR 코드를 불러오지 못했습니다. 휴대폰에서 이 주소를 직접 열어 주세요.'; };
    document.head.append(script);
  }
  button.addEventListener('click', () => {
    if (!frame.getAttribute('src')) frame.setAttribute('src', 'index.html');
    dialog.showModal();
    renderQr();
  });
  dialog.querySelector('.lp-mobile-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
})();
