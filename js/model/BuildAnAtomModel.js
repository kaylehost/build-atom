// Copyright 2002-2013, University of Colorado

/**
 * Main model class for the first tab of the Build an Atom simulation.
 */
define( function ( require ) {

  var SharedConstants = require( 'common/SharedConstants' );
  var Utils = require( 'common/Utils' );
  var Atom = require( 'model/Atom' );
  var Particle = require( 'model/Particle' );
  var SphereBucket = require( 'PHETCOMMON/model/SphereBucket' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Vector2 = require( 'DOT/Vector2' );

  var NUM_PROTONS = 10;
  var NUM_NEUTRONS = 13;
  var NUM_ELECTRONS = 10;
  var NUCLEON_CAPTURE_RADIUS = 100;
  var ELECTRON_CAPTURE_RADIUS = Atom.OUTER_ELECTRON_SHELL_RADIUS * 1.1;
  var BUCKET_WIDTH = 150;
  var BUCKET_HEIGHT = BUCKET_WIDTH * 0.6;
  var BUCKET_Y_OFFSET = -300;

  var placeNucleon = function ( particle, bucket, atom ) {
    if ( particle.position.distance( Vector2.ZERO ) < NUCLEON_CAPTURE_RADIUS ) {
      atom.addParticle( particle );
    }
    else {
      bucket.addParticleNearestOpen( particle );
    }
  }

  /**
   * Constructor for main model object.
   *
   * @constructor
   */
  function BuildAnAtomModel() {

    this.atom = new Atom( 0, 0 );

    // Create the buckets that will hold the sub-atomic particles.
    this.buckets = {
      protonBucket: new SphereBucket(
          {
            x: -BUCKET_WIDTH * 1.5,
            y: BUCKET_Y_OFFSET,
            size: new Dimension2( BUCKET_WIDTH, BUCKET_HEIGHT ),
            particleRadius: SharedConstants.NUCLEON_RADIUS,
            baseColor: 'red',
            caption: 'Protons',
            captionColor: 'white'
          }
      ),
      neutronBucket: new SphereBucket(
          {
            x: 0,
            y: BUCKET_Y_OFFSET,
            size: new Dimension2( BUCKET_WIDTH, BUCKET_HEIGHT ),
            particleRadius: SharedConstants.NUCLEON_RADIUS,
            baseColor: '#e0e0e0',
            caption: 'Neutrons',
            captionColor: 'white'
          }
      ),
      electronBucket: new SphereBucket(
          {
            x: BUCKET_WIDTH * 1.5,
            y: BUCKET_Y_OFFSET,
            size: new Dimension2( BUCKET_WIDTH, BUCKET_HEIGHT ),
            particleRadius: SharedConstants.ELECTRON_RADIUS,
            baseColor: 'blue',
            caption: 'Electrons',
            captionColor: 'white'
          }
      )
    };

    // Add the subatomic particles to the model.
    this.nucleons = [];
    this.electrons = [];
    var model = this;

    // Add the protons.
    _.times( NUM_PROTONS, function () {
      var proton = Particle.createProton();
      model.nucleons.push( proton );
      model.buckets.protonBucket.addParticleFirstOpen( proton );
      proton.link( 'userControlled', function ( userControlled ) {
        if ( !userControlled && !model.buckets.protonBucket.containsParticle( proton )) {
          placeNucleon( proton, model.buckets.protonBucket, model.atom );
        }
      } );
    } );

    // Add the neutrons.
    _.times( NUM_NEUTRONS, function () {
      var neutron = Particle.createNeutron();
      model.nucleons.push( neutron );
      model.buckets.neutronBucket.addParticleFirstOpen( neutron );
      neutron.link( 'userControlled', function ( userControlled ) {
        if ( !userControlled && !model.buckets.neutronBucket.containsParticle( neutron )) {
          placeNucleon( neutron, model.buckets.neutronBucket, model.atom );
        }
      } );
    } );

    // Add the electrons.
    _.times( NUM_ELECTRONS, function () {
      var electron = Particle.createElectron();
      model.electrons.push( electron );
      model.buckets.electronBucket.addParticleFirstOpen( electron );
    } );
  }

  return BuildAnAtomModel;
} );
