(() => {
  const toggle = document.querySelector('.lp-chat-toggle');
  const panel = document.querySelector('#lp-chat');
  if (!toggle || !panel) return;
  const log = panel.querySelector('.lp-chat-log');
  const chips = panel.querySelector('.lp-chat-chips');
  const form = panel.querySelector('.lp-chat-form');
  const input = panel.querySelector('#lp-chat-input');

  // Answers come only from what the site already states. Keep them in sync with index.html.
  const intents = [
    { id: 'about', label: '어떤 서비스인가요?', keys: ['어떤서비스', '뭐하는', '입시메이트', '소개', '무슨'],
      answer: '두 아이의 입시를 겪은 엄마가 고1·고2 학부모에게 보내는 입시 레터입니다. 한 달에 두 번, 이달의 주요 일정과 핫 뉴스, 우리 집 해야 할 일, AI 활용법을 이메일로 보내 드립니다. <a href="sample.html">샘플 메일 보기</a>' },
    { id: 'price', label: '가격이 얼마인가요?', keys: ['가격', '얼마', '구독료', '비용', '요금', '월간', '연간', '만원'],
      answer: '월간 구독은 월 20,000원, 연간 구독은 220,000원(12개월 24회, 2만원 절약)입니다. 오픈 전에 신청하면 자녀 학년 메일 2회를 먼저 무료로 받습니다.' },
    { id: 'signup', label: '어떻게 신청하나요?', keys: ['신청', '가입', '구독하', '메일리', '등록'],
      answer: '페이지 아래 <a href="#start">무료 신청</a>에서 메일리로 이메일과 자녀 학년만 남기면 됩니다. 오픈할 때 자녀 학년 메일 2회를 무료로 보내 드립니다.' },
    { id: 'free', label: '무료로 받아볼 수 있나요?', keys: ['무료', '체험', '공짜', '2회'],
      answer: '오픈 전 신청자는 자녀 학년 메일 2회를 무료로 받습니다. 무료 2회 이후 동의 없이 유료로 바뀌지 않습니다.' },
    { id: 'grade', label: '중3·고3도 되나요?', keys: ['중3', '고3', '고1', '고2', '학년', '중학생', '고등학생'],
      answer: '처음에는 2028학년도 이후 새 체제를 처음 겪는 고1·고2부터 시작합니다. 중3과 고3은 준비되는 대로 <a href="notice.html">공지사항</a>으로 알려 드립니다.' },
    { id: 'content', label: '메일에는 무엇이 오나요?', keys: ['내용', '언제', '몇번', '주기', '한달', '샘플', '메일'],
      answer: '한 통에 네 가지가 담깁니다. 이달의 주요 일정, 이달의 핫 뉴스, 이달 우리 집 해야 할 일, AI를 활용해 보아요. 한 달에 두 번 보내 드립니다. <a href="sample.html">샘플 메일 보기</a>' },
    { id: 'ai', label: 'AI를 처음 써도 괜찮나요?', keys: ['ai', '챗gpt', 'gpt', '지피티', '제미나이', '프롬프트', '처음', '어려'],
      answer: '괜찮습니다. 복사해서 붙여 넣을 수 있는 질문 예시와 사용 순서를 함께 보내고, 무료로 쓸 수 있는 AI 도구를 기준으로 안내합니다.' },
    { id: 'record', label: '학생부를 써 주나요?', keys: ['대필', '써주', '첨삭', '학생부', '생기부', '세특', '문구'],
      answer: '아니요. 학생부 문구를 대신 만들거나 학교·선생님께 특정 내용 기재를 요청하는 방법은 다루지 않습니다. 아이가 실제로 한 활동을 스스로 돌아보고 넓히는 방법을 안내합니다.' },
    { id: 'consult', label: '개인 상담도 되나요?', keys: ['상담', '코칭', '1:1', '컨설팅', '개인'],
      answer: '학생부를 받지 않는 방식의 학부모 상담을 준비하고 있습니다. 관련 규정을 확인한 뒤 오픈하며 공지사항으로 안내합니다. <a href="coaching.html">상담 준비 안내</a>' },
    { id: 'reform', label: '2028 대입, 뭐가 바뀌나요?', keys: ['2028', '개편', '5등급', '내신', '수능', '통합', '바뀌'],
      answer: '2025년 고1 입학생부터 내신 상대평가가 9등급에서 5등급으로 바뀌고, 수능은 국어·수학 선택과목이 없어지며 탐구는 통합사회·통합과학으로 치르는 통합형으로 바뀝니다. <a href="admissions-2028.html">2028 변화 자세히 보기</a>' },
    { id: 'cancel', label: '해지·환불은요?', keys: ['해지', '취소', '환불', '그만', '탈퇴'],
      answer: '구독은 언제든 취소할 수 있습니다. 결제·해지·환불 조건은 오픈 전에 안내하며, 환불은 이미 발송된 회차를 제외하고 계산합니다. <a href="terms.html">이용약관</a>' },
    { id: 'predict', label: '합격을 예측해 주나요?', keys: ['합격', '예측', '보장', '가능성', '붙을'],
      answer: '새 체제의 결과를 확정적으로 예측하거나 합격을 보장하지 않습니다. 발표된 제도와 공식 전형 자료를 기준으로 준비할 일을 정리합니다.' },
    { id: 'privacy', label: '개인정보는요?', keys: ['개인정보', '정보수집', '이메일주소'],
      answer: '구독 신청에는 이메일과 자녀 학년만 받으며 학생부는 수집하지 않습니다. <a href="privacy.html">개인정보처리방침</a>' },
  ];
  const starters = ['about', 'price', 'signup', 'grade', 'record'];
  const fallback = '정확한 답을 찾지 못했어요. 아래 질문을 눌러 보시거나, help@example.com으로 보내 주시면 직접 답해 드릴게요.';

  function add(role, html) {
    const msg = document.createElement('div');
    msg.className = `lp-chat-msg is-${role}`;
    if (role === 'user') msg.textContent = html; else msg.innerHTML = html;
    log.append(msg);
    log.scrollTop = log.scrollHeight;
  }
  function renderChips(ids) {
    chips.replaceChildren(...ids.map((id) => {
      const intent = intents.find((item) => item.id === id);
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = intent.label;
      button.addEventListener('click', () => ask(intent.label, intent));
      return button;
    }));
  }
  function match(text) {
    const q = text.toLowerCase().replace(/\s+/g, '');
    let best = null; let score = 0;
    for (const intent of intents) {
      const hits = intent.keys.filter((key) => q.includes(key.toLowerCase().replace(/\s+/g, ''))).length;
      if (hits > score) { best = intent; score = hits; }
    }
    return best;
  }
  function ask(text, known) {
    add('user', text);
    const intent = known || match(text);
    add('bot', intent ? intent.answer : fallback);
    renderChips(intents.filter((item) => item !== intent).slice(0, 4).map((item) => item.id));
  }
  function open(state) {
    panel.hidden = !state;
    toggle.setAttribute('aria-expanded', String(state));
    if (state) {
      if (!log.childElementCount) {
        add('bot', '안녕하세요, 입시메이트입니다. 궁금한 점을 입력하거나 아래 질문을 눌러 주세요.');
        renderChips(starters);
      }
      input.focus();
    } else {
      toggle.focus();
    }
  }
  toggle.addEventListener('click', () => open(panel.hidden));
  panel.querySelector('.lp-chat-close').addEventListener('click', () => open(false));
  panel.addEventListener('keydown', (event) => { if (event.key === 'Escape') open(false); });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    ask(text);
  });
})();
