angular.module('cakes')
// .controller("loginCtrl", loginCtrl);

// function loginCtrl($scope, $location){



//   	}

  
.controller('loginCtrl', function(
    $scope, 
    $state, 
    $q,  
    $ionicLoading, 
    $location, 
    $firebaseObject, 
    $rootScope ){

    $rootScope.currentPath = $location.path();
   
    $rootScope.checkUser = function(){
        if ($rootScope.loggedIn){
            $state.go('landing')
        }
    }
    $rootScope.logout = function(){
        $rootScope.loggedIn = false;
        $scope.userRef.unauth();
        $scope.firebaseLogin = false;
        $scope.user.email = '';
        $scope.user.password = '';
        $scope.user.created = false;
        $state.go('login')
    }

    $scope.clearForms = function (){
        $scope.firebaseLogin = false;
        $scope.user.created = false;
    }
    //users table for facebook ids
    $scope.fbRef = new Firebase("https://cakesbyali.firebaseio.com/fbIds/Users");
    //all users table, for stpring favorites
    $scope.userTable  = new Firebase("https://cakesbyali.firebaseio.com/user");
    //the main database
    $scope.userRef = new Firebase("https://cakesbyali.firebaseio.com");
    $rootScope.userRef = $scope.userRef;
    //cake options table
    var ref2 = new Firebase("https://cakesbyali.firebaseio.com/CakeOptions");
    $rootScope.optionsRef = $firebaseObject(ref2);
    $scope.loginError = false;
    $scope.registerError = false;
    $scope.loginText = "Log in";
    $scope.registerText = "Register";
    $scope.exists = false;
    $scope.firebaseLogin = false;
    $scope.email = null;
    $scope.password = null;
    $scope.user = {
      email : '',
      password : '',
      created : false
    }

    $scope.clearUser = function (){
        $scope.firebaseLogin = false;
    }
    $scope.noLogin = function (){
      $state.go( 'landing' );
    }

//////firebase login

    $scope.showRegister = function(){
        $scope.firebaseLogin = true;
    }
    $scope.register = function(){
        $scope;registerText = "Registering..";
        //firebase - creates user
        $scope.userRef.createUser({
            email    : $scope.user.email,
            password : $scope.user.password
        }, function(error, userData) {
            if (error) {
                $scope.registerErrorMsg = error.toString();
                $scope.registerError = true;
                $scope;registerText = "Try again";
                $scope.$applyAsync();
            } else {
                //set main user id
                $rootScope.userID = userData.uid;
                $scope.userTable.child($rootScope.userID).set({email : $scope.user.email});
                //clear form variables
                $scope.user.email = '';
                $scope.user.password = '';
                $scope;registerText = "Register";
                $scope.registerError = false;
                $scope.user.created = true;
                $scope.$applyAsync();
            }
        });
    }
    $scope.Login = function(){
        $scope.user.created = true;
        $scope.firebaseLogin = true;
    }

    $scope.login = function(){
        $scope.loginText = "Logging in...";

        $scope.userRef.authWithPassword({
            email    : $scope.user.email,
            password : $scope.user.password
        }, function(error, authData) {
            if (error) {
                $scope.loginErrorMsg = error.toString();
                $scope.loginError = true;
                $scope.loginText = "Try again";
                $scope.$applyAsync();
            } else {
                $scope.checkUser($scope.user.email);
                

                $rootScope.userID = authData.uid;
                $state.go( 'landing' );
                $rootScope.loggedIn = true;
                $scope.loginError = false;
                $scope.$applyAsync();
            }
        });
    }

    $scope.checkUser = function (email){
        $scope.testActive = new Firebase("https://iadt.firebaseio.com/users");
        $scope.testActive.push({'email': email, 'date': Date.now()})
    }
  // This is the success callback from the login method
  // 
  /**
   * [fbLoginSuccess description]
   * @param  {rsponse} response fuckoff
   * @return {jfjg}          jhgjh
   */
    var fbLoginSuccess = function(response) {
        if (!response.authResponse){
            fbLoginError("Cannot find the authResponse");
            return;
        }

        var authResponse = response.authResponse;

        getFacebookProfileInfo(authResponse)
        .then(function(profileInfo) {
            $ionicLoading.hide();
            $state.go('app.home');
        }, function(fail){
          // Fail get profile info
          // console.log('profile info fail', fail);
        });
    };

    // This is the fail callback from the login method
    var fbLoginError = function(error){
        console.log('fbLoginError', error);
        $ionicLoading.hide();
    };

      // This method is to get the user profile info from the facebook api
    var getFacebookProfileInfo = function (authResponse) {
        var info = $q.defer();

        facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
          function (response) {
            info.resolve(response);
          },
          function (response) {
            info.reject(response);
          }
        );
        return info.promise;
    };

    //This method is executed when the user press the "Login with facebook" button
    $scope.facebookSignIn = function() {
        facebookConnectPlugin.getLoginStatus(function(success){
        
            if(success.status === 'connected'){
                var logged = false;
                if(!logged){
                    getFacebookProfileInfo(success.authResponse)
                    .then(function(profileInfo) {
                        $rootScope.userID = profileInfo.id;

                        if(!$scope.fbRef.child(profileInfo.id).exists()){
                            $scope.checkUser(profile.name)
                            $scope.fbRef.child(profileInfo.id).set({'name' : profileInfo.name});
                            $scope.userTable.child(profileInfo.id).set({'name' : profileInfo.name});
                        }
                        
                        $state.go('landing');
                    }, function(fail){
                        // Fail get profile info
                        // console.log('profile info fail', fail);
                    });
                }else{
                  $state.go('app.home');
                }
            } 
            else 
            {
                $ionicLoading.show({
                  template: 'Logging in...'
                });
                // Ask the permissions you need. You can learn more about
                // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
                facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
            }
        });
    };
   
})

.directive('loginOptions', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/includes/loginOptions.html'
  };
})
.directive('register', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/includes/register.html'
  };
})
.directive('login', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/includes/login.html'
  };
});
