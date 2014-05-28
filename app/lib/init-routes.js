'use strict';

var traceur = require('traceur');
var dbg = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var users = traceur.require(__dirname + '/../routes/users.js');
  var orders = traceur.require(__dirname + '/../routes/orders.js');

  app.get('/', dbg, home.index);

  app.post('/signin', dbg, users.login);
  app.get('/past/:userId', dbg, users.past);

  app.post('/neworder/:userId', dbg, orders.neworder);
  app.put('/add/:orderId/:foodId', dbg, orders.add);
  app.put('/submit/:orderId/:userId', dbg, orders.submit);

  fn();
}
