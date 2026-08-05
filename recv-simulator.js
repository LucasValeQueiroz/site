/**
 * LUMAIRAM TECH - Simulador Interativo Multi-Cenário com Loops Animados em Tempo Real
 * Reproduz com máxima fidelidade:
 * 1. Loop Upload Multidocumental: NF-e, NFS-e, Duplicatas e Guias de Impostos na mesma tela
 * 2. Loop Extratos Bancários: Leitura de Extrato Multibancos (Itaú/BB/Inter), Limpeza de Históricos e Conciliação por Peso 3
 * 3. Loop Fila de Classificação & Memória de Vínculos
 * 4. Loop Cockpit Gerenciador & Exportação Alterdata Pack (.TXT)
 */

(function() {
    'use strict';

    const SCENARIOS = [
        {
            id: 'loop_upload_docs',
            badge: 'LOOP 1 // PROCESSAMENTO MULTIDOCUMENTAL',
            title: '01. Leitura Dinâmica de NF-e, NFS-e, Boletos e Guias na Mesma Interface',
            desc: 'Demonstração animada do envio de múltiplos documentos fiscais. A IA processa sequencialmente DANFE com CFOP, NFS-e com desmembramento de 4 retenções, Boletos com linha digitável e Guias DARF/DAS segregando principal de multas e juros.',
            type: 'upload_multidoc',
            stats: { speed: '0.9s/doc', accuracy: '100%', output: 'Partidas D/C' },
            steps: [
                {
                    phase: 'uploading',
                    statusText: 'Recebendo pacote de documentos fiscais do cliente via Upload.html...',
                    docCount: '4 arquivos detectados'
                },
                {
                    phase: 'processing_nfe',
                    statusText: 'OCR & IA: Processando NF-e (DANFE) de Mercadorias...',
                    doc: {
                        type: 'NF-e 7849',
                        tag: 'PRODUTOS (CFOP 1.102)',
                        entity: 'TECH DISTRIBUIDORA LTDA',
                        key: '3526 0812 3456 7800 0199 5500 1000 0078 4910 2938 4712',
                        val: 'R$ 14.850,00',
                        entry: 'D: 1.1.03.01 (Estoque Revenda) | C: 2.1.01.01 (Fornecedor)',
                        cred: 'Gera Crédito PIS/COFINS (9,25%) + ICMS (18%)'
                    }
                },
                {
                    phase: 'processing_nfse',
                    statusText: 'OCR & IA: Processando NFS-e Municipal de Serviços com Retenções...',
                    doc: {
                        type: 'NFS-e 892',
                        tag: 'SERVIÇOS DE TI (ABRASF/SPED)',
                        entity: 'NEXUS CONSULTORIA TECH',
                        val: 'R$ 8.500,00 Bruto',
                        retencoes: [
                            'CSRF (PIS/COFINS/CSLL 4,65%): R$ 395,25',
                            'IRRF (1,50%): R$ 127,50',
                            'Líquido a Pagar Fornecedor: R$ 7.977,25'
                        ],
                        entry: '4 Partidas geradas (Despesa, Retenções a Recolher e Fornecedor)'
                    }
                },
                {
                    phase: 'processing_dupl',
                    statusText: 'OCR & IA: Processando Duplicata / Boleto de Cobrança Bancária...',
                    doc: {
                        type: 'BOLETO BRADESCO',
                        tag: 'DUPLICATA 7849/01',
                        entity: 'TECH DISTRIBUIDORA LTDA',
                        barcode: '23793.38128 60000.123456 78000.019900 1 98200000495000',
                        venc: 'Vencimento: 28/08/2026',
                        val: 'R$ 4.950,00',
                        entry: 'Histórico: PG. S/DUPL 7849/01 TECH DISTRIB'
                    }
                },
                {
                    phase: 'processing_imposto',
                    statusText: 'OCR & IA: Processando Guia de Imposto Federal (DARF 1708)...',
                    doc: {
                        type: 'DARF 1708',
                        tag: 'IRRF SERVIÇOS PJ',
                        entity: 'RECEITA FEDERAL DO BRASIL',
                        periodo: 'Período Apuração: 07/2026',
                        valPrincipal: 'Principal: R$ 3.200,00',
                        valJuros: 'Juros/Multa: R$ 50,00',
                        val: 'Total Pago: R$ 3.250,00',
                        entry: 'Liquidação da Provisão: D: 2.1.04.01 | C: 1.1.01.02'
                    }
                },
                {
                    phase: 'done_multidoc',
                    statusText: 'Todos os 4 documentos escriturados e validados com sucesso!',
                    summary: 'Total Contabilizado: R$ 31.550,00 • 100% de Partidas Dobradas Balanceadas'
                }
            ]
        },
        {
            id: 'loop_extratos_bancarios',
            badge: 'LOOP 2 // EXTRATOS MULTIBANCOS & CONCILIAÇÃO',
            title: '02. Leitura de Extrato Bancário, Limpeza de Históricos & Conciliação por Peso 3',
            desc: 'Demonstração da leitura direta de extrato em PDF/OFX do Banco Itaú. O motor limpa as descrições bancárias sujas, cruza em tempo real com as notas e impostos do sistema pelo algoritmo de Peso 3 e executa a baixa em lote com 1 clique.',
            type: 'extrato_conciliacao',
            stats: { speed: '1.2s', accuracy: 'Peso 3 Exato', output: 'Baixa em Lote' },
            steps: [
                {
                    phase: 'upload_extrato',
                    statusText: 'Importando Extrato Bancário Itaú Conta Corrente (Ag 0492 / CC 84920-1)...',
                    totalLines: '34 lançamentos no período'
                },
                {
                    phase: 'cleaning_history',
                    statusText: 'Motor de Inteligência: Higienizando descrições bancárias sujas...',
                    transformations: [
                        { raw: 'PIX TRANSF ELETR 003892 CLIENTE MODERNO', clean: 'PIX RECEBIDO - CLIENTE MODERNO LTDA', val: '+ R$ 18.200,00' },
                        { raw: 'TBI 849201 TECH DISTRIB BOLETO 7849', clean: 'PG. S/DUPL 7849/01 TECH DISTRIB', val: '- R$ 4.950,00' },
                        { raw: 'ARREC DARF 1708 RETENCAO 082026', clean: 'PG. GUIA DARF 1708 RECEITA FEDERAL', val: '- R$ 3.250,00' },
                        { raw: 'TAR CONTA MENSAL PACOTE EMPRESAS', clean: 'DESPESA BANCÁRIA - TARIFA CONTA ITAÚ', val: '- R$ 89,90' }
                    ]
                },
                {
                    phase: 'weight_matching',
                    statusText: 'Conciliação Automática: Cruzando extrato com o Financeiro por Peso 3...',
                    matches: [
                        { doc: 'NF 7849 • Tech Distribuidora', extrato: 'TBI 849201 R$ 4.950,00 (28/08)', matchType: '⭐ Peso 3 (Nota + Valor + Data)' },
                        { doc: 'DARF 1708 • Receita Federal', extrato: 'ARREC DARF R$ 3.250,00 (20/08)', matchType: '⭐ Peso 3 (Guia + Valor + Data)' },
                        { doc: 'NFS-e 892 • Nexus Consultoria', extrato: 'PIX PJ R$ 7.977,25 (27/08)', matchType: '⭐ Peso 3 (Líquido c/ Retenções)' }
                    ]
                },
                {
                    phase: 'batch_clear',
                    statusText: 'Executando comando "Tirar Novo em Lote" com 1 clique...',
                    result: '31 Lançamentos conciliados e baixados automaticamente! Status alterado para "✅ Conciliado".'
                }
            ]
        },
        {
            id: 'loop_fila_classificacao',
            badge: 'LOOP 3 // FILA FISCAL & AUTO-APRENDIZADO',
            title: '03. Fila de Classificação: Destinação de Mercadorias & Memória de Vínculos',
            desc: 'Quando uma nota de fornecedor novo chega, a IA analisa o CFOP e apresenta a destinação na fila. Ao confirmar em 1 clique (Revenda x Consumo), a Central de Inteligência aprende a regra para nunca mais pedir intervenção manual.',
            type: 'fila_vinculos',
            stats: { speed: '1 Clique', accuracy: 'FiscalEngine', output: 'Regra Salva' },
            steps: [
                {
                    phase: 'fila_pending',
                    statusText: 'Fila de Classificação: 3 Notas pendentes de destinação de mercadoria...',
                    queue: [
                        { vendor: 'TECH DISTRIBUIDORA LTDA', nfe: 'NF 7849', val: 'R$ 14.850,00', cfop: '1.102', suggest: '📦 Revenda (Crédito Tributário)' },
                        { vendor: 'PAPELARIA CENTRAL LTDA', nfe: 'NF 1290', val: 'R$ 640,00', cfop: '1.556', suggest: '🏢 Uso e Consumo (Custo Sem Crédito)' }
                    ]
                },
                {
                    phase: 'click_classify',
                    statusText: 'Contador confirma destinação "Revenda" para Tech Distribuidora...',
                    action: 'FiscalEngine calcula crédito integral de PIS (1,65%), COFINS (7,60%) e ICMS (18%).'
                },
                {
                    phase: 'save_rule',
                    statusText: 'Central de Inteligência salva regra permanente na memória da empresa!',
                    rule: 'Próximas notas da "Tech Distribuidora" serão automaticamente classificadas como Revenda (C: 2.1.01.01 / D: 1.1.03.01).'
                }
            ]
        },
        {
            id: 'loop_export_alterdata',
            badge: 'LOOP 4 // EXPORTAÇÃO ERP ALTERDATA PACK',
            title: '04. Cockpit Gerenciador & Exportação Estruturada de Lote (.TXT)',
            desc: 'Consolidação de todos os lançamentos do mês em lote oficial do Alterdata Pack. O sistema valida rigorosamente partidas dobradas balanceadas e inclui chamadas de histórico padrão com interrogação.',
            type: 'alterdata_export',
            stats: { speed: '1.5s', accuracy: 'D = C (100%)', output: 'Lote .TXT' },
            steps: [
                {
                    phase: 'check_balance',
                    statusText: 'Auditoria de Balanço Contábil em Tempo Real...',
                    balance: {
                        debits: 'R$ 518.230,00',
                        credits: 'R$ 518.230,00',
                        diff: 'R$ 0,00 (Perfeito)',
                        docsTotal: '342 lançamentos validados'
                    }
                },
                {
                    phase: 'generate_txt',
                    statusText: 'Formatando arquivo posicional Alterdata Pack (.TXT)...',
                    previewTxt: [
                        '01|20260828|110301|210101|14850.00|1.0|NF 7849 TECH DISTRIBUIDORA LTDA|',
                        '01|20260827|310204|210101|8500.00|1.0|NFSE 892 NEXUS CONSULTORIA TECH|',
                        '01|20260828|210101|110102|4950.00|2.0|PG. S/DUPL 7849/01 TECH DISTRIB|',
                        '01|20260820|210401|110102|3250.00|3.0|PG. S/ IRRF PRINCIPAL CONF GUIA|',
                        '01|20260828|110102|110201|18200.00|4.0|PIX RECEBIDO CLIENTE MODERNO|'
                    ]
                },
                {
                    phase: 'ready_download',
                    statusText: 'Arquivo LOTE_CONTABIL_ALTERDATA.TXT pronto para importação no ERP!',
                    action: 'Zero digitação manual no escritório contábil.'
                }
            ]
        }
    ];

    let currentScenarioIdx = 0;
    let currentStepIdx = 0;
    let stepTimer = null;
    let loopTimer = null;

    // DOM Elements
    let pillsContainer = null;
    let descContainer = null;
    let mockupBody = null;
    let progressBar = null;

    function initSimulator() {
        pillsContainer = document.getElementById('recv-pills-nav');
        descContainer = document.getElementById('recv-desc-panel');
        mockupBody = document.getElementById('recv-sim-body');
        progressBar = document.getElementById('recv-progress-fill');

        if (!pillsContainer || !mockupBody) return;

        renderPills();
        startScenario(0);
    }

    function renderPills() {
        pillsContainer.innerHTML = SCENARIOS.map((sc, idx) => `
            <button class="recv-pill ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
                <i class="${getIcon(sc.type)}"></i>
                <span>${sc.badge.split('//')[1].trim()}</span>
            </button>
        `).join('');

        pillsContainer.querySelectorAll('.recv-pill').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-idx'), 10);
                if (idx !== currentScenarioIdx) {
                    clearAllTimers();
                    startScenario(idx);
                }
            });
        });
    }

    function getIcon(type) {
        switch(type) {
            case 'upload_multidoc': return 'fa-solid fa-file-shield';
            case 'extrato_conciliacao': return 'fa-solid fa-building-columns';
            case 'fila_vinculos': return 'fa-solid fa-brain';
            case 'alterdata_export': return 'fa-solid fa-file-export';
            default: return 'fa-solid fa-microchip';
        }
    }

    function updatePills(activeIdx) {
        if (!pillsContainer) return;
        pillsContainer.querySelectorAll('.recv-pill').forEach((btn, idx) => {
            if (idx === activeIdx) {
                btn.classList.add('active');
                btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                btn.classList.remove('active');
            }
        });
    }

    function clearAllTimers() {
        clearTimeout(stepTimer);
        clearTimeout(loopTimer);
    }

    function startScenario(scIdx) {
        currentScenarioIdx = scIdx;
        currentStepIdx = 0;
        updatePills(scIdx);

        const sc = SCENARIOS[scIdx];
        renderSidePanel(sc);
        playStepSequence(sc);
    }

    function renderSidePanel(sc) {
        if (!descContainer) return;
        descContainer.innerHTML = `
            <div>
                <span class="recv-desc-badge"><i class="fa-solid fa-microchip"></i> ${sc.badge}</span>
                <h3 style="margin-top:0.8rem; margin-bottom:0.6rem; color:#fff; font-size:1.25rem; line-height:1.3;">${sc.title}</h3>
                <p style="font-size:0.86rem; color:var(--text-dim); line-height:1.6;">${sc.desc}</p>
            </div>

            <div class="recv-stats-grid">
                <div class="recv-stat-card">
                    <strong>${sc.stats.speed}</strong>
                    <span>Velocidade</span>
                </div>
                <div class="recv-stat-card">
                    <strong>${sc.stats.accuracy}</strong>
                    <span>Precisão</span>
                </div>
                <div class="recv-stat-card">
                    <strong>${sc.stats.output}</strong>
                    <span>Resultado</span>
                </div>
            </div>

            <div style="font-size:0.75rem; color:var(--text-dim); display:flex; align-items:center; gap:8px; border-top:1px solid rgba(255,255,255,0.08); padding-top:10px;">
                <i class="fa-solid fa-shield-halved" style="color:var(--neon-cyan)"></i>
                <span>Compatível com Alterdata Pack • Google Apps Script • Gemini 2.0 Flash</span>
            </div>
        `;
    }

    function playStepSequence(sc) {
        const step = sc.steps[currentStepIdx];
        if (!step) {
            // Fim dos passos do cenário atual -> Avançar para o próximo após um breve delay
            loopTimer = setTimeout(() => {
                const nextIdx = (currentScenarioIdx + 1) % SCENARIOS.length;
                startScenario(nextIdx);
            }, 2500);
            return;
        }

        // Anima barra de progresso do passo
        const stepDuration = getStepDuration(step.phase);
        animateProgress(stepDuration);

        // Renderiza o visual correspondente ao passo
        renderStepVisual(sc, step, currentStepIdx);

        // Agenda próximo passo
        stepTimer = setTimeout(() => {
            currentStepIdx++;
            playStepSequence(sc);
        }, stepDuration);
    }

    function getStepDuration(phase) {
        switch(phase) {
            case 'uploading': return 1600;
            case 'processing_nfe': return 2800;
            case 'processing_nfse': return 2800;
            case 'processing_dupl': return 2600;
            case 'processing_imposto': return 2800;
            case 'done_multidoc': return 2400;

            case 'upload_extrato': return 1600;
            case 'cleaning_history': return 2800;
            case 'weight_matching': return 3000;
            case 'batch_clear': return 2400;

            case 'fila_pending': return 2200;
            case 'click_classify': return 2400;
            case 'save_rule': return 2200;

            case 'check_balance': return 2000;
            case 'generate_txt': return 2600;
            case 'ready_download': return 2200;

            default: return 2500;
        }
    }

    function animateProgress(duration) {
        if (!progressBar) return;
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        setTimeout(() => {
            progressBar.style.transition = `width ${duration}ms linear`;
            progressBar.style.width = '100%';
        }, 30);
    }

    // ─── RENDERIZADOR DE CADA PASSO VISUAL ───
    function renderStepVisual(sc, step, stepIdx) {
        if (!mockupBody) return;

        switch(sc.type) {
            case 'upload_multidoc':
                renderUploadMultidocStep(step, stepIdx);
                break;
            case 'extrato_conciliacao':
                renderExtratoStep(step, stepIdx);
                break;
            case 'fila_vinculos':
                renderFilaStep(step, stepIdx);
                break;
            case 'alterdata_export':
                renderAlterdataStep(step, stepIdx);
                break;
        }
    }

    // ─── CENÁRIO 1: UPLOAD & LEITURA MULTIDOCUMENTAL ───
    function renderUploadMultidocStep(step, stepIdx) {
        let contentHtml = '';

        if (step.phase === 'uploading') {
            contentHtml = `
                <div class="anim-upload-box">
                    <div class="laser-scanner"></div>
                    <div class="aub-icon"><i class="fa-solid fa-cloud-arrow-up text-cyan"></i></div>
                    <strong style="font-size:1rem; color:#fff;">Recebendo Lote de Documentos do Cliente</strong>
                    <span style="font-size:0.75rem; color:var(--neon-cyan); font-family:'JetBrains Mono',monospace;"><i class="fa-solid fa-spinner fa-spin"></i> ${step.statusText}</span>
                    
                    <div class="doc-incoming-pills">
                        <span class="dip-item"><i class="fa-regular fa-file-pdf"></i> NF-e_7849_DANFE.pdf</span>
                        <span class="dip-item"><i class="fa-regular fa-file-pdf"></i> NFSe_892_Servicos.pdf</span>
                        <span class="dip-item"><i class="fa-regular fa-file-pdf"></i> Boleto_Bradesco.pdf</span>
                        <span class="dip-item"><i class="fa-regular fa-file-pdf"></i> DARF_1708_Julho.pdf</span>
                    </div>
                </div>
            `;
        } else if (step.phase === 'processing_nfe') {
            contentHtml = `
                <div class="anim-doc-card active-card">
                    <div class="laser-scanner"></div>
                    <div class="adc-top">
                        <span class="doc-badge nfe"><i class="fa-solid fa-receipt"></i> ${step.doc.type}</span>
                        <span class="badge-tag-green">${step.doc.tag}</span>
                        <span class="adc-val">${step.doc.val}</span>
                    </div>
                    <div class="adc-body">
                        <strong style="color:#fff; font-size:0.85rem;">${step.doc.entity}</strong>
                        <div class="key-field"><i class="fa-solid fa-barcode"></i> ${step.doc.key}</div>
                        <div class="adc-entry"><i class="fa-solid fa-scale-balanced text-cyan"></i> <b>Partida Contábil:</b> ${step.doc.entry}</div>
                        <div class="adc-fiscal-badge"><i class="fa-solid fa-circle-check text-success"></i> ${step.doc.cred}</div>
                    </div>
                    <div class="adc-status-bar"><i class="fa-solid fa-check-double text-success"></i> ${step.statusText}</div>
                </div>
            `;
        } else if (step.phase === 'processing_nfse') {
            contentHtml = `
                <div class="anim-doc-card active-card">
                    <div class="laser-scanner"></div>
                    <div class="adc-top">
                        <span class="doc-badge nfse"><i class="fa-solid fa-file-contract"></i> ${step.doc.type}</span>
                        <span class="badge-tag-sim">${step.doc.tag}</span>
                        <span class="adc-val">${step.doc.val}</span>
                    </div>
                    <div class="adc-body">
                        <strong style="color:#fff; font-size:0.85rem;">${step.doc.entity}</strong>
                        <div class="retencoes-box">
                            <span class="rb-title"><i class="fa-solid fa-calculator"></i> Desmembramento de 4 Retenções Federais/Municipais:</span>
                            ${step.doc.retencoes.map(r => `<div class="rb-item"><i class="fa-solid fa-minus text-danger"></i> ${r}</div>`).join('')}
                        </div>
                        <div class="adc-entry"><i class="fa-solid fa-code-fork text-purple"></i> ${step.doc.entry}</div>
                    </div>
                    <div class="adc-status-bar"><i class="fa-solid fa-check-double text-success"></i> ${step.statusText}</div>
                </div>
            `;
        } else if (step.phase === 'processing_dupl') {
            contentHtml = `
                <div class="anim-doc-card active-card">
                    <div class="laser-scanner"></div>
                    <div class="adc-top">
                        <span class="doc-badge dupl"><i class="fa-solid fa-barcode"></i> ${step.doc.type}</span>
                        <span class="badge-tag-yellow">${step.doc.tag}</span>
                        <span class="adc-val">${step.doc.val}</span>
                    </div>
                    <div class="adc-body">
                        <strong style="color:#fff; font-size:0.85rem;">${step.doc.entity} • <span style="color:#ffbd2e;">${step.doc.venc}</span></strong>
                        <div class="key-field font-mono"><i class="fa-solid fa-barcode"></i> Linha Digitável: ${step.doc.barcode}</div>
                        <div class="adc-entry"><i class="fa-solid fa-link text-warning"></i> <b>Vínculo & Histórico:</b> ${step.doc.entry}</div>
                    </div>
                    <div class="adc-status-bar"><i class="fa-solid fa-check-double text-success"></i> ${step.statusText}</div>
                </div>
            `;
        } else if (step.phase === 'processing_imposto') {
            contentHtml = `
                <div class="anim-doc-card active-card">
                    <div class="laser-scanner"></div>
                    <div class="adc-top">
                        <span class="doc-badge darf"><i class="fa-solid fa-landmark"></i> ${step.doc.type}</span>
                        <span class="badge-tag-red">${step.doc.tag}</span>
                        <span class="adc-val">${step.doc.val}</span>
                    </div>
                    <div class="adc-body">
                        <strong style="color:#fff; font-size:0.85rem;">${step.doc.entity} • ${step.doc.periodo}</strong>
                        <div class="darf-split">
                            <span class="ds-item"><i class="fa-solid fa-check text-info"></i> ${step.doc.valPrincipal}</span>
                            <span class="ds-item"><i class="fa-solid fa-plus text-danger"></i> ${step.doc.valJuros}</span>
                        </div>
                        <div class="adc-entry"><i class="fa-solid fa-shield-check text-cyan"></i> <b>Baixa da Provisão:</b> ${step.doc.entry}</div>
                    </div>
                    <div class="adc-status-bar"><i class="fa-solid fa-check-double text-success"></i> ${step.statusText}</div>
                </div>
            `;
        } else if (step.phase === 'done_multidoc') {
            contentHtml = `
                <div class="anim-summary-box">
                    <div class="asb-icon"><i class="fa-solid fa-circle-check text-success"></i></div>
                    <strong style="font-size:1.1rem; color:#fff;">Lote Multidocumental 100% Escriturado</strong>
                    <p style="font-size:0.8rem; color:var(--neon-cyan);">${step.summary}</p>
                    
                    <div class="asb-grid">
                        <div class="asb-card"><span>NF-e Mercadorias</span><strong style="color:#00f2ff;">R$ 14.850,00</strong></div>
                        <div class="asb-card"><span>NFS-e Serviços</span><strong style="color:#a78bfa;">R$ 8.500,00</strong></div>
                        <div class="asb-card"><span>Boleto / Duplicata</span><strong style="color:#fb923c;">R$ 4.950,00</strong></div>
                        <div class="asb-card"><span>DARF 1708</span><strong style="color:#f43f5e;">R$ 3.250,00</strong></div>
                    </div>
                </div>
            `;
        }

        mockupBody.innerHTML = contentHtml;
    }

    // ─── CENÁRIO 2: EXTRATOS BANCÁRIOS & CONCILIAÇÃO POR PESOS ───
    function renderExtratoStep(step, stepIdx) {
        let contentHtml = '';

        if (step.phase === 'upload_extrato') {
            contentHtml = `
                <div class="anim-upload-box">
                    <div class="laser-scanner"></div>
                    <div class="aub-icon"><i class="fa-solid fa-building-columns text-cyan"></i></div>
                    <strong style="font-size:1rem; color:#fff;">Parser Multibancos: Banco Itaú S.A.</strong>
                    <span style="font-size:0.75rem; color:var(--text-dim); font-family:'JetBrains Mono',monospace;"><i class="fa-solid fa-spinner fa-spin text-cyan"></i> ${step.statusText}</span>
                    <div class="bank-tag-bar">
                        <span class="bank-pill active"><i class="fa-solid fa-building-columns"></i> Itaú</span>
                        <span class="bank-pill">Bradesco</span>
                        <span class="bank-pill">Banco do Brasil</span>
                        <span class="bank-pill">Inter</span>
                        <span class="bank-pill">Nubank</span>
                    </div>
                </div>
            `;
        } else if (step.phase === 'cleaning_history') {
            contentHtml = `
                <div class="anim-extrato-card">
                    <div class="laser-scanner"></div>
                    <div class="aec-header">
                        <div><i class="fa-solid fa-wand-magic-sparkles text-cyan"></i> <b>Limpeza e Higienização de Históricos Bancários</b></div>
                        <span class="badge-tag-sim">Gemini + Regras</span>
                    </div>
                    <div class="aec-list">
                        ${step.transformations.map(t => `
                            <div class="aec-item">
                                <div class="aec-raw"><i class="fa-solid fa-arrow-right-from-bracket text-danger"></i> <span class="raw-text">${t.raw}</span></div>
                                <div class="aec-arrow"><i class="fa-solid fa-arrow-down text-cyan"></i></div>
                                <div class="aec-clean"><i class="fa-solid fa-check text-success"></i> <b>${t.clean}</b> <span class="aec-val-badge">${t.val}</span></div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        } else if (step.phase === 'weight_matching') {
            contentHtml = `
                <div class="anim-extrato-card">
                    <div class="laser-scanner"></div>
                    <div class="aec-header bg-primary-subtle">
                        <div><i class="fa-solid fa-code-compare text-cyan"></i> <b>Cruzamento Extrato vs Sistema (Algoritmo por Pesos)</b></div>
                        <span class="badge-peso3">⭐ Tolerância Peso 3</span>
                    </div>
                    <div class="match-list">
                        ${step.matches.map(m => `
                            <div class="match-item">
                                <div class="mi-left">
                                    <strong>${m.doc}</strong>
                                    <span>Extrato: ${m.extrato}</span>
                                </div>
                                <div class="mi-right">
                                    <span class="badge-peso3">${m.matchType}</span>
                                    <span class="badge-conciliado">100% Pareado</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="adc-status-bar"><i class="fa-solid fa-bolt text-cyan"></i> ${step.statusText}</div>
                </div>
            `;
        } else if (step.phase === 'batch_clear') {
            contentHtml = `
                <div class="anim-summary-box">
                    <div class="asb-icon"><i class="fa-solid fa-circle-check text-success"></i></div>
                    <strong style="font-size:1.1rem; color:#fff;">Conciliação Concluída com Sucesso!</strong>
                    <p style="font-size:0.8rem; color:#25d366; font-weight:600;">${step.result}</p>
                    
                    <div class="conciliado-strip">
                        <span><i class="fa-solid fa-star text-warning"></i> 31 Lançamentos Baixados em Lote</span>
                        <span style="font-family:'JetBrains Mono',monospace; color:var(--neon-cyan);">Status: ✅ Conciliado</span>
                    </div>
                </div>
            `;
        }

        mockupBody.innerHTML = contentHtml;
    }

    // ─── CENÁRIO 3: FILA FISCAL & AUTO-APRENDIZADO ───
    function renderFilaStep(step, stepIdx) {
        let contentHtml = '';

        if (step.phase === 'fila_pending') {
            contentHtml = `
                <div class="anim-fila-card">
                    <div class="afc-header bg-warning-subtle">
                        <div style="color:#ffbd2e; font-weight:700;"><i class="fa-solid fa-inbox"></i> Fila de Classificação Fiscal (Destinação de Mercadoria)</div>
                        <span class="amm-badge">3 Pendentes</span>
                    </div>
                    <div class="afc-list">
                        ${step.queue.map(q => `
                            <div class="afc-item">
                                <div>
                                    <strong style="color:#fff;">${q.vendor}</strong>
                                    <div style="font-size:0.7rem; color:var(--text-dim);">${q.nfe} • CFOP ${q.cfop} • <b style="color:#fff;">${q.val}</b></div>
                                </div>
                                <div>
                                    <span class="badge-tag-green">${q.suggest}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        } else if (step.phase === 'click_classify') {
            contentHtml = `
                <div class="anim-fila-card">
                    <div class="afc-header bg-success-subtle">
                        <div style="color:#25d366; font-weight:700;"><i class="fa-solid fa-hand-pointer"></i> 1 Clique: Destinação "Revenda" Aplicada</div>
                        <span class="badge-conciliado">FiscalEngine.gs</span>
                    </div>
                    <div class="afc-body-detail">
                        <p style="color:#cbd5e1; font-size:0.8rem; line-height:1.5;">${step.action}</p>
                        <div class="tax-credits-grid">
                            <div class="tc-item"><span>PIS (1,65%):</span> <strong>+ R$ 245,02</strong></div>
                            <div class="tc-item"><span>COFINS (7,60%):</span> <strong>+ R$ 1.128,60</strong></div>
                            <div class="tc-item"><span>ICMS (18%):</span> <strong>+ R$ 2.673,00</strong></div>
                        </div>
                    </div>
                </div>
            `;
        } else if (step.phase === 'save_rule') {
            contentHtml = `
                <div class="anim-summary-box">
                    <div class="asb-icon"><i class="fa-solid fa-brain text-cyan"></i></div>
                    <strong style="font-size:1.1rem; color:#fff;">Central de Inteligência: Regra Aprendida!</strong>
                    <p style="font-size:0.8rem; color:#a78bfa; line-height:1.5;">${step.rule}</p>
                    <div class="rule-saved-badge"><i class="fa-solid fa-lock text-warning"></i> Memória Fixada • Zero Retrabalho Futuro</div>
                </div>
            `;
        }

        mockupBody.innerHTML = contentHtml;
    }

    // ─── CENÁRIO 4: COCKPIT & EXPORTAÇÃO ALTERDATA ───
    function renderAlterdataStep(step, stepIdx) {
        let contentHtml = '';

        if (step.phase === 'check_balance') {
            contentHtml = `
                <div class="anim-alterdata-card">
                    <div class="aac-header">
                        <div><i class="fa-solid fa-scale-balanced text-cyan"></i> <b>Auditoria Contábil: Partidas Dobradas</b></div>
                        <span class="badge-conciliado">Equilíbrio Exato</span>
                    </div>
                    <div class="balance-cards-grid">
                        <div class="bc-card"><span>Total de Débitos</span><strong style="color:#00f2ff;">${step.balance.debits}</strong></div>
                        <div class="bc-card"><span>Total de Créditos</span><strong style="color:#00f2ff;">${step.balance.credits}</strong></div>
                        <div class="bc-card"><span>Diferença Contábil</span><strong style="color:#25d366;">${step.balance.diff}</strong></div>
                    </div>
                    <div class="adc-status-bar"><i class="fa-solid fa-lock text-warning"></i> Trava de Cadeado Ativa: Nenhum lançamento sem contrapartida.</div>
                </div>
            `;
        } else if (step.phase === 'generate_txt') {
            contentHtml = `
                <div class="anim-alterdata-card">
                    <div class="aac-header">
                        <div><i class="fa-solid fa-file-lines text-purple"></i> <b>Layout Posicional Oficial Alterdata Pack</b></div>
                        <span class="badge-tag-sim">Formato .TXT</span>
                    </div>
                    <div class="txt-preview-code">
                        <code>${step.previewTxt.join('\n')}</code>
                    </div>
                    <div class="adc-status-bar"><i class="fa-solid fa-check-double text-success"></i> ${step.statusText}</div>
                </div>
            `;
        } else if (step.phase === 'ready_download') {
            contentHtml = `
                <div class="anim-summary-box">
                    <div class="asb-icon"><i class="fa-solid fa-circle-arrow-down text-cyan"></i></div>
                    <strong style="font-size:1.1rem; color:#fff;">Lote Pronto para Importação no ERP</strong>
                    <p style="font-size:0.8rem; color:var(--text-dim);">${step.action}</p>
                    
                    <button class="btn-download-alterdata" style="margin-top:10px;">
                        <i class="fa-solid fa-download"></i> BAIXAR LOTE_CONTABIL_ALTERDATA.TXT
                    </button>
                </div>
            `;
        }

        mockupBody.innerHTML = contentHtml;
    }

    // Auto Init
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSimulator);
    } else {
        initSimulator();
    }
})();
