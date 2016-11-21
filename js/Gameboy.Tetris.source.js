///<reference path="K.source.js" />
///<reference path="K.Gameboy.source.js" />

/*

 */

Ctrl.cache('Gameboy.Tetris', function() {
  //#region block
  var T = K.object('Gameboy.Tetris'),
    block, blocks = {},
    blockType, blocksMgr, ctrl, gameboy, soundMgr;
  /*
      特殊方块常量
  */
  blockType = {
    BOMB: 1, //炸弹
    DECREASEGUN: 2, //消减的枪
    INCREASEGUN: 3, //增长的枪
    ACROSSMOUSE: 4 //穿墙鼠
  };
  /*
      base block
  */
  block = K.clazz({
    /*

     */
    map: [],
    /*

     */
    ctor: function(map) {
      var t = this;
      if (map) t.map = map;
      else {
        var n = Math.floor(t.list.length * Math.random());
        t.$listIndex = n;
        t.map = t.list[n];
      }
    },
    /*

     */
    rotate: function(dir) {
      var t = this,
        index = 0,
        M = Gameboy.GameKeys;
      if (t.list) {
        if (dir == M.RIGHT) {
          if (t.$listIndex + 1 < t.list.length)
            index = t.$listIndex + 1;
        } else if (dir == M.LEFT) {
          if (t.$listIndex - 1 < 0)
            index = t.list.length - 1;
          else
            index = t.$listIndex - 1;
        }
        t.map = t.list[index];
        t.$listIndex = index;
      }
    },
    /*

     */
    getRotateMap: function(dir) {
      var t = this,
        index = 0,
        M = Gameboy.GameKeys;
      if (t.list) {
        if (dir == M.RIGHT) {
          if (t.$listIndex + 1 < t.list.length)
            index = t.$listIndex + 1;
        } else if (dir == M.LEFT) {
          if (t.$listIndex - 1 < 0)
            index = t.list.length - 1;
          else
            index = t.$listIndex - 1;
        }
        return t.list[index];
      }
      return K.clone(t.map);
    },
    /*
        设置颜色类型
    */
    setColorType: function(type) {
      this.colorType = type;
    }
  });
  /*
      I block
  */
  blocks.IBlock = K.clazz(block, function(_base) {
    var list = [
            /*
             ****
             */
            [[0], [1, 1, 1, 1]],
            /*
             *
             *
             *
             *
             */
            [[0, 1], [0, 1], [0, 1], [0, 1]]
            ];
    return {
      ctor: function(map) {
        this.list = list;
        _base.ctor.call(this, map);
      }
    }
  });
  /*
      T block
  */
  blocks.TBlock = K.clazz(block, function(_base) {
    var list = [
            /*
             *
             ***
             */
            [[0, 1], [1, 1, 1]],
            /*
             *
             **
             *
             */
            [[1], [1, 1], [1]],
            /*
             ***
             *
             */
            [[1, 1, 1], [0, 1]],
            /*
             *
             **
             *
             */
            [[0, 1], [1, 1], [0, 1]]
        ];
    return {
      ctor: function(map) {
        this.list = list;
        _base.ctor.call(this, map);
      }
    }
  });
  /*
      L block
  */
  blocks.LLBlock = K.clazz(block, function(_base) {
    var list = [
            /*
             *
             ***
             */
            [[1], [1, 1, 1]],
            /*
             **
             *
             *
             */
            [[1, 1], [1], [1]],
            /*
             ***
             *
             */
            [[1, 1, 1], [0, 0, 1]],
            /*
             *
             *
             **
             */
            [[0, 1], [0, 1], [1, 1]]
        ];
    return {
      ctor: function(map) {
        this.list = list;
        _base.ctor.call(this, map);
      }
    }
  });
  /*
      L block
  */
  blocks.RLBlock = K.clazz(block, function(_base) {
    var list = [
            /*
             ***
             *
             */
            [[1, 1, 1], [1]],
            /*
             **
             *
             *
             */
            [[1, 1], [0, 1], [0, 1]],
            /*
             *
             ***
             */
            [[0, 0, 1], [1, 1, 1]],
            /*
             *
             *
             **
             */
            [[1], [1], [1, 1]]
        ];
    return {
      ctor: function(map) {
        this.list = list;
        _base.ctor.call(this, map);
      }
    }
  });
  /*
      LZ block
  */
  blocks.LZBlock = K.clazz(block, function(_base) {
    /*

     */
    var list = [
            /*
             *
             **
             *
             */
            [[1], [1, 1], [0, 1]],
            /*
             **
             **
             */
            [[0, 1, 1], [1, 1]]
        ];
    return {
      ctor: function(map) {
        this.list = list;
        _base.ctor.call(this, map);
      }
    }
  });
  /*
      RZ block
  */
  blocks.RZBlock = K.clazz(block, function(_base) {
    /*

     */
    var list = [
            /*
             *
             **
             *
             */
            [[0, 1], [1, 1], [1]],
            /*
             **
             **
             */
            [[1, 1], [0, 1, 1]]
        ];
    return {
      ctor: function(map) {
        this.list = list;
        _base.ctor.call(this, map);
      }
    }
  });
  /*
      [] block
  */
  blocks.DBlock = K.clazz(block, function(_base) {
    return {
      ctor: function(map) {
        _base.ctor.call(this, map || [[1, 1], [1, 1]]);
      }
    }
  });
  /*
   * block
   */
  blocks.OBlock = K.clazz(blocks.DBlock, function(_base) {
    return {
      ctor: function() {
        _base.ctor.call(this, [[0], [0, 1]]);
      }
    }
  });
  /*

   */
  blocks.$2IBlock = K.clazz(block, function(_base) {
    var list = [
            /*
             **
             */
            [[0], [0, 1, 1]],
            /*
             *
             *
             */
            [[0], [0, 1], [0, 1]]
        ];
    return {
      ctor: function(map) {
        this.list = list;
        _base.ctor.call(this, map);
      }
    }
  });
  /*

   */
  blocks.$3IBlock = K.clazz(block, function(_base) {
    var list = [
            /*
             ***
             */
            [[0], [1, 1, 1]],
            /*
             *
             *
             *
             */
            [[0, 1], [0, 1], [0, 1]]
        ];
    return {
      ctor: function(map) {
        this.list = list;
        _base.ctor.call(this, map);
      }
    }
  });
  /*

   */
  blocks.$LLBlock = K.clazz(block, function(_base) {
    var list = [
            /*
             *
             **
             */
            [[1], [1, 1]],
            /*
             **
             *
             */
            [[1, 1], [1]],
            /*
             **
             *
             */
            [[1, 1], [0, 1]],
            /*
             *
             **
             */
            [[0, 1], [1, 1]]
        ];
    return {
      ctor: function(map) {
        this.list = list;
        _base.ctor.call(this, map);
      }
    }
  });
  /*

   */
  blocks.$RLBlock = K.clazz(block, function(_base) {
    var list = [
            /*
             **
             *
             */
            [[1, 1], [1]],
            /*
             **
             *
             */
            [[1, 1], [0, 1]],
            /*
             *
             **
             */
            [[0, 1], [1, 1]],
            /*
             *
             **
             */
            [[1], [1, 1]]
        ];
    return {
      ctor: function(map) {
        this.list = list;
        _base.ctor.call(this, map);
      }
    }
  });
  blocks.$$Block = K.clazz(block, function(_base) {
    var list = [
            /*
             * *
             *
             * *
             */
            [[1, 0, 1],
             [0, 1, 0],
             [1, 0, 1],
             [0]],
            /*
             *
             * *
             *
             */
            [[0, 1],
             [1, 0, 1],
             [0, 1],
             [0]],

             /*
              *
              *
              * *
              *
              */
             [[0, 1],
              [0, 1],
              [1, 0, 1],
              [0, 1]],
              /*
               *
               * **
               *
               */
              [[0, 1],
               [1, 0, 1, 1],
               [0, 1]],
              /*
               *
               * *
               *
               *
               */
              [[0, 1],
               [1, 0, 1],
               [0, 1],
               [0, 1]],

               /*
                *
                ** *
                *
                */
               [[0, 0, 1],
                [1, 1, 0, 1],
                [0, 0, 1]]
        ];
    return {
      ctor: function(map) {
        this.list = list;
        _base.ctor.call(this, map);
      }
    }
  });
  /*

   */
  blocks.FBlock = K.clazz(block, function(_base) {
    var list = [
            /*
             *   *
             * *
             *
             */
            [[1, 0, 0, 0, 1],
             [0, 1, 0, 1],
             [0, 0, 1]],
            /*
             *
             *
             *
             *
             *
             */
            [[0, 0, 1],
             [0, 1],
             [1],
             [0, 1],
             [0, 0, 1]],
            /*
             *
             * *
             *   *
             */
            [[0, 0, 1],
             [0, 1, 0, 1],
             [1, 0, 0, 0, 1]],
            /*
             *
             *
             *
             *
             *
             */
            [[1],
             [0, 1],
             [0, 0, 1],
             [0, 1],
             [1]]
        ];
    return {
      ctor: function(map) {
        this.list = list;
        _base.ctor.call(this, map);
      }
    }
  });
  blocks.BTBlock = K.clazz(block, function(_base) {
    var list = [
            /*
             ***
             *
             *
             */
            [[1, 1, 1],
             [0, 1],
             [0, 1]],
            /*
             *
             ***
             *
             */
            [[0, 0, 1],
             [1, 1, 1],
             [0, 0, 1]],
            /*
             *
             *
             ***
             */
            [[0, 1],
             [0, 1],
             [1, 1, 1]],
            /*
             *
             ***
             *
             */
            [[1],
             [1, 1, 1],
             [1]]
        ];
    return {
      ctor: function(map) {
        this.list = list;
        _base.ctor.call(this, map);
      }
    }
  });
  blocks.BLZBlock = K.clazz(block, function(_base) {
    var list = [
            /*
             **
             *
             **
             */
            [[1, 1],
             [0, 1],
             [0, 1, 1]],
            /*
             *
             ***
             *
             */
            [[0, 0, 1],
             [1, 1, 1],
             [1]]
        ];
    return {
      ctor: function(map) {
        this.list = list;
        _base.ctor.call(this, map);
      }
    }
  });
  blocks.BRZBlock = K.clazz(block, function(_base) {
    var list = [
            /*
             **
             *
             **
             */
            [[0, 1, 1],
             [0, 1],
             [1, 1]],
            /*
             *
             ***
             *
             */
            [[1],
             [1, 1, 1],
             [0, 0, 1]]
        ];
    return {
      ctor: function(map) {
        this.list = list;
        _base.ctor.call(this, map);
      }
    }
  });
  blocks.UBlock = K.clazz(block, function(_base) {
    var list = [
            /*
             * *
             ***
             */
            [[1, 0, 1],
             [1, 1, 1]],
            /*
             **
             *
             **
             */
            [[1, 1],
             [1, 0],
             [1, 1]],
            /*
             ***
             * *
             */
            [[1, 1, 1],
             [1, 0, 1]],
             /*
              **
              *
              **
              */
            [[1, 1],
             [0, 1],
             [1, 1]]

        ];
    return {
      ctor: function(map) {
        this.list = list;
        _base.ctor.call(this, map);
      }
    }
  });
  blocks.CSBlock = K.clazz(block, function(_base) {
    var list = [
            /*
             *
             ***
             *
             */
            [[0, 1],
             [1, 1, 1],
             [0, 1]]

        ];
    return {
      ctor: function(map) {
        this.list = list;
        _base.ctor.call(this, map);
      }
    }
  });
  blocks.LDOBlock = K.clazz(block, function(_base) {
    var list = [
            /*
             *
             **
             **
             */
            [[0, 1],
             [0, 1, 1],
             [1, 1]],
            /*
             *
             ***
             *
             */
            [[1],
             [1, 1, 1],
             [0, 1]],
            /*
             **
             **
             *
             */
            [[0, 1, 1],
             [1, 1],
             [0, 1]],
            /*
             *
             ***
             *
             */
            [[0, 1],
             [1, 1, 1],
             [0, 0, 1]]

        ];
    return {
      ctor: function(map) {
        this.list = list;
        _base.ctor.call(this, map);
      }
    }
  });
  blocks.RDOBlock = K.clazz(block, function(_base) {
    var list = [
            /*
             **
             **
             *
             */
            [[1, 1],
             [0, 1, 1],
             [0, 1]],
            /*
             *
             ***
             *
             */
            [[0, 0, 1],
             [1, 1, 1],
             [0, 1]],
            /*
             *
             **
             **
             */
            [[0, 1],
             [1, 1],
             [0, 1, 1]],
            /*
             *
             ***
             *
             */
            [[0, 1],
             [1, 1, 1],
             [1]]

        ];
    return {
      ctor: function(map) {
        this.list = list;
        _base.ctor.call(this, map);
      }
    }
  });
  /*

   */
  blocks.DDBlock = K.clazz(block, function(_base) {
    var list = [
            /*
             *
             **
             **
             */
            [[1],
             [0, 1, 1],
             [0, 1, 1]],
            /*
             *
             **
             **
             */
            [[0, 0, 1],
             [1, 1],
             [1, 1]],
            /*
             **
             **
             *
             */
            [[1, 1],
             [1, 1],
             [0, 0, 1]],
            /*
             **
             **
             *
             */
            [[0, 1, 1],
             [0, 1, 1],
             [1]]
        ];
    return {
      ctor: function(map) {
        this.list = list;
        _base.ctor.call(this, map);
      }
    }
  });
  /*

   */
  blocks.ODBlock = K.clazz(block, function(_base) {
    var list = [
            /*
             *
             **
             *
             */
            [[1],
             [0, 1, 1],
             [0, 1]],
            /*
             *
             **
             *
             */
            [[0, 0, 1],
             [1, 1],
             [0, 1]],
            /*
             *
             **
             *
             */
            [[0, 1],
             [1, 1],
             [0, 0, 1]],
            /*
             *
             **
             *
             */
            [[0, 1],
             [0, 1, 1],
             [1]]
        ];
    return {
      ctor: function(map) {
        this.list = list;
        _base.ctor.call(this, map);
      }
    }
  });
  /*
      炸弹
      *  *
       **
       **
  */
  blocks.BombBlock = K.clazz(block, function(_base) {
    return {
      ctor: function() {
        var t = this;
        t.isSpecial = true;
        t.specialType = blockType.BOMB;
        _base.ctor.call(t, [
                    [0, 0, 0, 0, 0, 0],
                    [0, 1, 0, 0, 1, 0],
                    [0, 0, 1, 1, 0, 0],
                    [0, 0, 1, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0]
                ]);
      }
    }
  });
  /*
      减量枪
       *
       *
  */
  blocks.DecreaseGunBlock = K.clazz(block, function(_base) {
    return {
      ctor: function() {
        var t = this;
        t.isSpecial = true;
        t.specialType = blockType.DECREASEGUN;
        _base.ctor.call(t, [
                    [0, 1],
                    [0, 1]
                ]);
      }
    }
  });
  /*
      增量枪
       *
       *
       *
  */
  blocks.IncreaseGunBlock = K.clazz(block, function(_base) {
    return {
      ctor: function() {
        var t = this;
        t.isSpecial = true;
        t.specialType = blockType.INCREASEGUN;
        _base.ctor.call(t, [
                    [0, 1],
                    [0, 1],
                    [0, 1]
                ]);
      }
    }
  });
  /*
      穿墙鼠
  */
  blocks.AcrossMouseBlock = K.clazz(block, function(_base) {
    return {
      ctor: function() {
        var t = this;
        t.isSpecial = true;
        t.specialType = blockType.ACROSSMOUSE;
        _base.ctor.call(t, [
                    [0],
                    [0, 1]
                ]);
      }
    }
  });
  /*
      活动的方块
  */
  blocks.ActiveBlock = K.clazz({
    /*
        方块x坐标
    */
    x: 0,
    /*
        方块y坐标
    */
    y: 0,
    /*
        方块真实宽度
    */
    width: 0,
    /*
        方块真实高度
    */
    height: 0,
    /*
        方块在活动坐标内左偏移量
    */
    offsetLeft: 0,
    /*
        方块在活动坐标内上偏移量
    */
    offsetTop: 0,
    /*

     */
    offsetRight: 0,
    /*
        最大长度范围
    */
    maxLength: 0,
    /*
        边界点
    */
    //edgePoint:[],
    /*

     */
    bottomPoints: [],
    /*

     */
    leftPoints: [],
    /*

     */
    rightPoints: [],
    /*

     */
    _calcVars: function() {
      var t = this;
      t.width = 0;
      t.height = 0;
      t.offsetLeft = 0;
      t.offsetTop = 0;
      t.offsetRight = 0;
      t.bottomPoints = [];
      t.leftPoints = [];
      t.rightPoints = [];
      var u = [],
        w, first, find, h = 0,
        tw = 0;
      for (var j = t.map.length, i = 0; i < j; i++) {
        u[i] = 0;
        w = 0;
        first = false;
        t.leftPoints[i] = null;
        t.rightPoints[i] = null;
        for (var z = 0, y = t.map[i].length; z < y; z++) {
          if (!t.bottomPoints[z]) t.bottomPoints[z] = null;
          if (t.map[i][z] == 0 && !first) u[i]++;
          else if (t.map[i][z]) {
            w = z;
            t.rightPoints[i] = {
              x: z,
              y: i
            };
            if (!first) {
              first = true;
              find = true;
              h++
              t.leftPoints[i] = {
                x: z,
                y: i
              };
            }
            t.bottomPoints[z] = {
              x: z,
              y: i
            };
          }
        }
        if (!find) t.offsetTop++;
        t.width = Math.max(t.width, y);
        tw = Math.max(tw, w + 1);
      }
      t.offsetRight = t.width - tw;
      t.offsetLeft = Math.min.apply(null, u);
      t.height = h;
    },
    /*
        构造方法
    */
    ctor: function(block, aw) {
      var t = this;
      t.map = block.map;
      t.$bk = block;
      t.colorType = t.$bk.colorType;
      t.specialType = t.$bk.specialType;
      t.isSpecial = !!t.$bk.isSpecial;
      t._calcVars();
      t.y = -(t.height + t.offsetTop);
      t.maxLength = Math.max(t.width, t.map.length);
      t.x = Math.floor((aw - t.width) / 2);
    },
    /*
        旋转
    */
    rotate: function(dir) {
      this.$bk.rotate(dir);
      this.map = this.$bk.map;
      this._calcVars();
    },
    /*

     */
    getRotatedVars: function(map) {
      var t = this,
        o = {};
      o.width = 0;
      o.height = 0;
      o.offsetLeft = 0;
      o.offsetTop = 0;
      var u = [],
        w, first, find, h = 0;
      for (var j = map.length, i = 0; i < j; i++) {
        u[i] = 0;
        w = 0;
        first = false;
        for (var z = 0, y = map[i].length; z < y; z++) {
          if (map[i][z] == 0 && !first) u[i]++;
          else if (map[i][z]) {
            w = z;
            if (!first) {
              first = true;
              h++
            }
          }
        }
        if (!first) o.offsetTop++;
        o.width = Math.max(o.width, w + 1);
      }
      o.offsetLeft = Math.min.apply(null, u);
      o.height = h;
      return o;
    },
    /*
        获取旋转后的地图
        旋转后地图有可能到屏幕外边。
    */
    getRotateMap: function(dir, w) {
      var map = this.$bk.getRotateMap(dir);
      return {
        map: map,
        rotatedVars: this.getRotatedVars(map)
      };
    }
  });
  /*
      方块管理者
  */
  blocksMgr = {
    /*
        方块的颜色数
    */
    color: 0,
    /*
        方块
    */
    blocks: [
            [
                blocks.IBlock,
                blocks.TBlock,
                blocks.LZBlock,
                blocks.RZBlock,
                blocks.DBlock,
                blocks.LLBlock,
                blocks.RLBlock,
                //blocks.FBlock,
                blocks.OBlock
            ], [
                blocks.$2IBlock,
                blocks.$3IBlock,
                blocks.$LLBlock,
                blocks.BRZBlock,
                blocks.BLZBlock,
                blocks.IBlock,
                blocks.BTBlock,
                blocks.TBlock,
                blocks.LZBlock,
                blocks.BRZBlock,
                blocks.BLZBlock,
                blocks.RZBlock,
                blocks.DBlock,
                blocks.OBlock,
                blocks.BRZBlock,
                blocks.BLZBlock,
                blocks.DDBlock,
                blocks.BTBlock
            ], [
                blocks.$2IBlock,
                blocks.$3IBlock,
                blocks.$LLBlock,
                blocks.BRZBlock,
                blocks.BLZBlock,
                blocks.IBlock,
                blocks.BombBlock,
                blocks.BTBlock,
                blocks.TBlock,
                blocks.LZBlock,
                blocks.IncreaseGunBlock,
                blocks.BRZBlock,
                blocks.FBlock,
                blocks.BLZBlock,
                blocks.DecreaseGunBlock,
                blocks.RZBlock,
                blocks.DBlock,
                blocks.OBlock,
                blocks.BRZBlock,
                blocks.BLZBlock,
                blocks.DDBlock,
                blocks.BTBlock,
                blocks.AcrossMouseBlock
            ], [
                blocks.AcrossMouseBlock,
                blocks.IBlock,
                blocks.TBlock,
                blocks.LLBlock,
                blocks.ODBlock,
                blocks.RLBlock,
                blocks.BombBlock,
                blocks.LZBlock,
                blocks.RZBlock,
                blocks.DBlock,
                blocks.OBlock,
                blocks.BombBlock,
                blocks.$2IBlock,
                blocks.$3IBlock,
                blocks.$LLBlock,
                blocks.DecreaseGunBlock,
                blocks.$RLBlock,
                blocks.BTBlock,
                blocks.$$Block,
                blocks.FBlock,
                blocks.BombBlock,
                blocks.BRZBlock,
                blocks.BLZBlock,
                blocks.ODBlock,
                blocks.UBlock,
                blocks.CSBlock,
                blocks.LDOBlock,
                blocks.RDOBlock,
                blocks.BombBlock,
                blocks.AcrossMouseBlock,
                blocks.IncreaseGunBlock,
                blocks.DDBlock
            ]
        ],
    /*
        方块类列表
    */
    list: [],
    /*
        获取方块对象工厂
        随机获取一个方块对象
    */
    getBlock: function() {
      var t = this,
        n = Math.floor(Math.random() * (t.list.length - 1)),
        o;
      o = new t.list[n]();
      if (o.isSpecial) o.setColorType(gameboy.cfg.special);
      else o.setColorType(1 + Math.floor(Math.random() * t.color));
      return o;
    },
    /*
        下一个方块对象
    */
    nextBlock: function() {
      var t = this;
      t.$lastBlock = t.getBlock();
      return t.$lastBlock;
    },
    /*
        获取缓存的方块对象
    */
    getNext: function() {
      var t = this;
      if (!t.$lastBlock) return t.nextBlock();
      return t.$lastBlock;
    },
    /*

     */
    setBlockIndex: function(index) {
      console.log(index);
      this.list = this.blocks[index];
    },
    /*

     */
    getCount: function() {
      return this.blocks.length;
    }
  };
  /*

   */
  soundMgr = {
      START: 'sounds/tetris/start.mp3',
      MOVE: 'sounds/tetris/move.mp3',
      DOWN: 'sounds/tetris/down.mp3',
      ROTATE: 'sounds/tetris/rotate.mp3',
      DISLINE: 'sounds/tetris/disline.mp3',
      BOMB: 'sounds/tetris/bomb.mp3',
      SHOOT: 'sounds/tetris/shoot.mp3',
      OVER: 'sounds/tetris/over.mp3'
    }
    /*
        内部控制器
    */
  ctrl = {
    /*

     */
    activeBlockId: '_active_block',
    /*

     */
    lineScoreMap: {
      '1': 100,
      '2': 400,
      '3': 900,
      '4': 1500
    },
    /*

     */
    speedUpScore: 100000,
    /*
        等待时间
    */
    waitTime: 200,
    /*

     */
    prepareAll: function() {
      var t = this;
      //取消连续按下落键快速下落下一个方块
      t.stopFastDown();
      t.removeActiveBlock();
      t.$isDrawOver = false; //活动方块是否绘制完毕
      t.chgActiveBlock(blocksMgr.getNext()); //开始时先获得一个活动的方块
      t.drawNext(blocksMgr.nextBlock()); //画下一个等待出现的方块
      /*
          绘制并更新活动方块位置
      */
      t.drawActiveBlock();
      t.updateActiveBlockPos();
    },
    /*

     */
    resetSpeed: function(speed) {
      var t = this;
      //t.drawActiveBlock();//更新 有可能快速下落时方块未画完整
      t.pause();
      t.$timer = K.timer(t.doDown, speed, true, t); //定时器开始
    },
    doDown: function() {
      var t = this;
      if (!t.autoDown()) { //不可以自动下落
        if (!t.$isDrawOver && (t.$acb.y + t.$acb.offsetTop + t.$acb.height <= 0)) t.over(); //如果前一个方块未完全绘制，并且不能下落到最上层的行上， 则表示游戏已结束,完全实现小时候玩的游戏机的规则
        else {
          //不是特殊方块 或者特殊方块执行2次以上
          if (!t.$acb.isSpecial || t.$acb.specialDid >= 2) t.prepareAll();
        }
      }
    },
    /*
        更新分数，消行的不同 分数也不同
    */
    updateScore: function(lines) {
      var t = this;
      if (!t.$scoreK) {
        t.$scoreK = {
          score: 0
        }
      }
      if (!t.$scoreK[lines]) {
        t.$scoreK[lines] = 0;
      }
      t.$scoreK[lines]++;
      t.$scoreK.score += t.lineScoreMap[lines];
      gameboy.core.updateScoreAndSpeed(t.$scoreK.score, t.speedUpScore);
    },
    /*
        更换活动方块
    */
    chgActiveBlock: function(bk) {
      this.$acb = new blocks.ActiveBlock(bk, this.stageSize[0]);
    },
    /*
        画活动方块
    */
    drawActiveBlock: function(f) {
      var t = this,
        aid = t.activeBlockId,
        o;
      if (!t.$isDrawOver) { //没有绘制结束，别的Tetris方块一出来就全部显示方块，我们的是不显示方块，自动下落一行出来下面的一行 ，直至全部出来
        if (t.$acb.y >= 0) t.$isDrawOver = true;
        if (!K(aid)) {
          var d = K('div', {
            id: aid
          }, {
            position: 'absolute'
          });
          document.body.appendChild(d);
          gameboy.mapMgr.drawMap({
            id: aid,
            size: [t.$acb.maxLength, t.$acb.maxLength]
          });
        }
        var map = t.$acb.map,
          o, cfg = gameboy.cfg;
        for (var i = 0, j = map.length; i < j; i++) {
          if (i + t.$acb.y >= 0) { //只画可见的
            for (var z = 0, y = map[i].length; z < y; z++) {
              if (map[i][z] == 1 && (o = K(K.strFormat(cfg.cellIdFormat, aid, i, z)))) o.className = K.strFormat(cfg.highLightCellClass, t.$acb.colorType);
            }
          }
        }
      }
    },
    /*
        画特殊的炸弹
    */
    drawSpecialBomb: function() {
      var t = this,
        map = t.$acb.map,
        o, cfg = gameboy.cfg;
      for (var i = 0, j = map.length; i < j; i++) {
        if (i + t.$acb.y >= 0) { //只画可见的
          for (var z = -t.$acb.x, y = map[i].length; z < y; z++) {
            //t._log('fill:'+[i,z]);
            if ((z + t.$acb.x) < t.stageSize[0] && (i + t.$acb.y) < t.stageSize[1])
              if ((o = K(K.strFormat(cfg.cellIdFormat, t.activeBlockId, i, z)))) o.className = cfg.specialUsedCellClass;
          }
        }
      }
    },
    /*
        删除活动方块
    */
    removeActiveBlock: function() {
      K.nodeDel(this.activeBlockId);
    },
    /*
        更新活动方块的位置
    */
    updateActiveBlockPos: function() {
      var t = this,
        pos = {
          x: t.$acb.x * t.blockCellSize.width + t.stageBound.x,
          y: t.$acb.y * t.blockCellSize.height + t.stageBound.y
        }
      K.nodeStyle(t.activeBlockId, {
        left: pos.x + 'px',
        top: pos.y + 'px'
      });
    },
    /*
        自动下落
    */
    autoDown: function(bm) {
      var t = this;
      if (t.canDown()) {
        t.$acb.y++;
        t.drawActiveBlock();
        t.updateActiveBlockPos();
        return true;
      }
      t.putActiveBlock(); //不能自动下落时放下该 活动的方块
      return false;
    },
    /*
        放下当前活动的方块
        @f {Boolean} 是否手动放小  枪用
    */
    putActiveBlock: function(f) {
      var t = this,
        map = t.$acb.map,
        BT = blockType,
        tx, ty, start = -1,
        end = -1;
      if (t.$acb.isSpecial) { //是否为特殊方块
        if (!t.$acb.specialDid) t.$acb.specialDid = 0; //记录当前特殊方块执行的次数
        t.$acb.specialDid++;
        if (t.$acb.specialType == BT.BOMB) { //如果是炸弹
          if (t.$acb.specialDid == 1) { //并且是第一次爆炸
            t.$wait = true;
            t.resetSpeed(t.waitTime);
            t.drawSpecialBomb(); //显示爆炸效果
            gameboy.soundPlayer.play5(soundMgr.BOMB);
            for (var i = 0, j = map.length; i < j; i++) { //扫描主地图，并消去交集
              ty = t.$acb.y + i;
              if (ty >= 0 && ty < t.stageSize[1]) {
                for (var z = 0, y = map[i].length; z < y; z++) {
                  tx = t.$acb.x + z;
                  if (tx >= 0 && tx < t.stageSize[0]) t.mainMap[ty][tx] = 0;
                }
                if (start == -1) start = ty;
                end = ty;
              }
            }
            t.$acb.y = t.stageSize[1]; //强制使炸弹过期
            t.$isDrawOver = true; //使用完后标志炸弹绘制完成
          } else {
            delete t.$wait;
            t.startFastDown();
          }
        } else if (t.$acb.specialType == BT.DECREASEGUN) { //消量枪
          if (f) {
            var col = t.$acb.x + t.$acb.bottomPoints[1].x,
              row = t.$acb.offsetTop + t.$acb.height + t.$acb.y - 1;
            if (row < t.stageSize[1]) {
              for (var i = row; i < t.stageSize[1]; i++) {
                if (i + 1 < t.stageSize[1]) {
                  if ((!t.mainMap[i] || t.mainMap[i][col] == 0) && t.mainMap[i + 1][col] != 0) {
                    t.mainMap[i + 1][col] = 0;
                    start = end = 0;
                    break;
                  }
                }
              }
            }
          }
          t.$acb.specialDid = 3;
        } else if (t.$acb.specialType == BT.INCREASEGUN) { //增量枪
          if (f) {
            var col = t.$acb.x + t.$acb.bottomPoints[1].x,
              row = t.$acb.offsetTop + t.$acb.height + t.$acb.y;
            if (row < t.stageSize[1]) {
              for (var i = row; i < t.stageSize[1]; i++) {
                if (i + 1 < t.stageSize[1]) {
                  if (t.mainMap[i][col] == 0) {
                    if (t.mainMap[i + 1][col] != 0) {
                      t.mainMap[i][col] = gameboy.cfg.defaultColor;
                      start = end = i;
                      break;
                    }
                  } else {
                    break;
                  }
                } else {
                  t.mainMap[i][col] = gameboy.cfg.defaultColor;
                  start = end = i;
                }
              }
            }
          }
          t.$acb.specialDid = 3;
        } else if (t.$acb.specialType == BT.ACROSSMOUSE) { //穿墙鼠
          for (var i = 0; i < map.length; i++) {
            ty = t.$acb.y + i;
            if (ty >= 0 && ty < t.stageSize[1]) {
              for (var j = 0; j < map[i].length; j++) {
                if (map[i][j] != 0) {
                  tx = t.$acb.x + j;
                  if (tx >= 0 && tx < t.stageSize[0] && t.mainMap[ty][tx] == 0) t.mainMap[ty][tx] = gameboy.cfg.defaultColor;
                }
              }
              if (start == -1) start = ty;
              end = ty;
            }
          }
          t.$acb.specialDid++;
        }
      } else {
        for (var i = 0; i < map.length; i++) {
          ty = t.$acb.y + i;
          if (ty >= 0 && ty < t.stageSize[1]) {
            for (var j = 0; j < map[i].length; j++) {
              if (map[i][j] == 1) {
                tx = t.$acb.x + j;
                if (tx >= 0 && tx < t.stageSize[0]) t.mainMap[ty][tx] = t.$acb.colorType;
              }
            }
            if (start == -1) start = ty;
            end = ty;
          }
        }
      }
      if (start >= 0 && end >= 0) { //如果开始结束都大于0
        t.clearSolidLines(start, end); //清除实线
        gameboy.mapMgr.updateStage(); //更新界面
      }
    },
    /*
        清除填满的行
    */
    clearSolidLines: function(start, end) {
      //this._log('clear range:'+[start,end]);
      var t = this,
        f, map = t.mainMap,
        line = 0;
      for (var i = start; i <= end; i++) {
        f = true;
        //t._log('clear start{0} and length{1}'.format(i,map.length));
        for (var c = 0, s = map[i].length; c < s; c++) {
          if (map[i][c] == 0) {
            f = false;
            break;
          }
        }
        if (f) { //如果当前行可以清除 则所有小于该行的数据下移一行
          line++;
          t.mainMap.splice(i, 1);
          i--;
          end--;
        }
      }
      if (line > 0) {
        gameboy.soundPlayer.play4(soundMgr.DISLINE);
        t.updateScore(line);
        var a;
        //t._log('add a new line');
        for (var z = 0; z < line; z++) {
          a = [];
          for (var j = 0; j < t.stageSize[0]; j++) a.push(0);
          t.mainMap.unshift(a);
        }
      } else {
        if (t.$acb) {
          if (t.$acb.isSpecial && (t.$acb.specialType == blockType.INCREASEGUN || t.$acb.specialType == blockType.DECREASEGUN)) {
            gameboy.soundPlayer.play4(soundMgr.SHOOT);
          } else {
            gameboy.soundPlayer.play4(soundMgr.DOWN);
          }
        }
      }
      return line;
    },
    /*
        能否下落
    */
    canDown: function() {
      var t = this,
        flag = true;
      if (t.$acb.y + t.$acb.height + t.$offsetTop >= t.stageSize[1]) { //检测有没有越过下边
        return false;
      }
      var tpt, tx, ty;
      if (t.$acb.isSpecial && t.$acb.specialType == blockType.ACROSSMOUSE) { //穿墙鼠特殊判断
        var col = t.$acb.x + t.$acb.bottomPoints[1].x,
          row = t.$acb.offsetTop + t.$acb.height + t.$acb.y,
          inFlag = true; //老鼠的当前位置
        if (row < t.stageSize[1]) { //老鼠在屏幕内
          for (var i = row; i < t.stageSize[1]; i++) {
            if (t.mainMap[i][col] == 0) { //有空位 则老鼠可以下穿
              inFlag = false;
              break;
            }
          }
        }
        if (inFlag) {
          if (!t.$acb.specialDid) t.$acb.specialDid = 0;
          t.$acb.specialDid += 2;
          flag = false;
        }
      } else {
        for (var i = 0, j = t.$acb.bottomPoints.length; i < j; i++) { //检测下边点投影
          tpt = t.$acb.bottomPoints[i];
          if (tpt) {
            if (t.$acb.y < 0 && (tpt.y + t.$acb.y + 1) >= 0) {
              tx = tpt.x + t.$acb.x;
              ty = t.$acb.y + tpt.y + 1;
            } else if (t.$acb.y >= 0) {
              tx = tpt.x + t.$acb.x;
              ty = t.$acb.y + tpt.y + 1;
            }
            if (tx < t.stageSize[0] && ty < t.stageSize[1]) {
              if (t.mainMap[ty][tx] != 0) {
                flag = false;
                break;
              }
            } else if (ty >= t.stageSize[1] - 1) {
              flag = false;
              break;
            }
          }
        }
      }
      return flag;
    },
    /*

     */
    canRotate: function(ops) {
      var t = this,
        f, tx, ty, map;
      if (ops.rotatedVars.offsetLeft + t.$acb.x < 0) { //修正变形后方块出屏幕范围 修正左边
        t.$acb.x = ops.rotatedVars.offsetLeft;
        //t.updateActiveBlockPos();
      } else if (ops.rotatedVars.width + t.$acb.x > t.stageSize[0]) { //修正右边
        t.$acb.x = t.stageSize[0] - ops.rotatedVars.width;
        //t.updateActiveBlockPos();
      }
      //识别旋转后能否放下当前方块
      map = ops.map;
      for (var i = 0, j = map.length; i < j; i++) { //遍历旋转后的地图，看与主地图在方块上是否有交点，没有交点时旋转才能成功
        ty = t.$acb.y + i;
        if (ty >= 0 && ty < t.stageSize[1]) {
          for (var z = 0, y = map[i].length; z < y; z++) {
            if (map[i][z] == 1) {
              tx = t.$acb.x + z;
              if (tx >= 0 && tx < t.stageSize[0] && t.mainMap[ty][tx] != 0) {
                f = true;
                break;
              }
            }
          }
        }
        if (f) break;
      }
      return !f;
    },
    /*
        清除活动方块
    */
    clearActiveBlock: function() {
      var t = this,
        map = t.$acb.map,
        o, cfg = gameboy.cfg;
      for (var i = 0, j = map.length; i < j; i++) {
        if (i + t.$acb.y >= 0) {
          for (var z = 0, y = map[i].length; z < y; z++) {
            if (map[i][z] == 1 && (o = K(K.strFormat(cfg.cellIdFormat, t.activeBlockId, i, z)))) o.className = cfg.normalCellClass;
          }
        }
      }
      t.$isDrawOver = false;
    },
    /*
        旋转方块
    */
    rotateBlock: function() {
      var t = this;
      if (t.$acb.isSpecial) { //特殊方块的旋转 炸弹直接爆炸 枪加减块 不管老鼠
        if (t.$acb.specialType != blockType.ACROSSMOUSE) {
          t.putActiveBlock(true);
        }
      } else if (t.canRotate(t.$acb.getRotateMap(t.rotateDirection))) { //如果可以旋转
        t.clearActiveBlock(); //清除活动方块
        t.$acb.rotate(t.rotateDirection); //左转
        t.drawActiveBlock(); //重绘活动方块
        t.updateActiveBlockPos(); //更新活动方块的位置，因为活动方块有可能在旋转的过程中移出了屏幕外边。
      }
    },
    /*
        左右移动活动方块
    */
    moveActiveBlockTo: function(dir) {
      var t = this,
        D = Gameboy.GameKeys,
        flag = true,
        map = t.$acb.map,
        tpt, tx, ty, ST = blockType;
      if (t.$acb.isSpecial && t.$acb.specialType == ST.BOMB && t.$acb.specialDid >= 1) return; //如果是特殊方块的炸弹 并且已经执行爆炸，则不执行左右的移动
      if (dir == D.LEFT) {
        if (t.$acb.x + t.$acb.offsetLeft > 0) { //确保没有移出屏幕左边
          if (t.$acb.specialType == ST.ACROSSMOUSE) { //穿墙鼠特殊左移
            var col = t.$acb.x + t.$acb.bottomPoints[1].x,
              row = t.$acb.offsetTop + t.$acb.height + t.$acb.y - 1,
              inFlag = true; //老鼠当前的位置
            if (row >= 0) { //如果当前老鼠还未出现在的屏幕上，则标示可以自由左移
              for (var i = 0; i < col; i++) { //依次检查老鼠的左侧是否有空位
                if (t.mainMap[row][i] == 0) { //如果有空位则可以钻过去，但老鼠有可能死在墙里面，因为有自动下落，如果死里面则显示老鼠的尸体
                  inFlag = false;
                  break;
                }
              }
              if (inFlag) {
                flag = false;
              }
            }
          } else {
            for (var i = 0, j = t.$acb.leftPoints.length; i < j; i++) { //普通方块依次检测左侧点的投影
              tpt = t.$acb.leftPoints[i];
              if (tpt) {
                if (t.$acb.y < 0 && i + t.$acb.y >= 0) { //检测出现在屏幕上的投影点 过滤还未出现在屏幕上的投影点
                  tx = t.$acb.x + tpt.x - 1;
                  ty = t.$acb.y + i; //只判断屏幕上的投影点
                } else if (t.$acb.y >= 0) { //全有的点都有屏幕上则依个判断
                  tx = t.$acb.x + tpt.x - 1;
                  ty = t.$acb.y + tpt.y;
                }
                if (tx >= 0 && t.mainMap[ty][tx] != 0) { //如果投影点的左侧有方块则无法左移
                  flag = false;
                  break;
                }
              }
            }
          }
          if (flag) {
            t.$acb.x--;
            t.updateActiveBlockPos();
          }
        }
      } else if (dir == D.RIGHT) {
        if (t.$acb.x + t.$acb.width - t.$acb.offsetRight < t.stageSize[0]) { //确保没有移出右边  以下检测同左移检测
          if (t.$acb.specialType == ST.ACROSSMOUSE) { //穿墙鼠特殊右移
            var col = t.$acb.x + t.$acb.bottomPoints[1].x,
              row = t.$acb.offsetTop + t.$acb.height + t.$acb.y - 1,
              inFlag = true;
            if (row >= 0) {
              for (var i = col; i < t.stageSize[0]; i++) {
                if (t.mainMap[row][i] == 0) {
                  inFlag = false;
                  break;
                }
              }
              if (inFlag) {
                flag = false;
              }
            }
          } else {
            for (var i = 0, j = t.$acb.rightPoints.length; i < j; i++) {
              tpt = t.$acb.rightPoints[i];
              if (tpt) {
                if (t.$acb.y < 0 && i + t.$acb.y >= 0) {
                  tx = t.$acb.x + tpt.x + 1;
                  ty = t.$acb.y + i;
                } else if (t.$acb.y >= 0) {
                  tx = t.$acb.x + tpt.x + 1;
                  ty = t.$acb.y + tpt.y;
                }
                if (tx >= 0 && t.mainMap[ty][tx] != 0) {
                  flag = false;
                  break;
                }
              }
            }
          }
          if (flag) {
            t.$acb.x++;
            t.updateActiveBlockPos();
          }
        }
      }
    },
    /*

     */
    startFastDown: function() {
      this.resetSpeed(gameboy.cfg.fastSpeed);
    },
    /*

     */
    stopFastDown: function() {
      this.resetSpeed(gameboy.cfg.speed);
    },
    /*
        开始
    */
    start: function() {
      var t = this;
      t.prepareAll();
      t.gon();
    },
    /*

     */
    gon: function() {
      this.stopFastDown();
    },
    /*
        暂停游戏
    */
    pause: function() {
      K.clsTimer(this.$timer);
    },
    /*
        游戏结果
    */
    over: function() {
      var t = this;
      t.pause();
      gameboy.soundPlayer.play1(soundMgr.OVER);
      gameboy.mapMgr.resetNext();
      gameboy.core.showGameOver();
    },
    /*
        画next的方块

    */
    drawNext: function(block) {
      var t = this,
        M = gameboy.mapMgr;
      if (t.$lastNextBlockMap) {
        M.clearNext(t.$lastNextBlockMap);
      }
      t.$lastNextBlockMap = block.map;
      M.drawNext(t.$lastNextBlockMap, block.colorType);
    },
    /*

     */
    receiveKey: function(key) {
      if (this.$wait) return;
      var t = this,
        M = Gameboy.GameKeys;
      if (key == M.START) {
        gameboy.soundPlayer.play1(soundMgr.START);
        t.start();
      } else if (key == M.PAUSE) {
        t.pause();
      } else if (key == M.GON) {
        t.gon();
      } else if (key == M.UP) {
        if (t.$acb && !t.$acb.isSpecial)
          gameboy.soundPlayer.play2(soundMgr.ROTATE);
        t.rotateBlock();
      } else if (key == M.DOWN) {
        if (!t.$isFastDown) {
          //gameboy.soundPlayer.play1(soundMgr.MOVE);
          t.doDown();
          t.$isFastDown = true;
          t.startFastDown();
        }
      } else if (key == M.LEFT || key == M.RIGHT) {
        gameboy.soundPlayer.play3(soundMgr.MOVE);
        t.moveActiveBlockTo(key);
      } else if (key == M.DOWNRELEASE) {
        if (t.$isFastDown) {
          t.$isFastDown = false;
          t.stopFastDown();
        }
      }
    },
    /*

     */
    init: function() {
      var t = this,
        M = gameboy.mapMgr,
        cfg = gameboy.cfg,
        rnd = 0.4;
      t.stageSize = M.stageSize;
      t.mainMap = M.mainMap;
      t.stageBound = M.stageBound;
      t.blockCellSize = M.cellSize;
      blocksMgr.color = cfg.maxColor;
      //t.stopFastDown();
      t.rotateDirection = cfg.rotateDirection;
      for (var i = 0, idx = t.mainMap.length - 1; i < cfg.startLevel; i++, idx--) {
        for (var j = 0, z = t.mainMap[idx].length, n, m; j < z; j++) {
          n = Math.random();
          m = Math.floor((1 - n) * cfg.maxColor);
          t.mainMap[idx][j] = n < rnd ? 0 : m + Math.floor(Math.random() * (cfg.maxColor - m)) + 1;
        }
      }
      t.clearSolidLines(idx, t.mainMap.length - 1);
      M.updateStage();
    }
  };
  /*
      Tetris 对外接口
  */
  K.mix(T, Gameboy.AbstractGame);
  K.mix(T, {
    /*

     */
    name: 'Tetris',
    /*

     */
    innerGameCount: blocksMgr.getCount(),
    /*
        接受游戏机对象，调用游戏机的相关方法
    */
    init: function(matchine) {
      gameboy = matchine;
      ctrl.init();
    },
    /*

     */
    setInnerGameIndex: function(index) {
      blocksMgr.setBlockIndex(index);
    },
    /*

     */
    receiveKey: function(key) {
      ctrl.receiveKey(key);
    },
    /*

     */
    updateSpeed: function(speed) {
      ctrl.resetSpeed(speed);
    }
  });
});