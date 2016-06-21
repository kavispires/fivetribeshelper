/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

/*SCREEN VALUES FOR .COL*/
var windowX = $(window).width(),
    windowCol1 = (windowX * 0.2),
    windowCol2 = (windowX * 0.4),
    windowCol3 = (windowX * 0.6),
    windowCol4 = (windowX * 0.8);

/*SCREEN*/

$('.bar-item').on('click', function() {
    var scrn = '#' + this.id.split("-").pop();
    //Move all screen under
    $('.screen').css('z-index', 0);
    //Move clicked screen over
    $(scrn).css('z-index', 2);
    //Bring Screen On
    $(scrn).animate({
        left: 0
    }, 400);
    //Bring other two screens off
    setTimeout(function() {
        if (scrn !== '#scorer') {
            $('#scorer').css('left', windowX);
        }
        if (scrn !== '#solitaire') {
            $('#solitaire').css('left', windowX);
        }
        if (scrn !== '#rules') {
            $('#rules').css('left', windowX);
        }
    }, 500);
});

//Hide Pop-Ups
$('.popup').hide();

//ALERTS when symbols are clicked
$('#alert-coins').on('click', function() {
    alert('Total Number of Coins');
});
$('#alert-viziers').on('click', function() {
    alert('Total Number of Viziers (yellow meeples)');
});
$('#alert-artisans').on('click', function() {
    alert('Total Number of Artisans (purple meeples)');
});
$('#alert-elders').on('click', function() {
    alert('Total Number of Elders (white meeples)');
});
$('#alert-djinns').on('click', function() {
    alert('Add Special Djinns and Total Points');
});
$('#alert-tiles').on('click', function() {
    alert('Total Victory Points on Tiles with a Camel or Tent');
});
$('#alert-oasis').on('click', function() {
    alert('Total Number of Oasis (trees)');
});
$('#alert-villages').on('click', function() {
    alert('Total Number of Villages (castles)');
});
$('#alert-preciousitems').on('click', function() {
    alert('Add Precious Items');
});
$('#alert-merchandise').on('click', function() {
    alert('Add Total Quantity for each item.');
});

//CLEAR BUTTON
$('#clear').on('click', function() {
    $('.number').val('');
    $('.add-button').text('+');
    $('.total').text('000');
    $('#popup-djinns *').removeArrttr('checked');
    for (var i = 0; i < colors.length; i++) {
        var j = playerList[colors[i]];
        j.jaa = false;
        j.sha = false;
        j.hau = false;
        j.geb = false;
        j.pta = false;
        j.numitems = 0;
        j.items = 0;
    }
    //Reposition Back
    $('.col-blue').animate({
        left: windowCol1
    }, 1000);
    $('.col-pink').animate({
        left: windowCol2
    }, 1000);
    $('.col-blac').animate({
        left: windowCol3
    }, 1000);
    $('.col-oran').animate({
        left: windowCol4
    }, 1000);
});

/* ==========================================================================
  GLOBAL OBJECTS WITH PLAYER INFORMATION
  ========================================================================== */

function Player() {
    this.coins = 0;
    this.viziers = 0;
    this.artisians = 0;
    this.elders = 0;
    this.djinns = 0;
    this.tiles = 0;
    this.oasis = 0;
    this.villages = 0;
    this.items = 0;
    this.numitems = 0;
    this.merch = 0;
    this.jaa = false;
    this.sha = false;
    this.hau = false;
    this.geb = false;
    this.pta = false;
    this.total = 0;
}

Player.prototype.toggle = function(property) {
    this[property] = !this[property];
};

var playerList = {};
var colors = ['blue', 'pink', 'blac', 'oran'];
colors.forEach(function(thisColor) {
    playerList[thisColor] = new Player();
});

/* ==========================================================================
  POPUPS
  ========================================================================== */

//Pop-ups Confirm Button
$('.popup-nav').on('click', function() {
    $('.popup').hide();
});

/* ============================
  POPUPS - DJINNS
  ============================ */

//Any Djinn color input is clicked
$('.djinns').on('click', function() {
    $('.popup-overlay').show(300);
    $('#popup-djinns').show(500);
});

//Toggle class by Djinn

$('.djinn-jaa').on('click', function() {
    $('.djinn-jaa').prop('checked', false);
    $(this).prop('checked', true);
});

$('.djinn-sha').on('click', function() {
    $('.djinn-sha').prop('checked', false);
    $(this).prop('checked', true);
});

$('.djinn-hau').on('click', function() {
    $('.djinn-hau').prop('checked', false);
    $(this).prop('checked', true);
});

$('.djinn-geb').on('click', function() {
    $('.djinn-geb').prop('checked', false);
    $(this).prop('checked', true);
});

$('.djinn-pta').on('click', function() {
    $('.djinn-pta').prop('checked', false);
    $(this).prop('checked', true);
});

//Clear Djinns per line
$('.clear-djinns').on('click', function() {
    var clear = '.djinn-' + this.id.slice(6, 9);
    $(clear).prop('checked', false);
});

//Clear Djinns
$('#clear-djinns').on('click', function() {
    $('#popup-djinns *').removeArrttr('checked');
    $('#popup-djinns .number').val(0);
});

//Confirm Djinns
$('#confirm-djinns').on('click', function() {
    //For Each color
    for (var i = 0; i < colors.length; i++) {
        //ADD DJINNS POWERS
        //array of djinns
        var genies = ['jaa', 'sha', 'hau', 'geb', 'pta'];
        //for each djin 
        for (var j = 0; j < genies.length; j++) {
            //check for 'checked class'
            if ($('#' + genies[j] + '-' + colors[i]).is(":checked")) {
                //add true value to object
                playerList[colors[i]][genies[j]] = true;
            } else {
                //add false value to object
                playerList[colors[i]][genies[j]] = false;
            }
        }
        //ADD DJINNS AND THIEVES POINTS
        //Get values
        var vd = parseInt($('#' + colors[i] + '-totaldjinns').val());
        var vt = parseInt($('#' + colors[i] + '-thieves').val());
        //if sum is not a number, convert to 0
        if (isNaN(vd)) vd = 0;
        if (isNaN(vt)) vt = 0;
        //add them together
        var sum = vd + vt;

        //add to items obj
        playerList[colors[i]].djinns = sum;
        //update text on scorer
        $('#' + colors[i] + '-djinns').text(sum);
        //close pop-up
        $('.popup-overlay').fadeOut(500);
        $('#popup-djinns').fadeOut(200);
    }
});

/* ============================
  POPUPS - ITEMS
  ============================ */

//Open Items Popup
$('.items').on('click', function() {
    $('.popup-overlay').show(300);
    $('#popup-items').show(500);
});

//Clear Djinns
$('#clear-items').on('click', function() {
    $('#popup-items .number').val(0);
});

$('#confirm-items').on('click', function() {
    //For Each color
    for (var i = 0; i < colors.length; i++) {

        //declare empty var
        var quantity = 0,
            //declare sum var
            sum = 0;
        //Get items values from each set
        for (var j = 1; j <= 3; j++) {
            //specify item
            var selector = '#' + colors[i] + '-item-' + j;
            //read var value
            var value = parseInt($(selector).val());
            //if value is not input, = 0
            if (isNaN(value)) value = 0;
            //add quantity
            quantity += value;
            //do the points multiplication
            var multiply = [5, 7, 9];
            sum += multiply[j - 1] * value;
        }
        //add to numitems obj
        playerList[colors[i]].numitems = quantity;
        //add to items obj
        playerList[colors[i]].items = sum;
        //update text on index
        $('#' + colors[i] + '-items').text(sum);
        //close pop-up
        $('.popup-overlay').fadeOut(500);
        $('#popup-items').fadeOut(200);
    }
});

/* ============================
  POPUPS - MERCH
  ============================ */

//Open Merch Popup
$('.merch').on('click', function() {
    $('.popup-overlay').show(300);
    $('#popup-merch').show(500);
});

//Function to Remove Zeros
removeZeros = function(arr) {
    for (var z = 0; z < arr.length; z++) {
        if (arr[z] === 0) {
            arr.splice(z, 1);
            z--;
        }
    }
};

$('#confirm-merch').on('click', function() {
    //For Each color
    for (var i = 0; i < colors.length; i++) {

        //Create empty array
        var merch = [];
        var sum = 0;

        //Get value from 9 merch options and push to array
        for (var j = 1; j < 10; j++) {
            var m = '#' + colors[i] + '-merch-' + j;
            var v = parseInt($(m).val());
            if (isNaN(v)) {} else {
                merch.push(v);
            }
        }

        //Loop until array is empty:
        for (var k = merch.length; k > 0; k--) {
            //remove 0s (twice to remove errors)
            merch.sort(sortNumber);
            removeZeros(merch);
            //Break if any value is <1
            if (merch[0] < 1) {
                console.log('BREAK');
                break;
            }
            //Calculate points (array length)
            var points = [0, 1, 3, 7, 13, 21, 30, 40, 50, 60];
            //add points based on length of array
            sum += points[merch.length];
            //Decrease -1 from each item of array
            merch = merch.map(function(element) {
                return --element;
            });
            //fix when multiples of one single kind of merch
            if (merch.length == 1 && merch[0] > 0) k++;
        }

        //add sum value to object
        playerList[colors[i]].merch = sum;
        //write on index
        $('#' + colors[i] + '-merch').text(sum);
        //close pop-up
        $('.popup-overlay').fadeOut(500);
        $('#popup-merch').fadeOut(200);
    }
});

/* ==========================================================================
  SCORING
  ========================================================================== */

function notNumber(val) {
    if (isNaN(val)) {
        return 0;
    }
    return val;
}

function sortNumber(a, b) {
    return a - b;
}

function sortReverse(a, b) {
    return b - a;
}

/*CALCULATE BUTTON*/
$('#calculate').on('click', function() {
    //For Each color
    for (var i = 0; i < colors.length; i++) {
        //Define var to be use over and over
        var x;
        //Define Color for the loop
        var color = '#' + colors[i] + '-';
        //Define Array  with Category
        var category = ['coins', 'viziers', 'artisians', 'elders', 'tiles', 'oasis', 'villages'];
        //Populate Total
        for (var j = 0; j < category.length; j++) {
            //define x, making it 0 if NaN
            x = notNumber(parseInt($(color + category[j]).val()));
            playerList[colors[i]][category[j]] = x;
        }
        //Count Points
        var total = 0;
        //1. Add Coins
        total += playerList[colors[i]].coins;
        //2. Add Viziers (if jaa x3)
        if (playerList[colors[i]].jaa === true) {
            total += playerList[colors[i]].viziers * 3;
        } else {
            total += playerList[colors[i]].viziers;
        }
        //3. Add Artisians (if pta)
        if (playerList[colors[i]].pta === true) {
            total += playerList[colors[i]].artisians * 2;
        }
        total += playerList[colors[i]].artisians * 2;
        //4. Add Elders x2 (if jaa x3)
        if (playerList[colors[i]].sha === true) {
            total += playerList[colors[i]].elders * 4;
        } else {
            total += playerList[colors[i]].elders * 2;
        }
        //5. Add Djinns
        total += playerList[colors[i]].djinns;
        //6. Add Tiles
        total += playerList[colors[i]].tiles;
        //7. Add Oasis x3 (if hau x5)
        if (playerList[colors[i]].hau === true) {
            total += playerList[colors[i]].oasis * 5;
        } else {
            total += playerList[colors[i]].oasis * 3;
        }
        //8. Add Villages
        total += playerList[colors[i]].villages * 5;
        //9. Add Items (if geb)
        if (playerList[colors[i]].geb === true) {
            total += playerList[colors[i]].numitems * 3;
        }
        total += playerList[colors[i]].items;
        //10. Add Merch
        total += playerList[colors[i]].merch;

        //write total to object
        playerList[colors[i]].total = total;

    } //end of i loop

    //Viziers & Artisians Specials
    var mostViziers = [],
        mostArtisians = [],
        numPlayers = 0;
    //For each color
    for (var i = 0; i < colors.length; i++) {

        mostViziers.push(playerList[colors[i]].viziers);
        mostArtisians.push(playerList[colors[i]].artisians);

        if (playerList[colors[i]].coins !== 0) {
            numPlayers += 1;
        }
    }
    //Reverse Order
    mostViziers.sort(sortNumber);
    mostArtisians.sort(sortReverse);
    //Remove 0s
    removeZeros(mostViziers);
    removeZeros(mostArtisians);
    //Add zeros to end of array based on number of players
    for (var i = 0; i < numPlayers; i++) {
        if (mostViziers < numPlayers) {
            mostViziers.push(0);
        }
    }

    //Most Viziers Points than others
    for (var i = 0; i < colors.length; i++) {
        //go through ever item
        for (var m = 0; m < mostViziers.length; m++) {
            if (playerList[colors[i]].viziers !== 0) {
                if (playerList[colors[i]].viziers == mostViziers[m]) {
                    break;
                } else {
                    playerList[colors[i]].total += 10;
                }
            }
        }
        //Most Artisians
        //if first number is different than the second (you are the only player with more)
        if (mostArtisians[0] !== mostArtisians[1]) {
            if (playerList[colors[i]].artisians == mostArtisians[0]) {
                playerList[colors[i]].total += playerList[colors[i]].artisians;
            }
        }
    }

    //Declare array for later reposition
    var position = [];
    //write total to html for all colors
    for (var i = 0; i < colors.length; i++) {
        $('#' + colors[i] + '-total').text(playerList[colors[i]].total);
        position.push(playerList[colors[i]].total);
    }

    //Reorder position array
    position.sort(sortReverse);
    //array of colors just for reposition
    var poscolors = ['blue', 'pink', 'blac', 'oran'];

    //For each value of the  array
    for (var i = 0; i < position.length; i++) {
        //circle throguh colors
        for (var j = 0; j < poscolors.length; j++) {
            //create selector id var
            var pos = '.col-' + poscolors[j];
            //if total of that color equals to position i
            if (playerList[poscolors[j]].total == position[i]) {
                //if item 1, move
                if (i === 0) {
                    $(pos).animate({
                        left: windowCol1
                    }, 1000);
                    console.log('Repositioning to 1st');
                } else if (i == 1) {
                    $(pos).animate({
                        left: windowCol2
                    }, 1000);
                    console.log('Repositioning to 2nd');
                } else if (i == 2) {
                    $(pos).animate({
                        left: windowCol3
                    }, 1000);
                    console.log('Repositioning to 3rd');
                } else if (i == 3) {
                    $(pos).animate({
                        left: windowCol4
                    }, 1000);
                    console.log('Repositioning to 4th');
                }
                poscolors.splice(j, 1);
                break;
            } else {
                console.log('No.')
            }
        }
    }
});

/* ==========================================================================
  SOLITAIRE
  ========================================================================== */

var expansion = false,
    allTiles = [],
    turn = null,
    confirm = false,
    prevHint = '',
    active = null,
    doubleTiles,
    cpuplay = [],
    preventYazid = false,
    yazidCost = [],
    yazidTile = null,
    yourTile = null,
    chasm = null;

//Restart Function
function soloRestart() {
    $('.solo-start').fadeIn(200);
    $('#restart').fadeOut(200);
    $('#solo-game').fadeOut(200);
    $('#solo-done').fadeOut(200);
    expansion = false;
    allTiles = [];
    turn = null;
    confirm = false;
    prevHint = '';
    active = null;
    doubleTiles;
    cpuplay = [];
    preventYazid = false;
    yazidCost = [];
    yazidTile = null;
    yourTile = null;
    chasm = null;
    $('#cost').text('?');
    $('#solo-grid').text('');
    $('.screen-2 h1').animate({
        'font-size': 64
    }, 400);
}

//Begin as Restarted
soloRestart();

//1. Option: play base solo / play artisians solo
$('.solo-start-btn').on('click', function() {
    //Hide Actions
    $('.instructions').fadeOut(300);
    $('.solo-start').fadeOut(300);
    //Resize Title
    $('.screen-2 h1').animate({
        'font-size': 32
    }, 400);
    //Show Restart Button, Game objects options, Hint Bar
    $('#restart').fadeIn(500);
    $('#solo-game').fadeIn(300);
    //Create array with 30 / 36 options
    if (this.id == 'base') {
        var num = 30;
    } else {
        var num = 36;
        expansion = true;
    }
    //Generate Grid based on var num
    for (var i = 0; i < num; i++) {
        $('#solo-grid').append('<div class="solo-cell solo-all" id="cl-' + (i + 1) + '">' + (i + 1) + '</div>');
    }
    //Generate Array
    for (var j = 1; j <= num; j++) {
        allTiles.push(j);
    }
    //Outbid array
    yazidCost = [2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 10, 10, 11, 13, 13, 13, 13, 13, 13];
    //For Expansion
    if (expansion) {
        //Add More Numbers to Outbit array
        yazidCost = yazidCost.concat([7, 8, 9, 10, 11, 12]);
        //Add Chasm
        ///Update turn
        turn = 'chasm';
        console.log('Turn: ',turn);
        ///Update hint
        hint("First, click on the Chasm Tile.",0);
        ///Change button label
        btnRight('Confirm Chasm');
    } else {
        ///Update turn
        turn = 'yazid';
        console.log('Turn: ',turn);
        ///Update hint
        hint("First, Yazid takes control of his tile.",1);
        //Update Button Label
        btnRight("Yazid Tile");
    }
});

//RIGHT BUTTON
$('#btn-right').on('click', function() {
    console.log('RIGHT BUTTON');
    //NO TILES LEFT
    if (allTiles.length == 0) {
        hint("The Game is over.",3);
        $('#outbid').fadeOut(500);
        $('#btn-left').hide(500);
        $('#btn-right').hide(500);
        $('#solo-done').show(2000);
        return;
    }

    //CHASM TURN
    if(turn == 'chasm'){
        //If chasm is already clicked
        if(confirm){
            //Remove from array
            removeArr(allTiles, active);
            //Update chasm tile number
            chasm = active;
            //Update Hint
            hint("Yazid's turn: Click on Yazid Tile.",1);
            //Update Turn
            turn = 'yazid';
            //Update Button Label
            btnRight("Yazid Tile");
            //Change Confirm
            confirm = false;
            //stop function
            return;
        //If NO Chasm has been selected
        } else {
            hint("You didn't select the Chasm tile.",3,'alert');
            //stop function
            return;
        }
    }

    //YAZID TURN
    if (turn == 'yazid'){
        //NEW TILE 
        if(!confirm){
            //if Expansion is ON, random 36, else, only 30
            if(expansion){
                var random = Math.floor(Math.random() * 36);
            } else {
                var random = Math.floor(Math.random() * 30);
            }
            //Update var Active
            active = parseInt(random);
            //Outbid Cost
            outbidCost();
            //If active is chasm, consider it doubleTile
            if(chasm == active) doubleTile = true;
            //Add blinking class to tile
            $('#cl-' + active).addClass('solo-cell-active');
            console.log('Active Tile: ',active);
            //Update Right Label
            btnRight("Continue");
            //Prevent Yazid only if not on previous turn
            if(!preventYazid){
                //Update Left Label
                btnLeft("Prevent Yazid");
            }
            //Update hint
            if(preventYazid) {
                hint("You must accept this tile, click continue.",1);
            } else {
                hint("You may prevent Yazid by paying Outbid cost OR click continue.",1);
            }
            //Update Confirm
            confirm = true;
            console.log('Confirm: ',confirm);   
        //If CONTINUE is clicked   
        } else if (confirm) {
            //Without Preventing
            if(!preventYazid) {
                //If Active is not on allTiles
                if(allTiles.indexOf(active) != -1){
                    ///Add Yazid Class to Tile & Remove tile from clicable options
                    $('#cl-' + active).addClass('solo-cell-yazid').removeClass('solo-all');
                    //Remove number from allTiles array
                    removeArr(allTiles, active);
                }
            }
            //Remove Blinking Class
            $('#cl-' + active).removeClass('solo-cell-active');
            //Push Number Back to Yazid
            yazidCost.push(yazid);
            //Prevent Yazid
            preventYazid = false;
            console.log('Prevent Yazid: ',preventYazid);
            //Update Confirm
            confirm = false;
            console.log('Confirm: ',confirm);
            //if Double Titles ON
            if(doubleTiles){
                console.log('DOUBLE TILES');
                //Update Btn Label
                btnRight("Second Yazid Tile");
                //Update Hint
                hint("It's Yazid Double Turn. Launch a new tile.",2);
                //Update DoubleTiles
                doubleTiles = false;
                //stop function
                return;
            }
            //Update Btn Label
            btnRight("Done with your turn");
            //Update Btn Label 2
            btnLeft("Special Situations");
            //Update Hint
            hint("Your turn! Click on the tile you took control OR done with your turn.",2);
            //Update turn
            turn = "player";
            console.log('Turn: ',turn);
            //stop function
            return;
        }
    }
    //PLAYER TURN
    if(turn == 'player'){
        //Check Button Text
        var currentLabel = $('#btn-right').text();
        //CONFIRM ON
        if(confirm){
            if(allTiles.indexOf(active) != -1){
                ///Add Yazid Class to Tile & Remove tile from clicable options
                $('#cl-' + active).removeClass('solo-cell-active').addClass('solo-cell-yazid').removeClass('solo-all');
                //Remove number from allTiles array
                removeArr(allTiles, active);
            }
            //Update Hint
            hint("Yazid's turn: Click on Yazid Tile.",1);
            //Update Button Label
            btnRight("Yazid Tile");
            //Update Btn Right
            btnLeft("-");
            //Update Turn
            turn = 'yazid';
            console.log('Turn: ',turn);
            //Update Confirm
            confirm = false;
            console.log('Confirm: ',confirm);
            //stop function
            return;
        }
        if (!confirm && currentLabel == "Done with your turn"){
            //Update Hint
            hint("Yazid's turn: Click on Yazid Tile.",1);
            //Update Button Label
            btnRight("Yazid Tile");
            //Update Btn Right
            btnLeft("-");
            //Update Turn
            turn = 'yazid';
            console.log('Turn: ',turn);
            //Update Confirm
            confirm = false;
            console.log('Confirm: ',confirm);
            console.log(currentLabel);
            //stop function
            return;
        }
    }     
});

//LEFT BUTTON
$('#btn-left').on('click', function() {
    console.log('LEFT BUTTON');
    //Only in Yazid Turn
    if(turn == 'yazid'){
        if (confirm && !preventYazid){
            //remove color from active
            $('#cl-' + active).removeClass('solo-cell-active');
            //hint
            hint("You prevented Yazid. Pay outbid amount to the bank.",3);
            //add booleon
            preventYazid = true;
            console.log('Prevent Yazid: ',preventYazid);
            //turn off Confirm
            confirm = true;
            console.log('Confirm: ',confirm);
             //Update Btn Left
            btnLeft("-");
        } else if(preventYazid){
            //Alert User prevented on previous turn
            hint("You can't prevent Yazid in consecutive turns, accept tile.",3);
        } else {
            //Alert User if it's not Yazid's Turn
            hint("You can't prevent Yazid now.",3,'alert');
        }
    }
    if (turn == 'player'){
        //add special situations
        ///more than one tile taken control this turn
        ///tempest talisman move camel somewhere else
    }
});


//WHEN USER CLICKS ON HIS TILE
$('#solo-grid').on('click', '.solo-all', function() {
    //get id
    var yourtileid = '#' + this.id;
    //get only number
    var tileNumber = parseInt(this.id.slice(3, 5));
    //Only if it's user's turn
    if (turn == 'player') {
        console.log('Player Input: ',tileNumber);
        //If what player clicked is still available
        if(allTiles.indexOf(tileNumber) != -1){
            //if clicked different than active
            if(tileNumber != active){
                //Remove Player Color from all numbers NOT in allTiles
                for(var x = 0; x < allTiles.length; x++){
                    $('#cl-' + allTiles[x]).removeClass('solo-cell-player');
                }
                //Add Player Color
                $(yourtileid).addClass('solo-cell-player');
                //Update Active
                active = tileNumber;
                console.log('Active Tile: ',active);
                //Update Confirm
                confirm = true;
                console.log('Confirm: ',confirm);
                //Update Button Lable
                btnRight('Confirm Tile ',tileNumber);
            } else {
                //Remove Player Color
                $(yourtileid).removeClass('solo-cell-player');
                //Update Active
                active = null;   
                //Update Confirm
                confirm = false;
                console.log('Confirm: ',confirm);
                //Update Button Lable
                btnRight('Continue');
            }
        }
    //if chasm turn
    } else if (turn == 'chasm') {
        //remove chasm color from all tiles
        $('.solo-cell').removeClass('solo-cell-chasm');
        //add color
        $(yourtileid).addClass('solo-cell-chasm');
        //change Hint Text
        hint("Now, confirm your choice.",0);
        //update active
        active = tileNumber;
        console.log('Active Tile: ',active);
        //update confirm
        confirm = true;
        console.log('Confirm: ',confirm);
    }
});

$('#restart').on('click', function() {
    soloRestart();
});
$('#solo-done').on('click', function() {
    soloRestart();
});
$('#instructions').on('click', function() {
    $('.instructions').toggle(300);
});

//Outbid Cost Function
function outbidCost2() {
    var a = rollDice();
    var b = rollDice();
    return a + b;
}

//Dice Roll
function rollDice() {
    return Math.floor(Math.random() * ((6 - 1) + 1) + 1);
}

//Sort Array
function sortNumber(a, b) {
    return a - b;
}

function hint(message,y,temp){
    //save Previous message
    prevHint = $('.solo-hint').text();
    //Change Text on HTML
    $('.solo-hint').text(message);
    //Remove All Colors
    $('.solo-hint').removeClass('solo-hint-chasm solo-hint-yazid solo-hint-player solo-hint-alert');
    //Add Colors
    if (y == 0) {
        $('.solo-hint').addClass('solo-hint-chasm');
    } else if (y == 1) {
        $('.solo-hint').addClass('solo-hint-yazid');
    } else if (y == 2) {
        $('.solo-hint').addClass('solo-hint-player');
    } else if (y == 3) {
        $('.solo-hint').addClass('solo-hint-alert');
    } else {
        console.log('ERROR: Solo Hint!');
    }
    if(temp == 'alert' && prevHint != ''){
         setTimeout(function() {
            $('.solo-hint').text(prevHint);
        }, 3000);
    }
}

function btnRight(label,number){
    if(number == undefined){
        $('#btn-right').text(label);
    } else {
        $('#btn-right').text(label+number);
    }
    
}

function btnLeft(label){
    $('#btn-left').text(label);
    //Button Color
    ///Remove All colors
    $('#btn-left').removeClass('btn-negative').removeClass('btn-disabled');
    ///If no text, add disable class
    if(label == "-"){
        $('#btn-left').addClass('btn-disabled');
    ///If Prevent Yazid, add red class
    } else if(label == "Prevent Yazid"){
        $('#btn-left').addClass('btn-negative');
    }
}

function removeArr(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

function outbidCost(){
    ///Random Number from Yazid Array
    var randYazid = Math.floor(Math.random() * yazidCost.length);
    ///Write interger in yazid var
    yazid = parseInt(yazidCost[randYazid]);
    ///Remove that number from array
    yazidCost.splice(randYazid, 1);
    //if Yazid = 13, activate Double Titles
    if(yazid ==13) doubleTiles = true;
    //new cost, different than 13
    while (yazid == 13) {
        console.log('Outbid is: ', yazid);
        //Hint
        hint('Yazid gets 2 Tiles this turn.',3);
        //Random New Number
        var randYazid = Math.floor(Math.random() * yazidCost.length);
        //Write interger in yazid var
        yazid = parseInt(yazidCost[randYazid]);
        //If new number is different than 13
        if (yazid !== 13) {
            /// Remove that number from array
            yazidCost.splice(randYazid, 1);
        }
    }
    //Write Outbit Cost on HTML
    $('#cost').text(yazid);
}