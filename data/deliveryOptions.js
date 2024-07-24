import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  },
  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
  }
];

export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;

  deliveryOptions.forEach((option)=>{
    if(option.id === deliveryOptionId){
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}
function isWeekend(date){
  const dayOfWeek = date.format('dddd');
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}

export function calculateDeliveryDate(deliveryOption){
  const today = dayjs();
  let deliveryDays = deliveryOption.deliveryDays;
  let dummyDate = today;
  while(deliveryDays > 0){
    dummyDate = dummyDate.add(1, 'days');
    if(!isWeekend(dummyDate)){
      deliveryDays--;
    }
  }
  const dateString = dummyDate.format('dddd, MMMM D');

  return dateString;
}

export function validDeliveryOption(deliveryOptionId){
  let found = false;
  deliveryOptions.forEach((option)=>{
    if(deliveryOptionId === option.id){
      found = true;
    }
  });

  return found;
}