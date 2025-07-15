document.addEventListener('DOMContentLoaded', function() {
  const loadingBar = document.getElementById('loadingBar');
  const loader = document.getElementById('loader');
  const loaderContent = document.querySelector('.loader-content');
  const loadingDots = document.getElementById('loading-dots');
  const minDisplayTime = 5000; // 5 seconds
  const startTime = Date.now();
  // Always reset loader state on page load
  loader.style.display = '';
  loader.classList.remove('fade-out');
  // Also reset transforms for curtain halves
  const loaderTop = document.querySelector('.loader-top');
  const loaderBottom = document.querySelector('.loader-bottom');
  if (loaderTop && loaderBottom) {
    loaderTop.style.transform = '';
    loaderBottom.style.transform = '';
  }
  // Wait for font to load before showing loader content
  if (document.fonts) {
    document.fonts.load('1rem "Press Start 2P"').then(function() {
      loaderContent.style.opacity = 1;
    });
  } else {
    loaderContent.style.opacity = 1;
  }
  // Animate loading dots
  let dotCount = 0;
  let dotsInterval = setInterval(() => {
    dotCount = (dotCount + 1) % 4;
    loadingDots.textContent = '.'.repeat(dotCount);
  }, 500);
  // Animate loading bar over 5 seconds
  function animateBar() {
    const elapsed = Date.now() - startTime;
    const percent = Math.min((elapsed / minDisplayTime) * 100, 100);
    loadingBar.style.width = percent + '%';
    if (percent < 100) {
      requestAnimationFrame(animateBar);
    }
  }
  animateBar();
  // Wait for both: page load and 5 seconds
  let pageLoaded = false;
  let minTimeElapsed = false;
  function tryHideLoader() {
    if (pageLoaded && minTimeElapsed) {
      loader.classList.add('fade-out');
      clearInterval(dotsInterval);
      setTimeout(() => loader.style.display = 'none', 900);
    }
  }
  setTimeout(function() {
    minTimeElapsed = true;
    tryHideLoader();
  }, minDisplayTime);
  window.addEventListener('load', function() {
    pageLoaded = true;
    tryHideLoader();
  });
});
