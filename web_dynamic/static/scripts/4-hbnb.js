$(document).ready(function () {
  const HOST = 'http://0.0.0.0:5001';
  const amenities = {};

  $('li input[type=checkbox]').change(function () {
    if (this.checked) {
      amenities[this.dataset.name] = this.dataset.id;
    } else {
      delete amenities[this.dataset.name];
    }
    $('.amenities h4').text(Object.keys(amenities).sort().join(', '));
  });

  // Get status of API
  $.getJSON(`${HOST}/api/v1/status/`, (data) => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  // Fetch data about places
  $.post({
    url: `${HOST}/api/v1/places_search`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify({}),
    dataType: 'json',
    success: function (data) {
      $(data).each(function (index, place) {
        $('section.places').append(
          `<article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${
                place.max_guest !== 1 ? 's' : ''
              }</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${
                place.number_rooms !== 1 ? 's' : ''
              }</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${
                place.number_bathrooms !== 1 ? 's' : ''
              }</div>
            </div> 
            <div class="description">
              ${place.description}
            </div>
          </article>`
        );
      });
    },
  });

  // Search places
  $('.filters button').on('click', searchPlace);
  searchPlace();
});
