angular.module('cakes')
.controller("footerController", footerController);

function footerController($ionicPopup, $scope, $timeout, $rootScope, $location){

 // A confirm dialog
    $scope.showConfirm = function() {
        var confirmPopup = $ionicPopup.confirm({
           title: 'Logout',
           template: 'Are you sure you want to logout?'
        });
        confirmPopup.then(function(res) {
         	if(res) {
                $rootScope.logout();
            } 
        });
    };

}