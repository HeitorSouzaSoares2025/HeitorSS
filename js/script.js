// Executa o código somente depois que o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {

    // --- Menu Hamburguer ---
    const hamburguer = document.querySelector(".hamburguer"); // botão menu mobile
    const nav = document.querySelector(".nav"); // navbar principal

    // Abre/fecha menu mobile ao clicar
    hamburguer.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    // --- Dropdowns ---
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector("a"); // pega o <a> dentro do dropdown

        link.addEventListener("click", e => {
            // Só funciona em telas até 768px (mobile)
            if (window.innerWidth <= 768) {
                e.preventDefault(); // evita que o <a> pule de página
                dropdown.classList.toggle("active"); // abre/fecha o submenu
            }
        });
    });

    // --- Partículas no Canvas ---
    const canvas = document.getElementById('particles');
    if (!canvas) return; // se não existir <canvas>, encerra
    const ctx = canvas.getContext('2d');

    // Dimensões do canvas = tamanho da tela
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Ajusta tamanho do canvas quando a janela for redimensionada
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Objeto que guarda posição do mouse
    let mouse = { x: null, y: null };
    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    // Classe de cada partícula
    class Particle {
        constructor() {
            this.x = Math.random() * width;  // posição inicial X aleatória
            this.y = Math.random() * height; // posição inicial Y aleatória
            this.size = Math.random() * 3 + 1; // tamanho 1–4px
            this.speedX = Math.random() * 1 - 0.5; // movimento horizontal
            this.speedY = Math.random() * 1 - 0.5; // movimento vertical
            this.color = '#00ffc8'; // cor padrão
        }

        // Atualiza posição e interação com mouse
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Faz partículas "baterem" nas bordas
            if (this.x < 0 || this.x > width) this.speedX *= -1;
            if (this.y < 0 || this.y > height) this.speedY *= -1;

            // Repulsão do mouse
            if (mouse.x && mouse.y) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) { // até 100px do mouse
                    this.x -= dx * 0.02;
                    this.y -= dy * 0.02;
                }
            }
        }

        // Desenha a partícula
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Cria várias partículas (menos em telas pequenas)
    const particlesArray = [];
    const numParticles = window.innerWidth < 600 ? 80 : 150;
    for (let i = 0; i < numParticles; i++) {
        particlesArray.push(new Particle());
    }

    // Liga partículas próximas com linhas
    function connect(p) {
        for (let a = 0; a < particlesArray.length; a++) {
            const dx = particlesArray[a].x - p.x;
            const dy = particlesArray[a].y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) { // conecta até 120px de distância
                ctx.strokeStyle = 'rgba(0,255,200,' + (1 - dist / 120) + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();
            }
        }
    }

    // Loop de animação
    function animate() {
        ctx.clearRect(0, 0, width, height); // limpa a tela
        particlesArray.forEach(p => {
            p.update();
            p.draw();
            if (mouse.x !== null && mouse.y !== null) connect(p);
        });
        requestAnimationFrame(animate); // repete infinitamente
    }

    animate(); // inicia a animação
});


// --- Efeito máquina de escrever na logo ---
const logo = document.querySelector('.logo');
const text = logo.textContent; // texto original da logo
logo.textContent = ''; // limpa para iniciar o efeito

let i = 0;
let forward = true; // indica se está digitando (true) ou apagando (false)

function typeWriterLoop() {
    if (forward) {
        // Digitando
        logo.textContent = text.substring(0, i + 1);
        i++;
        if (i === text.length) {
            forward = false; // troca para apagar
            setTimeout(typeWriterLoop, 1000); // pausa 1s antes de apagar
            return;
        }
    } else {
        // Apagando
        logo.textContent = text.substring(0, i - 1);
        i--;
        if (i === 0) {
            forward = true; // volta a digitar
            setTimeout(typeWriterLoop, 500); // pausa 0.5s antes de digitar
            return;
        }
    }
    setTimeout(typeWriterLoop, 150); // velocidade da digitação/apagamento
}

// Inicia o efeito depois que a página carregar
window.addEventListener('DOMContentLoaded', typeWriterLoop);
