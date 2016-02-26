angular.module('cakes')
.controller('templatesCtrl', templatesCtrl);

function templatesCtrl($scope, $location, $rootScope){
	var ref = $rootScope.tiers;
	$scope.images = [
		'images/childrens-wide.jpg',
		'images/occassin-wide.png',
		'images/1tier-wide.png',
		'images/2tier-wide.png',
		'images/3Tier-wide.png',
		];
	ref.on("value", function(snapshot) {
		$scope.tiers = snapshot.val();
		$scope.$applyAsync();
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});

	$scope.gotoBuild = function (item) {
		$rootScope.cakeDescription = item.Description;
 		$location.path('/build/'+item.Options.NumLayers)
 	}	



}