popRateApp.controller('ResultsCtrl', function($scope, Results, $ionicLoading) {
    $scope.results = [];

    var showLoader = function() {
        $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200
        });
    };

    $scope.search = function(searchTerm) {
        showLoader();
        Results.search(searchTerm).success(function(result) {
            $ionicLoading.hide();
            $scope.results = result.Search;
        });
    };
});
