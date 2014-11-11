{% extends '../layouts/application.swig' %}

{% block content %}
  <p>Welcome to Fashion Deals App</p>

  <script src="bower_components/socket.io-client/socket.io.js"></script>
  <script>
    var socket = io.connect('http://localhost:3000');
    socket.on('connect', function() {
      console.log('connected');
    });

    socket.on('news', function (data) {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
    });
  </script>
{% endblock %}
