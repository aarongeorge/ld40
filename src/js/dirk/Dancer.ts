import {Point, Vector, StageEntryPoint} from "./Types";
import MovementHeatMap from "./MovementHeatMap";
import * as DrawableManager from "./DrawableManager";
import * as Game from "./Game";
import * as Util from "./Util";
import DancerManager, {randomAnimation} from "./DancerManager";
import {Animation} from "ag2d";

enum DancerState {
    Dancing = 1,
    MovingToStage,
    ClimbingStage,
    MovingToBandMember,
    AttackingBandMember
}

export default class Dancer {
    state: DancerState = DancerState.Dancing;
    excitation: number;
    // Encapsulates direction and speed in a vector
    movementVector: Vector;
    position: Point = {x:0,y:0};
    size: Point;
    lifetime: number;
    timeTilDirectionChange: number;
    // 2 means, moving vertically should take twice as long
    verticalDampener: number = 2;
    heatmap: MovementHeatMap;
    pixelsPerSecond: number = 15;
    timeToAct: number = 5;
    timeUntilEnterStage: number;
    animation: any;

    constructor(heatmap: MovementHeatMap) {
        this.lifetime = 0;
        this.excitation = 1.0;
        this.heatmap = heatmap;
        this.size = {x:32, y:32};
        this.animation = randomAnimation();
    }

    chooseNewMovementVector() {
        // Using the heatmap pick a new target pixel
        var newTarget = this.heatmap.selectAtRandom();
        console.log("New Target", newTarget);
        var distance = {
            x: newTarget.x - this.position.x ,
            y: newTarget.y - this.position.y
        }
        var direction = Util.normalize(distance);
        var directionUnit = Math.sqrt(Math.pow(Math.abs(distance.x), 2) + Math.pow(Math.abs(distance.y), 2));
        
        // Apply the vertical movement dampener to make them go slower on the y axis (because of perspective)
        var dampenedDistance = {
            x: distance.x,
            y: distance.y * this.verticalDampener
        };
        var dampenedDistanceUnit = Math.sqrt(Math.pow(Math.abs(dampenedDistance.x), 2) + Math.pow(Math.abs(dampenedDistance.y), 2));

        // At 1 pixel per second
        var itShouldTakeInSeconds = dampenedDistanceUnit / this.pixelsPerSecond;
        this.timeTilDirectionChange = itShouldTakeInSeconds;
        this.movementVector = {
            x: direction.x * this.pixelsPerSecond * (directionUnit/dampenedDistanceUnit),
            y: direction.y * this.pixelsPerSecond * (directionUnit/dampenedDistanceUnit) 
        };
        console.log("MOVEMENT VECTOR", this.movementVector);
    }

    private move(delta: number) {
        this.position.x += this.movementVector.x * delta;
        this.position.y += this.movementVector.y * delta;
    }

    private act() {
        
    }

    update(delta: number) {
        this.animation.update(delta * 1000);
        // Increase the lifetime counter
        this.lifetime += delta;

        switch (this.state) {
            case DancerState.Dancing:
                this.updateDancing(delta);       
                break;
            case DancerState.MovingToStage:
                this.updateMovingToStage(delta);
                break;

            case DancerState.ClimbingStage:
                this.updateClimbingStage(delta);
                break;

            case DancerState.MovingToBandMember:
                this.updateMovingToBandMember(delta);
                break;

            case DancerState.AttackingBandMember:
                this.updateAttackingBandMember(delta);
                break;
        }
        
        // Move
        this.move(delta);
    }

    private updateDancing(delta: number) {
        this.timeTilDirectionChange -= delta;
        if (this.timeTilDirectionChange < 0) {
            this.chooseNewMovementVector();
        }

        // Check if we want to try to get to the stage
        this.timeToAct -= delta;
        if (this.timeToAct < 0) {
            if (Math.random() < Game.chanceOfAttack * delta) {
                // ATTAAAACK!
                this.state = DancerState.MovingToStage;
                // Find the closest stage entry point
                var closestPoint: StageEntryPoint = {
                    entryPoint: {x: 99999, y: 99999},
                    exitPoint: {x: 99999, y: 99999}
                };
                var closestDistance = Util.distanceBetweenPoints(this.position, closestPoint.entryPoint);
                Game.stageEntryPoints.forEach(stageEntryPoint => {
                    var distance = Util.distanceBetweenPoints(this.position, stageEntryPoint.entryPoint);
                    if (distance < closestDistance) {
                        closestPoint = stageEntryPoint;
                        closestDistance = distance;
                    }
                });
                // Set the direction and time till we get there
            }
        }
    }

    private updateMovingToStage(delta: number) {
        this.timeUntilEnterStage -= delta;

        if (this.timeUntilEnterStage < 0) {
            // Transition to stage climb
        }
    }
    
    private updateClimbingStage(delta: number) {

    }

    private updateMovingToBandMember(delta: number) {

    }

    private updateAttackingBandMember(delta: number) {

    }

    kill() {
        // Remove any timers
    }
}