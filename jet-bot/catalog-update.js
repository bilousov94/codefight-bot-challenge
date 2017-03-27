/**
 * Created by Valentyn on 3/27/2017.
 */
/*
 Jet.com customers can easily find the item they are looking for by browsing by category. Categories are stored in a catalog that is updated on a regular basis as inventory changes. Your goal is to implement an algorithm that updates the catalog with new items.

 The catalog is given as a two-dimensional array. For each i, catalog[i][0] represents the name of the corresponding category, and catalog[i][j] for j > 0 is the name of some item within this category, which can also be the category of some other items. For each i all elements of catalog[i] except the first are sorted lexicographically, and catalog arrays are sorted lexicographically by their first elements. The name of the topmost directory is "root".

 Given a list of updates, update the catalog with the new items and return the result.

 Example

 For

 catalog = [["Books", "Classics", "Fiction"],
 ["Electronics", "Cell Phones", "Computers", "Ultimate item"],
 ["Grocery", "Beverages", "Snacks"],
 ["Snacks", "Chocolate", "Sweets"],
 ["root", "Books", "Electronics", "Grocery"]]
 and

 updates = [["Snacks", "Marmalade"],
 ["Fiction", "Harry Potter"],
 ["root", "T-shirts"],
 ["T-shirts", "CodeFights"]]
 the output should be

 catalogUpdate(catalog, updates) = [["Books", "Classics", "Fiction"],
 ["Electronics", "Cell Phones", "Computers", "Ultimate item"],
 ["Fiction", "Harry Potter"],
 ["Grocery", "Beverages", "Snacks"],
 ["Snacks", "Chocolate", "Marmalade", "Sweets"],
 ["T-shirts", "CodeFights"],
 ["root", "Books", "Electronics", "Grocery", "T-shir
 */

function catalogUpdate(catalog, updates) {

    if (updates.length > 0) {
        var root;
        for(var i = 0; i < updates.length; i++){

            for(var j = 0; j < catalog.length; j++){
                if (catalog[j][0].indexOf(updates[i][0]) !=- 1 && catalog[j][0] === updates[i][0]){
                    catalog[j].push(updates[i][1]);
                    updates[i] = 0;
                }

            }
            if (updates[i]){
                catalog.unshift(updates[i]);
            } else {
                continue;
            }
        }

        // sort
        for(var i = 0; i < catalog.length; i++){
            var category = catalog[i][0];
            catalog[i].shift();
            catalog[i].sort();
            catalog[i].unshift(category);
            if(catalog[i][0] == "root"){
                root = catalog[i];

            }

        }

        catalog.pop();

        for (var q = 0; q < catalog.length; q++){
            if(catalog[q][0].includes(' ')){
                var replace = catalog[q][0].replace(" ", "-");
                catalog[q][0] = replace;
                catalog[q].push("_mark");

            }
        }

        catalog.sort(function(a, b){
            if(a < b){
                return -1;
            } else {
                return 1;
            }
            return 0;
        });

        function findMe (mark){
            return mark === "_mark";
        }

        for(var t = 0; t < catalog.length; t++){
            if(catalog[t].find(findMe)){
                catalog[t].pop();
                var replace = catalog[t][0].replace("-", " ");
                catalog[t][0] = replace;
            }
        }

        catalog.push(root);
        return catalog;
    } else {
        return catalog;
    }

}