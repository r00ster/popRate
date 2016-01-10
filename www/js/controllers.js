angular.module('popRateApp.controllers', [])

.controller('ResultsCtrl', function($scope, Results, $ionicLoading) {
    $scope.results = [];

    var show = function() {
        $scope.loading = $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200
        });
    };

    var hide = function() {
        $scope.loading.hide();
    };

    $scope.search = function(searchTerm) {
        show();
        Results.search(searchTerm).success(function(result) {
            hide();
            $scope.results = result.Search;
        });
    };
})

.controller('ResultDetailCtrl', function($scope, $stateParams, Results, $ionicLoading, $localstorage) {
    var getAverage = function(IMDB, metacritic, rottenTomatoes) {
        var amount = 0;
        var ratingSum = 0;
        var includesIMDB, includesMetacritic, includesRottenTomatoes = false;
        var settings = $localstorage.getObject('settings');

        $scope.available = {
            IMDB: true,
            metacritic: true,
            rottenTomatoes:true 
        };

        if(settings.IMDB !== false) { 
            if(IMDB !== 'N/A') {
                amount += 1;
                ratingSum += parseInt(IMDB * 10);
                includesIMDB = true;
            } else {
                $scope.available.IMDB = false;
            }
        }
        if(settings.rottenTomatoes !== false) {
            if(rottenTomatoes !== 'N/A') {
                amount += 1;
                ratingSum += parseInt(rottenTomatoes);
                includesRottenTomatoes = true;
            } else {
                $scope.available.rottenTomatoes = false;
            }
        }
        if(settings.metacritic !== false) {
            if(metacritic!== 'N/A') {
                amount += 1;
                ratingSum += parseInt(metacritic);
                includesMetacritic = true;
            } else {
                $scope.available.metacritic = false;
            }
        }

        var averageRating = ratingSum === 0 ? 'N/A' : (ratingSum / amount).toFixed();

        return {
            'average': averageRating,
            'includesIMDB': includesIMDB,
            'includesMetacritic': includesMetacritic,
            'includesRottenTomatoes': includesRottenTomatoes 
        };
    };

    $scope.$on('$ionicView.enter', function() {
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200
        });

        Results.get($stateParams.resultId).success(function(result) {
            $ionicLoading.hide();
            $scope.rating = getAverage(result.imdbRating, result.Metascore, result.tomatoMeter);
            $scope.result = result;
        });
    });
})

.controller('AccountCtrl', function($scope, $localstorage) {
    $scope.$on('$ionicView.enter', function() {
        if ($localstorage.get('settings') !== undefined) {
            $scope.settings = $localstorage.getObject('settings');
        } else {
            $scope.settings = {
                IMDB: true,
                metacritic: true,
                rottenTomatoes: true
            };
            $localstorage.setObject('settings', $scope.settings);
        }
    });

    $scope.saveSettings = function() {
        $localstorage.setObject('settings', $scope.settings);
    };
});
