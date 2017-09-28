
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
    var Q,P,mensagemC,E,D,N,Z;
      $scope.$watch('selectedP', function(value) {
        console.log($scope.primos[value-1].numero);
        Q=$scope.primos[value-1].numero;
      });
      $scope.$watch('selectedQ', function(value) {
        console.log($scope.primos[value-1].numero);
        P=$scope.primos[value-1].numero;
        $scope.z = (P-1)*(Q-1)
      });
      $scope.$watch('selectedE', function(value) {
        console.log(value);
        if (value!=Q && value!=P ) {
         if (mdc(value,$scope.z) == 1) {
           $scope.mensagem = {texto: ''};
           E=value;
         } else {
           $scope.mensagem = {texto: 'número E não é co-primo de Z!'}
         }
       } else {
         $scope.mensagem = {texto: 'número E igual a P ou Q!'}
       }

      });
      $scope.decifrar = function () {
        $scope.n = P*Q;
        N = $scope.n;
        $scope.z = (P-1)*(Q-1);
        Z=$scope.z;
        // $scope.e = coPrimo($scope.z);
        // E = $scope.e;
        console.log("\n x=" + coPrimo($scope.z));
        $scope.d = d();
        D=$scope.d;
        $scope.en= "("+E+","+$scope.n+")";
        $scope.dn= "("+$scope.d+","+$scope.n+")";
        // var BI2 = int2bigInt(2, 1, 1);
        // var BI3 = GCD(BI1, BI2);
        // console.log(BI3);
      };
      function d() {
        for (i=1; i<1000; ++i) {
          if(mod(((i*$scope.z)+1),E)==0) {
            return (i*$scope.z+1)/E;
          }
        }
      }
      /**
      *método está errado
      */
      function coPrimo(x) {
          for (i=1; i<$scope.primos.length; ++i) {
            console.log("MDC = "+mdc($scope.primos[i].numero,x) + "\n + primo = " + $scope.primos[i].numero + "\n x= " + x);
             if ($scope.primos[i].numero!=Q && $scope.primos[i]!=P ) {
              if (mdc($scope.primos[i].numero,x) == 1) {
                return $scope.primos[i].numero;
              }
             }
          }
      };
      function mdc (a,b) {
        if(b === 0 ) return a;
        return mdc(b, a%b);
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
      function toBinaryArray(x) {
        var string =  parseInt( x, 10 ).toString( 2 );
        var i = 0;
        var frase = new Array();

        for ( i=0; i < string.length ; i++ )
	         frase[i] = string.charAt(i);
        return frase.reverse();
      }
      function encontrarUns(x) {
        var uns = new Array();
        var j=0;
        for(i=0; i<x.length; i++) {
	          if(x[i]==1) {
		            uns[j] = i;
		              j++;
                }
              }
              return uns;
        }
        function aplicarFormula (uns, value) {
           var result=1;
           if (uns!= NaN)
           for (i=0; i<uns.length; i++) {
             var temp = value;
             if (uns[i]!=0) {
             for (j=0; j<uns[i]; j++) {
               temp = Math.pow(temp,2) % N;
             }
           }
           uns[i] = temp;
         }
          var i = 0;
          var temp = 1;
          while (i<uns.length) {
                 temp = temp * uns[i];
                 i++;
          }
          return temp%N;
        }
        function decifrar (y) {
            return aplicarFormula(encontrarUns(toBinaryArray(D)), y);
        }
        function cifrar (y) {
            return aplicarFormula(encontrarUns(toBinaryArray(E)), y);
        }
      $scope.$watch('mensagemCifrada', function(value) {

      // console.log("\nC = "+bigInt(mensagemC).modPow(d , n));
      // console.log(bigInt(mensagemC).modPow($scope.d,$scope.n));
      console.log(decifrar(value));
      $scope.mensagemDecifrada = decifrar(value);
      });
});
