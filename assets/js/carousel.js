//carousel function for moving the image left to right
const elem = document.querySelector('.carousel');
const instance = M.Carousel.getInstance(elem);

const chevronLeft = document.getElementById('chevron-left');
const chevronRight = document.getElementById('chevron-right');

let currentIndex = 0;
let maxImageNum = 3;

function moveCarouselLeft(){
    if(currentIndex <= 0 ){
        instance.set(maxImageNum)
        currentIndex = maxImageNum;
    }else{
        currentIndex = currentIndex - 1;
        instance.set(currentIndex);
    }

}

function moveCarouselRight(){

    if(currentIndex >= maxImageNum  ){
        instance.set(0)
        currentIndex = 0;
    }else{
        currentIndex = currentIndex + 1;
        instance.set(currentIndex);
    }
}
chevronLeft.addEventListener('click', function(event){
    moveCarouselLeft();
    // instance.prev(1);
})

chevronRight.addEventListener('click', function(event){
    moveCarouselRight();
    // instance.next(1);
})

