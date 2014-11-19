{% extends '../layouts/application.swig' %}

{% block content %}
  <h1>Editing Deal</h1>

  <form action="{{ "/deals/" + deal.id }}" method="POST">
    <input type="hidden" name="_method" value="PUT">
    {% include '_form.swig' %}

    <input type="submit" value="Update">
  </form>
{% endblock %}
