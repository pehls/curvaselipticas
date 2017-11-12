
angular.module('auditoriaeseguranca').controller('PrimosController',

  function(Primo, $scope) {
    var pontos = [];
    var intermediario = [];
    var quadrados = [];
    $scope.filtro = '';

    var P,A,B,GRUPO,FUNCAOP,FUNCAOQ,FUNCAO,X3,Y3, X;
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
      $scope.calcular = function () {
        encontrarPontos();
        var crivos = encontrarCrivos();
        console.log(crivos);
        //falta calcular, conforme a e b, a formula de acordo com todos os crivos
        var grupo = encontrarGrupo(crivos);
        GRUPO = grupo;
        console.log(grupo);
        console.log(GRUPO);
        $scope.grupo = grupo;
        if (grupo[0]!=undefined) {
            $scope.funcaop = grupo[0];
            if (grupo[1]!=undefined) {
                $scope.funcaoq = grupo[1];
            } else {
              $scope.funcaoq = grupo[0];
            }
        } else {
          $scope.funcaoq = undefined;
          $scope.funcaop = undefined;
        }
        if ($scope.funcaop!=$scope.funcaoq) {
          alfa = pdiferenteDeq($scope.funcaop[0], $scope.funcaop[1], $scope.funcaoq[0], $scope.funcaoq[1]);
          X3 = x3igual(alfa, $scope.funcaop[0], $scope.funcaop[1]);
          $scope.x3 = X3;
          Y3 = y3igual(alfa, $scope.funcaop[0], X3, $scope.funcaoq[0]);
          $scope.y3 = Y3;
        }
        if ($scope.funcaop==$scope.funcaoq) {
          alfa = pigualq($scope.funcaop[0], A, $scope.funcaoq[0]);
          X3 = x3igual(alfa, $scope.funcaop[0], $scope.funcaop[1]);
          $scope.x3 = X3;
          Y3 = y3igual(alfa, $scope.funcaop[0], X3, $scope.funcaoq[0]);
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
        if (grupo[0]!=undefined) {
            $scope.funcaop = grupo[0];
            if (grupo[1]!=undefined) {
              grupo[1][1] = P - grupo[1][1];
                $scope.funcaoq = grupo[1];
            } else {
              $scope.funcaoq = grupo[0];
            }
        } else {
          $scope.funcaoq = undefined;
          $scope.funcaop = undefined;
        }
        if ($scope.funcaop!=$scope.funcaoq) {
          alfa = pdiferenteDeq($scope.funcaop[0], $scope.funcaop[1], $scope.funcaoq[0], $scope.funcaoq[1]);
          X3 = x3igual(alfa, $scope.funcaop[0], $scope.funcaop[1]);
          $scope.x3 = X3;
          Y3 = y3igual(alfa, $scope.funcaop[0], X3, $scope.funcaoq[0]);
          $scope.y3 = Y3;
        }
        if ($scope.funcaop==$scope.funcaoq) {
          alfa = pigualq($scope.funcaop[0], A, $scope.funcaoq[0]);
          X3 = x3igual(alfa, $scope.funcaop[0], $scope.funcaop[1]);
          $scope.x3 = X3;
          Y3 = y3igual(alfa, $scope.funcaop[0], X3, $scope.funcaoq[0]);
          $scope.y3 = Y3;
        }

      };
      $scope.calcularxvezesp = function () {
        var doisp = [];
        var n = X/2;
        var x1 = $scope.funcaop[0];
        var y1 = $scope.funcaop[1]
        alfa = pigualq(x1, x1, x1);
        X3 = x3igual(alfa, x1, x1);
        doisp[0] = X3;
        Y3 = y3igual(alfa, x1, X3, y1);
        doisp[1] = Y3;
        n = n - 1;
        while (n>0) {
          if (doisp[0]!=x1 || doisp[1]!=y1) {
            alfa = pdiferenteDeq(doisp[0], doisp[1], x1, y1);
            x1 = x3igual(alfa, doisp[0], doisp[1]);
            y1 = y3igual(alfa, doisp[0], X3, x1);

          } else
          if (doisp[0]==x1 && doisp[1]==y1) {
            alfa = pigualq(doisp[0], A, doisp[0]);
            x1 = x3igual(alfa,doisp[0], x1);
            y1 = y3igual(alfa, doisp[0], X3, doisp[0]);
          }
          n = n - 1;
        }

        $scope.mensagemDecifrada = "["+x1+","+y1+"] em função de P"
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

      function pdiferenteDeq(x1,x2,y1,y2) {
        return (y2-y1)/(x2-x1);
      }
      function pigualq(x1,a,y1) {
        return ((3*Math.pow(x1,2))+a)/(2*y1);
      }
      function x3igual (alfa, x1, x2) {
        return mod(normalize(Math.pow(alfa,2) - x1 - x2), P);
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
