angular.module('cakes')
.controller("landingCtrl", landingCtrl);

function landingCtrl($scope, Camera, $location){
  	$scope.hasImage = false;
  	
   	$scope.getPhoto = function() {
    	Camera.getPicture().then(function(imageURI) {
      		// console.log(imageURI);
      		// alert(imageURI)
      		$scope.image = imageURI;
      		$scope.hasImage = true;
    	}, function(err) {
      		console.err(err);
    	});
 	};

 	$scope.startBuilding = function () {
 		$location.path('/startBuilding')
 	}
 	$scope.gotoGallery = function () {
 		$location.path('/gallery')
 	}

  	
}