import "gsap";
import { gsap } from "gsap";

import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

export function microscope() {
	const smooth = true;

	Draggable.create(".wheel", {
		type: "rotation",
		minimumMovement: 1,

		onDrag: function () {
			// console.log(this.rotation);
			// градус поворота
			return this.rotation - 360 * Math.floor(this.rotation / 360);
		},
	});

	const getMicroscopeImages = async (url) => {
		// GET запрос возвращает промис http://vmicro.tpu.ru/microscope/rock/test
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}

		return await res.json();
	};

	getMicroscopeImages("http://vmicro.tpu.ru/microscope/rock/test").then((data) => {
		for (let i in data) {
			new Microscope(data.ppl).render();
		}
	});

	class Microscope {
		// передаем параметры из вне при создании экземпляра класса
		constructor(images = [], rotation = 0, smoothness = true) {
			// this позволяет обращаться к отдельному экземляру
			this.images = images;
			this.rotation = rotation;
			this.smoothness = smoothness;
		}

		render() {
			const element = document.createElement("div");
			element.className = "microscope";
			const parent = document.querySelector(".microscope-container");

			const el = this.images.map((image, i, all) => {
				const isCurr = i === index;
				const isPrev = i === prev;
				const isNext = i === next;

				const getVisibility = () => {
					return isCurr || isNext ? "visible" : "hidden";
				};
				const getTransform = () => {
					// let scale = getScale();
					let rot = "";
					if (isCurr) {
						rot = curRot;
					}
					if (isPrev) {
						rot = prevRot;
					}
					if (isNext) {
						rot = nextRot;
					}
					// return rot + " " + scale;
					return rot;
				};
				const style = {
					zIndex: 10 + i,
					visibility: getVisibility(),
					transform: getTransform(),
					opacity: getOpacity(),
				};
			});
			element.innerHTML = `
      <div>
			${el
				`<img
				class='yes'
				src=${image}
		/>`
			}
			</div>
			`;

			element.innerHTML = `
			<img
          class='yes'
          src=${image}
      />
			`;
			// src=${this.images}
			parent.append(element);
		}
	}

	// объект не сохранится
	// new Microscope(getMicroscopeImages(), 0).render();
}

export default microscope;
