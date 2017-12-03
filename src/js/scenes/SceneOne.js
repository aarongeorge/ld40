/**
 * Scenes: SceneOne
 */

// Dependencies
import experience, {assetLoader, audioManager} from '../experience';
import {Scene} from 'ag2d';
import Dancer01 from '../characters/dancer-01';
import Dancer02 from '../characters/dancer-02';
import StepSequencer from '../modules/step-sequencer';
import * as Game from '../dirk/Game';
import {notes} from '../modules/darude-notes';

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
        this.stepSequencer = new StepSequencer(notes);

        window.stepSequencer = this.stepSequencer;
    }

    // Method: render
    render () {
        experience.context.drawImage(assetLoader.assets.stage.element, 0, 0, assetLoader.assets.stage.element.width, assetLoader.assets.stage.element.height); 

        // Black background
        // experience.context.fillStyle = '#F2F2F2';
        // experience.context.fillRect(0, 0, experience.size.width, experience.size.height);

        // this.character.render();
        // this.character02.render();
        this.stepSequencer.render(experience.context);

        experience.context.textAlign = 'start';
        experience.context.textBaseline = 'top';
        experience.context.fillStyle = '#00FF00';
        experience.context.fillText(this.stepSequencer.steps.filter((currentStep) => {
            return currentStep.missed === false;
        }).length, 0, 0);
        Game.dancerManager.render();
    }

    // Method: update
    update (deltaTime) {
        this.character.update(deltaTime / 1000);
        this.character02.update(deltaTime / 1000);
        this.stepSequencer.update();
        Game.update(deltaTime / 1000);
    }

    // Method: enter
    enter () {
        this.stepSequencer.restart();
        audioManager.play('sandstorm');
    }
}

// Export `SceneOne`
export default SceneOne;
