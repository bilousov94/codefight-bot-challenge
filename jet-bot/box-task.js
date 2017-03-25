/**
 * Created by Valentyn on 3/25/2017.
 */
function packageBoxing(pkg, boxes) {
    var pac = pkg[0]*pkg[1]*pkg[2];
    var box;
    var finalArray = [];
    pkg.sort(function(a,b){return a-b});
    for(var i = 0; i<boxes.length; i++){
        box = boxes[i][0]*boxes[i][1]*boxes[i][2];
        if (box >= pac){

            boxes[i].sort(function(a,b){return a-b});

            if(pkg[0] <= boxes[i][0]){
                if(pkg[1] <= boxes[i][1]){
                    if(pkg[2] <= boxes[i][2]){
                        finalArray[i] = box;

                    }
                    else {
                        continue;
                    }
                } else {
                    continue;
                }
            } else {
                continue;
            }

        }

    }

    if (finalArray.length > 0){


        for(var i = 0; i < finalArray.length; i++){
            if (finalArray[i] === undefined){
                finalArray[i] = pac*100;
            }

        }
        return (finalArray.indexOf(Math.min(...finalArray)));

    }
    else {
        return -1;
    }
}