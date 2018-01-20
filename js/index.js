$(function(){
    var $cube = $('#cube');
    var $cubeBox = $('#cubeBox');
    var cube = (function(){
        var $li = $cubeBox.find('li');
        var downX = 0;
        var downY = 0;
        var startX = -30;
        var startY = 3;
        var step = 1/2;
        var x = 0;
        var y = 0;
        var bBtn = true;
        var $cubeShare = $('#cubeShare');
        var $shareMark = $('#shareMark');
        // transform: scale(1) rotateX(-45deg) rotateY(-180deg);
        function init(){
            $cubeBox.css('transform','scale(0.5) rotateX('+startX+'deg) rotateY('+startY+'deg)');
			$cubeBox.css('transition','1s');
			$cubeBox.on('transitionEnd webkitTransitionEnd',function(){
				$cubeBox.css('transition','');
			});
			bind();
        }
        
        function bind(){
        	$(document).on('touchstart',function(ev){
        		var touchEv = ev.originalEvent.changedTouches[0];
        		downX = touchEv.pageX;
        		downY = touchEv.pageY;
        		bBtn = true;
        		$(document).on('touchmove.move',function(ev){
        			bBtn = false;
        			var touchEv = ev.originalEvent.changedTouches[0];
        			x = (downY - touchEv.pageY)*step;
        			y = (touchEv.pageX - downX)*step;
        			
        			if( startX+x > 70 ){
						x = -startX + 70;
					}else if( startX+x < -70 ){
						x = -startX - 70;
					}
            		$cubeBox.css('transform','scale(0.5) rotateX('+( startX + x)+'deg) rotateY('+(startY + y)+'deg)');
        			
        		})
        		$(document).on('touchend.move',function(){
        			$(document).off('.move');
        			
        		})
        	})
        	
        	$li.on('touchend',function(){
        		if(bBtn){
        			console.log($(this).index());
        		}else{
        			startX += x;
        			startY += y;
        		}
        	})
        	
        	$cubeShare.on('touchstart',function(){
        		$shareMark.show();
        	})
        	$shareMark.on('touchstart',function(){
        		$shareMark.hide();
        	})
        }
        
        return {
            init:init
        }
    })();
	setTimeout(function(){
		cube.init();
	},10)
    
})