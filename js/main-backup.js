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
var windowX = $(window).width();
var windowCol1, windowCol2, windowCol3, windowCol4;

windowSize = function(){
	windowX = $(window).width();
	windowCol1 = (windowX * 0.2);
	windowCol2 = (windowX * 0.4);
	windowCol3 = (windowX * 0.6);
	windowCol4 = (windowX * 0.8);
}

/*SCREEN*/

$('.bar-item').on('click', function(){
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
        if(scrn !== '#scorer'){ $('#scorer').css('left', windowX);  }
        if(scrn !== '#solitaire'){ $('#solitaire').css('left', windowX);  }
        if(scrn !== '#rules'){ $('#rules').css('left', windowX);  }
    }, 500);
});

console.log("Ready for Action");

//Hide Pop-Ups
$('.popup').hide();

// MODALS
// Open Modal and change text
function modal(text){
    $('#modal-scorer').fadeIn(300);
    $('.modal-text').text(text);
};

// When Click on X
$('.modal-close').on('click', function(){
    $('.modal').fadeOut(500);
});

$('.modal-btn-close').on('click', function(){
    $('.modal').fadeOut(500);
});


// When click outside of Modal, close it
window.onclick = function(event) {
    var modal = document.getElementById('modal-scorer');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Triggers
$('#alert-coins').on('click', function(){ modal('Input the total number of Coins.');});
$('#alert-viziers').on('click', function(){ modal('Input the number of Viziers (yellow meeples).');});
$('#alert-artisans').on('click', function(){ modal('Input the number of Artisans (purple meeples).');});
$('#alert-elders').on('click', function(){ modal('Input the number of Elders (white meeples).');});
$('#alert-djinns').on('click', function(){ modal('On new window, select special Djinns that modify other scoring conditions. Moreover, add total Djinns points and total thieves points.');});
$('#alert-tiles').on('click', function(){ modal('Input the total Victory Points on Tiles with a Camel, plus the Tent score.');});
$('#alert-oasis').on('click', function(){ modal('Input the number of Oasis (trees).');});
$('#alert-villages').on('click', function(){ modal('Input the number of Villages (castles).');});
$('#alert-preciousitems').on('click', function(){ modal('On new window, add the number of precious items, per type.');});
$('#alert-merchandise').on('click', function(){ modal('On new window, add the quantity for each merchandise.');});

//CLEAR BUTTON
$('#clear').on('click', function(){
    $('.number').val('');
    $('.add-button').text('+');
    $('.total').text('000');
    $('#popup-djinns *').removeAttr('checked');
    for(var i = 0; i<colors.length; i++){
        var j = playerList[colors[i]];
        j.jaa = false;
        j.sha = false;
        j.hau = false;
        j.geb = false;
        j.pta = false;
        j.numitems = 0;
        j.items = 0;
    }
    // Assign Screen Column Sizes
    windowSize();
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

Player.prototype.toggle = function(property){
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
$('.popup-nav').on('click', function(){
    $('.popup').hide();
});

/* ============================
  POPUPS - DJINNS
  ============================ */

//Any Djinn color input is clicked
$('.djinns').on('click', function(){
    $('.popup-overlay').show(300);
    $('#popup-djinns').show(500);
});

//Toggle class by Djinn

$('.djinn-jaa').on('click', function(){
    $('.djinn-jaa').prop('checked', false);
    $(this).prop('checked', true);
});

$('.djinn-sha').on('click', function(){
    $('.djinn-sha').prop('checked', false);
    $(this).prop('checked', true);
});

$('.djinn-hau').on('click', function(){
    $('.djinn-hau').prop('checked', false);
    $(this).prop('checked', true);
});

$('.djinn-geb').on('click', function(){
    $('.djinn-geb').prop('checked', false);
    $(this).prop('checked', true);
});

$('.djinn-pta').on('click', function(){
    $('.djinn-pta').prop('checked', false);
    $(this).prop('checked', true);
});

//Clear Djinns per line
$('.clear-djinns').on('click', function(){
    var clear =  '.djinn-' + this.id.slice(6,9);
    $(clear).prop('checked', false);
});

//Clear Djinns
$('#clear-djinns').on('click', function(){
    $('#popup-djinns *').removeAttr('checked');
    $('#popup-djinns .number').val(0);
});

//Confirm Djinns
$('#confirm-djinns').on('click', function(){
    //For Each color
    for(var i = 0; i<colors.length; i++){
        //ADD DJINNS POWERS
        //array of djinns
        var genies = ['jaa', 'sha', 'hau', 'geb', 'pta'];
        //for each djin
        for(var j = 0; j < genies.length; j++){
            //check for 'checked class'
            if($('#' + genies[j] + '-' + colors[i]).is(":checked")){
                //add true value to object
                playerList[colors[i]][genies[j]] = true;
            } else {
                //add false value to object
                playerList[colors[i]][genies[j]] = false;
            }
            console.log(colors[i], genies[j], playerList[colors[i]][genies[j]]);
        }
        //ADD DJINNS AND THIEVES POINTS
        //Get values
        var vd = parseInt($('#' + colors[i] + '-totaldjinns').val());
        var vt = parseInt($('#' + colors[i] + '-thieves').val());
        //if sum is not a number, convert to 0
        if (isNaN(vd)) vd = 0;
        if (isNaN(vt)) vt = 0;
        //add them together
        var sum =  vd + vt;

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
$('.items').on('click', function(){
    $('.popup-overlay').show(300);
    $('#popup-items').show(500);
});

//Clear Djinns
$('#clear-items').on('click', function(){
   $('#popup-items .number').val(0);
});

$('#confirm-items').on('click', function(){
    //For Each color
    for(var i = 0; i<colors.length; i++){

        //declare empty var
        var quantity = 0,
        //declare sum var
        sum = 0;
        //Get items values from each set
        for (var j = 1; j <= 3; j++){
            //specify item
            var selector = '#' + colors[i] + '-item-' + j;
            //read var value
            var value = parseInt($(selector).val());
            //if value is not input, = 0
            if (isNaN(value)) value = 0;
            //add quantity
            quantity += value;
            //do the points multiplication
            var multiply = [5,7,9];
            sum += multiply[j-1] * value;
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
$('.merch').on('click', function(){
    $('.popup-overlay').show(300);
    $('#popup-merch').show(500);
});

//Function to Remove Zeros
removeZeros = function(arr){
    for(var z = 0; z < arr.length; z++){
        if(arr[z]===0) {
            arr.splice(z,1);
            z--;
        }
    }
};

$('#confirm-merch').on('click', function(){
    //For Each color
    for(var i = 0; i<colors.length; i++){

        //Create empty array
        var merch = [];
        var sum = 0;

        //Get value from 9 merch options and push to array
        for (var j=1; j<10; j++){
            var m = '#' + colors[i] + '-merch-' + j;
            var v = parseInt($(m).val());
            if(isNaN(v)){}else{merch.push(v);}
        }

        //Loop until array is empty:
        for (var k = merch.length; k > 0; k--){
            //remove 0s (twice to remove errors)
            merch.sort(sortNumber);
            removeZeros(merch);
            //Break if any value is <1
            if (merch[0]<1){
                console.log('BREAAAAAAAAAK');
                break;
            }
            //Calculate points (array length)
            var points = [0,1,3,7,13,21,30,40,50,60];
            //add points based on length of array
            sum += points[merch.length];
            //Decrease -1 from each item of array
            merch = merch.map(function(element) {
                return --element;
            });
            //fix when multiples of one single kind of merch
            if(merch.length == 1 && merch[0]>0) k++;
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

  function notNumber(val){
    if(isNaN(val)){ return 0;}
    return val;
}

function sortNumber(a,b) {
    return a - b;
}

function sortReverse(a,b) {
    return b - a;
}

/*CALCULATE BUTTON*/
$('#calculate').on('click', function(){
    //For Each color
    for(var i = 0; i<colors.length; i++){
        //Define var to be use over and over
        var x;
        //Define Color for the loop
        var color = '#' + colors[i] + '-';
        //Define Array  with Category
        var category = ['coins', 'viziers', 'artisians', 'elders', 'tiles', 'oasis', 'villages'];
        //Populate Total
        for(var j = 0; j<category.length; j++){
            //define x, making it 0 if NaN
            x = notNumber(parseInt($(color + category[j]).val()));
            playerList[colors[i]][category[j]] = x;
        }
        console.log('Populated', playerList[colors[i]]);
        //Count Points
        var total = 0;
            //1. Add Coins
            total += playerList[colors[i]].coins;
            //2. Add Viziers (if jaa x3)
            if (playerList[colors[i]].jaa === true){
                total += playerList[colors[i]].viziers * 3;
            } else {
                total +=  playerList[colors[i]].viziers;
            }
            //3. Add Artisians (if pta)
            if(playerList[colors[i]].pta === true){
                total += playerList[colors[i]].artisians * 2;
            }
            total += playerList[colors[i]].artisians * 2;
            //4. Add Elders x2 (if jaa x3)
            if (playerList[colors[i]].sha === true){
                total += playerList[colors[i]].elders * 4;
            } else {
                total +=  playerList[colors[i]].elders * 2;
            }
            //5. Add Djinns
            total +=  playerList[colors[i]].djinns;
            //6. Add Tiles
            total +=  playerList[colors[i]].tiles;
            //7. Add Oasis x3 (if hau x5)
            if (playerList[colors[i]].hau === true){
                total += playerList[colors[i]].oasis * 5;
            } else {
                total +=  playerList[colors[i]].oasis * 3;
            }
            //8. Add Villages
            total +=  playerList[colors[i]].villages * 5;
            //9. Add Items (if geb)
            if(playerList[colors[i]].geb === true){
                total += playerList[colors[i]].numitems * 3;
            }
            total +=  playerList[colors[i]].items;
            //10. Add Merch
            total +=  playerList[colors[i]].merch;

        //write total to object
        playerList[colors[i]].total = total;

    } //end of i loop

    //Viziers & Artisians Specials
    var mostViziers = [],
    mostArtisians = [],
    numPlayers = 0;
    //For each color
    for(var i = 0; i<colors.length; i++){

        mostViziers.push(playerList[colors[i]].viziers);
        mostArtisians.push(playerList[colors[i]].artisians);

        if(playerList[colors[i]].coins !== 0){
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
    for (var i = 0; i<numPlayers; i++){
        if(mostViziers < numPlayers){
            mostViziers.push(0);
        }
    }

    //Most Viziers Points than others
    for(var i = 0; i<colors.length; i++){
        //go through ever item
        for(var m = 0; m < mostViziers.length; m++){
            if(playerList[colors[i]].viziers !== 0){
                if(playerList[colors[i]].viziers == mostViziers[m]){
                    break;
                } else {
                    playerList[colors[i]].total += 10;
                }
            }
        }
        //Most Artisians
        //if first number is different than the second (you are the only player with more)
        if (mostArtisians[0] !== mostArtisians[1]){
            if(playerList[colors[i]].artisians == mostArtisians[0]){
                playerList[colors[i]].total += playerList[colors[i]].artisians;
            }
        }
    }

    //Declare array for later reposition
    var position = [];
    //write total to html for all colors
    for(var i = 0; i<colors.length; i++){
        $('#' + colors[i] + '-total').text(playerList[colors[i]].total);
        position.push(playerList[colors[i]].total);
        console.log(colors[i], playerList[colors[i]].total);
    }

    //Reorder position array
    position.sort(sortReverse);
    //array of colors just for reposition
    var poscolors = ['blue', 'pink', 'blac', 'oran'];

    console.log('POSITION ARRAY', position);
    //For each value of the  array
    for(var i = 0; i<position.length; i++){
        //circle throguh colors
        for(var j = 0; j<poscolors.length; j++){
            //create selector id var
            var pos = '.col-' + poscolors[j];
            console.log('Checking pos: ', poscolors[j]);
            //if total of that color equals to position i
            if(playerList[poscolors[j]].total == position[i]){
            	// Assign Screen Column Sizes
    			windowSize();
                //if item 1, move
                if(i === 0){
                    $(pos).animate({
                        left: windowCol1
                    }, 1000);
                    console.log('Reposition to 1');
                } else if (i == 1){
                    $(pos).animate({
                        left: windowCol2
                    }, 1000);
                    console.log('Reposition to 2');
                } else if (i == 2){
                    $(pos).animate({
                        left: windowCol3
                    }, 1000);
                    console.log('Reposition to 3');
                } else if (i == 3){
                    $(pos).animate({
                        left: windowCol4
                    }, 1000);
                    console.log('Reposition to 4');
                }
                poscolors.splice(j, 1);
                break;
            } else {console.log('No.')}
        }
    }
});

/* ==========================================================================
  SOLITAIRE
  ========================================================================== */

  var cpu = [],
  cpuplay = [],
  active = null,
  preventYazid = false,
  yazidCost = [],
  yazid = null;

//Restart Function
function soloRestart() {
  $('.solo-start').fadeIn(200);
  $('#restart').fadeOut(200);
  $('#solo-game').fadeOut(200);
  $('#solo-done').fadeOut(200);
  cpu = [];
  cpuplay = [];
  active = null,
  preventYazid = false,
  yazid = null,
  yazidCost = [];
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
  //1.1 Create array with 30 / 36 options
  if (this.id == 'base') {
    var num = 30;
} else {
    var num = 36;
}
  //1.2 Generate Grid based on num
  for (var i = 0; i < num; i++) {
    $('#solo-grid').append('<div class="solo-cell" id="cl-' + (i + 1) + '">' + (i + 1) + '</div>');
}
  //1.3 Generate Array
  for (var j = 1; j <= num; j++) {
    cpu.push(j);
}
  //Populate Yazid cost
  if (num == 36){
    yazidCost = [2,3,3,4,4,4,5,5,5,5,6,6,6,6,6,7,7,7,7,7,7,8,8,8,8,8,9,9,9,9,10,10,10,11,11,12,13,13,13,13,13,13];
} else {
    yazidCost = [2,3,3,4,4,4,5,5,5,5,6,6,6,6,6,7,7,7,7,7,8,8,8,8,9,9,9,10,10,11,13,13,13,13,13,13];
}
  //Hide Instructions
  $('.instructions').fadeOut(300);
  //Hide Buttons
  $('.solo-start').fadeOut(300);
  //Hide Title
  $('.screen-2 h1').animate({
    'font-size': 32
}, 400);
  //Show Restart Button
  $('#restart').fadeIn(500);
  //Show Game objects options
  $('#solo-game').fadeIn(300);
});
//On click of a button:
$('#nexttile').on('click', function() {
  //If Array still has numbers
  if (cpu.length > 0) {
    //4.1 Previous active
    if (active !== null && preventYazid == false) {
      //4.1.1 Add class
      $('#cl-' + active).removeClass('solo-cell-active').addClass('solo-cell-prev');
      //4.1.2 Push to CPUplay
      cpuplay.push(active);
      //Push Number Back to Yazid
      yazidCost.push(yazid);
      console.log('Used: ', cpuplay);
  }
    //4.2 Randomly number from array
    var random = Math.floor(Math.random() * cpu.length);
    active = parseInt(cpu[random]);
    console.log('Active: ', active);
    //4.3 Remove that number from array
    cpu.splice(random, 1);
    console.log('Remain: ', cpu);
    $('#cl-' + active).addClass('solo-cell-active');

    //4.2 Color previously active number
    //4.3 Color
}
if (cpu.length == 0) {
    //Change text on Next Tile Button
    $('#outbid').fadeOut(500);
    $('#nexttile').hide(500);
    $('#solo-done').show(2000);
}
  //Outbid Yazid:
  ///Random Number from Yazid Array
  var randYazid = Math.floor(Math.random() * yazidCost.length);
  ///Write interger in yazid var
  yazid = parseInt(yazidCost[randYazid]);
  ///Remove that number from array
  yazidCost.splice(randYazid, 1);
  //if Yazid = 13, activat Double Titles
  while(yazid == 13){
    console.log('Outbid is: ',yazid);
    //Alert User
    alert('Yazid gets 2 Tiles this turn. Press Next Tile again.');
    //Random New Number
    var randYazid = Math.floor(Math.random() * yazidCost.length);
    //Write interger in yazid var
    yazid = parseInt(yazidCost[randYazid]);
    //If new number is different than 13
    if(yazid !== 13) {
        /// Remove that number from array
        yazidCost.splice(randYazid, 1);
    }
  }
  //Write Outbit Cost on HTML
  $('#cost').text(yazid);
  //Prevent Yazid
  preventYazid = false;
});


$('#outbid').on('click', function(){
  //remove color from active
  $('#cl-' + active).removeClass('solo-cell-active');
  //add active back to array
  cpu.push(active);
  //reorder array
  cpu.sort(sortNumber);
  //add booleon
  preventYazid = true;
  //logs
  console.log('Returning: ', active,' and now Used is: ',cpuplay);
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
function outbidCost(){
  var a = rollDice();
  var b = rollDice();
  return a+b;
}
//Dice Roll
function rollDice() {
  return Math.floor(Math.random() * ((6 - 1) + 1) + 1);
}
//Sort Array
function sortNumber(a,b) {
    return a - b;
}


