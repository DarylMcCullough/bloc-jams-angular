(function() {
     function SignUp($scope, SharedData) {
         $scope.display = true;
         $scope.master = {
             firstName: "John",
             lastName: "Doe",
             userName: "jodo",
             password: "xxxxxxx",
             email: "johndoe@acme.com"
         }
         
         $scope.reset = function() {
             $scope.user = angular.copy($scope.master);
         }
         $scope.save = function() {
             alert("Okay, saved");
         }
         
         $scope.reset();

         $scope.show = function() {
             return false;
         }
         
         var STATE = "SignUp" + "state";
         var LOGGING = "SignUp" + "loggingIn";
         var SIGNING = "SignUp" + "signingUp";
         var LOGGED = "SignUp" + "loggedIn";
         var OUT = "SignUp" + "loggedOut";

         
         $scope.loggingIn = function() {
             retval = SharedData.get(STATE);
             return (retval == LOGGING);
         }
         
        $scope.signingUp = function() {
             retval = SharedData.get(STATE);
             return (retval == SIGNING);
         }
        
        $scope.loggedIn = function() {
             retval = SharedData.get(STATE);
             return (retval == LOGGED);
         }
        
        $scope.logOut = function() {
            SharedData.put(STATE, OUT);
        }
        
        $scope.signUp = function() {
            SharedData.put(STATE, SIGNING);
        }
        
        $scope.logIn = function() {
            SharedData.put(STATE, LOGGING);
        }
        
        $scope.finishLogIn = function() {
            SharedData.put(STATE, LOGGING);
        }
        
        $scope.signUp();
     }
 
     angular
         .module('blocJams')
         .controller('SignUp', ['$scope', 'SharedData', SignUp]);
 })();