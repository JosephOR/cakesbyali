angular.module('cakes')
.controller('templatesCtrl', templatesCtrl);

function templatesCtrl($scope, $location, $rootScope){
	var ref = $rootScope.tiers;

	ref.on("value", function(snapshot) {
		$scope.tiers = snapshot.val();
		$scope.$apply();
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});

	$scope.gotoBuild = function (item) {
		$rootScope.cakeDescription = item.Description;
 		$location.path('/build/'+item.Options.NumLayers)
 	}	



}