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

  const createPointForm = () => {
    const pointTemplate =
      (`<form id="map-points">
      <div id="point1">
      <h2>Point one</h2>
        <input type="text" id="title" placeholder="title">
        <input type="text" id="description" placeholder="description">
        <input type="url" id="img-url" placeholder="imgURL">
        <span class="lat-long"><input type="text" class="lat" placeholder="latitude">
        <input type="text" class="long" placeholder="longitude"></span>
      </div>
      <div id="point2">
      <h2>Point two</h2>
        <input type="text" id="title" placeholder="title">
        <input type="text" id="description" placeholder="description">
        <input type="url" id="img-url" placeholder="imgURL">
        <span class="lat-long"><input type="text" class="lat" placeholder="latitude">
        <input type="text" class="long" placeholder="longitude"></span>
      </div>
      <div id="point3">
      <h2>Point three</h2>
        <input type="text" id="title" placeholder="title">
        <input type="text" id="description" placeholder="description">
        <input type="url" id="img-url" placeholder="imgURL">
        <span class="lat-long"><input type="text" class="lat" placeholder="latitude">
        <input type="text" class="long" placeholder="longitude"></span>
      </div>
      <span class="add"> <i class="fas fa-plus-circle fa-lg"></i> Add New Points </span>
      <button type="submit" id="point-submit">Submit</button>
    </form>
      `);
      return pointTemplate;
  };
  //
  const createEditForm = (data) => {
    const editForm =
      `<form id="edit-points">
      <div id="edit-point1">
      <h2>Point one</h2>
        <input type="text" id="title" placeholder="title" value="${data.maps[0]?.title}">
        <input type="text" id="description" placeholder="description" value="${data.maps[0]?.description}">
        <input type="url" id="image" placeholder="imgURL" value="${data.maps[0]?.image}">
        <button type="submit" id="edit-submit-1">Edit</button>
      </div>
      <div id="edit-point2">
      <h2>Point two</h2>
        <input type="text" id="title" placeholder="title" value="${data.maps[1]?.title}">
        <input type="text" id="description" placeholder="description" value="${data.maps[1]?.description}">
        <input type="url" id="image" placeholder="imgURL" value="${data.maps[1]?.image}">
        <button type="submit" id="edit-submit-2">Edit</button>
      </div>
      <div id="edit-point3">
      <h2>Point three</h2>
        <input type="text" id="title" placeholder="title" value="${data.maps[2]?.title}">
        <input type="text" id="description" placeholder="description" value="${data.maps[2]?.description}">
        <input type="url" id="image" placeholder="imgURL" value="${data.maps[2]?.image}">
        <button type="submit" id="edit-submit-3">Edit</button>
      </div>
    </form>
      `;
    return editForm;
  };

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
      });

    emptyContainer();
    const $sideBarForm = createPointForm();
    $sideBar.append($sideBarForm);
  });

  const createMapItem = (map) => {
    const mapTemplate =
      `<section class="items">
    <div class="map-link">
    <button type="submit" class="point-btn" id="${map.id}">${map.title}</button>
    <span class="edit-delete">
    <span id="${map.id}" class="edit"> <i class="fas fa-edit fa-lg"> </i></span>
    <span id="${map.id}" class="delete"><i class="fas fa-trash fa-lg"></i> </span>
    </span>
    </div>
    </section>
    `;
    return mapTemplate;
  };

  const renderUsersMaps = (data) => {
    emptyContainer();
    const $header = header("My Maps");
    $('#side-bar').append($header);
    for (const user of data) {
      const $map = createMapItem(user);
      $('#side-bar').append($map);
    }
  };

  const loadUserMaps = (id) => {
    $.get(`/users/${id}`, (res) => {
      renderUsersMaps(res.users);
    });
  };

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

  // GET request to edit points
  const $edit = $('#side-bar');
  $edit.on('click', '.edit', (event) => {
    $.get(`/maps/${event.currentTarget.id}/points`, (res) => {
      editButton.push(event.currentTarget.id);
      const points = res;
      emptyContainer();
      const editForm = createEditForm(points);
      $('#side-bar').append(editForm);
    })
  });

  // hardcoded user - not changing lat-long yet
  $edit.on('click', 'edit-submit-1', (event) => {
    preventDefault();
    const title1 = event.target.form[0].value;
    console.log(event.target.form[0].value)
    const description1 = event.target.form[1].value;
    const imgurl1 = event.target.form[2].value;
    $.patch(`/maps/${editButton[0]}/edit`, {
      title: title1,
      description: description1,
      image: imgurl1,
      latitude: 49.259660,
      longitude: -123.107220,
      id: 1
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

  // Hardcoded user***
  $sideBar.on('click', '#point-submit', function(event) {
    event.preventDefault();
    const title1 = event.target.form[0].value;
    const description1 = event.target.form[1].value;
    const imgurl1 = event.target.form[2].value;
    const title2 = event.target.form[5].value;
    const description2 = event.target.form[6].value;
    const imgurl2 = event.target.form[7].value;
    const title3 = event.target.form[10].value;
    const description3 = event.target.form[11].value;
    const imgurl3 = event.target.form[12].value;
    $.ajax(`/users/1/favourites`, {
      points: JSON.stringify([
        {
          title: title1,
          description: description1,
          image_url: imgurl1,
          latitude: 49.282897,
          longitude: -123.120386
        },
        {
          title: title2,
          description: description2,
          image_url: imgurl2,
          latitude: 49.251970,
          longitude: -123.067680
        },
        {
          title: title3,
          description: description3,
          image_url: imgurl3,
          latitude: 49.263910,
          longitude: -123.098690
        }
      ])
    });
    loadUserMaps(1);
  });

  getPoints('#side-bar')

});
