var model = {
    colorList: ['blue', 'pink', 'black', 'orange']
};

var Player = function(color, index) {
    this.color = color;
    this.index = index;
    this.rank = 0;
    this.coins = ko.observable();
    this.viziers = ko.observable();
    this.artisans = ko.observable();
    this.elders = ko.observable();

    this.djinnstotal = ko.observable('+');
    this.djinns = ko.observable();
    this.thieves = ko.observable();

    this.tiles = ko.observable();
    this.trees = ko.observable();
    this.palaces = ko.observable();

    this.items = ko.observable('+');
    this.items_jewelry = ko.observable();
    this.items_treasures = ko.observable();
    this.items_crowns = ko.observable();
    this.items_quantity = ko.observable(0);

    this.merch = ko.observable('+');
    this.merch_fish = ko.observable();
    this.merch_wheat = ko.observable();
    this.merch_pottery = ko.observable();
    this.merch_spices = ko.observable();
    this.merch_papyrus = ko.observable();
    this.merch_fabric = ko.observable();
    this.merch_ivory = ko.observable();
    this.merch_gems = ko.observable();
    this.merch_gold = ko.observable();

    this.jaafar = ko.observable(false);
    this.shamhat = ko.observable(false);
    this.haurvatat = ko.observable(false);
    this.geb = ko.observable(false);
    this.ptah = ko.observable(false);

    this.total = ko.observable('?');
};

var ViewModel = function() {
    var self = this;

    this.playerList = ko.observableArray([]);

    this.init = function() {
        // Populate playerList
        self.populatePlayerList();
    };

    // Populate playerList with Player
    this.populatePlayerList = function() {
        // Clear playerList
        self.playerList([]);
        // Then populate
        model.colorList.forEach(function(color, index) {
            self.playerList.push(new Player(color, index));
        });
    };

    this.completeReset = function(data) {
        self.playerList().forEach(function(player) {
            player.coins('');
            player.viziers('');
            player.artisans('');
            player.elders('');

            player.tiles('');
            player.trees('');
            player.palaces('');

            player.total('?');
        });
        self.resetDjinnsPopup();
        self.resetItemsPopup();
        self.resetMerchPopup();
    };

    this.displayDjinnsPopup = ko.observable(false);
    this.openDjinnsPopup = function() {
        // Show Popup
        self.displayDjinnsPopup(true);
    };

    this.resetDjinnsPopup = function() {
        // Loop through players and reset
        // TODO
        self.playerList().forEach(function(player) {
            player.djinnstotal('+');
            player.djinns('');
            player.thieves('');
            player.jaafar(false);
            player.shamhat(false);
            player.haurvatat(false);
            player.geb(false);
            player.ptah(false);
        });
    };

    this.confirmDjinnsPopup = function() {
        // Loop through players
        self.playerList().forEach(function(player) {
            // Convert to Number
            player.djinns(BG.notNumber(player.djinns()));
            // Convert to Number
            player.thieves(BG.notNumber(player.thieves()));
            // Add Djinns and Thives Points to Djinns Total
            player.djinnstotal(player.djinns() + player.thieves());
        });
        // Close Popup
        self.displayDjinnsPopup(false);
    };

    this.displayItemsPopup = ko.observable(false);
    this.openItemsPopup = function() {
        // Show Popup
        self.displayItemsPopup(true);
    };

    this.resetItemsPopup = function() {
        // Loop through players and reset
        self.playerList().forEach(function(player) {
            player.items('+');
            player.items_jewelry('');
            player.items_treasures('');
            player.items_crowns('');
            player.items_quantity(0);
        });
    };

    this.confirmItemsPopup = function() {
        // Loop through players
        self.playerList().forEach(function(player) {
            // Convert to Number
            player.items_jewelry(BG.notNumber(player.items_jewelry()));
            // Convert to Number
            player.items_treasures(BG.notNumber(player.items_treasures()));
            // Convert to Number
            player.items_crowns(BG.notNumber(player.items_crowns()));
            // Calculate Points
            var total = (player.items_jewelry() * 5) + (player.items_treasures() * 7) + (player.items_crowns() * 9);
            // Update total
            player.items(total);
            // Update items_quatity
            player.items_quantity(player.items_jewelry() + player.items_treasures() + player.items_crowns());
        });
        // Close Popup
        self.displayItemsPopup(false);
    };

    this.displayMerchPopup = ko.observable(false);
    this.openMerchPopup = function() {
        // Show Popup
        self.displayMerchPopup(true);
    };

    this.resetMerchPopup = function() {
        // Loop through players and reset
        self.playerList().forEach(function(player) {
            player.merch('+');
            player.merch_fish('');
            player.merch_wheat('');
            player.merch_pottery('');
            player.merch_spices('');
            player.merch_papyrus('');
            player.merch_fabric('');
            player.merch_ivory('');
            player.merch_gems('');
            player.merch_gold('');
        });
    };

    this.confirmMerchPopup = function() {
        // Loop through players
        self.playerList().forEach(function(player) {
            // Convert to Number
            player.merch_fish(BG.notNumber(player.merch_fish()));
            // Convert to Number
            player.merch_wheat(BG.notNumber(player.merch_wheat()));
            // Convert to Number
            player.merch_pottery(BG.notNumber(player.merch_pottery()));
            // Convert to Number
            player.merch_spices(BG.notNumber(player.merch_spices()));
            // Convert to Number
            player.merch_papyrus(BG.notNumber(player.merch_papyrus()));
            // Convert to Number
            player.merch_fabric(BG.notNumber(player.merch_fabric()));
            // Convert to Number
            player.merch_ivory(BG.notNumber(player.merch_ivory()));
            // Convert to Number
            player.merch_gems(BG.notNumber(player.merch_gems()));
            // Convert to Number
            player.merch_gold(BG.notNumber(player.merch_gold()));

            //Create empty array
            var merch = [];
            var sum = 0;

            //Push all 9 merchs to merch array
            merch.push(player.merch_fish());
            merch.push(player.merch_wheat());
            merch.push(player.merch_pottery());
            merch.push(player.merch_spices());
            merch.push(player.merch_papyrus());
            merch.push(player.merch_fabric());
            merch.push(player.merch_ivory());
            merch.push(player.merch_gems());
            merch.push(player.merch_gold());

            var points = [0, 1, 3, 7, 13, 21, 30, 40, 50, 60];

            //Loop until array is empty:
            for (var i = merch.length; i > 0; i--) {
                // Sort and Remove 0s
                merch = BG.sortArray(merch);
                merch = BG.removeZeros(merch);
                //Break if any value is <1
                if (merch[0] < 1) {
                    break;
                }
                //add points based on length of array
                sum += points[merch.length];
                //Decrease -1 from each item of array
                merch = merch.map(function(element) {
                    return --element;
                });
                //fix when multiples of one single kind of merch
                if (merch.length == 1 && merch[0] > 0) i++;
            }

            // Update merch total
            player.merch(sum);

        });
        // Close Popup
        self.displayMerchPopup(false);
    };

    this.completeScore = function() {

        var allViziers = [];
        var allArtisans = [];
        var numPlayers = 0;
        var totals = [];

        //for each player, calculate score
        self.playerList().forEach(function(player) {
            var points = 0;
            var total = 0;

            // Get Coins
            points = BG.notNumber(player.coins());
            player.coins(points);
            total += points;
            // Get Viziers
            points = BG.notNumber(player.viziers());
            player.viziers(points);
            if (player.jaafar()) {
                console.log(player.jaafar());
                total += points * 3;
            } else {
                total += points;
            }
            // Get Artisans
            points = BG.notNumber(player.artisans());
            player.artisans(points);
            if (player.ptah()) {
                console.log(player.ptah());
                total += points * 4;
            } else {
                total += points * 2;
            }
            // Get Elders
            points = BG.notNumber(player.elders());
            player.elders(points);
            if (player.shamhat()) {
                console.log(player.shamhat());
                total += points * 4;
            } else {
                total += points * 2;
            }
            // Get Tiles
            points = BG.notNumber(player.tiles());
            player.tiles(points);
            total += points;
            // Get Oasis
            points = BG.notNumber(player.trees());
            player.trees(points);
            if (player.haurvatat()) {
                console.log(player.haurvatat());
                total += points * 5;
            } else {
                total += points * 3;
            }
            // Get Palaces
            points = BG.notNumber(player.palaces());
            player.palaces(points);
            total += points * 5;
            // Get Djinnstotals
            if (isNaN(player.djinnstotal())) player.djinnstotal(0);
            total += player.djinnstotal();
            // Get Items
            if (isNaN(player.items())) player.items(0);
            total += player.items();
            if (player.geb()) {
                console.log(player.geb());
                total += player.items_quantity() * 3;
            }
            // Get Items
            if (isNaN(player.merch())) player.merch(0);
            total += player.merch();
            // Update total
            player.total(total);

            // Populate allViziers and allArtisans
            allViziers.push(player.viziers());
            allArtisans.push(player.artisans());
            // Add to numPlayers if player has at least 1 point
            if (player.total() > 0) numPlayers++;
        });

        // Prepare Viziers Bonus
        // Sort Array
        allViziers = BG.sortArray(allViziers);
        // Remove all zeroes representing non-players (and players, to be fixed later)
        allViziers = BG.removeZeros(allViziers);
        // Add Zeros to allViziers of length is less than number of players
        for (var i = 1; i <= numPlayers; i++) {
            if (allViziers.length < numPlayers) {
                allViziers.push(0);
            }
        }
        // Sort Array again, now that 0 for players in the game but with 0 vizires
        allViziers = BG.sortArray(allViziers);


        // Prepare Artisans Bonus
        // Remove Zeroes
        allArtisans = BG.removeZeros(allArtisans);
        // Sort Array
        allArtisans = BG.reverseArray(allArtisans);
        // If first item and second item are the same, clear array, meaning if two players have the same max number of Artisans, the bonus is invalid.
        if (allArtisans.length > 1) {
            if (allArtisans[0] === allArtisans[1]) {
                allArtisans = [];
            }
        }
        // Calculate Artisans Bonus (1 vp only for the player who has most artisans)


        // For each player, calculate Bonuses
        self.playerList().forEach(function(player) {
            var points;
            // Viziers Bonuses (10 points for each other player with strictly less viziers than current player)
            if (player.viziers() > 0) {
                for (var i = 0; i < allViziers.length; i++) {
                    if (player.viziers() == allViziers[i]) {
                        break;
                    } else {
                        points = player.total() + 10;
                        player.total(points);
                    }
                }
            }
            // Artisans Bonus (+1 extra poin per artisan for the player with strictly more artisans in the game)
            if (player.artisans() > 0 && allArtisans.length > 1) {
                if (player.artisans() === allArtisans[0]) {
                    points = player.total() + player.artisans();
                    player.total(points);
                }
            }
            // Populate Totals for ranking
            totals.push(player.total());
        });

        // Calculate Ranking
        // Reverse Array
        totals = BG.reverseArray(totals);
        // Loop through players and update rank
        self.playerList().forEach(function(player) {
            for (var i = 0; i < totals.length; i++) {
                if (player.total() == totals[i]) {
                    player.rank = i + 1;
                }
            }
            // Move column
            var $target = $('.col-' + player.color);
            $target.css('order', player.rank);
        });

    };

    self.init();
};

// Apply Bindings to View
$(document).ready(function() {
    ko.applyBindings(new ViewModel());

    ko.bindingHandlers.numeric = {
        init: function(element, valueAccessor) {
            $(element).on("keydown", function(event) {
                // Allow: backspace, delete, tab, escape, and enter
                if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
                    // Allow: Ctrl+A
                    (event.keyCode == 65 && event.ctrlKey === true) ||
                    // Allow: . ,
                    (event.keyCode == 188 || event.keyCode == 190 || event.keyCode == 110) ||
                    // Allow: home, end, left, right
                    (event.keyCode >= 35 && event.keyCode <= 39)) {
                    // let it happen, don't do anything
                    return;
                } else {
                    // Ensure that it is a number and stop the keypress
                    if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                        event.preventDefault();
                    }
                }
            });
        }
    };

    // Just for debugging TO-DO: delete this
    vm = ko.dataFor(document.body);
});