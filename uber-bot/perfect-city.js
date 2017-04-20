/**
 * Created by Valentyn on 4/19/2017.
 */

//Consider a city where the streets are perfectly laid out to form an infinite square grid. In this city finding the shortest path between two given points (an origin and a destination) is much easier than in other more complex cities. As a new Uber developer, you are tasked to create an algorithm that does this calculation.
//
//    Given user's departure and destination coordinates, each of them located on some street, find the length of the shortest route between them assuming that cars can only move along the streets. Each street can be represented as a straight line defined by the x = n or y = n formula, where n is an integer.
//
//Example
//
//For departure = [0.4, 1] and destination = [0.9, 3], the output should be
//perfectCity(departure, destination) = 2.7.
//
//0.6 + 2 + 0.1 = 2.7, which is the answer.
//
//    [time limit] 4000ms (js)
//    [input] array.float departure
//
//An array [x, y] of x and y coordinates. It is guaranteed that at least one coordinate is integer.
//
//    Guaranteed constraints:
//    0.0 ? departure[i] ? 10.0.
//
//    [input] array.float destination
//
//An array [x, y] of x and y coordinates. It is guaranteed that at least one coordinate is integer.
//
//    Guaranteed constraints:
//    0.0 ? destination[i] ? 10.0.
//
//    [output] float
//
//The shorted distance between two points along the streets.

function perfectCity(departure, destination) {
    var result = [];
    var depY = departure[1]%1;
    var destY = destination[1]%1;
    var depX = departure[0]%1;
    var destX = Math.floor(destination[0]%1 * 100) / 100;
    var firstPart = 0;
    var secondPart = 0;

    var differ = Math.ceil(destination[0]) - Math.ceil(departure[0]);
    if(differ === 0 && departure[0] !== 0 && destination[0] !== 0){
        result.push((1 - destX) + (1 - depX));
        result.push(destX + depX);
        firstPart = Math.min(...result);
    } else {
        firstPart = destination[0] - departure[0];
        if(firstPart < 0){
            firstPart *=-1;
        }
    }

    var differY = Math.ceil(destination[1]) - Math.ceil(departure[1]);
    if(differY === 0 && departure[1] !== 0 && destination[1] !== 0){
        result.push((1 - destY) + (1 - depY));
        result.push(destY + depY);
        secondPart = Math.min(...result);
    } else {
        secondPart = destination[1] - departure[1];
        if(secondPart < 0){
            secondPart *= -1;
        }
    }

    return Math.floor((firstPart + secondPart) * 100)/100;
}

perfectCity([0.9, 6], [1.1, 5])