/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {

  const loadMaps = () => {
    $.get('/maps')
      .then((maps) => {
        console.log(maps);
        renderMaps(maps);
      });
  };



  const createMapsElement = function (map) {

    const $allMaps = $(`
      <label  for="tweet-text"><span class="bold">${map.title}</span></label>
    `);

    $allMaps.on('submit', (event) => {
      event.preventDefault();
      const serialized = $allMaps.serialize();
      console.log(serialized);

      // $.ajax({
      //   type: "POST",
      //   url: '/maps',
      //   data: serialized
      // })
      //   .then(() => {
      //     loadMaps();
      //   });
    });


    //const $mapTitle = $('<h2>').text(`map Title: ${map.title}`);
    //const $description = $('<h2>').text(`Description: ${map.description}`);
    const $map = $('<div>').addClass('map');

    const $updateForm = $(`

      <form>
        <label><span class="bold">Title:</span></label>
        <input name="mapTitle" class="textareaTweet" value="${map.title}" />

        <label><span class="bold">Description:</span></label>
        <input name="description" class="textareaTweet" value="${map.description}" />

        <label  for="tweet-text"><span class="bold">Image</span></label>
        <input name="image"  class="textareaTweet" value="${map.image}">

        <label  for="tweet-text"><span class="bold">Latitude</span></label>
        <input name="latitude"  class="textareaTweet"  value="${map.latitude}">

        <label  for="tweet-text"><span class="bold">Longitude</span></label>
        <input name="longitude"  class="textareaTweet"  value="${map.longitude}">
        <br/>
        <button type="submit">Update!</button>

      </form>
    `);

    $updateForm.on('submit', (event) => {
      event.preventDefault();
      const serialized = $updateForm.serialize();
      console.log("----------------serialized:",serialized);

      $.ajax({
        type: "PATCH",
        url: `/maps/${map.id}`,
        data: serialized
      })
        .then(() => {
          loadMaps();
        });
    });

    const $deleteButton = $('<button>').text('Delete!!');
    $deleteButton.on('click', () => {
      $.post(`/maps/${map.id}/delete`)
        .then(() => {
          loadMaps();
        });
    });

    const $addPoint = $('<button>').text('Add Point');
    $addPoint.on('click', () => {
      $("#point-submit-form").show();
      $.get(`/maps/${map.id}`)
        .then((points) => {
          $("#wikimap-container").hide();
          renderPoints($, points);
        });
    });

    // const $addPoint = $('<button>').text('Edit Map');
    // $editMap.on('click', () => {
    //   $.get(`/maps/${map.id}`)
    //     .then(() => {
    //       loadMaps();
    //     });
    // });

    $map.append($allMaps, $addPoint);

    return $map;

  };



  const renderMaps = (maps) => {
    const $container = $('#wikimap-container');
    $container.empty(); // $container.html('');
    //$container.append($form);
    for (const map of maps) {
      const $map = createMapsElement(map);
      $container.append($map);
    }
  };

  loadMaps();

  const $newMapForm = $('#submit-form');
  $newMapForm.on('submit', function (event) {
    event.preventDefault();
    const serialized = $(this).serialize();
    // const serialized = $newProductForm.serialize();
    console.log(serialized);

    // 200 to <400 .then
    // >= 400 .catch
    $.post('/maps', serialized)
      .then(() => {
        window.location = '/';
      })
      .catch(() => {
        window.location = '/error-page';
      });
  });
});

