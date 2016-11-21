///<reference path="K.source.js" />
///<reference path="K.Gameboy.source.js" />

/*
    plane
*/
Ctrl.cache('Gameboy.AvoidPlane',function(){
    var P=K.object('Gameboy.AvoidPlane'),ctrl,gameboy,GK=Gameboy.GameKeys,position,Plane,map2,vars,soundMgr;
    /*
        位置
    */
    position={
        LEFT:1,
        CENTER:2,
        RIGHT:3,
        getRandomPos:function(){
            var r=Math.random();
            if(r<1/3)return this.LEFT;
            if(r<2/3)return this.CENTER;
            return this.RIGHT;
        }
    };
    /*
        变量声明
    */
    vars={
        /*
            默认生命
        */
        defaultLife:4,
        /*
            下一条命开始等待时间
        */
        nextLifeWiat4:200,
        /*
            通过一个加分
        */
        passOneScore:100,
        /*
            
        */
        passOneScore1:10,
        /*
            升级分数段
        */
        upLevelScore:500,
        /*
            当前游戏索引
        */
        gameIndex:0,
        /*
            障碍物概率
        */
        barrierPro:0.4
    }
    /*
        大地图 包括活动飞机
    */
    map2={
        /*
            已删掉的总数
        */
        delCount:0,
        /*
            刚刚飞机线地图中是否已生成了地图
        */
        genedPlane:false,
        /*
            
        */
        sideSpace:1,
        /*
            临时地图
        */
        tempMap:[],
        /*
            地图
        */
        maps:{
            empty:[[0,0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0,0]],
            list:[
                [[0,0,8,0,0,8,0,0,0,0,0],
                 [0,8,8,8,8,8,8,0,0,0,0],
                 [0,0,8,0,0,8,0,0,0,0,0],
                 [0,8,8,8,8,8,8,0,0,0,0]],
                [[0,8,8,8,8,8,8,0,0,0,0],
                 [0,0,8,0,0,8,0,0,0,0,0],
                 [0,8,8,8,8,8,8,0,0,0,0],
                 [0,0,8,0,0,8,0,0,0,0,0]],
                [[0,0,8,0,8,8,8,0,0,0,0],
                 [0,8,8,8,0,8,0,0,0,0,0],
                 [0,0,8,0,8,8,8,0,0,0,0],
                 [0,8,8,8,0,8,0,0,0,0,0]],
                [[0,8,8,8,0,8,0,0,0,0,0],
                 [0,0,8,0,8,8,8,0,0,0,0],
                 [0,8,8,8,0,8,0,0,0,0,0],
                 [0,0,8,0,8,8,8,0,0,0,0]],
                 
                [[0,0,8,0,0,0,0,0,8,0,0],
                 [0,8,8,8,0,0,0,8,8,8,0],
                 [0,0,8,0,0,0,0,0,8,0,0],
                 [0,8,8,8,0,0,0,8,8,8,0]],
                [[0,0,8,0,0,0,0,8,8,8,0],
                 [0,8,8,8,0,0,0,0,8,0,0],
                 [0,0,8,0,0,0,0,8,8,8,0],
                 [0,8,8,8,0,0,0,0,8,0,0]],
                [[0,8,8,8,0,0,0,0,8,0,0],
                 [0,0,8,0,0,0,0,8,8,8,0],
                 [0,8,8,8,0,0,0,0,8,0,0],
                 [0,0,8,0,0,0,0,8,8,8,0]],
                [[0,8,8,8,0,0,0,8,8,8,0],
                 [0,0,8,0,0,0,0,0,8,0,0],
                 [0,8,8,8,0,0,0,8,8,8,0],
                 [0,0,8,0,0,0,0,0,8,0,0]],
                 
                [[0,0,0,0,0,8,0,0,8,0,0],
                 [0,0,0,0,8,8,8,8,8,8,0],
                 [0,0,0,0,0,8,0,0,8,0,0],
                 [0,0,0,0,8,8,8,8,8,8,0]],
                [[0,0,0,0,8,8,8,0,8,0,0],
                 [0,0,0,0,0,8,0,8,8,8,0],
                 [0,0,0,0,8,8,8,0,8,0,0],
                 [0,0,0,0,0,8,0,8,8,8,0]],
                [[0,0,0,0,8,8,8,8,8,8,0],
                 [0,0,0,0,0,8,0,0,8,0,0],
                 [0,0,0,0,8,8,8,8,8,8,0],
                 [0,0,0,0,0,8,0,0,8,0,0]],
                [[0,0,0,0,0,8,0,8,8,8,0],
                 [0,0,0,0,8,8,8,0,8,0,0],
                 [0,0,0,0,0,8,0,8,8,8,0],
                 [0,0,0,0,8,8,8,0,8,0,0]]
            ]
        },
        /*
            获取飞机线地图
        */
        getPlaneLineMap:function(){
            var a,t=this,c=1+Math.floor(Math.random()*gameboy.cfg.maxColor);
            if(vars.gameIndex==1){
                a=K.clone(t.maps.empty);
                if(t.genedPlane){
                    if(t.nextPlanePath)t.lastPlanePath=t.nextPlanePath;
                    t.nextPlanePath=t.minPlanePath+Math.floor(Math.random()*t.maxPlanePath);
                }
                t.genedPlane=!t.genedPlane;
            }else{
                if(t.genedPlane){
                    a=K.clone(t.maps.empty);
                    t.genedPlane=false;
                }else{
                    a=K.clone(t.maps.list[Math.floor(Math.random()*t.maps.list.length)]);
                    t.genedPlane=true;
                }
            }
            for(var i=a.length-1;i>=0;i--){
                for(var z=1,y=a[i].length-1,st,ed;z<y;z++){
                    if(vars.gameIndex==1){
                        if(t.genedPlane){
                            st=Math.min(t.lastPlanePath,t.nextPlanePath);
                            ed=Math.max(t.lastPlanePath,t.nextPlanePath)+3;
                            if(z<st||z>ed){
                                if(Math.random()<=vars.barrierPro)a[i][z]=c;
                            }
                        }else{
                            if(z<t.lastPlanePath||z>t.lastPlanePath+3){
                                if(Math.random()<=vars.barrierPro)a[i][z]=c;
                            }
                        }
                    }else{
                        if(a[i][z]!=0)a[i][z]=c;
                    }
                }
                if(t.sideSpace%3!=0){
                    a[i][0]=gameboy.cfg.defaultColor;
                    a[i][y]=gameboy.cfg.defaultColor;
                    t.sideSpace++;
                }else{
                    t.sideSpace=1;
                }
            }
            return a;
        },
        /*
            初始化
        */
        init:function(mainMap){
            var t=this;
            t.tempMap=[];
            t.delCount=0;
            t.genedPlane=vars.gameIndex?true:false;
            t.sideSpace=1;
            for(var i=0,j=mainMap.length,l;i<j;i++){
                l=mainMap[i].length;
                t.tempMap[i]=[];
                for(var z=0;z<l;z++){
                    if(i%3!=0&&(z==0||z==l-1))this.tempMap[i][z]=gameboy.cfg.defaultColor;
                    else t.tempMap[i][z]=0;
                }
            }
            t.mainMap=mainMap;
            t.maxPlanePath=t.mainMap[0].length-3-1;//最大飞机线路
            t.minPlanePath=1;//最小飞机线路
            t.lastPlanePath=t.minPlanePath+Math.floor(Math.random()*t.maxPlanePath);
            t.tempMap=this.getPlaneLineMap().concat(this.tempMap);
            K.mix(this,K.Evt);
        },
        /*
            
        */
        updateMap:function(){
            var t=this,map=t.mainMap,tm=t.tempMap,f;
            for(var i=tm.length-1,j=tm.length-map.length,x=map.length-1;i>=j;i--,x--){
                for(var z=0,y=tm[i].length;z<y;z++){
                    map[x][z]=tm[i][z];
                }
            }
            if(t.$fire){
                t.fireEvt('displane');
                delete t.$fire;
            }else{
                if(vars.gameIndex==1){
                    for(i=1,x=tm.length-1,j=tm[x].length-1,f=false;i<j;i++){
                        if(tm[x][i]!=0){
                            t.$fire=true;
                            break;
                        }
                    }
                }else{
                    for(i=1,x=tm.length-1,j=tm[x].length-1,f=false;i<j;i++){
                        if(tm[x][i]!=0){
                            for(var z=1;z<j;z++){
                                if(tm[x-1][z]!=0){
                                    f=true;
                                    break;
                                }
                            }
                            if(!f)t.$fire=true;
                            break;
                        }
                    }
                }
            }
            tm.pop();
            t.delCount++;
            if(t.delCount>=4){
                t.tempMap=t.getPlaneLineMap().concat(t.tempMap);
                t.delCount=0;
            }
        }
    };
    /*
        飞机类
    */
    Plane=K.clazz({
        /*
            飞机形状
        */
        planeShape:[
            [0,1,0],
            [1,1,1],
            [0,1,0],
            [1,1,1]
        ],
        /*
            x坐标
        */
        x:0,
        /*
            
        */
        maxShapeHeight:0,
        /*
            
        */
        pos:position.getRandomPos(),
        /*
            
        */
        maxShapeWidth:0,
        /*
            
        */
        ctor:function(){
            var mw=0,mh=0,t=this,s=t.planeShape;
            for(var i=0,j=s.length;i<j;i++){
                mw=Math.max(mw,s[i].length);
            }
            mh=j;
            t.maxShapeHeight=mh;
            t.maxShapeWidth=mw;
        }
    });
    /*
        
    */
    soundMgr={
        START:'sounds/plane/start.mp3',
        MOVE:'sounds/plane/move.mp3',
        BOMB:'sounds/plane/bomb.mp3',
        OVER:'sounds/plane/over.mp3'
    }
    /*
        控制器
    */
    ctrl={
        /*
            活动飞机的id
        */
        activePlaneId:'_avoid_plane',
        /*
            生命值
        */
        life:vars.defaultLife,
        /*
            初始化
        */
        init:function(){
            var t=this;
            t.mainMap=gameboy.mapMgr.mainMap;
            t.drawLife();
            if(!t.$plane)t.$plane=new Plane();
            t.drawActivePlane();
            //window.P=t.$plane;
            t.movePlaneTo(t.$plane.pos);
            map2.init(t.mainMap);
            t.drawStage();
            map2.ondisplane=function(){
                if(!t.$score)t.$score=0;
                t.$score+=vars.gameIndex?vars.passOneScore1:vars.passOneScore;
                gameboy.core.updateScoreAndSpeed(t.$score,vars.upLevelScore);
            }
        },
        /*
            
        */
        clear:function(){
            gameboy.mapMgr.clearStage();
            gameboy.mapMgr.updateStage();
            this.delActivePlane();
        },
        /*
            
        */
        delActivePlane:function(){
            K.nodeDel(this.activePlaneId);
        },
        /*
            生命地图
        */
        getLifeMap:function(){
            var map=[];
            for(var i=0;i<vars.defaultLife+1-this.life;i++){
                map[i]=[];
            }
            for(var i=vars.defaultLife+1-this.life;i<vars.defaultLife+1;i++){
                map[i]=[0,1];
            }
            return map;
        },
        /*
            画活动的飞机
        */
        drawActivePlane:function(){
            var t=this,aid=t.activePlaneId;
            if(!K(aid)){
                var d=K('div',{id:aid},{position:'absolute'});
                document.body.appendChild(d);
                gameboy.mapMgr.drawMap({
                    id:aid,
                    size:[t.$plane.maxShapeWidth,t.$plane.maxShapeHeight]
                });
                var map=t.$plane.planeShape,o,cfg=gameboy.cfg;
                for(var i=0,j=map.length;i<j;i++){
                    for(var z=0,y=map[i].length;z<y;z++){
                        if(map[i][z]==1&&(o=K(K.strFormat(cfg.cellIdFormat,aid,i,z))))o.className=gameboy.cfg.specialCellClass;
                    }
                }
            }
        },
        /*
            画生命
        */
        drawLife:function(){
            gameboy.mapMgr.resetNext();
            gameboy.mapMgr.drawNext(this.getLifeMap(),gameboy.cfg.defaultColor);
        },
        /*
            画舞台
        */
        drawStage:function(){
            var t=this;
            map2.updateMap();
            gameboy.mapMgr.updateStage();
            t.isCollide();
        },
        /*
            画飞机失事
        */
        drawPlaneBurst:function(){
            var t=this,x=t.$plane.maxShapeWidth,y=t.$plane.maxShapeHeight,o;
            for(var i=0;i<y;i++){
                for(var j=0;j<x;j++){
                    if((o=K(K.strFormat(gameboy.cfg.cellIdFormat,t.activePlaneId,i,j))))o.className=gameboy.cfg.specialUsedCellClass;
                }
            }
        },
        /*
            移动飞机到指定位置
        */
        movePlaneTo:function(p){
            var x=0,y=0,t=this,plane=t.$plane,mm=gameboy.mapMgr,xpos=0;
            y=mm.stageBound.y+mm.stageBound.height-mm.cellSize.height*plane.maxShapeHeight;
            if(p==position.LEFT){
                x=mm.stageBound.x+mm.cellSize.width;
                xpos=1;
            }else if(p==position.CENTER){
                x=mm.stageBound.x+mm.cellSize.width*(plane.maxShapeWidth+1);
                xpos=1+plane.maxShapeWidth
            }else if(p==position.RIGHT){
                x=mm.stageBound.x+mm.stageBound.width-mm.cellSize.width*(plane.maxShapeWidth+1)
                xpos=1+2*plane.maxShapeWidth
            }
            plane.pos=p;
            plane.x=xpos;
            gameboy.soundPlayer.play2(soundMgr.MOVE);
            K.nodeStyle(t.activePlaneId,{left:x+'px',top:y+'px'});
            t.isCollide();
        },
        /*
            
        */
        canMoveTo:function(dir){
            if(dir==GK.LEFT){
                return this.$plane.x>1;
            }else{
                return this.$plane.x<this.mainMap[0].length-1-3;
            }
        },
        /*
            
        */
        movePlaneTo1:function(dir){
            var t=this,x=0,mm=gameboy.mapMgr;
            if(t.canMoveTo(dir)){
                gameboy.soundPlayer.play2(soundMgr.MOVE);
                if(dir==GK.LEFT){
                    t.$plane.x--;
                }else{
                    t.$plane.x++;
                }
                x=mm.stageBound.x+mm.cellSize.width*t.$plane.x;
                K.nodeStyle(t.activePlaneId,{left:x+'px'});
                t.isCollide();
            }
        },
        /*
            相撞
        */
        isCollide:function(){
            if(this.$tempOver)return;
            var startX,endX,startY,endY,t=this,isOver=false;
            endY=t.mainMap.length-1;
            startY=endY-t.$plane.maxShapeHeight+1;
            if(vars.gameIndex==1){
                startX=t.$plane.x;
            }else{
                if(t.$plane.pos==position.LEFT){
                    startX=1;
                }else if(t.$plane.pos==position.CENTER){
                    startX=1+t.$plane.maxShapeWidth;
                }else{
                    startX=1+2*t.$plane.maxShapeWidth;
                }
            }
            endX=startX+t.$plane.maxShapeWidth-1;
            for(var i=startY,ty=0;i<=endY;i++,ty++){
                for(var y=startX,tx=0;y<=endX;y++,tx++){
                    if(vars.gameIndex==1){
                        if(t.mainMap[i][y]!=0&&t.$plane.planeShape[ty][tx]!=0){
                            isOver=true;
                            break;
                        }
                    }else{
                        if(t.mainMap[i][y]!=0){
                            isOver=true;
                            break;
                        }
                    }
                }
                if(isOver)break;
            }
            if(isOver){
                t.$tempOver=true;
                t.pause();
                t.drawPlaneBurst();
                gameboy.soundPlayer.play1(soundMgr.BOMB);
                K.timer(function(){
                    t.clear();
                    if(!t.life){
                        t.over();
                    }else{
                        t.life--;
                        t.init();
                        t.start();
                    }
                    delete t.$isFastDown;//有可能在等待时间里用户按了快速下落键 清除它
                    delete t.$tempOver;
                },vars.nextLifeWiat4);
            }
        },
        /*
            
        */
        pause:function(){
            K.clsTimer(this.$timer);
            delete this.$timer;
        },
        /*
            
        */
        resetSpeed:function(speed){
            var t=this;
            t.pause();
            t.$timer=K.timer(t.drawStage,speed/2,1,t);
        },
        /*
            
        */
        start:function(){
            this.resetSpeed(gameboy.cfg.speed);
        },
        /*
            
        */
        startFastDown:function(){
            this.resetSpeed(gameboy.cfg.fastSpeed);
        },
        /*
            
        */
        stopFastDown:function(){
            this.resetSpeed(gameboy.cfg.speed);
        },
        /*
            
        */
        over:function(){
            this.pause();
            gameboy.core.showGameOver();
            gameboy.soundPlayer.play1(soundMgr.OVER);
            this.life=vars.defaultLife;
            delete this.$score;
        },
        /*
            接收游戏机的按键
        */
        receiveKey:function(key){
            var t=this,plane=t.$plane,pos;
            if(t.$tempOver)return;//临时死亡
            if(key==GK.LEFT){
                if(vars.gameIndex==1){
                    t.movePlaneTo1(key);
                }else if(plane.pos>1){
                    t.movePlaneTo(plane.pos-1);
                }
            }else if(key==GK.RIGHT){
                if(vars.gameIndex==1){
                    t.movePlaneTo1(key);
                }else if(plane.pos<3){
                    t.movePlaneTo(plane.pos+1);
                }
            }else if(key==GK.START||key==GK.GON){
                gameboy.soundPlayer.play1(soundMgr.START);
                t.start();
            }else if(key==GK.PAUSE){
                t.pause();
            }else if(key==GK.DOWN||key==GK.UP){
                if(!t.$isFastDown){
                    t.drawStage();
                    t.$isFastDown=true;
                    t.startFastDown();
                }
            }else if(key==GK.DOWNRELEASE||key==GK.UPRELEASE){
                if(t.$isFastDown){
                    delete t.$isFastDown;
                    t.stopFastDown();
                }
            }
        }
    };
    /*
        Plane 对外接口
    */
    K.mix(P,Gameboy.AbstractGame);
    K.mix(P,{
        /*
            
        */
        name:'AvoidPlane',
        /*
            
        */
        innerGameCount:2,
        /*
            接受游戏机对象，调用游戏机的相关方法
        */
        init:function(matchine){
            gameboy=matchine;
            ctrl.init();
        },
        /*
            
        */
        setInnerGameIndex:function(index){
            vars.gameIndex=index;
        },
        /*
            
        */
        receiveKey:function(key){
            ctrl.receiveKey(key);
        },
        /*
            
        */
        updateSpeed:function(speed){
            ctrl.resetSpeed(speed);
        }
    });
});