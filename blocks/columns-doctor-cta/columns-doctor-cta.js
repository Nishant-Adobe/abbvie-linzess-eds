export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-doctor-cta-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        col.classList.add('columns-doctor-cta-img-col');
      }
    });
  });
}
