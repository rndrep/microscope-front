$("#gallery").slick({
    // normal options...
    arrows: true,
    dots: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,

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
