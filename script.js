const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


const customCursor = document.querySelector("[data-custom-cursor]");

function customCursorFun() {
    window.addEventListener("mousemove" , function(e) {
        const positionX = e.clientX - customCursor.offsetWidth / 2;
        const positionY = e.clientY - customCursor.offsetHeight / 2;

        customCursor.style.transform = `translate(${positionX}px , ${positionY}px)`;

    })
}

customCursorFun()