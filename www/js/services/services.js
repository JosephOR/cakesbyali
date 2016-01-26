angular.module('cakes')

.factory('Camera', ['$q', function($q) {

    return {
	    getPicture: function(where) {
	      var q = $q.defer();
	      var source;
	      if( where === 'phone'){
	      	source = 'CAMERA'
	      }
	      else{
	      	source = 'PHOTOLIBRARY'
	      }
	      navigator.camera.getPicture(function(result) {
	        // Do any magic you need
	        q.resolve(result);
	      }, function(err) {
	        q.reject(err);
	      }, {  quality : 75,
	      		sourceType : Camera.PictureSourceType[source],
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




 