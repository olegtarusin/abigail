(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const body = document.body;
    window.addEventListener("load", loader);
    document.addEventListener("click", globalclick);
    document.addEventListener("touchstart", getHover);
    document.addEventListener("touchend", getHover);
    function getHover(e) {
        if (e.type == "touchstart") e.target.classList.add("hover");
        if (e.type == "touchend") e.target.classList.remove("hover");
    }
    function globalclick(e) {
        let openCheck = document.querySelector(".menu-open");
        if (e.target.closest(".menu__icon")) body.classList.toggle("menu-open");
        if (openCheck && !e.target.closest(".menu__wrapper") || openCheck && e.target.closest("[data-anchor]")) body.classList.remove("menu-open");
        if (e.target.closest("[data-submit]")) e.preventDefault();
        if (e.target.closest('a[href*="#"]')) {
            e.preventDefault();
            let anhor = e.target.closest('a[href*="#"]');
            let href = anhor.getAttribute("href");
            let hrefTarget = document.querySelector("" + href);
            hrefTarget.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }
    function loader(e) {
        setTimeout(loaded, 500);
        function loaded() {
            body.classList.add("loaded");
        }
        setTimeout(initCode, 1e3);
    }
    function initCode() {
        const loaded = document.querySelector(".loaded");
        if (loaded) {
            let globalWrapper = document.querySelector(".page");
            let globalChildren = globalWrapper.children;
            globalChildren = Array.from(globalChildren);
            let lineWrapper = document.querySelector(".skills__body");
            lineWrapper.style.transform = `translateX(0px)`;
            document.querySelectorAll(".about__title");
            let x1 = null;
            let x2 = null;
            let transNow = getTrans();
            let spollerWrapper = document.querySelector("[data-spoller-wrapper]");
            let spollerButton = spollerWrapper.querySelector("[data-spoller-button]");
            let spollerContent = spollerWrapper.querySelector("[data-spoller-content]");
            var option = {
                root: null,
                treshold: 1
            };
            eqGalCaption();
            window.addEventListener("resize", resizer);
            var callback = function(entries, observer) {
                entries.forEach((entry => {
                    let entryClasses = entry.target.classList;
                    entryClasses = Array.from(entryClasses);
                    if (entry.isIntersecting) {
                        entry.target.classList.add("anima");
                        if (entryClasses.includes("skills")) paralaxSkills();
                        if (entryClasses.includes("titlepage")) {
                            let titCheck = document.querySelector(".view--tit");
                            if (titCheck) body.classList.remove("view--tit");
                        }
                    }
                    if (!entry.isIntersecting) {
                        if (entryClasses.includes("active--skills")) removeListner();
                        if (entryClasses.includes("anima")) entry.target.classList.remove("anima");
                        if (entryClasses.includes("titlepage")) body.classList.add("view--tit");
                    }
                }));
            };
            var observer = new IntersectionObserver(callback, option);
            globalChildren.forEach((child => {
                observer.observe(child);
            }));
            initspoller();
            appearCard();
            function initspoller() {
                spollerButton.addEventListener("click", spollerGo);
            }
            function spollerGo() {
                let wrapperClasses = spollerWrapper.classList;
                wrapperClasses = Array.from(wrapperClasses);
                let buttonSpanList = spollerButton.children;
                function changeWord() {
                    buttonSpanList[0].classList.toggle("hide");
                    buttonSpanList[1].classList.toggle("hide");
                }
                setTimeout(changeWord, 800);
                if (wrapperClasses.includes("spoller--open")) {
                    spollerContent.style.paddingBottom = `0px`;
                    spollerWrapper.classList.remove("spoller--open");
                    spollerContent.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
                if (!wrapperClasses.includes("spoller--open")) {
                    spollerWrapper.classList.add("spoller--open");
                    spollerContent.style.paddingBottom = `${spollerContent.scrollHeight}px`;
                }
            }
            function removeListner() {
                lineWrapper.classList.remove("active--skills");
                lineWrapper.removeEventListener("touchstart", paralaxStart);
                lineWrapper.removeEventListener("touchmove", paralaxMove);
                lineWrapper.removeEventListener("touchend", paralaxEnd);
                lineWrapper.removeEventListener("mousedown", paralaxStart);
                lineWrapper.removeEventListener("mousemove", paralaxMove);
                lineWrapper.removeEventListener("mouseleave", paralaxEnd);
                lineWrapper.removeEventListener("mouseup", paralaxEnd);
            }
            function paralaxSkills() {
                lineWrapper.classList.add("active--skills");
                lineWrapper.addEventListener("touchstart", paralaxStart);
                lineWrapper.addEventListener("touchmove", paralaxMove);
                lineWrapper.addEventListener("touchend", paralaxEnd);
                lineWrapper.addEventListener("mousedown", paralaxStart);
                lineWrapper.addEventListener("mousemove", paralaxMove);
                lineWrapper.addEventListener("mouseup", paralaxEnd);
                lineWrapper.addEventListener("mouseleave", paralaxEnd);
            }
            function getTrans() {
                let trans = lineWrapper.style.transform;
                trans = trans.slice(11);
                trans = parseFloat(trans);
                return trans;
            }
            function paralaxBlock(x, block) {
                let transLimit = block.scrollWidth - block.clientWidth;
                if (x <= 0 && x >= -transLimit) if (x < -transLimit * .6) block.style.transform = `translateX(${-transLimit}px)`; else block.style.transform = `translateX(${x}px)`;
                if (transNow != 0 && x >= transNow && transNow + x <= 0 && transNow + x >= -transLimit) if (x > transLimit * .6) block.style.transform = `translateX(0px)`; else block.style.transform = `translateX(${transNow + x}px)`;
            }
            function paralaxStart(e) {
                if (e.type == "mousedown") x1 = e.clientX; else x1 = e.touches[0].clientX;
                if (x1 != null) transNow = getTrans();
            }
            function paralaxMove(e) {
                if (x1 != null) {
                    if (e.type == "mousemove") x2 = e.clientX; else x2 = e.touches[0].clientX;
                    let xDef = x2 - x1;
                    paralaxBlock(xDef, this);
                }
            }
            function paralaxEnd(e) {
                x1 = null;
            }
            function resizer() {
                eqGalCaption();
            }
            function eqGalCaption() {
                let captionList = document.querySelectorAll(".artbord__caption");
                if (window.innerWidth <= 768) {
                    let heightList = [];
                    captionList.forEach((caption => {
                        caption.style.minHeight = `0px`;
                        let captionHeight = parseFloat(window.getComputedStyle(caption).height);
                        heightList.push(captionHeight);
                    }));
                    let maxHeight = Math.max.apply(null, heightList);
                    captionList.forEach((itemCaption => {
                        itemCaption.style.minHeight = `${maxHeight}px`;
                    }));
                }
            }
            function appearCard() {
                var options = {
                    root: null,
                    treshold: .5
                };
                var cardsback = function(entries, observCard) {
                    entries.forEach((entry => {
                        let entryClasses = entry.target.classList;
                        entryClasses = Array.from(entryClasses);
                        if (entry.isIntersecting) entry.target.classList.add("view");
                        if (!entry.isIntersecting) if (entryClasses.includes("view")) entry.target.classList.remove("view");
                    }));
                };
                var observCard = new IntersectionObserver(cardsback, options);
                function getChilds(selector) {
                    let parent = document.querySelector(selector);
                    let childList = parent.children;
                    childList = Array.from(childList);
                    return childList;
                }
                let cardbord = getChilds(".bord__body");
                let artbord = getChilds(".artbord__body");
                cardbord = cardbord.concat(artbord);
                cardbord.forEach((card => {
                    observCard.observe(card);
                }));
            }
        }
    }
    window["FLS"] = true;
    isWebp();
})();