popRateApp.factory('Results', function($http) {
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
});
