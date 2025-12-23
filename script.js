// Theme toggle and year
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  const stored = localStorage.getItem('pref-theme');
  if (stored === 'light') document.documentElement.style.colorScheme = 'light';
  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.style.colorScheme === 'light';
    if (isLight) {
      document.documentElement.style.colorScheme = 'dark';
      localStorage.setItem('pref-theme', 'dark');
      themeToggle.setAttribute('aria-pressed', 'false');
    } else {
      document.documentElement.style.colorScheme = 'light';
      localStorage.setItem('pref-theme', 'light');
      themeToggle.setAttribute('aria-pressed', 'true');
    }
  });
}
document.getElementById('year').textContent = new Date().getFullYear();

// Accordion for mobile: one active panel only, no scrolling needed! (space saver)
function setActive(id){
  document.querySelectorAll('#app-panels .panel').forEach(p=>p.classList.remove('active'));
  let el = document.getElementById(id);
  if(el){ el.classList.add('active'); el.scrollIntoView({behavior:'instant',block:'start'});}
}
// Navigation to trigger accordion panels on mobile
document.querySelectorAll('[data-accordion]').forEach(link=>{
  link.addEventListener('click', e=>{
    if(window.innerWidth<700){
      let id = link.getAttribute('data-accordion');
      setActive(id);
      e.preventDefault();
    }
  });
});
