{% extends '../layouts/application.swig' %}

{% block content %}
  <h1>Editing Deal</h1>

  <form action="{{ "/deals/" + deal.id }}" method="POST">
    <input type="hidden" name="_method" value="PUT">
    <input type="hidden" name="_csrf" value="{{csrfToken}}">
    <div>
      <label>
        <input type="text" name="deal[title]" value="{{ deal.title }}">
      </label>
      {% if errors.title %}
        <p>Title {{ errors.title.message }}</p>
      {% endif %}
    </div>
    <input type="submit" value="Update">
  </form>
{% endblock %}
