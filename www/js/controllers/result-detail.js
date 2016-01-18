popRateApp.controller('ResultDetailCtrl', function($scope, $stateParams, Results, $ionicLoading, $localstorage, $ionicPopup, $location) {
    var getAverage = function(IMDB, metacritic, rottenTomatoes) {
        var amount = 0, ratingSum = 0, averageRating = 0;
        var includesIMDB, includesMetacritic, includesRottenTomatoes = false;
        var settings = $localstorage.getObject('settings');
        $scope.detailsLoaded = false;

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

    var resultId = $stateParams.resultId;

    var getDetails = function(resultId) {
        Results.get(resultId).then(function(response) {
            $ionicLoading.hide();
            var result = response.data;
            $scope.rating = getAverage(result.imdbRating, result.Metascore, result.tomatoMeter);
            $scope.result = result;
            $scope.detailsLoaded = true;
        }, function(error) {
            $ionicLoading.hide();
            $scope.showConfirm(resultId);
        });
    };

    $scope.$on('$ionicView.enter', function() {
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200
        });
        
        getDetails(resultId);
    });

    $scope.showConfirm = function(resultId) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Retry',
            template: 'Connection failure. Retry?',
            okText: 'Yes',
            cssClass: 'custom-popup'
        });

        confirmPopup.then(function(res) {
            if(res) {
                getDetails(resultId);
            } else {
                $location.path('/');
            }
        });
    };
});

