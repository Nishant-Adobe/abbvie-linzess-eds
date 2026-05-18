export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;

  const imageRow = rows[0];
  const contentRow = rows[1];

  const pic = imageRow.querySelector('picture');
  if (pic) {
    const bgDiv = document.createElement('div');
    bgDiv.classList.add('hero-home-bg');
    bgDiv.append(pic);
    block.prepend(bgDiv);
  }
  imageRow.remove();

  const content = contentRow.querySelector('div');
  if (content) {
    content.classList.add('hero-home-content');
  }
}
