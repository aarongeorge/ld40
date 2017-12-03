/**
 * Characters: Base Character
 */

// Dependencies
import experience, {animationManager, keyManager} from '../experience';

// Class: BaseCharacter
const BaseCharacter = class baseCharacter {

    // Constructor
    constructor (name = 'Base Character') {
        this.name = name;

        // Call `setDefaults`
        this.setDefaults();
    }

    // Method: render
    render () {
        // console.log(`Render: ${this.name}`);

        experience.fillStyle = '#FF00FF';
        experience.fillRect(this.x, this.y, this.hitBox.width, this.hitBox.height);
    }

    // Method: update
    update (deltaTime) {

        // console.log(`Update: ${this.name}`);

        // Call `handleKeys`
        this.handleKeys();

        // Call `handleColissions`
        this.handleCollisions(deltaTime);
    }

    // Method: setDefaults
    setDefaults () {

        // Defaults
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;
        this.vx = 0;
        this.vy = 0;
        this.gravity = 9.807;
        this.speed = 300;
        this.speedMultiplier = 2;
        this.mass = 0.0062;
        this.jumpForce = -300;
        this.isRunning = false;
        this.hitBox = {
            'x': 0,
            'y': 0,
            'width': 20,
            'height': 20
        };
        this.isJumping = false;
    }

    // Method: handleKeys
    handleKeys () {

        // A and D are down
        if (keyManager.isDown(65) && keyManager.isDown(68)) {

            // Update `dx`
            this.dx = 0;
        }

        // Only A is down
        else if (keyManager.isDown(65)) {

            // Update `dx`
            this.dx = -1;
        }

        // Only D is down
        else if (keyManager.isDown(68)) {

            // Update `dx`
            this.dx = 1;
        }

        // Neither A or D are down
        else {

            // Update `dx`
            this.dx = 0;
        }

        // Space is down
        if (keyManager.isDown(32)) {

            // Update `vy`
            this.vy = this.jumpForce;
        }

        // Shift is down
        if (keyManager.isDown(16)) {

            // Set `isRunning` to `true`
            this.isRunning = true;
        }

        // Shift is not down
        else {

            // Set `isRunning` to `false`
            this.isRunning = false;
        }
    }

    // Method: handleCollisions
    handleCollisions (deltaTime) {

        // Update Y
        this.vy += (this.gravity / this.mass) * deltaTime / 2;
        this.y += this.vy * deltaTime;
        this.vy += (this.gravity / this.mass) * deltaTime / 2;

        // Update X
        if (this.isRunning) {
            this.x += this.dx * (this.speed * this.speedMultiplier) * deltaTime;
        }

        else {
            this.x += this.dx * this.speed * deltaTime;
        }

        // Collision with walls
        if (this.x + this.hitBox.x + this.hitBox.width > experience.size.width) {
            this.x = experience.size.width - this.hitBox.width - this.hitBox.x;
        }

        if (this.y + this.hitBox.y + this.hitBox.height > experience.size.height) {
            this.y = experience.size.height - this.hitBox.height - this.hitBox.y;
        }

        if (this.x + this.hitBox.x < 0) {
            this.x = -this.hitBox.x;
        }

        if (this.y + this.hitBox.y < 0) {
            this.y = -this.hitBox.y;
        }
    }

    // Method: setAnimation
    setAnimation (animationName) {
        if (this.currentAnimation) {
            animationManager.animations[this.currentAnimation.name].stop();
        }

        this.currentAnimation = animationManager.animations[animationName];
        animationManager.animations[this.currentAnimation.name].start();
    }
};

// Export `BaseCharacter`
export default BaseCharacter;
