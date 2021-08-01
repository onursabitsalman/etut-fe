import moment from 'moment';

export const generateSlots = (date, startTime = '08:00', endTime = '20:00') => {
  var x = {
    nextSlot: 20,
    breakTime: [
      ['11:00', '14:00'],
      ['16:00', '18:00']
    ],
    startTime: startTime,
    endTime: endTime
  };

  var slotTime = moment(x.startTime, 'HH:mm');
  var endTime = moment(x.endTime, 'HH:mm');

  /* function isInBreak(slotTime, breakTimes) {
    return breakTimes.some((br) => {
      return slotTime >= moment(br[0], 'HH:mm') && slotTime < moment(br[1], 'HH:mm');
    });
  } */

  let times = [];
  while (slotTime < endTime) {
    /* if (!isInBreak(slotTime, x.breakTime)) {
    } */
    times.push(slotTime.format('HH:mm'));
    slotTime = slotTime.add(x.nextSlot, 'minutes');
  }

  return times.map((time) =>
    moment(`${date.format('DD-MM-YYYY')}-${time}`, 'DD-MM-YYYY-HH:mm')
  );
};
