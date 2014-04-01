$(function () {
  var $win = $(window), centerRange = 50, textMoveRange = 300, textNegativePosition = 386, sectionHalf = 250, section2Top = 500, section2Center = 750, $section2Text = $('.section-2__text'), section2TextWidth = 193, section3Top = 1000, section3Center = 1250, $section3Text = $('.section-3__text'), section3TextWidth = 193,

  textMoveStart = function () {
    return section2Center - (centerRange + textMoveRange);
  }
  textMoveEnd = function () {
    return section2Center - centerRange;
  }
  isSectionCenter = function (winVerticalCenter){
    return section2Center - centerRange <= winVerticalCenter && winVerticalCenter <= section2Center + centerRange;
  }

  text3MoveStart = function () {
    return section3Center - (centerRange + textMoveRange );
  }
  text3MoveEnd = function () {
    return section3Center - centerRange;
  }
  isSection3Center = function (winVerticalCenter) {
    return section3Center - centerRange <= winVerticalCenter && winVerticalCenter <= section3Center + centerRange;
  };

  var timer_id = null;
  var isAutoScrolling = false;

  $win.on('scroll', function (e) {
    var position = $win.scrollTop();

    $win.trigger('scrolling', position);

    if( !isAutoScrolling ){
      if( timer_id != null ){
        clearTimeout(timer_id);
      }

      timer_id = setTimeout(function () {
        $win.trigger('endscroll', position);
      }, 500);
    }
  })

  $win.on('scrolling', function (e, position) {
    // sampleTextを動かす処理
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
  });

  $win.on('endscroll', function (e, position) {
    // スクロール後の処理
    var top = 0;

    if( section2Top-sectionHalf < position && position < section2Center ){
      top = section2Top;
    } else if( section2Center < position && position < section3Center ){
      top = section3Top;
    }

    if (top != 0) {
      isAutoScrolling = true;
      $('html, body').animate({scrollTop: top},{complete: function (){
        isAutoScrolling = false;
      }});
    }
  })
})
