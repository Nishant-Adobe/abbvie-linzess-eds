export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;

  const pictureRow = rows[0];
  const contentRow = rows[1];

  const picture = pictureRow.querySelector('picture');
  if (picture) {
    picture.classList.add('hero-home-bg');
    block.prepend(picture);
    pictureRow.remove();
  }

  contentRow.classList.add('hero-home-content');
}
