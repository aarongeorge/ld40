export interface Vector {
    x: number,
    y: number
}

export interface Point {
    x: number,
    y: number
}

export interface HeatmapPoint {
    x: number,
    y: number,
    factor: number
}

interface Eventable {
    name: string,
    fn: () => void
}

export class EventEmitter {
    fns: Eventable[] = [];

    addEventListener(event:string, fn:() => void) {
        this.fns.push({
            name: event,
            fn: fn
        });
    }
 
    emit(event:string) {
        this.fns.map(o => {
            if (o.name == event) {
                o.fn();
            }
        })
    }
}