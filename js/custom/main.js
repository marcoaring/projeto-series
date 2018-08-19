$(document).ready(function(){
  $(document).on('click', '.main-search__close', function(){
    $('.main-search').removeClass('main-search--open');
    return false;
  });

  $(document).on('click', '.open-search', function(){
    $('.main-search').addClass('main-search--open');
    return false;
  });
});