import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];
  const groups = {};

  rows.forEach((row) => {
    const cols = [...row.children];
    const groupValue = cols[0]?.textContent.trim().toLowerCase() || 'adults';
    if (!groups[groupValue]) groups[groupValue] = [];

    const card = document.createElement('div');
    card.className = 'dosing-card';
    moveInstrumentation(row, card);

    const icon = cols[1]?.querySelector('picture');
    if (icon) {
      const iconWrap = document.createElement('div');
      iconWrap.className = 'dosing-card-icon';
      iconWrap.append(icon);
      card.append(iconWrap);
    }

    const title = cols[2]?.textContent.trim();
    if (title) {
      const h3 = document.createElement('h3');
      h3.className = 'dosing-card-title';
      h3.textContent = title;
      card.append(h3);
    }

    const desc = cols[3];
    if (desc) {
      const body = document.createElement('div');
      body.className = 'dosing-card-body';
      body.innerHTML = desc.innerHTML;
      card.append(body);
    }

    groups[groupValue].push(card);
  });

  block.innerHTML = '';

  const tabNav = document.createElement('div');
  tabNav.className = 'dosing-tabs';

  const tabContent = document.createElement('div');
  tabContent.className = 'dosing-panels';

  const groupKeys = Object.keys(groups);
  const labels = {
    adults: 'Adults with IBS-C or CIC',
    pediatric: 'Pediatric Functional Constipation (6–17 years of age)',
  };

  groupKeys.forEach((key, i) => {
    const btn = document.createElement('button');
    btn.className = `dosing-tab${i === 0 ? ' active' : ''}`;
    btn.textContent = labels[key] || key;
    btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    btn.setAttribute('role', 'tab');
    btn.addEventListener('click', () => {
      tabNav.querySelectorAll('.dosing-tab').forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      tabContent.querySelectorAll('.dosing-panel').forEach((p) => p.classList.remove('active'));
      tabContent.querySelector(`[data-group="${key}"]`).classList.add('active');
    });
    tabNav.append(btn);

    const panel = document.createElement('div');
    panel.className = `dosing-panel${i === 0 ? ' active' : ''}`;
    panel.setAttribute('data-group', key);
    panel.setAttribute('role', 'tabpanel');
    groups[key].forEach((card) => panel.append(card));
    tabContent.append(panel);
  });

  block.append(tabNav);
  block.append(tabContent);
}
