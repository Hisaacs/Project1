
  
// when document ready, hide most of the div and show some div
const hideDiv = document.getElementById("bandsintown", "recentSearch", "artist-navigation", ".js-artist-bio", ".js-no-events", ".js-read-more");
hideDiv.style.visibility = "hidden";

const hideArtistDiv = document.querySelector(".js-artist-bio", ".js-no-events", ".js-read-more");
hideArtistDiv.style.visibility = "hidden";

// when the search button executed, run searchBandsInTown function, show most of the div and hide some div

document.getElementById("myForm").addEventListener('submit', function (event) {

  const artistPrompt = document.getElementById("search").value.trim();
  const showDiv = document.getElementById("bandsintown", "recentSearch", "artist-navigation");
  showDiv.style.visibility = "visible";

  const artistInput = document.getElementById("search").value.trim();

  const hideCarousel = document.getElementById('feature-carousel');
  hideCarousel.style.display = "none";

  document.getElementById('search').value = '';

  searchBandsInTown(artistInput);
  event.preventDefault();
});

// when read more is clicked
const show = document.querySelector('.js-read-more');
const sideToggle = document.querySelector('.js-artist-bio');

show.addEventListener('click', function (e) {
  e.preventDefault();
  if (sideToggle.style.visibility === 'hidden') {
    sideToggle.style.visibility = 'visible';
  } else {
    sideToggle.style.visibility = 'hidden';
  }

});



 

 