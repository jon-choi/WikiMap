const emptyContainer = () => {
  $('#side-bar').empty();
};

const header = (title) => {
  const headerTemplate = `<h3 class="maps-list">${title}</h3>`;
  return headerTemplate;
};

// const createMarkers = (markers) => {
//   for (const coords of markers) {
//     let contentString = '`<h1>place</h1><img src="https://upload.wikimedia.org/wikipedia/en/7/70/Bob_at_Easel.jpg">`';
//     let latLng = new google.maps.LatLng(coords[0], coords[1]);
//     let marker = new google.maps.Marker({
//       position: latLng,
//       map: map,
//       icon: coords.image,
//     });
//     let infoWindow = new google.maps.InfoWindow({
//       content: contentString,
//       minWidth: 500,
//       maxWidth: 500
//     });
//     marker.addListener('click', function() {
//       infoWindow.open(map, marker);
//     });
//   }
// }
// function initMap() {

//   const vancouver = { lat: 49.25922, lng: -123.09233 };
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 12,
//     center: vancouver,
//   });
//   var contentString = '`<h1>place</h1><img src="https://upload.wikimedia.org/wikipedia/en/7/70/Bob_at_Easel.jpg">`';

//   var infowindow = new google.maps.InfoWindow({
//     content: contentString
//   });

//   var marker = new google.maps.Marker({
//     position: vancouver,
//     map: map,
//     title: 'whatever'
//   });
//  marker.addListener('click', function() {
//     infowindow.open(map, marker);
//  });
// }



const loadPoints = (id) => {
  $.ajax(`/maps/${id}/points`, (res) => {
    for (const latlong of res.maps) {
      markers.push([latlong.latitude, latlong.longitude]);
    }
  });
};

const getPoints = (target) => {
  const $getpoint = $(target);
  $getpoint.on('click', 'button', function(event) {
    markers = [];
    $(event.target.id);
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


