class CollidableBox {
    constructor(mesh, boundingRadius) {
        this.mesh = mesh;
        this.collidableRadius = boundingRadius;
        // this.initBoundingMesh(this.mesh);
    }

    initBoundingMesh(mesh) {
        console.log(mesh);
        this.collidableRadius = mesh.geometry.boundingSphere.radius;
    }

    collide(normal, callback) {
        let collidableRay = new THREE.Raycaster();
        collidableRay.ray.direction.set(normal.x, normal.y, normal.z);

        let origin = this.mesh.position.clone();
        collidableRay.ray.origin.copy(origin);

        let intersections = collidableRay.intersectObjects(collidableList);

        if (intersections.length > 0) {
            let distance = intersections[0].distance;
            if (distance < this.collidableRadius) {
                // console.log(intersections[0].distance);
                // console.log(this.collidableRadius);
                callback();
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

    update(controls) {
        this.collideLeft(controls);
        this.collideRight(controls);
        this.collideFront(controls);
        this.collideBack(controls);
    }
}