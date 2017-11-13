
angular.module('auditoriaeseguranca').controller('PrimosController',

  function(Primo, $scope) {
    var pontos = [];
    var intermediario = [];
    var quadrados = [];
    $scope.filtro = '';

    var P,A,B,GRUPO,FUNCAOP1, FUNCAOP2,FUNCAOQ1, FUNCAOQ2,FUNCAO,X3,Y3, X;
      $scope.$watch('selectedP', function(value) {
        console.log(value);
        P=Number(value);
      });
      $scope.$watch('selectedA', function(value) {
        console.log(value);
        A=Number(value);
      });
      $scope.$watch('selectedB', function(value) {
        console.log(value);
        B=Number(value);
      $scope.funcao = "(x³ + "+A+"x + " + B + ")(mod "+P+")";
      });
      $scope.$watch('selectedX', function(value) {
        console.log(value);
        X=Number(value);
      });
      $scope.$watch('selectedP1', function(value) {
        console.log(value);
        FUNCAOP1=Number(value);
      });
      $scope.$watch('selectedP2', function(value) {
        console.log(value);
        FUNCAOP2=Number(value);
      });
      $scope.$watch('selectedQ1', function(value) {
        console.log(value);
        FUNCAOQ1=Number(value);
      });
      $scope.$watch('selectedQ2', function(value) {
        console.log(value);
        FUNCAOQ2=Number(value);
      });
      $scope.calcular = function () {
        encontrarPontos();
        var crivos = encontrarCrivos();
        console.log(crivos);
        //falta calcular, conforme a e b, a formula de acordo com todos os crivos
        var grupo = encontrarGrupo(crivos);
        GRUPO = grupo;
        console.log(grupo);
        console.log(GRUPO);
        $scope.grupo =  grupo;
        $scope.mensagemDecifrada = "Ponto de infinitude não está no grupo!";
        if (FUNCAOP1!=FUNCAOQ1 || FUNCAOP2!=FUNCAOQ2) {
          alfa = pdiferenteDeq(FUNCAOP1, FUNCAOP2, FUNCAOQ1, FUNCAOQ2);
          X3 = x3igual(alfa, FUNCAOP1, FUNCAOQ1);
          $scope.x3 = X3;
          Y3 = y3igual(alfa, FUNCAOP1, X3, FUNCAOP2);
          $scope.y3 = Y3;
        }
        if (FUNCAOP1==FUNCAOQ1 && FUNCAOP2==FUNCAOQ2) {
          alfa = pigualq(FUNCAOP1, A, FUNCAOP2);
          X3 = x3igual(alfa, FUNCAOP1, FUNCAOP1);
          $scope.x3 = X3;
          Y3 = y3igual(alfa, FUNCAOP1, X3, FUNCAOP2);
          $scope.y3 = Y3;
        }

        //$scope.mensagem.texto = "Calculando com "+grupo[0] + " e "+ grupo[1];
      };
      $scope.calcularpmenosq = function () {
        encontrarPontos();
        var crivos = encontrarCrivos();
        console.log(crivos);
        //falta calcular, conforme a e b, a formula de acordo com todos os crivos
        var grupo = encontrarGrupo(crivos);
        GRUPO = grupo;
        console.log(grupo);
        console.log(GRUPO);
        $scope.grupo = grupo;
        FUNCAOQ2 = P - FUNCAOQ2;
        if (FUNCAOP1!=FUNCAOQ1 || FUNCAOP2!=FUNCAOQ2) {
          alfa = pdiferenteDeq(FUNCAOP1, FUNCAOP2, FUNCAOQ1, FUNCAOQ2);
          X3 = x3igual(alfa, FUNCAOP1, FUNCAOQ1);
          $scope.x3 = X3;
          Y3 = y3igual(alfa, FUNCAOP1, X3, FUNCAOQ1);
          $scope.y3 = Y3;
        }
        if (FUNCAOP1==FUNCAOQ1 && FUNCAOP2==FUNCAOQ2) {
          alfa = pigualq(FUNCAOP1, A, FUNCAOP2);
          X3 = x3igual(alfa, FUNCAOP1, FUNCAOP1);
          $scope.x3 = X3;
          Y3 = y3igual(alfa, FUNCAOP1, X3, FUNCAOP2);
          $scope.y3 = Y3;
        }


      };
      $scope.calcularxvezesp = function () {
        var doisp = [];
        var respx, respy;
        var n = X/2;
        alfa = pigualq(FUNCAOP1, A, FUNCAOP2);
        var x1 = x3igual(alfa, FUNCAOP1, FUNCAOP1);
        doisp[0] = x1;
        var y1 = y3igual(alfa, FUNCAOP1, X3, FUNCAOP2);
        doisp[1] = y1;
        n = n - 1;
        while (n > 0) {
          alfa = pigualq(x1, A, y1);
          var x32 = x3igual(alfa, x1, doisp[0]);
          y1 = y3igual(alfa, x1, x32, y1);
          x1 = x32;
          n = n - 1;
        }


        $scope.mensagemDecifrada = "["+x1+","+y1+"] em função de P " + FUNCAOP1 + ","+ FUNCAOP2;
      };
      function encontrarGrupo(crivos) {
        var grupo = [];
        var i = 0;
        for (j = 0; j< crivos.length; ++j) {
          n = mod(formulaGrupo(crivos[j]), P);
          if (n%Math.trunc(n) >= 1 || n%Math.trunc(n) === 0) {
            grupo[i] = [crivos[j], n]
            i = i+1;
            n = normalize(mod(-1*formulaGrupo(crivos[j]), P));
            if (n%Math.trunc(n) >= 1 || n%Math.trunc(n) === 0) {
              grupo[i] = [crivos[j], n]
              i = i+1;
            }
          }
        }
        return grupo;
      }
      function formulaGrupo(x) {
        return Math.sqrt((x*x*x)+A*x+B);
      }
      function encontrarCrivos() {
        var crivos = [];
        var indice = 0;
        for (i = 0; i< quadrados.length; ++i) {
          for (j = 0; j< intermediario.length; ++j) {
            for (k = 0; k< pontos.length; k++) {
              if ((pontos[k] + intermediario[j]) == quadrados[i]) {
                if (crivos.indexOf(pontos[k])==-1) {
                  crivos[indice] = pontos[k];
                  indice = indice + 1;
                }
              }
            }

          }
        }
        return crivos;
      }
      function encontrarPontos() {
        var j = 1;
        for (i = 0; i<P; ++i) {
          pontos[i] = i;
          intermediario[i] = (j * P);
          quadrados[i] = Math.pow((j),2);
          j = j + 1;
        }
      }

      function pdiferenteDeq(x1,y1,x2,y2) {
        return (y2-y1)/(x2-x1);
      }
      function pigualq(x1,a,y1) {
        return ((3*Math.pow(x1,2))+a)/(2*y1);
      }
      function x3igual (alfa, x1, x2) {
        console.log(Math.pow(alfa,2) - x1 - x2);
        var n = normalize(Math.pow(alfa,2) - x1 - x2);
        var resp = (n % P);
        return resp;
      }
      function y3igual (alfa,x1,x3,y1) {
        return mod(normalize(alfa*(x1-x3)-y1), P);
      }


    function normalize (n) {
      while (n < 0) {
        n = n + P;
      }
      return n;
    }

      function mod(x,y) {
        return x%y;
      };

});
