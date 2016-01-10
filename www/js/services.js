angular.module('popRateApp.services', [])

.factory('Results', function($http) {
    var urlBase = 'http://www.omdbapi.com/?';
    var returnType = 'json';
    var dataFactory = {};

    dataFactory.search = function(searchTerm) {
        return $http.get(urlBase + 's=' + searchTerm + '&tomatoes=true&r=' + returnType);
    };

    dataFactory.get = function(resultId) {
        return $http.get(urlBase + 'i=' + resultId + '&tomatoes=true&plot=short&r=' + returnType);
    };

    return dataFactory;
})

.factory('$localstorage', function($window) {
    return {
        set: function(key, value) {
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
            return JSON.parse($window.localStorage[key] || '{}');
        }
    }
});
