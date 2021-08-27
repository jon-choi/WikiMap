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
        <button id="submit-btn" type="submit">Next</button>
        </form>
      `;
    return formTemplate;
  };

  const createPointForm = (map_id) => {
    const pointTemplate = $(`
      <form id="map-points">
      <div id="point1">
      <h2>Point one</h2>
        <input name="title" type="text" id="title" placeholder="title">
        <input name="description" type="text" id="description" placeholder="description">
        <input name="image" type="url" id="img-url" placeholder="imgURL">
        <span class="lat-long"><input name="latitude" type="text" class="lat" placeholder="latitude">
        <input name="longitude" type="text" class="long" placeholder="longitude"></span>
      </div>
      <button type="submit" id="point-submit">Submit</button>
    </form>
      `); console.log(pointTemplate);
      console.log(map_id);
      pointTemplate.submit((event) => {
        event.preventDefault();
        console.log('form has submitted')
        const data = pointTemplate.serialize();
        console.log(data)
        $.ajax({url: `/maps/${map_id}`, method: 'put', data})
        .then((result) => {
          console.log(result);
        })

      });
      return pointTemplate;
  };

  //
  const createEditForm = (data) => {
    const editForm =
      `<form id="edit-points">
        <div id="edit-point1">
        <h2>Point one</h2>
          <input name="title" type="text" id="title" placeholder="title" value="${data.title}">
          <input name="description" type="text" id="description" placeholder="description" value="${data.description}">
          <input name="url" type="url" id="image" placeholder="imgURL" value="${data.image}">
          <input name="latitude" type="text" id="latitude" placeholder="imgURL" value="${data.latitude}">
          <input name="longitude" type="text" id="longitude" placeholder="imgURL" value="${data.longitude}">
          <button type="submit" id="edit-submit-1">Edit</button>
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
        <button type="submit" class="point-btn" id="${map.id}">${map.title}</button>
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
          <span class="edit-delete">
          <span id="${point.id}" class="edit"> <i class="fas fa-user-edit fa-lg"></i></span>
          <span id="${point.id}" class="delete"><i class="fas fa-trash-alt fa-lg"></i></span>

        </div>
      </section>
      `;
    return pointList;
  };

  const renderPoints = (data) => {
    emptyContainer();
    const $header = header("My points");
    $('#side-bar').append($header);
    for (const point of data) {
      const $point = createPointList(point);
      $('#side-bar').append($point);
    }
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



  const loadUserMaps = (id) => {
    $.get(`/users/${id}`, (res) => {
      renderUsersMaps(res.users);
    });
  };



  // //get all the points for one map

  // const renderUsersMaps = (data) => {
  //   emptyContainer();
  //   const $header = header("My Maps");
  //   $('#side-bar').append($header);
  //   for (const user of data) {
  //     const $map = createMapItem(user);
  //     $('#side-bar').append($map);
  //   }
  // };

  // const loadUserMaps = (id) => {
  //   $.get(`/users/${id}`, (res) => {
  //     renderUsersMaps(res.users);
  //   });
  // };




  // function to edit points
  $.patch = function(url, data, callback, type) {
    if ($.isFunction(data)) {
      type = type || callback,
        callback = data,
        data = {}
    }
    return $.ajax({
      url: url,
      type: 'PATCH',
      success: callback,
      data: data,
      contentType: type
    });
  }

  // const $pointBtn = $('.edit');
  // //console.log($pointBtn);
  // $pointBtn.click((e) => {
  //   e.preventDefault();
  //   //console.log(e.target.value);
  //   $.get(`maps/${e.target.id}/points`)
  //   .then((points) => {
  //     console.log("-----hereee----",points);
  //     renderPoints($, points);
  //   });
  // });


  //GET to show points per map
  const $edit = $('#side-bar');
  $edit.on('click', '.edit', (event) => {
    $.get(`/maps/${event.currentTarget.id}/points`, (res) => {
      editButton.push(event.currentTarget.id);
      const points = res;
      emptyContainer();
      const editForm = renderPoints(points);
      $('#side-bar').append(editForm);
    })
  });

  //GET request to edit specific point
  const $editPoint = $('#side-bar');
  $editPoint.on('click', '.editPoint', (event) => {
    $.get(`/maps/${event.currentTarget.id}/point`, (res) => {
       editButton.push(event.currentTarget.id);
       const point = res;
       console.log("----------here-------",point);
       emptyContainer();
      const editForm = createEditForm(point);
      $('#side-bar').append(editForm);
    })
  });

  // hardcoded user - not changing lat-long yet
  $edit.on('submit', (event) => {
    event.preventDefault();
    const serialized = $edit.serialize();
    console.log("--------tt-----",editButton[0]);
    $.ajax({
    type: "PATCH",
    url: `/${editButton[0]}`,
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
