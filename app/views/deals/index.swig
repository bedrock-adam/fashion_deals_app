{% extends '../layouts/application.swig' %}

{% block content %}
  <h1>Listing Deals</h1>

  <table>
    <tbody>
      <tr>
        <th>Title</th>
        <th>URL</th>
        <th>Coupon Code</th>
        <th>Is Affiliated</th>
        <th>Starts At</th>
        <th>Ends At</th>
        <th>Is Freebie</th>
        <th>Category</th>
        <th>Tags</th>
        {# <th>Description</th> #}
        <th>Created At</th>
        <th>User Id</th>

        <th>Edit</th>
        <th>Destroy</th>
      </tr>
      {% for deal in deals %}
        <tr>
          <td><a href="{{ "/deals/" + deal.id }}">{{ deal.title }}</a></td>
          <td>{{ deal.url }}</td>
          <td>{{ deal.couponCode }}</td>
          <td>{{ deal.isAffiliated }}</td>
          <td>{{ deal.startsAt }}</td>
          <td>{{ deal.endsAt }}</td>
          <td>{{ deal.isFreebie }}</td>
          <td>{{ deal.category }}</td>
          <td>{{ deal.tags }}</td>
          {# <td>{{ deal.description }}</td> #}
          <td>{{ deal.createdAt }}</td>
          <td>{{ deal.userId }}</td>

          <td><a href="{{ "/deals/" + deal.id + "/edit" }}">Edit</a></td>
          <td>
            <form action="{{ "/deals/" + deal.id }}" method="POST">
              <input type="hidden" name="_method" value="DELETE">
              <input type="hidden" name="_csrf" value="{{csrfToken}}">
              <input type="submit" value="Destroy">
            </form>
          </td>
        </tr>
      {% endfor %}
    </tbody>
  </table>

  <a href="/deals/new">New Deal</a>
{% endblock %}
