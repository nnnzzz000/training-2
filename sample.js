$(function() {
  var $win = $(window);
  var centerRange = 50;
  var textMoveRange = 300;
  var textNegativePosition = 386;

  var section2Center = 750;
  var $section2Text = $('.section-2__text');
  var section2TextWidth = 193;

  var section3Center = 1250;
  var $section3Text = $('.section-3__text');
  var section3TextWidth = 193;

  var textMoveStart = function(){
    return section2Center - ( centerRange + textMoveRange);
  };
  var textMoveEnd = function(){
    return section2Center - centerRange;
  };

  var isSectionCenter = function(winVerticalCenter){
    return section2Center - centerRange <= winVerticalCenter && winVerticalCenter <= section2Center + centerRange;
  }

  var text3MoveStart = function(){
    return section3Center - ( centerRange + textMoveRange );
  }
  var text3MoveEnd = function(){
    return section3Center - centerRange;
  }
  var isSection3Center = function(winVerticalCenter){
    return section3Center - centerRange <= winVerticalCenter && winVerticalCenter <= section3Center + centerRange;
  }

  $win.on('scroll', function(e) {
    var position = $win.scrollTop();
    var winHeight = $win.height();
    var winWidth = $win.width();
    var winVerticalCenter = Math.floor(winHeight / 2 + position);
    var winHorizontalCenter = Math.floor(winWidth / 2);
    var section2TextLeftPosition = winHorizontalCenter - section2TextWidth;

    if( textMoveStart() < winVerticalCenter && winVerticalCenter < textMoveEnd() ){
      var movePer = (winVerticalCenter - textMoveStart()) / textMoveRange;
      var leftPosition = Math.floor((section2TextLeftPosition + textNegativePosition) * movePer) - textNegativePosition;
      $section2Text.css('left', leftPosition);
    }

    if( isSectionCenter(winVerticalCenter) ){
      $section2Text.css('left', section2TextLeftPosition);
    }


    var text3movePer = (winVerticalCenter - text3MoveStart()) / textMoveRange;
    var section3TextLeftPosition = winHorizontalCenter - section3TextWidth;

    if( text3MoveStart() < winVerticalCenter && winVerticalCenter < text3MoveEnd() ){
      var text3leftPosition = Math.floor((section3TextLeftPosition + textNegativePosition) * text3movePer) - textNegativePosition;
      $section3Text.css('left', text3leftPosition);
    }

    if( isSection3Center(winVerticalCenter) ){
      $section3Text.css('left', section3TextLeftPosition);
    }
  })
})
