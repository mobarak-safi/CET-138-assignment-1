// Initialise syntax highlighting once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  updateCounter();
});

// ── Counter demo ─────────────────────────────────────────────
let count = 0;

function updateCounter() {
  document.getElementById('counter-display').textContent = count;
  document.getElementById('counter-log').textContent =
    `// counter = ${count}\n// typeof count → "${typeof count}"\n// Math.abs(counter) → ${Math.abs(count)}`;
}

function adjustCounter(delta) {
  count += delta;
  updateCounter();
}

function resetCounter() {
  count = 0;
  updateCounter();
}

// ── Colour changer demo ───────────────────────────────────────
function changeColor(hex, name) {
  const box = document.getElementById('color-box');
  box.style.background = hex;
  box.textContent = `document.getElementById('color-box').style.background = '${hex}' // ${name}`;
}

// ── Fetch demo (real public API) ──────────────────────────────
async function fetchJoke() {
  const btn = document.getElementById('fetch-btn');
  const out  = document.getElementById('fetch-result');

  btn.disabled = true;
  btn.innerHTML = '<i class="bi bi-arrow-repeat me-1"></i> Fetching...';
  out.style.display = 'block';
  out.textContent = '// sending GET request...';

  try {
    const res  = await fetch('https://v2.jokeapi.dev/joke/Programming?type=single');
    const data = await res.json();
    out.textContent =
      `// GET https://v2.jokeapi.dev/joke/Programming\n// Status: ${res.status} ${res.statusText}\n\n"${data.joke}"`;
  } catch (e) {
    out.textContent = `// fetch() error: ${e.message}`;
  }

  btn.disabled = false;
  btn.innerHTML = '<i class="bi bi-cloud-arrow-down me-1"></i> Fetch Again';
}

// ── Form validation demo ──────────────────────────────────────
function validateDemoForm(e) {
  e.preventDefault();

  const email  = document.getElementById('v-email').value.trim();
  const pass   = document.getElementById('v-pass').value;
  const result = document.getElementById('val-result');
  const errors = [];

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.push('Invalid email address format.');

  if (pass.length < 8)
    errors.push('Password must be at least 8 characters.');

  if (!/[A-Z]/.test(pass))
    errors.push('Password needs at least one uppercase letter.');

  if (errors.length) {
    result.innerHTML = errors
      .map(err => `<div class="alert alert-danger py-1 px-2 mb-1" style="font-size:.8rem;">
                     <i class="bi bi-x-circle me-1"></i>${err}
                   </div>`)
      .join('');
  } else {
    result.innerHTML =
      `<div class="alert alert-success py-1 px-2 mb-0" style="font-size:.8rem;">
         <i class="bi bi-check-circle me-1"></i> All fields valid!
       </div>`;
  }
}
