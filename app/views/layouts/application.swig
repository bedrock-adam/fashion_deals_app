<!DOCTYPE html>
<html xmlns:ng="http://angularjs.org">
  <head>
    <meta charset="utf-8">
    <title>{% block title %}Fashion Deals App{% endblock %}</title>
    {% block head %}

    {% endblock %}
  </head>
  <body>
    {% include '../shared/header.swig' %}
    {% include '../shared/flash.swig' %}
    {% block content %}{% endblock %}
    {% include '../shared/footer.swig' %}
  </body>
</html>
