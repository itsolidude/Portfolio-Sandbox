
/* 
   Student name: Oliver Kadvany
   Student ID: 041096826
   File name: scripts.js
   Created Date: October 27, 2023
   Description: A javascript file that drives the project carousel and other elements.
   */

//------------------
//Carousel for project page
//carousel [1]
//Defining elements I need
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

//Arrange slides next to each other
const setSlidePosition = (slide, index) => {
    slide.style.left = 100 * index + '%';
};
slides.forEach(setSlidePosition);

//slide function
const moveToSlide = (track, currentSlide, targetSlide) => {
    const slideWidth = targetSlide.getBoundingClientRect().width;  // Recalculate the slide width here
    const amountToMove = -(slides.findIndex(slide => slide === targetSlide) * slideWidth);
    track.style.transform = 'translateX(' + amountToMove + 'px)';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
};


const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
};

//hide left arrow on first slide, change to sho on settings
const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
    else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    }
    else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
};

//Right button click, move slides right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;

    //move dots on arrow click
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide) // return index of next slide

    //call function
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    //next slide
    // const amountToMove = nextSlide.style.left; //pixels to move
    // track.style.transform = 'translateX(-' + amountToMove + ')';
    //give current slide class to next slide
    // currentSlide.classList.remove('current-slide');
    //nextSlide.classList.add('current-slide');
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
});

//left button click, move slides left
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide) // return index of prev slide

    //call function
    moveToSlide(track, currentSlide, prevSlide);

    //move dots on arrow click
    updateDots(currentDot, prevDot);

    //prev slide
    hideShowArrows(slides, prevButton, nextButton, prevIndex);

});

//dots(index) functionality

dotsNav.addEventListener('click', e => {
    //what indicator was clicked on
    // terminate function if not a button
    const targetDot = e.target.closest('button');
    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot) // return index of target dot
    const targetSlide = slides[targetIndex];

    //call function
    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);
});


// Fire on window resizing, otherwise the slides break
let resizeTimeout;
window.addEventListener('resize', () => {
    // Clear any existing timeouts to ensure the function doesn't run too much
    if (resizeTimeout) {
        clearTimeout(resizeTimeout);
    }

    // Set a timeout to delay the execution of function
    resizeTimeout = setTimeout(() => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        slides.forEach(setSlidePosition);
        const currentSlide = track.querySelector('.current-slide');
        const index = slides.findIndex(slide => slide === currentSlide);
        const newPosition = -(slideWidth * index);
        track.style.transform = 'translateX(' + newPosition + 'px)';
    }, 5); // Run every 10ms
});


//---------References----------------
//[1] K. Powell, "How to code a carousel with HTML, CSS and JavaScript - from scratch (part 2)," YouTube, [Video file], Published on [Date Published]. [Online].
// Available: https://www.youtube.com/watch?v=gBzsE0oieio&t=3424s&ab_channel=KevinPowell - Strongly modified by me.

