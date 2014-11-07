{% extends '../layouts/application.swig' %}

{% block content %}
  <h1>Showing Deal</h1>

  <table>
    <tr>
      <th>Title</th>
      <td>{{ deal.title }}</td>
    </tr>
  </table>
{% endblock %}
