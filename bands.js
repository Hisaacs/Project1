// creating variable for all necessary elements by grabbing its id and class

const artistName = document.querySelector(".js-artist-name");
const artistImage = document.querySelector(".js-artist-image");

const  noArtistFound = document.querySelector(".js-no-artist");
const aritstInfo = document.querySelector(".js-artist-info");

const noEvents = document.querySelector(".js-no-events");
const eventTable = document.querySelector(".js-event-table");
const eventInfo = document.querySelector(".event");




// function searchBandsInTown start for search the artist including all the information

function searchArtist (artistPrompt) {
     //Bands in town API keys for artis and events
     const queryArtistUrl = 'https://rest.bandsintown.com/artists/' + artistPrompt + '?app_id=bandsintown';
     const queryEventUrl = 'https://rest.bandsintown.com/artists/' + artistInput + '/events?app_id=bandsintown';

     // Querying the bands in town API for the selected artist
     $.ajax({
          url: queryArtistUrl,
          method: "GET"
     }).then(function(response){

            artistName.innerHTML = response.name;
            artistImage.setAttribute("src", response.thumb_url);

     });

    $.ajax({
      url: queryEventUrl,
      method: "GET",
      error: function () {
        noArtistFound.show();
        aritstInfo.hide();

      },
      success: function(){
        noArtistFound.hide();
        aritstInfo.show();


        if(!response.length) {
          noEvents.show();
          eventTable.hide();

        } else {
          eventTable.show();
          noEvents.hide();
          eventInfo.empty();

          //Looping through response object

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


}