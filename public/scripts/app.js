let map;

function initMap() {
  const options = {
    zoom: 12,
    center: { lat: 49.259660, lng: -123.107220 },
  };
  map = new google.maps.Map($('#map').get(0), options);
}

$(document).ready(() => {

  let markers;

  const createMapItem = (map) => {

    const mapTemplate =
    `<section class="items">
    <div class="map-link">
    <button type="submit" class="point-btn" id="${map.id}">${map.title}</button>
    <span class="favourite"><i id="${map.id}" class="fas fa-heart fa-lg"></i></span>
    </div>
    </section>
    `;
    return mapTemplate;
  };

  const renderMaps = (data) => {
    emptyContainer();
    const $header = header("Browse Maps");
    $('#side-bar').append($header);
    for (const map of data) {
      const $map = createMapItem(map);
      $('#side-bar').append($map);
    }
  };

  const loadMaps = () => {
    $.get('/maps', (res) => {
      renderMaps(res.maps);
    });
  };

  const $logo = $('#logo');
  $logo.click(() => {
    $(() => {
      const options = {
        zoom: 12,
        center: { lat: 49.259660, lng: -123.107220 },
      };
      map = new google.maps.Map($('#map').get(0), options);
    });
    loadMaps();
  });

  getPoints('.items')
  loadMaps();

});
