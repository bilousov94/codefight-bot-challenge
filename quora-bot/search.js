/**
 * Created by Valentyn on 8/14/2017.
 */
//The search bar at the top of every page on Quora allows you to search the most up-to-date people, topics and questions on the site.
//
//    The goal is to quickly return the most relevant results that match the search query entered into the input text field. Every time a new user, question or topic is added (or old ones deleted), subsequent queries must reflect those changes immediately. This is handled using a fast in-memory service.
//
//    Input comes into the service as the following commands:
//
//    ADD <type> <id> <score> <data string that can contain spaces>
//Adds the following <type> of item (user | topic | question | board) with the unique <id> string and <score> float, corresponding to the <data string> that would be used to match queries.
//    DEL <id>
//Deletes the item specified by unique identifier <id>.
//QUERY <number of results> <query string that can contain spaces>
//Queries for the specified integer number of results (up to 20) that match a given <query string>. For a data item to be considered a matching result to a query, each token in the query must be found in the data string as a case-insensitive prefix to any token in the data string. The results are ranked in descending order of score, and only the top few results are given as specified. When there is a tie in the score, newer items (more recently added) should be ranked higher. If there are no results, return an empty list.
//    Your task is to write an equivalent service that will able to answer these queries.
//
//    Example
//
//For
//
//queries = [["ADD", "user", "u1", "1.0", "Adam D'Angelo"],
//    ["ADD", "user", "u2", "1.0", "Adam Black"],
//    ["ADD", "topic", "t1", "0.8", "Adam D'Angelo"],
//    ["ADD", "question", "q1", "0.5",
//        "What does Adam D'Angelo do at Quora?"],
//    ["ADD", "question", "q2", "0.5",
//        "How did Adam D'Angelo learn programming?"],
//    ["QUERY", "10", "Adam"],
//    ["QUERY", "10", "Adam D'A"],
//    ["QUERY", "10", "Adam Cheever"],
//    ["QUERY", "10", "LEARN how"],
//    ["QUERY", "1", "lear H"],
//    ["QUERY", "0", "lea"],
//    ["DEL", "u2"],
//    ["QUERY", "2", "Adam"]]
//the output should be
//
//typeaheadSearch(queries) = [["u2", "u1", "t1", "q2", "q1"],
//    ["u1", "t1", "q2", "q1"],
//    [],
//    ["q2"],
//    ["q2"],
//    [],
//    ["u1", "t1"]]
//Input/Output
//
//    [time limit] 4000ms (js)
//    [input] array.array.string queries
//
//For each valid i, query[i] means a single query. queries[i][0] equals "ADD", "DEL" or "QUERY" and other query elements are given as described above.
//    It is guaranteed that the number of results for each QUERY is not bigger than 20.
//
//Guaranteed constraints:
//    5 ? queries.length ? 100,
//    1 ? queries[i][j].length ? 100.
//
//    [output] array.array.string

function typeaheadSearch(queries) {
    var result = [];
    var helper = [];
    var helper2 = [];
    var split;
    var queryCount = [];
    var finalResult = [];

    for(var i = 0; i < queries.length; i++){
        if(queries[i][0] == 'DEL'){
            var removeElement = queries[i][1];
            for(var k = 0; k < i; k++){
                if(queries[k][0] == "ADD" && queries[k][2] == removeElement ){
                    queries[k] = '';
                    k = queries.length;
                }
            }
        } else if (queries[i][0] == "QUERY"){
            queryCount.push(queries[i][1]);
            if(queries[i][1] > 0 ){

                split = queries[i][2].split(' ');

                for(var r = 0; r < i; r++){
                    if(queries[r][0] == 'ADD'){

                        var triger = true;
                        for(var t = 0; t < split.length; t++){
                            var reg = new RegExp(split[t], 'gi');
                            if(!queries[r][4].match(reg)){
                                triger = false;
                                break;
                            }
                        }
                        if(triger){
                            helper2.push(queries[r][2]);
                            helper2.push(queries[r][3]);
                            if(helper.length > 0){
                                for(var n = 0; n < helper.length; n++){

                                    if(Number(helper[n][1]) <= Number(helper2[1])){
                                        if(helper.length === 1){
                                            helper.unshift(helper2);
                                            break;
                                        } else {
                                            helper.splice(n, 0, helper2);
                                            break;
                                        }

                                    } else if( n == helper.length - 1 && Number(helper[n][1]) <= Number(helper2[1])){
                                        helper.splice((n-1), 0, helper2);
                                        break;
                                    } else if( n == helper.length - 1 && Number(helper[n][1]) > Number(helper2[1])){
                                        helper.push(helper2);
                                        break;
                                    }
                                }
                            } else {
                                helper.push(helper2);
                            }

                            helper2 = [];
                        }
                    }

                }

                result.push(helper);
                helper = [];
            } else {
                var empty = [];
                result.push(empty);
            }



        }

    }

    // function sortFn(a, b){
    //   if (a[1] === b[1]){
    //     return 0;
    //   } else {
    //     return (a[1] < b[1]) ? 1 : -1;
    //   }
    // }

    // for(var i = 0; i < result.length; i++){
    //   result[i].sort(sortFn);
    //   //console.log(result[i])
    // }

    //  console.log(result);

    for(var i = 0; i < result.length; i++){
        for(var j = 0; j < result[i].length; j++){
            helper.push(result[i][j][0]);
        }
        finalResult.push(helper);
        helper = [];
    }

    for(var i = 0; i < queryCount.length; i++){
        if(queryCount[i] < finalResult[i].length && queryCount[i] != 0){
            var indexStart = parseInt(queryCount[i]);
            var cut = finalResult[i].length - indexStart;
            finalResult[i].splice(indexStart, cut);

        }
    }
    return finalResult;


}


typeaheadSearch([["ADD","user","u1","1.0","Adam D'Angelo"],
    ["ADD","user","u2","1.0","Adam Black"],
    ["ADD","topic","t1","0.8","Adam D'Angelo"],
    ["ADD","question","q1","0.5","What does Adam D'Angelo do at Quora?"],
    ["ADD","question","q2","0.5","How did Adam D'Angelo learn programming?"],
    ["QUERY","10","Adam"],
    ["QUERY","10","Adam D'A"],
    ["QUERY","10","Adam Cheever"],
    ["QUERY","10","LEARN how"],
    ["QUERY","1","lear H"],
    ["QUERY","0","lea"],
    ["DEL","u2"],
    ["QUERY","2","Adam"]])