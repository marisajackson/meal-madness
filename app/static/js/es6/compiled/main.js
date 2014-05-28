function ajax(url, type) {
  'use strict';
  var data = arguments[2] !== (void 0) ? arguments[2] : {};
  var success = arguments[3] !== (void 0) ? arguments[3] : (function(r) {
    return console.log(r);
  });
  var dataType = arguments[4] !== (void 0) ? arguments[4] : 'html';
  $.ajax({
    url: url,
    type: type,
    dataType: dataType,
    data: data,
    success: success
  });
}
(function() {
  'use strict';
  $(document).ready(initialize);
  function initialize() {
    $('#signin').click(signIn);
    $('#dashboard').on('click', '#makenew', newOrder);
    $('#neworder').on('click', '.add', addFood);
    $('#dashboard').on('click', '#placeorder', placeOrder);
    $('#dashboard').on('click', '#viewpast', viewPast);
  }
  function viewPast() {
    var user = $('#name').attr('data-id');
    ajax(("/past/" + user), 'get', null, (function(html) {
      $('#pastorders').empty().append(html);
    }));
  }
  function placeOrder() {
    var orderId = $('.neworder').attr('data-id');
    var user = $('#name').attr('data-id');
    ajax(("/submit/" + orderId + "/" + user), 'put', null, (function() {
      $('#currentOrder').empty();
      newOrder();
    }));
  }
  function addFood() {
    var orderId = $('.neworder').attr('data-id');
    var foodId = $(this).attr('data-id');
    var qty = $(this).parent().siblings().children().val();
    ajax(("/add/" + orderId + "/" + foodId), 'put', {qty: qty}, (function(html) {
      $('#currentOrder').empty().append(html);
    }));
  }
  function newOrder() {
    var user = $('#name').attr('data-id');
    ajax(("/neworder/" + user), 'post', null, (function(html) {
      $('#neworder').empty().append(html);
    }));
  }
  function signIn() {
    var username = $('#username').val();
    ajax('/signin', 'post', {username: username}, (function(html) {
      $('#dashboard').empty().append(html);
    }));
  }
})();

//# sourceMappingURL=main.map
