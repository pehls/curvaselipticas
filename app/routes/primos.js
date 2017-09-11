module.exports = function (app) {

  var controller = app.controllers.primos;

  app.route('/primos')
  	.get(controller.listaPrimos)


};
