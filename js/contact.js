(() => {
  const form = document.querySelector('#lead-form');
  const status = document.querySelector('#form-status');
  if (!form || !status) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const body = [`보호자 이름: ${data.get('name')}`, `전화번호: ${data.get('phone')}`, `내신 등급대: ${data.get('grade')}`].join('\n');
    status.textContent = '메일 앱에서 내용을 확인한 뒤 보내기를 완료해 주세요.';
    window.location.href = `mailto:hello@gyeol.study?subject=${encodeURIComponent('입시 컨설팅 상담 신청')}&body=${encodeURIComponent(body)}`;
  });
})();
