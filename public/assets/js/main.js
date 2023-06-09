
$('.slider_menu').slick({
  slidesToShow: 3,
  infinite: false,
  focusOnSelect: true,
  arrows: false
})

var open = document.querySelector('.left_menu');
var anim_close = document.querySelector('.anim_close');
var anim_close_btn = document.querySelector('.anim_close_btn');
var anim_menu_modal = document.querySelector('.anim_menu_modal');

open.onclick = function () {
  open.classList.toggle('open');
}

anim_close.onclick = function () {
  open.classList.remove('open');
}
anim_close_btn.onclick = function () {
  open.classList.remove('open');
}
anim_menu_modal.onclick = function () {
  open.classList.remove('open');
}

$('.close_button').on('click', function () {
  $('.left_menu').removeClass("open");
});