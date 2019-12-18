import $ from 'jquery';


function onScroll() {
  $(document).ready(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() >= 20) {
        $('.bg-psyfy-navbar').addClass('bg-navbar-img')
      } else {
        $('.bg-psyfy-navbar').removeClass('bg-navbar-img')
      }
    })
  })
}

export { onScroll };
