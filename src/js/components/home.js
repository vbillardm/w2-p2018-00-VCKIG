

document.addEventListener("DOMContentLoaded", function(){

    document.querySelector('.menu__button--open').addEventListener('click', function(){
        var menu = document.querySelector('.header__navbar__mobile .header__navbar--list')
        menu.style.visibility = "visible";
        menu.style.opacity = 1;
    });
    document.querySelector('.menu__button--close').addEventListener('click', function(){
        var menu = document.querySelector('.header__navbar__mobile .header__navbar--list')
        menu.style.visibility = "hidden";
        menu.style.opacity = 0;
    });


});