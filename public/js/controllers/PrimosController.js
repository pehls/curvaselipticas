
angular.module('auditoriaeseguranca').controller('PrimosController',

  function(Primo, $scope) {
    $scope.primos = [];

    $scope.filtro = '';

    function buscaPrimos() {
      Primo.query(
        function(primos) {
          $scope.primos = primos;
          $scope.mensagem = {};
        },
        function(erro) {
          console.log(erro);
          $scope.mensagem = {
            texto: 'Não foi possível obter a lista'
          };
        }
      );
    }
    buscaPrimos();
    var Q,P;
      $scope.$watch('selectedP', function(value) {
        console.log($scope.primos[value-1].numero);
        Q=$scope.primos[value-1].numero;
      });
      $scope.$watch('selectedQ', function(value) {
        console.log($scope.primos[value-1].numero);
        P=$scope.primos[value-1].numero;
      });
      $scope.decifrar = function () {
        $scope.n = P*Q;
        $scope.z = (P-1)*(Q-1);
        $scope.e = coPrimo($scope.z);
        $scope.d = d();
        // var BI2 = int2bigInt(2, 1, 1);
        // var BI3 = GCD(BI1, BI2);
        // console.log(BI3);
      };
      function d() {
        for (i=1; i<1000; ++i) {
          if(mod(((i*$scope.z)+1),$scope.e)==0) {
            return (i*$scope.z+1)/$scope.e;
          }
        }
      }
      function coPrimo(x) {
          for (i=0; i<$scope.primos.length; ++i) {
            if ($scope.primos[i].numero>x+1 ) {
              if (mdc($scope.primos[i].numero,x) == 1) {
                return $scope.primos[i].numero;
              }
            }
          }
      };
      function mdc (x,y) {
        var resp = 0;
        do {
          resto = mod(x,y);
          x=y;
          y=resto;
        }while(resto!= 0);
        return x;
      };
      function mod(x,y) {
        return x%y;
      };

});
