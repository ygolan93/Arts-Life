const heroTicker = document.getElementById("newsmessage");
const footerTrack = document.querySelector(".ticker-track");

const heroLine = "Lorem ipsum dolor sit amet consectetur adipisicing elit";
const footerUnit = "NEWSLETTER +++ ";

if (heroTicker) {
  heroTicker.textContent = Array.from({ length: 3 }, () => heroLine).join(" +++ ");
}

function buildFooterTicker() {
  if (!footerTrack) {
    return;
  }

  const sample = document.createElement("span");
  sample.textContent = footerUnit.repeat(2);
  footerTrack.replaceChildren(sample);

  const sampleWidth = sample.getBoundingClientRect().width || 1;
  const viewportWidth = footerTrack.parentElement?.getBoundingClientRect().width || window.innerWidth;
  const repeatCount = Math.max(2, Math.ceil((viewportWidth * 2) / sampleWidth));
  const evenRepeatCount = repeatCount % 2 === 0 ? repeatCount : repeatCount + 1;

  footerTrack.replaceChildren(
    ...Array.from({ length: evenRepeatCount }, () => {
      const item = document.createElement("span");
      item.textContent = footerUnit.repeat(2);
      return item;
    })
  );

  const duration = Math.max(18, footerTrack.scrollWidth / 90);
  footerTrack.style.setProperty("--ticker-duration", `${duration}s`);
}

buildFooterTicker();
window.addEventListener("resize", buildFooterTicker);
