import {Point, Vector, StageEntryPoint} from "./Types";
import MovementHeatMap from "./MovementHeatMap";
import * as DrawableManager from "./DrawableManager";
import * as Game from "./Game";
import * as Util from "./Util";
import DancerManager, {randomAnimation} from "./DancerManager";
import {Animation} from "ag2d";

enum DancerState {
    HittingDancefloor = 1,
    Dancing,
    MovingToStage,
    ClimbingStage,
    MovingToBandMember,
    AttackingBandMember
}

export default class Dancer {
    state: DancerState = DancerState.HittingDancefloor;
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
    
    // State dependant
    climbingStartPosition: Point;

    constructor(heatmap: MovementHeatMap) {
        this.lifetime = 0;
        this.excitation = 1.0;
        this.heatmap = heatmap;
        this.size = {x:32, y:32};
        this.animation = randomAnimation();
    }

    start() {
        this.chooseNewMovementVector();
        this.movementVector.x *= 3;
        this.movementVector.y *= 3;
        this.timeTilDirectionChange /= 3;
    }

    chooseNewMovementVector() {
        // Using the heatmap pick a new target pixel
        var newTarget = this.heatmap.selectAtRandom();
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
            case DancerState.HittingDancefloor:
                this.updateHittingDancefloor(delta);
                break;
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
        
    }

    private updateHittingDancefloor(delta: number) {
        this.timeTilDirectionChange -= delta;
        if (this.timeTilDirectionChange < 0) {
            this.chooseNewMovementVector();
            this.state = DancerState.Dancing;
        }
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
                var closestPoint: Point = {x: 99999, y: 99999};
                var closestDistance = Util.distanceBetweenPoints(this.position, closestPoint);
                Game.stageEntryMap.points.forEach(stageEntryPoint => {
                    var distance = Util.distanceBetweenPoints(this.position, stageEntryPoint);
                    if (distance < closestDistance) {
                        closestPoint = stageEntryPoint;
                        closestDistance = distance;
                    }
                });
                // Set the direction and time till we get there
                this.movementVector = Util.getVectorForDirectionTime(this.position, closestPoint, 3);
                this.timeUntilEnterStage = 3;
            }
        }

        // Move
        this.move(delta);
    }

    private updateMovingToStage(delta: number) {
        this.timeUntilEnterStage -= delta;

        if (this.timeUntilEnterStage < 0) {
            // Transition to stage climb
            this.state = DancerState.ClimbingStage;
            this.climbingStartPosition = {x: this.position.x, y: this.position.y};
            this.movementVector = {x:0, y:-20};
        }

        // Move
        this.move(delta);
    }
    
    private updateClimbingStage(delta: number) {
        if (this.climbingStartPosition.y - this.position.y >= 27) {
            this.state = DancerState.MovingToBandMember;
            // TODO: Pick a band member
        }
        // Move
        this.move(delta);
    }

    private updateMovingToBandMember(delta: number) {

    }

    private updateAttackingBandMember(delta: number) {

    }

    kill() {
        // Remove any timers
    }
}