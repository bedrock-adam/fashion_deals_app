{% extends '../layouts/application.swig' %}

{% block content %}
  <h1>Sign In</h1>

  <form action="/sessions" method="post">
    <div>
      <label>Email:
        <input type="text" name="sessions[email]">
      </label>
    </div>
    <div>
      <label>Password:
        <input type="text" name="sessions[password]">
      </label>
    </div>
    <input type="submit" value="Log In">
  </form>
{% endblock %}
