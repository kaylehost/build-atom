// Copyright 2002-2013, University of Colorado Boulder
require(
  [
    'buildanatom/model/BuildAnAtomModel',
    'buildanatom/view/BuildAnAtomView',
    'common/view/BAAFont',
    'game/model/BAAGameModel',
    'game/view/BAAGameView',
    'symbol/model/SymbolTabModel',
    'symbol/view/SymbolTabView',
    'SCENERY/nodes/Circle',
    'SCENERY/nodes/Image',
    'SCENERY/nodes/Rectangle',
    'SCENERY/nodes/Text' ,
    'JOIST/Sim',
    'JOIST/SimLauncher',
    'imageLoader'
  ],
  function( BuildAnAtomModel, BuildAnAtomView, BAAFont, BAAGameModel, BAAGameView, SymbolTabModel, SymbolTabView, Circle, Image, Rectangle, Text, Sim, SimLauncher, imageLoader ) {
    "use strict";

    var gameIcon = new Rectangle( 0, 0, 67, 50, {fill: 'rgb(255, 254, 223)'} );
    gameIcon.addChild( new Circle( 10,
                                   {
                                     stroke: 'blue',
                                     lineWidth: 0.5,
                                     lineDash: [ 1, 1 ],
                                     center: gameIcon.center
                                   }
    ) );
    gameIcon.addChild( new Circle( 20,
                                   {
                                     stroke: 'blue',
                                     lineWidth: 0.5,
                                     lineDash: [ 1, 1 ],
                                     center: gameIcon.center
                                   }
    ) );
    gameIcon.addChild( new Text( "?",
                                 {
                                   font: new BAAFont( 40, 'bold' ),
                                   fill: 'rgba(50, 50, 50, 20)',
                                   center: gameIcon.center
                                 } ) );

    SimLauncher.launch( imageLoader, function() {

      //Create and start the sim
      //TODO: i18n
      new Sim( "Build an Atom", [
        { name: "Atom",
          icon: new Image( imageLoader.getImage( "BAA_atom.png" ) ),
//          backgroundColor: 'rgb(255, 254, 223)',
          backgroundColor: 'white',
          createModel: function() {
            return new BuildAnAtomModel();
          },
          createView: function( model ) {
            return new BuildAnAtomView( model );
          }
        },
        { name: "Symbol",
          icon: new Image( imageLoader.getImage( "BAA_symbol.png" ) ),
          backgroundColor: 'rgb(255, 230, 179)',
          createModel: function() {
            return new BuildAnAtomModel();
          },
          createView: function( model ) {
            return new SymbolTabView( model );
          }
        },
        { name: "Game",
          icon: gameIcon,
          backgroundColor: 'rgb(255, 254, 223)',
          createModel: function() {
            return new BAAGameModel();
          },
          createView: function( model ) {
            return new BAAGameView( model );
          }
        }
      ], { home: true, tab: 0, navigationBarInFront: true} ).start();
    } );

  } );
