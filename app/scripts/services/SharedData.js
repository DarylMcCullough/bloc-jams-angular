(function() {
    function SharedData() {
        
        var SharedData = {};
        
        var keys = [];
        var values = [];
        
        SharedData.get(key) {
            for (var i=0; i < keys.length; i++) {
                if (key == keys[i]) {
                    return values[i];
                }
            }
            return null;
        }
        
        SharedData.put(key, value) {
            for (var i=0; i < keys.length; i++) {
                if (key == keys[i]) {
                    values[i] = value;
                    return;
                }
            }
            keys.push(key);
            values.push(value);
        }
        
        return SharedData;
    }
 
    angular
         .module('blocJams')
         .factory('SharedData', SharedData);
 })();