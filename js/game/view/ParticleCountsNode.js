// Copyright 2013-2021, University of Colorado Boulder

/**
 * Node that takes a number atom and displays a set of counts for the various
 * subatomic particles.  This is generally used when presenting a 'challenge'
 * for the game.
 *
 * @author John Blanco
 */

import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node } from '../../../../scenery/js/imports.js';
import { Text } from '../../../../scenery/js/imports.js';
import buildAnAtom from '../../buildAnAtom.js';
import buildAnAtomStrings from '../../buildAnAtomStrings.js';

const electronsColonPatternString = buildAnAtomStrings.electronsColonPattern;
const neutronsColonPatternString = buildAnAtomStrings.neutronsColonPattern;
const protonsColonPatternString = buildAnAtomStrings.protonsColonPattern;

// constants
const MAX_WIDTH = 280;

class ParticleCountsNode extends Node {

  /**
   * @param {NumberAtom} numberAtom
   * @param {Object} [options]
   */
  constructor( numberAtom, options ) {

    super( options );

    options = merge( { font: new PhetFont( 24 ) }, options );

    const protonCountTitle = new Text( StringUtils.format( protonsColonPatternString, numberAtom.protonCountProperty.get() ), {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    this.addChild( protonCountTitle );
    const neutronCountTitle = new Text( StringUtils.format( neutronsColonPatternString, numberAtom.neutronCountProperty.get() ), {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    this.addChild( neutronCountTitle );
    const electronCountTitle = new Text( StringUtils.format( electronsColonPatternString, numberAtom.electronCountProperty.get() ), {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    this.addChild( electronCountTitle );

    // Layout - Line labels up on left edge, numbers on right edge.
    const interLineSpacing = protonCountTitle.height * 0.9; // Multiplier empirically determined.
    protonCountTitle.left = 0;
    protonCountTitle.top = 0;
    neutronCountTitle.left = 0;
    neutronCountTitle.top = protonCountTitle.bottom + interLineSpacing;
    electronCountTitle.left = 0;
    electronCountTitle.top = neutronCountTitle.bottom + interLineSpacing;
  }
}

buildAnAtom.register( 'ParticleCountsNode', ParticleCountsNode );

export default ParticleCountsNode;