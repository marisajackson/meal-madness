'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');

exports.login = (req, res)=>{
  User.login(req.body.username, user => {
   console.log(user);
    user.save(()=>{
      res.render('users/dashboard', {user:user});
    });
  });
};

exports.past = (req, res)=>{
  User.findByUserId(req.params.userId, user=>{
    user.getOrders(orders=>{
      console.log(orders);
    });
  });
};
