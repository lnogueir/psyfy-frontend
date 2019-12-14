import $ from 'jquery';

const color = '#CD594A'

function putColor(){
    $('.bg-psyfy-navbar').css('background', color)
}

function makeTransparent(){
  if($(window).scrollTop() < 50){
      $('.bg-psyfy-navbar').css('background', 'transparent')
  }
}

function onScroll(){
  $(document).ready(function(){
      $(window).scroll(function(){
          $('.bg-psyfy-navbar').css(
              'background', $(this).scrollTop() > 50 ?
              color :
              'transparent'
            )
      })
  })
}

export { onScroll, putColor, makeTransparent };
