
$(document).ready(() => {

  let mapId = [];
  let userId = [];
  let markers = [];
  let editButton = [];

  const createMapForm = () => {
    const formTemplate =
      `<form id="new-map">
        <h2>Create New Map</h2>
        <input type="text" id="new-map-title" placeholder="title">
        <input type="text" id="new-map-description" placeholder="description">
        <button id="submit-btn" type="submit">Add</button>
        </form>
      `;
    return formTemplate;
  };

  const createPointForm = (map_id) => {
    const pointTemplate = $(`
    <form id="map-points">
      <div id="point1">
      <h2>Create new point</h2>
        <input name="title" type="text" id="title" placeholder="title">
        <input name="description" type="text" id="description" placeholder="description">
        <input name="image" type="url" id="img-url" placeholder="imgURL">
        <input name="latitude" type="text" class="lat" placeholder="latitude">
        <input name="longitude" type="text" class="long" placeholder="longitude">
        <button type="submit" id="point-submit">Add</button>
      </div>
    </form>
    `);

      console.log(pointTemplate);
      console.log(map_id);
      pointTemplate.submit((event) => {
        event.preventDefault();
        console.log('form has submitted')
        const data = pointTemplate.serialize();
        console.log(data)
        $.ajax({url: `/maps/${map_id}`, method: 'put', data})
        .then((result) => {
          loadPoints(result.maps[0]?.map_id);
          //console.log("------------------res",result.maps[0]?.id);
        })

      });
      return pointTemplate;
  };

  //
  const createEditForm = (data) => {
    const editForm =
      `<form id="edit-points">
        <div id="edit-point1">
          <h4>Point</h4>
          <input name="title" type="text" id="title" placeholder="title" value="${data.title}">
          <input name="description" type="text" id="description" placeholder="description" value="${data.description}">
          <input name="url" type="url" id="image" placeholder="imgURL" value="${data.image}">
          <input name="latitude" type="text" id="latitude" placeholder="imgURL" value="${data.latitude}">
          <input name="longitude" type="text" id="longitude" placeholder="imgURL" value="${data.longitude}">
          <button type="submit" class="edit-submit-1" id="${data.id}">Edit</button>
        </div>
      </form>
      `;
    return editForm;
  };//${maps[0]?.title}


  const $create = $('#create');
  $create.on('click', () => {
    emptyContainer();
    const $sideBar = createMapForm();
    $('#side-bar').append($sideBar);
    $(() => {
      const options = {
        zoom: 12,
        center: { lat: 49.259660, lng: -123.107220 },
      };
      map = new google.maps.Map($('#map').get(0), options);
    });
  });

  // SUBMIT FORM FOR NEW MAP
  const $sideBar = $('#side-bar');
  $sideBar.on('click', '#submit-btn', function(event) {
    event.preventDefault();
    const title = event.target.form[0].value;
    const description = event.target.form[1].value;
    $.post('/maps', {
      user_id: 1,
      title: title,
      description: description
    })
      .done(function(data) {
        mapId.push(data.maps.id);
        userId.push(data.maps.user_id);
        emptyContainer();
        const $sideBarForm = createPointForm(data.maps.id);
        $sideBar.append($sideBarForm);
      });


  });

  const createMapItem = (map) => {
    const mapTemplate =
      `<section class="items">
        <div class="map-link">
        <input type="submit" value="${map.title}" class="point-btn" id="${map.id}" ></input>
        <span class="edit-delete">
        <span id="${map.id}" class="edit"> <i class="fas fa-user-edit fa-lg"> </i></span>
        <span id="${map.id}" class="delete"><i class="fas fa-trash-alt fa-lg"></i> </span>
        </span>
        </div>
      </section>
      `;
    return mapTemplate;
  };

  const createPointList = (point) => {
    const pointList =
      `<section class="items">
        <div class="map-link">
          <input type="submit" value="${point.title}" class="point-btn" id="${point.id}"></input>
          <span id="${point.id}" class="editPoint"> <i class="fas fa-user-edit fa-lg"> </i></span>
          <span id="${point.id}" class="deletePoint"><i class="fas fa-trash-alt fa-lg"></i> </span>
          <span class="map_id" id="${point.map_id}">
        </div>
      </section>
      `;
    return pointList;
  };

  const renderPointsList = (data) => {
    emptyContainer();
    const $header = header("My points");
    $('#side-bar').append($header);
    for (const point of data) {
      const $point = createPointList(point);
      $('#side-bar').append($point);
    }
    let map_id = data[0].map_id;
    $('#side-bar').append(`<button class="new-point" id="${map_id}" type='submit'>Add</button>`);
      // const $sideBarForm = createPointForm(data.maps.id);
      // $sideBar.append($sideBarForm);
      const $newPoint = $('.new-point');
      $newPoint.click((e) => {
        e.preventDefault();
        emptyContainer();
        const $sideBarForm = createPointForm(e.target.id);
        $sideBar.append($sideBarForm)
        //console.log("----rr-------", e.target.id);

      });
      //loadP(`${e.target.id}`);
  }

  const renderUsersMaps = (data) => {
    emptyContainer();
    const $header = header("My Maps");
    $('#side-bar').append($header);
    for (const user of data) {
      const $map = createMapItem(user);
      $('#side-bar').append($map);
    }
  }


  const loadPoints = (id) => {
    $.get(`/maps/${id}/points`, (res) => {
      }).then((points) => {
      //console.log("--------aqui",points);
      renderPointsList(points);
    });
  };

  const loadUserMaps = (id) => {
    $.get(`/users/${id}`, (res) => {
      renderUsersMaps(res.users);
    });
  };



  // // function to edit points
  // $.patch = function(url, data, callback, type) {
  //   if ($.isFunction(data)) {
  //     type = type || callback,
  //       callback = data,
  //       data = {}
  //   }
  //   return $.ajax({
  //     url: url,
  //     type: 'PATCH',
  //     success: callback,
  //     data: data,
  //     contentType: type
  //   });
  // }




  //Show points per map
  const $edit = $('#side-bar');
  $edit.on('click', '.edit', (event) => {
    $.get(`/maps/${event.currentTarget.id}/points`, (res) => {
      editButton.push(event.currentTarget.id);
      const points = res;
      emptyContainer();
      const editForm = renderPointsList(points);
      $('#side-bar').append(editForm)

    })
  });




  //GET request to edit specific point
  const $editPoint = $('#side-bar');
  $editPoint.on('click', '.editPoint', (event) => {
    $.get(`/maps/${event.currentTarget.id}/point`, (res) => {
       editButton.push(event.currentTarget.id);
       const point = res;
       //console.log("----------here-------",point);
       emptyContainer();
      const editForm = createEditForm(point);
      $('#side-bar').append(editForm);
    })
  });



  // hardcoded user - not changing lat-long yet
  $edit.on('submit', '.edit-submit-1', (event) => {
    event.preventDefault();
    const serialized = $edit.serialize();
    //console.log("-------$edit-----",$edit);
    $.ajax({
    type: "PATCH",
    url: `/maps/${event.currentTarget.id}`,
    data: serialized
  })
    .then(() => {
      console.log("doneeeeeeeee");
      //updatePoint($, point, serialized);
    });
  });


  // creates ajax delete function
  $.delete = function(url, data, callback, type) {
    if ($.isFunction(data)) {
      type = type || callback,
        callback = data,
        data = {}
    }
    return $.ajax({
      url: url,
      type: 'DELETE',
      success: callback,
      data: data,
      contentType: type
    });
  }

  // Hardcoded user*** delete map
  const $delete = $('#side-bar');
  $delete.on('click', '.delete', (event) => {
    $.delete(`/maps/${event.currentTarget.id}/delete`, () => {
      loadUserMaps(1);
    });
  });


  const $deletePoint = $('#side-bar');
  $deletePoint.on('click', '.deletePoint', (event) => {
    $.delete(`/maps/${event.currentTarget.id}/deletePoint`, () => {
      //loadPoints(`${event.currentTarget.map_id}`);
    }).then(() => {
      loadPoints(1);
    });
  });



  // Hardcoded user***
  const $myMaps = $('#my-maps');
  $myMaps.click(() => {
    $(() => {
      const options = {
        zoom: 12,
        center: { lat: 49.259660, lng: -123.107220 },
      };
      map = new google.maps.Map($('#map').get(0), options);
    });
    loadUserMaps(1);
  });


});
