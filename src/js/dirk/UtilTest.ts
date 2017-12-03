import * as Util from "./Util";

var result = Util.getVectorForDirectionTime({x:1, y:1}, {x: 2, y: 2}, 2);
if (result.x != 0.5 || result.y != 0.5) {
    console.log(result);
    throw "getVectorForDirectionTime broken"; 
}