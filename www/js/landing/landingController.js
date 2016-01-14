angular.module('cakes')
.controller("landingCtrl", landingCtrl);

function landingCtrl($scope, $location, $rootScope, $firebaseObject){
  	$scope.hasImage = false;
  	// var ref2 = new Firebase("https://cakesbyali.firebaseio.com/CakeOptions");
   //  $rootScope.optionsRef = $firebaseObject(ref2);
   

 	$scope.startBuilding = function () {
 		$location.path('/startBuilding')
 	}
 	$scope.gotoGallery = function () {
 		$location.path('/templates')
 	}

  	
}