var jwplayerObjects = {};

Popcorn.player( "jwplayer", {
  _setup: function( options ) {

    var media = this,
        player = {},
        container = document.createElement( "div" ),
        currentTime = 0,
        seekTime = 0,
        seeking = false,
        dataLoaded = false;
    container.id = media.id + Popcorn.guid();

    media.appendChild( container );

  var initApi = function () {
    jwplayer( container.id ).onTime(function() {
        currentTime = jwplayer(container.id).getPosition();
        media.dispatchEvent( "timeupdate" );
       // timeout = setTimeout( timeupdate, 10 );
    });

    media.play = function() {
      media.paused = false;
      media.dispatchEvent( "play" );
      if ( dataLoaded ) {
        media.dispatchEvent( "loadeddata" );
        dataLoaded = false;
      }

      media.dispatchEvent( "playing" );
      jwplayer( container.id ).play();
    };

    media.pause = function() {

      if ( !media.paused ) {
        media.paused = true;
        media.dispatchEvent( "pause" );
        jwplayer( container.id ).pause();
      }
    };

    media.__defineSetter__( "currentTime", function( val ) {
      // make sure val is a number
      currentTime = seekTime = +val;
      seeking = true;
      media.dispatchEvent( "seeked" );
      media.dispatchEvent( "timeupdate" );
      jwplayer( container.id ).seek( currentTime );
      return currentTime;
    });

    media.__defineGetter__( "currentTime", function() {
      return jwplayer( container.id ).getPosition();
    });

    media.__defineSetter__( "muted", function( val ) {

      if ( jwplayer( container.id ).getMute() !== val ) {
        if ( val ) {
          jwplayer( container.id ).setMute(true);
        }

        media.dispatchEvent( "volumechange" );
      }

    return jwplayer( container.id ).getMute();
    });

    media.__defineGetter__( "muted", function() {
        return jwplayer( container.id ).getMute();
    });


    media.__defineSetter__( "volume", function( val ) {

        if ( jwplayer( container.id ).getVolume() !== val *100 ) {
        jwplayer( container.id ).setVolume( val * 100);
        media.dispatchEvent( "volumechange" );
        }

        return (jwplayer( container.id ).getVolume()) / 100;
    });

    media.__defineGetter__( "volume", function() {
      return jwplayer( container.id ).percentage / 100;
    });

    media.readyState = 4;
    media.dispatchEvent( 'load' );
    dataLoaded = true;

    media.duration = options.duration;
    media.dispatchEvent( 'durationchange' );


    media.paused && media.dispatchEvent( 'loadeddata' );


    };

    jwplayer( container.id ).setup({
      file: options.file,
      height: 270,
      width: 480,
      flashplayer: options.flashplayer,
      events: {
        onReady: initApi
      }});

  }
});

