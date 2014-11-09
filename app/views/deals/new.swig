{% extends '../layouts/application.swig' %}

{% block content %}
  <a href="/deals">Back to deals</a>

  <h1>New Deal</h1>

  <form action="/deals", method="POST">
    <input type="hidden" name="_csrf" value="{{csrfToken}}">
    <label>
      <input type="text" name="deal[title]" value="{{ deal.title }}">
    </label>
    <input type="submit" value="Create">
  </form>
{% endblock %}
