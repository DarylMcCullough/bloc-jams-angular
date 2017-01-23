(function() {
     function LandingCtrl($scope) {
         this.heroTitle = "Turn the Music Up!";
     }
 
     angular
         .module('blocJams')
         .controller('LandingCtrl', ['$scope', LandingCtrl]);
 })();