"use strict";

import $ from "jquery";
import "bootstrap";
import "bootstrap-select";
$.fn.selectpicker.Constructor.BootstrapVersion = "4";

import map from "./modules/map";
import microscope from "./modules/microscope";
import slick from "./modules/slick";

window.addEventListener("DOMContentLoaded", () => {
	// slick-carousel
	$("#accordion-button-gallery").on("click", function (event) {
		slick();
	});

	// leaflet map
	$("#accordion-button-map").on("click", function (event) {
		map();
	});

	$("select").selectpicker();

	// microscope();
});

export default microscope;
