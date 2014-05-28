/* jshint unused: false */

function ajax(url, type, data={}, success=r=>console.log(r), dataType='html'){
  'use strict';
  $.ajax({
    url: url,
    type: type,
    dataType: dataType,
    data: data,
    success: success
  });
}

(function(){
  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $('#signin').click(signIn);
    $('#dashboard').on('click', '#makenew', newOrder);
    $('#neworder').on('click', '.add', addFood);
    $('#dashboard').on('click', '#placeorder', placeOrder);
    $('#dashboard').on('click', '#viewpast', viewPast);
  }

  function viewPast(){
    var user = $('#name').attr('data-id');
    ajax(`/past/${user}`, 'get', null, html=>{
      $('#pastorders').empty().append(html);
    });
  }

  function placeOrder(){
    var orderId = $('.neworder').attr('data-id');
    var user = $('#name').attr('data-id');
    ajax(`/submit/${orderId}/${user}`, 'put', null, ()=>{
      $('#currentOrder').empty();
      newOrder();
    });
  }

  function addFood(){
    var orderId = $('.neworder').attr('data-id');
    var foodId = $(this).attr('data-id');
    var qty = $(this).parent().siblings().children().val();
    ajax(`/add/${orderId}/${foodId}`, 'put', {qty: qty}, html=>{
      $('#currentOrder').empty().append(html);
    });
  }

  function newOrder(){
    var user = $('#name').attr('data-id');
    ajax(`/neworder/${user}`, 'post', null, html=>{
      $('#neworder').empty().append(html);
    });
  }

  function signIn(){
    var username = $('#username').val();
    ajax('/signin', 'post', {username: username}, html=>{
      $('#dashboard').empty().append(html);
    });
  }




  // var socket;
  //
  // function initialize(){
  //   initializeSocketIo();
  // }
  //
  // function initializeSocketIo(){
  //   socket = io.connect('/app');
  // }

})();
