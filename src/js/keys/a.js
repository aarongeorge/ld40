/**
 * Keys: A
 */

// Dependencies
import BaseKey from './base-key';
import Keys from '../spritesheets/a';
import A from '../animations/a';

// Class: A
export default class extends BaseKey {

    // Constructor
    constructor () {
        super('a');
        this.animation = new A(new Keys());
        this.animationManager.add(this.animation);
        this.animation.start();
        this.visible = true;
        this.x = 34;
        this.y = 100;
    }
}
