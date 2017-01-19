(function() {
    function SongPlayer($rootScope, Fixtures) {
         /**
          * @desc Song playing service
          * @type {Object}
          */
        var SongPlayer = {};
        
         /**
          * @desc Current album being played
          * @type {Object}
          */        
        var currentAlbum = Fixtures.getAlbum();
                
         /**
          * @desc Buzz object audio file
          * @type {Object}
          */
         var currentBuzzObject = null;
        
        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function(song) {
            stopSong();
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });

            SongPlayer.currentSong = song;
        };
        
        
        /**
         * @function playSong
         * @desc Plays the currentBuzzObject, and updates the .playing attribute of the current song
         */
        var playSong = function() {
            if (currentBuzzObject) {
                currentBuzzObject.play();
                if (SongPlayer.currentSong) {
                    SongPlayer.currentSong.playing = true;
                }
            }
        }
        
        /**
         * @funcion getSongIndex
         * @desc returns the index of the current song
         */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        var stopSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
            }
            if (SongPlayer.currentSong) {
                SongPlayer.currentSong.playing = null;
            }
            currentBuzzObject = null;
            SongPlayer.currentSong = null; 
        }

        
         /**
          * @desc current song object (or null if no song has been selected)
          * @type {Object}
          */
         SongPlayer.currentSong = null;
        
       /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        
        SongPlayer.artist = function() {
            if (currentAlbum) {
                if (SongPlayer.currentSong) {
                    return currentAlbum.artist;
                }
            }
            return "";
        }
        
        SongPlayer.currentSongTitle = function() {
            if (SongPlayer.currentSong) {
                return SongPlayer.currentSong.title;
            } else {
                return "";
            }
        }
        
        
        /**
         * @function play
         * @desc stops the currently playing song (if any) and plays the given song, making it the current song
         * @param {Object} song
         */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong();
            }  else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong();
                }
            }          
         };
        
        /**
         * @function pause
         * @desc pauses the currently playing song (if any)
         * @param {Object} song
         */
         SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
             currentBuzzObject.pause();
             song.playing = false;
         };
        
        /**
         * @function previous
         * @desc sets the current song to the previous song on the current album, and plays it
         */
        
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            if (currentSongIndex < 0) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong();
            }
        };
        /**
         * @function next
         * @desc sets the current song to the next song on the current album, and plays it
         */
        
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            var numSongs = currentAlbum.songs.length;
            if (currentSongIndex >= numSongs) {
                stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong();
            }
        };
        
        /**
         * @function setCurrentTime
         * @desc Set current time (in seconds) of currently playing song
         * @param {Number} time
         */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();