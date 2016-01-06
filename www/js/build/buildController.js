angular.module('cakes')
.controller("buildCtrl", buildCtrl);

function buildCtrl($scope, $location, $firebaseObject, $stateParams, $rootScope, Location, address){

	// var ref = new Firebase("https://cakesbyali.firebaseio.com/Tiers");
	// var ref2 = new Firebase("https://cakesbyali.firebaseio.com/CakeOptions");
	$scope.optionsRef = $rootScope.optionsRef;
	console.log($scope.optionsRef)
	$scope.loaded = false;
	$scope.optionsLoaded = false;
	$scope.addressEntered = false;
	$scope.hasFilling = true;

	$scope.userCake = {};
	$scope.userCake.topping = {
		"type": "",
		"flavor": ""
	};

	$scope.getLocation = function() {
    	Location.getLocation().then(function(latLong) {
      		address.getAddress(latLong).then(function(address){
      			if(address){
      				$scope.address = address.results[1].formatted_address;
      				$scope.addressEntered = true;
      			}
      		}, function(error){
      			console.log('no address found')
      		})
    	}, function(err) {
      		console.err(err);
    	});
 	};

	$scope.loadOptions = function (numLayers ) {
		$scope.optionsLoaded = true;
		$scope.options = $scope.optionsRef;
		createOptions($scope.options, numLayers)
	}
	$scope.getNumLayersFromURL = function (){
		var numLayers = $stateParams.id;
		$scope.loadOptions(numLayers)
	}
	$scope.getNumLayersFromURL();
	
	function createOptions(data, numLayers){
		console.log(data)
		$scope.cake = {};
		$scope.cakeTiers = [];
		$scope.cakefillings = [];
		$scope.cakeTopping = [];
		for (var i = 1; i <= numLayers; i++) {
			$scope["tier"+i] = {};
			$scope["tier"+i].name = "Tier "+i;
			$scope["tier"+i].flavors = data.Flavours;
			$scope["tier"+i].Types = data.Types;
			$scope.userCake["tier"+i] = {
				"flavour" : data.Flavours[0],
				"type" : data.Types[0]
			};
			$scope.cakeTiers.push($scope["tier"+i])
		};
		if (numLayers > 1){
			for (var i = 1; i < numLayers; i++) {
			$scope["filling"+i] = {};
			$scope["filling"+i].name = "filling "+i;
			$scope["filling"+i].flavors = data.Flavours;
			$scope["filling"+i].Types = data.Fillings;
			
			$scope.userCake["filling"+i] = {
				"flavour" : data.Flavours[0],
				"type" : data.Types[0]
			};
			$scope.cakefillings.push($scope["filling"+i]);
			$scope.hasFilling = true;
		};
		$scope.cake.fillings = $scope.cakefillings;
		}
		
		$scope.cake.tiers = $scope.cakeTiers;

		$scope.userCake["topping"] = {
				"flavour" : data.Flavours[0],
				"type" : data.Topping[0]
			};

		$scope.topping = {};
		$scope.topping.name = "topping";
		$scope.topping.flavors = data.Flavours;
		$scope.topping.Types = data.Topping;

		$scope.cakeTopping.push($scope.topping);
		$scope.cake.topping = $scope.cakeTopping;
		// $scope.cake.topping.type = data.Topping;
		// $scope.cake.topping.flavour = data.Flavours;


		console.log("cake", $scope.cake)
		$scope.cakeOptions = $scope.cake;
	}

	$scope.buildCake = function (){
		console.log($scope.cakeOptions)
	}
	$scope.setTier = function (value, selectedOption, index){
		var option = value;
		var tier = "tier"+index;
		$scope.userCake[tier][option] = selectedOption;
	}
	$scope.setFilling = function(value, selectedOption, index){
		var option = value;
		var filling = "filling"+index;
		$scope.userCake[filling][option] = selectedOption;
		console.log($scope.userCake)
	}
	$scope.setTopping = function(value, selectedOption){
		var option = value;
		$scope.userCake.topping[option] = selectedOption;
		console.log($scope.userCake)
	}
	$scope.activeTier = function (id){
		
		if(id !== $scope.openTierId){
			$scope.openTierId = id;
		}
		else{
			$scope.openTierId = 9;
		}
		$scope.openFillingId = 9;
		$scope.openToppingId = 9;
	}

	$scope.activeFilling = function (id){

		if(id !== $scope.openFillingId){
			$scope.openFillingId = id;
		}
		else{
			$scope.openFillingId = 9;
		}
		$scope.openTierId = 9;
		$scope.openToppingId = 9;
	}
	$scope.activeTopping = function (id){

		if(id !== $scope.openToppingId){
			$scope.openToppingId = id;
		}
		else{
			$scope.openToppingId = 9;
		}
		$scope.openTierId = 9;
		$scope.openFillingId = 9;
	}

	
}