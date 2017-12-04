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
import * as difficulties from '../modules/darude-notes';
import W from '../keys/w';
import A from '../keys/a';
import S from '../keys/s';
import D from '../keys/d';

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
        var difficulty;

        var queryStr = document.location.search;
        var searchParams = new URLSearchParams(queryStr);
        if (searchParams.has("difficulty")) {
            switch (searchParams.get("difficulty")) {
                case "easy":
                difficulty = difficulties.easy;
                    break;
                case "medium":
                difficulty = difficulties.medium;
                    break;
                case "hard":
                difficulty = difficulties.hard;
                    break;
                case "expert":
                difficulty = difficulties.expert;
                    break;
            }
        } else {
            difficulty = difficulties.easy;
        }

        // Create Step Sequencer
        this.stepSequencer = new StepSequencer(difficulties.easy);

        Game.setSceneOne(this);
        
        this.keys = {
            'w': new W(),
            'a': new A(),
            's': new S(),
            'd': new D()
        };
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

        experience.context.drawImage(assetLoader.assets.undies.element, 10, 48);
        experience.context.fillStyle = '#FFFFFF';
        experience.context.textAlign = 'start';
        experience.context.textBaseline = 'top';
        experience.context.fillText(this.stepSequencer.steps.filter((currentStep) => {
            return currentStep.missed === false;
        }).length, 60, 48);

        Game.render();

        this.keys.w.render();
        this.keys.a.render();
        this.keys.s.render();
        this.keys.d.render();
    }

    // Method: update
    update (deltaTime) {
        this.character.update(deltaTime / 1000);
        this.character02.update(deltaTime / 1000);
        this.stepSequencer.update();
        Game.update(deltaTime / 1000);

        this.keys.w.update(deltaTime);
        this.keys.a.update(deltaTime);
        this.keys.s.update(deltaTime);
        this.keys.d.update(deltaTime);
    }

    // Method: enter
    enter () {
        this.stepSequencer.restart();
        audioManager.play('sandstorm');
    }
}

// Export `SceneOne`
export default SceneOne;
