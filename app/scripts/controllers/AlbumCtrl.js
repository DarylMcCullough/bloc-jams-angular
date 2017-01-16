 (function() {
     function AlbumCtrl(Fixtures) {
        this.albumData = albumPicasso;
        this.releaseInfo = function() {
            return this.albumData.year + " " + this.albumData.label;            
        }
     }
 
     angular
         .module('blocJams')
         .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
 })();