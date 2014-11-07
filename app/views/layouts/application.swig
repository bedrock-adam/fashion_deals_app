<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>{% block title %}Fashion Deals App{% endblock %}</title>
    {% block head %}

    {% endblock %}
  </head>
  <body>
    {% include '../shared/header.swig' %}
    {% block content %}{% endblock %}
    {% include '../shared/footer.swig' %}
  </body>
</html>
