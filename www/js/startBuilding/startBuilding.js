angular.module('cakes')
.controller("startBuildingCtrl", startBuildingCtrl);

function startBuildingCtrl($scope, $location, $firebaseObject, $rootScope){

	var ref = $rootScope.tiers;
	$scope.optionsRef = $rootScope.optionsRef;
	$scope.loaded = false;
	$scope.optionsLoaded = false;

	ref.on("value", function(snapshot) {
		$scope.tiers = snapshot.val();
		$scope.loaded = true;
		$scope.$applyAsync();
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});


	function createOptions(data, numLayers){
		$scope.cake = {};
		$scope.cakeTiers = [];
		$scope.cakefillings = [];
		//only one per cake
		for (var i = 1; i <= numLayers; i++) {
			$scope["tier"+i] = {};
			$scope["tier"+i].name = "Tier "+i;
			$scope["tier"+i].flavors = data.Flavours;
			$scope["tier"+i].Types = data.Types;
			$scope.cakeTiers.push($scope["tier"+i])
		};

		for (var i = 1; i < numLayers; i++) {
			$scope["filling"+i] = {};
			$scope["filling"+i].name = "filling "+i;
			$scope["filling"+i].flavors = data.Flavours;
			$scope["filling"+i].Types = data.Fillings;
			$scope.cakefillings.push($scope["filling"+i])
		};
		$scope.cake.fillings = $scope.cakefillings;
		$scope.cake.tiers = $scope.cakeTiers;
		$scope.cakeOptions = $scope.cake;
	}

	$scope.activeTier = function (id){
		
		if(id !== $scope.openTierId){
			$scope.openTierId = id;
		}
		else{
			$scope.openTierId = 9;
		}
		$scope.openFillingId = 9;
	}

	$scope.activeFilling = function (id){

		if(id !== $scope.openFillingId){
			$scope.openFillingId = id;
		}
		else{
			$scope.openFillingId = 9;
		}
		$scope.openTierId = 9;
	}

	$scope.selectCake = function (item){
		$rootScope.cakeDescription = item.Description;
		$location.path('/build/'+item.Options.NumLayers)
	}
}