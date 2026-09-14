// ✏️ EDITA la fecha del encuentro. Formato: new Date(año, mes-1, día, hora, min)
// Ejemplo: 20 de septiembre de 2026, 6:00 p.m. -> new Date(2026, 8, 20, 18, 0)
// Déjalo en null si no quieres mostrar la cuenta regresiva.
const FECHA_EVENTO = null;

const acepto = document.getElementById('acepto');
const respuesta = document.getElementById('respuesta');
const cuenta = document.getElementById('cuenta');
const chispas = document.getElementById('chispas');

const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- Botón "Sí, acepto" ---
acepto.addEventListener('click', () => {
  respuesta.hidden = false;
  acepto.style.display = 'none';
  destello(28);
  respuesta.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// --- Chispas / destello ---
function crearChispa(rafaga) {
  const c = document.createElement('span');
  c.className = 'chispa';
  const tam = 4 + Math.random() * 6;
  c.style.width = tam + 'px';
  c.style.height = tam + 'px';
  c.style.left = Math.random() * 100 + 'vw';
  c.style.animationDuration = (rafaga ? 2.2 + Math.random() * 2 : 6 + Math.random() * 5) + 's';
  chispas.appendChild(c);
  setTimeout(() => c.remove(), 12000);
}

function destello(cantidad) {
  if (sinMovimiento) return;
  for (let i = 0; i < cantidad; i++) crearChispa(true);
}

// Chispas ambientales suaves
if (!sinMovimiento) {
  for (let i = 0; i < 6; i++) setTimeout(() => crearChispa(false), i * 400);
  setInterval(() => crearChispa(false), 1300);
}

// --- Cuenta regresiva (opcional) ---
if (FECHA_EVENTO instanceof Date && !isNaN(FECHA_EVENTO)) {
  cuenta.hidden = false;
  actualizarCuenta();
  setInterval(actualizarCuenta, 1000);
}

function actualizarCuenta() {
  const diff = FECHA_EVENTO - new Date();
  if (diff <= 0) {
    cuenta.textContent = '¡Es hoy! 🌅';
    return;
  }
  const dias = Math.floor(diff / 86400000);
  const horas = Math.floor((diff % 86400000) / 3600000);
  const min = Math.floor((diff % 3600000) / 60000);
  cuenta.textContent = `Faltan ${dias} días, ${horas} h y ${min} min`;
}
