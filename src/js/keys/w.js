/**
 * Keys: W
 */

// Dependencies
import BaseKey from './base-key';
import Keys from '../spritesheets/w';
import W from '../animations/w';

// Class: W
export default class extends BaseKey {

    // Constructor
    constructor () {
        super('w');
        this.animation = new W(new Keys());
        this.animationManager.add(this.animation);
        this.animation.start();
        this.visible = true;
        this.x = 0;
        this.y = 100;
    }
}
