// PLUGIN: Mediafragment

(function ( Popcorn ) {

  /**
   * Mediafragment popcorn plug-in
   * Adds (limited) support for mediafragment requests 
   * to a popcorn video.  
   * @param {Object} options
   *
  **/
    Popcorn.plugin( "mediafragment" , {

      manifest: {
        about: {
          name: "Popcorn mediafragment plugin",
          version: "0.1",
          author: "Karim Hamidou",
          website: "http://neyret.fr/~karim"
        },
        options: {
        }
      },
      
    _setup: function( options ) {
        var advanceTime = function() {
              var url = window.location.href;
              
              if ( url.split("#")[1] != null ) {
                  pageoffset = url.split( "#" )[1];							
                  
                  if ( pageoffset.substring( 2 ) != null ) {
                    var offsettime = pageoffset.substring( 2 );						
                    this.currentTime(parseFloat(offsettime));
                  }							
              }
        }
        
        
        this.listen( 'loadedmetadata', advanceTime );        
        this.listen("pause", function(data) {            
            splitArr = window.location.href.split("#")			
            history.replaceState({}, "", splitArr[0] + "#t=" + this.currentTime().toFixed(2));
        });
        
    },

    _teardown: function( options ) {
      // FIXME: anything to implement here ?
    }
  });
})( Popcorn );
