/**
 * Keys: D
 */

// Dependencies
import BaseKey from './base-key';
import Keys from '../spritesheets/d';
import D from '../animations/d';

// Class: D
export default class extends BaseKey {

    // Constructor
    constructor () {
        super('d');
        this.animation = new D(new Keys());
        this.animationManager.add(this.animation);
        this.animation.start();
        this.visible = true;
        this.x = 102;
        this.y = 100;
    }
}
