// This is a loader that will display carousel after 4 seconds
document.querySelector('.carousel').style.display = "none";
document.querySelector('.div1').classList.add('progress');
document.querySelector('.div2').classList.add('indeterminate');
const hideChevBgL = document.getElementById("chevron-left");
hideChevBgL.style.visibility = "hidden";
const hideChevBgR = document.getElementById("chevron-right");
hideChevBgR.style.visibility = "hidden";

const hideFeatureCarousel = document.getElementById('feature-carousel');
hideFeatureCarousel.style.display = "none";
//This section will make carousel and chevron div visible
setTimeout(function () {
    document.querySelector('.div1').classList.remove('progress');
    document.querySelector('.div2').classList.remove('indeterminate');
    document.querySelector('.carousel').style.display = "block";
    const hideChevBgL = document.getElementById("chevron-left");
    hideChevBgL.style.visibility = "visible";
    const hideChevBgR = document.getElementById("chevron-right");
    hideChevBgR.style.visibility = "visible";

    const hideFeatureCarousel = document.getElementById('feature-carousel');
    hideFeatureCarousel.style.display = "block";
}, 2000);