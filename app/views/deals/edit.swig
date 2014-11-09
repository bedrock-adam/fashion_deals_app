{% extends '../layouts/application.swig' %}

{% block content %}
  <h1>Editing Deal</h1>

  <form action="{{ "/deals/" + deal.id }}" method="POST">
    <input type="hidden" name="_method" value="PUT">
    <input type="hidden" name="_csrf" value="{{csrfToken}}">
    <label>
      <input type="text" name="deal[title]" value="{{ deal.title }}">
    </label>
    <input type="submit" value="Update">
  </form>
{% endblock %}
