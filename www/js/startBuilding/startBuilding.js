angular.module('cakes')
.controller("startBuildingCtrl", startBuildingCtrl);

function startBuildingCtrl($scope, $location, $firebaseObject, $rootScope){

	var ref = new Firebase("https://cakesbyali.firebaseio.com/Tiers");
	var ref2 = new Firebase("https://cakesbyali.firebaseio.com/CakeOptions");
	$rootScope.optionsRef = $firebaseObject(ref2);
	$scope.loaded = false;
	$scope.optionsLoaded = false;

	ref.on("value", function(snapshot) {
		$scope.tiers = snapshot.val();
		$scope.loaded = true;
		$scope.$apply();
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});

	// function getNumLayersFromURL (){
	// 	var numLayers = $routeParams.id();
	// 	console.log(numLayers)
	// }
	// getNumLayersFromURL();
	// $scope.loadOptions = function (numLayers ) {
	// 	console.log(numLayers)
	// 	$scope.optionsLoaded = true;
	// 	$scope.options = $scope.optionsRef;
	// 	createOptions($scope.options, numLayers)
	// }

	function createOptions(data, numLayers){
		console.log(data);
		$scope.cake = {};
		$scope.cakeTiers = [];
		$scope.cakefillings = [];
		//only one per cake
		// $scope.toppings.push(data.Fillings);
		// $scope.cake.toppings = $scope.toppings;
		for (var i = 1; i <= numLayers; i++) {
			$scope["tier"+i] = {};
			$scope["tier"+i].name = "Tier "+i;
			$scope["tier"+i].flavors = data.Flavours;
			$scope["tier"+i].Types = data.Types;
			
			console.log("test", $scope["tier"+i])
			$scope.cakeTiers.push($scope["tier"+i])
		};

		for (var i = 1; i < numLayers; i++) {
			$scope["filling"+i] = {};
			$scope["filling"+i].name = "filling "+i;
			$scope["filling"+i].flavors = data.Flavours;
			$scope["filling"+i].Types = data.Fillings;
			
			console.log("test", $scope["filling"+i])
			$scope.cakefillings.push($scope["filling"+i])
		};
		$scope.cake.fillings = $scope.cakefillings;
		$scope.cake.tiers = $scope.cakeTiers;
		console.log("cake", $scope.cake)
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

	// $scope.toggleGroup1 = function(group) {
	//     if ($scope.isGroupShown1(group)) {
	//       $scope.shownGroup1 = null;
	//     } else {
	//       $scope.shownGroup1 = group;
	//     }
	// };
	// $scope.isGroupShown1 = function(group) {
	// 	return $scope.shownGroup1 === group;
	// };
	// $scope.toggleGroup2 = function(group) {
	//     if ($scope.isGroupShown2(group)) {
	//       $scope.shownGroup2 = null;
	//     } else {
	//       $scope.shownGroup2 = group;
	//     }
	// };
	// $scope.isGroupShown2 = function(group) {
	// 	return $scope.shownGroup2 === group;
	// };
}