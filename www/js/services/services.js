angular.module('cakes')

.factory('Camera', ['$q', function($q) {

    return {
	    getPicture: function(options) {
	      var q = $q.defer();

	      navigator.camera.getPicture(function(result) {
	        // Do any magic you need
	        q.resolve(result);
	      }, function(err) {
	        q.reject(err);
	      }, {  quality : 75,
				allowEdit : true,
				encodingType: Camera.EncodingType.JPEG,
				targetWidth: 300,
				targetHeight: 400,
				popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: true });

	      return q.promise;
	    }
    }
}])
.factory('Location', ['$q', function($q) {

    return {
	    getLocation: function(options) {
	      var q = $q.defer();

	      navigator.geolocation.getCurrentPosition(function(position) {
	        // Do any magic you need
	        q.resolve(position);
	      }, function(err) {
	        q.reject(err);
	      });

	      return q.promise;
	    }
    }
}]);




 