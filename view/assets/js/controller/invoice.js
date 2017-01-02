var MyApp=angular.module('invoice',
        [     
             'ngAnimate',
             'ngSanitize', 
             'ui.bootstrap'
            //'angular-loading-bar'
        ]);

        
MyApp.controller('AlertDemoCtrl',['$scope', '$window', '$http', 
    function ($scope, $window, $http) 
{

 //invoice code //
 $scope.h1="gg";
   $scope.alerts = [
    { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
    { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
  ];

  $scope.addAlert = function() {
    $scope.alerts.push({msg: 'Another alert!'});
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
}]);