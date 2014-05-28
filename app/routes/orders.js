'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');
var Order = traceur.require(__dirname + '/../models/order.js');
var foods = global.nss.db.collection('foods');
var Mongo = require('mongodb');

exports.neworder = (req, res)=>{
  foods.find({type: 'lunch'}).toArray((err, lunch)=>{
    foods.find({type: 'breakfast'}).toArray((err, breakfast)=>{
      foods.find({type: 'dinner'}).toArray((err, dinner)=>{
        foods.find({type: 'drink'}).toArray((err, drink)=>{
          var order = new Order(req.params.userId);
          order.save(()=>{
            res.render('order/new', {order: order, lunch: lunch, breakfast: breakfast, dinner: dinner, drink: drink});
          });
        });
      });
    });
  });
};

exports.add = (req, res)=>{
  Order.findByOrderId(req.params.orderId, order=>{
    var foodId = Mongo.ObjectID(req.params.foodId);
    foods.findOne({_id:foodId}, (err, food)=>{
      order.add(food, req.body.qty, (order)=>{
        order.save(()=>{
          var keys = Object.keys(order.items);
          res.render('order/current', {order:order, keys: keys});
        });
      });
    });
  });
};

exports.submit = (req, res)=>{
  User.findByUserId(req.params.userId, user=>{
      user.place(req.params.orderId, user=>{
        user.save(()=>{
          res.send();
        });
      });
  });
};
