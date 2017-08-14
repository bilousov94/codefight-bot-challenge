///**
// * Created by Valentyn on 8/14/2017.
// */
//When a user asks a question on Quora, the system automatically tries to improve the question's formatting before showing it to more users. Given a question as an input string, perform formatting corrections according to the following rules:
//
//Strip excessive whitespaces:
//    Remove whitespaces at the start and end, as well as multiple spaces in a row
//Fix spacing around punctuation:
//    Each comma should have a trailing space, but no space preceding it
//Questions should start with a capital letter
//Questions should end with a single question mark (not 0 or more than one).
//Example
//
//For question = " this isn't a relevant question , is it??? ", the output should be
//questionCorrectionBot(question) = "This isn't a relevant question, is it?";
//For question = "Is this answer correct?", the output should be
//questionCorrectionBot(question) = "Is this answer correct?".
//        Input/Output
//
//        [time limit] 4000ms (js)
//    [input] string question
//
//It is guaranteed that the input string contains at least one non-whitespace character, and the first of these characters is a letter (possibly lowercase).
//question.length ? 100.
//
//    [output] string
//
//Corrected version of the question.

function questionCorrectionBot(question) {
    var arr = question.split(' ');
    var arr1 = [];

    var result = '';
    for(var i = 0; i < arr.length; i++){
        if(arr[i] != ''){
            arr1.push(arr[i]);
        }
    }
    var string = arr1.join(' ');

    for(var i = 0; i < string.length; i++){
        if(string[i] != ',' && string[i] != ' ' && string[i] != '?'){
            result += string[i];
        } else if (string[i] == ','){
            if(result[result.length - 1] == ' '){
                result = result.slice(0, -1);
                result += ', '
            } else {
                result += string[i] + ' ';
            }

        } else if(string[i] == ' '){
            if(result[result.length - 1] != ' '){
                result += ' ';
            }
        }
    }
    function res(result){
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

    return(res(result) + '?');
}