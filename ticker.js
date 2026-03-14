const heroMessage = "Lorem ipsum dolor sit amet consectetur adipisicing elit";
const heroSeparator = " +++ ";
const footerMessage = "NEWSLETTER";
const footerSeparator = " +++ ";

const heroTicker = document.getElementById("newsmessage");
const footerTrack = document.querySelector(".ticker-track");

if (heroTicker) {
  heroTicker.textContent = Array.from({ length: 3 }, () => heroMessage).join(heroSeparator);
}

function buildFooterTicker() {
  if (!footerTrack) {
    return;
  }

  const unit = `${footerMessage}${footerSeparator}`;
  const measurement = document.createElement("span");
  measurement.textContent = unit.repeat(2);
  footerTrack.innerHTML = "";
  footerTrack.appendChild(measurement);

  const firstWidth = measurement.getBoundingClientRect().width;
  const viewportWidth = footerTrack.parentElement
    ? footerTrack.parentElement.getBoundingClientRect().width
    : window.innerWidth;

  const baseCopies = Math.max(2, Math.ceil((viewportWidth * 2) / Math.max(firstWidth, 1)));
  const minCopies = baseCopies % 2 === 0 ? baseCopies : baseCopies + 1;

  footerTrack.innerHTML = "";

  for (let index = 0; index < minCopies; index += 1) {
    const item = document.createElement("span");
    item.textContent = unit.repeat(2);
    footerTrack.appendChild(item);
  }

  const totalWidth = footerTrack.scrollWidth;
  const speed = 90;
  const duration = Math.max(18, totalWidth / speed);

  footerTrack.style.setProperty("--ticker-duration", `${duration}s`);
}

buildFooterTicker();
window.addEventListener("load", buildFooterTicker);
window.addEventListener("resize", buildFooterTicker);
