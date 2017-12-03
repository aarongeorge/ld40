/**
 * Animations: Jig
 */

// Dependencies
import {Animation} from 'ag2d';
import experience from '../experience';

// Class: Jig
const Jig = class extends Animation {
    constructor (spriteSheet) {
        super({
            'context': experience.context,
            'fps': 8,
            'frames': [
                0,
                1,
                2,
                3,
                4
            ],
            'loop': true,
            'loopType': 'normal',
            'name': 'jig',
            spriteSheet
        });
    }
};

// Export `Jig`
export default Jig;
