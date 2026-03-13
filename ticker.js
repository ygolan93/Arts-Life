const originMessage =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit+++";
const gap = "  ";
const counter = 3;
const newsMessage = document.getElementById("newsmessage");

if (newsMessage) {
  newsMessage.textContent = `${originMessage}${gap}`.repeat(counter);
}

const originMessage2 = "NEWSLETTER+++";
const gap2 = "     ";

function generateTicker() {
  const textElement = document.getElementById("footer-message");

  if (!textElement) {
    return;
  }

  const screenWidth = window.innerWidth;
  const approxCharWidth = 12;
  const messageWidth = (originMessage2.length + gap2.length) * approxCharWidth;
  const repeatCount = Math.ceil(screenWidth / messageWidth) + 4;

  textElement.textContent = (originMessage2 + gap2).repeat(repeatCount);
}

generateTicker();
window.addEventListener("DOMContentLoaded", generateTicker);
window.addEventListener("resize", generateTicker);
