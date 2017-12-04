/**
 * Keys: BaseKey
 */

// Dependencies
import experience from '../experience';
import {AnimationManager} from 'ag2d';

// Class: W
const BaseKey = class baseKey {

    // Constructor
    constructor (name = 'Base Key') {
        this.name = name;

        // Defaults
        this.x = 0;
        this.y = 0;
        this.visible = false;
        this.animationManager = new AnimationManager();
    }

    // Method: render
    render () {
        if (this.visible) {
            this.animationManager.animations[this.animationManager.animationNames[0]].render(experience.context, this.x, this.y);
        }
    }

    // Method: update
    update (deltaTime) {
        this.animationManager.update(deltaTime);
    }
};

// Export `BaseKey`
export default BaseKey;
