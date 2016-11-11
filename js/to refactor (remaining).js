


console.log("Ready for Action");

//Hide Pop-Ups
$('.popup').hide();

// MODALS
// Open Modal and change text
function modal(text, image){
    console.log('starting modal');
    console.log(text, image);
    var modalHtml = '';
    if(image !== undefined){
        modalHtml += '<img class="modal-image" src="' + image + '">';
    }
    if(text !== undefined){
        modalHtml += '<p class="modal-text">' + text + '</p>';
    }
    $('#modal-scorer').fadeIn(300);
    $('.modal-body').html(modalHtml);
    console.log('finishing modal');
        
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

var ALERTS = {
    coins: "Input the total number of Coins.",
    viziers: "Input the number of Viziers (yellow meeples). Each Vizier is worth 2 victory points. Moreover, a player gains 10 victory points per opponent s/he beat in total number of Viziers.",
    artisans: "Input the number of Artisans (purple meeples). Each Artisan is worth 2 victory points.",
    elders: "Input the number of Elders (white meeples). Each Elder is worth 2 victory points.",
    djinns: "On the new window, select special Djinns that modify other scoring conditions. Moreover, add the total Djinns points and the total thieves points.",
    tiles: "Input the total Victory Points on Tiles with a Camel, plus the Tent score. The tent is worth one point for each Red tile surrounding it, inclusing the one it's been placed.",
    oasis: "Input the number of Oasis (trees). Each Oasis grants 3 victory points.",
    villages: "Input the number of Villages (castles). Each Village gratns 5 victory points.",
    preciousitems: "On the new window, add the number of precious items, per type.",
    merchandise: "On the new window, add the quantity for each merchandise. The points are granted per set of unique items. Consult the rule book or player aid for details.",
}

$('.alert').on('click', function(){
    var target = this.id.slice(6);
    var image = 'img/category-' + target + '.svg';
    var text = ALERTS.target;
    modal(text, image);
});


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

  

Player.prototype.toggle = function(property){
    this[property] = !this[property];
};



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




