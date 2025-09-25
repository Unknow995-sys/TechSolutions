// ANIMACIONES DE BIENVENIDA
const particleCanvas = document.getElementById('particle-canvas');
const starfieldCanvas = document.getElementById('starfield-canvas');
const p_ctx = particleCanvas.getContext('2d');
const s_ctx = starfieldCanvas.getContext('2d');
let particlesArray, particleAnimationId, cursorAnimationId, starfieldAnimationId;

// PARTÍCULAS
class Particle {
    constructor(x, y, directionX, directionY, size) { this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size; }
    draw() { p_ctx.beginPath(); p_ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); p_ctx.fillStyle = 'rgba(173, 216, 230, 0.5)'; p_ctx.fill(); }
    update() { if (this.x > particleCanvas.width || this.x < 0) { this.directionX = -this.directionX; } if (this.y > particleCanvas.height || this.y < 0) { this.directionY = -this.directionY; } this.x += this.directionX; this.y += this.directionY; this.draw(); }
}
function initParticles() {
    particleCanvas.width = window.innerWidth; particleCanvas.height = window.innerHeight;
    particlesArray = [];
    let numberOfParticles = (particleCanvas.height * particleCanvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * .4) - .2;
        let directionY = (Math.random() * .4) - .2;
        particlesArray.push(new Particle(x, y, directionX, directionY, size));
    }
}
function connectParticles() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (particleCanvas.width/7) * (particleCanvas.height/7)) {
                opacityValue = 1 - (distance/20000);
                p_ctx.strokeStyle = 'rgba(173, 216, 230,' + opacityValue + ')';
                p_ctx.lineWidth = 1;
                p_ctx.beginPath(); p_ctx.moveTo(particlesArray[a].x, particlesArray[a].y); p_ctx.lineTo(particlesArray[b].x, particlesArray[b].y); p_ctx.stroke();
            }
        }
    }
}
function animateParticles() { p_ctx.clearRect(0,0,innerWidth,innerHeight); particlesArray.forEach(p=>p.update()); connectParticles(); particleAnimationId = requestAnimationFrame(animateParticles); }
function startParticleAnimation() { initParticles(); animateParticles(); }
function stopParticleAnimation() { cancelAnimationFrame(particleAnimationId); }
window.addEventListener('resize', () => { if (particleAnimationId) initParticles(); });

// CURSOR PERSONALIZADO
const cursorFxContainer = document.getElementById('cursor-fx-container');
const dots = []; const mousePos = { x: 0, y: 0 }; const numDots = 15;
function initCursor() { for (let i = 0; i < numDots; i++) { const dot = document.createElement('div'); dot.className = 'cursor-dot'; cursorFxContainer.appendChild(dot); dots.push({ el: dot, x: 0, y: 0, size: 1 - i * 0.05 }); } }
function updateCursorPositions() { let p = dots[0]; p.x += (mousePos.x - p.x) * 0.25; p.y += (mousePos.y - p.y) * 0.25; for (let i = 1; i < numDots; i++) { const c = dots[i]; c.x += (p.x - c.x) * 0.25; c.y += (p.y - c.y) * 0.25; p = c; } }
function drawCursor() { dots.forEach(d => { const s = 20 * d.size; d.el.style.width = `${s}px`; d.el.style.height = `${s}px`; d.el.style.transform = `translate(${d.x - s/2}px, ${d.y - s/2}px)`; }); }
function animateCursor() { updateCursorPositions(); drawCursor(); cursorAnimationId = requestAnimationFrame(animateCursor); }
function startCursorAnimation() { cursorFxContainer.classList.remove('hidden'); animateCursor(); }
function stopCursorAnimation() { cursorFxContainer.classList.add('hidden'); cancelAnimationFrame(cursorAnimationId); }
window.addEventListener('mousemove', e => { mousePos.x = e.clientX; mousePos.y = e.clientY; });

// VIAJE DE ESTRELLAS
let stars = []; let speed = 10;
function initStarfield() { starfieldCanvas.width = window.innerWidth; starfieldCanvas.height = window.innerHeight; stars = []; for (let i = 0; i < 800; i++) { stars.push({ x: (Math.random() - 0.5) * starfieldCanvas.width, y: (Math.random() - 0.5) * starfieldCanvas.height, z: Math.random() * starfieldCanvas.width }); } }
function animateStarfield() { s_ctx.fillStyle = 'black'; s_ctx.fillRect(0, 0, starfieldCanvas.width, starfieldCanvas.height); s_ctx.fillStyle = 'white'; let cx = starfieldCanvas.width / 2; let cy = starfieldCanvas.height / 2; stars.forEach(s => { s.z -= speed; if (s.z <= 0) s.z = starfieldCanvas.width; let k = 128.0 / s.z; let px = s.x * k + cx; let py = s.y * k + cy; if (px >= 0 && px <= starfieldCanvas.width && py >= 0 && py <= starfieldCanvas.height) { let size = (1 - s.z / starfieldCanvas.width) * 5; s_ctx.beginPath(); s_ctx.arc(px, py, size, 0, Math.PI * 2); s_ctx.fill(); } }); starfieldAnimationId = requestAnimationFrame(animateStarfield); }
function startStarfield() { starfieldCanvas.style.display = 'block'; initStarfield(); animateStarfield(); }
function stopStarfield() { cancelAnimationFrame(starfieldAnimationId); starfieldCanvas.style.opacity = '0'; setTimeout(() => { starfieldCanvas.style.display = 'none'; starfieldCanvas.style.opacity = '1'; }, 1000); }

// APLICACIÓN
document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const splashTitle = document.getElementById('splash-title');
    const navbar = document.querySelector('#page-home .navbar');
    const homeContent = document.getElementById('home-content-wrapper');
    const resetBtn = document.getElementById('reset-animation-btn');
    const body = document.body;
    let isIntroClicked = false;

    startParticleAnimation(); initCursor(); startCursorAnimation();

    const titleText = splashTitle.textContent; splashTitle.textContent = '';
    titleText.split('').forEach(char => { const span = document.createElement('span'); span.textContent = char; splashTitle.appendChild(span); });
    const letterSpans = splashTitle.querySelectorAll('span');

    splashScreen.addEventListener('mouseover', () => { if (!isIntroClicked) { letterSpans.forEach((span, index) => { span.style.animationDelay = `${index * 0.1}s`; span.classList.add('rgb-animate'); }); } });
    splashScreen.addEventListener('mouseout', () => { if (!isIntroClicked) { letterSpans.forEach(span => { span.classList.remove('rgb-animate'); span.style.animationDelay = ''; }); } });

    splashScreen.addEventListener('click', () => {
        if (isIntroClicked) return;
        isIntroClicked = true;
        splashTitle.classList.add('hidden');
        stopCursorAnimation();
        setTimeout(() => { splashScreen.classList.add('hidden'); stopParticleAnimation(); startStarfield(); }, 500);
        setTimeout(() => {
            stopStarfield(); body.classList.add('cursor-visible');
            navbar.classList.remove('navbar-hidden'); navbar.classList.add('navbar-visible');
            homeContent.classList.remove('hidden'); homeContent.classList.add('visible');
            resetBtn.classList.add('visible');
        }, 2500);
    });

    resetBtn.addEventListener('click', () => {
        isIntroClicked = false; body.classList.remove('cursor-visible');
        resetBtn.classList.remove('visible');
        homeContent.classList.remove('visible'); homeContent.classList.add('hidden');
        navbar.classList.remove('navbar-visible'); navbar.classList.add('navbar-hidden');
        splashTitle.classList.remove('hidden');
        splashScreen.classList.remove('hidden');
        startParticleAnimation(); startCursorAnimation();
    });
    
    showPage('page-home');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll, .service-card').forEach(el => observer.observe(el));
});

// NAVEGACIÓN Y CRUD 
let editRowElement = null;
const pageTransitionOverlay = document.getElementById('page-transition-overlay');
let currentPage = null;

function showPage(pageId) {
    if (currentPage === pageId) return;

    const targetPage = document.getElementById(pageId);
    if (!targetPage) return;

    pageTransitionOverlay.classList.add('active');

    setTimeout(() => {
        if (currentPage) {
            document.getElementById(currentPage).style.display = 'none';
        }
        
        const displayStyle = ['page-login', 'page-dashboard'].includes(pageId) ? 'flex' : 'block';
        targetPage.style.display = displayStyle;
        currentPage = pageId;
        window.scrollTo(0, 0);

        if (pageId !== 'page-home') { document.body.classList.add('cursor-visible'); } 
        else if (!document.getElementById('splash-screen').classList.contains('hidden')) { document.body.classList.remove('cursor-visible'); }
        
        document.querySelectorAll('.animate-on-scroll, .service-card').forEach(el => el.classList.remove('is-visible'));
        
        if (pageId === 'page-servicios') {
            const cards = document.querySelectorAll('#page-servicios .service-card');
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 150}ms`;
            });
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.animate-on-scroll, .service-card').forEach(el => observer.observe(el));

        pageTransitionOverlay.classList.remove('active');
    }, 400);
}

document.getElementById('login-form-element').addEventListener('submit', function(e) { e.preventDefault(); if (document.getElementById('username').value === 'admin' && document.getElementById('password').value === 'admin') { showPage('page-dashboard'); document.getElementById('login-error').style.display = 'none'; } else { document.getElementById('login-error').style.display = 'block'; } });
document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => { link.addEventListener('click', function(e) { e.preventDefault(); document.querySelectorAll('.sidebar-nav .nav-link, .dashboard-section').forEach(el => el.classList.remove('active')); this.classList.add('active'); document.getElementById(this.getAttribute('data-target')).classList.add('active'); }); });
document.getElementById('logout-button').addEventListener('click', () => { document.getElementById('login-form-element').reset(); showPage('page-login'); });

// MODALES (CRUD Y CONTACTO)
const crudModal = document.getElementById('crud-modal');
const contactModal = document.getElementById('contact-modal');

function openModal(mode, type, element = null) {
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const saveBtn = document.getElementById('modal-save-btn');
    editRowElement = null;

    let formHtml = '';
    if (type === 'service') {
        modalTitle.textContent = mode === 'add' ? 'Agregar Servicio' : 'Editar Servicio';
        formHtml = `
            <div class="form-group"><label>Nombre del Servicio:</label><input type="text" id="service-name" required></div>
            <div class="form-group"><label>Precio:</label><input type="text" id="service-price" required></div>
        `;
        modalBody.innerHTML = formHtml;
        saveBtn.onclick = saveService;

        if (mode === 'edit' && element) {
            editRowElement = element.closest('tr');
            document.getElementById('service-name').value = editRowElement.cells[1].textContent;
            document.getElementById('service-price').value = editRowElement.cells[2].textContent;
        }
    }
    // para el user

    crudModal.style.display = 'flex';
    setTimeout(() => { crudModal.style.opacity = 1; crudModal.querySelector('.modal-content').style.transform = 'scale(1)'; }, 10);
}

function closeModal() {
    crudModal.style.opacity = 0;
    crudModal.querySelector('.modal-content').style.transform = 'scale(0.9)';
    setTimeout(() => { crudModal.style.display = 'none'; }, 300);
}

function saveService() {
    const name = document.getElementById('service-name').value;
    const price = document.getElementById('service-price').value;
    if (!name || !price) { alert('Por favor, completa todos los campos.'); return; }

    if (editRowElement) { // Modo Editar
        editRowElement.cells[1].textContent = name;
        editRowElement.cells[2].textContent = price;
    } else { // Modo Agregar
        const tableBody = document.getElementById('services-table-body');
        const newId = parseInt(tableBody.dataset.nextId, 10);
        const newRow = tableBody.insertRow();
        newRow.innerHTML = `
            <td>${newId}</td>
            <td>${name}</td>
            <td>${price}</td>
            <td class="actions-cell">
                <button class="button button-secondary button-sm" onclick="openModal('edit', 'service', this)">Editar</button>
                <button class="button button-danger button-sm" onclick="deleteRow(this)">Eliminar</button>
            </td>
        `;
        tableBody.dataset.nextId = newId + 1;
    }
    closeModal();
}

function saveUser() { 
    // saveService para usuarios
    console.log('Guardando usuario...');
    closeModal();
}

function deleteRow(element) {
    if (confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
        const row = element.closest('tr');
        row.parentNode.removeChild(row);
    }
}

// modal de contacto
function openContactModal(serviceName, servicePrice) {
    document.getElementById('contact-modal-title').textContent = serviceName;
    document.getElementById('contact-service-price').textContent = `Precio: ${servicePrice}`;
    document.getElementById('contact-form-view').style.display = 'block';
    document.getElementById('contact-success-view').style.display = 'none';
    document.getElementById('contact-modal-footer').style.display = 'flex';
    document.getElementById('contact-name').value = '';
    document.getElementById('contact-email').value = '';

    contactModal.style.display = 'flex';
    setTimeout(() => { contactModal.style.opacity = 1; contactModal.querySelector('.modal-content').style.transform = 'scale(1)'; }, 10);
}

function closeContactModal() {
    contactModal.style.opacity = 0;
    contactModal.querySelector('.modal-content').style.transform = 'scale(0.9)';
    setTimeout(() => { contactModal.style.display = 'none'; }, 300);
}

function submitContactForm() {
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    if (!name || !email) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    
    document.getElementById('contact-form-view').style.display = 'none';
    document.getElementById('contact-success-view').style.display = 'block';
    document.getElementById('contact-modal-footer').style.display = 'none';

    setTimeout(closeContactModal, 2500);
}