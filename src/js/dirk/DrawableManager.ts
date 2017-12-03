import {Point} from "./Types";

export interface Drawable {
    position: Point
    size: Point
    update: (delta: number) => void;
    // Somethign that let's us fetch a renderable
}

var drawables: Drawable[] = [];

export function addDrawable(drawable: Drawable) {
    drawables.push(drawable);
}

export function render() {
    drawables.forEach(drawable => {
        // drawable.
    });
}