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
        console.log('checking')
        if ($rootScope.loggedIn){
            $location.path('/landing')
        }
    }
    $rootScope.logout = function(){
        console.log('logout')
        $rootScope.loggedIn = false;
        $scope.userRef.unauth();
        $scope.firebaseLogin = false;
        $scope.user.email = '';
        $scope.user.password = '';
        $scope.user.created = false;
        $location.path('/login')
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
        // $scope.user.created = false;
    }
    $scope.noLogin = function (){
      $location.path( '/landing' );
    }

//////firbase login

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
                console.log("Error creating user:", error);
                $scope.registerErrorMsg = error.toString();
                $scope.registerError = true;
                $scope;registerText = "Try again";
                $scope.$apply();
            } else {
                console.log("Successfully created user account with uid:", userData.uid);
                //set main user id
                $rootScope.userID = userData.uid;
                $scope.userTable.child($rootScope.userID).set({email : $scope.user.email});
                //clear form variables
                $scope.user.email = '';
                $scope.user.password = '';
                $scope;registerText = "Register";
                $scope.registerError = false;
                $scope.user.created = true;
                $scope.$apply();
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
                console.log("Login Failed!", error);
                $scope.loginErrorMsg = error.toString();
                $scope.loginError = true;
                $scope.loginText = "Try again";
                $scope.$apply();
            } else {
                console.log("Authenticated successfully with payload:", authData);
                $rootScope.userID = authData.uid;
                $location.path( '/landing' );
                $rootScope.loggedIn = true;
                $scope.loginError = false;
                $scope.$apply();
            }
        });
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
          // For the purpose of this example I will store user data on local storage
          // UserService.setUser({
          //   authResponse: authResponse,
          //   userID: profileInfo.id,
          //   name: profileInfo.name,
          //   email: profileInfo.email,
          //   picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
          // });
          $ionicLoading.hide();
          $state.go('app.home');
        }, function(fail){
          // Fail get profile info
          console.log('profile info fail', fail);
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
            console.log(response);
            info.resolve(response);
          },
          function (response) {
            console.log(response);
            info.reject(response);
          }
        );
        return info.promise;
    };

    //This method is executed when the user press the "Login with facebook" button
    $scope.facebookSignIn = function() {
        facebookConnectPlugin.getLoginStatus(function(success){
        
            if(success.status === 'connected'){
                    alert(success.status, 'if - is connected')
                // The user is logged in and has authenticated your app, and response.authResponse supplies
                // the user's ID, a valid access token, a signed request, and the time the access token
                // and signed request each expire
                console.log('getLoginStatus', success.status);

                var logged = false;
                if(!logged){
                    alert('not logged')
                    getFacebookProfileInfo(success.authResponse)
                    .then(function(profileInfo) {
                        $rootScope.userID = profileInfo.id;

                        if(!$scope.fbRef.child(profileInfo.id).exists()){
                            alert("doesnt exist "+ profileInfo.id)
                            $scope.fbRef.child(profileInfo.id).set({'name' : profileInfo.name});
                            $scope.userTable.child(profileInfo.id).set({'name' : profileInfo.name});
                        }
                        
                        $state.go('landing');
                    }, function(fail){
                        // Fail get profile info
                        console.log('profile info fail', fail);
                    });
                }else{
                  $state.go('app.home');
                }
            } 
            else 
            {
                // If (success.status === 'not_authorized') the user is logged in to Facebook,
                // but has not authenticated your app
                // Else the person is not logged into Facebook,
                // so we're not sure if they are logged into this app or not.

                console.log('getLoginStatus', success.status);

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
