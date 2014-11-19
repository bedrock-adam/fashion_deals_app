{% extends '../layouts/application.swig' %}

{% block content %}
  <a href="/deals">Back to deals</a>

  <h1>New Deal</h1>

  <form action="/deals", method="POST">
    {% include '_form.swig' %}

    <input type="submit" value="Create">
  </form>
{% endblock %}
