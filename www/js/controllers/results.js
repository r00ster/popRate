popRateApp.controller('ResultsCtrl', function($scope, Results, $ionicLoading, $ionicPopup) {
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
        Results.search(searchTerm).then(function(response) {
            $ionicLoading.hide();
            var result = response.data;
            $scope.results = result.Search;
        }, function(error) {
            $ionicLoading.hide();
            $scope.showConfirm(searchTerm);
        });
    };

    $scope.showConfirm = function(searchTerm) {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Retry',
            template: 'Connection failure. Retry?',
            okText: 'Yes',
            cssClass: 'custom-popup'
        });

        confirmPopup.then(function(res) {
            if(res) {
                $scope.search(searchTerm);
            } else {
                console.log('Cancelled');
            }
        });
    };
});
