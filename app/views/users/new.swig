{% extends '../layouts/application.swig' %}

{% block content %}
  <h1>New User</h1>

  <form action="/users" method="post">
    <div>
      <label>Email:
        <input type="text" name="user[email]">
      </label>
    </div>
    <div>
      <label>Password:
        <input type="text" name="user[password]">
      </label>
    </div>
    <input type="submit" value="Register">
  </form>
{% endblock %}
