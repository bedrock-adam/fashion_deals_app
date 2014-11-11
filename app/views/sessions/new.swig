{% extends '../layouts/application.swig' %}

{% block content %}
  <h1>Sign In</h1>

  <nav>
    <ul>
      <li><a href="/auth/facebook">Sign in with Facebook</a></li>
      <li><a href="/auth/twitter">Sign in with Twitter</a></li>
      <li><a href="/auth/google">Sign in with Google</li></a>
    </ul>
  </nav>

  <hr/>

  <form action="/sessions" method="POST">
    <input type="hidden" name="_csrf" value="{{csrfToken}}">
    <div>
      <label>Username:
        <input type="text" name="session[username]">
      </label>
    </div>
    <div>
      <label>Password:
        <input type="text" name="session[password]">
      </label>
    </div>
    <input type="submit" value="Log In">
  </form>
{% endblock %}
