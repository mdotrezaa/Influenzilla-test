document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tab-btn");
    const panes = document.querySelectorAll(".tab-pane");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(btn => btn.classList.remove("active"));
            panes.forEach(pane => pane.classList.remove("active"));

            tab.classList.add("active");

            document
                .getElementById(tab.dataset.tab)
                .classList.add("active");
        });
    });
});

// =====================
// PROJECT SLIDER
// =====================

const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const dots = document.querySelectorAll(".dot");
const visibleSlides = window.matchMedia('(max-width: 768px)').matches ? 1 : 2;
const maxSlideIndex = Math.max(0, slides.length - visibleSlides);

let currentSlide = 0;

function updateSlider(){
    const shiftPercent = visibleSlides === 1 ? currentSlide * 100 : currentSlide * 50;
    track.style.transform = `translateX(-${shiftPercent}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentSlide].classList.add("active");
}

nextBtn.addEventListener("click", ()=> {
    currentSlide++;
    if (currentSlide > maxSlideIndex) {
        currentSlide = 0;
    }
    updateSlider();
});

prevBtn.addEventListener("click", ()=> {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = maxSlideIndex;
    }
    updateSlider();
});

dots.forEach((dot, index) => {
    dot.addEventListener("click", ()=> {
        currentSlide = Math.min(index, maxSlideIndex);
        updateSlider();
    });
});

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".menu-toggle").forEach(btn => {

        btn.textContent = "MENU";

        btn.addEventListener("click", (e) => {
            e.stopPropagation();

            const nav = btn.closest(".navbar");
            const menu = nav.querySelector(".menu-grid");

            const isOpen = menu.classList.toggle("open");

            btn.textContent = isOpen ? "Close" : "MENU";
            btn.setAttribute("aria-expanded", isOpen);
        });
    });

    document.addEventListener("click", () => {
        document.querySelectorAll(".menu-grid.open").forEach(menu => {
            menu.classList.remove("open");
        });

        document.querySelectorAll(".menu-toggle").forEach(btn => {
            btn.textContent = "MENU";
            btn.setAttribute("aria-expanded", "false");
        });
    });

    document.querySelectorAll(".menu-grid").forEach(menu => {
        menu.addEventListener("click", e => e.stopPropagation());
    });

});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-gtm]").forEach(link => {
        link.addEventListener("click", () => {
            gtag("event", "menu_click", {
                menu_name: link.dataset.gtm,
                menu_text: link.textContent.trim(),
                page_location: window.location.href
            });

            console.log("Tracked:", link.dataset.gtm);
        });
    });
});