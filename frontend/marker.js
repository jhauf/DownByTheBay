class Marker {
  constructor(place, index, infowindow) {
    this.index = index;
    this.place = place;
    this.infowindow = infowindow;
    this.createMarker = this.createMarker.bind(this);
    this.addWindowListener = this.addWindowListener.bind(this);
    this.setWindow = this.setWindow.bind(this);
  }

  createMarker() {
   let image = {
      url: "./app/assets/images/pin.png",
      size: new google.maps.Size(35, 35),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 0),
      scaledSize: new google.maps.Size(35, 35)
    };

   let marker = new google.maps.Marker({
     map: window.map,
     position: this.place.geometry.location,
     icon: image,
     title: this.place.name,
     animation: google.maps.Animation.DROP,
     index: this.index
  });
    this.addWindowListener(marker);
    return marker;
  }

  setWindow(marker, e) {
    if (!marker.open) {
      this.infowindow.setContent(this.place.name);
      this.infowindow.open(window.map, marker);
      marker.open = true;
    } else {
      this.infowindow.close();
      marker.open = false;
    }
  }

  addWindowListener(marker) {
    google.maps.event.addListener(marker, 'click', (e) => {
      this.setWindow(marker, e);
    });

    google.maps.event.addListener(marker, 'mouseover', (e) => {
      this.setWindow(marker, e);
    });
  }
}

module.exports = Marker;
