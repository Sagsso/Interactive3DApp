class Player {
    constructor(name, element, control, ap = {}) {
        this.radius = 5;
        this.name = name;
        this.control = control;
        this.element = element;
        this.label = this.getLabel();
        this.radius = 5;
        if ("label" in ap) {
            if (ap.label) {
                this.showLabel();
            }
        }
    }

    set element(mesh) {
        if (mesh instanceof THREE.Mesh) {
            this._element = mesh;
        } else {
            let geometry = new THREE.SphereGeometry(this.radius, 32, 32);
            let material = new THREE.MeshPhongMaterial({ color: 0xefb810, wireframe: false });
            var object1 = new THREE.Mesh(geometry, material);
            object1.castShadow = true;
            object1.receiveShadow = true;
            this._element = object1;
        }
        this.control.element = this._element;
    }

    get element() {
        return this._element;
    }

    getLabel() {
        return Utilities.label(
            this.element.position,
            Utilities.textTure(this.name, 128, "Bold", "10px", "Arial", "0,0,0,1", 64, 50)
        )
    }

    showLabel() {
        this.element.add(this.label);
    }

    play(scene) {
        this.collidableBox = new CollidableBox(this._element, this.radius);
        scene.add(this.element);
    }
}