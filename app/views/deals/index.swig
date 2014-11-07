{% extends '../layouts/application.swig' %}

{% block content %}
  <h1>Listing Deals</h1>

  <table>
    <tbody>
      <tr>
        <th>Title<th>
        <th></th>
        <th></th>
      </tr>
      {% for deal in deals %}
        <tr>
          <td><a href="{{ "/deals/" + deal.id }}">{{ deal.title }}</td>
          <td><a href="{{ "/deals/" + deal.id + "/edit" }}">Edit</a></td>
          <td>
            <form action="{{ "/deals/" + deal.id }}" method="POST">
              <input type="hidden" name="_method" value="DELETE">
              <input type="submit" value="Destroy">
            </form>
          </td>
        </tr>
      {% endfor %}
    </tbody>
  </table>

  <a href="/deals/new">New Deal</a>
{% endblock %}
