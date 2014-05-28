function Play(){};

Play.prototype.setUp = function(){
  var previousId = null;
  $.getJSON('/shots.json', function(data){
    previousId = data[data.length-1]['id'];
  });
  var me = this;
  setInterval(function(){
    $.getJSON('/shots.json', function(data){
      mostRecentDirection = data[data.length-1];
      if(previousId !=  mostRecentDirection['id']){
        direction = mostRecentDirection['direction'];
        previousId = mostRecentDirection['id'];
        me.switchVideo(direction);
      }
    });
  }, 500);
};

Play.prototype.switchVideo = function(direction){
  var options = ['hit', 'miss']
  hitOrMiss = options[Math.floor((Math.random() * 2))];
  var elementId = direction+'_'+hitOrMiss;
  var directionVideo = document.getElementById(elementId);
  var waitingVideo = document.getElementById('wait');
  directionVideo.style.display = 'block';
  directionVideo.play();
  setTimeout(function(){
    directionVideo.style.display = 'none';
  }, 3000);

};
