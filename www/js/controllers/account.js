popRateApp.controller('AccountCtrl', function($scope, $localstorage) {
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
