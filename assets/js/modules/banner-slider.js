const sliderItems = document.querySelectorAll('[data-banner="item"]');
const slider = document.querySelector('[data-banner="slider"]');
const btnNext = document.querySelector('[data-banner="btn-next"]');
const btnPrevious = document.querySelector('[data-banner="btn-previous"]');
const btnControls = document.querySelectorAll('[data-banner="btn-control"]');
const imgTitles = document.querySelectorAll('[data-banner="img-title"]');
const state = {
    mouseDownPosition: 0,
    lastTranslatePosition: 0,
    currentSliderPosition: 0,
    movementPosition: 0,
    currentSlideIndex: 0,
}

const translateSlide = (position) =>{
    state.lastTranslatePosition = position
    slider.style.transform = `translateX(${position}px)`;
}



const getCenterPosition = (index) =>{
    const slide = sliderItems[index];
    const margin = (window.innerWidth - slide.offsetWidth) / 2;
    const centerPosition = margin - (slide.offsetWidth * index);
    return centerPosition;
}


const animateTransition = (active) =>{
    if(active){
        slider.style.transition = 'transform .4s'
    }
    else{
        slider.style.removeProperty('transition');
    }
}

const activeControlButton = (index) =>{
    btnControls.forEach(function(item){
        item.classList.remove('active');
    })
    const btnControl = btnControls[index];
    
    btnControl.classList.add('active');
}


const activeImageTitle = (index) =>{
    imgTitles.forEach(function(item){
        item.classList.remove('active');
    })
    const imgTitle = imgTitles[index];
    
    imgTitle.classList.add('active');
}


const setVisibleSlide = (index) =>{
    state.currentSlideIndex = index;
    const position = getCenterPosition(index)
    animateTransition(true)
    activeControlButton(index);
    activeImageTitle(index)
    translateSlide(position)
}


const forwardSlide = () =>{
    if(state.currentSlideIndex < sliderItems.length-1){
        setVisibleSlide(state.currentSlideIndex + 1);
    }
    else{   
        setVisibleSlide(state.currentSlideIndex);
    }
}



const backwardSlide = () =>{
    if(state.currentSlideIndex > 0){
        setVisibleSlide(state.currentSlideIndex - 1);
    }
    else{
        setVisibleSlide(state.currentSlideIndex);
    }
}
function preventDefault(event){
    event.preventDefault();
}

const onMouseDown = (event, index) =>{
    const slide = event.currentTarget
    state.mouseDownPosition = event.clientX; 
    state.currentSlideIndex = index;
    animateTransition(false);
    state.currentSliderPosition = event.clientX - state.lastTranslatePosition;
    slide.addEventListener('mousemove',onMouseMove);
}

const onControlButtonClick = (event,index) =>{
    setVisibleSlide(index);
}

const onMouseMove = (event) =>{
    state.movementPosition = event.clientX - state.mouseDownPosition;
    translateSlide(event.clientX - state.currentSliderPosition);
}

const onMouseUp = (event) => {
    const slide = event.currentTarget;
    if(state.movementPosition > 150){
        backwardSlide();
    }
    else if(state.movementPosition < -150){
        forwardSlide();
    }
    else{
        const calc = getCenterPosition(state.currentSlideIndex);
        translateSlide(calc)
    }

    slide.removeEventListener('mousemove',onMouseMove);

}

const onMouseLeave = (event) =>{
    const slide = event.currentTarget 
    slide.removeEventListener('mousemove',onMouseMove);
}

const setListeners = () =>{
    btnNext.addEventListener('click',forwardSlide);
    btnPrevious.addEventListener('click',backwardSlide);
    sliderItems.forEach((slide, index) => {
        const link = slide.querySelector('.banner-slider__link')
        link.addEventListener('click',preventDefault); 
        slide.addEventListener('dragstart',preventDefault); 
        slide.addEventListener('mousedown',function(event){
            onMouseDown(event,index);
        });
        slide.addEventListener('mouseup',onMouseUp);
        slide.addEventListener('mouseleave',onMouseLeave);
        

        btnControls[index].addEventListener('click',function(event){
            onControlButtonClick(event,index);
        });
    });
}

const init = () =>{
    setVisibleSlide(0);
    setListeners();
}

export default {
    init
}