// Copyright 2002-2013, University of Colorado Boulder
define( function( require ) {
  'use strict';

  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var GameStartButton = require( 'game/view/GameStartButton' );

  var StartSubGameNode = function StartSubGameNode( gameModel, layoutBounds ) {

    Node.call( this ); // Call super constructor.

    // Node creation
    var title = new Text( "Choose Your Challenge", { font: new PhetFont( 30 ) } );
    this.addChild( title );
    var periodicTableGameButton = new GameStartButton( 'Periodic Table Game', function() {
      gameModel.startSubGame( 'periodicTableGame' );
    } );
    this.addChild( periodicTableGameButton );
    var massAndChangeGameButton = new GameStartButton( 'Mass And Charge Game', function() {
      gameModel.startSubGame( 'massAndChargeGame' );
    } );
    this.addChild( massAndChangeGameButton );
    var symbolGameButton = new GameStartButton( 'Symbol Game', function() {
      gameModel.startSubGame( 'symbolGame' );
    } );
    this.addChild( symbolGameButton );
    var advancedSymbolGameButton = new GameStartButton( 'Advanced Symbol Game', function() {
      gameModel.startSubGame( 'advancedSymbolGame' );
    } );
    this.addChild( advancedSymbolGameButton );

    // Layout
    title.centerX = layoutBounds.width / 2;
    title.top = 20;
    var buttonWidth = periodicTableGameButton.width; // Note: Assumes all buttons are the same size.
    var interButtonXSpace = buttonWidth * 0.2;
    var buttonCenterY = layoutBounds.height * 0.4;
    periodicTableGameButton.right = layoutBounds.centerX - 1.5 * interButtonXSpace - buttonWidth;
    periodicTableGameButton.centerY = buttonCenterY;
    massAndChangeGameButton.left = periodicTableGameButton.right + interButtonXSpace;
    massAndChangeGameButton.centerY = buttonCenterY;
    symbolGameButton.left = massAndChangeGameButton.right + interButtonXSpace;
    symbolGameButton.centerY = buttonCenterY;
    advancedSymbolGameButton.left = symbolGameButton.right + interButtonXSpace;
    advancedSymbolGameButton.centerY = buttonCenterY;
  };

  // Inherit from Node.
  inherit( Node, StartSubGameNode );

  return StartSubGameNode;
} );
