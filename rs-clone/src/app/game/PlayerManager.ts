interface States {
    control: {
      jumpPressed: boolean,
      jumpCount: number,
      jumpLength: number,
      jumpHeight: number,
      xpos: number
    },
    play: boolean,
    end: boolean,
    startAnim: boolean
}

export function setPlayerPos(target: THREE.Group, states: States) {
    if (target.position.x < ( states.control.xpos * 2 ) && (states.control.xpos * 2) - target.position.x > 0.1) {
      target.position.x += 0.1;
    } else if (target.position.x > ( states.control.xpos * 2 ) && target.position.x - (states.control.xpos * 2) > 0.1) {
      target.position.x -= 0.1;
    } else {
      target.position.x = states.control.xpos * 2;
    }
    if(states.control.jumpPressed){
      states.control.jumpCount++;
      states.control.jumpHeight = 0.05*states.control.jumpLength*Math.sin(Math.PI*states.control.jumpCount/states.control.jumpLength);
    }
    if(states.control.jumpCount>states.control.jumpLength){
      states.control.jumpCount=0;
      states.control.jumpPressed=false;
      states.control.jumpHeight=0;
    }
    target.position.y = states.control.jumpHeight;
  
  }