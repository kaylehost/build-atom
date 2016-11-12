// Copyright 2013-2015, University of Colorado Boulder

/**
 * Visual representation of a problem where the user is presented with a
 * schematic representation of an atom (which looks much like the atoms
 * constructed on the 1st tab), and must determine that atom's mass number.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var MultiLineText = require( 'SCENERY_PHET/MultiLineText' );
  var NonInteractiveSchematicAtomNode = require( 'BUILD_AN_ATOM/game/view/NonInteractiveSchematicAtomNode' );
  var NumberAtom = require( 'SHRED/model/NumberAtom' );
  var NumberEntryNode = require( 'BUILD_AN_ATOM/game/view/NumberEntryNode' );
  var ProblemView = require( 'BUILD_AN_ATOM/game/view/ProblemView' );
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var whatIsTheMassNumberString = require( 'string!BUILD_AN_ATOM/whatIsTheMassNumber' );

  /**
   *
   * @param {SchematicToMassNumberProblem} schematicToMassNumberProblem
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   * @constructor
   */
  function SchematicToMassNumberProblemView( schematicToMassNumberProblem, layoutBounds, tandem ) {

    this.massNumberAnswerProperty = new Property( 0, { tandem: tandem.createTandem( 'massNumberAnswerProperty' ) } ); // Must be defined before call to super constructor.
    ProblemView.call( this, schematicToMassNumberProblem, layoutBounds, tandem ); // Call super constructor.
    var self = this;

    // Create the model-view transform used by the schematic atom.
    var modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( layoutBounds.width * 0.275, layoutBounds.height * 0.5 ),
      0.8 );

    // Add the schematic representation of the atom.
    var nonInteractiveSchematicAtomNode = new NonInteractiveSchematicAtomNode( schematicToMassNumberProblem.answerAtom,
      modelViewTransform,
      tandem.createTandem( 'noninteractiveSchematicAtomNode' ) );

    self.problemPresentationNode.addChild( nonInteractiveSchematicAtomNode );

    // Question
    var questionPrompt = new MultiLineText( whatIsTheMassNumberString, {
      align: 'left',
      font: new PhetFont( 24 ),
      maxWidth: 200
    } );
    self.interactiveAnswerNode.addChild( questionPrompt );

    // Node for entering the answer
    var massEntryNode = new NumberEntryNode(
      self.massNumberAnswerProperty,
      tandem.createTandem( 'massEntryNode' ), {
        minValue: 0,
        maxValue: 99
      } );
    self.interactiveAnswerNode.addChild( massEntryNode );

    // Layout
    questionPrompt.centerX = layoutBounds.width * 0.65;
    questionPrompt.centerY = layoutBounds.height * 0.5;
    massEntryNode.left = questionPrompt.right + 10;
    massEntryNode.centerY = questionPrompt.centerY;

    this.disposeSchematicToMassNumberProblemView = function() {
      nonInteractiveSchematicAtomNode.dispose();
    };
  }

  buildAnAtom.register( 'SchematicToMassNumberProblemView', SchematicToMassNumberProblemView );

  // Inherit from ProblemView.
  return inherit( ProblemView, SchematicToMassNumberProblemView, {

    // @public
    checkAnswer: function() {
      var userSubmittedAnswer = new NumberAtom( {
        protonCount: this.problem.answerAtom.protonCountProperty.get(),
        neutronCount: this.massNumberAnswerProperty.value - this.problem.answerAtom.protonCountProperty.get(),
        electronCount: this.problem.answerAtom.electronCountProperty.get()
      } );
      this.problem.checkAnswer( userSubmittedAnswer );
    },

    // @public
    displayCorrectAnswer: function() {
      this.massNumberAnswerProperty.value = this.problem.answerAtom.massNumberProperty.get();
    },

    // @public
    dispose: function() {
      this.disposeSchematicToMassNumberProblemView();
    }
  } );
} );
