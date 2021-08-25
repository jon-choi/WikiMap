$(document).ready(() => {

  const $heart = $('#side-bar');
  $heart.on('click', `.favourite`, (event) => {
    $.post(`/users/1/favourites`, {
      map_id: `${event.target.id}`
    })
    $(`#side-bar .favourite #${event.target.id}`).css('color', 'red');
  });
});
