/**
 * Modules: Step Sequencer
 *
 * left: 37
 * up: 38
 * right: 39
 * down: 40
 */

// Dependencies
import experience, {assetLoader, keyManager} from '../experience';
import cloneDeep from 'lodash.clonedeep';

const StepSequencer = class {
    constructor (userSteps) {
        this.originalSteps = cloneDeep(userSteps);
        this.steps = cloneDeep(userSteps);
        this.threshold = 50;
        this.isRunning = false;
        this.renderingOffset = {
            'x': 10,
            'y': 0
        };
        this.hitMarker = {
            'width': 4,
            'height': 10
        };
        this.bars = {
            'height': 10,
            'width': 4,
            'colours': {
                'hit': '#00FF00',
                'missed': '#FF0000',
                'neutral': '#FFFF00'
            },
            'timeScale': 5
        };
    }

    start () {
        this.startTime = window.performance.now();
        this.isRunning = true;
    }

    stop () {
        this.isRunning = false;
    }

    restart () {
        this.stop();
        this.steps = cloneDeep(this.originalSteps);
        this.start();
    }

    update () {
        if (this.isRunning) {

            // Get current time
            this.progress = window.performance.now() - this.startTime;

            // Loop over each step that's passed in time
            const passedSteps = this.getPassedSteps(this.progress, this.threshold);

            // Set missed
            passedSteps.forEach((step) => {
                step.missed = true;
            });

            // Loop over each step that's currently happening
            const currentSteps = this.getCurrentSteps(this.progress, this.threshold);

            currentSteps.forEach((step) => {

                // Check the appropriate key is down
                if (keyManager.isDown(step.key)) {

                    if (keyManager.keysDown[step.key] - this.startTime >= step.start - this.threshold) {
                        step.missed = false;
                    }
                }
            });
        }
    }

    getCurrentSteps (currentTime, threshold = 100) {
        return this.steps.filter((currentStep) => {
            return currentTime >= currentStep.start - threshold && currentTime <= currentStep.start + threshold;
        });
    }

    getPassedSteps (currentTime, threshold = 100) {
        return this.steps.filter((currentStep) => {
            return currentTime > currentStep.start + threshold && typeof currentStep.missed === 'undefined';
        });
    }

    render () {
        // Draw background
        const backgroundPattern = experience.context.createPattern(assetLoader.assets.notesBackground.element, 'repeat');

        experience.context.rect(0, 0, experience.size.width, assetLoader.assets.notesBackground.element.height);
        experience.context.fillStyle = backgroundPattern;
        experience.context.fill();

        for (let i = 0; i < this.steps.length; i++) {

            // Set correct colour for bar
            if (this.steps[i].missed) {
                experience.context.fillStyle = this.bars.colours.missed;
            }

            else if (typeof this.steps[i].missed === 'undefined') {
                experience.context.fillStyle = this.bars.colours.neutral;
            }

            else {
                experience.context.fillStyle = this.bars.colours.hit;
            }

            let yOffset = 0;

            switch (this.steps[i].key) {
                case 37: {
                    yOffset = 0;
                    break;
                }

                case 38: {
                    yOffset = this.bars.height;
                    break;
                }

                case 39: {
                    yOffset = this.bars.height * 2;
                    break;
                }

                case 40: {
                    yOffset = this.bars.height * 3;
                    break;
                }
            }

            // Draw bar
            experience.context.fillRect(this.renderingOffset.x + ((this.steps[i].start - this.progress) / this.bars.timeScale), yOffset + this.renderingOffset.y, this.bars.width, this.bars.height);

            // Draw hit marker
            experience.context.drawImage(assetLoader.assets.hitMarker.element, this.renderingOffset.x, this.renderingOffset.y);
        }
    }
};

// Export `StepSequencer`
export default StepSequencer;
