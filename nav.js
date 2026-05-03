(function () {
  "use strict";

  var MOBILE_BREAKPOINT = 768;

  function setExpanded(toggle, panel, expanded) {
    toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    panel.setAttribute("data-collapsed", expanded ? "false" : "true");
  }

  function syncForViewport(toggle, panel) {
    if (window.innerWidth >= MOBILE_BREAKPOINT) {
      toggle.setAttribute("aria-expanded", "false");
      panel.removeAttribute("data-collapsed");
      return;
    }
    if (!panel.hasAttribute("data-collapsed")) {
      panel.setAttribute("data-collapsed", "true");
    }
    toggle.setAttribute(
      "aria-expanded",
      panel.getAttribute("data-collapsed") === "false" ? "true" : "false"
    );
  }

  function init(toggle) {
    var controls = toggle.getAttribute("aria-controls");
    var panel = controls ? document.getElementById(controls) : null;
    if (!panel) {
      return;
    }

    syncForViewport(toggle, panel);

    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      setExpanded(toggle, panel, !isOpen);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") {
        return;
      }
      if (toggle.getAttribute("aria-expanded") === "true") {
        setExpanded(toggle, panel, false);
        toggle.focus();
      }
    });

    var resizeTimer;
    window.addEventListener("resize", function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () {
        syncForViewport(toggle, panel);
      }, 150);
    });
  }

  document.querySelectorAll(".nav-toggle").forEach(init);
})();
