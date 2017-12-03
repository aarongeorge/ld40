import {Point, Vector} from "./Types";
import MovementHeatMap from "./MovementHeatMap";

function normalize(point: Point): Point {
    var norm = Math.sqrt(point.x * point.x + point.y * point.y);
    var normalizedPoint: Point = {x:0, y: 0};
    if (norm != 0) {
        normalizedPoint.x = point.x / norm;
        normalizedPoint.y = point.y / norm;
        return normalizedPoint;
    } else {
        return {x: 0, y: 0};
    }
}

enum DancerState {
    Dancing = 1,
    MovingToStage,
    ClimbingStage,
    MovingToBandMember,
    AttackingBandMember
}

export class Dancer {
    state: DancerState = DancerState.Dancing;
    excitation: number;
    // Encapsulates direction and speed in a vector
    movementVector: Vector;
    position: Point = {x:0,y:0};
    lifetime: number;
    timeTilDirectionChange: number;
    // 2 means, moving vertically should take twice as long
    verticalDampener: number = 2;
    heatmap: MovementHeatMap;
    pixelsPerSecond: number = 400;

    constructor(heatmap: MovementHeatMap) {
        this.lifetime = 0;
        this.excitation = 1.0;
        this.heatmap = heatmap;
    }

    chooseNewMovementVector() {
        // Using the heatmap pick a new target pixel
        var newTarget = this.heatmap.selectAtRandom();
        var div = document.createElement("div");
        div.style.width = "5px";
        div.style.height = "5px";
        div.style.position = "absolute";
        div.style.left = newTarget.x + "px";
        div.style.top = newTarget.y + "px";
        div.style.backgroundColor = "#00ff00";
        document.body.appendChild(div);
        
        console.log(newTarget);

        // this.position = {
        //     x:0,
        //     y:0
        // }
        // var newTarget = {
        //     x:1,
        //     y:1
        // };

        var distance = {
            x: newTarget.x - this.position.x ,
            y: newTarget.y - this.position.y
        }
        var direction = normalize(distance);
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

        // WHERE ARE WE GOING? newtarget
        // FROM WHERE? position
        // HOW LONG SHOULD IT TAKE?
    }

    private move(delta: number) {
        this.position.x += this.movementVector.x * delta;
        this.position.y += this.movementVector.y * delta;
    }

    update(delta: number) {
        // Increase the lifetime counter
        this.lifetime += delta;

        this.timeTilDirectionChange -= delta;
        if (this.timeTilDirectionChange < 0) {
            this.chooseNewMovementVector();
        }
        
        // Move
        this.move(delta);

        // Check if we need to act
    }

    kill() {
        // Remove any timers
    }
}