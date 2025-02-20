function moveTime(obj,json,M,t,callback){
        var s0={};
        var s1={};
        var t0,t1;
        var sx;
        for(var attr in json){
            s0[attr]=attr=="opacity"?parseInt(getCss(obj,attr)*100):parseInt(getCss(obj,attr));
            s1[attr]=attr=="opacity"?json[attr]*100:json[attr];
        }
        switch(typeof M){
            case "undefined": M="linear";t=400; break;
            case "number":{
                switch(typeof t){
                    case "undefined":t=M;M="linear";break;
                    case "string":var bridge=M;M=t;t=bridge;break;
                    case "function":{
                        switch(typeof callback){
                            case "undefined":callback=t;t=M;M="linear";break;
                            case "string":var i=M;var a=t;M=callback;callback=a;t=i;break;
                        }
                    }break;
                }
            }
            break;
            case "function":{
                switch(typeof t){
                    case "undefined":callback=M;M="linear";t=400;break;
                    case "number":{
                        switch(typeof callback){
                            case "undefined":callback=M;M="linear";break;
                            case "string":var i=M;M=callback;callback=i;break;
                        }
                    }break;
                    case "string":
                        switch(typeof callback){
                            case "undefined":callback=M;M=t;t=400;break;
                            case "number":var i=M;var a=t;t=callback;M=a;callback=i;break;
                        }break;
                }
            }break;
            case "string":{
                switch(typeof t){
                    case "undefined":t=400;break;
                    case "function":{
                        switch(typeof callback){
                            case "undefined":callback=t;t=400;break;
                            case "number":var a=t;t=callback;callback=a;break;
                        }
                    }break;
                }
            }break;
            // default:break;
        }

        t0=new Date();
        var id=setInterval(function(){
            t1=new Date();
            if(t1-t0<t){

                for( var attr in json){
                    if(attr=="opacity"){
                        obj.style["filter"]="alpha(opacity="+Tween[M](t1-t0,s0[attr],s1[attr]-s0[attr],t)+")";
                        obj.style["opacity"]=Tween[M](t1-t0,s0[attr],s1[attr]-s0[attr],t)/100;
                    }else{
                        obj.style[attr]=Tween[M](t1-t0,s0[attr],s1[attr]-s0[attr],t)+"px";
                    }
                }

            }else{
                clearInterval(id);
                 for(var attr in json){
                    if(attr!="opacity"){
                        obj.style[attr]=s1[attr]+"px";
                    }else{
                        obj.style.opacity=s1[attr]/100;
                        obj.style.filter="alpha(opacity="+s1[attr]+")";
                    }
                }
                callback&&callback.call(obj);
            }
        },13);
    }

        function getCss(obj,attr){//获取obj对象的attr当前样式值
        return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,null)[attr];
    }
    //T 是指当前时间   可变的
//B 是起始位置  固定的
//C  变化量   固定值 -b   结束-开始    一共需要移动的距离
//d  运动持续的时间  固定

var Tween = {
                        linear: function (t, b, c, d){  //匀速
                            return c*t/d + b;   //  t/d = prop;
                        },
                        easeIn: function(t, b, c, d){  //加速曲线
                            return c*(t/=d)*t + b;
                        },
                        easeOut: function(t, b, c, d){  //减速曲线
                            return -c *(t/=d)*(t-2) + b;
                        },
                        easeBoth: function(t, b, c, d){  //加速减速曲线
                            if ((t/=d/2) < 1) {
                                return c/2*t*t + b;
                            }
                            return -c/2 * ((--t)*(t-2) - 1) + b;
                        },
                        easeInStrong: function(t, b, c, d){  //加加速曲线
                            return c*(t/=d)*t*t*t + b;
                        },
                        easeOutStrong: function(t, b, c, d){  //减减速曲线
                            return -c * ((t=t/d-1)*t*t*t - 1) + b;
                        },
                        easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
                            if ((t/=d/2) < 1) {
                                return c/2*t*t*t*t + b;
                            }
                            return -c/2 * ((t-=2)*t*t*t - 2) + b;
                        },
                        elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
                            if (t === 0) {
                                return b;
                            }
                            if ( (t /= d) === 1 ) {
                                return b+c;
                            }
                            if (!p) {
                                p=d*0.3;
                            }
                            if (!a || a < Math.abs(c)) {
                                a = c;
                                var s = p/4;
                            } else {
                                var s = p/(2*Math.PI) * Math.asin (c/a);
                            }
                            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                        },
                        elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
                            if (t === 0) {
                                return b;
                            }
                            if ( (t /= d) === 1 ) {
                                return b+c;
                            }
                            if (!p) {
                                p=d*0.3;
                            }
                            if (!a || a < Math.abs(c)) {
                                a = c;
                                var s = p / 4;
                            } else {
                                var s = p/(2*Math.PI) * Math.asin (c/a);
                            }
                            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
                        },
                        elasticBoth: function(t, b, c, d, a, p){
                            if (t === 0) {
                                return b;
                            }
                            if ( (t /= d/2) === 2 ) {
                                return b+c;
                            }
                            if (!p) {
                                p = d*(0.3*1.5);
                            }
                            if ( !a || a < Math.abs(c) ) {
                                a = c;
                                var s = p/4;
                            }
                            else {
                                var s = p/(2*Math.PI) * Math.asin (c/a);
                            }
                            if (t < 1) {
                                return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                                    Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
                            }
                            return a*Math.pow(2,-10*(t-=1)) *
                                Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
                        },
                        backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
                            if (typeof s === 'undefined') {
                                s = 1.70158;
                            }
                            return c*(t/=d)*t*((s+1)*t - s) + b;
                        },
                        backOut: function(t, b, c, d, s){
                            if (typeof s === 'undefined') {
                                s = 3.70158;  //回缩的距离
                            }
                            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
                        },
                        backBoth: function(t, b, c, d, s){
                            if (typeof s === 'undefined') {
                                s = 1.70158;
                            }
                            if ((t /= d/2 ) < 1) {
                                return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
                            }
                            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
                        },
                        bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
                            return c - Tween['bounceOut'](d-t, 0, c, d) + b;
                        },
                        bounceOut: function(t, b, c, d){
                            if ((t/=d) < (1/2.75)) {
                                return c*(7.5625*t*t) + b;
                            } else if (t < (2/2.75)) {
                                return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
                            } else if (t < (2.5/2.75)) {
                                return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
                            }
                            return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
                        },
                        bounceBoth: function(t, b, c, d){
                            if (t < d/2) {
                                return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
                            }
                            return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
                        }
                    }