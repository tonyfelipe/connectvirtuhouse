javascript
/**
 * connect>_ virtuhouse - Módulo Frontend
 * Arquitetura desacoplada pronta para acoplamento de API REST / Backend.
 */

const APP_CONFIG = {
  // Substitua pela URL real do seu servidor quando o backend estiver ativo
  apiBaseUrl: 'https://connectvirtuhouse.com.br',
  endpoints: {
    comercio: '/auth/comercio/login',
    motoqueiro: '/auth/entregador/login',
    admin: '/auth/admin/login'
  },
  roleMetadata: {
    comercio: {
      title: 'Terminal: Portal do Comércio',
      description: 'Acesse para solicitar entregas na Grande SP, imprimir etiquetas e gerenciar faturas.'
    },
    motoqueiro: {
      title: 'Terminal: Portal do Motoqueiro',
      description: 'Acesse com seu CPF/E-mail cadastrado para ficar online e receber rotas.'
    },
    admin: {
      title: 'Terminal: Administrador Geral',
      description: 'Acesso restrito à gestão de infraestrutura, cadastros e auditoria.'
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('auth-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const loginForm = document.getElementById('login-form');
  const roleInput = document.getElementById('user-role');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-role-desc');
  const feedbackEl = document.getElementById('form-feedback');
  const roleButtons = document.querySelectorAll('[data-role]');

  // Atualiza ano no rodapé
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Abre o modal configurado para o perfil selecionado
  roleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedRole = button.getAttribute('data-role');
      const meta = APP_CONFIG.roleMetadata[selectedRole];

      if (!meta || !modal) return;

      roleInput.value = selectedRole;
      modalTitle.textContent = meta.title;
      modalDesc.textContent = meta.description;
      feedbackEl.textContent = '';
      loginForm.reset();

      modal.showModal();
    });
  });

  // Fecha o modal pelo botão ou clique fora
  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => modal.close());

    modal.addEventListener('click', (event) => {
      const rect = modal.getBoundingClientRect();
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (!isInDialog) {
        modal.close();
      }
    });
  }

  // Submissão preparada para consumo futuro do Backend
  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const role = roleInput.value;
      const identifier = document.getElementById('login-id').value.trim();
      const password = document.getElementById('login-pass').value;

      if (!identifier || !password) {
        feedbackEl.textContent = '[ERRO]: Preencha identificador e chave de acesso.';
        return;
      }

      const targetEndpoint = `${APP_CONFIG.apiBaseUrl}${APP_CONFIG.endpoints[role]}`;
      feedbackEl.textContent = `> Conectando a ${targetEndpoint}...`;

      try {
        // Quando o backend estiver online, descomente o bloco fetch abaixo:
        /*
        const response = await fetch(targetEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ identifier, password, role })
        });

        if (!response.ok) throw new Error('Falha na autenticação');
        const data = await response.json();
        // Redirecionar para dashboard específico: window.location.href = data.redirectUrl;
        */

        // Simulação de resposta enquanto o site está em modo estático
        setTimeout(() => {
          feedbackEl.textContent = `[STANDBY]: Payload pronto para o perfil "${role.toUpperCase()}". Conecte o servidor backend para autenticar.`;
        }, 500);

      } catch (error) {
        feedbackEl.textContent = '[FALHA]: Servidor backend indisponível no momento.';
      }
    });
  }
});
