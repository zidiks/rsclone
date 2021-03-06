import * as THREE from 'three';
import { GameComponent } from '../game.component';

interface enemiesProts {
  [key: string]: THREE.Group
}

export class Hole {
  hitBox: THREE.Mesh
  object: THREE.Group = new THREE.Group;

  constructor(
    public prototypes: enemiesProts
  ) {
    this.object.name = 'hole';
    const enemyBox: THREE.Mesh<THREE.BoxGeometry, THREE.MeshPhongMaterial> = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.1, 1.2),
      new THREE.MeshPhongMaterial({ color: 0xff0000 })
    );

    this.hitBox = enemyBox;
    enemyBox.position.y = -1.7;
    enemyBox.position.z = -0.1;
    enemyBox.visible = false;
    this.object.add(prototypes['hole'].clone());
    this.object.add(enemyBox);
  }

  detectCollisionPlayer(object1: any){
    let object2: any = this.hitBox;
    object1.geometry.computeBoundingBox();
    object2.geometry.computeBoundingBox();
    object1.updateMatrixWorld();
    object2.updateMatrixWorld();

    var box1 = object1.geometry.boundingBox.clone();
    box1.applyMatrix4(object1.matrixWorld);

    var box2 = object2.geometry.boundingBox.clone();
    box2.applyMatrix4(object2.matrixWorld);

    return box1.intersectsBox(box2);
  }

  checkCollisions(player: any, endGame: any, states: any) {
    if (this.detectCollisionPlayer(player)) {
      endGame.endFunc('hole');
    }
  }
}
