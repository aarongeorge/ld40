/**
 * Modules: Step Sequencer
 *
 * left: 37
 * up: 38
 * right: 39
 * down: 40
 */

// Dependencies
import experience, {keyManager} from '../experience';

const StepSequencer = class {
    constructor (steps) {
        this.originalSteps = steps;
        this.steps = [...this.originalSteps];
        this.threshold = 100;
        this.isRunning = false;
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
        this.steps = [...this.originalSteps];
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
                    step.missed = false;
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
        for (let i = 0; i < this.steps.length; i++) {

            if (this.steps[i].missed) {
                experience.context.fillStyle = '#FF0000';
            }

            else if (typeof this.steps[i].missed === 'undefined') {
                experience.context.fillStyle = '#FFFF00';
            }

            else {
                experience.context.fillStyle = '#00FF00';
            }
            experience.context.fillRect(this.steps[i].start - this.progress + (experience.size.width / 2), 0, 32, 10);
        }
    }
};

// Export `StepSequencer`
export default StepSequencer;
