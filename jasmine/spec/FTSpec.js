describe("App", function() {
  var vm;

  beforeEach(function() {
    vm = ko.dataFor(document.body);
    reset();
  });

  var reset = function(){
    vm.completeReset();
  }

  it("should show 0 points for each player when 'score' is clicked", function() {    
    // Trigger scoring
    vm.completeScore();

    expect(vm.playerList()[0].total()).toEqual(0);
    expect(vm.playerList()[1].total()).toEqual(0);
    expect(vm.playerList()[2].total()).toEqual(0);
    expect(vm.playerList()[3].total()).toEqual(0);
  });

  describe("Coins", function(){

    it("should add their total to each player score", function() {
      // Adds coins
      vm.playerList()[0].coins(1);
      vm.playerList()[1].coins(3);
      vm.playerList()[2].coins(10);
      vm.playerList()[3].coins(45);

      // Trigger scoring
      vm.completeScore();

      expect(vm.playerList()[0].total()).toEqual(1);
      expect(vm.playerList()[1].total()).toEqual(3);
      expect(vm.playerList()[2].total()).toEqual(10);
      expect(vm.playerList()[3].total()).toEqual(45);
    });

  });

  describe("Viziers (yellow meeples)", function(){

    it("should add 1 point for each vizier, plus 10 points for each player they overscored, to each player score", function() {
      // Adds viziers
      vm.playerList()[0].viziers(1);
      vm.playerList()[1].viziers(3);
      vm.playerList()[2].viziers(4);
      vm.playerList()[3].viziers(6);

      // Trigger scoring
      vm.completeScore();

      expect(vm.playerList()[0].total()).toEqual(1);
      expect(vm.playerList()[1].total()).toEqual(13);
      expect(vm.playerList()[2].total()).toEqual(24);
      expect(vm.playerList()[3].total()).toEqual(36);
    });

    it("should add 1 point for each vizier, plus 10 points for each player they 'strictly' overscored, to each player score", function() {
      // Adds viziers
      vm.playerList()[0].viziers(1);
      vm.playerList()[1].viziers(2);
      vm.playerList()[2].viziers(3);
      vm.playerList()[3].viziers(2);

      // Trigger scoring
      vm.completeScore();

      expect(vm.playerList()[0].total()).toEqual(1);
      expect(vm.playerList()[1].total()).toEqual(12);
      expect(vm.playerList()[2].total()).toEqual(33);
      expect(vm.playerList()[3].total()).toEqual(12);
    });

    it("should grant extra 2 points per vizier if player has Jaafar", function() {
      // Adds viziers
      vm.playerList()[0].viziers(1);
      vm.playerList()[1].viziers(2);
      vm.playerList()[2].viziers(3);
      vm.playerList()[3].viziers(4);
      
      // Add Jaafar to player 2
      vm.playerList()[1].jaafar(true);

      // Trigger scoring
      vm.completeScore();

      expect(vm.playerList()[0].total()).toEqual(1);
      expect(vm.playerList()[1].total()).toEqual(16);
      expect(vm.playerList()[2].total()).toEqual(23);
      expect(vm.playerList()[3].total()).toEqual(34);
    });
  });

  describe("Artisans (purple meeples)", function(){

    it("should add 2 point for each artisans, plus 1 extra point to the player with the most artisans, to each player score", function() {
      // Adds artisans
      vm.playerList()[0].artisans(1);
      vm.playerList()[1].artisans(2);
      vm.playerList()[2].artisans(4);
      vm.playerList()[3].artisans(5);

      // Trigger scoring
      vm.completeScore();

      expect(vm.playerList()[0].total()).toEqual(2);
      expect(vm.playerList()[1].total()).toEqual(4);
      expect(vm.playerList()[2].total()).toEqual(8);
      expect(vm.playerList()[3].total()).toEqual(15);

    });

    it("should add 2 point for each artisans, plus 1 extra point to the player with 'strictly' the most artisans, to each player score", function() {
      // Adds artisans
      vm.playerList()[0].artisans(1);
      vm.playerList()[1].artisans(2);
      vm.playerList()[2].artisans(5);
      vm.playerList()[3].artisans(5);

      // Trigger scoring
      vm.completeScore();

      expect(vm.playerList()[0].total()).toEqual(2);
      expect(vm.playerList()[1].total()).toEqual(4);
      expect(vm.playerList()[2].total()).toEqual(10);
      expect(vm.playerList()[3].total()).toEqual(10);
    });

    it("should grant extra 2 points per vizier if player has Ptah", function() {
      // Adds artisans
      vm.playerList()[0].artisans(1);
      vm.playerList()[1].artisans(2);
      vm.playerList()[2].artisans(3);
      vm.playerList()[3].artisans(5);
      
      // Add Ptah to player 2
      vm.playerList()[1].ptah(true);

      // Trigger scoring
      vm.completeScore();

      expect(vm.playerList()[0].total()).toEqual(2);
      expect(vm.playerList()[1].total()).toEqual(8);
      expect(vm.playerList()[2].total()).toEqual(6);
      expect(vm.playerList()[3].total()).toEqual(15);
    });
  });

  describe("Elders (white meeples)", function(){

    it("should add 2 point for each elders to each player score", function() {
      // Adds elders
      vm.playerList()[0].elders(1);
      vm.playerList()[1].elders(2);
      vm.playerList()[2].elders(3);
      vm.playerList()[3].elders(5);

      // Trigger scoring
      vm.completeScore();

      expect(vm.playerList()[0].total()).toEqual(2);
      expect(vm.playerList()[1].total()).toEqual(4);
      expect(vm.playerList()[2].total()).toEqual(6);
      expect(vm.playerList()[3].total()).toEqual(10);

    });

    it("should grant extra 2 points per vizier if player has Shamhat", function() {
      // Adds elders
      vm.playerList()[0].elders(1);
      vm.playerList()[1].elders(2);
      vm.playerList()[2].elders(3);
      vm.playerList()[3].elders(5);

      // Add Shamhat to player 2
      vm.playerList()[1].shamhat(true);

      // Trigger scoring
      vm.completeScore();

      expect(vm.playerList()[0].total()).toEqual(2);
      expect(vm.playerList()[1].total()).toEqual(8);
      expect(vm.playerList()[2].total()).toEqual(6);
      expect(vm.playerList()[3].total()).toEqual(10);
    });
  });

  describe("Camels and Tent", function(){

    it("should add their total to each player score", function() {
      // Adds tiles
      vm.playerList()[0].tiles(12);
      vm.playerList()[1].tiles(23);
      vm.playerList()[2].tiles(35);
      vm.playerList()[3].tiles(57);

      // Trigger scoring
      vm.completeScore();

      expect(vm.playerList()[0].total()).toEqual(12);
      expect(vm.playerList()[1].total()).toEqual(23);
      expect(vm.playerList()[2].total()).toEqual(35);
      expect(vm.playerList()[3].total()).toEqual(57);
    });
  });

  describe("Oasis (palm trees)", function(){

    it("should add 3 point for each palm treemto each player score", function() {
      // Adds trees
      vm.playerList()[0].trees(1);
      vm.playerList()[1].trees(4);
      vm.playerList()[2].trees(2);
      vm.playerList()[3].trees(3);

      // Trigger scoring
      vm.completeScore();

      expect(vm.playerList()[0].total()).toEqual(3);
      expect(vm.playerList()[1].total()).toEqual(12);
      expect(vm.playerList()[2].total()).toEqual(6);
      expect(vm.playerList()[3].total()).toEqual(9);

    });

    it("should grant extra 2 points per palm tree if player has Haurvatat", function() {
      // Adds trees
      vm.playerList()[0].trees(1);
      vm.playerList()[1].trees(4);
      vm.playerList()[2].trees(2);
      vm.playerList()[3].trees(3);

      // Add Haurvatat to player 2
      vm.playerList()[1].haurvatat(true);

      // Trigger scoring
      vm.completeScore();

      expect(vm.playerList()[0].total()).toEqual(3);
      expect(vm.playerList()[1].total()).toEqual(20);
      expect(vm.playerList()[2].total()).toEqual(6);
      expect(vm.playerList()[3].total()).toEqual(9);
    });
  });

  describe("Villages (palaces)", function(){

    it("should add 5 point for each palace to each player score", function() {
      // Adds palaces
      vm.playerList()[0].palaces(1);
      vm.playerList()[1].palaces(2);
      vm.playerList()[2].palaces(3);
      vm.playerList()[3].palaces(4);

      // Trigger scoring
      vm.completeScore();

      expect(vm.playerList()[0].total()).toEqual(5);
      expect(vm.playerList()[1].total()).toEqual(10);
      expect(vm.playerList()[2].total()).toEqual(15);
      expect(vm.playerList()[3].total()).toEqual(20);

    });
  });

  describe("Djinns & Thieves", function(){

    it("should toggle other players when Jaafar is selected", function() {
      // Trigger Jaafar for player one, then two
      vm.playerList()[0].jaafar(true);
      vm.playerList()[1].jaafar(true);

      expect(vm.playerList()[0].jaafar()).toBe(false);
      expect(vm.playerList()[1].jaafar()).toBe(true);
      expect(vm.playerList()[2].jaafar()).toBe(false);
      expect(vm.playerList()[3].jaafar()).toBe(false);

      // Trigger Jaafar for player three
      vm.playerList()[2].jaafar(true);

      expect(vm.playerList()[0].jaafar()).toBe(false);
      expect(vm.playerList()[1].jaafar()).toBe(false);
      expect(vm.playerList()[2].jaafar()).toBe(true);
      expect(vm.playerList()[3].jaafar()).toBe(false);
    });

    it("should toggle other players when Shamhat is selected", function() {
      // Trigger Shamhat for player one, then two
      vm.playerList()[0].shamhat(true);
      vm.playerList()[1].shamhat(true);

      expect(vm.playerList()[0].shamhat()).toBe(false);
      expect(vm.playerList()[1].shamhat()).toBe(true);
      expect(vm.playerList()[2].shamhat()).toBe(false);
      expect(vm.playerList()[3].shamhat()).toBe(false);

      // Trigger Shamhat for player three
      vm.playerList()[2].shamhat(true);

      expect(vm.playerList()[0].shamhat()).toBe(false);
      expect(vm.playerList()[1].shamhat()).toBe(false);
      expect(vm.playerList()[2].shamhat()).toBe(true);
      expect(vm.playerList()[3].shamhat()).toBe(false);
    });

    it("should toggle other players when Haurvatat is selected", function() {
      // Trigger Haurvatat for player one, then two
      vm.playerList()[0].haurvatat(true);
      vm.playerList()[1].haurvatat(true);

      expect(vm.playerList()[0].haurvatat()).toBe(false);
      expect(vm.playerList()[1].haurvatat()).toBe(true);
      expect(vm.playerList()[2].haurvatat()).toBe(false);
      expect(vm.playerList()[3].haurvatat()).toBe(false);

      // Trigger Haurvatat for player three
      vm.playerList()[2].haurvatat(true);

      expect(vm.playerList()[0].haurvatat()).toBe(false);
      expect(vm.playerList()[1].haurvatat()).toBe(false);
      expect(vm.playerList()[2].haurvatat()).toBe(true);
      expect(vm.playerList()[3].haurvatat()).toBe(false);
    });

    it("should toggle other players when Geb is selected", function() {
      // Trigger Geb for player one, then two
      vm.playerList()[0].geb(true);
      vm.playerList()[1].geb(true);

      expect(vm.playerList()[0].geb()).toBe(false);
      expect(vm.playerList()[1].geb()).toBe(true);
      expect(vm.playerList()[2].geb()).toBe(false);
      expect(vm.playerList()[3].geb()).toBe(false);

      // Trigger Geb for player three
      vm.playerList()[2].geb(true);

      expect(vm.playerList()[0].geb()).toBe(false);
      expect(vm.playerList()[1].geb()).toBe(false);
      expect(vm.playerList()[2].geb()).toBe(true);
      expect(vm.playerList()[3].geb()).toBe(false);
    });

    it("should toggle other players when Ptah is selected", function() {
      // Trigger Ptah for player one, then two
      vm.playerList()[0].ptah(true);
      vm.playerList()[1].ptah(true);

      expect(vm.playerList()[0].ptah()).toBe(false);
      expect(vm.playerList()[1].ptah()).toBe(true);
      expect(vm.playerList()[2].ptah()).toBe(false);
      expect(vm.playerList()[3].ptah()).toBe(false);

      // Trigger Ptah for player three
      vm.playerList()[2].ptah(true);

      expect(vm.playerList()[0].ptah()).toBe(false);
      expect(vm.playerList()[1].ptah()).toBe(false);
      expect(vm.playerList()[2].ptah()).toBe(true);
      expect(vm.playerList()[3].ptah()).toBe(false);
    });

    describe("Reset Button", function(){

      it("should reset any djinn observable", function(){
        // Trigger djinns
        vm.playerList()[0].jaafar(true);
        vm.playerList()[1].shamhat(true);
        vm.playerList()[0].haurvatat(true);
        vm.playerList()[2].geb(true);
        vm.playerList()[3].ptah(true);

        vm.resetDjinnsPopup();

        expect(vm.playerList()[0].jaafar()).toBe(false);
        expect(vm.playerList()[1].shamhat()).toBe(false);
        expect(vm.playerList()[0].haurvatat()).toBe(false);
        expect(vm.playerList()[2].geb()).toBe(false);
        expect(vm.playerList()[3].ptah()).toBe(false);
      });
    });

    describe("Done Button", function(){

      beforeEach(function(){
        // Adds djinns
        vm.playerList()[0].djinns(6);
        vm.playerList()[1].djinns(12);
        vm.playerList()[2].djinns(9);
        vm.playerList()[3].djinns(0);
        // Add thives
        vm.playerList()[0].thieves(6);
        vm.playerList()[1].thieves(0);
        vm.playerList()[2].thieves(12);
        vm.playerList()[3].thieves(0);
      });

      it("should sum points for each djinns and thieves and display in djinns tota poins main screen", function() {
        // Trigger confirm djinns
        vm.confirmDjinnsPopup();

        expect(vm.playerList()[0].djinnstotal()).toEqual(12);
        expect(vm.playerList()[1].djinnstotal()).toEqual(12);
        expect(vm.playerList()[2].djinnstotal()).toEqual(21);
        expect(vm.playerList()[3].djinnstotal()).toEqual(0);

      });

      it("should sum points for each djinns and thieves to each player score", function() {
        // Trigger confirm djinns
        vm.confirmDjinnsPopup();

        // Trigger scoring
        vm.completeScore();

        expect(vm.playerList()[0].total()).toEqual(12);
        expect(vm.playerList()[1].total()).toEqual(12);
        expect(vm.playerList()[2].total()).toEqual(21);
        expect(vm.playerList()[3].total()).toEqual(0);

      });
    });
  });
  
  describe("Precious Items", function(){

    beforeEach(function(){
      // Add items
      vm.playerList()[0].items_jewelry(1);
      vm.playerList()[0].items_treasures(1);
      vm.playerList()[0].items_crowns(1);
      vm.playerList()[1].items_jewelry(0);
      vm.playerList()[1].items_treasures(1);
      vm.playerList()[1].items_crowns(0);
      vm.playerList()[2].items_jewelry(1);
      vm.playerList()[2].items_treasures(2);
      vm.playerList()[2].items_crowns(3);
      vm.playerList()[3].items_jewelry(2);
      vm.playerList()[3].items_treasures(1);
      vm.playerList()[3].items_crowns(0);
    });

    describe("Reset Button", function(){
      it("should clear items count when pressed", function(){
        vm.resetItemsPopup();

        expect(vm.playerList()[0].items_jewelry()).toBe('');
        expect(vm.playerList()[1].items_jewelry()).toBe('');
        expect(vm.playerList()[2].items_jewelry()).toBe('');
        expect(vm.playerList()[3].items_jewelry()).toBe('');
        expect(vm.playerList()[0].items_treasures()).toBe('');
        expect(vm.playerList()[1].items_treasures()).toBe('');
        expect(vm.playerList()[2].items_treasures()).toBe('');
        expect(vm.playerList()[3].items_treasures()).toBe('');
        expect(vm.playerList()[0].items_crowns()).toBe('');
        expect(vm.playerList()[1].items_crowns()).toBe('');
        expect(vm.playerList()[2].items_crowns()).toBe('');
        expect(vm.playerList()[3].items_crowns()).toBe('');
        expect(vm.playerList()[0].items_quantity()).toBe(0);
        expect(vm.playerList()[1].items_quantity()).toBe(0);
        expect(vm.playerList()[2].items_quantity()).toBe(0);
        expect(vm.playerList()[3].items_quantity()).toBe(0);
      });
    });

    describe("Done Button", function(){
      it("should sum and shown total items total when pressed", function(){
        // Trigger confirm items
        vm.confirmItemsPopup();

        expect(vm.playerList()[0].items()).toBe(21);
        expect(vm.playerList()[0].items_quantity()).toBe(3);
        expect(vm.playerList()[1].items()).toBe(7);
        expect(vm.playerList()[1].items_quantity()).toBe(1);
        expect(vm.playerList()[2].items()).toBe(46);
        expect(vm.playerList()[2].items_quantity()).toBe(6);
        expect(vm.playerList()[3].items()).toBe(17);
        expect(vm.playerList()[3].items_quantity()).toBe(3);

      });

      it("should sum in total items in the final score", function(){
        // Trigger confirm items
        vm.confirmItemsPopup();

        // Trigger scoring
        vm.completeScore();

        expect(vm.playerList()[0].total()).toEqual(21);
        expect(vm.playerList()[1].total()).toEqual(7);
        expect(vm.playerList()[2].total()).toEqual(46);
        expect(vm.playerList()[3].total()).toEqual(17);
      });
    });

    it("should grant extra 3 points per precious items if player has Geb", function() {
        // Trigger confirm items
        vm.confirmItemsPopup();

        // Add Geb to player 2
        vm.playerList()[1].geb(true);

        // Trigger scoring
        vm.completeScore();

        expect(vm.playerList()[0].total()).toEqual(21);
        expect(vm.playerList()[1].total()).toEqual(10);
        expect(vm.playerList()[2].total()).toEqual(46);
        expect(vm.playerList()[3].total()).toEqual(17);
    });

  });

  describe("Merch", function(){

    beforeEach(function(){
      // Add items
      vm.playerList()[0].merch_fish(1);
      vm.playerList()[0].merch_wheat(1);
      vm.playerList()[0].merch_pottery(1);
      vm.playerList()[0].merch_spices(1);
      vm.playerList()[0].merch_papyrus(1);
      vm.playerList()[0].merch_fabric(1);
      vm.playerList()[0].merch_ivory(1);
      vm.playerList()[0].merch_gems(1);
      vm.playerList()[0].merch_gold(1);
    });

    describe("Reset Button", function() {

      it("should reset all numbers in the merch pop-up", function(){
        expect(vm.playerList()[0].merch_fish()).toBe(1);
        expect(vm.playerList()[0].merch_wheat()).toBe(1);
        expect(vm.playerList()[0].merch_pottery()).toBe(1);
        expect(vm.playerList()[0].merch_spices()).toBe(1);
        expect(vm.playerList()[0].merch_papyrus()).toBe(1);
        expect(vm.playerList()[0].merch_fabric()).toBe(1);
        expect(vm.playerList()[0].merch_ivory()).toBe(1);
        expect(vm.playerList()[0].merch_gems()).toBe(1);
        expect(vm.playerList()[0].merch_gold()).toBe(1);

        // Trigger confirm merch
        vm.resetMerchPopup();

        expect(vm.playerList()[0].merch_fish()).toBe('');
        expect(vm.playerList()[0].merch_wheat()).toBe('');
        expect(vm.playerList()[0].merch_pottery()).toBe('');
        expect(vm.playerList()[0].merch_spices()).toBe('');
        expect(vm.playerList()[0].merch_papyrus()).toBe('');
        expect(vm.playerList()[0].merch_fabric()).toBe('');
        expect(vm.playerList()[0].merch_ivory()).toBe('');
        expect(vm.playerList()[0].merch_gems()).toBe('');
        expect(vm.playerList()[0].merch_gold()).toBe('');
      });
    });

    describe("Done Button", function() {

      it("should give 60 points for 1 of each the 9 types of merch", function(){

        // Trigger confirm merch
        vm.confirmMerchPopup();

        expect(vm.playerList()[0].merch()).toBe(60);
      });

      it("should give 50 points for 1 merch in 8 types of merch", function(){
        // Update items
        vm.playerList()[0].merch_ivory(0);

        // Trigger confirm merch
        vm.confirmMerchPopup();

        expect(vm.playerList()[0].merch()).toBe(50);
      });

      it("should give 40 points for 1 merch in 7 types of merch", function(){
        // Update items
        vm.playerList()[0].merch_pottery(0);
        vm.playerList()[0].merch_ivory(0);

        // Trigger confirm merch
        vm.confirmMerchPopup();

        expect(vm.playerList()[0].merch()).toBe(40);
      });

      it("should give 30 points for 1 merch in 6 types of merch", function(){
        // Update items
        vm.playerList()[0].merch_pottery(0);
        vm.playerList()[0].merch_ivory(0);
        vm.playerList()[0].merch_gold(0);

        // Trigger confirm merch
        vm.confirmMerchPopup();

        expect(vm.playerList()[0].merch()).toBe(30);
      });

      it("should give 21 points for 1 merch in 5 types of merch", function(){
        // Update items
        vm.playerList()[0].merch_pottery(0);
        vm.playerList()[0].merch_spices(0);
        vm.playerList()[0].merch_ivory(0);
        vm.playerList()[0].merch_gold(0);

        // Trigger confirm merch
        vm.confirmMerchPopup();

        expect(vm.playerList()[0].merch()).toBe(21);
      });

      it("should give 13 points for 1 merch in 4 types of merch", function(){
        // Update items
        vm.playerList()[0].merch_pottery(0);
        vm.playerList()[0].merch_spices(0);
        vm.playerList()[0].merch_ivory(0);
        vm.playerList()[0].merch_gold(0);
        vm.playerList()[0].merch_fish(0);

        // Trigger confirm merch
        vm.confirmMerchPopup();

        expect(vm.playerList()[0].merch()).toBe(13);
      });

      it("should give 7 points for 1 merch in 3 types of merch", function(){
        // Update items
        vm.playerList()[0].merch_pottery(0);
        vm.playerList()[0].merch_spices(0);
        vm.playerList()[0].merch_ivory(0);
        vm.playerList()[0].merch_gold(0);
        vm.playerList()[0].merch_fish(0);
        vm.playerList()[0].merch_wheat(0);

        // Trigger confirm merch
        vm.confirmMerchPopup();

        expect(vm.playerList()[0].merch()).toBe(7);
      });

      it("should give 3 points for 1 merch in 2 types of merch", function(){
        // Update items
        vm.playerList()[0].merch_pottery(0);
        vm.playerList()[0].merch_spices(0);
        vm.playerList()[0].merch_ivory(0);
        vm.playerList()[0].merch_gold(0);
        vm.playerList()[0].merch_fish(0);
        vm.playerList()[0].merch_wheat(0);
        vm.playerList()[0].merch_papyrus(0);

        // Trigger confirm merch
        vm.confirmMerchPopup();

        expect(vm.playerList()[0].merch()).toBe(3);
      });

      it("should give 1 point for 1 merch in 1 types of merch", function(){
        // Update items
        vm.playerList()[0].merch_pottery(0);
        vm.playerList()[0].merch_spices(0);
        vm.playerList()[0].merch_ivory(0);
        vm.playerList()[0].merch_gold(0);
        vm.playerList()[0].merch_fish(0);
        vm.playerList()[0].merch_wheat(0);
        vm.playerList()[0].merch_papyrus(0);
        vm.playerList()[0].merch_gems(0);

        // Trigger confirm merch
        vm.confirmMerchPopup();

        expect(vm.playerList()[0].merch()).toBe(1);
      });

      it("should give 61 points for a full set plus 1 of one", function(){
        vm.playerList()[0].merch_gems(2);

        // Trigger confirm merch
        vm.confirmMerchPopup();

        expect(vm.playerList()[0].merch()).toBe(61);
      });

      it("should give 62 points for a full set plus 2 of one", function(){
        vm.playerList()[0].merch_gems(3);

        // Trigger confirm merch
        vm.confirmMerchPopup();

        expect(vm.playerList()[0].merch()).toBe(62);
      });

      it("should give 67 points for a full set plus 1 of three merch", function(){
        vm.playerList()[0].merch_gems(2);
        vm.playerList()[0].merch_wheat(2);
        vm.playerList()[0].merch_papyrus(2);

        // Trigger confirm merch
        vm.confirmMerchPopup();

        expect(vm.playerList()[0].merch()).toBe(67);
      });

      it("should give 8 points for 8 of the same merch", function(){
        vm.playerList()[0].merch_fish(0);
        vm.playerList()[0].merch_wheat(0);
        vm.playerList()[0].merch_pottery(0);
        vm.playerList()[0].merch_spices(0);
        vm.playerList()[0].merch_papyrus(0);
        vm.playerList()[0].merch_fabric(0);
        vm.playerList()[0].merch_ivory(8);
        vm.playerList()[0].merch_gems(0);
        vm.playerList()[0].merch_gold(0);

        // Trigger confirm merch
        vm.confirmMerchPopup();

        expect(vm.playerList()[0].merch()).toBe(8);
      });

      it("should give 41 points for a random set like this '2,3,1,4,1,1'", function(){
        vm.playerList()[0].merch_fish(2);
        vm.playerList()[0].merch_wheat(3);
        vm.playerList()[0].merch_pottery(1);
        vm.playerList()[0].merch_spices(4);
        vm.playerList()[0].merch_papyrus(1);
        vm.playerList()[0].merch_fabric(1);
        vm.playerList()[0].merch_ivory(0);
        vm.playerList()[0].merch_gems(0);
        vm.playerList()[0].merch_gold(0);

        // Trigger confirm merch
        vm.confirmMerchPopup();

        expect(vm.playerList()[0].merch()).toBe(41);
      });
    });
  });
  
  describe('A full game', function(){

    it("should result 0 in case 1", function(){
      vm.playerList()[0].coins(0);
      vm.playerList()[0].viziers(0);
      vm.playerList()[0].artisans(0);
      vm.playerList()[0].elders(0);
      vm.playerList()[0].djinns(0);
      vm.playerList()[0].thieves(0);
      vm.playerList()[0].tiles(0);
      vm.playerList()[0].trees(0);
      vm.playerList()[0].palaces(0);
      vm.playerList()[0].items_jewelry(0);
      vm.playerList()[0].items_treasures(0);
      vm.playerList()[0].items_crowns(0);
      vm.playerList()[0].merch_fish(0);
      vm.playerList()[0].merch_wheat(0);
      vm.playerList()[0].merch_pottery(0);
      vm.playerList()[0].merch_spices(0);
      vm.playerList()[0].merch_papyrus(0);
      vm.playerList()[0].merch_fabric(0);
      vm.playerList()[0].merch_ivory(0);
      vm.playerList()[0].merch_gems(0);
      vm.playerList()[0].merch_gold(0);
      vm.playerList()[0].jaafar(false);
      vm.playerList()[0].shamhat(false);
      vm.playerList()[0].haurvatat(false);
      vm.playerList()[0].geb(false);
      vm.playerList()[0].ptah(false);

      vm.confirmDjinnsPopup();
      vm.confirmItemsPopup();
      vm.confirmMerchPopup();

      vm.completeScore();

      expect(vm.playerList()[0].total()).toEqual(0);
    });

    it("should result 146 in case 2", function(){
      vm.playerList()[0].coins(12);
      vm.playerList()[0].viziers(3);
      vm.playerList()[0].artisans(0);
      vm.playerList()[0].elders(6);
      vm.playerList()[0].djinns(18);
      vm.playerList()[0].thieves(0);
      vm.playerList()[0].tiles(32);
      vm.playerList()[0].trees(3);
      vm.playerList()[0].palaces(2);
      vm.playerList()[0].items_jewelry(0);
      vm.playerList()[0].items_treasures(0);
      vm.playerList()[0].items_crowns(0);
      vm.playerList()[0].merch_fish(1);
      vm.playerList()[0].merch_wheat(2);
      vm.playerList()[0].merch_pottery(1);
      vm.playerList()[0].merch_spices(5);
      vm.playerList()[0].merch_papyrus(1);
      vm.playerList()[0].merch_fabric(2);
      vm.playerList()[0].merch_ivory(1);
      vm.playerList()[0].merch_gems(0);
      vm.playerList()[0].merch_gold(0);
      vm.playerList()[0].jaafar(false);
      vm.playerList()[0].shamhat(false);
      vm.playerList()[0].haurvatat(false);
      vm.playerList()[0].geb(false);
      vm.playerList()[0].ptah(false);

      vm.confirmDjinnsPopup();
      vm.confirmItemsPopup();
      vm.confirmMerchPopup();

      vm.completeScore();

      expect(vm.playerList()[0].total()).toEqual(146);
    });

    it("should result 130 in case 3 with Artisans expansion", function(){
      vm.playerList()[0].coins(35);
      vm.playerList()[0].viziers(6);
      vm.playerList()[0].artisans(3);
      vm.playerList()[0].elders(0);
      vm.playerList()[0].djinns(6);
      vm.playerList()[0].thieves(0);
      vm.playerList()[0].tiles(16);
      vm.playerList()[0].trees(1);
      vm.playerList()[0].palaces(1);
      vm.playerList()[0].items_jewelry(1);
      vm.playerList()[0].items_treasures(2);
      vm.playerList()[0].items_crowns(1);
      vm.playerList()[0].merch_fish(5);
      vm.playerList()[0].merch_wheat(1);
      vm.playerList()[0].merch_pottery(0);
      vm.playerList()[0].merch_spices(0);
      vm.playerList()[0].merch_papyrus(1);
      vm.playerList()[0].merch_fabric(0);
      vm.playerList()[0].merch_ivory(0);
      vm.playerList()[0].merch_gems(0);
      vm.playerList()[0].merch_gold(0);
      vm.playerList()[0].jaafar(true);
      vm.playerList()[0].shamhat(false);
      vm.playerList()[0].haurvatat(true);
      vm.playerList()[0].geb(false);
      vm.playerList()[0].ptah(false);

      vm.confirmDjinnsPopup();
      vm.confirmItemsPopup();
      vm.confirmMerchPopup();

      vm.completeScore();

      expect(vm.playerList()[0].total()).toEqual(130);
    });

    it("should result 180 in case 3 with Artisans expansion", function(){
      vm.playerList()[0].coins(35);
      vm.playerList()[0].viziers(6);
      vm.playerList()[0].artisans(3);
      vm.playerList()[0].elders(3);
      vm.playerList()[0].djinns(15);
      vm.playerList()[0].thieves(0);
      vm.playerList()[0].tiles(25);
      vm.playerList()[0].trees(2);
      vm.playerList()[0].palaces(3);
      vm.playerList()[0].items_jewelry(1);
      vm.playerList()[0].items_treasures(2);
      vm.playerList()[0].items_crowns(1);
      vm.playerList()[0].merch_fish(5);
      vm.playerList()[0].merch_wheat(1);
      vm.playerList()[0].merch_pottery(0);
      vm.playerList()[0].merch_spices(0);
      vm.playerList()[0].merch_papyrus(1);
      vm.playerList()[0].merch_fabric(0);
      vm.playerList()[0].merch_ivory(0);
      vm.playerList()[0].merch_gems(0);
      vm.playerList()[0].merch_gold(0);
      vm.playerList()[0].jaafar(false);
      vm.playerList()[0].shamhat(true);
      vm.playerList()[0].haurvatat(false);
      vm.playerList()[0].geb(true);
      vm.playerList()[0].ptah(true);

      vm.confirmDjinnsPopup();
      vm.confirmItemsPopup();
      vm.confirmMerchPopup();

      vm.completeScore();

      expect(vm.playerList()[0].total()).toEqual(177);
    });

    it("should result 69 in case 5 with Thives expansion", function(){
      vm.playerList()[0].coins(10);
      vm.playerList()[0].viziers(0);
      vm.playerList()[0].artisans(0);
      vm.playerList()[0].elders(0);
      vm.playerList()[0].djinns(12);
      vm.playerList()[0].thieves(12);
      vm.playerList()[0].tiles(25);
      vm.playerList()[0].trees(0);
      vm.playerList()[0].palaces(0);
      vm.playerList()[0].items_jewelry(0);
      vm.playerList()[0].items_treasures(0);
      vm.playerList()[0].items_crowns(0);
      vm.playerList()[0].merch_fish(0);
      vm.playerList()[0].merch_wheat(0);
      vm.playerList()[0].merch_pottery(0);
      vm.playerList()[0].merch_spices(0);
      vm.playerList()[0].merch_papyrus(0);
      vm.playerList()[0].merch_fabric();
      vm.playerList()[0].merch_ivory(1);
      vm.playerList()[0].merch_gems(2);
      vm.playerList()[0].merch_gold(2);
      vm.playerList()[0].jaafar(false);
      vm.playerList()[0].shamhat(false);
      vm.playerList()[0].haurvatat(false);
      vm.playerList()[0].geb(false);
      vm.playerList()[0].ptah(false);

      vm.confirmDjinnsPopup();
      vm.confirmItemsPopup();
      vm.confirmMerchPopup();

      vm.completeScore();

      expect(vm.playerList()[0].total()).toEqual(69);
    });
  });






});
