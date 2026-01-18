// ========== OpenAI-POWERED AI ASSISTANT ==========

class SmartAI {
  constructor() {
    this.isLoading = false;
    this.setupAI();
  }

  setupAI() {
    const aiBtn = document.getElementById('aiToggle');
    const chatWindow = document.getElementById('aiChat');
    
    if (!aiBtn || !chatWindow) return;

    aiBtn.addEventListener('click', () => {
      chatWindow.classList.toggle('open');
      if (chatWindow.classList.contains('open')) {
        this.focusInput();
      }
    });

    const closeBtn = chatWindow.querySelector('.ai-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('open');
      });
    }

    const form = chatWindow.querySelector('form');
    if (form) {
      form.addEventListener('submit', (e) => this.handleMessage(e));
    }

    // Remove welcome message when first message is sent
    const welcomeMsg = document.getElementById('aiWelcome');
    if (welcomeMsg) {
      welcomeMsg.style.display = 'none';
    }
  }

  async handleMessage(e) {
    e.preventDefault();
    const input = document.getElementById('aiInput');
    const message = input.value.trim();
    
    if (!message || this.isLoading) return;

    this.addMessage('user', message);
    input.value = '';
    
    this.isLoading = true;
    const loadingMsg = this.addMessage('bot', '⏳ Thinking...');

    try {
      const lang = localStorage.getItem('lang') || 'en';
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          lang: lang
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Remove loading message
      if (loadingMsg && loadingMsg.parentNode) {
        loadingMsg.parentNode.removeChild(loadingMsg);
      }

      // Add AI response
      this.addMessage('bot', data.response || 'Sorry, something went wrong.');
      
    } catch (error) {
      console.error('AI Error:', error);
      
      // Remove loading message
      if (loadingMsg && loadingMsg.parentNode) {
        loadingMsg.parentNode.removeChild(loadingMsg);
      }

      const lang = localStorage.getItem('lang') || 'en';
      const errorMsg = lang === 'ru'
        ? '❌ Ошибка подключения к AI. Попробуй еще раз!'
        : '❌ AI service connection error. Please try again!';
      this.addMessage('bot', errorMsg);
    } finally {
      this.isLoading = false;
      this.focusInput();
    }
  }

  addMessage(sender, text) {
    const chatMessages = document.getElementById('aiMessages');
    if (!chatMessages) return;

    const messageEl = document.createElement('div');
    messageEl.className = `ai-message ${sender}`;
    messageEl.textContent = text;
    messageEl.style.whiteSpace = 'pre-wrap';
    messageEl.style.wordWrap = 'break-word';
    chatMessages.appendChild(messageEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return messageEl;
  }

  focusInput() {
    const input = document.getElementById('aiInput');
    if (input) input.focus();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new SmartAI();
});

