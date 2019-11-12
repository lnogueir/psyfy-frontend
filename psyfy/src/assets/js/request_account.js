import $ from 'jquery'

const TAB_MAPPING = {
  0:'welcome-tab',
  1:'info-tab',
  2:'about-tab',
  3:'terms-tab',
}

var current_tab = 0;


function handleGotoNextTab(){
  $(`#${TAB_MAPPING[current_tab]}`).removeClass('active-tab')
  current_tab++;
  var current_active = $(`#${TAB_MAPPING[current_tab]}`)
  current_active.addClass('active-tab')
}


function Main(){
  $(document).ready(function(){
    $('#welcome-tab').click(function(){
        $(`#${TAB_MAPPING[current_tab]}`).removeClass('active-tab')
        $(this).addClass('active-tab')
        current_tab = 0;
    })

    $('#info-tab').click(function(){
      $(`#${TAB_MAPPING[current_tab]}`).removeClass('active-tab')
      $(this).addClass('active-tab')
      current_tab = 1;
    })

    $('#about-tab').click(function(){
        $(`#${TAB_MAPPING[current_tab]}`).removeClass('active-tab')
        $(this).addClass('active-tab')
        current_tab = 2;
    })
    $('#terms-tab').click(function(){
        $(`#${TAB_MAPPING[current_tab]}`).removeClass('active-tab')
        $(this).addClass('active-tab')
        current_tab = 3;
    })
    $('#next-tab').click(function(){
        handleGotoNextTab(current_tab)
    })
    $('.req-tab').hover(function(){
          if(this.id != TAB_MAPPING[current_tab]){
              $(this).addClass('active-tab')
          }
    }, function(){
          if(this.id != TAB_MAPPING[current_tab]){
              $(this).removeClass('active-tab')
          }
    })

  })

}



export default Main ;
