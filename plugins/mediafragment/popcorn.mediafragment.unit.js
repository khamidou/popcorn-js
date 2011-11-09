test( "Popcorn Mediafragment Plugin", function() {

  var popped = Popcorn( "#video" ),
      expects = 4,
      count = 0;     

  expect( expects );

  function plus() {
    if ( ++count===expects ) {
      start();
    }
  }

  stop();

  ok( "mediafragment" in popped, "mediafragment is a method of the popped instance" );
  plus();

  var currstate = window.location.href.split("#t=");
  equals( currstate[1], undefined, "initially, there is no # in the url" );
  plus();

  popped.mediafragment({
    start: 0,   
  });

  popped.exec( 2, function() {
    popped.pause();
    popped.play();
    
    
  });

  popped.exec( 3, function() {
    var currstate = window.location.href.split("#t=");
    var time = + currstate[1];
    
    // popcorn's precision is limited to the second.
    ok(time >= 2 && time <= 3, "correct time is set" );
    plus();
    popped.play();
  
    popped.currentTime(5);
  });

  popped.exec( 6, function() {      
    var currstate = window.location.href.split("#t=");
    var time = + currstate[1];

    console.log(time);
    // popcorn's precision is limited to the second.
    ok(time >= 5 && time <= 6, "correct time is set after seeking" );
    plus();   
  
  });
  
  popped.exec( 10, function() {
    // clear the address bar
    window.location.href = window.location.href.split("#t=")[0];
  });
  
  popped.play();
});