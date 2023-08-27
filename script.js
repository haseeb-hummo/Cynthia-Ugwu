// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

// Function for the first page animation
function firstPageAnimation() {
    var t1 = gsap.timeline();

    // Animate navigation bar
    t1.from("nav", {
        y: -15,
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeOut
    });

    // Animate hidden elements in the heading
    t1.to(".heading-animation > .hidden", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1.5,
        stagger: 0.2
    });

    // Animate bottom text
    t1.from(".bottomText2", {
        y: 15,
        opacity: 0,
        duration: 1.5,
        delay: -1.5,
        ease: Expo.easeInOut,
    });
}

// Custom cursor animation variables
const customCursor = document.querySelector("[data-custom-cursor]");
let timeout;
let cursorScaleX = 1;
let cursorScaleY = 1;
let prevX = 0;
let prevY = 0;

// Function to handle cursor animation
function cursorAnimation(e) {
    clearTimeout(timeout);

    // Calculate cursor movement differences
    let diffX = e.clientX - prevX;
    let diffY = e.clientY - prevY;

    prevX = e.clientX;
    prevY = e.clientY;

    // Apply cursor scaling based on movement
    cursorScaleX = gsap.utils.clamp(0.8, 1.2, diffX);
    cursorScaleY = gsap.utils.clamp(0.8, 1.2, diffY);

    customCursorFun(e.clientX, e.clientY, cursorScaleX, cursorScaleY);

    // Reset cursor position after a delay
    timeout = setTimeout(() => {
        const positionX = e.clientX - customCursor.offsetWidth / 2;
        const positionY = e.clientY - customCursor.offsetHeight / 2;
        customCursor.style.transform = `translate(${positionX}px , ${positionY}px) scale(1 , 1)`;
    }, 100);
}

// Function to apply custom cursor transformation
function customCursorFun(clientX, clientY, cursorScaleX, cursorScaleY) {
    const positionX = clientX - customCursor.offsetWidth / 2;
    const positionY = clientY - customCursor.offsetHeight / 2;

    customCursor.style.transform = `translate(${positionX}px , ${positionY}px) scale(${cursorScaleX} , ${cursorScaleY})`;
}

// Attach cursor animation to mousemove event
document.addEventListener("mousemove", cursorAnimation);

// Trigger first page animation
firstPageAnimation();

// Add animation to elements on mousemove
document.querySelectorAll(".elements").forEach(element => {
    let rotate = 0;
    let prevRotate = 0;

    element.addEventListener("mousemove", event => {
        rotate = event.clientX - prevRotate;
        prevRotate = event.clientX;
        const y = event.clientY - element.getBoundingClientRect().top;

        // Animate element on mousemove
        gsap.to(element.querySelector("img"), {
            ease: Power2,
            top: y,
            left: event.clientX - 50,
            rotate: gsap.utils.clamp(-20, 20, rotate),
            duration: 1
        });
    });
});

// Enlarge cursor on element hover
let elements = document.querySelectorAll('.elements');
let customCursor_h5 = customCursor.querySelector("h5");

elements.forEach(function (element) {
    element.addEventListener('mouseover', enlargeCursor);
    element.addEventListener('mouseout', normalizeCursor);
});

// Function to enlarge cursor
function enlargeCursor() {
    customCursor.style.height = '90px';
    customCursor.style.width = '90px';
    customCursor.style.opacity = '0.8';
    customCursor_h5.style.opacity = 1;
    customCursor.style.mixBlendMode = 'normal'; // Enclose 'overlay' in quotes    
}

// Function to normalize cursor size and opacity
function normalizeCursor() {
    customCursor.style.height = '13px'; // Original height
    customCursor.style.width = '13px';  // Original width
    customCursor.style.opacity = '1';
    customCursor_h5.style.opacity = 0;
    customCursor.style.color = "black";
    customCursor.style.mixBlendMode = "difference";
}


function updateLiveTime() {
    const yearElement = document.querySelector(".year")
    const TimeElement = document.querySelector('.time');
    
    const now = new Date();
    const year = now.getFullYear().toString();
    const hours = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
    const AmPm = now.getHours() >= 12 ? 'PM' : 'AM';

    const liveYearString = `${year} ©`
    yearElement.textContent = liveYearString;
    
    const liveTimeString = `${hours}:${now.getMinutes().toString().padStart(2, '0')} ${AmPm} EST`;
    TimeElement.textContent = liveTimeString;
}

// Update the time every minute
setInterval(updateLiveTime, 60000); // Update every 1 minute

// Initial call to set the time immediately
updateLiveTime();

