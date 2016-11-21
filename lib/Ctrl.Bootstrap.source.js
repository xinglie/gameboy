/*
    core local storage
    js local storage control
*/
(function(W,D){
	var E=D.documentElement,
		C=W.Ctrl,
		t=Object.prototype.toString,
		s=Array.prototype.slice,//mapping
		ia=function(a){return t.call(a)=='[object Array]'},//is array
		im=function(a){return t.call(a)=='[object Function]'},//is method
		verFile = 'Ctrl.FilesVer',
		selfNode=D.getElementsByTagName('script'),
		log=function(){
			var a=W.console,b=arguments;
			if(a&&a.log){
				a.log.apply?a.log.apply(a,b):a.log(s.call(b))
			}
		},
		getParam=function(key,str){//query form string
			var reg=new RegExp('(?:^|&)' + key + '=([^&]*)(?:&|$)','i'),
				r=str.match(reg);
			return r?r[1]:0;
		},
		noop=function(){
		},
		tryRun=function(f,i){
			if(!ia(f))f=[f];
			for(i=0;i<f.length;i++){
				try{
					f[i]();
				}catch(e){
					log(e,f[i]);
				}
			}
		},
		watchList=[],
		$J={},
		runWatch=function(f,i,j,o,y){
			for(i=0;watchList[i];i++){
				j=1;
				o=watchList[i];
				if(ia(o[0])){
					for(y=0;o[0][y];y++){
						if($J[o[0][y]]){
							o[0].splice(y--,1);
						}else{
							j=0;
							break;
						}
					}
				}else{
					j=$J[o[0]];
				}
				if(j||(f&&!o[2])){
					tryRun(o[1]);
					watchList.splice(i--,1);
				}
			}
		},
		watch=function(w,f,fw){
			watchList.push([w,f,fw]);
			runWatch();
			return C
		},
		curPath=selfNode[selfNode.length-1].src,
		coreList=getParam('k',curPath),
		JS=function(){},
		U=true,
		timer=function(f, t, b, g, a,z){//wrap timer
			a = s.call(arguments, 4);
			f = im(f) ? f : noop;
			t=t||8;
			z=function(){f.apply(g,a)};
			return b ? W.setInterval(z,t) : W.setTimeout(z,t)
		},
		mix=function(a,b,p){
			for(p in b){
				a[p]=b[p]
			}
		},
		/*xcode=function(s,f){
			if(!s)return '';
			var dict = {},
				out = [],
				prefix = s.charAt(0),
				curChar=prefix,
				oldPrefix=curChar,
				idx= 256,
				i,c,d,
				g=function(){
					out.push(prefix.length > 1 ? String.fromCharCode(dict[prefix]) : prefix);
				};
			if(f){
				out.push(prefix);
			}
			for (i=1,c,d; i<s.length; i++) {
				c=s.charAt(i);
				if(f){
					d=s.charCodeAt(i);
					prefix=d<256?c:dict[d]||(prefix+curChar);
					out.push(prefix);
					curChar=prefix.charAt(0);
					dict[idx++]=oldPrefix+curChar;
					oldPrefix=prefix;
				}else{			
					if (dict.hasOwnProperty(prefix + c)) {
						prefix += c;
					}
					else {
						g();
						dict[prefix + c] = idx++;
						prefix=c;
					}
				}
			}
			if(!f)g();
			return out.join('');
		},*/
		main=location.hostname,
		xver=new Date().getTime().toString(32),
		jse,//get core file,if more than one split it by ,
		store, engine,engines,cache;//control file versions name,storage prefix;
	if(!C){//if not exist Ctrl
		W.Ctrl=C={//
			cache:getParam('che',curPath)=='true',//recognize need cache
			_FMT:getParam('fmt',curPath)||'#k.js?v=#v',//load js file format
			_SIS:getParam('sis',curPath)=='true',//the period is path segmentation
			_CFV:getParam('cfv',curPath)||xver,//current control file versions ver
			_gfv:function(f){
				if(f==verFile)return C._CFV;
				return C._FVS&&C._FVS[f]||xver;
			},
			_gfs:function(f,v){
				v=C._gfv(f);
				if(C._SIS&&f!=verFile)f=f.replace(/\./g,'/');
				return C._FMT.replace(/#k/g,f).replace(/#v/g,v);
			},
			usePath:function(path){//
				if(!C.$r)C.$r=[];
				C.$r.push([path,0,U]);
				return C
			},
			using:function(p,f){//
				if(!C.$r)C.$r=[];
				C.$r.push([p,f]);
				return C
			},
			coreReady:function(f){//
				if(!C.$c)C.$c=[];
				C.$c.push(f);
				return C
			},
			allReady:function(f){//
				if(!C.$a)C.$a=[];
				C.$a.push(f);
				return C
			},
			publish:function(o){//
				if(!C._LCL)C._LCL={};
				for(var p in o)C._LCL[p]=o[p];
				return C
			},
			wait:function(f){
				if(!C.$r)C.$r=[];
				C.$r.push([U,f]);
				return C
			}
		};
	};
	//window.$J=$J;
	JS.prototype={//js文件加载类
		r: function (param, callback, isCode, charset,uniqueKey, t, m, v) {//run path or code
			t = this;
			t.q || (t.q = []);
			param = ia(param) ? param : [param];
			while (param.length) {
				v = param.shift();
				t.q.push(m = { p: isCode || v===U ? v : C.PATH+v, c: charset || 'utf-8', x: isCode,k:uniqueKey })
			}
			m.f = callback;
			!t.m && t.j(t.m=1);
		},
		j: function (o, t, f, a) {//cache ignore code or path
			t = this;
			//im(C.onrequire)&&C.onrequire({total:t.m,index:t.m-t.q.length});
			o = t.q.shift();
			if (o) {
				if(o.p===U){//
					timer(o.f);
					timer(t.j,50,0,t);
				}else if ($J[o.k]) {//if exist in the cache
					if($J[o.k]==U){//if load succ
						timer(o.f);//callback, opera need delay ,because when exec callback the script not run finished
					}else{
						$J[o.k].push(o.f)//otherwise push to the list ,waiting 
					}
					timer(t.j,50,0,t);//run next
				} else {
					$J[o.k] = [o.f];//push current callback to the list
					a = D.createElement('script')
					a.type='text/javascript';
					a.defer='defer';
					a.charset=o.c;
					a.id='r_s_k_'+xver;
					a.async=U;
					f = function () {
						if (/(?:[4d]|te)$/.test(a.readyState)) {
							clearInterval(t._);
							while ($J[o.k].length) timer($J[o.k].shift(),20);//run callback,ignore exception
							$J[o.k] = U;
							a.onerror = a.onload = null;
							E.removeChild(a);
							timer(runWatch,30);
							timer(t.j,50,0,t);
						}
					};
					if(a.readyState)t._ = timer(f, 50, U);//opera load not exist file bug , use setInterval fix it 
					a.onerror = a.onload = f;
					a[o.x ? 'text' : 'src'] = o.p+(o.x?';document.getElementById("'+a.id+'").onload()':'');//load by code or path
					//in some version firefox , set script text will not exec immediately ,so we set callback function follow the code,when code exec then call our functions
					E.insertBefore(a,E.firstChild);
					//if(o.x)f();//if code run it immediately
				}
			} else {
				delete t.m;
				im(t.f)&&t.f();
			}
		}
	};
	if(ia(C.$w))watchList=watchList.concat(C.$w);
	delete C.$w;
	jse=new JS();
	cache=C.cache;
	//set domain ,globalStorage need it, force the domain 
	tryRun(function(){
		D.domain=main;
        D.domain=main.split('.').slice(-2).join('.');
	});
	engines = {//local storage engine
		'0': {
			_: function () {
				store = W.localStorage;
				return store;
			},
			get: function (key) {
				return store.getItem(key);
			},
			set: function (key, value) {
				store.setItem(key, value);
			},
			del: function (key) {
				store.removeItem(key);
			}
		},
		'2': {
			_: function () {
				store = W.globalStorage[D.domain];
				return store;
			},
			get: function (key) {
				return store.getItem(key).value;
			},
			set: function (key, value) {
				store.setItem(key, value);
			},
			del: function (key) {
				store.removeItem(key);
			}
		},
		'1': {
			_: function () {
				store = E;
				store.addBehavior('#default#userdata');
				return U
			},
			get: function (key) {
				try {
					store.load(key);
					return store.getAttribute(key);
				} catch (ex) {
					return null;
				}
			},
			set: function (key, value) {
				store.load(key);
				//alert(key);
				store.setAttribute(key, value);
				//alert('set '+key);
				store.save(key);
			},
			del: function (key) {
				store.load(key);
				store.expires = new Date(315532799000).toUTCString();
				store.save(key);
			}
		}
	};
	for (var i = 0; i<3; i++) {
		engine = engines[i];
		try {
			if (engine._()) {
				delete engine._;
				break;
			} else {
				tengine = 0;
			}
		} catch (ex) {
			tengine = 0;
		}
	}
	if(!engine){
        engine = {
            get: noop,
            set: noop,
            del: noop
        }
    }
	mix(C,{
		Storage:engine,
		observe:watch,
		DOMAIN:D.domain,
		PATH:curPath.replace(/[^\?#&]+$/,'').replace(/[^\/]+$/,''),//set the bootstrap file path is the require path
		invoke:function(a,i,f,z){
			if(ia(a)){
				for(i=0;i<a.length;i++){
					f=C.invoke(a[i]);
				}
				return f;
			}
			z=C._LCL;
			if(z&&im(z[a])){
				return z[a].apply(z,s.call(arguments,1));
			}
			return false;
		},
		cache:function(key,value){
			/// <param name="key" type="String">cache key,same as file name</param>
			/// <param name="value" type="Function">cache content,is a function</param>
			try {
				value(); //exec succ then cache it,avoid cache a error file and read it next time
				cache&&engine.set(key, C._gfv(key) + ':' + value);
			} catch (ex) {
				log('ex:' + ex.message + '@' + key);
			}
		}
	});
	var vf,getContent=function(f,v){//get cache content
		v=engine.get(f);
		return (v&&new RegExp('^'+C._gfv(f)+':').test(v)&&(v=v.replace(/^[^:]+:/,'')))?v:0;
	},runCode=function(v,cb,host,key){//run code
		//console.log(host);
		(host||jse).r('('+v+'())',cb,U,0,key);
	},runOne=function(host,p,f){//run one file
		//fix path
		if(p===U){
			host.r(p,f);
		}else{
			var idx=p.lastIndexOf('/'),path=idx>-1?p.substring(0,idx+1):'',temp;
			p=p.substring(idx+1);//depart the path and file
			if(path){//if exist path set the path to the current require
				C.PATH=path;
			}
			temp=getContent(p);//get content
			if(temp){
				runCode(temp,f,host,p);
			}else{
				host.r(C._gfs(p),f,0,0,p);
			}
		}
	},runFiles=function(host,p,f){//run more than one files
		if(!ia(p))p=[p];
		for(var idx=0,tal=p.length-1;idx<=tal;idx++){
			runOne(host,p[idx],idx==tal?f:noop);
		}
	},verCallback=function(tmid){//ver ctrl file loaded callback
		if(coreList){//if core file exist
			coreList=coreList.split(',');//maybe more than one
			for(var i=0,cb,core,content,j=coreList.length-1;i<=j;i++){
				core=coreList[i];
				content=getContent(core);
				cb=(i==j?coreCallback:noop);//callback after the last core file loaded
				if(content){//if exist in local storage
					runCode(content,cb,0,core);//run code
				}else{
					jse.r(C._gfs(core),cb,0,0,core);//load from server
				}
			}
			
		}else{
			coreCallback();//callback if no core file
		}
	},coreCallback=function(){//core file callback
		var i,loadRequire=function(z){//load require file
			if(z[2]===U){
				C.PATH=z[0];
			}else{
				runFiles(jse,z[0],z[1]);
			}
		};
		mix(C.wait(function(){
			if(C.$a){//run allReady methods
				tryRun(C.$a);
				delete C.$a;
			}
			runWatch(1)
		}),{//core file ready,the following method can be called
			using:function(p,f){
				loadRequire([p,f]);
				return C;
			},
			wait:function(f){
				loadRequire([U,f]);
				return C
			},
			usePath:function(path){
				C.PATH=path;
				return C;
			},
			coreReady:function(f){
				f();
				return C
			}
		});
		if(C.$c){//core file ready,run coreReady methods
			tryRun(C.$c);
			delete C.$c;
		}
		
		//if(C.$r){
			for(i=0;i<C.$r.length;i++){//core file ready run require file 
				loadRequire(C.$r[i]);
			}
			delete C.$r;
		//}else{
			//requireFinished();
		//}
	};
	vf=getContent(verFile);//get version file 
	if(vf){//exist
		runCode(vf,verCallback,0,verFile);
	}else{
		jse.r(C._gfs(verFile),verCallback,0,0,verFile);//load from server
	}
}(window,document));