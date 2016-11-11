/* ==========================================================================
  SOLITAIRE
  ========================================================================== */

var solo = {}


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
  /*$('.screen-2 h1').animate({
    'font-size': 64
  }, 400);*/
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