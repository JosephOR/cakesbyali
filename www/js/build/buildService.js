angular.module('cakes')


.factory('address', ['$q', '$http', function($q, $http) {

    return {
    	/**
    	 * @function
    	 * @param  {latitude-Lontitude}
    	 * @return {promise}
    	 */
	    getAddress: function(options) {
	    	var lat = options.coords.latitude;
	    	var lng = options.coords.longitude;
	      var q = $q.defer();

	      $http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&key=AIzaSyA_7mfRCMY6m_3m6c5ILKXoTUWBCxjMtFo")
	      .success(function(address) {
	        // Do any magic you need
	        q.resolve(address);
	      }).error(function(err) {
	        q.reject(err);
	      });

	      return q.promise;
	    }
    }
}]);




 