///<reference path="K.source.js" />
///<reference path="K.Gameboy.source.js" />

/*
    snake
*/
Ctrl.cache('Gameboy.Snake',function(){
    var S=K.object('Gameboy.Snake'),ctrl,gameboy,GK=Gameboy.GameKeys,dir=GK,vars,soundMgr;
    /*
        
    */
    vars={
        /*
            
        */
        defaultSnake:[[0,2],[0,1],[0,0]],//新生蛇长度及位置 左上角 横向
        /*
            
        */
        defaultLife:4,
        /*
            默认食物颜色
        */
        defaultFoodColor:0,
        /*
            最大颜色
        */
        maxFoodColor:0,
        /*
            下一条命开始等待时间
        */
        nextLifeWiat4:200,
        /*
            
        */
        eatOneScore:10,
        /*
            
        */
        upLevelScore:100
    };
    /*
        
    */
    soundMgr={
        START:'sounds/snake/start.mp3',
        ROUND:'sounds/snake/round.mp3',
        EAT:'sounds/snake/eat.mp3',
        BOMB:'sounds/snake/bomb.mp3',
        OVER:'sounds/snake/over.mp3'
    };
    /*
        控制器
    */
    ctrl={
        /*
            当前蛇的方向
        */
        snakeDir:dir.RIGHT,
        /*
            
        */
        snakeColor:0,
        /*
            
        */
        life:vars.defaultLife,
        /*
            
        */
        init:function(){
            var t=this;
            t.clear();
            t.initStartMapAndUI();
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
            画生命
        */
        drawLife:function(){
            gameboy.mapMgr.resetNext();
            gameboy.mapMgr.drawNext(this.getLifeMap(),gameboy.cfg.defaultColor);
        },
        /*
            
        */
        generateSnakeColor:function(){
            return 1+Math.floor(Math.random()*vars.maxFoodColor);
        },
        /*
            障碍物生成
        */
        generateBar:function(num,len){
            num=Math.floor(num*1.5);
            len=0;
            while(len<num){
                var t=this,pos=t.generatePos();
                while(t.mainMap[pos[0]][pos[1]])pos=t.generatePos();
                t.mainMap[pos[0]][pos[1]]=gameboy.cfg.defaultColor;
                len++;
            }
        },
        /*
            生成随机点
        */
        generatePos:function(){
            return [Math.floor(Math.random()*(this.mainMap.length-1)),Math.floor(Math.random()*(this.mainMap[0].length-1))];
        },
        /*
            
        */
        generateFood:function(){
            var t=this,pos=t.generatePos(),c;
            while(t.mainMap[pos[0]][pos[1]])pos=t.generatePos();
            t.foodPos=pos;
            c=t.mainMap[pos[0]][pos[1]]=1+Math.floor(Math.random()*vars.maxFoodColor);
            if(c==t.snakeColor)t.mainMap[pos[0]][pos[1]]=vars.defaultFoodColor;
        },
        /*
            清除数据
        */
        clear:function(){
            gameboy.mapMgr.clearStage();
            this.$snake=K.clone(vars.defaultSnake);
            this.mainMap=gameboy.mapMgr.mainMap;//映射，快速访问
            this.snakeDir=dir.RIGHT;
            delete this.$dir;
        },
        /*
            初始开始地图并显示
        */
        initStartMapAndUI:function(){
            this.snakeColor=this.generateSnakeColor();
            this.generateFood();
            this.generateBar(gameboy.cfg.startLevel);
            this.applySnakeToStage();
            this.drawLife();
        },
        /*
            
        */
        applySnakeToStage:function(){
            var t=this,s=t.$snake;
            for(var i=0,j=s.length,c;i<j;i++){
                c=s[i];
                t.mainMap[c[0]][c[1]]=i?t.snakeColor:gameboy.cfg.special;
            }
            gameboy.mapMgr.updateStage();
        },
        /*
            
        */
        moveTo:function(pos){
            var t=this,d=t.getDir(),npos=null;
            if(d==dir.RIGHT){
                if(pos[1]<t.mainMap[0].length-1){
                    npos=[pos[0],pos[1]+1];
                }
            }else if(d==dir.DOWN){
                if(pos[0]<t.mainMap.length-1){
                    npos=[pos[0]+1,pos[1]];
                }
            }else if(d==dir.LEFT){
                if(pos[1]>0){
                    npos=[pos[0],pos[1]-1];
                }
            }else if(d==dir.UP){
                if(pos[0]>0){
                    npos=[pos[0]-1,pos[1]];
                }
            }
            if(npos&&t.mainMap[npos[0]][npos[1]]&&!K.equal(npos,t.foodPos))npos=null;
            return npos;
        },
        /*
            
        */
        updateStage:function(){
            var t=this,s=t.$snake,pos=s[0],head,tail;
            head=t.moveTo(pos);
            if(head){
                if(!K.equal(t.foodPos,head))tail=s.pop();
                else{
                    t.snakeColor=t.mainMap[head[0]][head[1]];
                    delete t.foodPos;
                    t.updateScore();
                    gameboy.soundPlayer.play3(soundMgr.EAT);
                }
                s.unshift(head);
                if(tail)t.mainMap[tail[0]][tail[1]]=0;
                t.applySnakeToStage();
                if(!t.foodPos)t.generateFood();
            }else{
                t.$tempOver=true;
                t.pause();
                t.drawSnakeDie();
                gameboy.soundPlayer.play1(soundMgr.BOMB);
                K.timer(function(){
                    t.clear();
                    if(!t.life){
                        t.over();
                    }else{
                        t.life--;
                        t.initStartMapAndUI();
                        t.start();
                    }
                    delete t.$tempOver;
                },vars.nextLifeWiat4);
            }
        },
        /*
            
        */
        updateScore:function(){
            if(!this.$score)this.$score=0;
            this.$score+=vars.eatOneScore;
            gameboy.core.updateScoreAndSpeed(this.$score,vars.upLevelScore);
        },
        /*
            画蛇死亡
        */
        drawSnakeDie:function(){
            var t=this,s=t.$snake,mm=gameboy.mapMgr;
            for(var i=0,j=s.length,c;i<j;i++){
                c=s[i];
                mm.highLightStageCell(c[0],c[1],gameboy.cfg.specialUsed);
            }
        },
        /*
            设置方向
        */
        setDir:function(dir){
            var t=this;
            if(!t.$dir)t.$dir=[];
            t.$dir.push(dir);
            gameboy.soundPlayer.play4(soundMgr.ROUND);
        },
        /*
            
        */
        getDir:function(){
            var t=this;
            if(t.$dir&&t.$dir.length)return t.snakeDir=t.$dir.shift();
            return this.snakeDir;
        },
        /*
            
        */
        lastDir:function(){
            var t=this;
            if(t.$dir&&t.$dir.length)return t.$dir[t.$dir.length-1];
            return t.snakeDir;
        },
        /*
            暂停
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
            t.$timer=K.timer(t.updateStage,speed/2,1,t);
        },
        /*
            
        */
        start:function(){
            this.resetSpeed(gameboy.cfg.speed);
        },
        /*
            
        */
        startFastDown:function(){
            this.resetSpeed(gameboy.cfg.fastSpeed*2);
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
            
        */
        startFast:function(){
            if(!this.$isFast){
                this.updateStage();
                this.$isFast=true;
                this.startFastDown();
            }
        },
        stopFast:function(){
            if(this.$isFast){
                delete this.$isFast;
                this.stopFastDown();
            }
        },
        /*
            接收游戏机的按键
        */
        receiveKey:function(key){
            var t=this,ld,il;
            if(t.$tempOver)return;//临时死亡
            ld=t.lastDir();
            il=t.$dir&&!t.$dir.length;
            if(key==GK.LEFT){
                if(ld==dir.RIGHT)return;
                if(t.snakeDir==dir.LEFT&&il){
                    t.startFast();
                }else if(ld!=dir.LEFT){
                    t.setDir(dir.LEFT);
                }
            }else if(key==GK.LEFTRELEASE){
                if(t.snakeDir==dir.LEFT){
                    t.stopFast();
                }
            }else if(key==GK.RIGHT){
                if(ld==dir.LEFT)return;
                if(t.snakeDir==dir.RIGHT&&il){
                    t.startFast();
                }else if(ld!=dir.RIGHT){
                    t.setDir(dir.RIGHT);
                }
            }else if(key==GK.RIGHTRELEASE){
                if(t.snakeDir==dir.RIGHT){
                    t.stopFast();
                }
            }else if(key==GK.DOWN){
                if(ld==dir.UP)return;
                if(t.snakeDir==dir.DOWN&&il){
                    t.startFast();
                }else if(ld!=dir.DOWN){
                    t.setDir(dir.DOWN);
                }
            }else if(key==GK.DOWNRELEASE){
                if(t.snakeDir==dir.DOWN){
                    t.stopFast();
                }
            }else if(key==GK.UP){
                if(ld==dir.DOWN)return;
                if(t.snakeDir==dir.UP&&il){
                    t.startFast();
                }else if(ld!=dir.UP){
                    t.setDir(dir.UP);
                }
            }else if(key==GK.UPRELEASE){
                if(t.snakeDir==dir.UP){
                    t.stopFast();
                }
            }else if(key==GK.START||key==GK.GON){
                gameboy.soundPlayer.play1(soundMgr.START);
                t.start();
            }else if(key==GK.PAUSE){
                t.pause();
            }
        }
    };
    /*
        Snake 对外接口
    */
    K.mix(S,Gameboy.AbstractGame);
    K.mix(S,{
        /*
            
        */
        name:'Snake',
        /*
            
        */
        innerGameCount:1,
        /*
            接受游戏机对象，调用游戏机的相关方法
        */
        init:function(matchine){
            gameboy=matchine;
            vars.defaultFoodColor=matchine.cfg.maxColor;
            vars.maxFoodColor=vars.defaultFoodColor-1;
            ctrl.init();
        },
        /*
            
        */
        setInnerGameIndex:function(index){
            //vars.gameIndex=index;
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