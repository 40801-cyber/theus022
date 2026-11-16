// CadêMeuCelular? - Main Application & Interactive Experience
// Pure Vanilla JavaScript (sem React)

document.addEventListener('DOMContentLoaded', () => {
  // Elements Reference
  const cinematicIntro = document.getElementById('cinematicIntro');
  const introStep1 = document.getElementById('introStep1');
  const introStep2 = document.getElementById('introStep2');
  const introTimerBar = document.getElementById('introTimerBar');
  const btnEnterSite = document.getElementById('btnEnterSite');
  const btnSkipIntro = document.getElementById('btnSkipIntro');

  // Sound Controls
  const btnSoundToggle = document.getElementById('btnSoundToggle');
  const soundIconOn = document.getElementById('soundIconOn');
  const soundIconOff = document.getElementById('soundIconOff');

  // Interactive Quiz
  const btnQuizYes = document.getElementById('btnQuizYes');
  const btnQuizNo = document.getElementById('btnQuizNo');
  const quizResultYes = document.getElementById('quizResultYes');
  const quizResultNo = document.getElementById('quizResultNo');

  // Simulator Elements
  const btnSimAlarm = document.getElementById('btnSimAlarm');
  const btnSimAlarmText = document.getElementById('btnSimAlarmText');
  const btnSimRadar = document.getElementById('btnSimRadar');
  const btnSimMap = document.getElementById('btnSimMap');
  const simSoundwaves = document.getElementById('simSoundwaves');
  const simStatusTitle = document.getElementById('simStatusTitle');
  const simStatusSub = document.getElementById('simStatusSub');

  // FAQ Elements
  const faqItems = document.querySelectorAll('.faq-item');

  // Checkout Modal Elements
  const checkoutModal = document.getElementById('checkoutModal');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnOpenCheckouts = document.querySelectorAll('.btn-open-checkout');
  const modalPlanName = document.getElementById('modalPlanName');
  const modalPlanPrice = document.getElementById('modalPlanPrice');
  const tabPix = document.getElementById('tabPix');
  const tabCard = document.getElementById('tabCard');
  const pixContainer = document.getElementById('pixContainer');
  const cardContainer = document.getElementById('cardContainer');
  const btnCopyPix = document.getElementById('btnCopyPix');
  const pixCodeInput = document.getElementById('pixCodeInput');
  const btnConfirmPayment = document.getElementById('btnConfirmPayment');

  /* ========================================================================
     1. CINEMATIC INTRO SIMULATION (5 SEGUNDOS)
     ======================================================================== */
  let introDuration = 4500; // 4.5s countdown
  let startTime = Date.now();
  let introTimerInterval = null;
  let heartbeatCount = 0;

  // Heartbeat interval during step 1
  const heartbeatTimer = setInterval(() => {
    if (heartbeatCount < 3 && !cinematicIntro.classList.contains('hidden')) {
      if (window.soundFX) window.soundFX.playHeartbeat();
      heartbeatCount++;
    } else {
      clearInterval(heartbeatTimer);
    }
  }, 1200);

  introTimerInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const remainingRatio = Math.max(0, 1 - (elapsed / introDuration));
    if (introTimerBar) {
      introTimerBar.style.width = (remainingRatio * 100) + '%';
    }

    if (elapsed >= introDuration) {
      clearInterval(introTimerInterval);
      showIntroStep2();
    }
  }, 50);

  function showIntroStep2() {
    introStep1.classList.remove('active');
    setTimeout(() => {
      introStep1.style.display = 'none';
      introStep2.style.display = 'block';
      setTimeout(() => {
        introStep2.classList.add('active');
      }, 50);
    }, 300);
  }

  function closeIntro() {
    clearInterval(introTimerInterval);
    clearInterval(heartbeatTimer);
    cinematicIntro.classList.add('hidden');
    if (window.soundFX) window.soundFX.playClick();
  }

  if (btnEnterSite) btnEnterSite.addEventListener('click', closeIntro);
  if (btnSkipIntro) btnSkipIntro.addEventListener('click', closeIntro);

  /* ========================================================================
     2. CONTROLE DE ÁUDIO / SOUND EFFECTS
     ======================================================================== */
  if (btnSoundToggle) {
    btnSoundToggle.addEventListener('click', () => {
      if (!window.soundFX) return;
      const isMuted = window.soundFX.toggleMute();
      if (isMuted) {
        soundIconOn.style.display = 'none';
        soundIconOff.style.display = 'block';
      } else {
        soundIconOn.style.display = 'block';
        soundIconOff.style.display = 'none';
        window.soundFX.playClick();
      }
    });
  }

  /* ========================================================================
     3. DIFERENCIAL CRIATIVO — QUIZ INTERATIVO
     ======================================================================== */
  if (btnQuizYes && btnQuizNo) {
    btnQuizYes.addEventListener('click', () => {
      if (window.soundFX) window.soundFX.playClick();
      btnQuizYes.classList.add('selected');
      btnQuizNo.classList.remove('selected');
      quizResultYes.classList.add('active');
      quizResultNo.classList.remove('active');
    });

    btnQuizNo.addEventListener('click', () => {
      if (window.soundFX) window.soundFX.playClick();
      btnQuizNo.classList.add('selected');
      btnQuizYes.classList.remove('selected');
      quizResultNo.classList.add('active');
      quizResultYes.classList.remove('active');
    });
  }

  /* ========================================================================
     4. SIMULADOR DO APLICATIVO AO VIVO (INTERACTIVE MOCKUP)
     ======================================================================== */
  let isAlarmActive = false;

  if (btnSimAlarm) {
    btnSimAlarm.addEventListener('click', () => {
      isAlarmActive = !isAlarmActive;
      if (isAlarmActive) {
        if (window.soundFX) window.soundFX.startAlarm();
        btnSimAlarm.classList.add('active-alarm');
        btnSimAlarmText.textContent = 'Silenciar Alarme';
        simSoundwaves.classList.add('active');
        simStatusTitle.textContent = '🔊 TOCANDO NO MÁXIMO!';
        simStatusTitle.style.color = '#ff4d6d';
        simStatusSub.textContent = 'Modo silencioso rompido com sucesso!';
        simStatusSub.style.color = '#ffffff';
      } else {
        if (window.soundFX) window.soundFX.stopAlarm();
        btnSimAlarm.classList.remove('active-alarm');
        btnSimAlarmText.textContent = 'Disparar Alarme Anti-Silencioso';
        simSoundwaves.classList.remove('active');
        simStatusTitle.textContent = 'CadêMeuCelular?';
        simStatusTitle.style.color = '#ffffff';
        simStatusSub.textContent = 'Sistema em Espera Ativa';
        simStatusSub.style.color = 'var(--accent-green)';
      }
    });
  }

  if (btnSimRadar) {
    btnSimRadar.addEventListener('click', () => {
      if (window.soundFX) {
        window.soundFX.playRadarPing();
        setTimeout(() => window.soundFX.playRadarPing(), 400);
        setTimeout(() => window.soundFX.playRadarPing(), 800);
      }
      simStatusTitle.textContent = '📡 Radar Conectado';
      simStatusTitle.style.color = 'var(--accent-green)';
      simStatusSub.textContent = 'Detectando... Sinal forte: a menos de 2 metros!';
    });
  }

  if (btnSimMap) {
    btnSimMap.addEventListener('click', () => {
      if (window.soundFX) window.soundFX.playClick();
      simStatusTitle.textContent = '📍 Coordenada GPS Fixada';
      simStatusTitle.style.color = 'var(--accent-cyan)';
      simStatusSub.textContent = 'Precisão: 1,5m • Último sinal: agora mesmo';
    });
  }

  /* ========================================================================
     5. QUEBRA DE OBJEÇÕES (FAQ ACCORDION)
     ======================================================================== */
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    // Inicializar altura se já estiver ativo
    if (item.classList.contains('active') && content) {
      content.style.maxHeight = content.scrollHeight + 'px';
    }

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Fecha todos os outros itens
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherContent = otherItem.querySelector('.faq-content');
        if (otherContent) otherContent.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        if (window.soundFX) window.soundFX.playClick();
      }
    });
  });

  /* ========================================================================
     6. MODAL DE CHECKOUT & ATIVAÇÃO
     ======================================================================== */
  btnOpenCheckouts.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const planName = btn.getAttribute('data-plan') || 'Plano Familiar Vitalício';
      const planPrice = btn.getAttribute('data-price') || 'R$ 89,90';

      modalPlanName.textContent = planName;
      modalPlanPrice.textContent = planPrice;

      checkoutModal.classList.add('active');
      if (window.soundFX) window.soundFX.playClick();
    });
  });

  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', () => {
      checkoutModal.classList.remove('active');
      if (window.soundFX) window.soundFX.playClick();
    });
  }

  // Fechar ao clicar fora do modal
  checkoutModal.addEventListener('click', (e) => {
    if (e.target === checkoutModal) {
      checkoutModal.classList.remove('active');
    }
  });

  // Alternar abas Pix / Cartão
  if (tabPix && tabCard) {
    tabPix.addEventListener('click', () => {
      tabPix.classList.add('active');
      tabCard.classList.remove('active');
      pixContainer.style.display = 'block';
      cardContainer.style.display = 'none';
      if (window.soundFX) window.soundFX.playClick();
    });

    tabCard.addEventListener('click', () => {
      tabCard.classList.add('active');
      tabPix.classList.remove('active');
      pixContainer.style.display = 'none';
      cardContainer.style.display = 'block';
      if (window.soundFX) window.soundFX.playClick();
    });
  }

  // Copiar código Pix
  if (btnCopyPix && pixCodeInput) {
    btnCopyPix.addEventListener('click', () => {
      pixCodeInput.select();
      pixCodeInput.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(pixCodeInput.value).then(() => {
        btnCopyPix.textContent = 'Copiado! ✓';
        btnCopyPix.style.background = '#10b981';
        setTimeout(() => {
          btnCopyPix.textContent = 'Copiar';
          btnCopyPix.style.background = 'var(--accent-green)';
        }, 2500);
      });
      if (window.soundFX) window.soundFX.playClick();
    });
  }

  // Confirmar Pagamento Simulado
  if (btnConfirmPayment) {
    btnConfirmPayment.addEventListener('click', () => {
      btnConfirmPayment.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
          <path d="M12 2a10 10 0 0 1 10 10"/>
        </svg> Processando Ativação...
      `;
      btnConfirmPayment.style.pointerEvents = 'none';

      setTimeout(() => {
        btnConfirmPayment.style.background = '#10b981';
        btnConfirmPayment.innerHTML = '✓ Licença Ativada com Sucesso!';
        setTimeout(() => {
          alert('Parabéns! Sua licença do CadêMeuCelular? foi gerada. O link direto de download e a chave de acesso foram enviados para o seu e-mail.');
          checkoutModal.classList.remove('active');
          btnConfirmPayment.innerHTML = 'CONFIRMAR & ATIVAR APLICATIVO';
          btnConfirmPayment.style.pointerEvents = 'auto';
        }, 600);
      }, 1500);
    });
  }

  /* ========================================================================
     7. NAVEGAÇÃO SUAVE E HEADER BLUR
     ======================================================================== */
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 40) {
      header.style.background = 'rgba(6, 11, 24, 0.95)';
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
    } else {
      header.style.background = 'rgba(6, 11, 24, 0.85)';
      header.style.boxShadow = 'none';
    }
  });
});
