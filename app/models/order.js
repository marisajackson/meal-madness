'use strict';

// var traceur = require('traceur');
// var users = global.nss.db.collection('users');
var orders = global.nss.db.collection('orders');
var _ = require('lodash');
var Mongo = require('mongodb');
// var User = traceur.require(__dirname + '/../models/user.js');

class Order {
  constructor(userId){
    this.userId = userId;
    this.items = {};
    this.total = 0;
    this.cals = 0;
    this.date = new Date();
  }

  save(fn){
    orders.save(this, ()=>fn());
  }

  add(food, qty, fn){
    this.total += (food.cost*qty);
    this.cals += (food.calories*qty);
    this.items[food.name] = qty;
    fn(this);
  }

  // static findByUserId(userId, fn){
  //   userId = Mongo.ObjectID(userId);
  //   users.findOne({_id:userId}, (err, user)=>{
  //     user = _.create(User.prototype, user);
  //     fn(user);
  //   });
  // }

  static findByOrderId(orderId, fn){
    orderId = Mongo.ObjectID(orderId);
    orders.findOne({_id:orderId}, (err, order)=>{
      order = _.create(Order.prototype, order);
      fn(order);
    });
  }
}

module.exports = Order;
