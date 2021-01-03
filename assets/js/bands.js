
// Save item in localStorage to bookmark

function  isSaved (time, name, city) {
  if (!localStorage.getItem("bookmarkItems")) {
    localStorage.setItem("bookmarkItems", "[]");
  }
 
  let oldStorage = JSON.parse(localStorage.getItem("bookmarkItems"));
  let found = false;

  for(let i in oldStorage) {
    if (time == oldStorage[i][0] && name == oldStorage[i][1] && city == oldStorage[i][2])  {
      found = true;
      break;
    }
  }
  return found;

}
// Removing item from localStorage Bookmark
function  remove (time, name, city) {
  if (!localStorage.getItem("bookmarkItems")) {
    localStorage.setItem("bookmarkItems", "[]");
  }
  let oldStorage = JSON.parse(localStorage.getItem("bookmarkItems"));

  for(let i in oldStorage) {
    if (time == oldStorage[i][0] && name == oldStorage[i][1] && city == oldStorage[i][2])  {
      oldStorage.splice(i, 1);
      localStorage.setItem("bookmarkItems", JSON.stringify(oldStorage));
    }
  }
}
// Saving artist to Bookmark
function  saveToBookmark (el, time, name, city) {

  el.className = el.className + " btn-success";
  el.innerText ="saved";

  if (!localStorage.getItem("bookmarkItems")) {
    localStorage.setItem("bookmarkItems", "[]");
  }

  if (isSaved(time, name, city)) {
    el.classList.remove('btn-success')
    el.innerText ="save";
    remove(time, name, city);
    return ;
  }

  let oldStorage = JSON.parse(localStorage.getItem("bookmarkItems"));
  oldStorage.push([time, name, city]);
  localStorage.setItem("bookmarkItems", JSON.stringify(oldStorage));
  console.log(time, name, city);
}

//Variable declaration by grabbing class
const artistName = document.querySelector(".js-artist-name");
const artistImage = document.querySelector(".js-artist-image");

// function searchBandsInTown start for search the artist including all the information
function searchBandsInTown(artistInput) {

  const queryArtistUrl = 'https://rest.bandsintown.com/artists/' + artistInput + '?app_id=bandsintown';
  const queryEventUrl = 'https://rest.bandsintown.com/artists/' + artistInput + '/events?app_id=bandsintown';


  // run bandsintown API to get the artist info
  $.ajax({
    url: queryArtistUrl,
    method: "GET",
    success: function (response) {
      artistName.innerHTML = response.name;
      artistImage.setAttribute("src", response.thumb_url);
      // console.log(response);
    }
  });

  // run bandsintown API to get the events info
  $.ajax({
    url: queryEventUrl,
    method: "GET",
    error: function () {
      const noArtistFound = document.querySelector(".js-no-artist");
      noArtistFound.style.display = "block";
      const aritstInfo = document.querySelector(".js-artist-info");
      aritstInfo.style.display = "none";
    },
    success: function (response) {
      const noArtist = document.querySelector(".js-no-artist");
      noArtist.style.display = "none";
      const artistInfo = document.querySelector(".js-artist-info");
      artistInfo.style.display = "block";

      if (!response.length) {
        const noEvents = document.querySelector(".js-no-events");
        noEvents.style.display = "block";

        const eventTable = document.querySelector(".js-event-table");
        eventTable.style.display = "none";
       
      } else {
        const tableEvent = document.querySelector(".js-event-table");
        tableEvent.style.display = "block";
        const eventNull = document.querySelector(".js-no-events");
        eventNull.style.display = "none";
        const eventInfo = document.querySelector(".event");
        eventInfo.innerHTML = " ";

        // Loop through results
        
        $.each(response, function (i, data) {
          if (i <= 10) {
            let event = $("<tr>");
            let isSaved_ = isSaved(moment(data.datetime).format('MM/DD/YY'), data.venue.name, data.venue.city);
            let ell = isSaved_ ? "btn-success" : null ;
            let tett = isSaved_ ? "saved" : "save";
            event.append("<td class='td'>" + moment(data.datetime).format('MM/DD/YY') + "</td>");
            event.append("<td class='td'>" + data.venue.name + "</td>");
            event.append("<td class='td'>" + data.venue.city + ", " + data.venue.country + "</td>");
            event.append('<td class="btn btn-sm btn-primary btn-block  ' + ell +' " onclick="saveToBookmark(this,'
                + "'"+ moment(data.datetime).format('MM/DD/YY') +"'"+
                ","+ "'"+ data.venue.name  +"'"+
                ","+ "'"+ data.venue.city +"'"+')">' + tett + '</a></td>');
            $(".event").append(event);
          }
        });

        }
    }
  });


  // run WIKIPEDIA API to get more info about the artist
  $.ajax({
    url: "https://en.wikipedia.org/w/api.php",
    data: {
      format: "json",
      action: "parse",
      page: artistInput,
      prop: "text",
      section: 0,
    },
    dataType: 'jsonp',
    headers: {
      'Api-User-Agent': 'CBC'
    },
    error: function () {},
    success: function (data) {
      let markup = data.parse.text["*"];
      let i = $('<div>').html(markup);
      i.find('a').each(function () {
        $(this).replaceWith($(this).html());
      });
      // i.find('sup').remove();
      // i.find('.mw-ext-cite-error').remove();

      $('.js-artist-bio').html($(i).find('p'));

      let article = $('.js-artist-bio').html();

      let unavailable = "<p>Redirect to:</p>";
      if (article === unavailable) {
        $('.js-artist-bio').html("Sorry, we are unable to find the article.")
      }
    }
  });
}
