  ////search modal
  const modalBg = document.querySelector(".modal-background");
  const modal = document.querySelector(".modal");
  const closeBtn = document.querySelector(".modal-close");



  document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const artistPro = document.getElementById("search").value.trim();
    if (artistPro === "") {

      const hideSection = document.querySelector(".js-no-artist", ".js-no-events", ".js-event-table");
      hideSection.style.visibility = "hidden";

      modal.classList.add('is-active');


    }
  });

  closeBtn.addEventListener('click', () => {
    window.location.replace("./event.html");
  });
// when document ready, hide most of the div and show some div
const hideDiv = document.getElementById("bandsintown", "recentSearch", "artist-navigation", ".js-artist-bio", ".js-no-events", ".js-read-more");
hideDiv.style.visibility = "hidden";
const hideArtistDiv = document.querySelector(".js-artist-bio", ".js-no-events", ".js-read-more");
hideArtistDiv.style.display = "none";


function formFunction(event) {
  console.log('dd')
  const artistName = document.getElementById("search").value.trim();
  const showDiv = document.getElementById("bandsintown", "recentSearch", "artist-navigation");
  showDiv.style.visibility = "visible";
  const artistInput = document.getElementById("search").value.trim();
  const hideCarousel = document.getElementById('feature-carousel');
  hideCarousel.style.display = "none";

  document.getElementById('search').value = '';
  if (!localStorage.getItem("SearchItems")) {
    localStorage.setItem("SearchItems", "[]");
  }

  const queryArtist = 'https://rest.bandsintown.com/artists/' + artistInput + '?app_id=bandsintown';

  // run bandsintown API to get the info
  $.ajax({
    url: queryArtist,
    method: "GET",
    success: function (response) {
      // $('.js-artist-name').html(response.name);
      artistName.innerHTML = response.name;
      // $('.js-artist-image').attr('src', response.thumb_url);
      artistImage.setAttribute("src", response.thumb_url);
      // console.log(response);
      var foundArtist = false;
      var SearchItems = JSON.parse(localStorage.getItem("SearchItems"));
      for (var zz in SearchItems) {
        if (SearchItems[zz][0] == artistName) {
          foundArtist = true;
          break;
        }
      }
      if (!foundArtist) {
        SearchItems.push([artistName, response.thumb_url]);
        localStorage.setItem("SearchItems", JSON.stringify(SearchItems));
      }
    }
  });

  searchBandsInTown(artistInput);
  event.preventDefault();
};

document.getElementById("myForm").addEventListener('submit', formFunction);

// when read more is clicked
const show = document.querySelector('.js-read-more');
const sideToggle = document.querySelector('.js-artist-bio');

show.addEventListener('click', function (e) {
  e.preventDefault();
  if (sideToggle.style.display === 'none') {
    sideToggle.style.display = 'inline-block';
  } else {
    sideToggle.style.display = 'none';
  }
});




