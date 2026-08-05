/**
 * LUMAIRAM TECH - Simulador Dinâmico Interativo de WhatsApp
 * Demonstração realista de casos de uso reais: Triagem, E-commerce, Agendamentos, Infoprodutos e Grupos.
 */

(function() {
    'use strict';

    const SCENARIOS = [
        {
            id: 'triagem',
            title: 'Lumairam Atendimento',
            status: 'online • 4 atendentes ativos',
            icon: 'fa-solid fa-building-user',
            badge: 'ROTEAMENTO INTELIGENTE',
            descTitle: '01. Triagem por Setores com Botões Interativos (Meta API)',
            descText: 'Esqueça menus numéricos arcaicos. O cliente escolhe o departamento através de botões interativos nativos do WhatsApp Cloud API. A conversa é roteada em tempo real para o atendente correto com histórico preservado.',
            steps: [
                { type: 'user', text: 'Olá! Gostaria de falar sobre a renovação do meu contrato de serviços.', time: '10:14' },
                { type: 'typing', delay: 700 },
                { 
                    type: 'bot', 
                    badge: '🤖 BOT LUMAIRAM', 
                    text: 'Olá! Seja bem-vindo à Lumairam. Para agilizar seu atendimento, selecione o departamento desejado:', 
                    buttons: ['🏢 Comercial & Planos', '💰 Financeiro & Contratos', '🛠️ Suporte Técnico'],
                    time: '10:14' 
                },
                { type: 'click_btn', btnIndex: 1, delay: 1100 },
                { type: 'user_sent', text: '💰 Financeiro & Contratos', time: '10:14' },
                { type: 'typing', delay: 600 },
                { 
                    type: 'system', 
                    badge: '⚡ ROTEAMENTO AUTOMÁTICO', 
                    text: 'Transferindo para a fila do setor Financeiro... Atendente conectado.', 
                    time: '10:14' 
                },
                { type: 'typing', delay: 900 },
                { 
                    type: 'agent', 
                    badge: '👤 Lucas Vale (Financeiro)', 
                    text: 'Olá! Sou o Lucas do setor Financeiro. Já localizei seu contrato em nosso sistema. Como posso te auxiliar hoje?', 
                    time: '10:15' 
                }
            ]
        },
        {
            id: 'ecommerce',
            title: 'Lumairam E-commerce & Estoque',
            status: '🤖 IA de Vendas 24/7 Ativa',
            icon: 'fa-solid fa-cart-shopping',
            badge: 'CATÁLOGO & CHECKOUT PIX',
            descTitle: '02. Venda com Catálogo, Estoque em Tempo Real e Mercado Pago',
            descText: 'A IA consulta o estoque nas planilhas/Drive em tempo real, apresenta o produto formatado e gera o link ou Pix Copia e Cola do Mercado Pago direto na conversa. A baixa no estoque e emissão são automáticas.',
            steps: [
                { type: 'user', text: 'Olá! Vocês têm o Notebook Dell i7 em estoque para pronta entrega?', time: '14:20' },
                { type: 'typing', delay: 800 },
                { 
                    type: 'product',
                    badge: '🤖 IA DE VENDAS',
                    icon: 'fa-solid fa-laptop',
                    title: 'Dell Inspiron 15 • Core i7 16GB SSD 512GB',
                    price: 'R$ 4.290,00',
                    badgeTag: '⚡ 3 Unidades em Estoque • Frete Grátis',
                    btnText: '💳 Comprar com Pix ou Cartão',
                    time: '14:20'
                },
                { type: 'user', text: 'Perfeito! Quero fechar no Pix agora, consegue gerar o link?', time: '14:21' },
                { type: 'typing', delay: 700 },
                { 
                    type: 'checkout',
                    badge: '💳 MERCADO PAGO OFICIAL',
                    orderId: '#PED-8492',
                    amount: 'R$ 4.290,00',
                    pixKey: '00020126580014br.gov.bcb.pix0136lumairam-pay-8492520400005303986',
                    time: '14:21'
                },
                { type: 'typing', delay: 1000 },
                {
                    type: 'success',
                    badge: '✅ PAGAMENTO PIX CONFIRMADO',
                    text: 'Recebemos seu Pix de R$ 4.290,00! Estoque baixado (-1 unid.) e comprovante/NF enviado no seu e-mail.',
                    time: '14:22'
                }
            ]
        },
        {
            id: 'agendamento',
            title: 'Lumairam Agendamentos',
            status: '📅 Agenda Google Sincronizada',
            icon: 'fa-solid fa-calendar-days',
            badge: 'GOOGLE CALENDAR INTEGRADO',
            descTitle: '03. Agendamento Inteligente de Consultorias e Serviços',
            descText: 'O sistema verifica os horários livres na agenda, permite ao cliente selecionar o horário com 1 clique e cria o evento sincronizado no Google Calendar com link do Google Meet e lembretes automáticos.',
            steps: [
                { type: 'user', text: 'Gostaria de agendar uma reunião de diagnóstico contábil esta semana.', time: '11:05' },
                { type: 'typing', delay: 800 },
                {
                    type: 'calendar',
                    badge: '📅 AGENDAMENTO AUTOMÁTICO',
                    text: 'Consultando agenda em tempo real... Temos estes horários livres para Quinta-feira:',
                    slots: ['🕒 09:30 - Manhã', '🕒 14:00 - Tarde', '🕒 16:30 - Tarde'],
                    time: '11:05'
                },
                { type: 'click_btn', btnIndex: 1, delay: 1100 },
                { type: 'user_sent', text: '🕒 14:00 - Tarde', time: '11:06' },
                { type: 'typing', delay: 700 },
                {
                    type: 'success',
                    badge: '✅ REUNIÃO CONFIRMADA NO GOOGLE AGENDA',
                    text: 'Sua consultoria foi confirmada para Quinta-feira às 14:00! Link do Google Meet e convite já estão na sua agenda.',
                    time: '11:06'
                }
            ]
        },
        {
            id: 'infoproduto',
            title: 'Academia Lumairam Tech',
            status: '🚀 Liberação Automática 24/7',
            icon: 'fa-solid fa-graduation-cap',
            badge: 'INFOPRODUTOS & CURSOS',
            descTitle: '04. Venda de Cursos e Infoprodutos com Entrega Imediata',
            descText: 'Funil direto de conversão para infoprodutos. A IA apresenta a oferta com gatilho promocional, processa o pagamento e envia na hora o acesso à área de membros e os arquivos no Google Drive.',
            steps: [
                { type: 'user', text: 'Vi a publicação do curso de Automação com Google Apps Script e IA. Como funciona?', time: '19:30' },
                { type: 'typing', delay: 800 },
                {
                    type: 'infoproduct',
                    badge: '🎓 FORMAÇÃO COMPLETA',
                    title: 'Formação Expert em Automações GAS + WhatsApp API',
                    oldPrice: 'R$ 497,00',
                    price: 'R$ 197,00 (60% OFF)',
                    features: 'Acesso vitalício • 50+ templates prontos • Suporte direto',
                    btnText: '🚀 Garantir Minha Vaga Promocional',
                    time: '19:30'
                },
                { type: 'click_btn', btnIndex: 0, delay: 1100 },
                { type: 'user_sent', text: '🚀 Garantir Minha Vaga Promocional', time: '19:31' },
                { type: 'typing', delay: 900 },
                {
                    type: 'success',
                    badge: '🎉 ACESSO VITALÍCIO LIBERADO',
                    text: 'Parabéns! Pagamento aprovado. Seu login da plataforma e a pasta exclusiva no Google Drive foram liberados imediatamente!',
                    time: '19:31'
                }
            ]
        },
        {
            id: 'fornecedores',
            title: 'Grupo: Fornecedores Tech (Sidecar)',
            status: '⚡ Microserviço Baileys + IA',
            icon: 'fa-solid fa-users-viewfinder',
            badge: 'AUTOMAÇÃO DE GRUPOS',
            descTitle: '05. Captação em Grupos de Fornecedores e Disparo de Ofertas',
            descText: 'O Sidecar Node.js escuta grupos de fornecedores 24h por dia, lê fotos e preços com IA, cadastra produtos no estoque e dispara ofertas em massa para grupos de clientes sem custos adicionais na API da Meta.',
            steps: [
                { 
                    type: 'supplier_msg', 
                    badge: '📦 Fornecedor Distribuidora Tech (Grupo)', 
                    text: '🔥 OPORTUNIDADE: Lote com 10x Placas RTX 4070 12GB - R$ 3.190 cada à vista. Pronta entrega!', 
                    time: '16:02' 
                },
                { type: 'typing', delay: 800 },
                {
                    type: 'system',
                    badge: '⚡ SIDECAR + IA GEMINI',
                    text: 'IA identificou o produto no grupo, aplicou a margem de lucro e cadastrou 10 unidades no estoque automaticamente.',
                    time: '16:02'
                },
                { type: 'typing', delay: 1000 },
                {
                    type: 'group_broadcast',
                    badge: '📢 DISPARO NO GRUPO DE CLIENTES',
                    text: '🚀 NOVIDADE NO ESTOQUE: Placa RTX 4070 por R$ 3.890 em até 12x! Garanta a sua pelo link oficial: wa.me/lumairam?text=ComprarRTX',
                    time: '16:03'
                }
            ]
        }
    ];

    let currentScenarioIndex = 0;
    let currentStepIndex = 0;
    let stepTimer = null;
    let isTransitioning = false;

    // DOM Elements
    let chatBody = null;
    let titleEl = null;
    let statusEl = null;
    let avatarEl = null;
    let progressFill = null;
    let scenarioNav = null;
    let scenarioDesc = null;

    function initSimulator() {
        chatBody = document.getElementById('wpp-chat-body');
        titleEl = document.getElementById('wpp-sim-title');
        statusEl = document.getElementById('wpp-sim-status');
        avatarEl = document.getElementById('wpp-sim-avatar');
        progressFill = document.getElementById('wpp-progress-fill');
        scenarioNav = document.getElementById('wpp-scenario-nav');
        scenarioDesc = document.getElementById('wpp-scenario-desc');

        if (!chatBody || !scenarioNav) return;

        // Attach Nav Click Events (permite navegar manualmente se quiser, mas continua o loop automático)
        const pills = scenarioNav.querySelectorAll('.wpp-scenario-pill');
        pills.forEach((pill) => {
            pill.addEventListener('click', () => {
                const targetIdx = parseInt(pill.getAttribute('data-scenario'), 10);
                switchScenario(targetIdx);
            });
        });

        // Inicia o primeiro cenário no loop automático contínuo
        loadScenario(0);
    }

    function switchScenario(index) {
        clearTimeout(stepTimer);
        isTransitioning = false;
        currentScenarioIndex = index;
        loadScenario(index);
    }

    function loadScenario(index) {
        const scenario = SCENARIOS[index];
        if (!scenario) return;

        currentStepIndex = 0;
        isTransitioning = false;
        updateProgressBar(0);

        // Update Header
        if (titleEl) titleEl.textContent = scenario.title;
        if (statusEl) statusEl.innerHTML = `<i class="fa-solid fa-circle" style="font-size:0.4rem; color:#25d366; vertical-align:middle; margin-right:4px;"></i>${scenario.status}`;
        if (avatarEl) avatarEl.innerHTML = `<i class="${scenario.icon}"></i>`;

        // Update Scenario Pills
        const pills = scenarioNav.querySelectorAll('.wpp-scenario-pill');
        pills.forEach((pill, idx) => {
            if (idx === index) pill.classList.add('active');
            else pill.classList.remove('active');
        });

        // Update Scenario Description Box
        if (scenarioDesc) {
            scenarioDesc.innerHTML = `
                <div class="wpp-desc-badge">${scenario.badge}</div>
                <h3>${scenario.descTitle}</h3>
                <p>${scenario.descText}</p>
            `;
        }

        // Clear chat body with a quick clean fade
        chatBody.innerHTML = '';

        // Run steps automatically
        runNextStep();
    }

    function updateProgressBar(percent) {
        if (progressFill) {
            progressFill.style.transition = 'width 0.4s ease';
            progressFill.style.width = Math.min(100, Math.max(0, percent)) + '%';
        }
    }

    function runNextStep() {
        const scenario = SCENARIOS[currentScenarioIndex];
        if (!scenario) return;

        // Se chegou ao fim do cenário atual, aguarda 2.2 segundos e avança para o próximo automaticamente
        if (currentStepIndex >= scenario.steps.length) {
            if (!isTransitioning) {
                isTransitioning = true;
                updateProgressBar(100);
                stepTimer = setTimeout(() => {
                    const nextIdx = (currentScenarioIndex + 1) % SCENARIOS.length;
                    switchScenario(nextIdx);
                }, 2200);
            }
            return;
        }

        const totalSteps = scenario.steps.length;
        const progressPercent = ((currentStepIndex + 1) / totalSteps) * 100;
        updateProgressBar(progressPercent);

        const step = scenario.steps[currentStepIndex];
        currentStepIndex++;

        // Remove typing indicator anterior
        removeTypingIndicator();

        if (step.type === 'typing') {
            showTypingIndicator();
            stepTimer = setTimeout(runNextStep, step.delay || 700);
        } else if (step.type === 'click_btn') {
            highlightButton(step.btnIndex);
            stepTimer = setTimeout(runNextStep, step.delay || 900);
        } else {
            renderMessage(step);
            // Intervalo natural entre mensagens
            const nextDelay = (step.type === 'success' || step.type === 'product' || step.type === 'checkout') ? 1400 : 900;
            stepTimer = setTimeout(runNextStep, nextDelay);
        }
    }

    function renderMessage(step) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'wpp-msg-wrapper';

        switch(step.type) {
            case 'user':
                msgDiv.innerHTML = `
                    <div class="wpp-msg received">
                        ${step.text}
                        <div class="wpp-msg-time">${step.time}</div>
                    </div>
                `;
                break;

            case 'user_sent':
                msgDiv.innerHTML = `
                    <div class="wpp-msg sent">
                        ${step.text}
                        <div class="wpp-msg-time">${step.time} <i class="fa-solid fa-check-double wpp-ticks"></i></div>
                    </div>
                `;
                break;

            case 'bot':
                let buttonsHtml = '';
                if (step.buttons && step.buttons.length > 0) {
                    buttonsHtml = `
                        <div class="wpp-interactive-options" id="wpp-btn-group">
                            ${step.buttons.map((btn, i) => `
                                <div class="wpp-interactive-btn" data-btn-idx="${i}">
                                    <span>${btn}</span>
                                    <i class="fa-solid fa-arrow-pointer" style="font-size:0.55rem; opacity:0.6;"></i>
                                </div>
                            `).join('')}
                        </div>
                    `;
                }
                msgDiv.innerHTML = `
                    <div class="wpp-msg bot">
                        <div class="wpp-msg-bot-badge">${step.badge}</div>
                        <div>${step.text}</div>
                        ${buttonsHtml}
                        <div class="wpp-msg-time">${step.time}</div>
                    </div>
                `;
                break;

            case 'product':
                msgDiv.innerHTML = `
                    <div class="wpp-msg bot">
                        <div class="wpp-msg-bot-badge">${step.badge}</div>
                        <div class="wpp-product-card">
                            <div class="wpp-product-header">
                                <div class="wpp-product-icon"><i class="${step.icon}"></i></div>
                                <div>
                                    <div class="wpp-product-title">${step.title}</div>
                                    <div class="wpp-product-tag">${step.badgeTag}</div>
                                </div>
                            </div>
                            <div class="wpp-product-price">${step.price}</div>
                            <div class="wpp-interactive-btn selected" style="margin-top:6px; justify-content:center;">
                                <i class="fa-solid fa-bolt" style="color:#00f2ff; margin-right:4px;"></i> ${step.btnText}
                            </div>
                        </div>
                        <div class="wpp-msg-time">${step.time}</div>
                    </div>
                `;
                break;

            case 'checkout':
                msgDiv.innerHTML = `
                    <div class="wpp-msg bot">
                        <div class="wpp-msg-bot-badge">${step.badge}</div>
                        <div class="wpp-checkout-card">
                            <div style="font-weight:700; color:#fff; font-size:0.75rem; margin-bottom:2px;">
                                Pedido ${step.orderId} • Total: <span style="color:#25d366">${step.amount}</span>
                            </div>
                            <div style="font-size:0.6rem; color:rgba(255,255,255,0.7); margin-bottom:6px;">
                                Chave Pix Copia e Cola com aprovação instantânea:
                            </div>
                            <div class="wpp-pix-box">
                                <code>${step.pixKey}</code>
                                <span class="wpp-pix-copy"><i class="fa-regular fa-copy"></i> Copiar</span>
                            </div>
                            <div class="wpp-interactive-btn selected" style="margin-top:6px; justify-content:center; background:rgba(37,211,102,0.2); border-color:#25d366; color:#25d366;">
                                <i class="fa-brands fa-pix" style="margin-right:4px;"></i> Pagar no App do Banco
                            </div>
                        </div>
                        <div class="wpp-msg-time">${step.time}</div>
                    </div>
                `;
                break;

            case 'calendar':
                let slotsHtml = '';
                if (step.slots && step.slots.length > 0) {
                    slotsHtml = `
                        <div class="wpp-slots-group" id="wpp-btn-group">
                            ${step.slots.map((slot, i) => `
                                <div class="wpp-interactive-btn" data-btn-idx="${i}">
                                    <span>${slot}</span>
                                </div>
                            `).join('')}
                        </div>
                    `;
                }
                msgDiv.innerHTML = `
                    <div class="wpp-msg bot">
                        <div class="wpp-msg-bot-badge">${step.badge}</div>
                        <div>${step.text}</div>
                        ${slotsHtml}
                        <div class="wpp-msg-time">${step.time}</div>
                    </div>
                `;
                break;

            case 'infoproduct':
                msgDiv.innerHTML = `
                    <div class="wpp-msg bot">
                        <div class="wpp-msg-bot-badge">${step.badge}</div>
                        <div class="wpp-infoproduct-card">
                            <div class="wpp-product-title" style="font-size:0.75rem;">${step.title}</div>
                            <div style="font-size:0.6rem; color:rgba(255,255,255,0.7); margin:4px 0;">${step.features}</div>
                            <div style="display:flex; align-items:baseline; gap:6px; margin:4px 0;">
                                <span style="text-decoration:line-through; font-size:0.6rem; opacity:0.6;">${step.oldPrice}</span>
                                <span style="color:#25d366; font-weight:800; font-size:0.85rem;">${step.price}</span>
                            </div>
                            <div id="wpp-btn-group">
                                <div class="wpp-interactive-btn" data-btn-idx="0" style="margin-top:6px; justify-content:center;">
                                    ${step.btnText}
                                </div>
                            </div>
                        </div>
                        <div class="wpp-msg-time">${step.time}</div>
                    </div>
                `;
                break;

            case 'system':
                msgDiv.innerHTML = `
                    <div class="wpp-msg system">
                        <div class="wpp-msg-bot-badge" style="background:rgba(255,184,0,0.15); color:#ffb800;">${step.badge}</div>
                        <div>${step.text}</div>
                        <div class="wpp-msg-time">${step.time}</div>
                    </div>
                `;
                break;

            case 'agent':
                msgDiv.innerHTML = `
                    <div class="wpp-msg agent">
                        <div class="wpp-msg-bot-badge" style="background:rgba(37,211,102,0.15); color:#25d366;">${step.badge}</div>
                        <div>${step.text}</div>
                        <div class="wpp-msg-time">${step.time}</div>
                    </div>
                `;
                break;

            case 'supplier_msg':
                msgDiv.innerHTML = `
                    <div class="wpp-msg received" style="border-left: 3px solid #ff0055;">
                        <div class="wpp-msg-bot-badge" style="background:rgba(255,0,85,0.15); color:#ff0055;">${step.badge}</div>
                        <div>${step.text}</div>
                        <div class="wpp-msg-time">${step.time}</div>
                    </div>
                `;
                break;

            case 'group_broadcast':
                msgDiv.innerHTML = `
                    <div class="wpp-msg sent" style="border-left: 3px solid #00f2ff;">
                        <div class="wpp-msg-bot-badge" style="background:rgba(0,242,255,0.15); color:#00f2ff;">${step.badge}</div>
                        <div>${step.text}</div>
                        <div class="wpp-msg-time">${step.time} <i class="fa-solid fa-check-double wpp-ticks"></i></div>
                    </div>
                `;
                break;

            case 'success':
                msgDiv.innerHTML = `
                    <div class="wpp-msg success">
                        <div class="wpp-msg-bot-badge" style="background:rgba(37,211,102,0.2); color:#25d366;">${step.badge}</div>
                        <div>${step.text}</div>
                        <div class="wpp-msg-time">${step.time}</div>
                    </div>
                `;
                break;
        }

        chatBody.appendChild(msgDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.id = 'wpp-current-typing';
        typingDiv.className = 'wpp-typing';
        typingDiv.innerHTML = `
            <div class="wpp-typing-dot"></div>
            <div class="wpp-typing-dot"></div>
            <div class="wpp-typing-dot"></div>
        `;
        chatBody.appendChild(typingDiv);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const el = document.getElementById('wpp-current-typing');
        if (el) el.remove();
    }

    function highlightButton(btnIndex) {
        const group = document.getElementById('wpp-btn-group');
        if (!group) return;
        const btns = group.querySelectorAll('.wpp-interactive-btn');
        if (btns[btnIndex]) {
            btns[btnIndex].classList.add('selected');
            btns[btnIndex].style.transform = 'scale(0.96)';
            btns[btnIndex].style.boxShadow = '0 0 15px rgba(0, 242, 255, 0.6)';
            setTimeout(() => {
                btns[btnIndex].style.transform = 'scale(1)';
            }, 300);
        }
    }

    function scrollToBottom() {
        if (chatBody) {
            chatBody.scrollTo({
                top: chatBody.scrollHeight,
                behavior: 'smooth'
            });
        }
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSimulator);
    } else {
        initSimulator();
    }
})();
