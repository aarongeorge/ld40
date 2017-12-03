/**
 * Characters: Dancer01
 */

// Dependencies
import experience, {animationManager} from '../experience';
import BaseCharacter from './base-character';
import Bob from '../animations/bob';
import Dancer01SpriteSheet from '../spritesheets/dancer-01';

// Class: Dancer01
const Dancer01 = class dancer01 extends BaseCharacter {

    // Constructor
    constructor () {
        super('Dancer 01');

        animationManager.add(new Bob(new Dancer01SpriteSheet()));
        this.setAnimation('bob');
        this.setDefaults();
        this.hitBox = {
            'x': 12,
            'y': 7,
            'width': 8,
            'height': 25
        };
    }

    // Method: render
    render () {

        // Draw `currentAnimation`
        animationManager.animations[this.currentAnimation.name].render(experience.context, this.x, this.y);

        // Draw debug information
        if (experience.debug) {

            // Draw position and width
            experience.context.strokeStyle = '#FF0000';
            experience.context.strokeRect(this.x, this.y, animationManager.animations[this.currentAnimation.name].spriteSheet.frameWidth, animationManager.animations[this.currentAnimation.name].spriteSheet.frameHeight);

            // Draw hitbox
            experience.context.strokeStyle = '#00FF00';
            experience.context.strokeRect(this.x + this.hitBox.x, this.y + this.hitBox.y, this.hitBox.width, this.hitBox.height);
        }
    }
};

// Export `Dancer01`
export default Dancer01;
