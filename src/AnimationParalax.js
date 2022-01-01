import { html, LitElement } from 'lit';
import { animationParalaxStyles } from './animation-paralax-style.js';

export class AnimationParalax extends LitElement {
  static get styles() {
    return [animationParalaxStyles];
  }

  static get properties() {
    return {
      numLayers: { type: Number },
      images: { type: Array },
      imagesRef: { type: Array },
      styles: { type: Array },
      dayNightAnimation: { type: Boolean, attribute: 'day-night-animation' }
    };
  }

  constructor() {
    super();
    this.numLayers = 0;
    this.images = [];
    this.imagesRef = [];
    this.styles = [];
    this.dayNightAnimation = false;
  }

  connectedCallback() {
    super.connectedCallback();
    const images = [...this.querySelectorAll('img')];
    images.forEach(image => {
      this.images.push(image.src);
      this.imagesRef.push(image.id);
      this.styles.push(image.dataset.style);
    });
    this.numLayers = this.imagesRef.length - 1;
    this.maxTimeSpeed = 30 * 2 ** this.numLayers;
  }

  _dayNightAnimation() {
    return (this.dayNightAnimation) ? html`
      @keyframes dayToNight {
        0% {
          -webkit-filter: hue-rotate(0deg) brightness(1);
          filter: hue-rotate(0deg) brightness(1);
        }
        50% {
          -webkit-filter: hue-rotate(180deg) brightness(0.1);
          filter: hue-rotate(180deg) brightness(0.1);
        }
        100% {
          -webkit-filter: hue-rotate(0deg) brightness(1);
          filter: hue-rotate(0deg) brightness(1);
        }
      }` : '';
  }

  _cssLayers() {
    return html`${this.imagesRef.map((imageRef, index) => `    
        .paralax .${imageRef} {
          background-size: 25% 100%;
          animation: slideshow ${this.maxTimeSpeed / 2 ** index}s linear infinite;
        }
        `)}`;
  }

  _cssImages() {
    this.background = this.images.shift();
    return html`
      .paralax { background: url("${this.background}"); }
      ${this.images.map((image, index) => `.paralax .${this.imagesRef[index+1]} { background: url("${image}") repeat-x; ${this.styles[index+1]} }`).join('')}
    `;
  }

  _layers() {
    this.imagesRef.shift();
    return html`${this.imagesRef.map(imageRef => html`<div class="layer ${imageRef}"></div>`)}`;
  }

  render() {
    return html`
    <style>
      ${this._cssImages()}
      ${this._cssLayers()}
    </style>
    <div class="paralax">
      ${this._layers()}
    </div>
    `;
  }
}
