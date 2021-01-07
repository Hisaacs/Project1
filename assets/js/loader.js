
// This is a loader that will display carousel after 4 seconds
document.querySelector('.carousel').style.display = "none";
document.querySelector('.div1').classList.add('progress');
document.querySelector('.div2').classList.add('indeterminate');
const hideBgL = document.getElementById("chevron-left");
hideBgL.style.visibility = "hidden";
const hideBgR = document.getElementById("chevron-right");
hideBgR.style.visibility = "hidden";

const hideCarousel = document.getElementById('feature-carousel');
hideCarousel.style.display = "none";

setTimeout(function() {
    document.querySelector('.div1').classList.remove('progress');
    document.querySelector('.div2').classList.remove('indeterminate');
    document.querySelector('.carousel').style.display = "block";
}, 2000);