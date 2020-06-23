$(document).ready(function () {

  // show the search bar 

  let searchIcon = $(".right-side .fa-search")

  closeIcon = $(".search .fa-times");

  searchIcon.click(function () {

    $(".search").css("transform", "translateY(0)")

  })

  closeIcon.click(function () {

    $(".search").css("transform", "translateY(-100%)")

  })


  // Change The image scr when hover on it

  let img = $(".recent-product .img-fluid"),

    imgSrc = '';

  img.hover(function () {

    imgSrc = $(this).attr("src")

    $(this).attr("src", $(this).data("src"));

  }, function () {

    $(this).attr("src", imgSrc)

  })


});