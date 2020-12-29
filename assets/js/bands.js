//Working_Code
// function searchBandsInTown start for search the artist including all the information

const artistName = document.querySelector(".js-artist-name");
const artistImage = document.querySelector(".js-artist-image");
const  noArtistFound = document.querySelector(".js-no-artist");
const aritstInfo = document.querySelector(".js-artist-info");

const noEvents = document.querySelector(".js-no-events");
const eventTable = document.querySelector(".js-event-table");
const eventInfo = document.querySelector(".event");

function searchBandsInTown(artistInput) {

  const queryArtist = 'https://rest.bandsintown.com/artists/' + artistInput + '?app_id=bandsintown';
  const queryEvent = 'https://rest.bandsintown.com/artists/' + artistInput + '/events?app_id=bandsintown';


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

    }
  });

  // run bandsintown API to get the events
  $.ajax({
    url: queryEvent,
    method: "GET",
    error: function () {
      // $(".js-no-artist").show();
      noArtistFound.show();
      // $(".js-artist-info").hide();
      aritstInfo.hide();// works up until this point
      // $("#recentSearch, #artist-navigation").hide();
    },
    success: function (response) {

      $(".js-no-artist").hide();
      $(".js-artist-info").show();
    

      if (!response.length) {
        // $(".js-no-events").show();
        noEvents.show();
        // $(".js-event-table").hide();
        eventTable.hide();
      } else {
        $(".js-event-table").show();
        // eventTable.show();
        $(".js-no-events").hide();
        $(".event").empty();
        //  eventInfo.empty();
        // Loop through results
        $.each(response, function (i, data) {
          if (i <= 10) {
            let event = $("<tr>");
            event.append("<td class='td'>" + moment(data.datetime).format('MM/DD/YY') + "</td>");
            event.append("<td class='td'>" + data.venue.name + "</td>");
            event.append("<td class='td'>" + data.venue.city + ", " + data.venue.country + "</td>");
            event.append('<td class="btn btn-sm btn-primary btn-block">Save</a></td>');
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
      i.find('sup').remove();
      i.find('.mw-ext-cite-error').remove();

      $('.js-artist-bio').html($(i).find('p'));

      var article = $('.js-artist-bio').html();

      var unavailable = "<p>Redirect to:</p>";
      if (article === unavailable) {
        $('.js-artist-bio').html("Sorry, we are unable to find the article.")
      }
    }
  });



}
