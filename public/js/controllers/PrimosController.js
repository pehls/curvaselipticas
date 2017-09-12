
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
    var Q,P,mensagemC,e,d,n,z;
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
        n = $scope.n;
        $scope.z = (P-1)*(Q-1);
        z=$scope.z;
        $scope.e = coPrimo($scope.z);
        e = $scope.e;
        console.log("\n x=" + coPrimo($scope.z));
        $scope.d = d();
        d=$scope.d;
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
          for (i=1; i<$scope.primos.length; ++i) {
            console.log("MDC = "+mdc($scope.primos[i].numero,x) + "\n + primo = " + $scope.primos[i].numero + "\n x= " + x);
            // if ($scope.primos[i].numero>x+1 ) {
              if (bigInt.gcd($scope.primos[i].numero,x) == 1) {
                return $scope.primos[i].numero;
              }
            // }
          }
      };
      function mdc (a,b) {
        if(b === 0 ) return a;
        return mdc(b, mod(a,b));
      };
      function primo(numero) {
         var status = true;
         for (possivelDivisor = 2; possivelDivisor <= Math.floor(numero / 2); possivelDivisor++) {
           if (numero % possivelDivisor == 0) {  // possível divisor >> divisor
             status = false;
             break;
           }
         }
         return status;
       }
      function mod(x,y) {
        return x%y;
      };
      $scope.$watch('mensagemCifrada', function(value) {
      mensagemC = value;
      //  $scope.e = 35;
      // $scope.d  = 13;
      var mensagemCpwup = mod(Math.pow(mensagemC, $scope.d), $scope.n);
      console.log("pwup = " + mensagemCpwup);
      console.log("\nC = "+bigInt(mensagemC).modPow(d , n));
      // console.log(bigInt(mensagemC).modPow($scope.d,$scope.n));
      $scope.mensagemDecifrada = mensagemCpwup;
      });

});
