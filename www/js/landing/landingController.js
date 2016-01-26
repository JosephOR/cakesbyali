angular.module('cakes')
.controller("landingCtrl", landingCtrl);

function landingCtrl($scope, $location, $rootScope, $firebaseObject){
	$rootScope.tiers = new Firebase("https://cakesbyali.firebaseio.com/Tiers");   

 	$scope.startBuilding = function () {
 		$location.path('/startBuilding')
 	}
 	$scope.gotoGallery = function () {
 		$location.path('/templates')
 	}

  	
}