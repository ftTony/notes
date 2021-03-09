/**
 * Created by tony on 16/5/28.
 */
'use strict';

var DEFAULT_INTERVAL=1000/60;
//初始化状态
var STATE_INITIAL=0;
//停止状态
var STATE_START=1;
//停止状态
var STATE_STOP=2;

var requestAnimationFrame=(function(){
   return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function(callback){
          return window.setTimeout(callback,callback.interval || DEFAULT_INTERVAL);
       }
})();

var cancelAnimationFrame=(function(){
   return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || function(id){
          return window.clearTimeout(id);
       }
})();

/**
 * Timeline 时间轴类
 * @constructor
 */
function Timeline(){
    this.animationHandler=0;
    this.state=STATE_INITIAL;
}

/**
 * 时间轴上每一次回调执行的函数
 * @param time   从动画开始到当前执行的时间
 */
Timeline.prototype.onenterframe=function(time){

};

/**
 * 动画开始
 * @param interval  每一次回调的间隔时间
 */
Timeline.prototype.start=function(interval){
    if(this.state===STATE_START){
        return;
    }
    this.state=STATE_START;

    this.interval=interval || DEFAULT_INTERVAL;
    startTimeLine(this,+new Date());
};

/**
 * 动画停止
 */
Timeline.prototype.stop=function(){
    if(this.state!==STATE_START){
        return;
    }
    this.state=STATE_STOP;

    //如果动画开始过,则记录动画从开始到现在所经历的时间
    if(this.startTime){
        this.dur=+new Date()-this.startTime;
    }
    cancelAnimationFrame(this.animationHandler);
};

/**
 * 重新开始动画
 */
Timeline.prototype.restart=function(){
    if(this.state===STATE_START){
        return;
    }
    if(!this.dur || !this.interval){
        return;
    }
    this.state=STATE_START;

    startTimeLine(this,+new Date()-this.dur);
};

/**
 * 时间轴动画启动函数
 * @param timeline  时间轴的实例
 * @param startTime  动画开始时间
 */
function startTimeLine(timeline,startTime){

    timeline.startTime=startTime;
    nextTick.interval=timeline.interval;

    //记录上一次回调的时间
    var lastTick=+new Date();
    nextTick();
    /**
     * 每一帧执行的函数
     */
    function nextTick(){
        var now =+new Date();

        timeline.animationHandler=requestAnimationFrame(nextTick);
        //如果当前时间与上一次回调时间戳大于设置的时间间隔,表示这一次可以执行回调函数
        if(now-lastTick>timeline.interval){
            timeline.onenterframe(now-startTime);
            lastTick=now;
        }
    }
}

module.exports=Timeline;