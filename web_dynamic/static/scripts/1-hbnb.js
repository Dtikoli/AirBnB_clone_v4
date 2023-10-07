$(document).ready(function () {
  const selectedAmenities = {};
  $('li input[type="checkbox"]').change(function () {
    if (this.checked) {
      selectedAmenities[this.dataset.name] = this.dataset.id;
    } else {
      delete selectedAmenities[this.dataset.name];
    }
    $('.amenities h4').text(Object.keys(selectedAmenities).sort().join(', '));
  });
});
