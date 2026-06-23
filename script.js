/* ==========================================================================
   PROJETO AGROFUTURO - INTERATIVIDADE (JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initMenuMobile();
    initContadorAnimado();
    initFiltroCards();
});

/**
 * 1. MENU MOBILE (Para telas pequenas)
 * Cria um botão de menu hamburguer dinamicamente se ele não existir no HTML
 */
function initMenuMobile() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    if (!header || !nav) return;

    // Cria o botão do menu apenas se estiver em tela menor
    const menuBtn = document.createElement('button');
    menuBtn.innerHTML = '&#9776;'; // Ícone de três barras
    menuBtn.className = 'menu-toggle-btn';
    
    // Estilização rápida via JS para o botão
    Object.assign(menuBtn.style, {
        background: 'none',
        border: 'none',
        color: '#fff',
        fontSize: '1.8rem',
        cursor: 'pointer',
        display: 'none'
    });

    header.insertBefore(menuBtn, nav);

    // Monitora a largura da tela para exibir/esconder o botão
    const checarAcessibilidade = () => {
        if (window.innerWidth <= 768) {
            menuBtn.style.display = 'block';
            nav.style.display = 'none';
            nav.style.flexDirection = 'column';
            nav.style.width = '100%';
        } else {
            menuBtn.style.display = 'none';
            nav.style.display = 'flex';
            nav.style.flexDirection = 'row';
        }
    };

    window.addEventListener('resize', checarAcessibilidade);
    checarAcessibilidade(); // Executa ao carregar

    // Evento de clique para abrir/fechar o menu
    menuBtn.addEventListener('click', () => {
        if (nav.style.display === 'none' || nav.style.display === '') {
            nav.style.display = 'flex';
            nav.style.animation = 'fadeIn 0.3s ease-in-out';
        } else {
            nav.style.display = 'none';
        }
    });
}

/**
 * 2. CONTADOR ANIMADO (Estatísticas do Agronegócio)
 * Faz com que os números aumentem de 0 até o valor real quando o usuário chega na seção
 */
function initContadorAnimado() {
    // Primeiro, vamos criar a seção de dados dinamicamente antes do rodapé
    const container = document.querySelector('.container');
    if (!container) return;

    const statsSection = document.createElement('section');
    statsSection.id = 'estatisticas';
    statsSection.innerHTML = `
        <h2 class="section-title">O Agro em Números</h2>
        <div class="grid" style="text-align: center;">
            <div class="card" style="border-top-color: #b79455;">
                <h3 style="font-size: 2.5rem; color: #1b4332;" class="num" data-alvo="280">0</h3>
                <p>Milhões de Toneladas de Grãos</p>
            </div>
            <div class="card" style="border-top-color: #b79455;">
                <h3 style="font-size: 2.5rem; color: #1b4332;" class="num" data-alvo="45">0</h3>
                <p>% de aumento em Agtechs (Tecnologia)</p>
            </div>
            <div class="card" style="border-top-color: #b79455;">
                <h3 style="font-size: 2.5rem; color: #1b4332;" class="num" data-alvo="120">0</h3>
                <p>Países que consomem nossos produtos</p>
            </div>
        </div>
    `;
    
    // Insere a nova seção antes do final do container principal
    container.appendChild(statsSection);

    const contadores = document.querySelectorAll('.num');
    const velocidade = 80; // Quanto menor, mais rápido anima

    const animarContador = (contador) => {
        const atualizarTexto = () => {
            const alvo = +contador.getAttribute('data-alvo');
            const textoAtual = +contador.innerText;
            const incremento = alvo / velocidade;

            if (textoAtual < alvo) {
                contador.innerText = Math.ceil(textoAtual + incremento);
                setTimeout(atualizarTexto, 25);
            } else {
                contador.innerText = alvo + (contador.parentElement.innerText.includes('%') ? '%' : '');
            }
        };
        atualizarTexto();
    };

    // Ativa a animação apenas quando a seção estiver visível na tela (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarContador(entry.target);
                observer.unobserve(entry.target); // Roda a animação apenas uma vez
            }
        });
    }, { threshold: 0.5 });

    contadores.forEach(cont => observer.observe(cont));
}

/**
 * 3. EFEITO DE REALCE NOS CARDS
 * Adiciona um efeito interativo visual quando o usuário clica em um pilar
 */
function initFiltroCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            // Remove o destaque de todos
            cards.forEach(c => c.style.backgroundColor = '#ffffff');
            
            // Adiciona um tom verde suave de "selecionado" no card clicado
            card.style.backgroundColor = '#d8f3dc';
            
            // Feedback simples no console
            console.log(`Você explorou o pilar: ${card.querySelector('h3').innerText}`);
        });
    });
}
