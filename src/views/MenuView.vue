<template>
  <header>
    <div class="container-xxl m-auto position-relative d-flex flex-column justify-content-between">
      <img class="logo" src="@/assets/img/logo_Bada_bing.svg" />
    </div>
  </header>

  <section style="text-shadow: 0px 2px 13px #e2027e !important;color: white;">

    <div class="sticky-top d-flex menu-top">
      <div type="button" data-bs-toggle="modal" data-bs-target="#exampleModalLabel2" class="left_menu position-relative">
        <span></span>
        <span></span>
      </div>
      <div id="navbar-example2" class="navbar px-3 slider_menu">
        <a class="nav-link" v-for='category in categoryes' @click='toScroll("cat" + category.id)'>{{ category.name }}</a>
      </div>
    </div>

    <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-smooth-scroll="true" class="scrollspy-example-2" tabindex="0">

      <div v-for='category in categoryes' :ref='"cat" + category.id' style='scroll-margin: 60px !important;'>
        <h3 class="ps-2">{{ category.name }}</h3>
        <div class="d-flex flex-wrap justify-content-center">

          <div v-for='product in category.products' class="d-flex flex-column rounded-3 position-relative item_cart">

            <template v-if='product.photo != null'>
              <img class="img_item" loading="lazy" :src='product.photo'>
            </template>
            <template v-else>
              <svg fill="#ffffff" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <title>no-image</title>
                  <path d="M30,3.4141,28.5859,2,2,28.5859,3.4141,30l2-2H26a2.0027,2.0027,0,0,0,2-2V5.4141ZM26,26H7.4141l7.7929-7.793,2.3788,2.3787a2,2,0,0,0,2.8284,0L22,19l4,3.9973Zm0-5.8318-2.5858-2.5859a2,2,0,0,0-2.8284,0L19,19.1682l-2.377-2.3771L26,7.4141Z"></path>
                  <path d="M6,22V19l5-4.9966,1.3733,1.3733,1.4159-1.416-1.375-1.375a2,2,0,0,0-2.8284,0L6,16.1716V6H22V4H6A2.002,2.002,0,0,0,4,6V22Z"></path>
                </g>
              </svg>
            </template>

            <div class="info_product_menu rounded-3 d-flex flex-column justify-content-between h-100">

              <div class="description_item pt-4 ps-2 pe-2">
                <h3>{{ product.name }}</h3>
                <P>{{ product.decription }}</P>
              </div>

              <div class="p-2 prise">

                <p class="mb-0 ps-0 ps-sm-2">{{ product.volume }}</p>

                <div class="d-flex align-items-center justify-content-between">

                  <p class="mb-0 ps-0 ps-sm-2">{{ product.price }} руб.</p>

                  <div v-if='cart[product.id]' @click='delCart(product)' class="add_cart d-flex justify-content-center">
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12Z" fill="#ffffff"></path>
                        </g>
                      </svg>
                    </span>
                  </div>

                  <div v-if='cart[product.id]'>{{ cart[product.id].quantity }}</div>

                  <div @click='addCart(product)' class="add_cart d-flex justify-content-center">
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                          <path d="M13.5 3C13.5 2.44772 13.0523 2 12.5 2H11.5C10.9477 2 10.5 2.44772 10.5 3V10.5H3C2.44772 10.5 2 10.9477 2 11.5V12.5C2 13.0523 2.44772 13.5 3 13.5H10.5V21C10.5 21.5523 10.9477 22 11.5 22H12.5C13.0523 22 13.5 21.5523 13.5 21V13.5H21C21.5523 13.5 22 13.0523 22 12.5V11.5C22 10.9477 21.5523 10.5 21 10.5H13.5V3Z" fill="#ffffff"></path>
                        </g>
                      </svg>
                    </span>
                  </div>
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

              <template v-if='category.photo != null'>
                <img class="col-4 me-2" :src='category.photo'>
              </template>
              <template v-else>
                <svg class="col-4 me-2" fill="#ffffff" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <title>no-image</title>
                    <path d="M30,3.4141,28.5859,2,2,28.5859,3.4141,30l2-2H26a2.0027,2.0027,0,0,0,2-2V5.4141ZM26,26H7.4141l7.7929-7.793,2.3788,2.3787a2,2,0,0,0,2.8284,0L22,19l4,3.9973Zm0-5.8318-2.5858-2.5859a2,2,0,0,0-2.8284,0L19,19.1682l-2.377-2.3771L26,7.4141Z"></path>
                    <path d="M6,22V19l5-4.9966,1.3733,1.3733,1.4159-1.416-1.375-1.375a2,2,0,0,0-2.8284,0L6,16.1716V6H22V4H6A2.002,2.002,0,0,0,4,6V22Z"></path>
                  </g>
                </svg>
              </template>

              <div>
                <h4>{{ category.name }}</h4>
                <p class="quantity">{{ declination(Object.keys(category.products).length, ['позиция', 'пизиции', 'пизиций']) }} </p>
              </div>
            </a>

          </div>

        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-danger anim_close_btn" data-bs-dismiss="modal">Закрыть</button>
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
              <template v-if='product.photo != null'>
                <img class="img_mini_cart_item w-100" loading="lazy" :src='product.photo'>
              </template>
              <template v-else>
                <svg fill="#ffffff" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <title>no-image</title>
                    <path d="M30,3.4141,28.5859,2,2,28.5859,3.4141,30l2-2H26a2.0027,2.0027,0,0,0,2-2V5.4141ZM26,26H7.4141l7.7929-7.793,2.3788,2.3787a2,2,0,0,0,2.8284,0L22,19l4,3.9973Zm0-5.8318-2.5858-2.5859a2,2,0,0,0-2.8284,0L19,19.1682l-2.377-2.3771L26,7.4141Z"></path>
                    <path d="M6,22V19l5-4.9966,1.3733,1.3733,1.4159-1.416-1.375-1.375a2,2,0,0,0-2.8284,0L6,16.1716V6H22V4H6A2.002,2.002,0,0,0,4,6V22Z"></path>
                  </g>
                </svg>
              </template>
            </div>

            <div class="description_item_cart col-6 ps-2">
              <p class="fs-3 mb-1 name_items_cart">{{ product.name }}</p>
              <p class="fs-6 mb-0"> {{ product.quantity }} шт x {{ product.price }} руб.</p>
            </div>

            <div class="col-3 d-flex justify-content-center">

              <div @click='delCart(product)' class="add_cart d-flex justify-content-center me-1">
                <span>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12Z" fill="#ffffff"></path>
                    </g>
                  </svg>
                </span>
              </div>
              <span>{{ product.quantity }}</span>
              <div @click='addCart(product)' class="add_cart d-flex justify-content-center ms-1">
                <span>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M13.5 3C13.5 2.44772 13.0523 2 12.5 2H11.5C10.9477 2 10.5 2.44772 10.5 3V10.5H3C2.44772 10.5 2 10.9477 2 11.5V12.5C2 13.0523 2.44772 13.5 3 13.5H10.5V21C10.5 21.5523 10.9477 22 11.5 22H12.5C13.0523 22 13.5 21.5523 13.5 21V13.5H21C21.5523 13.5 22 13.0523 22 12.5V11.5C22 10.9477 21.5523 10.5 21 10.5H13.5V3Z" fill="#ffffff"></path>
                    </g>
                  </svg>
                </span>
              </div>

            </div>
          </div>
        </div>
        <!-- <div class="modal-footer justify-content-between">
          <p>Итого: </p>
          <div>{{ countCart() }} шт.</div>
          <div>{{ sumCart() }} руб.</div>
          <button type="button" class="btn btn-danger anim_close_btn">Заказать</button>
        </div> -->
        <div class="modal-footer">
          <button type="button" class="btn btn-danger anim_close_btn" data-bs-dismiss="modal">Закрыть</button>
        </div>
      </div>
    </div>
  </div>

  <div class="mini_cart sticky-bottom p-3" v-if='countCart()'>
    <div type="button" data-bs-toggle="modal" data-bs-target="#modal-Cart" class="m-3 btn_cart d-flex align-items-center justify-content-between">
      <h2>Заказ:</h2>

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
      { type: 'text/javascript', src: './src/assets/js/bootstrap.bundle.min.js' }
    ]
  },
  data() {
    return {
      categoryes: [{
        id: 1,
        name: 'Виски',
        photo: null,
        products: [{
          id: 1,
          name: 'William Lowson`s',
          price: 250,
          volume: '40мл',
          photo: null,
          decription: null
        },
        {
          id: 2,
          name: 'Darrow',
          price: 250,
          volume: '40мл',
          photo: null,
          decription: null
        }, {
          id: 3,
          name: 'Ballantines',
          price: 300,
          volume: '40мл',
          photo: null,
          decription: null
        }, {
          id: 4,
          name: 'Jim beam',
          price: 350,
          volume: '40мл',
          photo: null,
          decription: null
        }, {
          id: 5,
          name: 'Jameson',
          price: 400,
          volume: '40мл',
          photo: null,
          decription: null
        }, {
          id: 6,
          name: 'Jack daniels',
          price: 400,
          volume: '40мл',
          photo: null,
          decription: null
        }]
      }, {
        id: 2,
        name: 'Односолод',
        products: [{
          id: 7,
          name: 'Glenmoray 10 лет',
          price: 600,
          volume: '40мл',
          photo: null,
          decription: null
        }, {
          id: 8,
          name: 'Glenlivet 12 лет',
          price: 750,
          volume: '40мл',
          photo: null,
          decription: null
        }]
      }, {
        id: 3,
        name: 'Коньяки',
        products: [{
          id: 9,
          name: 'Старейшина 5 лет',
          price: 250,
          volume: '40мл',
          photo: null,
          decription: null
        }, {
          id: 10,
          name: 'Арарат 3 лет',
          price: 400,
          volume: '40мл',
          photo: null,
          decription: null
        }, {
          id: 11,
          name: 'Арарат 5 лет',
          price: 450,
          volume: '40мл',
          photo: null,
          decription: null
        }, {
          id: 12,
          name: 'Roullet vs',
          price: 500,
          volume: '40мл',
          photo: null,
          decription: null
        }, {
          id: 13,
          name: 'Hennessy vs',
          price: 750,
          volume: '40мл',
          photo: null,
          decription: null
        }]
      }, {
        id: 4,
        name: 'Ром',
        products: [{
          id: 14,
          name: 'Havana club anejo',
          price: 500,
          volume: '40мл',
          photo: null,
          decription: null
        }, {
          id: 15,
          name: 'Barcelo anejo',
          price: 500,
          volume: '40мл',
          photo: null,
          decription: null
        }, {
          id: 16,
          name: 'Barcelo imperial',
          price: 600,
          volume: '40мл',
          photo: null,
          decription: null
        }]
      }, {
        id: 5,
        name: 'Текила',
        products: [{
          id: 17,
          name: ' Olmeca',
          price: 350,
          volume: '40мл',
          photo: null,
          decription: null
        }, {
          id: 18,
          name: 'Сангрита (к текиле)',
          price: 100,
          volume: '40мл',
          photo: null,
          decription: null
        }]
      }, {
        id: 6,
        name: 'Джин',
        products: [{
          id: 19,
          name: 'Broom dry',
          price: 200,
          volume: '40мл',
          photo: null,
          decription: null
        }, {
          id: 20,
          name: 'Barrister',
          price: 200,
          volume: '40мл',
          photo: null,
          decription: null
        }, {
          id: 21,
          name: 'Gordons Beefeater dry',
          price: 400,
          volume: '40мл',
          photo: null,
          decription: null
        }, {
          id: 22,
          name: 'Beefeater',
          price: 450,
          volume: '40мл',
          photo: null,
          decription: null
        }]
      }, {
        id: 7,
        name: 'Вермуты',
        products: [{
          id: 23,
          name: 'Martini bianco',
          price: 700,
          volume: '100мл',
          photo: null,
          decription: null
        }, {
          id: 24,
          name: 'Martini dry',
          price: 700,
          volume: '100мл',
          photo: null,
          decription: null
        }, {
          id: 25,
          name: 'Martini rosso',
          price: 700,
          volume: '100мл',
          photo: null,
          decription: null
        }]
      }, {
        id: 8,
        name: 'Ликёры',
        products: [{
          id: 26,
          name: 'Абсент',
          price: 350,
          volume: '40мл',
          photo: null,
          decription: null
        }, {
          id: 27,
          name: 'Самбука marcati',
          price: 350,
          volume: '40мл',
          photo: null,
          decription: null
        }, {
          id: 28,
          name: 'Aperol',
          price: 350,
          volume: '40мл',
          photo: null,
          decription: null
        }, {
          id: 29,
          name: 'Campari',
          price: 350,
          volume: '40мл',
          photo: null,
          decription: null
        }, {
          id: 30,
          name: 'Jagermeister',
          price: 500,
          volume: '40мл',
          photo: null,
          decription: null
        }]
      }, {
        id: 9,
        name: 'Водка',
        products: [{
          id: 31,
          name: 'Царская',
          price: 250,
          volume: '40мл',
          photo: null,
          decription: null
        }, {
          id: 32,
          name: 'Акатуй блек',
          price: 250,
          volume: '40мл',
          photo: null,
          decription: null
        }, {
          id: 33,
          name: 'Акатуй вайт',
          price: 250,
          volume: '40мл',
          photo: null,
          decription: null
        }, {
          id: 34,
          name: 'Царская вкусовая',
          price: 300,
          volume: '40мл',
          photo: null,
          decription: null
        }, {
          id: 35,
          name: 'Белуга',
          price: 350,
          volume: '40мл',
          photo: null,
          decription: null
        }, {
          id: 36,
          name: 'Абсолют',
          price: 400,
          volume: '40мл',
          photo: null,
          decription: null
        }]
      }, {
        id: 10,
        name: 'Игристые',
        products: [{
          id: 37,
          name: 'Santo Stefano',
          price: null,
          volume: '750мл',
          photo: null,
          decription: null
        }, {
          id: 38,
          name: 'Beatrice Brut',
          price: null,
          volume: '750мл',
          photo: null,
          decription: null
        }, {
          id: 39,
          name: 'Marques De Lares',
          price: null,
          volume: '750мл',
          photo: null,
          decription: null
        }, {
          id: 40,
          name: 'Fonte Asty',
          price: null,
          volume: '750мл',
          photo: null,
          decription: null
        }, {
          id: 41,
          name: 'Fonte Prosecco',
          price: null,
          volume: '750мл',
          photo: null,
          decription: null
        }, {
          id: 42,
          name: 'Casa Defra Prosecco',
          price: null,
          volume: '750мл',
          photo: null,
          decription: null
        }]
      }, {
        id: 11,
        name: 'Вино',
        products: [{
          id: 43,
          name: 'Арвы Дуар',
          price: 2000,
          volume: '750мл',
          photo: null,
          decription: 'каберне, шардоне, шираз Южная Осетия'
        }, {
          id: 44,
          name: 'Алазанская долина',
          price: 2000,
          volume: '750мл',
          photo: null,
          decription: 'красное полсладкое, белое полсладкое, Грузия'
        }, {
          id: 45,
          name: 'Michel Scheid riesling',
          price: 3500,
          volume: '750мл',
          photo: null,
          decription: 'cухое, белое, Германия'
        }, {
          id: 46,
          name: 'Weinahus Cannis Gewurztraminer',
          price: 3500,
          volume: '750мл',
          photo: null,
          decription: 'полу сухое белое, Германия'
        }, {
          id: 47,
          name: 'Боб&Аль Брос',
          price: 3500,
          volume: '750мл',
          photo: null,
          decription: 'сухое красное Испания'
        }, {
          id: 48,
          name: 'G7 karmenere',
          price: 3500,
          volume: '750мл',
          photo: null,
          decription: 'сухое красное Чили'
        }, {
          id: 49,
          name: 'G7 Chardonney',
          price: 3000,
          volume: '750мл',
          photo: null,
          decription: 'сухое белое, Чили'
        }, {
          id: 50,
          name: 'Anjou Rose',
          price: 3800,
          volume: '750мл',
          photo: null,
          decription: 'розовое полусладкое Франция'
        }, {
          id: 51,
          name: 'Anjou blanc',
          price: 3500,
          volume: '750мл',
          photo: null,
          decription: 'белое полсладкое Франция'
        }]
      }, {
        id: 12,
        name: 'Пиво',
        products: [{
          id: 52,
          name: 'Эсса',
          price: 250,
          volume: '500мл',
          photo: null,
          decription: null
        }, {
          id: 53,
          name: 'Хугарден',
          price: 250,
          volume: '500мл',
          photo: null,
          decription: null
        }, {
          id: 54,
          name: 'Бон сезон',
          price: 250,
          volume: '500мл',
          photo: null,
          decription: null
        }, {
          id: 55,
          name: 'bud',
          price: 250,
          volume: '500мл',
          photo: null,
          decription: null
        }, {
          id: 56,
          name: 'bud безалк',
          price: 250,
          volume: '330мл',
          photo: null,
          decription: null
        }]
      }, {
        id: 13,
        name: 'Кофе',
        products: [{
          id: 57,
          name: 'Кофе американо',
          price: 200,
          volume: null,
          photo: null,
          decription: null
        }, {
          id: 58,
          name: 'Кофе эспрессо',
          price: 150,
          volume: null,
          photo: null,
          decription: null
        }, {
          id: 59,
          name: 'Кофе капучино',
          price: 250,
          volume: null,
          photo: null,
          decription: null
        }, {
          id: 60,
          name: 'кофе латте',
          price: 300,
          volume: null,
          photo: null,
          decription: null
        }, {
          id: 61,
          name: 'Кофе по-ирландски',
          price: 400,
          volume: null,
          photo: null,
          decription: null
        }]
      }, {
        id: 14,
        name: 'Чай',
        products: [{
          id: 62,
          name: 'Ассам',
          price: 300,
          volume: null,
          photo: null,
          decription: null
        }, {
          id: 63,
          name: 'Сеча',
          price: 300,
          volume: null,
          photo: null,
          decription: null
        }, {
          id: 64,
          name: 'Эрл Грей',
          price: 300,
          volume: null,
          photo: null,
          decription: null
        }, {
          id: 65,
          name: 'Молочный улун',
          price: 300,
          volume: null,
          photo: null,
          decription: null
        }, {
          id: 66,
          name: 'Пуэр',
          price: 300,
          volume: null,
          photo: null,
          decription: null
        }, {
          id: 67,
          name: 'Клубника со сливками',
          price: 300,
          volume: null,
          photo: null,
          decription: null
        }, {
          id: 68,
          name: 'Глинтвейн',
          price: 300,
          volume: null,
          photo: null,
          decription: null
        }, {
          id: 69,
          name: 'Дикая вишня',
          price: 300,
          volume: null,
          photo: null,
          decription: null
        }, {
          id: 70,
          name: 'Фирменный чай',
          price: 300,
          volume: null,
          photo: null,
          decription: null
        }]
      }, {
        id: 15,
        name: 'Сок',
        products: [{
          id: 71,
          name: 'Яблочный',
          price: 150,
          volume: null,
          photo: null,
          decription: null
        }, {
          id: 72,
          name: 'Ананасовый',
          price: 150,
          volume: null,
          photo: null,
          decription: null
        }, {
          id: 73,
          name: 'Томатный',
          price: 150,
          volume: null,
          photo: null,
          decription: null
        }, {
          id: 74,
          name: 'Вишнёвый',
          price: 150,
          volume: null,
          photo: null,
          decription: null
        }, {
          id: 75,
          name: 'Апельсиновый',
          price: 150,
          volume: null,
          photo: null,
          decription: null
        }]
      }],
      cart: useStorage('cart', {}),
      table: useStorage('table', 0)
    }
  },
  computed: {},
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
