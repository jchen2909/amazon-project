import {orders} from '../data/orders.js';
import {getProduct, loadProductsFetch} from '../data/products.js';
import formatCurrency from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {cart, addToCart, calculateCartQuantity, loadFromStorage} from '../data/cart.js'

function updateCartQuantity(){
  let cartQuantity = calculateCartQuantity();

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

async function renderOrderTracking(){
  await loadProductsFetch();
  let orderTrackingHTML = '';
  orders.forEach((orderDetails)=>{
    orderTrackingHTML += `
    <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dayjs(orderDetails.orderTime).format('MMMM D')}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(orderDetails.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderDetails.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${renderProductList(orderDetails)}
          </div>
        </div>
  `;
  })

  document.querySelector('.js-orders-grid').innerHTML = orderTrackingHTML;

  document.querySelectorAll('.js-buy-again').forEach((button) => {
    button.addEventListener('click', () => {
      addToCart(button.dataset.productId, 1);
      updateCartQuantity();
    });
  });
}

function renderProductList(orderDetails){
  let listHTML = '';
  orderDetails.products.forEach((product)=>{
    const actualProduct = getProduct(product.productId);
    listHTML += `
        <div class="product-image-container">
        <img src="${actualProduct.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${actualProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${dayjs(product.estimatedDeliveryTime).format('MMMM D')}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button js-buy-again button-primary" data-product-id="${product.productId}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${orderDetails.id}&productId=${product.productId}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>`
  })

  return listHTML;
}

updateCartQuantity();
renderOrderTracking();

