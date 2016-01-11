popRateApp.controller('ResultDetailCtrl', function($scope, $stateParams, Results, $ionicLoading, $localstorage) {
    var getAverage = function(IMDB, metacritic, rottenTomatoes) {
        var amount = 0, ratingSum = 0, averageRating = 0;
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

        if(ratingSum === 0) {
            $scope.showRatingCircle = false;
            averageRating = 'N/A'
        } else {
            $scope.showRatingCircle = true;
            averageRating = (ratingSum / amount).toFixed();
        }

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
});

