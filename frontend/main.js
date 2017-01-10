import Places from './places';

document.addEventListener('DOMContentLoaded', function() {
    window.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.78, lng: -122.45},
      zoom: 13,
      backgroundColor: 'hsla(0,0%,0%,0)'
    });

  let places = new Places;
  document.getElementById("enter").addEventListener("click", e => {
    let input = document.getElementById('input').value;
    places.search(input);
  });

  document.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
      let input = document.getElementById('input').value;
      places.search(input);
    }
  });
});
