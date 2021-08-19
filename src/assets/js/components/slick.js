var gallery = $("#gallery");

gallery.slick({
    // normal options...
    arrows: false,
    dots: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    adaptiveHeight: true,
    infinite: true,
});

$("#gallery-arrow-prev").on("click", function (event) {
    event.preventDefault();
    gallery.slick("slickPrev");
});

$("#gallery-arrow-next").on("click", function (event) {
    event.preventDefault();
    gallery.slick("slickNext");
});
