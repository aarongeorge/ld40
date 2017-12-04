/**
 * Keys: S
 */

// Dependencies
import BaseKey from './base-key';
import Keys from '../spritesheets/s';
import S from '../animations/s';

// Class: S
export default class extends BaseKey {

    // Constructor
    constructor () {
        super('s');
        this.animation = new S(new Keys());
        this.animationManager.add(this.animation);
        this.animation.start();
        this.visible = true;
        this.x = 148;
        this.y = 70;
    }
}
