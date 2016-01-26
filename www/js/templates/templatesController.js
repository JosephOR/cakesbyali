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

	$scope.gotoBuild = function (id) {
 		$location.path('/build/'+id)
 	}	



}