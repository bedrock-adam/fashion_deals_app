{% extends '../layouts/application.swig' %}

{% block content %}
  <h1>New User</h1>

  <form action="/users" method="POST">
    <input type="hidden" name="_csrf" value="{{csrfToken}}">
    <div>
      <label>Username:
        <input type="text" name="user[username]">
      </label>
      {% if errors.username %}
        <p>Username {{ errors.username.message }}</p>
      {% endif %}
    </div>
    <div>
      <label>Email:
        <input type="text" name="user[email]">
      </label>
      {% if errors.email %}
        <p>Email {{ errors.email.message }}</p>
      {% endif %}
    </div>
    <div>
      <label>Password:
        <input type="text" name="user[password]">
      </label>
      {% if errors.password %}
        <p>Password {{ errors.password.message }}</p>
      {% endif %}
    </div>
    <input type="submit" value="Register">
  </form>
{% endblock %}
