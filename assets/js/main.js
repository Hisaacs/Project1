// when document ready, hide most of the div and show some div
const hideDiv = document.getElementById("bandsintown", "recentSearch", "artist-navigation", ".js-artist-bio", ".js-no-events", ".js-read-more");
hideDiv.style.visibility = "hidden";

const hideArtistDiv = document.querySelector(".js-artist-bio", ".js-no-events", ".js-read-more");
hideArtistDiv.style.visibility = "hidden";


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
      artistName.innerHTML = response.name;
      artistImage.setAttribute("src", response.thumb_url);
      // console.log(response);

      var foundArtist = false;
      var SearchItems = JSON.parse(localStorage.getItem("SearchItems"));
      for (var zz in  SearchItems) {
        if (SearchItems[zz][0] ==artistName) {
          foundArtist =true;
          break;
        }
      }

      if(!foundArtist) {
        SearchItems.push([artistName, response.thumb_url]);
        localStorage.setItem("SearchItems", JSON.stringify(SearchItems));
      }
      // Ths calls the DropDownItem Function
      DropDownItemsFN();
    }
  });

  // This call the searchBandsInTown function
  searchBandsInTown(artistInput);

  event.preventDefault();
};

document.getElementById("myForm").addEventListener('submit', formFunction);

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


// drop down get search item from localStorage
if (!localStorage.getItem("SearchItems")) {
  localStorage.setItem("SearchItems", "[]");
}

function  forceSearch (name) {
   document.getElementById("search").value = name;

  formFunction()
}

// This section selects the artist from the dropdown list
function DropDownItemsFN () {
  var DropDownItems = JSON.parse(localStorage.getItem("SearchItems"));

  htmlRenderDropDown = ``;

  for (var item in DropDownItems) {
    htmlRenderDropDown += ` <li style="margin: 0px !important;" class="row p-1 m-0">
    <img class="col" src="${DropDownItems[item][1]}" width="20%" />
 <a onclick="forceSearch('${DropDownItems[item][0]}')" class="col" style="display: inline-block; width: 50%" href="#">${DropDownItems[item][0]}</a></li>`
  }

  if (htmlRenderDropDown) {
    document.querySelector('#HistorySearch').innerHTML = htmlRenderDropDown;
  }

}

DropDownItemsFN();