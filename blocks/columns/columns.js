export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });

  // Detect savings card variant and apply variant class + CSS
  const img = block.querySelector('img');
  const hasSavingsContent = img && img.alt && img.alt.toLowerCase().includes('eligible');
  if (hasSavingsContent) {
    block.classList.add('columns-savings');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${window.hlx.codeBasePath}/blocks/columns-savings/columns-savings.css`;
    document.head.appendChild(link);
  }

  // Detect doctor-cta variant (image + "Ready to Talk" heading in purple arc section)
  const h2 = block.querySelector('h2');
  const hasDoctorCta = h2 && h2.textContent.includes('Ready to Talk');
  if (hasDoctorCta) {
    block.classList.add('columns-doctor-cta');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${window.hlx.codeBasePath}/blocks/columns-doctor-cta/columns-doctor-cta.css`;
    document.head.appendChild(link);
  }

  // Detect quiz variant (CTA cards: "Check My Symptoms" or "Savings & Support" in dark-purple-arc)
  const hasQuizCta = h2 && (h2.textContent.includes('Check My Symptoms') || h2.textContent.includes('Savings'));
  const noImage = !block.querySelector('picture');
  if (hasQuizCta && noImage && !hasDoctorCta && !hasSavingsContent) {
    block.classList.add('columns-quiz');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${window.hlx.codeBasePath}/blocks/columns-quiz/columns-quiz.css`;
    document.head.appendChild(link);
  }
}
