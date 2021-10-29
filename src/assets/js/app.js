//= ../../../node_modules/slick-carousel/slick/slick.js
//= components/microscope.js

$(function () {});

$("#accordion-button-gallery").on("click", function (event) {
    //= components/slick.js
});

$("#accordion-button-map").on("click", function (event) {
    //= components/map.js
});

Draggable.create(".wheel", {
    type: "rotation",

    onDrag: function () {
        setRotation(this.rotation - 360 * Math.floor(this.rotation / 360));
    },
});
