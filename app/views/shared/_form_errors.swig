{% if (err) %}
  <div id="error_explanation">
    <h2>{{ err.message }}</h2>

    <ul>
      {% if err.errors %}
        {% for errorName in Object.keys(err.errors) %}
          <li>{{ err.errors[errorName].message }}</li>
        {% endfor %}
      {% endif %}
    </ul>
  </div>
{% endif %}
