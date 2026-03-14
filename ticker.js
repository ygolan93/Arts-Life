const heroTicker = document.querySelector(".newsticker__track");
const footerTicker = document.querySelector(".footer .ticker-track");

const heroLine = "Lorem ipsum dolor sit amet consectetur adipisicing elit";
const heroUnit = `${heroLine} +++ `;
const footerUnit = "NEWSLETTER +++ ";

function buildTicker(track, unit, speed, className = "") {
  if (!track) {
    return;
  }

  const sample = document.createElement("span");
  sample.className = className;
  sample.textContent = unit;
  track.replaceChildren(sample);

  const sampleWidth = sample.getBoundingClientRect().width || 1;
  const viewportWidth = track.parentElement?.getBoundingClientRect().width || window.innerWidth;
  const repeatCount = Math.max(2, Math.ceil(viewportWidth / sampleWidth) + 1);
  const content = unit.repeat(repeatCount);

  const firstHalf = document.createElement("span");
  firstHalf.className = className;
  firstHalf.textContent = content;

  const secondHalf = document.createElement("span");
  secondHalf.className = className;
  secondHalf.textContent = content;

  if (track === heroTicker) {
    firstHalf.id = "newsmessage";
  }

  track.replaceChildren(firstHalf, secondHalf);

  const halfWidth = firstHalf.getBoundingClientRect().width || 1;
  const duration = Math.max(18, halfWidth / speed);
  track.style.setProperty("--ticker-duration", `${duration}s`);
}

function buildTickers() {
  buildTicker(heroTicker, heroUnit, 110, "newsflash");
  buildTicker(footerTicker, footerUnit, 90);
}

let resizeTimer;

buildTickers();

window.addEventListener("resize", () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(buildTickers, 200);
});
