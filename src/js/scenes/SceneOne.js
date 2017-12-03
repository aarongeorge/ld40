/**
 * Scenes: SceneOne
 */

// Dependencies
import experience, {assetLoader} from '../experience';
import {Scene} from 'ag2d';
import Dancer01 from '../characters/dancer-01';
import Dancer02 from '../characters/dancer-02';
import StepSequencer from '../modules/step-sequencer';

// Class: SceneOne
class SceneOne extends Scene {

    // Constructor
    constructor () {

        // Set name of scene
        super('SceneOne');

        // Set `video`
        this.video = assetLoader.assets.TestVideo;

        // Create character
        this.character = new Dancer01();
        this.character02 = new Dancer02();

        // Create Step Sequencer
        this.stepSequencer = new StepSequencer([
            {
                'start': 1000,
                'key': 37
            },
            {
                'start': 2000,
                'key': 38
            },
            {
                'start': 3000,
                'key': 39
            },
            {
                'start': 4000,
                'key': 40
            }
        ]);

        window.stepSequencer = this.stepSequencer;
    }

    // Method: render
    render () {

        // Black background
        experience.context.fillStyle = '#F2F2F2';
        experience.context.fillRect(0, 0, experience.size.width, experience.size.height);

        this.character.render();
        this.character02.render();
        this.stepSequencer.render(experience.context);
    }

    // Method: update
    update (deltaTime) {
        this.character.update(deltaTime / 1000);
        this.character02.update(deltaTime / 1000);
        this.stepSequencer.update();
    }

    // Method: enter
    enter () {
        this.stepSequencer.restart();
    }
}

// Export `SceneOne`
export default SceneOne;
