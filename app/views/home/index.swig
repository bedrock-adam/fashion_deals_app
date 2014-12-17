{% extends '../layouts/application.swig' %}

{% block content %}
  <p>Fashion Deals App</p>

  <ul id="deals">
    {% for deal in deals %}
      <li id="{{deal.id}}">{{ deal.title }}</li>
    {% endfor %}
  </ul>

  <script src="lib/zepto/zepto.js"></script>
  <script src="application.js"></script>
  <script>
    Zepto(function($){

    });
  </script>
{% endblock %}
