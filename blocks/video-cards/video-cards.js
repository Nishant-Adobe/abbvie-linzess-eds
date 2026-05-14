import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    const cols = [...row.children];
    if (cols[0]) cols[0].className = 'video-cards-poster';
    if (cols[1]) cols[1].className = 'video-cards-title';
    if (cols[2]) cols[2].className = 'video-cards-description';
    if (cols[3]) cols[3].className = 'video-cards-link';
    while (row.firstElementChild) li.append(row.firstElementChild);
    ul.append(li);
  });
  block.replaceChildren(ul);
}
