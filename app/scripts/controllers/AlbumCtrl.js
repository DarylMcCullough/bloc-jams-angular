 (function() {
    function AlbumCtrl($scope, Fixtures, SongPlayer) {
        this.albumData = Fixtures.getAlbum();
        this.songPlayer = SongPlayer;
        SongPlayer.registerScope($scope);
        this.releaseInfo = function() {
            return this.albumData.year + " " + this.albumData.label;            
        }
     }
 
     angular
         .module('blocJams')
         .controller('AlbumCtrl', ['$scope', 'Fixtures', 'SongPlayer', AlbumCtrl]);
 })();