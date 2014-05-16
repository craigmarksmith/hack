window.onload = function(){
  var previousId = null;
  setInterval(function(){
    $.getJSON('/shots.json', function(data){
      mostRecentDirection = data[data.length-1];
      if(previousId !=  mostRecentDirection['id']){
        direction = mostRecentDirection['direction'];
        previousId = mostRecentDirection['id'];
        console.log(direction);
      }
    });
  }, 500);
}
