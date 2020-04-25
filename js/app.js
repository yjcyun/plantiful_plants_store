import {data} from './data.js';

// show loader when loading...
window.addEventListener('load', () => document.querySelector('.loader').classList.add('hideLoader'));

const CreatePlants = ((plantData) => {
  const plants = [];

  // template
  class Plant {
    constructor(id, size, sizeDescription, name, img, price, best, featured, description, light, care) {
      this.id = id;
      this.size = size;
      this.sizeDescription = sizeDescription;
      this.name = name;
      this.img = img;
      this.price = price;
      this.best = best;
      this.featured = featured;
      this.description = description;
      this.light=light;
      this.care=care;
    }
  };

  // create plant function
  function createPlant(id, size, sizeDescription, name, img, price, best, featured, description, light, care) {
    const plant = new Plant(id, size, sizeDescription, name, img, price, best, featured, description, light,care);
    plants.push(plant);
  };

  // make plants
  function makePlants() {
    plantData.forEach(datum => {
      createPlant(datum.id, datum.size, datum.sizeDescription, datum.name, datum.img, datum.price, datum.best, datum.featured, datum.description, datum.light, datum.care);
    });
  };

  makePlants();

  // best sellers
  const bestSellers = plants.filter(plant => plant.best === true);
  const featuredPlants = plants.filter(plant => plant.featured === true);
  return {
    plants,
    bestSellers,
    featuredPlants
  };
})(data);

// index.html
const DiplayFeaturedPlants = ((CreatePlants) => {
  const featuredPlants = CreatePlants.featuredPlants;

  const featured = document.getElementById('featured-container');

  document.addEventListener('DOMContentLoaded', () => {
    featured.innerHTML = '';

    let data = '';
    featuredPlants.forEach(plant => {
      data += `
      <!-- single item -->
      <div class="col-lg-3 col-md-6">
        <div class="card px-2 pt-4 mb-5 featured-card curved-border">
          <div>
            <img src="${plant.img}" class="featured-img card-img-top" alt="featured plant">
            <div class="featured-icons text-center my-4">
              <button class="btn featured-btn">
                <i class="fas fa-shopping-cart fa-lg fa-fw d-flex justify-content-center align-items-center py-2"></i>
              </button>
              <button class="btn featured-btn">
                <i class="far fa-heart fa-lg fa-fw d-flex justify-content-center align-items-center py-2"></i>
              </button>
            </div>
          </div>
          <div class="featured-text px-2 text-center my-auto">
            <h5 class="text-capitalize font-weight-bold featured-title">${plant.name}</h5>
            <p class="card-text">${plant.description}</p>
            <p class="featured-price font-weight-bold">$<span>${plant.price}</span></p>
          </div>
        </div>
      </div>
      <!-- end of single item -->
      `
    });

    featured.innerHTML = data;
  });

})(CreatePlants);

// store.html
const DisplayBestSellers = ((CreatePlants) => {
  const bestSellers = CreatePlants.bestSellers;

  const favouriteInfo = document.getElementById('favourite-info');

  document.addEventListener('DOMContentLoaded', () => {
    favouriteInfo.innerHTML = '';

    let data = '';
    bestSellers.forEach(best => {
      data += `
      <!-- single item -->
      <div class="col-md-3 col-6">
        <div class="card plant-card">
          <img src="${best.img}" alt="plant" class="card-img-top plant-img">
          <!-- card body -->
          <div class="card-body px-0">
            <div class="plant-info d-flex justify-content-between">
              <!-- first flex child -->
              <div class="d-flex plant-text justify-content-start align-items-center">
                <h6 class="text-capitalize">${best.name}</h6>
              </div>
              <!-- second flex child -->
              <div class="plant-value align-self-center">
                $<span class="plant-price">${best.price}</span>
              </div>
            </div>
          </div>
          <!-- end of card body -->
        </div>
      </div>
      <!-- end of single item -->`
    });

    favouriteInfo.innerHTML = data;
  });












})(CreatePlants);

const DisplayPlants = ((CreatePlants) => {
  const plants = CreatePlants.plants;

  const store = document.getElementById('store-container');

  document.addEventListener('DOMContentLoaded', () => {

    store.innerHTML = '';
    let data = '';

    plants.forEach(plant => {
      data += `
      <!-- single item -->
      <div class="col-sm-6 col-lg-4 single-plant ${plant.size}">
        <div class="card plant-card">
          <div class="plant-img-div">
           <a href="product.html?id=${plant.id}" id="singlePlantLink">
             <img src="${plant.img}" alt="plant" class="card-img-top plant-img">
           </a>
            <button class="btn btn-outline-dark add-btn" id="open">add to cart</button>
          </div>
          <!-- card body -->
          <div class="card-body px-0">
            <div class="plant-info d-flex justify-content-between">
              <!-- first flex child -->
              <div class="plant-text justify-content-start">
                <h6 class="text-muted">${plant.sizeDescription}</h6>
                <a href="product.html?id=${plant.id}" class="text-dark">
                 <h5 class="text-capitalize plant-name">${plant.name}</h5>
                </a>
              </div>
              <!-- second flex child -->
              <div class="plant-value align-self-center">
                $<span class="plant-price">${plant.price}</span>
              </div>
            </div>
          </div>
          <!-- end of card body -->
        </div>
      </div>
      <!-- end of single item -->`
    });

    store.innerHTML = data;

    showCartModal();
    addToCart();

  });
})(CreatePlants);

const FilterPlants = (() => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const filterTitle = document.querySelector('.filtered-plants')

  filterBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      const value = e.target.dataset.filter;
      const singlePlant = document.querySelectorAll('.single-plant');

      singlePlant.forEach(plant => {
        if (value === 'all') {
          plant.style.display = 'block';
        } else {
          (!plant.classList.contains(value) ? plant.style.display = 'none' : plant.style.display = 'block');
        }
      });

      // change title when filtered
      filterTitle.textContent = value;

    });
  });
})();

const showCartModal = () => {
  const close = document.getElementById('cart-close');
  const open = document.querySelectorAll('#open');
  const cartModal = document.getElementById('cart');
  const continueBtn = document.querySelector('.continue-btn');

  // show modal
  open.forEach(btn => {
    btn.addEventListener('click', () => {
      cartModal.classList.add('show-cart-modal');
    });
  });

  close.addEventListener('click', () => {
    cartModal.classList.remove('show-cart-modal');
  });
  continueBtn.addEventListener('click', () => {
    cartModal.classList.remove('show-cart-modal');
  })

  window.addEventListener('click', e => e.target === cartModal ? cartModal.classList.remove('show-cart-modal') : false);
};

const addToCart = () => {
  const open = document.querySelectorAll('#open');

  open.forEach(btn => {
    btn.addEventListener('click', e => {
      if (e.target.parentElement.classList.contains('plant-img-div')) {
        let fullPath = e.target.parentElement.children[0].children[0].src;
        let position = fullPath.indexOf('img');
        let partialPath = fullPath.slice(position);

        const item = {};
        // img
        item.img = `${partialPath}`;

        // plant name
        let name = e.target.parentElement.parentElement.children[1].children[0].children[0].children[1].children[0].textContent;
        item.name = name;

        // price
        let price = e.target.parentElement.parentElement.children[1].children[0].children[1].children[0].textContent;
        item.price = +price;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item d-flex pb-3';

        cartItem.innerHTML = `
        <img src="${item.img}" class="img-fluid mx-3" alt="plant" style="width:70px;height:70px">
        <div class="item-text ">
          <p class="text-uppercase font-weight-bold  m-0 p-0" id="cart-item-title">${item.name}</p>
          <p class="font-weight-bold m-0 p-0">$<span id="cart-item-price">${item.price}</span></p>
          <p class="m-0 p-0">qty: <span id="cart-item-qty">1</span>
          </p>
        `;


        const cartModal = document.querySelector('.cart-modal');
        const total = document.querySelector('#cart-subtotal-container');

        cartModal.insertBefore(cartItem, total);

        showTotals();
      }
    });
  });
};

const showTotals = () => {
  const total = [];

  const items = document.querySelectorAll('#cart-item-price');
  items.forEach(item => {
    total.push(+item.textContent);
  });

  const totalMoney = total.reduce((acc, item) => {
    acc += item;
    return acc;
  }, 0);

  const finalMoney = totalMoney.toFixed(2);
  //update total price
  document.querySelector('#cart-item-total').textContent = finalMoney;
  //update number of items
  document.querySelectorAll('.cart-item-number').forEach(number => {
    number.textContent = total.length;
  });

  // add s depending on the # of items added
  const plural = document.querySelector('#plural');
  total.length <= 1 ? plural.style.display = 'none' : plural.style.display = 'inline-block';

  // show message depending on the total
  const message = document.querySelector('#message');
  finalMoney >= 100 ?
    message.textContent = 'Your order qualifies for FREE SHIPPING' :
    message.textContent = `You are $${100 - finalMoney} away from FREE SHIPPING`;
};





















