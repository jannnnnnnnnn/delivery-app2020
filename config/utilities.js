function deliveryDateDesc(deliverytime1, deliverytime2) {
  return deliverytime1.date.getTime() - deliverytime2.date.getTime();
}
function deliveryTimeslotAsc(deliverytime1, deliverytime2) {
  if (deliverytime1.date.getTime() - deliverytime2.date.getTime() == 0) {
    if (deliverytime1.timeslot > deliverytime2.timeslot) {
      return 1;
    } else if (deliverytime1.timeslot < deliverytime2.timeslot) {
      return -1;
    }
  } else {
    return 0;
  }
}

function sameDeliverytime(newDeliverytime, user) {
  const newDate = new Date(newDeliverytime.date);
  const newTimeslot = newDeliverytime.timeslot;
  for (const deliverytime of user.deliverytimes) {
    if (
      deliverytime.date.getTime() == newDate.getTime() &&
      deliverytime.timeslot == newTimeslot
    ) {
      return true;
    }
  }
  return false;
}

function sortDeliverytimes(deliverytimes) {
  let deliveryDateSorted = deliverytimes.sort(deliveryDateDesc);
  let deliveryTimeSorted = deliveryDateSorted.sort(deliveryTimeslotAsc);
  return deliveryTimeSorted;
}

module.exports = {
  sameDeliverytime,
  sortDeliverytimes,
};
