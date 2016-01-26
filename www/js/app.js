angular.module("cakes", ["ionic", "firebase"])
.run(function($ionicPlatform, $rootScope) {


    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    $rootScope.$on('$stateChangeStart', 
        function(event, toState, toParams, fromState, fromParams){ 
            if(toState.url === '/landing' || toState.url === '/login'){
                $rootScope.currentPath = true;
            }
            else{
                $rootScope.currentPath = false;
            }
        })

})
.config(function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/login");
  //
  // Now set up the states
  $stateProvider
    .state('login', {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: 'loginCtrl'
    })
    .state('landing', {
        url: "/landing",
        templateUrl: "templates/landing.html",
        controller: 'landingCtrl'
    })
    .state('startBuilding', {
        url: "/startBuilding",
        templateUrl: "templates/startBuilding.html",
        controller: 'startBuildingCtrl'
    })
    .state('gallery', {
        url: "/gallery",
        templateUrl: "templates/gallery.html",
        controller: 'galleryCtrl'
    })
    .state('build', {
        url: "/build/:id",
        templateUrl: "templates/build.html",
        controller: 'buildCtrl'
    })
    .state('templates', {
        url: "/templates",
        templateUrl: "templates/templates.html",
        controller: 'templatesCtrl'
    })
    .state('finish', {
        url: "/finish",
        templateUrl: "templates/finish.html",
        controller: 'finishCtrl'
    })
    .state('favs', {
        url: "/favs",
        templateUrl: "templates/favs.html",
        controller: 'favouritesCtrl'
    });

});


// ref.authWithOAuthPopup("facebook", function(error, authData) {
//   if (error) {
//     console.log("Login Failed!", error);
//   } else {
//     console.log("Authenticated successfully with payload:", authData);
//   }
// });

// .controller("ListCtrl", function($scope) {
//    $scope.name = "joe";
//   alert($scope.name)
//   console.log("hi2")
//   $scope.testbtn = function(){
//     console.log("testbtn");
//     var ref = new Firebase("https://cakesbyali.firebaseio.com");
//     ref.authWithOAuthPopup("facebook", function(error, authData) {
//   if (error) {
//     console.log("Login Failed!", error);
//   } else {
//     console.log("Authenticated successfully with payload:", authData);
//     alert("logged in")
//   }
// });

//   }

// })

// .factory("Items", function($firebaseArray) {
//   var itemsRef = new Firebase("https://cakesbyali.firebaseio.com");
//   return $firebaseArray(itemsRef);
// })
