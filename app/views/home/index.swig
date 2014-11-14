{% extends '../layouts/application.swig' %}

{% block content %}
  <p>Welcome to Fashion Deals App</p>

  <ul id="deals">
    {% for deal in deals %}
      <li id="{{deal.id}}">{{ deal.title }}</li>
    {% endfor %}
  </ul>

  <script src="lib/zepto/zepto.js"></script>
  <script src="lib/socket.io-client/socket.io.js"></script>
  <script>
    Zepto(function($){
      var socket = io.connect(window.location.hostname);

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
