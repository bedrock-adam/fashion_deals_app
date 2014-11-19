{% include '../shared/_form_errors.swig' %}

<input type="hidden" name="_csrf" value="{{csrfToken}}">
<div>
  <label>
    Title:
    <input type="text" name="deal[title]" value="{{ deal.title }}">
  </label>
  {% if errors.title %}
    <p>Title {{ errors.title.message }}</p>
  {% endif %}
</div>
<div>
  <label>
    URL:
    <input type="text" name="deal[url]" value="{{ deal.url }}">
  </label>
  {% if errors.url %}
    <p>URL {{ errors.url.message }}</p>
  {% endif %}
</div>
<div>
  <label>
    Coupon Code:
    <input type="text" name="deal[couponCode]" value="{{ deal.couponCode }}">
  </label>
  {% if errors.couponCode %}
    <p>Coupon Code {{ errors.couponCode.message }}</p>
  {% endif %}
</div>
<div>
  <label>
    Is Affiliated:
    <input type="checkbox" name="deal[isAffiliated]" value="{{ deal.isAffiliated }}">
  </label>
  {% if errors.couponCode %}
    <p>Is Affiliated {{ errors.isAffiliated.message }}</p>
  {% endif %}
</div>
<div>
  <label>
    Starts At: 
    <input type="text" name="deal[startsAt]" value="{{ deal.startsAt }}">
  </label>
  {% if errors.startsAt %}
    <p>Starts at {{ errors.startsAt.message }}</p>
  {% endif %}
</div>
<div>
  <label>
    Ends At:
    <input type="text" name="deal[endsAt]" value="{{ deal.endsAt }}">
  </label>
  {% if errors.endsAt %}
    <p>Starts at {{ errors.endsAt.message }}</p>
  {% endif %}
</div>
<div>
  <label>
    Is Freebie:
    <input type="checkbox" name="deal[isFreebie]" value="{{ deal.isFreebie }}">
  </label>
  {% if errors.isFreebie %}
    <p>Is Freebie {{ errors.isFreebie.message }}</p>
  {% endif %}
</div>
<div>
  <label>
    Category:
    <input type="text" name="deal[category]" value="{{ deal.category }}">
  </label>
  {% if errors.category %}
    <p>Category {{ errors.category.message }}</p>
  {% endif %}
</div>
<div>
  <label>
    Tags:
    <input type="text" name="deal[tags]" value="{{ deal.tags }}">
  </label>
  {% if errors.tags %}
    <p>Tags {{ errors.tags.message }}</p>
  {% endif %}
</div>
<div>
  <label>
    Description: 
    <input type="text" name="deal[description]" value="{{ deal.description }}">
  </label>
  {% if errors.description %}
    <p>Description {{ errors.description.message }}</p>
  {% endif %}
</div>
