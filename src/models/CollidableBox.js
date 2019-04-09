class CollidableBox {
    constructor(mesh, boundingRadius) {
        this.mesh = mesh;
        this.collidableRadius = boundingRadius;
        this.isFalling = { state: false, acc: 0 };
        // this.initBoundingMesh(this.mesh);
    }

    initBoundingMesh(mesh) {
        console.log(mesh);
        this.collidableRadius = mesh.geometry.boundingSphere.radius;
    }

    collide(normal, callback, verticalColliding = false) {
        let collidableRay = new THREE.Raycaster();
        collidableRay.ray.direction.set(normal.x, normal.y, normal.z);

        let origin = this.mesh.position.clone();
        collidableRay.ray.origin.copy(origin);

        let intersections = collidableRay.intersectObjects(collidableList);

        if (verticalColliding) {
            if (intersections.length > 0) {
                callback(intersections);
            } else {
                this.isFalling.state = true;
                this.isFalling.acc += 1;
                this.mesh.position.y -= 1 * this.isFalling.acc;
            }
        } else {
            if (intersections.length > 0) {
                let distance = intersections[0].distance;
                if (distance < this.collidableRadius) {
                    callback();
                }
            }
        }

    }
    collideLeft(controls) {
        let callback = () => {
            this.mesh.position.x -= controls.velocity;
        }
        this.collide({ x: 1, y: 0, z: 0 }, callback);
    }

    collideRight(controls) {
        let callback = () => {
            this.mesh.position.x += controls.velocity;
        }
        this.collide({ x: -1, y: 0, z: 0 }, callback);
    }
    collideFront(controls) {
        let callback = () => {
            this.mesh.position.z -= controls.velocity;
        }
        this.collide({ x: 0, y: 0, z: 1 }, callback);
    }

    collideBack(controls) {
        let callback = () => {
            this.mesh.position.z += controls.velocity;
        }
        this.collide({ x: 0, y: 0, z: -1 }, callback);
    }

    collideBottom(control) {

        let callback = (intersections) => {
            let distance = intersections[0].distance;
            //console.log(`distance: ${distance} CR: ${this.collidableRadius}`)
            if (distance > this.collidableRadius) { //inAir
                this.isFalling.state = true;
                this.isFalling.acc += 0.2;
                this.mesh.position.y -= 1 * this.isFalling.acc;
                //console.log("in air")

                control.isInAir = true;

            }
            if (distance <= this.collidableRadius + 1) { //over the floor
                //console.log("over the floor")
                control.isJumping = false;
                control.isInAir = false;
                this.isFalling.state = false;
                this.isFalling.acc = 0;
                if (distance < this.collidableRadius) {
                    this.mesh.position.y += 1 / 2;
                }
                switch (intersections[0].object.name) {
                    case "plataforma":
                        powerup2.isInUse = true;
                        powerup2.position.y += 1;
                        break;
                    case "thanos":
                        this.mesh.material.color = new THREE.Color("0xffffff")
                        break;
                }
            }


        }
        this.collide({ x: 0, y: -1, z: 0 }, callback, true);
    }

    update(controls) {
        this.collideLeft(controls);
        this.collideRight(controls);
        this.collideFront(controls);
        this.collideBack(controls);
        this.collideBottom(controls);
    }
}