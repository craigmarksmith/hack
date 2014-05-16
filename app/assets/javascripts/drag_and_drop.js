window.onload = function(){
  var obj = document.getElementById('westfield-logo');
  var positions = [];
  obj.addEventListener('touchmove', function(event) {
    event.preventDefault();
    var touch = event.targetTouches[0];
    // Place element where the finger is
    obj.style.left = (touch.pageX - 150) + 'px';
    obj.style.top = (touch.pageY - 150) + 'px';
    positions.push({'left':obj.style.left, 'top': obj.style.top});
  }, false);

  obj.addEventListener('touchend', function(event) {
    obj.style.webkitTransition = 'all 1s ease-out';
    var left = calculateLeft(positions.pop(), positions.pop());
    obj.style.left = left+"px";
    obj.style.top = '-2000px';
    $.post("/shots", {direction:calculateDirection(left)});
  }, false);

  obj.addEventListener('webkitTransitionEnd', function(event) {
    setTimeout(function(){
      obj.style.webkitTransition = '';
      obj.style.top = '1000px';
      obj.style.left = '350px';
    }, 3000);
  });

  function calculateDirection(positionLeft){
    if(positionLeft < -200) {
      return 'left';
    }
    if(positionLeft > 600) {
      return 'right';
    }
    return 'middle';
  }

  function calculateLeft(pointB, pointA){
    var firstUp = parseInt(pointA.top.replace("px", "")) - parseInt(pointB.top.replace("px", ""));
    var secondUp = 2000 + parseInt(pointB.top.replace("px", ""));

    var ratio = secondUp/firstUp;

    var firstAcross = parseInt(pointA.left.replace("px", "")) - parseInt(pointB.left.replace("px", ""));
    var secondAcross = ratio*firstAcross;

    var left = secondAcross - parseInt(pointB.left.replace("px", ""));
    return left-(left*2);
  }

};
