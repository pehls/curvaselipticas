angular.module('auditoriaeseguranca').factory('Primo', function($resource) {

	return $resource('/primos');
});
