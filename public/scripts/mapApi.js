// const locations = [
// {name: 'Corduroy Pie Co', description: 'Best pizza in the city', lat: 49.25737, long: -123.12107, imgurl: 'https://tryhiddengems.com/wp-content/uploads/2017/11/cororoypiecompany3-1024x576.jpg'},
// {name: 'Viet House', description: 'Delicious pho', lat: 49.25552, long: -123.11345, imgurl: 'https://vancouverfoodster.com/wp-content/uploads/2018/01/IMG_1071-1-e1514840163771-225x300.jpg'},
// {name: 'Benkei Ramen', description: 'Amazing ramen', lat: 49.26347, long: -123.11656, imgurl: 'https://s3-media0.fl.yelpcdn.com/bphoto/0Sjl7KNQK1TccXqfYWrnzw/l.jpg'},

// {name: 'Pourhouse', description: 'Great cocktails', lat: 49.28467, long: -123.10821, imgurl: 'https://images.squarespace-cdn.com/content/v1/5db9f5cc0e8af224964d841a/1580246617574-Q908ORKB6YC2VZ1K0JED/DSCF8330.jpg?format=1500w'},
// {name: 'The Cascade Room', description: 'Crafted cocktails', lat: 49.26424, long: -123.09357, imgurl: 'https://i0.wp.com/media.scoutmagazine.ca/2018/03/11-Cascade.jpeg?resize=1600%2C1067&ssl=1'},
// {name: 'Grapes & Soda', description: 'Cocktails and Tapas', lat: 49.26740, long: -123.13935, imgurl: 'https://s3-media0.fl.yelpcdn.com/bphoto/wsMRvJZwyczcZMdhmuPNgA/l.jpg'},

// {name: 'JJ Bean', description: 'Best coffee', lat: 49.25591, long: -123.11548, imgurl: 'https://media.scoutmagazine.ca/2017/06/jj_main.jpg'},
// {name: 'Bean Around the World', description: 'Nice americanos', lat: 49.26303, long: -123.12236, imgurl: 'https://lh5.googleusercontent.com/p/AF1QipP0PAPrL28nH4Q-qwRCDFr8Hn9m_sag_RcOJk0h=w408-h306-k-no'},
// {name: 'Elysian Coffee', description: 'Good study spot', lat: 49.26738, long: -123.14257, imgurl: 'https://lh5.googleusercontent.com/p/AF1QipMSVtasrwZpp0HronBnzaqeDY1b3meljAJS08zu=w408-h306-k-no'},

// {name: 'Stanley Park', description: 'Coolest park', lat: 49.30434, long: -123.14428, imgurl: 'https://i0.wp.com/vancouversbestplaces.com/wp-content/uploads/2020/08/Stanley-Park-Lighthouse-by-On-the-Mark-Drone-Services.jpg?resize=640%2C353&ssl=1'},
// {name: 'Queen Elizabeth Park', description: 'Nice frisbee golf course', lat: 49.24171, long: -123.11272, imgurl: 'https://lh5.googleusercontent.com/p/AF1QipO8opQjxU1OfguLszbl0U2idGyoQ4E0TNkUBVp4=w408-h306-k-no'},
// {name: 'Trout Lake Park', description: 'Good spot for families', lat: 49.25765, long: -123.05846, imgurl: 'https://lh5.googleusercontent.com/p/AF1QipPbDHBJ29akkLjoF42OlE_V2Fm9rC9XRrwomHEr=w426-h240-k-no'},

// {name: 'Third Beach', description: 'Good spot in the park', lat: 49.30786, long: -123.15195, imgurl: 'https://lh5.googleusercontent.com/p/AF1QipM6OiOwWvpM7dgD-S5iqOBZRbdFmC2-xLf9p4Pj=w408-h306-k-no'},
// {name: 'Jericho Beach', description: 'Good beach volleyball', lat: 49.27628, long: -123.19353, imgurl: 'https://lh5.googleusercontent.com/p/AF1QipMuC2oADymMBV-GjNB0dlg35JAtLM1YwNEfjELL=w426-h240-k-no'},
// {name: 'Wreck Beach', description: 'Clothing opional', lat: 49.26709, long: -123.25911, imgurl: 'https://lh5.googleusercontent.com/p/AF1QipOZUHaafmHH2T3rXT4idkKFKFJ1t7HYSmpxcKTe=w408-h338-k-no'},

// {name: 'The Chief', description: 'Best hike in squamish', lat: 49.68328, long: -123.14423, imgurl: 'https://www.vancouvertrails.com/images/hikes-small/stawamus-chief.jpg'},
// {name: 'Grouse Grind', description: 'Amazing view at the top', lat: 49.37943, long: -123.08365, imgurl: 'https://lh5.googleusercontent.com/p/AF1QipNNTXts4hMfpbwWfkMzXH0T6MWOD_ykt28sS462=w408-h306-k-no'},
// {name: 'Howe Sound Crest Trail', description: 'Nice hike', lat: 49.40584, long: -123.20712, imgurl: 'https://lh5.googleusercontent.com/p/AF1QipPnFQZQGJAFKUxdTIgsh45-SlBCRhARslXv9ZFy=w408-h306-k-no'}
// ];

// function initGoogleMap(){

//   const infowindow = new google.maps.InfoWindow(); // Only one InfoWindow
//   const map = new google.maps.Map(document.getElementById('map-canvas'), {
//       zoom: 6,
//       center: new google.maps.LatLng(45, 15)
//   });

//   function placeMarker( loc ) {
//     const marker = new google.maps.Marker({
//       position : new google.maps.LatLng( loc.lat, loc.lng ),
//       map : map
//     });
//     google.maps.event.addListener(marker, 'click', function(){
//         infowindow.close(); // Close previously opened infowindow
//         infowindow.setContent(`<div id="infowindow">${loc.name}</div>`);
//         infowindow.open(map, marker);
//     });
//   }

//   // ITERATE ALL LOCATIONS. Pass every location to placeMarker
//   locations.forEach( placeMarker );

// }

// google.maps.event.addDomListener(window, 'load', initGoogleMap);
