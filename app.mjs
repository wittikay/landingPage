import { getAudience, getProjects, projects } from './portfolio.mjs';
import { focusAfterStoryClose } from './navigation.mjs';
import { initSaturnMotion } from './motion.mjs';
import { mountSaturn } from './saturn.mjs';

const $ = selector => document.querySelector(selector);
const filterButtons = [...document.querySelectorAll('[data-audience]')];
const cards = [...document.querySelectorAll('[data-project]')];

initSaturnMotion($('#saturn-art'), $('#saturn-motion'), matchMedia('(prefers-reduced-motion: reduce)'), mountSaturn($('#saturn-illustration')));

function selectAudience(key) {
  const audience = getAudience(key);
  const visible = getProjects(key);
  filterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.audience === key)));
  cards.forEach(card => { card.hidden = !visible.some(project => project.id === card.dataset.project); });
  $('#audience-heading').textContent = audience.heading;
  $('#audience-description').textContent = audience.description;
  $('#audience-cta').textContent = `${audience.cta} ↗`;
  $('#audience-cta').href = audience.href;
  $('#filter-status').textContent = `${visible.length} ${visible.length === 1 ? 'story' : 'stories'} for ${audience.label.toLowerCase()}`;
}
filterButtons.forEach(button => button.addEventListener('click', () => selectAudience(button.dataset.audience)));

const dialog = $('#project-dialog');
let dialogTrigger;
let dialogDestination = null;
document.querySelectorAll('[data-open-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects.find(item => item.id === button.dataset.openProject);
  if (!project) return;
  dialogTrigger = button;
  dialogDestination = null;
  $('#dialog-type').textContent = `${project.type} / ${project.status}`;
  $('#dialog-title').textContent = project.title;
  $('#dialog-description').textContent = project.description;
  $('#dialog-content').replaceChildren(...project.sections.map(section => {
    const wrapper = document.createElement('section');
    const heading = document.createElement('h3');
    const paragraph = document.createElement('p');
    heading.textContent = section.title;
    paragraph.textContent = section.text;
    wrapper.append(heading, paragraph);
    return wrapper;
  }));
  const link = $('#dialog-link');
  link.href = project.external?.href || '#contact';
  link.textContent = `${project.external?.label || 'Ask me about it'} ↗`;
  if (project.external) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
  else { link.removeAttribute('target'); link.removeAttribute('rel'); }
  dialog.showModal();
  document.body.classList.add('dialog-open');
}));
$('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if(event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  }
});
$('#dialog-link').addEventListener('click', event => {
  const href = event.currentTarget.getAttribute('href');
  if (href.startsWith('#')) {
    event.preventDefault();
    dialogDestination = $(href);
    history.pushState(null, '', href);
  }
  dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  const destination = dialogDestination;
  dialogDestination = null;
  focusAfterStoryClose(dialogTrigger, destination);
});

const menu = $('#menu-toggle');
const nav = $('#main-nav');
function closeMenu() { menu.setAttribute('aria-expanded','false'); nav.classList.remove('is-open'); }
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded',String(!open));
  nav.classList.toggle('is-open',!open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if(event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
document.addEventListener('click', event => { if(!nav.contains(event.target) && !menu.contains(event.target)) closeMenu(); });
matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

$('#copy-email').addEventListener('click', async () => {
  const status = $('#copy-status');
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText('karl122701@gmail.com');
    status.textContent = 'Copied! I’d be glad to hear from you.';
  } catch {
    status.textContent = 'Couldn’t copy it automatically. Tap the email link or copy karl122701@gmail.com.';
  }
});

document.documentElement.classList.add('js-ready');
