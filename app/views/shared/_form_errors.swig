{% if (err) %}
  <div id="error_explanation">
    <h2>{{ err.message }}</h2>

    <ul>
      {% for errorName in Object.keys(err.errors) %}
        <li>{{ err.errors[errorName].message }}</li>
      {% endfor %}
    </ul>
  </div>
{% endif %}
