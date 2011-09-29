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
            moveToFront: function() {
                //Find the "topmost" entity and swap its actual z index with
                //the calling entity's current z index.
                last = ig.game.entities.length - 1;
                ig.game.swapzIndex(this, ig.game.entities[last]);
            }
        });

        ig.Zmagic.instance = this;
    }

});

});



