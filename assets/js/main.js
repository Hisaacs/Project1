// $(document).ready(function() {

    // when document ready, hide most of the div and show some div
    $("#bandsintown, #recentSearch, #artist-navigation, .js-artist-bio, .js-no-events").hide();

    // when the search button executed, run searchBandsInTown function, show most of the div and hide some div
    $("#searchButton").on("click", function(event) {
      event.preventDefault();

      $("#bandsintown, #recentSearch, #artist-navigation").show();
      
      var artistInput = $("#search").val().trim();
      $("#feature-carousel").hide();
      
      $("#search").val("");
      
      searchBandsInTown(artistInput);
      spotifySearch(artistInput);
      populateSocial(artistInput);

      window.scrollTo(0, 0);
    });

    // when carousel clicked, go to that artist
    $('#carousel').click(function() {
      var artist = ($(this).attr("artistName"));
      $("#search").val(artist);
      $("#searchButton").click();
    });

    // when read more is clicked
    $('.js-read-more').click(function(e) {
      e.preventDefault();
      $(".js-artist-bio").slideToggle('fast');
    });

    // recent searches
    $(document).on("click", ".recentSearchButton, .artist", function() {
      var artist = ($(this).attr("artistName"));
      $("#search").val(artist);
      $("#searchButton").click();
      window.scrollTo(0, 0);
    });

    // Calls Carousel
    $('.carousel').carousel();

    // Calls Tooltip
    $(document).tooltip({
      selector: '[data-toggle="tooltip"]'
    });

    // Smooth Scroll
    $('.smooth-scroll').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          var navHeight = $("#site-header").height();
          var pos = target.offset();
              pos = pos.top - navHeight;
          $("html,body").animate( { scrollTop: pos },  800 ); return false;
        }
      }
    });

 