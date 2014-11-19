{% for type in ['info', 'error'] %}
  {% if flash[type] %}
    <div class={{ type }}>
      <p>{{ flash[type] }}</p>
    </div>
  {% endif %}
{% endfor %}
