"use strict";

import $ from "jquery";
import "bootstrap";
import SlimSelect from "slim-select";

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

	let all = document.querySelectorAll(".single");
	console.log(all);

	document.querySelectorAll(".single").forEach(function (node) {
		new SlimSelect({
			select: ".single",
			searchPlaceholder: "Поиск",
			deselectLabel: "Не найдено",
			showSearch: "false",
			searchText: "Не найдено",
		});
	});

	// microscope();
});

export default microscope;
