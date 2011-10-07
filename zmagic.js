ig.module( 
	'plugins.zmagic.zmagic' 
)
.requires(
	'impact.impact'
)
.defines(function(){

ig.Zmagic = ig.Class.extend({

    instance: null,

    staticInstantiate: function( ignore ) {
        if( ig.Zmagic.instance == null ) {
            return null;
        }
        else {
            throw("Error: ig.Zmagic has already been instantiated. It can only be instantiated once.");
            return ig.Zmagic.instance;
        }
    },

    init: function() {
        //Inject a new function into ig.Game which allows entities to swap
        //their indexes (actual place number within the ig.game.entities array
        //as opposed to the zIndex value - which may be different), 
        //so as to draw one entity "in front" of another.
        ig.Game.inject({
            swapzIndex: function( entityA, entityB ) {
                x = this.entities.indexOf(entityA);
                y = this.entities.indexOf(entityB);
                this.entities[y] = entityA;
                this.entities[x] = entityB;
            }
        });

        ig.Entity.inject({
                //Move calling Entity to the front
                //slightly modified from branch of quidmonkey
	            	moveToFront: function() {
	            		var ents = ig.game.entities;
	                	ents.splice( ents.indexOf( this ), 1 );
	                	ents.push( this );
	            	}
 
        });

        ig.Zmagic.instance = this;
    }

});

});



