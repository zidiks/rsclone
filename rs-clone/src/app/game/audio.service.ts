import { Inject, Injectable } from '@angular/core';
import { globalProps } from '../menu/globalprops';
import { States, STATES_TOKEN } from './game.component';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  audioList: Array<HTMLAudioElement> = [];
  constructor(
  ) {
    this.audioList[0] = new Audio(`assets/audio/background.mp3`);
    this.audioList[0].onended = () => {
      this.audioList[0].play();
    }
    this.audioList[1] = new Audio(`assets/audio/coin.wav`);
    this.audioList[2] = new Audio(`assets/audio/death.wav`);
    this.audioList[3] = new Audio(`assets/audio/jump.wav`);
    this.audioList[4] = new Audio(`assets/audio/roll.wav`);
    this.audioList[5] = new Audio(`assets/audio/side-train.wav`);
    this.audioList[6] = new Audio(`assets/audio/hole.wav`);
    this.audioList[7] = new Audio(`assets/audio/menu/tap.wav`);
  }

  sideTrainPlay() {
    if (globalProps.options.sound) {
      this.audioList[5].currentTime = 0;
      this.audioList[5].play();
    }
  }

  deathPlay() {
    if (globalProps.options.sound) this.audioList[2].play()
  }

  tapPlay() {
    if (globalProps.options.sound) this.audioList[7].play()
  }

  holePlay() {
    if (globalProps.options.sound) this.audioList[6].play()
  }

  rollPlay() {
    if (globalProps.options.sound) {
      this.audioList[4].currentTime = 0;
      setTimeout(() => {
        this.audioList[4].play();
      }, 100);
    }
  }

  jumpPlay() {
    if (globalProps.options.sound) {
      this.audioList[3].currentTime = 0;
      this.audioList[3].play();
    }
  }

  coinPlay() {
    if (globalProps.options.sound) {
      this.audioList[1].currentTime = 0;
      this.audioList[1].play();
    }
  }

  playBackground() {
    if (globalProps.options.sound) this.audioList[0].play();
  }

  pauseBackground() {
    this.audioList[0].pause();
  }

  pauseAll() {
    this.audioList.forEach(el => {
      el.currentTime = 0;
      el.pause();
    })
  }

  setVolume() {
    this.audioList.forEach(el => {
      el.volume = globalProps.options.volume;
    })
  }
}
