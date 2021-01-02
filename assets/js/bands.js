

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
        //$(".event").empty();
        //  eventInfo.empty();
        // Loop through results
        $.each(response, function (i, data) {
          if (i <= 10) {
            let eventDetails = $("<tr>");
            eventDetails.append("<td class='td'>" + moment(data.datetime).format('MM/DD/YY') + "</td>");
            eventDetails.append("<td class='td'>" + data.venue.name + "</td>");
            eventDetails.append("<td class='td'>" + data.venue.city + ", " + data.venue.country + "</td>");
            eventDetails.append('<td class="btn btn-sm btn-primary btn-block">Save</a></td>');
            $(".event").append(eventDetails);
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
   
    success: function (data) {
      let markup = data.parse.text["*"];
      let i = $('<div>').html(markup);
      i.find('a').each(function () {
        $(this).replaceWith($(this).html());
      });
      i.find('sup').remove();
      i.find('.mw-ext-cite-error').remove();

      $('.js-artist-bio').html($(i).find('p'));

      var article = $('.js-artist-bio').html();

      var unavailable = "<p>Redirect to:</p>";
      if (article === unavailable) {
        $('.js-artist-bio').html("Sorry, we are unable to find the article.")
      }
    },
    error: function () {}

  });



}
