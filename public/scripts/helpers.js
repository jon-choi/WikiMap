const emptyContainer = () => {
  $('#side-bar').empty();
};

const header = (title) => {
  const headerTemplate = `<h3 class="maps-list">${title}</h3>`;
  return headerTemplate;
};

const createMarkers = (markers) => {
  for (const coords of markers) {
    let contentString = '`<h1>place</h1><img src="https://upload.wikimedia.org/wikipedia/en/7/70/Bob_at_Easel.jpg">`';
    let latLng = new google.maps.LatLng(coords[0], coords[1]);
    let marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    let infoWindow = new google.maps.InfoWindow({
      content: contentString,
      minWidth: 300,
      maxWidth: 300
    });
    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });
  }
}

const loadPoints = (id) => {
  $.get(`/maps/${id}/points`, (res) => {
    for (const latlong of res.maps) {
      markers.push([latlong.latitude, latlong.longitude]);
    }
  });
};

const getPoints = (target) => {
  const $getpoint = $(target);
  $getpoint.on('click', 'button', function(event) {
    markers = [];
    loadPoints(event.target.id);
    setTimeout(() => {
      $(() => {
        const options = {
          zoom: 12,
          center: { lat: 49.259660, lng: -123.107220 },
        };
        map = new google.maps.Map($('#map').get(0), options);
        createMarkers(markers);
      });
    }, 100);
  });
};
