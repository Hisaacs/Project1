
// when document ready, hide most of the div and show some div
const hideDiv = document.getElementById("bandsintown", "recentSearch", "artist-navigation", ".js-artist-bio", ".js-no-events", ".js-read-more");
hideDiv.style.visibility = "hidden";

const hideArtistDiv = document.querySelector(".js-artist-bio", ".js-no-events", ".js-read-more");
hideArtistDiv.style.display = "none";


// modal goes here
document.getElementById("myForm").addEventListener('submit', formFunction);
let elems = document.querySelectorAll('.modal');
let instances = M.Modal.init(elems);


// when the search button executed, run searchBandsInTown function, show most of the div and hide some div

function formFunction(event) {
  // console.log('dd')
  if(event != null) {
    event.preventDefault();
  }

  const artistName = document.getElementById("search").value.trim();
  if (artistName === "") {
    instances[0].open();
  } else {

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

        DropDownItemsFN();

      }
    });

    searchBandsInTown(artistInput);

  }
};


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


// drop down

if (!localStorage.getItem("SearchItems")) {
  localStorage.setItem("SearchItems", "[]");
}

function forceSearch(name) {
  document.getElementById("search").value = name;


  formFunction()
}

function DropDownItemsFN() {
  var DropDownItems = JSON.parse(localStorage.getItem("SearchItems"));

  var htmlRenderDropDown = ``;

  for (var o in DropDownItems) {

    htmlRenderDropDown += ` <li onclick="forceSearch('${DropDownItems[o][0]}')" style="margin: 0px !important;" class="row p-1 m-0
 ">
 <a onclick="forceSearch('${DropDownItems[o][0]}')">
 
    <img class="col" style="width: 60px!important;" src="${DropDownItems[o][1]}" width="60" />
 <a  class="col" style="display: inline-block; width: 50%">${DropDownItems[o][0]}</a>
</a> 
 </li> 
`
  }

  if (htmlRenderDropDown) {

    document.querySelector('#HistorySearch').innerHTML = htmlRenderDropDown;
  }

}

DropDownItemsFN();