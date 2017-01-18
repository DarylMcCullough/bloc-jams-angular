(function() {
    function SongPlayer(Fixtures) {
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
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
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

        
         /**
          * @desc current song object (or null if no song has been selected)
          * @type {Object}
          */
         SongPlayer.currentSong = null;
        
        
        /**
         * @function play
         * @desc stops the currently playing song (if any) and plays the given song, making it the current song
         * @param {Object} song
         */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                //currentBuzzObject.play();
                //song.playing = true;
                playSong();
            }  else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    //currentBuzzObject.play();
                    //song.playing = true;
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
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong();
            }
        };
        
        return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();