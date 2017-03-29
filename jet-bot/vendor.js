/**
 * Created by Valentyn on 3/29/2017.
 */
function minimalBasketPrice(maxPrice, vendorsDelivery, vendorsProducts) {
    var counter = 0, helper = [], newAr = [], subHelper = [];
    var deliveryHelper = [], help = [], subHelp = [];
    var indexArray = [], indAr = [], indexOfRes = 0, res = [];
    var bigNum = Math.pow(10, 10);
    var minDay = Math.min(...vendorsDelivery);
    var maxDay = Math.max(...vendorsDelivery);
    var index = vendorsDelivery.indexOf(minDay);
    numberOfArrays = vendorsDelivery.length;
    lengthOfArrays = vendorsProducts[0].length;

    for(var i = 0; i < lengthOfArrays; i++){
        for(var j = 0; j < numberOfArrays; j++){
            if(vendorsProducts[j][i] == -1){
                subHelper.push(bigNum);
            } else {
                subHelper.push(vendorsProducts[j][i]);
            }

        }
        newAr.push(subHelper.slice(0,subHelper.length));
        helper.push(subHelper);
        subHelper = [];
    }


    for(var t = 0; t < numberOfArrays; t++){
        for (var p = 0; p < lengthOfArrays; p++){
            var minnn = Math.min(...helper[p]);
            subHelp.push(minnn);

            var indexOfMin = helper[p].indexOf(minnn);
            helper[p][indexOfMin] = bigNum;
        }
        help.push(subHelp);
        subHelp = [];
    }


    for(var i = 0; i < help.length; i++){
        for(var j = 0; j < lengthOfArrays; j++){
            counter +=help[i][j];
        }
        if(counter <= maxPrice){
            subHelp.push(help[i]);
        }

        counter = 0;
    }

    for (var i = 0; i < subHelp.length; i++){
        for (var j = 0; j < lengthOfArrays; j++){
            indAr.push(newAr[j].indexOf(subHelp[i][j]))
        }
        indexArray.push(indAr);
        indAr = [];
    }

    subHelp = [];
    for(var i = 0; i < indexArray.length; i++){
        for(var j = 0; j < lengthOfArrays; j++){
            subHelp.push(vendorsDelivery[indexArray[i][j]]);
        }
        deliveryHelper.push(subHelp);
        subHelp = [];
    }


    for(var i = 0; i < deliveryHelper.length; i++){
        subHelp.push(Math.max(...deliveryHelper[i]));
    }

    indexOfRes = subHelp.indexOf(Math.min(...subHelp));

    res = indexArray[indexOfRes]


    help = res.filter(function(item, pos){
        return res.indexOf(item) == pos;
    })

    return help;

}

minimalBasketPrice(5, [5, 6], [[5], [6]]);