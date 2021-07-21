// Copyright 2021, University of Colorado Boulder

/**
 * Scenery node that represents an atomic symbol, meaning that it shows the
 * symbol text, the proton count, atomic number, charge, and isotope naming notation.
 *
 * @author Luisa Vargas
 */

import Property from '../../../../axon/js/Property.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import AtomIdentifier from '../../../../shred/js/AtomIdentifier.js';
import buildAnAtom from '../../buildAnAtom.js';
import SymbolNode from './SymbolNode.js';

class NucleusSymbolNode extends SymbolNode {

  /**
   * @param {NumberAtom} numberAtom
   * @param {Tandem} tandem
   */
  constructor( numberAtom, tandem, options ) {

    options = merge( {
      boundingBoxWidth: 245,
      boundingBoxHeight: 290,
      symbolFontSize: 120
    }, options );

    super( numberAtom, tandem, options );

    // Add the isotope naming notation
    const isotopeTextAndNumber = new Text( '', {
      font: new PhetFont( 57 ),
      fill: 'black',
      center: new Vector2( 220, this.boundingBoxHeight + 35 ),
      tandem: tandem.createTandem( 'isotopeTextAndNumber' )
    } );
    this.boundingBox.addChild( isotopeTextAndNumber );

    // update the isotope text and mass number whenever either of them change
    Property.multilink( [ numberAtom.protonCountProperty, numberAtom.massNumberProperty ],
      ( protonCount, massNumber ) => {
        const isotopeText = protonCount > 0 ? AtomIdentifier.getName( protonCount ) : '';
        isotopeTextAndNumber.text = massNumber > 0 ? `${isotopeText} - ${massNumber}` : isotopeText;

        isotopeTextAndNumber.centerX = this.boundingBoxWidth / 2;
        isotopeTextAndNumber.top = this.boundingBoxHeight + 35;
      } );

    this.mutate( options );
  }
}

buildAnAtom.register( 'NucleusSymbolNode', NucleusSymbolNode );

export default NucleusSymbolNode;