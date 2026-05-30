/* =========================================================
   Joanne Le — Portfolio 2026
   Vanilla JS · copy email · project slide carousels
   ========================================================= */

(() => {
  "use strict";

  function figmaEmbedUrl(base, nodeId) {
    const id = nodeId.includes(":") ? nodeId.replace(":", "-") : nodeId;
    const join = base.includes("?") ? "&" : "?";
    return `${base}${join}node-id=${encodeURIComponent(id)}&embed-host=share`;
  }

  function initWorkCarousels() {
    document.querySelectorAll(".work__media").forEach((media) => {
      const prevBtn = media.querySelector(".work__nav--prev");
      const nextBtn = media.querySelector(".work__nav--next");
      const countEl = media.querySelector(".work__slide-count");
      if (!prevBtn || !nextBtn) return;

      const figmaBase = media.dataset.figmaBase;
      const figmaNodes = media.dataset.figmaNodes
        ? JSON.parse(media.dataset.figmaNodes)
        : null;

      let index = 0;

      const updateUi = (total) => {
        if (countEl) countEl.textContent = `${index + 1} / ${total}`;
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === total - 1;
      };

      if (figmaBase && figmaNodes?.length) {
        const iframe =
          media.querySelector(".work__embed") ||
          (() => {
            const el = document.createElement("iframe");
            el.className = "work__embed";
            el.setAttribute("allowfullscreen", "");
            el.setAttribute("loading", "lazy");
            el.setAttribute("title", "Project slides");
            media.querySelector(".work__viewport")?.appendChild(el);
            return el;
          })();

        const track = media.querySelector(".work__slides");
        if (track) track.remove();

        const go = (nextIndex) => {
          index = nextIndex;
          iframe.src = figmaEmbedUrl(figmaBase, figmaNodes[index]);
          updateUi(figmaNodes.length);
        };

        if (figmaNodes.length <= 1) {
          media.classList.add("is-single-slide");
          iframe.src = figmaEmbedUrl(figmaBase, figmaNodes[0]);
          return;
        }

        prevBtn.addEventListener("click", () => {
          if (index > 0) go(index - 1);
        });
        nextBtn.addEventListener("click", () => {
          if (index < figmaNodes.length - 1) go(index + 1);
        });

        go(0);
        return;
      }

      const track = media.querySelector(".work__slides");
      const slides = track ? Array.from(track.querySelectorAll(".work__slide")) : [];

      if (slides.length <= 1) {
        media.classList.add("is-single-slide");
        return;
      }

      const go = (nextIndex) => {
        index = nextIndex;
        track.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
        updateUi(slides.length);
      };

      prevBtn.addEventListener("click", () => {
        if (index > 0) go(index - 1);
      });
      nextBtn.addEventListener("click", () => {
        if (index < slides.length - 1) go(index + 1);
      });

      go(0);
    });
  }

  initWorkCarousels();

  document.querySelectorAll(".work__video").forEach((video) => {
    const media = video.closest(".work__media");
    if (!media) return;

    video.pause();
    video.currentTime = 0;

    media.addEventListener("mouseenter", () => {
      video.play().catch(() => {});
    });

    media.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  });

  const copyBtn = document.getElementById("copyEmail");
  if (copyBtn) {
    const email = copyBtn.dataset.email || "";
    const label = copyBtn.querySelector(".nav__copy-text");
    let resetTimer;

    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(email);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = email;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }

      if (label) label.textContent = "Copied!";
      copyBtn.classList.add("is-copied");
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        if (label) label.textContent = email;
        copyBtn.classList.remove("is-copied");
      }, 2000);
    });
  }
})();
