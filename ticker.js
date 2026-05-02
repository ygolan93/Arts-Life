const heroTicker = document.querySelector(".newsticker__track");
const footerTicker = document.querySelector(".footer .ticker-track");

const heroLine = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
const heroUnit = `${heroLine} +++ `;
const footerUnit = "NEWSLETTER+++";

function createTickerSpan(text, className = "") {
  const span = document.createElement("span");
  span.className = className;
  span.textContent = text;
  return span;
}

function buildTicker(track, unit, speed, className = "", options = {}) {
  if (!track) {
    return;
  }

  const sample = createTickerSpan(unit, className);
  track.replaceChildren(sample);

  const sampleWidth = sample.getBoundingClientRect().width || 1;
  const viewportWidth = track.parentElement?.getBoundingClientRect().width || window.innerWidth;
  const repeatCount = Math.max(2, Math.ceil(viewportWidth / sampleWidth) + 1);

  if (options.individualItems) {
    const spans = [];
    for (let i = 0; i < repeatCount * 2; i += 1) {
      spans.push(createTickerSpan(unit, className));
    }

    track.replaceChildren(...spans);

    const distance =
      spans[repeatCount]?.getBoundingClientRect().left -
        spans[0]?.getBoundingClientRect().left ||
      sampleWidth * repeatCount;
    const duration = Math.max(18, distance / speed);
    track.style.setProperty("--ticker-distance", `-${distance}px`);
    track.style.setProperty("--ticker-duration", `${duration}s`);
    return;
  }

  const content = `${unit} `.repeat(repeatCount);
  const firstHalf = createTickerSpan(content, className);
  const secondHalf = createTickerSpan(content, className);

  if (track === heroTicker) {
    firstHalf.id = "newsmessage";
  }
  track.replaceChildren(firstHalf, secondHalf);

  const distance =
    secondHalf.getBoundingClientRect().left - firstHalf.getBoundingClientRect().left ||
    firstHalf.getBoundingClientRect().width ||
    1;
  const duration = Math.max(18, distance / speed);
  track.style.setProperty("--ticker-distance", `-${distance}px`);
  track.style.setProperty("--ticker-duration", `${duration}s`);
}

function buildTickers() {
  buildTicker(heroTicker, heroUnit, 110, "newsflash");
  const isPodcastFooter = document.body.classList.contains("podcast-page");
  buildTicker(footerTicker, footerUnit, 90, isPodcastFooter ? "footer-newsletter-item" : "", {
    individualItems: isPodcastFooter,
  });
}

let resizeTimer;

buildTickers();

window.addEventListener("resize", () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(buildTickers, 200);
});
