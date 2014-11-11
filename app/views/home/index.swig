{% extends '../layouts/application.swig' %}

{% block content %}
  <p>Welcome to Fashion Deals App</p>

  <ul id="deals">
    {% for deal in deals %}
      <li id="{{deal.id}}">{{ deal.title }}</li>
    {% endfor %}
  </ul>

  <script src="bower_components/zepto/zepto.js"></script>
  <script src="bower_components/socket.io-client/socket.io.js"></script>
  <script>
    Zepto(function($){
      var socket = io.connect('http://localhost:3000/deals');

      socket.on('connect', function() {
        console.log('connected');
      });

      var dealsEl = $('#deals');

      socket.on('create', function(data) {
        dealsEl.append('<li>' + data.title + '</li>');
      });

      socket.on('update', function(data) {
        $('#' + data._id).text(data.title);
      });

      socket.on('destroy', function(data) {
        $('#' + data._id).remove();
      });
    });
  </script>
{% endblock %}
