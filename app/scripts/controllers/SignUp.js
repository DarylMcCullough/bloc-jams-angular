(function() {
     function SignUp($scope) {
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
     }
 
     angular
         .module('blocJams')
         .controller('SignUp', ['$scope', SignUp]);
 })();