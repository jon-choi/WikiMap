/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const updatePoint = function($, point, data){
  console.log(data);
}

const deletePoint = function($, point){
   const $point = $(`#${point.id}`);
   $point.remove();
}

const createPointElement = function ($, point) {
  //const $pointTitle = $('<h2>').text(`Point Title: ${point.title}`);
  //const $description = $('<h2>').text(`Description: ${point.description}`);
  const $point = $('<div>').addClass('point').attr("id", point.id);

  const $updateForm = $(`

    <form>
    <article class="articleTweet">
      <label><span class="bold">Title:</span></label>
      <input name="pointTitle" class="textareaTweet" value="${point.title}" />

      <label><span class="bold">Description:</span></label>
      <input name="description" class="textareaTweet" value="${point.description}" />

      <label  for="tweet-text"><span class="bold">Image</span></label>
      <input name="image"  class="textareaTweet" value="${point.image}">

      <label  for="tweet-text"><span class="bold">Latitude</span></label>
      <input name="latitude"  class="textareaTweet"  value="${point.latitude}">

      <label  for="tweet-text"><span class="bold">Longitude</span></label>
      <input name="longitude"  class="textareaTweet"  value="${point.longitude}">
      <br/>
      <div class="actButtons">
      <button type="submit">Update!</button>

      </div>
    </article>
    </form>
  `);

  $updateForm.on('submit', (event) => {
    event.preventDefault();
    const serialized = $updateForm.serialize();
    //console.log("----------------serialized:",serialized);

    $.ajax({
      type: "PATCH",
      url: `/points/${point.id}`,
      data: serialized
    })
      .then(() => {
        updatePoint($, point, serialized);
      });
  });

  const $deleteButton = $('<button>').text('Delete!!');
  $deleteButton.on('click', () => {
    $.post(`/points/${point.id}/delete`)
      .then(() => {
        deletePoint($);
        //loadPoints($)
      });
  });
  let $actButtons = $updateForm.find('.actButtons')
  $actButtons.append($deleteButton);
  $point.append( $updateForm );
  return $point;
};





function initMap(arr) {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: { lat: 49.25922, lng: -123.09233 },
  });
  // Create an array of alphabetical characters used to label the markers.
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // Add some markers to the map.
  // Note: The code uses the JavaScript Array.prototype.map() method to
  // create an array of markers based on a given "locations" array.
  // The map() method here has nothing to do with the Google Maps API.
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
  console.log("-------------------///",points[0].map_id);
  const $container = $('#points-container');
  console.log($container, $, $);
  $container.empty();
  for (const point of points) {
    console.log("Latitude:",point.latitude);
      const $point = createPointElement($, point);
      $container.append($point);
      arr.push({lat: point.latitude, lng: point.longitude}) //= {lat:point.latitude, lng: point.longitude}
      console.log("****************arr",arr);
      initMap(arr);
  }
};

const loadPoints = ($) => {

  $.get('/points')
    .then((points) => {
      console.log("==============",points);
      renderPoints($, points);
    });
};

//$(document).ready(function ($) {


  const $form = $("#point-submit-form");
  $form.hide();
  //console.log($form);
  $form.on('submit', (event) => {
    event.preventDefault();
    const serialized = $form.serialize();
    console.log("serialized:",serialized);

    $.ajax({
      type: "POST",
      url: `/points`,
      data: serialized
    })
      .then(() => {
        loadPoints($);
      });
  });
//});
  //loadPoints($);

  // const $newPointForm = $('#submit-form');
  // $newPointForm.on('submit', function (event) {
  //   event.preventDefault();
  //   const serialized = $(this).serialize();
  //   // const serialized = $newProductForm.serialize();
  //   console.log(serialized);

  //   // 200 to <400 .then
  //   // >= 400 .catch
  //   $.post('/points', serialized)
  //     .then(() => {
  //       window.location = '/';
  //     })
  //     .catch(() => {
  //       window.location = '/error-page';
  //     });
  // });

// });
//   // Loads tweets from - tweets Json data*******************************************
//   // const fetchPoints = function () {
//   //   $.ajax({
//   //     url: '/points',
//   //     method: 'GET',
//   //     dataType: 'json',
//   //     success: (tweets) => {
//   //       renderPoints(tweets);
//   //     },
//   //     error: (err) => {

//   //       console.err(err);
//   //     }
//   //   })
//   // };

//   const renderPoints = function(points) {

//   const form =
//   `<form id="submit-form">
//     <label  for="tweet-text"><span class="bold">Title</span></label>
//     <input name="pointTitle"  class="textareaTweet">
//       <label  for="tweet-text"><span class="bold">Description</span></label>
//       <textarea name="description"  class="textareaTweet"></textarea>
//       <div class="buttonCounter">
//         <button class="tweetButton" type="submit">new Point</button>
//       </div>
//   </form>`

//   const $updateForm = $(`
//     <form>
//       <label>New Product Name:</label>
//       <input name="pointTitle" value="${pointData.title}" />
//       <br/>
//       <label>New Price:</label>
//       <input name="description" value="${pointData.description}" />
//       <br/>
//       <button type="submit">Update!</button>
//     </form>
//   `);

//   $updateForm.on('submit', (event) => {
//     event.preventDefault();
//     const serialized = $updateForm.serialize();
//     console.log(serialized);

//     $.ajax({
//       type: "PATCH",
//       url: `/points/${pointData.id}`,
//       data: serialized
//     })
//       .then(() => {
//         fetchPoints();
//       });
//   });

//   const $deleteButton = $('<button>').text('Delete!!');
//   $deleteButton.on('click', () => {
//     $.post(`/api/products/${product.id}/delete`)
//       .then(() => {
//         fetchPoints();
//       });
//   });

//      // Select element from the DOM by id or class (CSS)
//     const $pointsContainer = $('#wikimap-container');
//     $pointsContainer.empty();

//     $container.append(form);

//     for (const point of points) {
//       //iterate from newest to oldestprepend to reverse our data (prepend)
//       $pointsContainer.append(createPointElement(point));

//     }
//   };

//   // help function to avoid tweet with malicious code like alert();
//   const escape = function (str) {
//     let div = document.createElement("div");
//     div.appendChild(document.createTextNode(str));
//     return div.innerHTML;
//   };

//   // const createPointElement = function(pointData) {
//   //   const $newPoint = $(`

//   //     <article class="articleTweet">

//   //       <header class="articleTweetHeader">
//   //         <div class="picName">

//   //           <p>${pointData.title}</p>
//   //           <br/>
//   //           <p>${pointData.description}</p>

//   //           <i class="fas fa-heart"></i>
//   //         </div>
//   //           <a></a>
//   //       </header>

//   //       <div class="content">
//   //         <p></p>
//   //       </div>

//   //       <footer class="articleTweetFooter">
//   //         <p> </p>
//   //         <div>

//   //         </div>
//   //       </footer>

//   //     </article>
//   //   `);

//   //   return $newPoint;
//   // };

//   fetchPoints();
//   // submit tweet when enter button is pressed
//   const $newPointForm = $('#submit-form');
//   $newPointForm.on('submit', function (event) {
//     event.preventDefault();
//     const serialized = $(this).serialize();
//     console.log(serialized);

//     $.post('/points', serialized)
//       .then(() => {
//         fetchPoints();
//       })

//     //$('#tweet-text').val('');

//   });
//   // $('#submit-form').submit(function(event) {

//   //   // prevent the default behaviour of the submit event (data submission and page refresh)
//   //   event.preventDefault();
//   //   //const text = $('#tweet-text').val();
//   //   //var message = $('#messageInput').val();
//   //   $('#alertMsg').hide("slow");

//   //   // if ($('#tweet-text').val().length === 0) {
//   //   //   $('#alertMsg').show("slow").text("⚠️   Please, write something   ⚠️");
//   //   //    return false;
//   //   // }

//   //   //this represent form - serialize convert obj in string
//   //   const $serializeData = $(this).serialize();
//   //   //Create a new tweet and call fetchPoint to render new point
//   //   $.post('/points', $serializeData, (response) => {
//   //     fetchPoints();
//   //     $('#tweet-text').val('');
//   //   });

//  // });

// // }); *******************************************








// // /*
// //  * Client-side JS logic goes here
// //  * jQuery is already loaded
// //  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
// //  */

// // $(document).ready(function() {

// //   // Loads tweets from - tweets Json data
// //   const fetchTweets = function () {
// //     $.ajax({
// //       url: '/points',
// //       method: 'GET',
// //       dataType: 'json',
// //       success: (tweets) => {
// //         renderTweets(tweets);
// //         console.log("-------------json",tweets);
// //       },
// //       error: (err) => {
// //         console.log("--------error--------");
// //         console.err(err);
// //       }
// //     })
// //   };

// //   const renderTweets = function(users) {
// //     console.log("***********users",users);
// //   //    const $newTweet = $(`
// //   //   <form id="submit-form">
// //   //     <label  for="tweet-text"><span class="bold"> New Point</span></label>
// //   //     <textarea name="text" id="tweet-text" class="textareaTweet"></textarea>
// //   //     <div class="buttonCounter">
// //   //       <button class="tweetButton" type="submit">Tweet</button>
// //   //       <output name="counter" class="counter" for="tweet-text">140</output>
// //   //     </div>
// //   //   </form>
// //   //  `);
// //   // return $newTweet;


// //      // Select element from the DOM by id or class (CSS)
// //     const $tweetsContainer = $('#tweets-container');
// //     for (const user of users) {
// //       //iterate from newest to oldestprepend to reverse our data (prepend)
// //       $tweetsContainer.prepend(createTweetElement(user));
// //       console.log(">>>>>>>>>>>>>>>user",user);
// //     }
// //   };

// //   // help function to avoid tweet with malicious code like alert();
// //   const escape = function (str) {
// //     let div = document.createElement("div");
// //     div.appendChild(document.createTextNode(str));
// //     return div.innerHTML;
// //   };

// //   // const createTweetElement = function(tweetData) {
// //   //   const $newTweet = $(`
// //   //     <form id="submit-form">
// //   //       <label  for="tweet-text"><span class="bold"> New Point</span></label>
// //   //       <textarea name="text" id="tweet-text" class="textareaTweet"></textarea>
// //   //       <div class="buttonCounter">
// //   //         <button class="tweetButton" type="submit">Tweet</button>
// //   //         <output name="counter" class="counter" for="tweet-text">140</output>
// //   //       </div>
// //   //     </form>
// //   //   `);
// //   //   return $newTweet;
// //   // };

// //   const createTweetElement = function(tweetData) {
// //     const $newTweet = $(`

// //       <article class="articleTweet">

// //         <header class="articleTweetHeader">
// //           <div class="picName">

// //             <p>${tweetData.title}</p>
// //           </div>
// //             <a></a>
// //         </header>

// //         <div class="content">
// //           <p></p>
// //         </div>

// //         <footer class="articleTweetFooter">
// //           <p> </p>
// //           <div>
// //             <i class="fas fa-heart"></i>
// //           </div>
// //         </footer>

// //       </article>
// //     `);

// //     return $newTweet;
// //   };

// //   fetchTweets();
// //   // submit tweet when enter button is pressed
// //   $('#submit-form').submit(function(event) {

// //     // prevent the default behaviour of the submit event (data submission and page refresh)
// //     event.preventDefault();
// //     const text = $('#tweet-text').val();
// //     var message = $('#messageInput').val();
// //     $('#alertMsg').hide("slow");

// //     if ($('#tweet-text').val().length === 0) {
// //       $('#alertMsg').show("slow").text("⚠️   Please, write something   ⚠️");
// //        return false;
// //     }

// //     //this represent form - serialize convert obj in string
// //     const $serializeData = $(this).serialize();
// //     //Create a new tweet and call fetchTweet to render new tweet
// //     $.post('/points', $serializeData, (response) => {
// //       fetchTweets();
// //       $('#tweet-text').val('');
// //     });

// //   });

// // });
