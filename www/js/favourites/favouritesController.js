angular.module('cakes')
.controller("favouritesCtrl", favouritesCtrl);

function favouritesCtrl($ionicModal, $scope, $location, $rootScope, $firebaseObject){
  	$scope.hasImage = false;
  	$scope.favsLoaded = false;
  	
	$scope.favs = new Firebase("https://cakesbyali.firebaseio.com/user/"+ $rootScope.userID);
	
	$scope.favs.on("value", function(snapshot) {
		  	$scope.favs = snapshot.val();
		  	$scope.favsLoaded = true;
		  	$scope.$apply();
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
	});
	$scope.checkType = function (type){
		if(type == 'message'){
			return 'col-66';
		}
	}
	
 	$scope.startBuilding = function () {
 		$state.go('startBuilding')
 	}
 	$scope.gotoGallery = function () {
 		$location.path('/templates')
 	}

	$ionicModal.fromTemplateUrl('templates/favs-modal.html', {
		scope: $scope,
		animation: 'slide-in-up'
	})
	.then(function(modal) {
		$scope.modal = modal;
	});

	$scope.openModal = function(val) {
		$scope.currentFav = val;
		var obj = Object.keys(val);
		if($scope.currentFav[obj].image !== undefined ){
			$scope.imageUrl = $scope.currentFav[obj].image.base64;
			$scope.hasImage = true;
		}else{
			$scope.hasImage = false;
		}
		
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