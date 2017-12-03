import {Point} from "./Types";

export function distanceBetweenPoints(pointA: Point, pointB: Point): number {
    var xDiff = Math.abs(pointA.x - pointB.x);
    var yDiff = Math.abs(pointA.y - pointB.y);
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

export function vectorSubtract(v1: Point, v2: Point): Point {
    return {
        x: v2.x - v1.x,
        y: v2.y - v1.y
    }
}
 
export function getVectorForDirectionTime(from: Point, to: Point, timeToGetThere: number): Point {
    var direction = vectorSubtract(from, to);
    var directionNormalized = normalize(direction);
    var distance = distanceBetweenPoints(from, to);

    return {
        x: 1 / timeToGetThere * distance * directionNormalized.x, 
        y: 1 / timeToGetThere * distance * directionNormalized.y
    };
}

export function normalize(point: Point): Point {
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