const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});



function firstPageAnimation() {
    var t1 = gsap.timeline();

    t1.from("nav", {
        y: -15,
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeOut
    });

    t1.to(".heading-animation > .hidden", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1.5,
        stagger: 0.2
    });

    t1.from(".bottomText2", {
        y: 15,
        opacity: 0,
        duration: 1.5,
        delay: -1.5,
        ease: Expo.easeInOut,
    })
}




function cursorAnimation() {

    let cursorScaleX = 1;
    let cursorScaleY = 1;

    let prevX = 0;
    let prevY = 0;

    window.addEventListener("mousemove", (e) => {

        let diffX = e.clientX - prevX;
        let diffY = e.clientY - prevY;

        prevX = e.clientX;
        prevY = e.clientY;

        cursorScaleX = gsap.utils.clamp(0.8, 1.2, diffX);
        cursorScaleY = gsap.utils.clamp(0.8, 1.2, diffY);

        customCursorFun(e.clientX , e.clientY ,  cursorScaleX , cursorScaleY)
        // console.log(cursorScaleX , cursorScaleY)

    })
}

cursorAnimation();


const customCursor = document.querySelector("[data-custom-cursor]");

function customCursorFun(clientX , clientY , cursorScaleX, cursorScaleY) {
    
            const positionX = clientX - customCursor.offsetWidth / 2;
            const positionY = clientY - customCursor.offsetHeight / 2;
    
            customCursor.style.transform = `translate(${positionX}px , ${positionY}px) scale(${cursorScaleX} , ${cursorScaleY})`;
    
    }
    customCursorFun();
    
    



firstPageAnimation();
// function customCursorFun(){
    
//     window.addEventListener("mousemove" , (e) => {
//         document.querySelector("[data-custom-cursor]").style.transform = `translate(${e.clientX}px - .offsetWidth / 2, ${e.clientY}px) - .offsetHeight / 2`
//     })
    
// }
// customCursorFun();