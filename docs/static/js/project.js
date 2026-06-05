function copyBibTeX() {
  const bibtexElement = document.getElementById('bibtex-code');
  const button = document.querySelector('.copy-bibtex-btn');
  if (!bibtexElement || !button) return;

  const showCopiedState = () => {
    button.classList.add('copied');
    button.querySelector('.copy-text').textContent = 'Copied!';
    window.setTimeout(() => {
      button.classList.remove('copied');
      button.querySelector('.copy-text').textContent = 'Copy';
    }, 2000);
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(bibtexElement.textContent).then(showCopiedState);
    return;
  }

  const textArea = document.createElement('textarea');
  textArea.value = bibtexElement.textContent;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'absolute';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
  showCopiedState();
}

function scrollToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}

window.addEventListener('scroll', function() {
  const scrollButton = document.querySelector('.scroll-to-top');
  if (!scrollButton) return;
  scrollButton.classList.toggle('visible', window.pageYOffset > 300);
});

document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  const items = Array.from(carousel.querySelectorAll('[data-carousel-item]'));
  const dots = Array.from(carousel.querySelectorAll('[data-carousel-dot]'));
  let activeIndex = 0;

  const showItem = (index) => {
    activeIndex = (index + items.length) % items.length;
    items.forEach((item, itemIndex) => {
      const isActive = itemIndex === activeIndex;
      item.classList.toggle('is-active', isActive);
      item.hidden = !isActive;
    });
    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  };

  carousel.querySelector('[data-carousel-previous]').addEventListener('click', () => showItem(activeIndex - 1));
  carousel.querySelector('[data-carousel-next]').addEventListener('click', () => showItem(activeIndex + 1));
  dots.forEach((dot) => {
    dot.addEventListener('click', () => showItem(Number(dot.dataset.carouselDot)));
  });
  showItem(0);
});
