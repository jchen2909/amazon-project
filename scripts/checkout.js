import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProducts} from '../data/products.js'
import {loadCart} from '../data/cart.js';

//import '../data/cart-class.js';
//import '../data/backend-practice.js';

//Practicing Promises (a class) Instantiation requires a function
// then() takes a function that will be run next

Promise.all([
  new Promise((resolve)=>{
    loadProducts(()=>{ 
      resolve('value1');
    })
  }),
  new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  })
]).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});

/*
new Promise((resolve)=>{
  loadProducts(()=>{ //LoadProducts must take in resolve() or else resolve will run before loadProduct finishes.
    resolve('value1');
  });
}).then((value)=>{
  console.log(value);
  return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  });
}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});
*/


/*
loadProducts(()=>{
  loadCart(()=>{
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
  })
});
*/


