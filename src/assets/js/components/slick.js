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

    // // the magic
    // responsive: [
    //     {
    //         breakpoint: 1024,
    //         settings: {
    //             slidesToShow: 3,
    //             infinite: true,
    //         },
    //     },
    //     {
    //         breakpoint: 600,
    //         settings: {
    //             slidesToShow: 2,
    //             dots: true,
    //         },
    //     },
    //     {
    //         breakpoint: 300,
    //         settings: "unslick", // destroys slick
    //     },
    // ],
});

$("#gallery-arrow-prev").on("click", function (event) {
    event.preventDefault();
    gallery.slick("slickPrev");
});

$("#gallery-arrow-next").on("click", function (event) {
    event.preventDefault();
    gallery.slick("slickNext");
});
