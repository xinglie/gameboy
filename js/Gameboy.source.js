///<reference path="K.source.js" />
/*
    Gameboy machine
*/
Ctrl.cache('Gameboy',function () {
    /*
    内部变量声明
    */
    var G=K.object('Gameboy'),gameKeys, gameStatus, cfg, keyborad, mapMgr, uiMgr, numberCode, gameList, ctrl, soundPlayer, soundMgr, player;
    /*
    游戏机按键设置
    */
    gameKeys = {
        /*
        向上键
        */
        UP: 1,
        /*
        向下
        */
        DOWN: 2,
        /*
        向左
        */
        LEFT: 3,
        /*
        向右
        */
        RIGHT: 4,
        /*
        旋转
        */
        ROTATE: 5,
        /*
        开始
        */
        START: 6,
        /*
        暂停
        */
        PAUSE: 7,
        /*
        开始或暂停
        */
        STARTORPUASE: 8,
        /*
        下释放
        */
        DOWNRELEASE: 9,
        /*
        左释放
        */
        LEFTRELEASE: 10,
        /*
        右释放
        */
        RIGHTRELEASE: 11,
        /*
        上释放
        */
        UPRELEASE: 12,
        /*

        */
        GON: 13,
        /*
        加速
        */
        CHANGESPEED: 14
    };
    /*
    游戏状态
    */
    gameStatus = {
        /*
        游戏中
        */
        PLAY: 1,
        /*
        暂停
        */
        PAUSE: 2,
        /*
        结束
        */
        OVER: 3
    };
    /*
    配置
    */
    cfg = {
        /*
        主界面
        */
        stageId: 'main',
        /*
        下一个
        */
        nextId: 'next',
        /*
        主模板
        */
        templetId: 'gameboy_temp',
        /*
        主界面子模板
        */
        mapBlock: 'map_temp',
        /*
        单元格名称
        */
        cellTagName: 'td',
        /*
        单元格格式化
        */
        cellIdFormat: '{0}_cell_{1}_{2}',
        /*
        高亮单元格，因为有多种色彩
        */
        highLightCellClass: 'main_cell_on_{0}',
        /*
        普通
        */
        normalCellClass: 'main_cell',
        /*
        分数
        */
        scoreId: 'score',
        /*
        特殊单元格
        */
        specialCellClass: 'main_cell_on_special',
        /*

        */
        specialUsedCellClass: 'main_cell_on_specialed',
        /*
        数字模板
        */
        numberBlock: 'number_temp',
        /*
        速度id
        */
        speedId: 'speed',
        /*
        速度模板
        */
        speedBlock: 'speed_temp',
        /*
        速度id
        */
        speedIdFormat: '_speed_{0}',
        /*
        当前速度
        */
        speedOnClass: 'spdcur',
        /*
        开始级别id
        */
        startLevelId: 'startlevel',
        /*
        最大颜色值
        */
        maxColor: 7,
        /*

        */
        special: 'special',
        /*

        */
        specialUsed: 'specialed',
        /*
        默认颜色
        */
        defaultColor: 8,
        /*
        默认开始速度
        */
        defaultStartSpeedLevel: 1,
        /*
        默认开始级别
        */
        defaultStartLevel: 0,
        /*
        旋转样式
        */
        rotateLeft1Class: 'rtal',
        /*

        */
        rotateRight1Class: 'rtar',
        /*

        */
        rotateLeft2Class: 'rtal1',
        /*

        */
        rotateRight2Class: 'rtar1',
        /*
        旋转id
        */
        rotateId: 'rotate',
        /*
        游戏状态
        */
        gameStatus: gameStatus.OVER,
        /*
        当前游戏
        */
        curGame: null,
        /*
        游戏索引
        */
        curGameCount: -1,
        /*
        游戏数量
        */
        gameCount: -1,
        /*
        速度
        */
        speed: 1500,
        /*
        级别
        */
        speedLevel: 1,
        /*
        最大级别
        */
        maxLevel: 10,
        /*
        开始级别
        */
        startLevel: 0,
        /*
        旋转方向
        */
        rotateDirection: gameKeys.RIGHT,
        /*
        速度映射
        */
        speedMap: {
            '1': 1500,
            '2': 1200,
            '3': 1000,
            '4': 900,
            '5': 800,
            '6': 700,
            '7': 600,
            '8': 500,
            '9': 400,
            '10': 300
        },
        /*
        最快下落速度
        */
        fastSpeed: 20
    };
    /*
    播放器类
    */
    player = K.clazz({
        /*

        */
        ctor: function () {
            var t = this;
            t.id = 'sp_' + K.id();
			t.embed();
        },
        /*
        输出
        */
        embed: function () {
            var str = '<object clsid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" height="1" width="1" type="application/x-shockwave-flash" id="{id}" name="{id}"  data="sounds/ap2.swf"><param name="allowScriptAccess" value="always"><param name="allowNetworking" value="all"><param name="flashvars" value="bufferseconds=1&waitbufferseconds=60"><param name="movie" value="sounds/ap2.swf"></object>';
            if (K(this.id)) {
                K.nodeDel(this.id);
            }
            var d = K('div', {});
            K.nodeVal(d, K.strFormat(str,{ id: this.id}));
            while (d.firstChild) document.body.appendChild(d.firstChild);
            d = null;
        },
        /*

        */
        play: function (url) {
            var t = this, po= K(t.id);
            K.clsTimer(t.$playTimer);
            t.$playTimer = K.timer(function () {
				try {
					/*if (t.$lastPlay == url) {
						po.mpStop();
						po.mpPlay();
					} else {
						t.$lastPlay = url;*/
						//po.mpSetURL(url);
						//po.mpPlay();

					//}
				} catch (ex) {
					K.log('play ex',ex);
				}
            });
        }
    });
    /*
    声音播放器
    */
    soundPlayer = {
        /*

        */
        getPlayer: function (idx) {
            var t = this, key = '$po' + idx;
            if (!t[key]) t[key] = new player();
            return t[key];
        },
        /*

        */
        play1: function (url) {
            this.getPlayer(1).play(url);
        },
        /*

        */
        play2: function (url) {
            this.getPlayer(2).play(url);
        },
        /*

        */
        play3: function (url) {
            this.getPlayer(3).play(url);
        },
        /*

        */
        play4: function (url) {
            this.getPlayer(4).play(url);
        },
        /*

        */
        play5: function (url) {
            this.getPlayer(5).play(url);
        }
    };
    /*
    键盘
    */
    keyborad = {
        /*

        */
        keyInterval: 90,
        /*

        */
        UP: 38,
        /*

        */
        NUM8: 104,
        /*

        */
        LEFT: 37,
        /*

        */
        NUM4: 100,
        /*

        */
        RIGHT: 39,
        /*

        */
        NUM6: 102,
        /*

        */
        DOWN: 40,
        /*

        */
        NUM2: 98,
        /*

        */
        ENTER: 13,
        /*

        */
        SPACE: 32,
        /*

        */
        CTRL: 17,
        /*
        初始化
        重新实现了key down
        操作系统的是按下过一定时间才会按一定时间频繁触发key down
        游戏机的是从按下开始就开始按一定时间触发key down
        */
        init: function (t) {
            t = this;
            t.$keyTimers = {};
            t.$keyFireTimes = {};
            K.mix(t, K.Evt);
            K.on(window, 'blur', function () {
                t.stopAllFire();
            }).on(document, 'keydown', function (e, c) {
                e = K.evt(e);
                if (e) {
                    K.evtStop(e);
                    c = e.keyCode;
                    switch (c) {
                        case t.UP:
                        case t.NUM8:
                            t.startFireKey(gameKeys.UP);
                            break;
                        case t.LEFT:
                        case t.NUM4:
                            t.startFireKey(gameKeys.LEFT);
                            break;
                        case t.RIGHT:
                        case t.NUM6:
                            t.startFireKey(gameKeys.RIGHT);
                            break;
                        case t.DOWN:
                        case t.NUM2:
                        case t.SPACE:
                            t.startFireKey(gameKeys.DOWN);
                            break;
                        case t.ENTER:
                            t.fireKey(gameKeys.STARTORPUASE);
                            break;
                        case t.CTRL:
                            t.fireKey(gameKeys.CHANGESPEED);
                            break;
                    }
                }
            }).on(document, 'keyup', function (e, c) {
                e = K.evt(e);
                if (e) {
                    K.evtStop(e);
                    c = e.keyCode;
                    switch (c) {
                        case t.UP:
                            t.stopFireKey(gameKeys.UP);
                            t.fireKey(gameKeys.UPRELEASE);
                            break;
                        case t.LEFT:
                            t.stopFireKey(gameKeys.LEFT);
                            t.fireKey(gameKeys.LEFTRELEASE);
                            break;
                        case t.RIGHT:
                            t.stopFireKey(gameKeys.RIGHT);
                            t.fireKey(gameKeys.RIGHTRELEASE);
                            break;
                        case t.DOWN:
                        case t.NUM2:
                        case t.SPACE:
                            t.stopFireKey(gameKeys.DOWN);
                            t.fireKey(gameKeys.DOWNRELEASE);
                            break;
                    }
                }
            });
        },
        /*
        开始按一定时间触发某个按键
        */
        startFireKey: function (key) {
            var t = this;
            if (t.$keyTimers[key]) return;
            t.$keyFireTimes[key] = 0;
            t.$keyTimers[key] = K.timer(function () {
                t.fireKey(key);
                t.$keyFireTimes[key]++;
            }, t.keyInterval, true);
        },
        /*
        停止触发某个按键
        */
        stopFireKey: function (key) {
            var t = this;
            if (!t.$keyFireTimes[key]) t.fireKey(key);
            K.clsTimer(t.$keyTimers[key]);
            delete t.$keyTimers[key];
            delete t.$keyFireTimes[key];
        },
        /*
        停止所有的触发
        */
        stopAllFire: function () {
            var t = this;
            for (var p in t.$keyTimers) {
                t.stopFireKey(p);
            }
        },
        /*
        触发一个按键
        */
        fireKey: function (key) {
            this.fireEvt('keychg', { key: key });
        }
    };
    /*
    地图管理者
    */
    mapMgr = {
        /*
        显示屏
        */
        stageSize: [11, 20],
        /*
        下一个
        */
        nextSize: [6, 6],
        /*
        单元格式大小
        */
        cellSize: null,
        /*
        舞台大小
        */
        stageBound: null,
        /*
        主地图
        */
        mainMap: null,
        /*
        初始化
        */
        init: function (code) {
            var t = this;
            t.clearStage();
            t.drawMap({
                id: cfg.stageId,
                size: t.stageSize
            });
            t.drawMap({
                id: cfg.nextId,
                size: t.nextSize
            });
            t.stageBound = K.nodeBound(cfg.stageId);
            t.cellSize = K.nodeBound(K.tags(cfg.cellTagName, cfg.stageId)[0]);
            if (code) {
                t.setStage(code);
                t.updateStage();
            }
        },
        /*
        画地图
        */
        drawMap: function (ops) {
            K.TP.using(cfg.templetId, cfg.mapBlock).toFill(ops.id, { size: ops.size, id: ops.id });
        },
        /*
        画下一个
        */
        drawNext: function (map, colorType) {
            for (var i = 0, j = map.length; i < j; i++) {
                for (var z = 0, y = map[i].length; z < y; z++) {
                    if (map[i][z] != 0) K(K.strFormat(cfg.cellIdFormat,cfg.nextId, i, z)).className = K.strFormat(cfg.highLightCellClass,colorType);
                }
            }
        },
        /*
        清除下一个
        */
        clearNext: function (map) {
            for (var i = 0, j = map.length; i < j; i++) {
                for (var z = 0, y = map[i].length; z < y; z++) {
                    if (map[i][z] != 0) K(K.strFormat(cfg.cellIdFormat,cfg.nextId, i, z)).className = cfg.normalCellClass;
                }
            }
        },
        /*
        重置下一个
        */
        resetNext: function () {
            var t = this;
            for (var i = 0, j = t.nextSize[1]; i < j; i++) {
                for (var z = 0, y = t.nextSize[0]; z < y; z++) {
                    K(K.strFormat(cfg.cellIdFormat,cfg.nextId, i, z)).className = cfg.normalCellClass;
                }
            }
        },
        /*
        设置舞台
        */
        setStage: function (map) {
            this.mainMap = map;
        },
        /*
        更新舞台
        */
        updateStage: function () {
            var t = this, o, css;
            for (var i = 0; i < t.stageSize[1]; i++) {
                for (var j = 0; j < t.stageSize[0]; j++) {
                    o = K(K.strFormat(cfg.cellIdFormat,cfg.stageId, i, j));
                    if (t.mainMap[i][j] != 0) {
                        css = K.strFormat(cfg.highLightCellClass,t.mainMap[i][j]);
                        if (o.className != css) o.className = css;
                    } else {
                        if (o.className != cfg.normalCellClass) o.className = cfg.normalCellClass;
                    }
                }
            }
        },
        /*
        清除舞台
        */
        clearStage: function () {
            var t = this;
            t.mainMap = [];
            for (var i = 0; i < t.stageSize[1]; i++) {
                t.mainMap[i] = [];
                for (var j = 0; j < t.stageSize[0]; j++) {
                    t.mainMap[i][j] = 0;
                }
            }
        },
        /*
        清除一个单元格
        */
        clearStageCell: function (row, col) {
            var t = this, o = K(K.strFormat(cfg.cellIdFormat,cfg.stageId, row, col));
            t.mainMap[row][col] = 0;
            if (o.className != cfg.normalCellClass) o.className = cfg.normalCellClass;
        },
        /*
        高亮一个单元格
        */
        highLightStageCell: function (row, col, colorType) {
            var t = this, o = K(K.strFormat(cfg.cellIdFormat,cfg.stageId, row, col)), css;
            t.mainMap[row][col] = colorType || cfg.defaultColor;
            css = K.strFormat(cfg.highLightCellClass,t.mainMap[row][col]);
            if (o.className != css) o.className = css;
        }
    };
    /*
    界面管理者
    */
    uiMgr = {
        /*
        初始化
        */
        init: function (speed) {
            K.TP.using(cfg.templetId, cfg.speedBlock).toFill(cfg.speedId, { speed: speed });
            K.nodeDel('_loadingpanel').nodeStyle('_mainpanel', { display: '' }); //清除loading
        },
        /*
        画得分
        */
        drawScore: function (score) {
            K.TP.using(cfg.templetId, cfg.numberBlock).toFill(cfg.scoreId, { number: score });
        },
        /*
        画速度
        */
        drawSpeed: function (speed) {
            var t = this;
            if (t.$lastSpeed) {
                K(K.strFormat(cfg.speedIdFormat,t.$lastSpeed)).className = '';
            }
            t.$lastSpeed = speed;
            K(K.strFormat(cfg.speedIdFormat,speed)).className = cfg.speedOnClass;
        },
        /*
        画开始级别
        */
        drawStartLevel: function (level) {
            K.TP.using(cfg.templetId, cfg.numberBlock).toFill(cfg.startLevelId, { number: level });
        },
        /*
        画旋转方向
        */
        drawRotateDirection: function (dir) {
            var o = {};
            if (dir == gameKeys.RIGHT) {
                o = {
                    l: cfg.rotateLeft1Class,
                    r: cfg.rotateRight1Class
                }
            } else {
                o = {
                    l: cfg.rotateLeft2Class,
                    r: cfg.rotateRight2Class
                }
            }
            K.tags('a', cfg.rotateId, function (v, i) {
                v.className = i == 1 ? o.r : o.l;
            });
        }
    };
    /*
    数字代码
    */
    numberCode = {
        /*

        */
        _map: {
            '0': [
                [1, 1, 1, 1],
                [1, 0, 0, 1],
                [1, 0, 0, 1],
                [1, 0, 0, 1],
                [1, 0, 0, 1],
                [1, 0, 0, 1],
                [1, 1, 1, 1]
            ],
            '1': [
                [0, 0, 0, 1],
                [0, 0, 0, 1],
                [0, 0, 0, 1],
                [0, 0, 0, 1],
                [0, 0, 0, 1],
                [0, 0, 0, 1],
                [0, 0, 0, 1]
            ],
            '2': [
                [1, 1, 1, 1],
                [0, 0, 0, 1],
                [0, 0, 0, 1],
                [1, 1, 1, 1],
                [1, 0, 0, 0],
                [1, 0, 0, 0],
                [1, 1, 1, 1]
            ],
            '3': [
                [1, 1, 1, 1],
                [0, 0, 0, 1],
                [0, 0, 0, 1],
                [1, 1, 1, 1],
                [0, 0, 0, 1],
                [0, 0, 0, 1],
                [1, 1, 1, 1]
            ],
            '4': [
                [1, 0, 0, 1],
                [1, 0, 0, 1],
                [1, 0, 0, 1],
                [1, 1, 1, 1],
                [0, 0, 0, 1],
                [0, 0, 0, 1],
                [0, 0, 0, 1]
            ],
            '5': [
                [1, 1, 1, 1],
                [1, 0, 0, 0],
                [1, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 1],
                [0, 0, 0, 1],
                [1, 1, 1, 1]
            ],
            '6': [
                [1, 1, 1, 1],
                [1, 0, 0, 0],
                [1, 0, 0, 0],
                [1, 1, 1, 1],
                [1, 0, 0, 1],
                [1, 0, 0, 1],
                [1, 1, 1, 1]
            ],
            '7': [
                [1, 1, 1, 1],
                [0, 0, 0, 1],
                [0, 0, 0, 1],
                [0, 0, 0, 1],
                [0, 0, 0, 1],
                [0, 0, 0, 1],
                [0, 0, 0, 1]
            ],
            '8': [
                [1, 1, 1, 1],
                [1, 0, 0, 1],
                [1, 0, 0, 1],
                [1, 1, 1, 1],
                [1, 0, 0, 1],
                [1, 0, 0, 1],
                [1, 1, 1, 1]
            ],
            '9': [
                [1, 1, 1, 1],
                [1, 0, 0, 1],
                [1, 0, 0, 1],
                [1, 1, 1, 1],
                [0, 0, 0, 1],
                [0, 0, 0, 1],
                [1, 1, 1, 1]
            ]
        },
        /*
        获取数字打散后的地图
        */
        getCode: function (size, number) {
            var map = [], t = this, zMap, cMap, h, w, t, l, rm = [];
            if (number < 10) {
                zMap = t._map['0'];
                cMap = t._map[number]
            } else {
				number+='';
				for(var i=0,j=number.split('');i<j.length;i++){
					if(i==0)zMap=t._map[j[i]];
					else cMap=t._map[j[i]];
				}
            }
            for (var i = 0, j = zMap.length; i < j; i++) {
                map[i] = [];
                for (var z = 0, y = zMap[i].length; z < y; z++) {
                    map[i].push(zMap[i][z] ? cfg.defaultColor : 0);
                }
                for (z = 0, y = cMap[i].length; z < y; z++) {
                    if (!z) map[i].push(0);
                    map[i].push(cMap[i][z] ? cfg.defaultColor : 0);
                }
                if (!i) w = map[i].length;
            }
            h = map.length;
            t = Math.floor((size[1] - h) / 2);
            l = Math.floor((size[0] - w) / 2);
            for (var i = 0; i < size[1]; i++) {
                rm[i] = [];
                for (var j = 0; j < size[0]; j++) {
                    if (i >= t && i < t + h) {
                        if (j >= l && j < l + w) {
                            rm[i].push(map[i - t][j - l]);
                        } else {
                            rm[i].push(0);
                        }
                    } else {
                        rm[i].push(0);
                    }
                }
            }
            return rm;
        }
    };
    /*
    内置游戏列表
    */
    gameList = {
        /*

        */
        list: [
            'Gameboy.Snake',
            'Gameboy.AvoidPlane',
            'Gameboy.Tetris'//,
        //'Pft.GameBoy.PPBall'
        ],
        /*

        */
        listMap: {},
        /*

        */
        load: function (callback) {
            var t = this, count = 0, to, total = 0;
			for(var p=0,v;p<t.list.length;p++){
				v=t.list[p];
				Ctrl.using(v,function(){
					to=t.getGameByIndex(count);
					if(to){
						total+=to.innerGameCount;
						t.listMap[count]=total;
						count++;
						if(count==t.list.length){
							K.isFn(callback) && callback(total);
						}
					}else{
						t.list.splice(count,1);
					}
				});
			}
        },
        /*

        */
        getGameByCount: function (count) {
            var t = this, len = t.list.length, idx = 0, subIndex = count;
            for (var i = 0; i < len; i++) {
                if (count < t.listMap[i]) {
                    idx = i;
                    break;
                }
            }
            if (i) subIndex -= t.listMap[i - 1];
            return { game: t.getGameByIndex(idx), subIndex: subIndex };
        },
        /*

        */
        getGameByIndex: function (index) {
            var t = this, g = t.list[index];
            if (g) {
                return K.object(K.strSwap(g,/\.source$/), true);
            }
            return G.AbstractGame;
        }
    };
    /*
    声音
    */
    soundMgr = {
        /*
        改变游戏
        */
        CHGGAME: 'sounds/sys/game.mp3',
        CHGSPEED: 'sounds/sys/speed.mp3',
        CHGLEVEL: 'sounds/sys/level.mp3',
        CHGRATOTE: 'sounds/sys/rotate.mp3'
    };
    /*
    控制器
    */
    ctrl = {
        /*
        初始化
        */
        init: function (C) {
			try{document.execCommand('BackgroundImageCache',false,true)}catch(e){}
            var t = this;
            /*
            加载游戏列表
            */
            gameList.load(function (count) {
                uiMgr.init(cfg.maxLevel);
                cfg.gameCount = count;
                keyborad.init();
                keyborad.onkeychg = function ( e) {
                    t.sendKey(e.key);
                }
                mapMgr.init();
                t.showCurSpeedLevel();
                t.sendKey(gameKeys.RIGHT, true);
                uiMgr.drawRotateDirection(cfg.rotateDirection);
            });
        },
        /*
        向当前的游戏发送按键
        以通知当前游戏如何动作
        */
        sendKey: function (key, sys) {
            var t = this, S = gameStatus, Y = gameKeys, M = mapMgr, game;
            if (cfg.gameStatus == S.OVER) {//游戏结束
                if (cfg.$sgo) {
                    t.stopShowGameOver();
                    t.showGameScreen();
                }
                if (key == Y.LEFT || key == Y.RIGHT) {//按游戏机的左右方向键，游戏选关
                    if (key == Y.RIGHT) {
                        if ((cfg.curGameCount + 1) < cfg.gameCount) {
                            cfg.curGameCount++;
                        } else {
                            cfg.curGameCount = 0;
                        }
                    } else {
                        if ((cfg.curGameCount - 1) >= 0) {
                            cfg.curGameCount--;
                        } else {
                            cfg.curGameCount = cfg.gameCount - 1;
                        }
                    }
                    if (!sys) soundPlayer.play1(soundMgr.CHGGAME);
                    t.showGameScreen();
                    game = gameList.getGameByCount(cfg.curGameCount);
                    cfg.curGame = game.game;
                    cfg.curGame.setInnerGameIndex(game.subIndex);
                } else if (key == Y.STARTORPUASE) {
                    t.updateScore(0);
                    M.clearStage();
                    M.updateStage();
                    cfg.gameStatus = S.PLAY;
                    cfg.curGame.init({ uiMgr: uiMgr, core: t, mapMgr: mapMgr, cfg: cfg, soundPlayer: soundPlayer });
                    cfg.curGame.receiveKey(Y.START);
                } else if (key == Y.DOWN) {
                    soundPlayer.play1(soundMgr.CHGLEVEL);
                    cfg.startLevel++;
                    if (cfg.startLevel > cfg.maxLevel) cfg.startLevel = cfg.defaultStartLevel;
                    uiMgr.drawStartLevel(cfg.startLevel);
                } else if (key == Y.CHANGESPEED) {
                    soundPlayer.play1(soundMgr.CHGSPEED);
                    cfg.speedLevel++;
                    if (cfg.speedLevel > cfg.maxLevel) cfg.speedLevel = cfg.defaultStartSpeedLevel;
                    cfg.speed = cfg.speedMap[cfg.speedLevel];
                    t.showCurSpeedLevel();
                } else if (key == Y.UP) {
                    soundPlayer.play1(soundMgr.CHGRATOTE);
                    cfg.rotateDirection = (cfg.rotateDirection == Y.LEFT ? Y.RIGHT : Y.LEFT);
                    uiMgr.drawRotateDirection(cfg.rotateDirection);
                }
            } else if (cfg.gameStatus == S.PLAY) {
                if (key == Y.STARTORPUASE) {
                    cfg.gameStatus = S.PAUSE;
                    cfg.curGame.receiveKey(Y.PAUSE);
                } else {
                    cfg.curGame.receiveKey(key);
                }
            } else if (cfg.gameStatus == S.PAUSE) {
                if (key == Y.STARTORPUASE) {
                    cfg.gameStatus = S.PLAY;
                    cfg.curGame.receiveKey(Y.GON);
                }
            }
        },
        /*
        显示选游戏界面
        */
        showGameScreen: function () {
            var t = this;
            mapMgr.setStage(numberCode.getCode(mapMgr.stageSize, cfg.curGameCount + 1));
            mapMgr.updateStage();
        },
        /*
        更新分数与得分
        */
        updateScoreAndSpeed: function (total, upScore) {
            this.updateScore(total);
            this.updateSpeed(total, upScore);
        },
        /*

        */
        updateScore: function (total) {
            uiMgr.drawScore(total);
        },
        /*

        */
        showCurSpeedLevel: function () {
            uiMgr.drawSpeed(cfg.speedLevel);
        },
        /*

        */
        updateSpeed: function (total, upScore) {
            console.log(total,upScore);
            var t = cfg, l = Math.floor(total / upScore) + 1;
            if (t.speedLevel != l && l <= t.maxLevel && l > t.speedLevel) {
                t.speed = t.speedMap[t.speedLevel = l];
                cfg.curGame.updateSpeed(t.speed);
            }
            this.showCurSpeedLevel();
        },
        /*

        */
        resetSpeedAndLevel: function () {
            var t = cfg;
            t.startLevel = cfg.defaultStartLevel;
            t.speedLevel = cfg.defaultStartSpeedLevel;
            t.speed = t.speedMap[t.speedLevel];
            this.showCurSpeedLevel();
            uiMgr.drawStartLevel(t.startLevel);
        },
        /*

        */
        stopShowGameOver: function () {
            K.clsTimer(cfg.$sgo);
            delete cfg.$sgo;
        },
        /*

        */
        showGameOver: function () {
            var t = this, index = mapMgr.stageSize[1] - 1, f;
            t.resetSpeedAndLevel();
            cfg.gameStatus = gameStatus.OVER;
            t.stopShowGameOver();
            cfg.$sgo = K.timer(function () {
                for (var i = 0; i < mapMgr.stageSize[0]; i++) {
                    mapMgr.mainMap[index][i] = f ? 0 : cfg.defaultColor;
                }
                mapMgr.updateStage();
                if (f) index++;
                else index--;
                if (index == -1) {
                    index = 0;
                    f = true;
                }
                if (f && index >= mapMgr.stageSize[1]) {
                    t.stopShowGameOver();
                    t.showGameScreen();
                }
            }, 20, 1);
        }
    };
    /*
    游戏虚类
    */
    G.AbstractGame = {
        /*
        接收按键
        */
        receiveKey: K.fn,
        /*
        设置索引
        */
        setInnerGameIndex: K.fn,
        /*

        */
        updateSpeed: K.fn,
        /*
        内置多少游戏
        */
        innerGameCount: 0,
        /*
        初始化
        */
        init: K.noop
    };
    K.mix(G, {
        GameKeys: gameKeys
    });
    /*

    */
    ctrl.init();
});