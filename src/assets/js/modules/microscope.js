import "gsap";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { getResource } from "../services/services.js";
gsap.registerPlugin(Draggable);

export function microscope(urlResource) {
	console.log(urlResource);
	const testUrl = urlResource;
	const smooth = true;
	const microscopePpl = document.createElement("div");
	const microscopeXpl = document.createElement("div");
	const ppl = document.getElementsByClassName("ppl");
	const xpl = document.getElementsByClassName("xpl");
	microscopePpl.className = "microscope";
	microscopeXpl.className = "microscope";

	ppl[0].append(microscopePpl);
	xpl[0].append(microscopeXpl);

	getResource(testUrl).then((data) => {
		let pplMicro = new Microscope(
			microscopePpl,
			data.ppl,
			".ppl",
			// draggables[0].rotation
			0
		).toggleShowDegree();
		pplMicro.render(0);

		let xplMicro = new Microscope(
			microscopeXpl,
			data.xpl,
			".xpl",
			// draggables[0].rotation
			0
		);
		xplMicro.render();

		let draggables = Draggable.create(".wheel", {
			type: "rotation",
			minimumMovement: 1,

			onDrag(e) {
				pplMicro.update(this.rotation - 360 * Math.floor(this.rotation / 360));

				xplMicro.update(this.rotation - 360 * Math.floor(this.rotation / 360));
			},
		});
	});

	class Microscope {
		constructor(
			microscopeElement,
			imgSources = [],
			parentSelector,
			rotation = 0,
			smoothness = true,
			shift
		) {
			this.microscopeElement = microscopeElement;
			this.microscopeDegree = document.querySelector("microscope__degree");
			this.imgSources = imgSources.reverse();
			this.rotation = rotation;
			this.smoothness = smoothness;
			this._shift = shift;
			this.parent = document.querySelector(parentSelector);
			this.initRotation();
			this.createDegree();
			this.createImg();
			this.isShowDegree = false;
		}

		toggleShowDegree() {
			this.isShowDegree = !this.isShowDegree;
			return this;
		}

		initRotation() {
			this.sectionDeg = 360 / this.imgSources.length;
			this.sectionDeg = 5; //TODO: fix
			this.sectionPercent = (this.rotation / this.sectionDeg) % 1;
			this.index = Math.floor(this.rotation / this.sectionDeg);
			this.prev = 0 === this.index ? this.imgSources.length - 1 : this.index - 1;
			this.next = this.imgSources.length - 1 === this.index ? 0 : this.index + 1;
			this.curRot = this.getRotationStyle(this.getDegree());
			this.nextRot = this.getRotationStyle(this.getDegree(-1));
			this.prevRot = this.getRotationStyle(this.getDegree(1));
		}

		update(rotation) {
			this.sectionPercent = (rotation / this.sectionDeg) % 1;
			this.index = Math.floor(rotation / this.sectionDeg);
			this.prev = 0 === this.index ? this.imgSources.length - 1 : this.index - 1;
			this.next = this.imgSources.length - 1 === this.index ? 0 : this.index + 1;
			this.curRot = this.getRotationStyle(this.getDegree());
			this.nextRot = this.getRotationStyle(this.getDegree(-1));
			this.prevRot = this.getRotationStyle(this.getDegree(1));
			this.render(rotation);
		}

		createImg() {
			this.imgElements = this.imgSources.map((image, i, all) => {
				let imgElement = document.createElement("img");
				imgElement.src = image;

				return imgElement;
			});

			this.imgElements.forEach((item) => {
				this.microscopeElement.append(item);
			});

			this.parent.append(this.microscopeElement);
		}

		createDegree() {
			this.microDegDiv = document.querySelector(".microscope__degree");
			this.degree = document.createElement("p");
			this.degree.className = ".degrees";
			// this.degree.innerHTML = 0;
			this.microDegDiv.append(this.degree);
		}

		setRotation(value) {
			this.rotation = value;
		}

		getRotationStyle(rotationValue) {
			return this.sectionDeg ? `rotate(${rotationValue}deg)` : "";
		}

		getDegree(delta = 0) {
			let offset = 0;
			if (delta > 0) {
				offset = this.sectionDeg;
			} else if (delta < 0) {
				offset = this.sectionDeg * -1;
			}
			return this.sectionPercent * this.sectionDeg + offset;
		}

		set shift(shift) {
			if (typeof shift === "number" && shift == (5 || 10)) {
				this._shift = shift;
			} else {
				console.log("Недопустимое значение");
			}
		}

		get shift() {
			return this._shift;
		}

		showShift() {
			console.log(`значение ${this._shift} `);
		}

		render(rotation) {
			console.log(rotation);
			if (this.isShowDegree) {
				this.degree.innerHTML = `${Math.round(rotation)}°`;
			}

			this.imgElements.forEach((item, i) => {
				const isCurr = i === this.index;
				const isPrev = i === this.prev;
				const isNext = i === this.next;

				const getVisibility = () => {
					return isCurr || isNext ? "visible" : "hidden";
				};

				const getTransform = () => {
					let rotate = "";
					if (isCurr) {
						rotate = this.curRot;
					}
					if (isPrev) {
						rotate = this.prevRot;
					}
					if (isNext) {
						rotate = this.nextRot;
					}
					// return rot + " " + scale;
					return rotate;
				};

				const getOpacity = () => {
					if (isCurr) {
						return 1;
					}
					if (this.sectionPercent === 0) {
						if (!isCurr) {
							return 0;
						}
					} else {
						if (isNext) {
							return this.sectionPercent;
						}
					}
				};

				const style = {
					zIndex: 10 + i,
					visibility: getVisibility(),
					transform: getTransform(),
					opacity: getOpacity(),
				};

				item.className = `microscope__img ${isCurr ? "yes" : ""}`;
				item.style.visibility = style.visibility;
				item.style.zIndex = style.zIndex;
				item.style.transform = style.transform;
				item.style.opacity = style.opacity;
			});
		}
	}
}

export default microscope;
