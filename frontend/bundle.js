/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _places = __webpack_require__(1);
	
	var _places2 = _interopRequireDefault(_places);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener('DOMContentLoaded', function () {
	  window.map = new google.maps.Map(document.getElementById('map'), {
	    center: { lat: 37.78, lng: -122.45 },
	    zoom: 13,
	    backgroundColor: 'hsla(0,0%,0%,0)'
	  });
	
	  var places = new _places2.default();
	  document.getElementById("enter").addEventListener("click", function (e) {
	    var input = document.getElementById('input').value;
	    places.search(input);
	  });
	
	  document.addEventListener("keypress", function (e) {
	    if (e.keyCode === 13) {
	      var input = document.getElementById('input').value;
	      places.search(input);
	    }
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _marker = __webpack_require__(2);
	
	var _marker2 = _interopRequireDefault(_marker);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Places = function () {
	  function Places() {
	    _classCallCheck(this, Places);
	
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
	
	  _createClass(Places, [{
	    key: 'search',
	    value: function search(inputText) {
	      var service = void 0;
	      this.clearResults();
	      this.clearMarkers();
	      var starting = new google.maps.LatLng(37.78, -122.45);
	      var request = {
	        location: starting,
	        radius: '200',
	        query: '' + inputText
	      };
	      service = new google.maps.places.PlacesService(window.map);
	      service.textSearch(request, this.callback);
	    }
	  }, {
	    key: 'clearResults',
	    value: function clearResults() {
	      this.places = [];
	      var searchResults = document.getElementById('results');
	      searchResults.innerHTML = "";
	    }
	  }, {
	    key: 'clearMarkers',
	    value: function clearMarkers() {
	      this.setMapOnAll(null);
	      this.markers = [];
	    }
	  }, {
	    key: 'setMapOnAll',
	    value: function setMapOnAll(map) {
	      for (var i = 0; i < this.markers.length; i++) {
	        this.markers[i].setMap(map);
	      }
	    }
	  }, {
	    key: 'callback',
	    value: function callback(results, status) {
	      var bounds = new google.maps.LatLngBounds();
	      if (status === google.maps.places.PlacesServiceStatus.OK) {
	        for (var i = 0; i < results.length; i++) {
	          var place = results[i];
	          this.places.push(place);
	          var marker = new _marker2.default(place, i, this.infowindow);
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
	  }, {
	    key: 'showMarkers',
	    value: function showMarkers() {
	      this.setMapOnAll(window.map);
	    }
	  }, {
	    key: 'showResults',
	    value: function showResults() {
	      var searchResults = document.getElementById('results');
	      searchResults.innerHTML = "";
	      var rating = "";
	      for (var i = 0; i < this.places.length; i++) {
	        var place = this.places[i];
	        rating = place.rating ? place.rating : 0;
	        var stars = "";
	        for (var j = 0; j < rating; j++) {
	          stars += "☆";
	        }
	        var address = place.formatted_address.replace(", United States", "");
	        var open = place.opening_hours && place.opening_hours.open_now === true ? "Open Now" : "Closed";
	        searchResults.innerHTML += '<div class="eachResult" id= ' + i + '>' + '<div id="name">' + place.name + '</div>' + '<div id= "addr">' + address + '</div>' + '<div id ="rating">' + stars + '</div>' + '<div id ="open">' + open + '</div> </div>';
	      }
	    }
	  }, {
	    key: 'setListener',
	    value: function setListener() {
	      var _this = this;
	
	      var results = document.querySelectorAll(".eachResult");
	
	      for (var j = 0; j < results.length; j++) {
	        results[j].addEventListener("mouseover", function (e) {
	          var mark = _this.findMarker(e);
	          _this.infowindow.setContent(mark.title);
	          _this.infowindow.open(window.map, mark);
	        });
	      }
	    }
	  }, {
	    key: 'findMarker',
	    value: function findMarker(e) {
	      var mark = void 0;
	      this.markers.forEach(function (marker) {
	        if (marker.index == e.currentTarget.id) {
	          mark = marker;
	        }
	      });
	      return mark;
	    }
	  }]);
	
	  return Places;
	}();
	
	module.exports = Places;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Marker = function () {
	  function Marker(place, index, infowindow) {
	    _classCallCheck(this, Marker);
	
	    this.index = index;
	    this.place = place;
	    this.infowindow = infowindow;
	    this.createMarker = this.createMarker.bind(this);
	    this.addWindowListener = this.addWindowListener.bind(this);
	    this.setWindow = this.setWindow.bind(this);
	  }
	
	  _createClass(Marker, [{
	    key: 'createMarker',
	    value: function createMarker() {
	      var image = {
	        url: "./app/assets/images/pin.png",
	        size: new google.maps.Size(35, 35),
	        origin: new google.maps.Point(0, 0),
	        anchor: new google.maps.Point(0, 0),
	        scaledSize: new google.maps.Size(35, 35)
	      };
	
	      var marker = new google.maps.Marker({
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
	  }, {
	    key: 'setWindow',
	    value: function setWindow(marker, e) {
	      if (!marker.open) {
	        this.infowindow.setContent(this.place.name);
	        this.infowindow.open(window.map, marker);
	        marker.open = true;
	      } else {
	        this.infowindow.close();
	        marker.open = false;
	      }
	    }
	  }, {
	    key: 'addWindowListener',
	    value: function addWindowListener(marker) {
	      var _this = this;
	
	      google.maps.event.addListener(marker, 'click', function (e) {
	        _this.setWindow(marker, e);
	      });
	
	      google.maps.event.addListener(marker, 'mouseover', function (e) {
	        _this.setWindow(marker, e);
	      });
	    }
	  }]);
	
	  return Marker;
	}();
	
	module.exports = Marker;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map