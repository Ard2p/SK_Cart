<template>
  <header>
    <div class="container-xxl m-auto position-relative d-flex flex-column justify-content-between" style='background-image: url(https://sun9-77.userapi.com/c846221/v846221803/17e5cd/zovR1jbr5-o.jpg);'>
      <div>
        <!-- <img class="logo mt-3 ms-3" src="assest/images/logo.jpeg" alt="Логотип"> -->
      </div>
      <div class="d-flex p-1">
        <h1 class="text-light col-11 col-md-10">SK Bar - рок бар {{ connected }}</h1>
        <!-- <svg type="button" data-bs-toggle="modal" data-bs-target="#exampleModalLabel" class="col-1 col-md-2" width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="23" cy="23" r="23" fill="white" />
          <path d="M23.0116 20.002C21.9073 20.002 21.1221 20.5009 21.1221 21.236V31.2389C21.1221 31.869 21.9073 32.499 23.0116 32.499C24.0669 32.499 24.9257 31.869 24.9257 31.2389V21.2359C24.9257 20.5008 24.0669 20.002 23.0116 20.002Z" fill="#FF2C3D" />
          <path d="M23.0122 13.8325C21.8834 13.8325 21 14.6989 21 15.6966C21 16.6943 21.8834 17.587 23.0122 17.587C24.1165 17.587 25 16.6943 25 15.6966C25 14.6989 24.1164 13.8325 23.0122 13.8325Z" fill="#FF2C3D" />
        </svg> -->
      </div>
    </div>
  </header>

  <section>

    <div class="sticky-top d-flex">
      <div type="button" data-bs-toggle="modal" data-bs-target="#exampleModalLabel2" class="left_menu position-relative">
        <span></span>
        <span></span>
      </div>
      <div id="navbar-example2" class="navbar bg-body-tertiary px-3 mb-3 slider_menu">
        <a class="nav-link" v-for='category in categoryes' @click='toScroll("cat" + category.id)'>{{ category.name }}</a>
      </div>
    </div>

    <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-smooth-scroll="true" class="scrollspy-example-2" tabindex="0">

      <div v-for='category in categoryes' :ref='"cat" + category.id' style='scroll-margin: 60px !important;'>
        <h3 class="ps-2">{{ category.name }}</h3>
        <div class="d-flex flex-wrap justify-content-center">

          <div v-for='product in category.products' class="d-flex flex-column rounded-3 position-relative item_cart">

            <img class="img_item" loading="lazy" :src='product.photo'>

            <div class="info_product_menu rounded-3 d-flex flex-column justify-content-between h-100">

              <div class="description_item pt-4 ps-2 pe-2">
                <h3>{{ product.name }}</h3>
                <P>{{ product.decription }}</P>
              </div>

              <div class="d-flex align-items-center justify-content-between p-2 prise">
                <p class="mb-0 ps-0 ps-sm-2">{{ product.price }} руб.</p>

                <div v-if='cart[product.id]' @click='delCart(product)' class="add_cart d-flex justify-content-center">
                  <span>➖</span>
                </div>

                <div v-if='cart[product.id]'>{{ cart[product.id].quantity }}</div>

                <div @click='addCart(product)' class="add_cart d-flex justify-content-center">
                  <span>➕</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  </section>


  <!-- Модалька с меню   -->
  <div class="modal custom fade anim_menu_modal" id="exampleModalLabel2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">

    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Категории</h1>
          <button type="button" class="btn-close anim_close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        </div>

        <div class="modal-body">
          <div type="button" class="mb-3 modal_menu_items" data-bs-dismiss="modal">

            <a v-for='category in categoryes' @click='toScroll("cat" + category.id)' type="button" class="d-flex close_button anim_close_btn">
              <img class="col-4 me-2" :src='category.photo'>
              <div>
                <h4>{{ category.name }}</h4>
                <p class="quantity">{{ declination(Object.keys(category.products).length, ['позиция', 'пизиции', 'пизиций']) }} </p>
              </div>
            </a>

          </div>

        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary anim_close_btn" data-bs-dismiss="modal">Закрыть</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Модалька с карзиной -->
  <div class="modal custom fade anim_menu_modal" id="modal-Cart" tabindex="-1" aria-labelledby="modal-Cart" aria-hidden="true">

    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Корзина</h1>
          <button type="button" class="btn-close anim_close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        </div>
        <div class="modal-body mini_cart_modal ps-1 pe-1">

          <div v-for='product in cart' class="d-flex align-items-center mini_cart_item mb-3">
            <div class="col-3">
              <img class="img_mini_cart_item w-100" loading="lazy" :src='product.photo'>
            </div>

            <div class="description_item_cart col-6 ps-2">
              <p class="fs-3 mb-1 name_items_cart">{{ product.name }}</p>
              <p class="fs-6 mb-0"> {{ product.quantity }} шт x {{ product.price }} руб.</p>
            </div>

            <div class="col-3 d-flex">

              <div @click='delCart(product)' class="add_cart d-flex justify-content-center me-1">
                <span>➖</span>
              </div>
              <span>{{ product.quantity }}</span>
              <div @click='addCart(product)' class="add_cart d-flex justify-content-center ms-1">
                <span>➕</span>
              </div>

            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-between">
          <p>Итого: </p>
          <div>{{ countCart() }} шт.</div>
          <div>{{ sumCart() }} руб.</div>
          <button type="button" class="btn btn-danger anim_close_btn">Заказать</button>
        </div>
      </div>
    </div>
  </div>

  <div class="mini_cart sticky-bottom p-3" v-if='countCart()'>
    <div type="button" data-bs-toggle="modal" data-bs-target="#modal-Cart" class="btn_cart d-flex w-100 align-items-center justify-content-between">
      <h2>Корзина:</h2>

      <div>{{ countCart() }} шт.</div>
      <div>{{ sumCart() }} руб.</div>
    </div>
  </div>
</template>

<script>
import { useStorage } from '@vueuse/core'
// import { socket, state } from "../socket"

export default {
  head: {
    script: [
      { type: 'text/javascript', src: 'https://code.jquery.com/jquery-3.6.3.min.js' },
      { type: 'text/javascript', src: './src/assets/js/bootstrap.bundle.min.js' },
      { type: 'text/javascript', src: './src/assets/js/slick.min.js' },
      { type: 'text/javascript', src: './src/assets/js/main.js' }
    ]
  },
  data() {
    return {
      categoryes: [{
        id: 1,
        name: 'Закуски',
        products: [{
          id: 1,
          name: 'Картошка фри',
          price: 100,
          photo: 'https://phonoteka.org/uploads/posts/2021-07/1625283016_18-phonoteka-org-p-kartoshka-fri-oboi-oboi-krasivo-21.jpg',
          decription: 'Картофель обжаренный во фритюрнице'
        }, {
          id: 2,
          cat_id: 1,
          cat_name: 'Закуски',
          name: 'Картофельные дольки',
          price: 100,
          photo: 'https://phonoteka.org/uploads/posts/2021-07/1625283016_18-phonoteka-org-p-kartoshka-fri-oboi-oboi-krasivo-21.jpg',
          decription: 'Картофель обжаренный во фритюрнице дольками'
        }]
      }, {
        id: 2,
        name: 'Пицца',
        products: [{
          id: 3,
          name: 'Картошка фри',
          price: 100,
          photo: 'https://phonoteka.org/uploads/posts/2021-07/1625283016_18-phonoteka-org-p-kartoshka-fri-oboi-oboi-krasivo-21.jpg',
          decription: 'Картофель обжаренный во фритюрнице'
        }, {
          id: 4,
          cat_id: 1,
          cat_name: 'Закуски',
          name: 'Картофельные дольки',
          price: 100,
          photo: 'https://phonoteka.org/uploads/posts/2021-07/1625283016_18-phonoteka-org-p-kartoshka-fri-oboi-oboi-krasivo-21.jpg',
          decription: 'Картофель обжаренный во фритюрнице дольками'
        }]
      }, {
        id: 3,
        name: 'Пицца',
        products: [{
          id: 5,
          name: 'Картошка фри',
          price: 100,
          photo: 'https://phonoteka.org/uploads/posts/2021-07/1625283016_18-phonoteka-org-p-kartoshka-fri-oboi-oboi-krasivo-21.jpg',
          decription: 'Картофель обжаренный во фритюрнице'
        }, {
          id: 6,
          cat_id: 1,
          cat_name: 'Закуски',
          name: 'Картофельные дольки',
          price: 100,
          photo: 'https://phonoteka.org/uploads/posts/2021-07/1625283016_18-phonoteka-org-p-kartoshka-fri-oboi-oboi-krasivo-21.jpg',
          decription: 'Картофель обжаренный во фритюрнице дольками'
        }]
      }],
      cart: useStorage('cart', {}),
      table: useStorage('table', 0)
    }
  },
  computed: { },
  mounted() {
    let url = new URL(window.location.href)
    this.table = url.searchParams.get('t') || 0
    url.searchParams.delete('t')
    window.history.replaceState({}, document.title, url.href)
    // socket.connect()
  },
  methods: {
    addCart(product) {
      if (this.cart[product.id]) this.cart[product.id].quantity++
      else this.cart[product.id] = { ...product, quantity: 1 }
    },
    delCart(product) {
      if (this.cart[product.id]?.quantity > 1) this.cart[product.id].quantity--
      else delete this.cart[product.id]
    },
    sumCart() {
      return Object.values(this.cart).reduce((sum, value) => sum + parseFloat(value.price * value.quantity || 0), 0);
    },
    countCart() {
      return Object.values(this.cart).reduce((sum, value) => sum + parseFloat(value.quantity || 0), 0);
    },
    orderCart() {
      let products = {}
      Object.values(this.cart).forEach(product => {
        products[product.id] = product.quantity
      })

      fetch('http://example.com/api/endpoint/', {
        method: 'post',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: products, table: this.table })
      }).then((response) => {
        this.cart = {}
      })
    },
    declination(number, titles) {
      let cases = [2, 0, 1, 1, 1, 2]
      return number + ' ' + titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]]
    },
    toScroll(refName) {
      this.$nextTick(() => {
        this.$refs[refName][0].scrollIntoView({ behavior: 'smooth' })
      })
    }
  }
}

</script>



<style scoped>
.bg-header {
  height: 386px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

nav {
  z-index: 10
}

nav.scrolled {
  border-bottom: 0px;
}
</style>
