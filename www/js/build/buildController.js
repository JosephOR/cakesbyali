angular.module('cakes')
.controller("buildCtrl", buildCtrl);


function buildCtrl($ionicModal, $scope, $location, Camera, $firebaseObject, $stateParams, $rootScope, Location, address){
	//only used twice - remove, called at login
	$scope.userRef = new Firebase("https://cakesbyali.firebaseio.com/user");
	$scope.optionsRef = $rootScope.optionsRef;
	console.log($scope.optionsRef)
	$scope.locationText = "Get Location";
	$scope.loaded = false;
	$scope.custom = false;
	$scope.optionsLoaded = false;
	$scope.hasAddress = false;
	$scope.hasFilling = true;
	$scope.address = "";
	$scope.userCake = {};
	$scope.userCake.name = {}
	$scope.userCake.image = {}
	$scope.userCake.topping = {
		"type": "",
		"flavor": ""
	};
	$scope.userCake.message = {};
	/**
	*	sets the user message
	*/
	$scope.setMessage = function (message){
		console.log(message)
		$scope.userCake.message.text = message;
	}
	$scope.checkType = function (type){
		if(type == 'message'){
			return 'col-66';
		}
	}
	/**
	 * Represents a book
	 * @function
	 * @param {string} title - The title of the book.
	 * @param {string} author - The author of the book.
	 * @return {promise}
	 */
	$scope.getLocation = function() {
		console.log('location')
		$scope.locationText = "Finding Location...";
		Location.getLocation().then(function(latLong) {
			address.getAddress(latLong).then(function(address){
				if(address){
					$scope.address = address.results[1].formatted_address;
					$scope.hasAddress = true;
					$scope.userCake.address = $scope.address;
					$scope.locationText = "Get Location";
					// $scope.$apply();
				}
			}, function(error){
				console.log('no address found')
				$scope.locationText = "Get Location";
			})
		}, function(err) {
			console.err(err);
		});
		
	};
	
	$scope.getPhoto = function(where) {
		Camera.getPicture(where).then(function(imageURI) {
      		$scope.image = imageURI;
      		$scope.userCake.image.base64 = imageURI;
      		$scope.hasImage = true;
      	}, function(err) {
      		console.err(err);
      	});
	};
	/**
	 * @constructor
	 * @param  {int} number of layers
	 */
	$scope.loadOptions = function (numLayers ) {
		$scope.optionsLoaded = true;
		$scope.options = $scope.optionsRef;
		if (numLayers > 0){
			createOptions($scope.options, numLayers);
		}else{
			createCustomOptions($scope.options);
		}
		
	}
	/**
     * @function
     * @param  {latitude-Lontitude}
     * @return {promise}
     */
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
		
		console.log("cake", $scope.cake)
		$scope.cakeOptions = $scope.cake;
		$scope.custom = false;
	}
	function createCustomOptions(data){
		console.log(data)
		$scope.cake = {};
		$scope.cakeTiers = [];
		$scope.cakefillings = [];
		$scope.cakeTopping = [];
		$scope.count = 1;
		
		//create one tier
		$scope["tier"+$scope.count] = {};
		$scope["tier"+$scope.count].name = "Tier "+$scope.count;
		$scope["tier"+$scope.count].flavors = data.Flavours;
		$scope["tier"+$scope.count].Types = data.Types;
		$scope.userCake["tier"+$scope.count] = {
			"flavour" : data.Flavours[0],
			"type" : data.Types[0]
		};
		$scope.cakeTiers.push($scope["tier"+$scope.count])
		$scope.cake.tiers = $scope.cakeTiers;
		//create usercake object
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
		
		$scope.custom = true;
		console.log("cake", $scope.cake)
		$scope.cakeOptions = $scope.cake;
		$scope.count++;
	}
	
	$scope.addTier = function (){
		$scope["tier"+$scope.count] = {};
		$scope["tier"+$scope.count].name = "Tier "+$scope.count;
		$scope["tier"+$scope.count].flavors = $scope.options.Flavours;
		$scope["tier"+$scope.count].Types = $scope.options.Types;
		$scope.userCake["tier"+$scope.count] = {
			"flavour" : $scope.options.Flavours[0],
			"type" : $scope.options.Types[0]
		};
		$scope.cakeTiers.push($scope["tier"+$scope.count])
		$scope.cake.tiers = $scope.cakeTiers;


		$scope["filling"+($scope.count-1)] = {};
		$scope["filling"+($scope.count-1)].name = "filling "+($scope.count-1);
		$scope["filling"+($scope.count-1)].flavors = $scope.options.Flavours;
		$scope["filling"+($scope.count-1)].Types = $scope.options.Fillings;
		
		$scope.userCake["filling"+($scope.count-1)] = {
			"flavour" : $scope.options.Flavours[0],
			"type" : $scope.options.Types[0]
		};
		$scope.cakefillings.push($scope["filling"+($scope.count-1)]);
		$scope.hasFilling = true;
		
		$scope.cake.fillings = $scope.cakefillings;
		

		$scope.count++;
	}

	$scope.setName = function (name){
		$scope.userCake.name.text = ""+name;
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
	$scope.orderCake = function (){
		$rootScope.userCake = $scope.userCake;
		
		// get from user input
		$scope.userRef.child($rootScope.userID)
			.child($scope.userCake.name.text)
			.push($rootScope.userCake);
		$scope.closeModal();
		$location.path('/finish')
	}
	$ionicModal.fromTemplateUrl('templates/modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	})
	.then(function(modal) {
		$scope.modal = modal;
	});

	$scope.openModal = function() {
		$scope.modal.show();

	};
	$scope.closeModal = function() {
		$scope.modal.hide();
	};
  	//Cleanup the modal when we're done with it!
  	$scope.$on('$destroy', function() {
  		$scope.modal.remove();
  	});
  	// Execute action on hide modal
  	$scope.$on('modal.hidden', function() {
  	  // Execute action
	});
	  // Execute action on remove modal
	 $scope.$on('modal.removed', function() {
	    // Execute action
	});


}