(function(window){
    //I recommend this
    'use strict';
    function define_BG(){
        var BG = {};

        /* ---------
           UTILITY
           --------- */

        BG.notNumber = function(val){
            val = Number(val);
            if (isNaN(val)) {
                return 0;
            }
            return val;
        };

        BG.toNumber = function(num, msg) {
            if(msg === undefined) msg = 'BG.toNumber';
            num = Number(num);
            if(isNaN(num)) {
                throw new Error("expected a number in " + msg + ".");
            } else {
                return num;
            }
        };

        BG.isPositive = function(num, msg) {
            if(msg === undefined) msg = 'BG.isPositive';
            num = this.toNumber(num, msg);
            if(num < 0) {
                throw new Error("expected a positive number in " + msg + ".");
            } else {
                return num;
            }
        };

        BG.isNegative = function(num, msg) {
            if(msg === undefined) msg = 'BG.isNegative';
            num = this.toNumber(num, msg);
            if(num > 0) {
                throw new Error("expected a negative number in " + msg + ".");
            } else {
                return num;
            }
        };

        BG.isNatural = function(num, msg) {
            if(msg === undefined) msg = 'BG.isNatural';
            num = this.isPositive(num, msg);
            if (Number.isInteger(num)) {
                return num;
            } else {
                throw new Error("expected a natural number in " + msg + ".");
            }
        };
    
        /* ---------
           DICE ROLL
           --------- */

        // dice roll, returns number
        BG.diceRoll = function(x, y, times, msg) {
            if(msg === undefined) msg = 'BG.diceRoll';
            if (times == undefined) {
                times = 1;
            } else {
                times = BG.isNatural(times, msg);
            }
            if (y == undefined) {
                y = 1;
            } else {
                y = BG.isNatural(y);
            }
            if (x == undefined) {
                throw new Error("expected a number in " + msg + ".");
            } else {
                x = BG.isNatural(x);
            }

            var result = 0;
            var arr = [x, y];
            arr = arr.sort(); // TODO: use BG.sort
            var roll;
            for (var i = 1; i <= times; i++) {
                roll = Math.floor(Math.random() * (arr[1] - arr[0] + 1) + arr[0]); 
                result += roll;
            }
            return result;
        };

        // dX any number dice roll, returns number
        BG.dX = function(num, times) {
            return this.diceRoll(num, 1, times, 'BG.dX');
        };

        // d4 dice roll, returns number
        BG.d4 = function(times) {
            return this.diceRoll(4, 1, times, 'BG.d4');
        };
        // d6 dice roll, returns number
        BG.d6 = function(times) {
            return this.diceRoll(6, 1, times, 'BG.d8');
        };
        // d8 dice roll, returns number
        BG.d8 = function(times) {
            return this.diceRoll(8, 1, times, 'BG.d8');
        };
        // d10 dice roll, returns number
        BG.d10 = function(times) {
            return this.diceroll(10, 1, times, 'BG.d10');
        };
        // d12 dice roll, returns number
        BG.d12 = function(times) {
            return this.diceRoll(12, 1, times, 'BG.d12');
        };
        // d20 dice roll, returns number
        BG.d20 = function(times) {
            return this.diceRoll(20, 1, times, 'BG.d20');
        };
        // d100 dice roll, returns number
        BG.d100 = function(times) {
            return this.diceRoll(100, 1, times, 'BG.d100');
        };
        // dXY dice roll range, returns number
        BG.dXY = function(x, y, times) {
            return this.diceRoll(x, y, times, 'BG.dXY');
        };

        /* ---------
           ARRAY
           --------- */

        BG.isArray = function(array, msg) {
            if(msg === undefined) msg = 'BG.isArray';
            if(Array.isArray(array) == false) {
                throw new Error("expected an array in " + msg + ".");
            } else {
                return array;
            }

        };

        // Remove any number from array
        BG.removeNumber = function(array, num, msg) {
            if(msg === undefined) msg = 'BG.removeNumber';
            array = this.isArray(array, msg);
            num = this.toNumber(num, msg);
            for (var i = 0; i < array.length; i++) {
                if (array[i] === num) {
                    array.splice(i, 1);
                    i--;
                }
            }
            return array;
        };

        // Remove Zeroes from Array
        BG.removeZeros = function(array) {
            return this.removeNumber(array, 0, 'BG.removeZeros');
        };

        // Remove string from Array
        BG.removeItem = function(array, item, msg) {
            if(msg === undefined) msg = 'BG.removeItem';
            //TODO
            return array;
        };

        BG.sortArray = function(array) {
            array = this.isArray(array, "BG.sortArray");
            return array.sort(function(a,b) {
                return a - b;
            })
        }

        BG.reverseArray = function(array) {
            array = this.isArray(array, "BG.reverseArray");
            return array.sort(function(a,b) {
                return b - a;
            })
        }

        BG.removeDuplicates = function(array) {
            array = this.isArray(array, "BG.removeDuplicates");
            var unique = array.filter(function(elem, index, self) {
                return index == self.indexOf(elem);
            });
            return unique;
        }

        // Returns new array with only elements in both original arrays
        BG.arrayIntercession = function(array1, array2) {
            array1 = this.isArray(array1, "BG.arrayIntercession");
            array2 = this.isArray(array2, "BG.arrayIntercession");

            var result = [];
            array1.sort();
            array2.sort();
            for (var i = 0; i < array1.length; i++) {
                if (array2.indexOf( array1[i] ) > -1){
                    result.push( array1[i] );
                }
            }
            return result;
        };






        return BG;
    }
    //define globally if it doesn't already exist
    if(typeof(BG) === 'undefined'){
        window.BG = define_BG();
    }
    else{
        console.log("BG already defined.");
    }
})(window);