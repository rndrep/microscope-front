Draggable.create(".wheel", {
    type: "rotation",

    onDrag: function () {
        setRotation(this.rotation - 360 * Math.floor(this.rotation / 360));
    },
});

