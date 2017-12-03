/**
 * Characters: Dancer01
 */

// Dependencies
import experience, {animationManager} from '../experience';
import BaseCharacter from './base-character';
import Jig from '../animations/jig';
import Dancer02SpriteSheet from '../spritesheets/dancer-02';

// Class: Dancer01
const Dancer01 = class dancer02 extends BaseCharacter {

    // Constructor
    constructor () {
        super('Dancer 02');

        animationManager.add(new Jig(new Dancer02SpriteSheet()));
        this.setAnimation('jig');
        this.setDefaults();
        this.hitBox = {
            'x': 10,
            'y': 7,
            'width': 13,
            'height': 25
        };
        this.x = 20;
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
