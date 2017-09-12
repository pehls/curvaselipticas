
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
    var Q,P,mensagemC;
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
        $scope.e = 35;//coPrimo($scope.z);
        console.log("\n x=" + coPrimo($scope.z));
        $scope.d = d();
        $scope.en= "("+$scope.e+","+$scope.n+")";
        $scope.dn= "("+$scope.d+","+$scope.n+")";
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
      /**
      *método está errado
      */
      function coPrimo(x) {
          for (i=0; i<$scope.primos.length; ++i) {
            console.log("MDC = "+mdc($scope.primos[i].numero,x) + "\n + primo = " + $scope.primos[i].numero + "\n x= " + x);
            // if ($scope.primos[i].numero>x+1 ) {
              if (mdc($scope.primos[i].numero,x) == 1) {
                return $scope.primos[i].numero;
              }
            // }
          }
      };
      function mdc (x,y) {
        var resto = 1;
        do {
          resto = mod(x,y);
          x = y;
          y = resto;
        } while (resto!=0);
      return x;
      };
      function mod(x,y) {
        return x%y;
      };
      $scope.$watch('mensagemCifrada', function(value) {
      mensagemC = value;
       $scope.e = 35;
      // $scope.d  = 13;
      var mensagemCpwup = mod(Math.pow(mensagemC, $scope.d),$scope.n);
      console.log("pwup = " + mensagemCpwup);
      // console.log(bigInt(mensagemC).modPow($scope.d,$scope.n));
      $scope.mensagemDecifrada = mensagemCpwup;
      });

});
