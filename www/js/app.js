var popRateApp = angular.module('popRateApp', ['ionic','ionic.service.core', 'ngPercentDisplay'])

.run(function($ionicPlatform, $localstorage) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
        ionic.Platform.fullScreen();
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom');

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
        .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:
    .state('tab.results', {
            url: '/results',
            views: {
                'tab-results': {
                    templateUrl: 'templates/tab-results.html',
                    controller: 'ResultsCtrl'
                }
            }
        })
        .state('tab.result-detail', {
            url: '/results/:resultId',
            views: {
                'tab-results': {
                    templateUrl: 'templates/result-detail.html',
                    controller: 'ResultDetailCtrl'
                }
            }
        })

    .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AccountCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/results');

})

.directive('placeholder', function() {
    return {
        link: function(scope, element, attrs) {
            attrs.$observe('src', function(value) {
                if (value === 'N/A') {
                    attrs.$set('src', attrs.placeholder);
                }
            });
        }
    }
});
