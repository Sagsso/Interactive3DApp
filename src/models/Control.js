class Control {
    //myControl = new Control("w","d","s","a");
    constructor(up, right, down, left, jump) {
        this.initControls();
        this.up = up || "w";
        this.right = right || "d";
        this.down = down || "s";
        this.left = left || "a";
        this.velocity = 2;
        this.jump = jump || " ";

        this.isInAir = false;
        this.isFalling = false;
        this.isJumping = false;
        this.element = null;

        this.initListeners();
    }

    set up(key) {
        this._up.key = key;
    }

    get up() {
        return this._up.key;
    }

    set right(key) {
        this._right.key = key;
    }

    get right() {
        return this._right.key;
    }

    set down(key) {
        this._down.key = key;
    }

    get down() {
        return this._down.key;
    }

    set left(key) {
        this._left.key = key;
    }

    get left() {
        return this._left.key;
    }

    set jump(key) {
        this._jump.key = key;
    }

    get jump() {
        return this._jump.key;
    }

    initControls() {
        this._up = { key: "", isPressed: false };
        this._right = { key: "", isPressed: false };
        this._down = { key: "", isPressed: false };
        this._left = { key: "", isPressed: false };
        this._jump = { key: "", isPressed: false };
    }

    initListeners() {


    }

    update(vx, vy, m, jf) {
        this.vx = vx;
        this.vy = vy;
        this.m = m;
        this.jumpForce = jf;

        if (this._up.isPressed) {
            this.element.position.z -= this.velocity;
        }
        if (this._right.isPressed) {
            this.element.position.x += this.velocity;
        }
        if (this._down.isPressed) {
            this.element.position.z += this.velocity;
        }
        if (this._left.isPressed) {
            this.element.position.x -= this.velocity;
        }
        if (this._jump.isPressed) {
            console.log(`is Jumping: ${this.isJumping} and is In Air: ${this.isInAir}`)
            if (!this.isJumping && !this.isInAir) {
                this.isJumping = true;
                this.element.position.y += this.jumpForce;
            }
        }
    }

    pressUp() {
        this._up.isPressed = true;
    }
    pressRight() {
        this._right.isPressed = true;
    }
    pressDown() {
        this._down.isPressed = true;
    }
    pressLeft() {
        this._left.isPressed = true;
    }
    pressJump() {
        this._jump.isPressed = true;
    }

    releaseUp() {
        this._up.isPressed = false;
    }
    releaseRight() {
        this._right.isPressed = false;
    }
    releaseDown() {
        this._down.isPressed = false;
    }
    releaseLeft() {
        this._left.isPressed = false;
    }
    releaseJump() {
        this._jump.isPressed = false;
    }

}

//Esta función es la magia, pone false al isCurrent de todas las cámaras
function resetIsCurrent(object) {
    for (const key in object) {
        object[key].isCurrent = false;
        console.log(object[key].isCurrent)
    }
}


document.onkeydown = (e) => {
    mySound3D.play();
    mySound3D2.play();
    mySound3D3.play();
    mySound3D4.play();

    //cámara default
    if (e.key == "1") {
        console.log('Camera default puesta');
        resetIsCurrent(cameras);//Aquí todas las cámaras tiene isCurren = false;
        cameras.default.isCurrent = true;//Aquí la default isCurrent
        cameras.current.cam = cameras.default.cam;
        cameraControl = new THREE.OrbitControls(cameras.current.cam, renderer.domElement);
    }
    if (e.key == "2") {
        console.log('Camera camera2 puesta');
        cameras.current.cam = cameras.camera2.cam;//Aquí todas las cámaras tiene isCurren = false;
        resetIsCurrent(cameras);//Aquí la cámara 2 es la incurrent
        cameras.camera2.isCurrent = true;
        cameraControl = new THREE.OrbitControls(cameras.current.cam, renderer.domElement);
    }
    if (e.key == "3") {
        console.log('Camera camera3 puesta');
        cameras.current.cam = cameras.camera3.cam;//Aquí todas las cámaras tiene isCurren = false;
        resetIsCurrent(cameras);//Aquí la cámara 3 es la incurrent
        cameras.camera3.isCurrent = true;
        cameraControl = new THREE.OrbitControls(cameras.current.cam, renderer.domElement);
    }
    if (e.key == "4") {
        console.log('Camera camera4 puesta');
        cameras.current.cam = cameras.camera4.cam;//Aquí todas las cámaras tiene isCurren = false;
        resetIsCurrent(cameras);//Aquí la cámara 3 es la incurrent
        cameras.camera4.isCurrent = true;
        cameraControl = new THREE.OrbitControls(cameras.current.cam, renderer.domElement);
    }
    if (e.key == "5") {
        console.log('Camera camera5 puesta');
        cameras.current.cam = cameras.camera5.cam;//Aquí todas las cámaras tiene isCurren = false;
        resetIsCurrent(cameras);//Aquí la cámara 3 es la incurrent
        cameras.camera5.isCurrent = true;
        cameraControl = new THREE.OrbitControls(cameras.current.cam, renderer.domElement);
    }

    for (let i = 0; i < Object.keys(players).length; i++) {
        let key = Object.keys(players)[i];
        if (players[key] == null) { return false; }
        let elControl = players[key]["control"];
        //console.log(`Tecla presionada: ${e.key} Tecla up de este jugador ${elControl.up}`)
        switch (e.key) {
            case elControl.up:
                elControl.pressUp();
                break;
            case elControl.right:
                elControl.pressRight();
                break;
            case elControl.down:
                elControl.pressDown();
                break;
            case elControl.left:
                elControl.pressLeft();
                break;
            case elControl.jump:
                elControl.pressJump();
                break;
        }

    }



}

document.onkeyup = (e) => {
    //console.log(Object.keys(players));
    for (let i = 0; i < Object.keys(players).length; i++) {

        let key = Object.keys(players)[i];
        if (players[key] == null) { return false; }
        let elControl = players[key]["control"];

        switch (e.key) {
            case elControl.up:
                elControl.releaseUp();
                break;
            case elControl.right:
                elControl.releaseRight();
                break;
            case elControl.down:
                elControl.releaseDown();
                break;
            case elControl.left:
                elControl.releaseLeft();
                break;
            case elControl.jump:
                elControl.releaseJump();
                break;
        }
    }


}