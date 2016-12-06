/**
 * Created by Administrator on 2016/10/25.
 */
require.config({
    baseUrl:'js',
    paths:{
        jquery:'lib/jquery-1.11.2.min',/*jquery lib*/
        TouchSlide:'lib/jquery/TouchSlide.1.1.source',
        SuperSlide:'lib/jquery/jquery.SuperSlide.2.1.1',
        eraser:'lib/jquery/jquery.eraser',
        navLeft:'lib/jquery/jquery.nav',
        common:'common',
        animation:'lib/animation/animation',
    },
    map : {
        '*':{
            css:'lib/require-css/css',
        }
    },
    shim:{
        jquery:{
			exports:'jQuery'
        },
        SuperSlide:['jquery'],
        TouchSlide:['jquery'],
        common:['jquery'],
        eraser:['jquery'],
        navLeft:['jquery'],
        animation:{ deps:['jquery','css!../css/animation.css']},
    }
})
require(['TouchSlide','common','animation'],function () {
    console.log($);
    // console.log(WOW.prototype);
	exports.$ = function(){
		return $;
	};
    //SuperSlide usage
    //jQuery(".doctor").slide({mainCell: ".bd ul",titCell: ".bd ul", prevCell: ".prev", nextCell: ".next", autoPage: false, effect: "left", autoPlay: true, vis: 1 });

    //animation WOW class="WOW bounce~ animatied"

    //TouchSlide usage
    //TouchSlide({slideCell: "#box6", mainCell: ".bd",prevCell: ".pre",nextCell: ".next", interTime: 5000, autoPage: false, effect: "left", autoPlay: true, vis: 1 });
})