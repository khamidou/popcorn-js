test( "popcorndoc existence", function(){

  var popped = Popcorn( "#video" ).pause();

  var expects = 2,
    count = 0,

  plus = function() {
    if ( ++count === expects ) {
      start();
      Popcorn.destroy( popped );
    }
  };

  expect( expects );
  stop();

  ok( popped.popcorndoc, "popcorndoc exists:" );
  plus();
  equals( typeof popped.popcorndoc, "function" , "Popcorn.popcorndoc is a function" );
  plus();

});

test( "popcorndoc functional tests", function() {

  var popped = Popcorn( "#video" );
  popped.pause().volume( 0 );

  var expects = 20,
    count = 0,

  plus = function() {
    if ( ++count === expects ) {
      Popcorn.destroy( popped );
      start();
    }
  };

  stop();

  popped.popcorndoc({
    start: 1,
    end: 2,
    lines: '1',
    target: 'gistdiv',
    gistUrl: 'https://gist.github.com/289467'
  })
  .popcorndoc({
    start: 1,
    end: 2,
    lines: '3-5',
    target: 'gistdiv',
    gistUrl: 'https://gist.github.com/289467'
  })
  .popcorndoc({
    start: 2,
    end: 3,
    lines: '2,6-8',
    target: 'gistdiv',
    gistUrl: 'https://gist.github.com/289467'
  })
  .popcorndoc({
    start: 3,
    end: 4,
    lines: '15-10',
    target: 'gistdiv',
    gistUrl: 'https://gist.github.com/289467'
  });

  var line,
      lines = [],
      i = 0;

  while( line = document.getElementById( "LC" + ( ++i ) ) ) {
    lines.push( line );
  }

  popped.exec( 1.5, function() {
    var line1 = document.getElementById( "LC1" ),
        line3 = document.getElementById( "LC3" ),
        line4 = document.getElementById( "LC4" ),
        line5 = document.getElementById( "LC5" );

    ok( line1.className.match( /popcorn-gist-highlighted/ ), "line 1 is highlighted" );
    plus();
    ok( line3.className.match( /popcorn-gist-highlighted/ ), "line 3 is highlighted" );
    plus();
    ok( line4.className.match( /popcorn-gist-highlighted/ ), "line 4 is highlighted" );
    plus();
    ok( line5.className.match( /popcorn-gist-highlighted/ ), "line 5 is highlighted" );
    plus();
  })
  .exec( 2.5, function() {
    var line2 = document.getElementById( "LC2" ),
        line6 = document.getElementById( "LC6" ),
        line7 = document.getElementById( "LC7" ),
        line8 = document.getElementById( "LC8" ),
        line1 = document.getElementById( "LC1" ),
        line3 = document.getElementById( "LC3" ),
        line4 = document.getElementById( "LC4" ),
        line5 = document.getElementById( "LC5" );

    ok( !line1.className.match( /popcorn-gist-highlighted/ ), "line 1 is not highlighted" );
    plus();
    ok( !line3.className.match( /popcorn-gist-highlighted/ ), "line 3 is not highlighted" );
    plus();
    ok( !line4.className.match( /popcorn-gist-highlighted/ ), "line 4 is not highlighted" );
    plus();
    ok( !line5.className.match( /popcorn-gist-highlighted/ ), "line 5 is not highlighted" );
    plus();

    ok( line2.className.match( /popcorn-gist-highlighted/ ), "line 2 is highlighted" );
    plus();
    ok( line6.className.match( /popcorn-gist-highlighted/ ), "line 6 is highlighted" );
    plus();
    ok( line7.className.match( /popcorn-gist-highlighted/ ), "line 7 is highlighted" );
    plus();
    ok( line8.className.match( /popcorn-gist-highlighted/ ), "line 8 is highlighted" );
    plus();
  })
  .exec( 3.5, function() {
    var line15 = document.getElementById( "LC15" ),
        line16 = document.getElementById( "LC16" ),
        line2 = document.getElementById( "LC2" ),
        line6 = document.getElementById( "LC6" ),
        line7 = document.getElementById( "LC7" ),
        line8 = document.getElementById( "LC8" );

    ok( !line2.className.match( /popcorn-gist-highlighted/ ), "line 2 is not highlighted" );
    plus();
    ok( !line6.className.match( /popcorn-gist-highlighted/ ), "line 6 is not highlighted" );
    plus();
    ok( !line7.className.match( /popcorn-gist-highlighted/ ), "line 7 is not highlighted" );
    plus();
    ok( !line8.className.match( /popcorn-gist-highlighted/ ), "line 8 is not highlighted" );
    plus();

    ok( line15.className.match( /popcorn-gist-highlighted/ ), "line 15 is highlighted, with bad range input" );
    plus();
    ok( line16.className.match( /popcorn-gist-highlighted/ ), "line 16 is highlighted as the fallback for an incorrect range" );
    plus();
    ok( !document.getElementById( "LC10" ).className.match( /popcorn-gist-highlighted/ ), "line 10 is NOT highlighted" );
    plus();
  })
  .exec( 4.5, function() {
    var highlighted = 0 ;
    for( var i = 0, len = lines.len; i < len; i++ ) {
      lines[ i ].className.match( /popcorn.gist.highlighted/ ) && highlighted++;
    }
    equals( highlighted, 0, "0 lines are highlighted" );
    plus();

  });

  popped.play();
});