import Marker from './marker';

class Places {
  constructor() {
    this.markers = [];
    this.places = [];
    this.infowindow = new google.maps.InfoWindow();
    this.search = this.search.bind(this);
    this.clearResults = this.clearResults.bind(this);
    this.clearMarkers = this.clearMarkers.bind(this);
    this.setMapOnAll = this.setMapOnAll.bind(this);
    this.callback = this.callback.bind(this);
    this.showMarkers = this.showMarkers.bind(this);
    this.showResults = this.showResults.bind(this);
    this.findMarker = this.findMarker.bind(this);
    this.setListener = this.setListener.bind(this);
  }

search(inputText) {
  let service;
  this.clearResults();
  this.clearMarkers();
  let starting = new google.maps.LatLng(37.78,-122.45);
  let request = {
     location: starting,
     radius: '200',
     query: `${inputText}`
  };
  service = new google.maps.places.PlacesService(window.map);
  service.textSearch(request, this.callback);
}

clearResults() {
  this.places = [];
  let searchResults = document.getElementById('results');
  searchResults.innerHTML = "";
}

clearMarkers() {
  this.setMapOnAll(null);
  this.markers = [];
}

setMapOnAll(map) {
  for (var i = 0; i < this.markers.length; i++) {
    this.markers[i].setMap(map);
  }
}

callback(results, status) {
  let bounds = new google.maps.LatLngBounds();
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      let place = results[i];
      this.places.push(place);
      let marker = new Marker(place, i, this.infowindow);
      marker = marker.createMarker();
      this.markers.push(marker);
      bounds.extend(place.geometry.location);
    }
  }
  window.map.fitBounds(bounds);
  this.showMarkers();
  this.showResults();
  this.setListener();
}

showMarkers() {
  this.setMapOnAll(window.map);
}

 showResults() {
   let searchResults = document.getElementById('results');
   searchResults.innerHTML = "";
   let rating = "";
   for (var i = 0; i < this.places.length; i++) {
     let place = this.places[i];
     rating = place.rating ? place.rating : 0;
     let stars = ""
     for (var j = 0; j < rating; j++) {
       stars += "☆";
     }
     let address = place.formatted_address.replace(", United States", "");
     let open = place.opening_hours && place.opening_hours.open_now === true ? "Open Now" : "Closed";
     searchResults.innerHTML += '<div class="eachResult" id= ' + i + '>' +
     '<div id="name">' + place.name +'</div>' +
     '<div id= "addr">' + address +'</div>' +
     '<div id ="rating">' + stars + '</div>' +
     '<div id ="open">' + open + '</div> </div>'
   }
 }

 setListener(){
   let results = document.querySelectorAll(".eachResult");

   for (let j = 0; j < results.length; j++) {
     results[j].addEventListener("mouseover", (e) => {
       let mark = this.findMarker(e);
       this.infowindow.setContent(mark.title);
       this.infowindow.open(window.map, mark);
     });
   }
 }

 findMarker(e) {
   let mark;
   this.markers.forEach(marker => {
     if(marker.index == e.currentTarget.id) {
       mark = marker;
     }
   });
   return mark;
 }

 }

 module.exports = Places;
