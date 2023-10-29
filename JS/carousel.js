
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
    slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

//slide function
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
    ;
}

//Right button click, move slides right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    //call function
    moveToSlide(track, currentSlide, nextSlide);
    //next slide
    // const amountToMove = nextSlide.style.left; //pixels to move
    // track.style.transform = 'translateX(-' + amountToMove + ')';
    //give current slide class to next slide
    // currentSlide.classList.remove('current-slide');
    //nextSlide.classList.add('current-slide');
});

//left button click, move slides left
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    //call function
    moveToSlide(track, currentSlide, prevSlide);

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

    //update dots
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
});

