<!DOCTYPE html>
<html xmlns:ng="http://angularjs.org">
  <head>
    <meta charset="utf-8">
    <title>{% block title %}Fashion Deals App{% endblock %}</title>
    {% block head %}

    {% endblock %}
  </head>
  <body>
    {% include '../shared/_header.swig' %}
    {% include '../shared/_flash.swig' %}
    {% block content %}{% endblock %}
    {% include '../shared/_footer.swig' %}
  </body>
</html>
