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
            
            currentBuzzObject.bind("ended", function() {
                SongPlayer.next();
            });
            
            if (SongPlayer.muted) {
                currentBuzzObject.mute();
            }

            SongPlayer.currentSong = song;
            SongPlayer.artist = currentAlbum.artist;
            SongPlayer.title = song.title;
            SongPlayer.duration = song.duration;
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
        
       /**
        * @desc Name of currently playing song
        * @type {String}
        */
        SongPlayer.title = null;
        
       /**
        * @desc Name of artist of current album
        * @type {String}
        */
        SongPlayer.artist = null;
        
       /**
        * @desc Duration of current song
        * @type {String}
        */
        SongPlayer.duration = null;
        
       /**
        * @desc Current volume (on a scale of 0-100)
        * @type {Number}
        */
        SongPlayer.volume = 40;
        
        
       /**
        * @desc Indicates whether the current song is muted
        * @type {Boolean}
        */
        SongPlayer.muted = false;  
        
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
         * @function mute
         * @desc mutes the currently playing song (if any)
         */
         SongPlayer.mute = function() {
             SongPlayer.muted = true;
             if (currentBuzzObject) {
                 currentBuzzObject.mute();
             }
            
         };
        
        /**
         * @function unmute
         * @desc unmutes the currently playing song (if any)
         */
         SongPlayer.unmute = function() {
             SongPlayer.muted = false;
             if (currentBuzzObject) {
                 currentBuzzObject.unmute();
             }
            
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
        
        /**
         * @function setVolume
         * @desc Set volume of currently playing song (on a scale of 1-100)
         * @param {Number} volume
         */
        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
            SongPlayer.volume = volume;
        };
        
        return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();