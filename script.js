// ========== THEME BY TIME OF DAY ==========
function setThemeByTime() {
  const hour = new Date().getHours();
  console.log('🕒 Current hour:', hour);
  
  // Set light/dark theme
  const isDark = hour < 6 || hour >= 18;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  
  // Remove all time classes
  document.body.classList.remove('time-morning', 'time-afternoon', 'time-evening', 'time-night');
  
  // Add correct time class
  let timeClass = 'time-night';
  if (hour >= 5 && hour < 12) {
    timeClass = 'time-morning';
  } else if (hour >= 12 && hour < 17) {
    timeClass = 'time-afternoon';
  } else if (hour >= 17 && hour < 21) {
    timeClass = 'time-evening';
  }
  
  document.body.classList.add(timeClass);
  console.log('🎨 Applied class:', timeClass);
}

// ========== LOAD MENTORS ==========
async function loadMentors() {
  try {
    console.log('📚 Loading mentors...');
    
    const container = document.getElementById('mentors');
    if (!container) {
      console.error('❌ ERROR: #mentors element not found!');
      return;
    }
    
    const lang = localStorage.getItem('lang') || 'en';
    
    const response = await fetch('mentors.json');
    if (!response.ok) throw new Error('Failed to load mentors.json');
    
    const allMentors = await response.json();
    const mentors = allMentors[lang] || allMentors.en;
    
    container.innerHTML = '';
    
    mentors.forEach((mentor, index) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.animationDelay = `${index * 0.1}s`;
      
      // Create fallback avatar if photo fails
      const initials = mentor.name.split(' ').map(n => n[0]).join('');
      const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=667eea&color=fff&size=400`;
      
      card.innerHTML = `
        <img src="${mentor.photo}" alt="${mentor.name}" 
             onerror="this.onerror=null; this.src='${fallbackAvatar}'">
        <h3>${mentor.name}</h3>
        <div class="role">${mentor.role}</div>
        <p><b>School:</b> ${mentor.experience}</p>
        <p>${mentor.description}</p>
        ${mentor.focus ? `<p class="focus"><b>📍 Focus:</b> ${mentor.focus}</p>` : ''}
      `;
      
      container.appendChild(card);
    });
    
    console.log(`✅ Loaded ${mentors.length} mentors`);
    
  } catch (error) {
    console.error('❌ Error loading mentors:', error);
    const container = document.getElementById('mentors');
    if (container) {
      container.innerHTML = '<p style="color:red; text-align:center;">Error loading mentors</p>';
    }
  }
}

// ========== INITIALIZE EVERYTHING ==========
function initializeApp() {
  console.log('🚀 Initializing app...');
  
  // Set theme
  setThemeByTime();
  setInterval(setThemeByTime, 60000);
  
  // Load mentors
  loadMentors();
  
  // Set up language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      localStorage.setItem('lang', lang);
      loadMentors();
    });
  });
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}