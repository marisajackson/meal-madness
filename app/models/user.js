'use strict';

var traceur = require('traceur');
var users = global.nss.db.collection('users');
var _ = require('lodash');
var Mongo = require('mongodb');
var Order = traceur.require(__dirname + '/../models/order.js');

class User {
  constructor(username){
    this.username = username;
    this.orders = [];
  }

  save(fn){
    users.save(this, ()=>fn());
  }

  place(orderId, fn){
    this.orders.push(orderId);
    fn(this);
  }

  getOrders(fn){
    var userOrders = [];
    for(var i = 0; i < this.orders.length; i++){
      Order.findByOrderId(this.orders[i], order=>{
        userOrders.push(order);
      });
    }
    console.log(userOrders);
    fn(userOrders);
  }

  static login(username, fn){
    username = username.trim().toLowerCase();
    users.findOne({username:username}, (err, user)=>{
      if(user){
        user = _.create(User.prototype, user);
        fn(user);
      } else {
        user = new User(username);
        fn(user);
      }
    });
  }

  static findByUserId(userId, fn){
    userId = Mongo.ObjectID(userId);
    users.findOne({_id:userId}, (err, user)=>{
      user = _.create(User.prototype, user);
      fn(user);
    });
  }
}

module.exports = User;
