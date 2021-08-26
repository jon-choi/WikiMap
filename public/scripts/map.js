
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
        <input type="text" id="title" placeholder="title" value="${data.maps[0]?.title}">
        <input type="text" id="description" placeholder="description" value="${data.maps[0]?.description}">
        <input type="url" id="image" placeholder="imgURL" value="${data.maps[0]?.image}">
        <button type="submit" id="edit-submit-1">Edit</button>
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
});
