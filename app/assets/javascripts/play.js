function Play(){
  this.gameScore = {'me': 0, 'iggy': 0};
};

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

        var options = ['hit', 'miss'];
        hitOrMiss = options[Math.floor((Math.random() * 2))];
        var elementId = direction+'_'+hitOrMiss;
        me.switchVideo(elementId);
        me.updateScore(hitOrMiss, me);
      }
    });
  }, 500);
};

Play.prototype.switchVideo = function(elementId){
  var directionVideo = document.getElementById(elementId);
  var waitingVideo = document.getElementById('wait');
  directionVideo.style.display = 'block';
  directionVideo.play();
  setTimeout(function(){
    directionVideo.style.display = 'none';
  }, 3000);
};

Play.prototype.updateScore = function(hitOrMiss, me){
  if(hitOrMiss == 'hit'){
    this.gameScore = {me:me.gameScore['me'], iggy:me.gameScore['iggy']+=1};
    document.getElementById('iscore').innerHTML = me.getScore('iggy', me);
  }
  if(hitOrMiss == 'miss'){
    me.gameScore = {me:me.gameScore['me']+=1, iggy:me.gameScore['iggy']};
    document.getElementById('cscore').innerHTML = me.getScore('me', me);
  }
}

Play.prototype.getScore = function(player, me){
  var scores = [0, 15, 30, 40, "Winner"]

  var iggy = me.gameScore['iggy'];
  var challenger = me.gameScore['me'];

  var thisPlayer = me.gameScore[player];
  var otherPlayer;
  if(player == 'iggy'){
    otherPlayer = me.gameScore['me'];
  }else{
    otherPlayer = me.gameScore['iggy'];
  }


  if((challenger > 2) && (iggy > 2)){
  // if both players are over 2

    if(thisPlayer == otherPlayer+1){
    // if this player is 1 greater than other player
      return 'Advantage';
    }
    if((thisPlayer - otherPlayer) > 1){
    // if this player > 1 greater than the other player
      return 'Winner';
    }
    if(thisPlayer == otherPlayer){
    // if both players are the same
      return 40;
    }
  }else{
    return scores[me.gameScore[player]];
  }

}
