(function() {
    function SongPlayer() {
         /**
          * @desc Song playing service
          * @type {Object}
          */
        var SongPlayer = {};
        
         /**
          * @desc current song object (or null if no song has been selected)
          * @type {Object}
          */
         var currentSong = null;
        
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
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
        };
        
        /**
         * @function playSong
         * @desc Plays the currentBuzzObject, and updates the .playing attribute of the current song
         */
        var playSong = function() {
            if (currentBuzzObject) {
                currentBuzzObject.play();
                if (currentSong) {
                    currentSong.playing = true;
                }
            }
        }
        
        
        /**
         * @function play
         * @desc stops the currently playing song (if any) and plays the given song, making it the current song
         * @param {Object} song
         */
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                //currentBuzzObject.play();
                //song.playing = true;
                playSong();
            }  else if (currentSong === song) {
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
             currentBuzzObject.pause();
             song.playing = false;
         };
        
        return SongPlayer;
     }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();