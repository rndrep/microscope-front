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
	// console.log(all);

	// all.forEach((element, index, array) => {
	// 	element = new SlimSelect({
	// 		select: element,
	// 		searchPlaceholder: "Поиск",
	// 		deselectLabel: "Не найдено",
	// 		showSearch: "false",
	// 		searchText: "Не найдено",
	// 	});
	// });

	document.querySelectorAll(".select-single").forEach((element) => {
		new SlimSelect({
			select: element,
			searchPlaceholder: "Поиск",
			showSearch: "false",
			searchText: "Не найдено",
			placeholder: "-",
			deselectLabel: "×",
			allowDeselect: true,
			showContent: "down",
			onChange: (element) => {
				console.log(element);
			},
		});
	});

	document.querySelectorAll(".select-multiply").forEach((element) => {
		var select = new SlimSelect({
			select: ".select-multiply",
			showContent: "auto",
			limit: false,
			searchPlaceholder: "Поиск",
			showSearch: "false",
			searchText: "Не найдено",
			placeholder: "-",
			deselectLabel: "×",
			allowDeselect: true,
			hideSelectedOption: true,
			closeOnSelect: false,
			showContent: "down",
			onChange: (element) => {
				console.log(element);
			},
		});
	});
	console.log(select.selected());

	// microscope();
});

export default microscope;
