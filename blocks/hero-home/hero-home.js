export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;

  const imageRow = rows[0];
  const contentRow = rows[1];

  const pic = imageRow.querySelector('picture');
  if (pic) {
    pic.classList.add('hero-home-bg');
    block.prepend(pic);
  }
  imageRow.remove();

  const content = contentRow.querySelector('div');
  if (content) {
    content.classList.add('hero-home-content');
  }
}
