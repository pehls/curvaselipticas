angular.module('auditoriaeseguranca',['ngRoute', 'ngResource'])
  .config(function($routeProvider) {

    $routeProvider.when('/primos', {
      templateUrl: 'partials/primos.html',
      controller: 'PrimosController'
    });



    $routeProvider.otherwise({redirectTo: '/primos'});
});
