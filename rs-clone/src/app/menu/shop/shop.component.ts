import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { audioManager, MenuComponent} from '../menu.component';
import { AuthService } from '../../auth.service';
import { SkinService } from '../skin.service';
import { globalProps } from '../globalprops';
import { UserService } from '../user.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {
  menuLinks: HTMLDListElement[] | undefined;
  activeLink = 0;
  shopSkins = [
    {
      name: 'bobby',
      price: 0,
      model: 'assets/skins/0/menu.fbx',
      color: 'red'
    },
    {
      name: 'batman',
      price: 1500,
      model: 'assets/skins/1/menu.fbx',
      color: 'black'
    },
    {
      name: 'skeleton',
      price: 2500,
      model: 'assets/skins/2/menu.fbx',
      color: 'white'
    }
  ];
  currentSkin: number = 0;
  globalProps = globalProps;
  activeSkin: number = globalProps.activeSkin;
  boughtSkins: Array<Object> = globalProps.boughtSkins;
  skinName: any;

  constructor(
    public authService: AuthService,
    public skinManager: SkinService,
    public userManager: UserService
  ) { }

  moveMenu = (e: any) => {
    if (this.menuLinks) {
      if (e.key == 'ArrowDown' || e.key == 'ArrowUp') {
        this.menuLinks[this.activeLink].classList.remove('shop-active-link');
      if(e.key == 'ArrowDown'){
        if (this.activeLink + 1 > this.menuLinks.length - 1) this.activeLink = 0; else this.activeLink++;
      }
      if(e.key == 'ArrowUp'){
        if (this.activeLink - 1 < 0) this.activeLink = this.menuLinks.length - 1; else this.activeLink--;
      }
      this.menuLinks[this.activeLink].classList.add('shop-active-link');
      audioManager.playLink();
      } else {
        if(e.key == 'Enter'){
          this.menuLinks[this.activeLink].click();
        }
      }
    }
  }
  nextSkin() {
    if (this.currentSkin + 1 > this.shopSkins.length - 1) this.currentSkin = 0; else this.currentSkin++;
    this.renderCurrSkin();
  }

  prevSkin() {
    if (this.currentSkin - 1 < 0) this.currentSkin = this.shopSkins.length - 1; else this.currentSkin--;
    this.renderCurrSkin();
  }

  renderCurrSkin() {
    this.skinName.style.color = this.shopSkins[this.currentSkin].color;
    this.skinManager.showSkin(this.shopSkins[this.currentSkin].model);
  }

  ngOnInit(): void {
    this.currentSkin = globalProps.activeSkin;
    this.skinName = <HTMLDivElement>document.getElementById('skin-name');
    this.menuLinks = Array.prototype.slice.call(<HTMLDivElement><unknown>document.getElementsByClassName('shop-link'));
    document.addEventListener('keydown', this.moveMenu, false);
    this.renderCurrSkin();
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.moveMenu, false);
    if (this.currentSkin !== globalProps.activeSkin) this.skinManager.showSkin(this.shopSkins[globalProps.activeSkin].model);
  }

}
