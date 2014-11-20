App.Deal = DS.Model.extend({
  title: DS.attr('string'),
  url: DS.attr('string'),
  couponCode: DS.attr('string'),
  isAffiliated: DS.attr('string'),
  startsAt: DS.attr('date'), { defaultValue: Date.now() },
  endsAt: DS.attr('date') { defaultValue: Date.now() },
  isFreebie: DS.attr('boolean', { defaultValue: false }),
  category: DS.attr('string'),
  tags: DS.attr('string'),
  description: DS.attr('string')
});
