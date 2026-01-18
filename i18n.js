const translations = {
  en: {
    subtitle: "Mentor Catalog for FTC 2025 — DECODE",
    heroTitle: "Mentorship & Community",
    heroDesc: "Finder is a growing community of students, mentors, and engineers united by a passion for robotics, technology, and teamwork. Our mentorship program connects experienced mentors with motivated students, helping teams grow faster, avoid common mistakes, and build both technical and leadership skills. We believe that strong communities are built on knowledge sharing, collaboration, and real support — not competition alone.",
    mentorsCatalog: "Mentors Catalog",
    footerQuestion: "Want to become a mentor or looking for one?",
    footerDesc: "Reach out to us through the link below — we're always open to new connections.",
    footerNote: "All mentorship requests are reviewed by the Red Lotus team.",
    contact: "Contact Us",
    "Programming & IT Systems Mentor": "Programming & IT Systems Mentor",
    "Strategy & Leadership Mentor": "Strategy & Leadership Mentor",
    "Mechanical & Engineering Mentor": "Mechanical & Engineering Mentor",
    "Electronics & Build Mentor": "Electronics & Build Mentor",
    "School": "School",
    "Focus": "Focus",
    "aiTitle": "Red Lotus AI Assistant",
    "aiPlaceholder": "Ask me anything...",
    "aiSend": "Send",
    "aiWelcome": "Hi! I'm your Red Lotus guide. Ask me about mentors, robotics, or FTC!",
    "aiInappropriate": "I appreciate you, but I can only answer appropriate questions. Let's keep it respectful! 😊"
  },
  ru: {
    subtitle: "Каталог менторов FTC 2025 — DECODE",
    heroTitle: "Менторство и сообщество",
    heroDesc: "Finder — растущее сообщество студентов, менторов и инженеров, объединённых страстью к робототехнике, технологиям и командной работе. Наша программа менторства связывает опытных менторов с мотивированными студентами, помогая командам развиваться быстрее, избегать общих ошибок и развивать как технические, так и лидерские навыки. Мы верим, что сильные сообщества строятся на обмене знаниях, сотрудничестве и реальной поддержке — не только на конкуренции.",
    mentorsCatalog: "Каталог менторов",
    footerQuestion: "Хотите стать ментором или ищете одного?",
    footerDesc: "Свяжитесь с нами по ссылке ниже — мы всегда открыты для новых связей.",
    footerNote: "Все запросы на менторство рассматриваются командой Red Lotus.",
    contact: "Связаться с нами",
    "Programming & IT Systems Mentor": "Ментор по программированию и IT-системам",
    "Strategy & Leadership Mentor": "Ментор по стратегии и лидерству",
    "Mechanical & Engineering Mentor": "Ментор по механике и инженерии",
    "Electronics & Build Mentor": "Ментор по электронике и сборке",
    "School": "Школа",
    "Focus": "Направление",
    "aiTitle": "ИИ Помощник Red Lotus",
    "aiPlaceholder": "Спроси меня о чём-нибудь...",
    "aiSend": "Отправить",
    "aiWelcome": "Привет! Я твой гид Red Lotus. Спроси меня о менторах, робототехнике или FTC!",
    "aiInappropriate": "Спасибо за интерес, но я могу ответить только на вежливые вопросы. Давай будем корректнее! 😊"
  },
  kz: {
    subtitle: "FTC 2025 — DECODE үшін ментор каталогы",
    heroTitle: "Менторлық және қауымдастық",
    heroDesc: "Finder — робототехника, технология және командалық жұмысқа құмарлық арқасында ынамдасқан студенттер, менторлар және инженерлердің өсіп келе жатқан қауымдастығы. Біздің менторлық бағдарламасы тәжірибелі менторларды ынамды студенттермен байланыстырады, командалардың тез өсуіне, жалпы қателіктерден аулақтауға және техникалық және көшбасшылық дағдыларын дамытуға көмектеседі. Біз сильный сообщества білім беру, ынамдастық және нақты қолдау арқасында құрылатынына сенеміз.",
    mentorsCatalog: "Менторлар каталогы",
    footerQuestion: "Ментор болғысы келеді немесе бірін іздеп жүрсіз бе?",
    footerDesc: "Төмендегі сілтеме арқылы бизге хабарласыңыз — біз әрқашан жаңа байланыстарға ашықпыз.",
    footerNote: "Барлық менторлық сұраулары Red Lotus командасы тарапынан қарастырылады.",
    contact: "Бізге хабарласыңыз",
    "Programming & IT Systems Mentor": "Бағдарламалау және IT-жүйелер менторы",
    "Strategy & Leadership Mentor": "Стратегия және көшбасшылық менторы",
    "Mechanical & Engineering Mentor": "Механика және инженерлік менторы",
    "Electronics & Build Mentor": "Электроника және құрастыру менторы",
    "School": "Оқу орны",
    "Focus": "Бағыты",
    "aiTitle": "Red Lotus ИИ көмекшісі",
    "aiPlaceholder": "Менен бір нәрсе туралы сұра...",
    "aiSend": "Жіберу",
    "aiWelcome": "Сәлем! Мен сенің Red Lotus гидың. Менторлар, робототехника немесе FTC туралы менен сұра!",
    "aiInappropriate": "Сіңді ынамдағаныңызға рахмет, бірақ мен тек сыпайы сұрақтарға жауап бере аламын. Әлдеқайда сыпайырақ болайық! 😊"
  }
};

let currentLang = localStorage.getItem('lang') || 'en';

function t(key) {
  return translations[currentLang][key] || key;
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
  
  document.querySelectorAll('[data-role]').forEach(el => {
    const role = el.getAttribute('data-role');
    el.textContent = t(role);
  });
  
  document.querySelectorAll('[data-experience-label]').forEach(el => {
    el.textContent = t('Experience');
  });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
});

setLanguage(currentLang);
