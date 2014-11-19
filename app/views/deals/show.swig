{% extends '../layouts/application.swig' %}

{% block content %}
  <a href={{ "/deals/" + deal._id + "/edit" }}>Edit</a> |
  <a href="/deals">Back to Deals</a> | 
  <form action="{{ "/deals/" + deal.id }}" method="POST">
    <input type="hidden" name="_method" value="DELETE">
    <input type="hidden" name="_csrf" value="{{csrfToken}}">
    <input type="submit" value="Destroy">
  </form>

  <h1>Showing Deal</h1>

  <table>
    <tr>
      <th>Title</th>
      <td>{{ deal.title }}</td>
    </tr>
    <tr>
      <th>URL</th>
      <td>{{ deal.url }}</td>
    </tr>
    <tr>
      <th>Coupon Code</th>
      <td>{{ deal.couponCode }}</td>
    </tr>
    <tr>
      <th>Is Affiliated</th>
      <td>{{ deal.isAffiliated }}</td>
    </tr>
    <tr>
      <th>Starts At</th>
      <td>{{ deal.startsAt }}</td>
    </tr>
    <tr>
      <th>Ends At</th>
      <td>{{ deal.endsAt }}</td>
    </tr>
    <tr>
      <th>Is Freebie</th>
      <td>{{ deal.isFreebie }}</td>
    </tr>
    <tr>
      <th>Category</th>
      <td>{{ deal.category }}</td>
    </tr>
    <tr>
      <th>Tags</th>
      <td>{{ deal.tags }}</td>
    </tr>
    <tr>
      <th>Description</th>
      <td>{{ deal.description }}</td>
    </tr>
    <tr>
      <th>Created At</th>
      <td>{{ deal.createdAt }}</td>
    </tr>
    <tr>
      <th>User Id</th>
      <td>{{ deal.userId }}</td>
    </tr>
  </table>
{% endblock %}
