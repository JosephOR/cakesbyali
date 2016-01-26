angular.module('cakes')
.controller("favouritesCtrl", favouritesCtrl);

function favouritesCtrl($ionicModal, $scope, $location, $rootScope, $firebaseObject){
  	$scope.hasImage = false;
  	$scope.favsLoaded = false;
  	// var ref2 = new Firebase("https://cakesbyali.firebaseio.com/CakeOptions");
   //  $rootScope.optionsRef = $firebaseObject(ref2);
	// $scope.favs = $rootScope.userKey;
	$scope.favs = new Firebase("https://cakesbyali.firebaseio.com/user/"+ $rootScope.userID);
	console.log($scope.favs)
	$scope.favs.on("value", function(snapshot) {
		  console.log(snapshot.val());
		  $scope.favs = snapshot.val();
		  $scope.favsLoaded = true;
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
	});

 	$scope.startBuilding = function () {
 		$location.path('/startBuilding')
 	}
 	$scope.gotoGallery = function () {
 		$location.path('/templates')
 	}


 	$scope.orderCake = function (){
		// $rootScope.userCake = $scope.userCake;
	/*open mail*/
		// get from user input
		// var user = $scope.userRef.child($scope.userCake.name.text);
		// var pushRef = user.push($rootScope.userCake);
		// $scope.key = pushRef.key();

		$scope.closeModal();
		alert("Your Cake has been ordered")
		// $location.path('/finish')
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