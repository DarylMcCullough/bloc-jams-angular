 (function() {
    function AlbumCtrl(Fixtures) {
        this.albumData = Fixtures.getAlbum();
        this.releaseInfo = function() {
            return this.albumData.year + " " + this.albumData.label;            
        }
     }
 
     angular
         .module('blocJams')
         .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
 })();