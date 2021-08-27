//

// function initMap() {
//   const options = {
//     zoom: 12,
//     center: { lat: 49.259660, lng: -123.107220 },
//   };
//   map = new google.maps.Map($('#map').get(0), options);
// }
let map;
let markers;
$(document).ready(() => {


  const createMapItem = (map) => {

    const mapTemplate =
    `<section class="items">
    <div class="map-link">
    <input type="submit" value="${map.title}" class="point-btn" id="${map.id}"></input>
    <span class="favourite"><i id="${map.id}" class="far fa-heart fa-lg"></i></span>
    </div>
    </section>
    `;
    return mapTemplate;
  };



  const renderMaps = (data) => {
    //console.log("*****************data line 29", data);
    emptyContainer();
    const $header = header("Browse Maps");
    $('#side-bar').append($header);
    for (const map of data) {
      const $map = createMapItem(map);
      $('#side-bar').append($map);
    }
    const $pointBtn = $('.point-btn');
    //console.log($pointBtn);
    $pointBtn.click((e) => {
      e.preventDefault();
      //console.log(e.target.value);
      $.get(`maps/${e.target.id}/points`)
      .then((points) => {
        //console.log("---------",points);
        renderPoints($, points);
      });
    });
  };

  const loadMaps = () => {
    $.get('/maps', (res) => {
      //console.log("**********res.maps*****",res.maps);
      renderMaps(res.maps);
    });
  };

  const $logo = $('#logo');
  $logo.click(() => {
    $(() => {
    //   const options = {
    //     zoom: 12,
    //     center: { lat: 49.259660, lng: -123.107220 },
    //   };
    //   map = new google.maps.Map($('#map').get(0), options);
    });
    loadMaps();
  });

  getPoints('.items')
  loadMaps();




//});


//************************google maps */
  function initMap(arr) {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: { lat: 49.25922, lng: -123.09233 },
    });

    const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const markers = arr.map((location, i) => {
      return new google.maps.Marker({
        position: location,
        label: labels[i % labels.length],

      });
    });
    // Add a marker clusterer to manage the markers.
    new MarkerClusterer(map, markers, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });

  }
  //const locations = arr;

  const renderPoints = ($, points) => {
    let arr=[];
    //console.log("-------------------///", maps.maps[0].latitude);
    const $container = $('#maps');
    //console.log($container, $, $);
    $container.empty();
    for (const point of points) {
      //console.log("Latitude:",point.latitude);
        //console.log(point);
        //const $point = createPointElement($, point);
        //$container.append($point);
        arr.push({lat: Number(point.latitude), lng: Number(point.longitude)}) //= {lat:point.latitude, lng: point.longitude}
        //console.log("****************arr",point.latitude , Number(point.longitude));

    }
    initMap(arr);
  };

  const loadP = ($) => {

    $.get(`maps/${1}/points`)
      .then((points) => {
        renderPoints($, points);
      });
  };

    loadP($);
});


