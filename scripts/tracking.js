import { getProduct, loadProductsFetch } from "../data/products.js";
import { getOrder } from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

renderTrackingPage();

async function renderTrackingPage(){
  await loadProductsFetch();
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  const order = getOrder(orderId);
  const product = getProduct(productId);

  let productDetails;
  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details;
    }
  });

  let trackingPageHTML = `
    <div class="order-tracking">
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')}
      </div>

      <div class="product-info">
        ${product.name}
      </div>

      <div class="product-info">
        Quantity: ${productDetails.quantity}
      </div>

      <img class="product-image" src="${product.image}">

      <div class="progress-labels-container">
        <div class="progress-label">
          Preparing
        </div>
        <div class="progress-label current-status">
          Shipped
        </div>
        <div class="progress-label">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar"></div>
      </div>
    </div>
  `

  document.querySelector('.main').innerHTML = trackingPageHTML;

  const today = dayjs();
  const orderDay = dayjs(order.orderTime);
  const deliverDay = dayjs(productDetails.estimatedDeliveryTime);
  const journey = deliverDay.diff(orderDay, 'days');
  const passed = today.diff(orderDay, 'days');
  const percentage = String(passed/journey)*100;
  console.log(passed);
  console.log(journey);
  document.querySelector('.progress-bar').style.width = `${percentage}%`
}