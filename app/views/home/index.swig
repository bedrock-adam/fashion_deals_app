{% extends '../layouts/application.swig' %}

{% block content %}
  <p>Welcome to Fashion Deals App</p>

  <ul id="deals">
    {% for deal in deals %}
      <li id="{{deal.id}}">{{ deal.title }}</li>
    {% endfor %}
  </ul>

  <section>
    <input type="text" id="text1" ng-model="name">
    <input type="text" id="text2" ng-model="name">
  </section>

  <script src="lib/zepto/zepto.js"></script>
  <script src="lib/angular/angular.js"></script>
  <script src="application.js"></script>
  <script>
    Zepto(function($){

    });
  </script>
{% endblock %}
