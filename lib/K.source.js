/*K project by kooboy_li@163.com*/
Ctrl.cache('K',function () {
	/*
		shortcut
	*/
	var W = window,
	A='length',
    B = 'object',
	C,
    D = W.document,
	E = RegExp,
    F = 'head',
    G,
	H=['mousemove','touchmove'],
	I=['mouseup','touchend'],
    K,
    L,
    M = function (s) {
		/// <summary>to lower case</summary>
		/// <param name="s" type="String">source</param>
		/// <returns type="String" />
		return (s + '').toLowerCase();
    },
    N = 'value',
    P = 'prototype',
    Q = null,
	R = function (f, t, b, g, a,z) {
		/// <summary>delayed exec method</summary>
		/// <param name="f" type="Function">method</param>
		/// <param name="t" type="Integer">milliseconds</param>
		/// <param name="b" type="Boolean">if true then interval else timeout</param>
		/// <param name="g" type="Object">bind obj</param>
		/// <returns type="Integer" />
		a = _q.call(arguments, 4);
		f = _r(f) ? f : _u;
		g = g || this;
		t=t||8;
		z=function(){f.apply(g,a);};
		return b ? W.setInterval(z,t) : W.setTimeout(z,t);
	},
    T = function(t){
		/// <summary>can clear setTimeout or setInterval handle</summary>
		///<param name="t" type="Integer">handle</param>
		W.clearTimeout(t);
		W.clearInterval(t);
	},
    U = true,
    V = false,
    X = '_$_',
    Y = [],
    //$A,
	$F,
    $G = function (y, z, i) {
		/// <summary>helper for K.clone</summary>
		if (B == typeof z || _r(z)) {
			for (i = y[A] - 2; i>=0; i -= 2) {
				if (y[i] == z)return y[i + 1]
			}
			y.push(z, z = K.clone(z, y))
		}
		return z
	},
    $K,
    $L,
    $b,
    //$e,
    $g = /^[\s\xa0\u3000\uFEFF]+|[\s\xa0\u3000\uFEFF]+$/g,
    //$h = /([?|.{}\\()+\-*\/^$\[\]])/g,
    $o = function (g, c) {
    	/// <summary>helper for K.drag</summary>
		//K.log('startDrag move');
    	g = K.evt(g);
    	if (g) {
    		c = K.evtPageXY(g);
    		$u && $v($x, g, c.x - $t.x, c.y - $t.y, c);
    		_c(g)
    	}
    },
    $p = function (e,f) {
    	/// <summary>release drag</summary>
    	/// <param name="e" type="Event">event object</param>
		e=K.evt(e);
		f=(e&&e.touches)||[];
		if(!f[A]){
			K.un(W, 'blur', $p).un(D, H, $o).un(D, I, $p).un($x, 'losecapture', $p).un(D, 'keydown', _c);
			I.f && $x.releaseCapture();//firefox 4 support setCapture and releaseCapture but not as ie
			_r($w) && $w($x,e);
			$x = Q;
			C = Q
		}
    },
    $q = function () {
    	/// <summary>get current time</summary>
    	return (new Date).getTime()
    },
    $r = function (a, b, c, d) {
    	/// <summary>simple tween</summary>
    	return c * a / d + b
    },
    $s, $t, $u, $v, $w, $x,
    $y = !!W.getComputedStyle,
    _c = function (e, w) {
    	/// <summary>cancel event bubble and default</summary>
    	/// <param name="e" type="Event">event object</param>
    	/// <param name="w" type="Window">Window object,IE　event object in Window</param>
    	K.evtPrevent(e, w);
    	K.evtCancel(e, w)
    },
    _d = function (d, e, b) {
    	d = d || D;
		e=d.documentElement;
		b=d.body;
    	L = d.compatMode == 'CSS1Compat' ? e :b;
    	return {
    		scrollX: e.scrollLeft||b.scrollLeft,
    		scrollY: e.scrollTop||b.scrollTop,
    		left: L.clientLeft,
    		top: L.clientTop
    	}
    },
    _e = $q(),
    _g = ($y ? 'css' : 'style') + 'Float',
    _h,
    _i,
    _j = function (a, t) {
    	/// <summary>enlarge typeof</summary>
    	/// <param name="a" type="Object">object</param>
    	/// <returns type="String" />
    	return (t = typeof (a)) == B ? a == Q && Q + '' || M(_p.call(a).slice(8, -1)) : t
    },
    _k = function (d, s, f, r, p, b) {
    	/// <summary>extend object</summary>
    	/// <param name="d" type="Object">desc object</param>
    	/// <param name="s" type="Object">src object</param>
    	/// <param name="f" type="Function">callback while copy one, callback params (sourceValue,key,desObj)</param>
    	/// <returns type="Object" />
    	b = _r(f);
    	if (!d) d = _s(s) ? [] : {};
    	for (p in s) {
    		r = b ? f(s[p], p, d) : U;
    		if (r) d[p] = s[p]
    	}
    	return d
    },
    _l = function () {
    	/// <summary>empty method</summary>
    },
    /*_n = function (m, a, c) {
    	return a ? m : $e +  c
    },*/
    _o = W.XMLHttpRequest,
    _p = Object[P].toString,
    _q = Array[P].slice,
    _r = function (a) {
    	/// <summary>judge is method</summary>
    	/// <param name="a" type="Object">param</param>
    	/// <returns type="Boolean" />
    	return _j(a) == $c;
    },
    _s = function (a) {
    	/// <summary>judge is array</summary>
    	/// <param name="a" type="Object">param</param>
    	/// <returns type="Boolean" />
    	return _j(a) == $d
    },
    _t=function(a){
		/// <summary></summary>
		return a&&a[A]&&_j(a)!=$f&&!a.nodeType
	},
	_u = function () {
		/// <summary>empty method</summary>
	},
	_w = 'on',
	$ = {},
	$c = _j(M),
    $d = _j(Y),
    $f = _j(P),
    _v = _j($g),
    Z;
	K = function (v, a, s,d) {
		/// <summary>create or get DOM node</summary>
		/// <param name="v" type="String|Object">DOM node or node id or create tag name</param>
		/// <param name="a" type="Object">extend attributes</param>
		/// <param name="s" type="Object">extend styles</param>
		/// <returns type="HTMLElement|Null" />
		if (typeof (v) != B) v = (d || D)[a || s ? 'createElement' : 'getElementById'](v);
		a && K.nodeAttr(v, a);
		s && K.nodeStyle(v, s);
		try {
			return v
		} finally {
			v = Q
		}
	};
	_k(K, {
		e: _w,
		fn: _u,
		type: _j,
		mix: _k,
		stopDrag: $p,
		now: $q,
		evtHalt: _c,
		evtStop:_c,
		isArr: _s,
		isFn: _r,
		timer:R,
		clsTimer:T,
		strTrim: function (s,r) {
			/// <summary>trim or trim by regexp</summary>
			/// <param name="s" type="String">src string</param>
			/// <param name="r" type="String|RegExp">trim str or regexp</param>
			/// <returns type="String" />
			return K.strSwap(s,r||$g)
		},
		/*strOwn: function (s,p) {
			/// <summary>detect contains the str or regexp</summary>
			/// <param name="s" type="String">src string</param>
			/// <param name="p" type="String|RegExp">string or regexp</param>
			/// <returns type="String" />
			return (K.isReg(p) ? p : new E(K.strSwap(p + '',$h, '\\$1'))).test(s+'')
		},*/
		strSize: function (s) {
			/// <summary>byte length</summary>
			/// <param name="s" type="String">src length</param>
			/// <returns type="Integer" />
			return K.strSwap(s,/[^\x00-\xff]/g, _w)[A]
		},
		strCode: function (s,f) {
			/// <summary>use encodeURIComponent or decodeURIComponent</summary>
			/// <param name="s" type="String">src string</param>
			/// <param name="f" type="Boolean"></param>
			/// <returns type="String" />
			return W[(f ? 'de' : 'en') + 'codeURIComponent'](s+'')
		},
		strSwap: function (s,p,v, b, i, l) {
			/// <summary>enhance replace</summary>
			/// <param name="s" type="String">src string</param>
			/// <param name="p" type="String|RegExp|Array">str,regexp or array</param>
			/// <param name="v" type="Array|String|Function">array,str or callback</param>
			/// <returns type="String" />
			s = s+'';
			i = -1;
			l = arguments[A] == 2;
			if (_s(p)) {
				b = _s(v);
				while (++i < p[A]) s = s.replace(p[i], b && i < v[A] ? v[i] : l ? '' : v)
			} else s = s.replace(p, l ? '' : v);
			return s
		},
		strFormat: function (s,d,a) {
			/// <summary>format string ,can use {0} or {username}</summary>
			/// <param name="s" type="String">src string</param>
			/// <param name="d" type="Object">when use {username} pass json,d is json object</param>
			/// <returns type="String" />
			s = s+'';
			if (K.isObj(d)) a = d;
			else a=_q.call(arguments,1)
			s = s.replace(/{(\w+)}/g, function (b, c) {
				return a[c]
			});
			return s
		},
		strHTML:function(s,f){
			/// <summary>encode or decode html string</summary>
			/// <param name="s" type="String">src string</param>
			/// <param name="f" type="Boolean">is decode</param>
			/// <returns type="String" />
			return K.strSwap(s ,f ? [/&lt;/g, /&gt;/g, /&quot;/g, /&amp;/g] : [/&/g, /"/g, /</g, />/g], f ? ['<', '>', '"', '&'] : ['&amp;', '&quot;', '&lt;', '&gt;']);
		},
		log: function () {
			/// <summary>log</summary>
			var a = W.console, b = arguments;
			if (a && a.log) a.log.apply ? a.log.apply(a, b) : a.log(_q.call(b))
		},
		logTime: function (a) {
			/// <summary>log time</summary>
			if (M[a]) {
				K.log(a + ':' + ($q() - M[a]) + 'ms');
				delete M[a]
			} else {
				M[a] = $q()
			}
		},
		isInsof: function (a, b, r) {
			/// <summary>detect the obj is another type</summary>
			/// <param name="a" type="Object">obj</param>
			/// <param name="b" type="Clazz">clazz</param>
			/// <returns type="Boolean" />
			try {
				r = a instanceof b
			} catch (e) { };
			return r
		},
		isUndef: function (a) {
			/// <summary>judge is undefined</summary>
			/// <param name="a" type="Object">param</param>
			/// <returns type="Boolean" />
			return a === Z;
		},
		isObj: function (a) {
			/// <summary>judge is object</summary>
			/// <param name="a" type="Object">param</param>
			/// <returns type="Boolean" />
			return _j(a) == B;
		},
		isStr: function (a) {
			/// <summary>judge is string</summary>
			/// <param name="a" type="Object">param</param>
			/// <returns type="Boolean" />
			return _j(a) == $f
		},
		isReg: function (a) {
			/// <summary>judge is regexp</summary>
			/// <param name="a" type="Object">param</param>
			/// <returns type="Boolean" />
			return _j(a) == _v
		},
		id: function () {
			/// <summary>get a unique id</summary>
			/// <returns type="String" />
			return 'K' + _e++
		},
		test: function () {
			/// <summary>like prototype.js tryThese,but reurn the method not result</summary>
			/// <returns type="Function" />
			var r = arguments, b = 0, l = r[A];
			for (; b < l; b++) {
				try {
					r[b]();
					return r[b];
				} catch (e) {
					K.log('K.test', e);
				}
			}
			return _u
		},
		clone: function (o, y, c, p) {
			/// <summary>clone a object</summary>
			/// <param name="o" type="Object">src obj</param>
			/// <returns type="Object" />
			y || (y = []);
			if (!o || (!_r(o) && typeof o != B)) return o;
			else if (o[p = 'cloneNode']) return o[p](U);
			else if (_r(o)) c = new Function('return ' + o)(); //clone function eval in cur env,Funtion in global
			else c = (p = o.constructor, c = new p(o.valueOf()), o == c) ? new p() : c; //clone others,recognize the cloned and src is equal then pass or not params,array not pass params
			y.push(o,c);
			for (p in o) if ($.hasOwnProperty.call(o,p)) c[p] = $G(y, o[p]);//use $o.hasOwnProperty avoid obj o rewrite the hasOwnProperty method
			return c
		},
		clsPage: function () {
			/// <summary>clear select zone</summary>
			$s ? K.test($s) : $s = K.test(function () {
				W.getSelection().removeAllRanges()
			}, function () {
				D.selection.empty()
			}, function () {
				D.selection = Q
			})
		},
		equal: function (b, c, f, i, l) {
			/// <summary>judge is equal,detect array own value is equal</summary>
			/// <param name="b" type="Object">first param</param>
			/// <param name="c" type="Object">second param</param>
			/// <param name="f" type="Boolean">use ===</param>
			/// <returns type="Boolean" />
			if (b === c) return U;
			if (_s(b) && _s(c) && (l = b[A]) == c[A]) {
				for (i = 0; i < l; i++) if (!K.equal(b[i], c[i], f)) return V;
				return U
			}
			return f ? b == c : b === c
		},
		bind: function (f, o, a) {
			/// <summary>bind method to object</summary>
			/// <param name="f" type="Function">method</param>
			/// <param name="o" type="Object">obj</param>
			/// <returns type="Function" />
			a = _q.call(arguments, 2);
			f=_r(f)?f:_u;
			return function () {
				return f.apply(o || this, a.concat(_q.call(arguments)))
			}
		},
		body: function (d,a) {
			/// <summary>get current page view width or scroll bar Y pos</summary>
			/// <param name="d" type="HTMLDocumentElement">doc</param>
			/// <returns type="Object" />
			a= _d(d);
			return _k({
				pageWidth: L.scrollWidth,
				pageHeight: Math.max(L.scrollHeight, L.clientHeight),
				viewWidth: L.clientWidth,
				viewHeight: L.clientHeight
			},a);
		},
		clazz: function (c, p, f, y, z) {
			/// <summary>crete a class</summary>
			/// <param name="c" type="Object|Function">base class or the methods obj</param>
			/// <param name="p" type="Object|Function">obj or callback</param>
			/// <returns type="Function" />
			f = function () {
				var t = this, p, b = arguments, a = b.callee[P];
				for (p in a) if (!_r(a[p])) t[p] = K.clone(a[p]);
				return t.ctor.apply(t, b);
			};
			y = _r(c) ? (/*_k(f,c),*/z = _l[P] = c[P], new _l) : _k({}, z = c); //
			if(_r(p))p=p(z,y,f,c);
			p && _k(y, p);
			y.ctor = y.ctor || _u;
			y.constructor = f;
			f[P] = y;
			return f
		},
		object: function (n, b, w, i, p) {
			/// <summary>create or get object</summary>
			/// <param name="n" type="String">like 'K.Gameboy.Tetris' string</param>
			/// <param name="b" type="Boolean">if true get then create object</param>
			/// <param name="w" type="Object">context</param>
			/// <returns type="Object" />
			w = w || W;
			n = (n + '').split('.');
			for (i = 0; i < n[A]; i++) {
				p = n[i];
				if (!w[p]) {
					if (b) {
						w = Q;
						break
					}
					w[p] = {}
				}
				w = w[p]
			}
			return w
		},
		tags: function (n, o, f, r, a, i, j,l,b) {
			/// <summary>get the elements by tag names</summary>
			/// <param name="n" type="String">tag names</param>
			/// <param name="o" type="String|HTMLElement">in what node</param>
			/// <param name="f" type="Function">filter callback</param>
			/// <returns type="HTMLCollection" />
			a = K(o) || D;
			r=[];
			if(a.getElementsByTagName){
				n=_s(n)?n:[n];
				j=-1;
				b=_r(f);
				z:while(n[++j]){
					i=a.getElementsByTagName(n[j]);
					if(b||n[A]>1){
						l=-1;
						while(i[++l]){
							try{
								(b?f(i[l]):r)&&r.push(i[l]);
							}catch(e){
								if(e==_w)break z;
								K.log(e,f,i[l]);
							}
						}
					}else{
						r=i
					}
				}
			}
			return r
		},
		Evt: {
			fireEvt: function (a, c, b, d, f, g) {
				/// <summary>fire event</summary>
				/// <param name="a" type="String">event name</param>
				/// <param name="c" type="Object">event params</param>
				/// <param name="b" type="Boolean">if true,delete event listen</param>
				/// <returns type="This" />
				d = this;
				a = M(a);
				if (!c) c = {};
				c.sender=d;
				c.type = a;
				if (_s(f = d[f = X + a])) {
					for (g = 0; f[g]; g++) {
						try {
							f[g](c,d)
						} catch (e) {
							if (e == _w) break;
							K.log('fireEvt:', e, f[g])
						}
					}
				}
				_r(d[f = _w + a]) && d[f](c, d);
				b && d.clsEvt(a)
			},
			on: function (a, c, b, i) {
				/// <summary>add event listen</summary>
				/// <param name="a" type="String">event name</param>
				/// <param name="c" type="Function">callback</param>
				/// <returns type="This" /> 
				b = this;
				a = K.isArr(a) ? a : [a];
				while (a[A]) {
					i = M(a.pop());
					(b[i = X + i] || (b[i] = [])).push(c);
				}
				return b
			},
			un: function (a, c) {
				/// <summary>remove event listen</summary>
				/// <param name="a" type="String">event name</param>
				/// <param name="c" type="Function">callback</param>
				/// <returns type="This" /> 
				a = K.isArr(a) ? a : [a];
				while (a[A]) {
					K.arrRemove(this[X + M(a.pop())], c);
				}
				return this
			},
			clsEvt: function (a, t) {
				/// <summary>clear one event listen</summary>
				/// <param name="a" type="String">event name</param>
				/// <returns type="This" /> 
				t = this;
				a = M(a);
				delete t[X + a];
				delete t[_w + a]
			}
		}
	});
	_k(K, {
		arrFind: function (a, o, i, z) {
			/// <summary>find the first item in array,if not find reuturn -1</summary>
			/// <param name="a" type="Array">the array</param>
			/// <param name="o" type="Object">the item</param>
			/// <returns type="Integer" />
			i = -1;
			if (_s(a)) {
				for (z = 0; z < a[A]; z++) {
					if (K.equal(a[z], o)) {
						i = z;
						break;
					}
				}
			}
			return i
		},
		arrRemove: function (a, o, i) {
			/// <summary>remove item from array</summary>
			/// <param name="a" type="Array">the array</param>
			/// <param name="o" type="Object">the item</param>
			/// <returns type="Array" />
			i = K.arrFind(a, o);
			i > -1 && a.splice(i, 1);
			return a
		},
		arrInsert: function (a, o, i) {
			/// <summary>insert item to array</summary>
			/// <param name="a" type="Array">the array</param>
			/// <param name="o" type="Object">insert item</param>
			/// <param name="i" type="Integer">insert position</param>
			/// <returns type="Array" />
			if (_s(a)) a.splice(isNaN(i) ? a[A] : i, 0, o);
			return a
		},
		nodeAttr: function (a, v, b, k, c) {
			/// <summary>get or set node attributes</summary>
			/// <param name="a" type="String|HTMLElement|Array">node or node ids</param>
			/// <param name="v" type="String|Object">if v is string then get else set the v object attrs</param>
			/// <param name="b" type="Boolean">if true then delete the attr,the v must a string</param>
			/// <returns type="K|String|Null" />
			if (K.isStr(v)){
				k = (a = K(a)) ? a.getAttribute(v) : Q;
				b && a && a.removeAttribute(v);
				return k
			}
			a = _t(a) ? a : [a];
			b=a[A];
			while (b--) {
				c = K(a[b]);
				if (c) {
					for (k in v) c.setAttribute(k, v[k]);
				}
			}
			return K
		},
		nodeDoc: function (a) {
			/// <summary>get the node document</summary>
			/// <param name="a" type="String|HTMLElement">node or node id</param>
			/// <returns type="HTMLDocumentElement|Null" />
			a = K(a);
			return a && (a.ownerDocument || a.document) || Q
		},
		nodeBound: function (v, a) {
			/// <summary>get node bound</summary>
			/// <param name="v" type="String|HTMLElement">node or node id</param>
			/// <param name="a" type="String|HTMLElement">offset parent</param>
			/// <returns type="Object" />
			var l = 0,
            w = 0,
            h = 0,
            t = 0,
            p = K(v),
            o, r;
			if (p) {
				a = K(a);
				w = p.offsetWidth;
				h = p.offsetHeight;
				if (p.getBoundingClientRect && !(a || K.nodeIn(p, a))) {
					r = p.getBoundingClientRect();
					o = _d(K.nodeDoc(p));
					l = r.left + o.scrollX - o.left;
					t = r.top + o.scrollY - o.top;
				} else for (; p && p != a; l += p.offsetLeft || 0, t += p.offsetTop || 0, p = p.offsetParent) { }
			}
			return {
				x: l,
				y: t,
				width: w,
				height: h
			}
		},
		nodeStyle: function (v, c, d,l) {
			/// <summary>get or set node style</summary>
			/// <param name="v" type="String|HTMLElement|Array">node or node ids</param>
			/// <param name="c" type="String|Object"> if !c return style object,if c is string reutrn style[c] else add the styles</param>
			/// <returns type="K|String|Null" />
			if (!c || K.isStr(c)) {
				v = K(v);
				if (v) {
					d = v.style[c];
					if (!d) {
						d = $y ? K.nodeDoc(v).defaultView.getComputedStyle(v, Q) : v.currentStyle;
						if (c && c == 'float') {
							c = _g;
						}
						d = c ? d[c] : d;
					}
				}
				return d;
			}
			v = _t(v) ? v : [v];
			l=v[A];
			while (l--) {
				d = K(v[l]);
				d && _k(d.style, c, function (x, y, o) {
					if (y == 'opacity' && !$y) {
						o.zoom = 1;
						o.filter = K.strSwap(o.filter || '',/alpha\([^)]*\)/i) + (x == 1 ? '' : 'alpha(opacity=' + x * 100 + ')');
					} else if (y == 'float') {
						o[_g] = x;
						return V
					}
					return U;
				});
			}
			return K;
		},
		nodeClean: function (a, v,n, m,i) {
			/// <summary>clear empty node and comment</summary>
			/// <param name="a" type="String|HTMLElement|Array">node or node ids</param>
			/// <returns type="K" />
			a=_t(a) ? a : [a];
			i=a[A]
			while(i--){
				v=K(a[i]);
				if (v) {
					n = v.firstChild;
					while (n) {
						m = n.nextSibling;
						if (n.nodeType == 8 || (n.nodeType == 3 && !K.strTrim(n.nodeValue))) K.nodeDel(n);
						else K.nodeClean(n);
						n = m
					}
				}
			}
			return K
		},
		nodeVal: function (a, b, v,i) {
			/// <summary>get or set node value</summary>
			/// <param name="a" type="String|HTMLElement|Array">node or node ids</param>
			/// <param name="b" type="String">if !b get else set</param>
			/// <returns type="String|Null|K" />
			if (arguments[A] == 1) return (a = K(a)) ? (M(a.tagName) == 'li' || !(N in a) ? a.innerHTML : a[N]) : '';
			a = _t(a) ? a : [a];
			i=a[A]
			while (i--) {
				v = K(a[i]);
				if (v) v[M(v.tagName) != 'li' && N in v ? N : 'innerHTML'] = b + ''
			}
			return K
		},
		nodeDel: function (a, v,i) {
			/// <summary>delete node</summary>
			/// <param name="a" type="String|HTMLElement|Array">node or node ids</param>
			/// <returns type="K" />
			a = _t(a) ? a : [a];
			i=a[A];
			while (i--) {
				v = K(a[i]);
				if (v && v.parentNode) {
					v.parentNode.removeChild(v)
				}
			}
			return K
		},
		nodeClass: function (a, b,c,d,v,r,e,i) {
			/// <summary>add or delete node class</summary>
			/// <param name="a" type="String|HTMLElement|Array">node or node ids</param>
			/// <param name="b" type="String">class name</param>
			/// <param name="c" type="Boolean|String">if true delete class,else is string swap the class name</param>
			/// <returns type="K" />
			r = new E('(?:^|\\s+)' + b + '(?:\\s+|$)');
			a = _t(a) ? a : [a];
			i = a[A];
			e = K.isStr(c);
			while(i--){
				v=K(a[i]);
				if(v){
					d = v.className;
					v.className = K.strTrim(c || e?K.strSwap(d, r, e?' '+c+' ':' '):d += r.test(d) ? '' : ' ' + b)
				}
			}
			return K
		},
		nodeIn: function (a, b, r) {
			/// <summary>node a is in node b</summary>
			/// <param name="a" type="String|HTMLElement">node a</param>
			/// <param name="b" type="String|HTMLElement">node b</param>
			/// <returns type="Boolean" />
			a = K(a); b = K(b);
			if (a && b) {
				if (a != b) try { r = b.contains ? b.contains(a) : b.compareDocumentPosition(a) & 16 } catch (e) { r = V }
				else r = U;
			}
			return r
		},
		mouseInout: function (a, e, w) {
			/// <summary>judge mouse is in or out node a</summary>
			/// <param name="e" type="Event">event object</param>
			/// <param name="w" type="Window">Window object</param>
			/// <returns type="Boolean" />
			e=K.evt(e,w);
			return e ? !K.nodeIn(e.relatedTarget || e[(/out$/.test(e.type) ? 'to' : 'from') + 'Element'], a) : V
		},
		startDrag: function (o, r, h, e) {
			/// <summary>drag element,the element position is absolute</summary>
			/// <param name="o" type="String|HTMLElement">node or node id</param>
			/// <param name="r" type="Function">move callback(o,e,fx,fy,xy)</param>
			/// <param name="h" type="Functio">move end(o,e)</param>
			/// <param name="e" type="Event">event object</param>
			if ((o = K(o)) && (e = K.evt(e))) {
				//e.halt();
				K.clsPage();
				//_c(e); why?
				C=e.touches;
				C=C?C[0]:Q;
				$t = K.evtPageXY(e);
				$u = _r(r);
				$v = r;
				$w = h;
				$x = o;
				if(!$y && o.setCapture){
					I.f=U;
					o.setCapture()
				}
				K.on(D, H, $o).on(D, I, $p).on(W, 'blur', $p).on(o, 'losecapture', $p).on(D, 'keydown', _c)
			}
		},
		on: function (m, n, f, b, e, v,z,y) {
			/// <summary>add DOM event listen</summary>
			/// <param name="m" type="String|HTMLElement|Array">node or node ids</param>
			/// <param name="n" type="String|Array">event name</param>
			/// <param name="f" type="Function">listen method</param>
			/// <returns type="K" />
			if (_r(f)) {
				m = _t(m) ? m : [m];
				n=_s(n)?n:[n];
				y=m[A];
				while (y--) {
					v = K(m[y]);
					if (v) {
						z=n[A];
						while(z--){
							!e && (b ? K.arrRemove : K.arrInsert)(Y, [v, n[z], f]);
							if (v.addEventListener) {
								b ? v.removeEventListener(n[z], f, V) : v.addEventListener(n[z], f, V)
							} else if (v.attachEvent) {
								b ? v.detachEvent(_w + n[z], f) : v.attachEvent(_w + n[z], f)
							} else {
								v[_w + n[z]] = b ? Q : f
							}
						}
					}
				}
			}
			return K
		},
		un: function (m, n, f, e) {
			/// <summary>remove DOM event listen</summary>
			/// <param name="m" type="String|HTMLElement|Array">node or node ids</param>
			/// <param name="n" type="String">event name</param>
			/// <param name="f" type="Function">listen method</param>
			/// <returns type="K" />
			return K.on(m, n, f, U, e)
		},
		evt: function (e, w, c, i, f) {
			/// <summary>get event object</summary>
			/// <param name="e" type="Event">event object</param>
			/// <param name="w" type="Window">Window object</param>
			e = e || (w || W).event;
			if (!e) {
				c = K.evt;
				i = 32;
				try {
					while (i-- && c.caller) c = c.caller;
					if (K.isInsof(f = c.arguments[0], Event)) e = f
				} catch (x) { }
			}
			return e
		},
		evtCancel: function (e, w) {
			/// <summary>cancel bubble</summary>
			/// <param name="e" type="Event">event object</param>
			/// <param name="w" type="Window">Window object</param>
			e = K.evt(e, w);
			if (e) e.stopPropagation ? e.stopPropagation() : e.cancelBubble = U
		},
		evtPrevent: function (e, w) {
			/// <summary>prevent default</summary>
			/// <param name="e" type="Event">event object</param>
			/// <param name="w" type="Window">Window object</param>
			e = K.evt(e, w);
			if (e) e.preventDefault ? e.preventDefault() : e.returnValue = V
		},
		evtPageXY: function (e, w, f, p, b) {
			/// <summary>event page xy</summary>
			/// <param name="e" type="Event">event object</param>
			/// <param name="w" type="Window">Window object</param>
			e = K.evt(e, w);
			if (e) {
				p=e.targetTouches;
				if(!C&&p)b=p[p[A]-1];
				e=C||b||e;
				b = W.isNaN(e.pageX);
				if(b) p=_d();
				f = {
					x: b ? e.clientX + p.scrollX - p.left : e.pageX,
					y: b ? e.clientY + p.scrollY - p.top : e.pageY
				}
			} else {
				f = { x: 0, y: 0 }
			}
			return f
		},
		evtTarget: function (e, w, f) {
			/// <summary>get event target</summary>
			/// <param name="e" type="Event">event object</param>
			/// <param name="w" type="Window">Window object</param>
			e = K.evt(e, w);
			if (e) {
				f = e.target || e.srcElement;
				while (f && f.nodeType == 3) f = f.parentNode;
			}
			return f
		},
		evtHitest:function(e,w){
			/// <summary></summary>
			/// <param name="" type=""></param>
			/// <param name="" type=""></param>
			e=K.evt(e,w);
			return e?((w=e.touches)&&w[A]==1)||e.which==1||(!e.which&&e.button==1):V
		},
		evtClean: function (m) {
			/// <summary>clean event cache</summary>
			for (; m = Y.pop(); ) {
				m.push(U);
				K.un.apply(K, m);
				m[0] = Q
			}
			$j = Y = Q
		},
		run: function () {
			/// <summary>run js file or code</summary>
			$b = $b || new (K.JS);
			$b.run.apply($b,arguments)
		},
		/*go: function (a, v) {
			/// <summary>执行当前js文件所在script标签内的js代码</summary>
			/// <returns type="K" />
			a = K.tags('script');
			a = a[a[A] - 1];
			v = K.strTrim(K.nodeVal(a));
			if (!$e) $e = K.strSwap(a.src,/[^\/]+$/);
			if (v) K.timer(K.run,0,0,K,v, Q, U);
			return K
		},*/
		/*path: function (f) {
			/// <summary>get or set run JS path</summary>
			/// <param name="f" type="String">if f set else get</param>
			/// <returns type="String" />
			return f ? $e = f : $e;
		},*/
		invoke:function(f,o,i,a,r){
			/// <summary>run method by string</summary>
			a=_q.call(arguments,1);
			o=K.object(f,U);
			r=Q;
			if(o){
				i=f.lastIndexOf('.');
				r=o.apply(K.object(f.substring(0,i),U),a);
			}
			return r
		},
		lock: function (a,b) { 
			/// <summary>lock</summary> 
			/// <param name="a" type="Function">lock key</param> 
			/// <param name="b" type="Function">method</param> 
			if(!_d[a]){
				_d[a]=b;
				_r(b)&&b()
			}
		}, 
		unlock: function (a) { 
			/// <summary>unlock</summary> 
			/// <param name="a" type="Function">lock key</param> 
			delete _d[a];
		}, 
		XHR: K.clazz(K.Evt, {
			send: function (p, b, o, m, t) {
				/// <summary>send request</summary>
				/// <param name="p" type="Object">config object</param>
				/// <param name="b" type="Boolean">is insert to list head</param>
				t = this;
				o = _k({
					url: _w,
					un: Q,
					pw: Q,
					timeout: 30000,
					start:_u,
					fail: _u,
					succ: _u,
					done: _u,
					data: '',
					method: p&&p.data ? 'POST' : 'GET',
					async: U
				}, p);
				_k(o,{
					_f: _h || (_h = function (s) { try { this.fail(s) } catch (e) { K.log(e, this.fail) } }),
					_e: _i || (_i = function (s) { try { this.done(t.z) } catch (e) { s = e } this._f(s) })
				});
				o[F] = _k({ "Content-Type": "application/x-www-form-urlencoded" }, o[F]);
				K.arrInsert(t.q || (t.q = []), o, b ? Q : 0);
				!t.z && t.x()
			},
			x: function (t, r, p, f,h) {
				/// <summary>request</summary>
				t = this;
				r = t.q.pop();
				if (r) {
					r.start();
					if (!t.z) {
						try {
							t.z = _o ? new _o : new W.ActiveXObject('Microsoft.XMLHTTP');
						} catch (e) {
							t.n();
							return r._e('unsupport');
						}
					}
					t.v = R(function () {
						t.n();
						r._e('timeout');
						t.z.abort()
					}, r.timeout);
					t.z.open(r.method, r.url, r.async, r.un, r.pw);
					for (p in r[F]) t.z.setRequestHeader(p, r[F][p]);
					f = function (s) {
						if (t.z.readyState == 4 && (s = t.z.status)) {
							t.n();
							try {
								r.done(t.z);
								/2\d{2}|304/.test(s) ? r.succ(t.z) : r.fail(s)
							} catch (e) {
								r._f(e)
							}
						}
					};
					if (r.async) t.z.onreadystatechange = f;
					t.z.send(r.data);
					if (!r.async) f()
				} else {
					t.stop()
				}
			},
			n: function (t) {
				/// <summary>next one</summary>
				t = this;
				t.c();
				t.w=R(t.x, 50, V, t)
			},
			c: function (f, o, t) {
				/// <summary>clear</summary>
				t = this;
				T(t.v);
				if (t.z) {
					t.z.onreadystatechange = _u;
				}
				if (f) {
					t.z && t.z.abort();
					delete t.z;
					/*if(t.e && t.q){
						for (t.e(f, f); o = t.q.pop(); ) o._e(f);
					}*/
				}
			},
			stop: function (f,t) {
				/// <summary>stop all request</summary>
				/// <param name="f" type="Boolean">is not fire end event</param>
				t=this;
				T(t.w);
				t.q=[];
				t.c(U);
				!f && t.fireEvt('end');
			}/*,
			halt:function(f,t){
				t=this;
				t.q=[];
				t.e=V;
				t.stop(f);
			}*/
		}),
		TM: K.clazz({//time meter 计时器
			ctor: function (p, b) {
				/// <summary>constructor method</summary>
				/// <param name="p" type="Integer">interval milliseconds</param>
				b = this;
				p = p || 13;
				if(!$[p]){
					b.l = [];
					b.p = p;
					b.c = function (i) {
						for (i = 0; b.l[i]; i++)
							try {
								b.l[i]()
							} catch (e) {
								K.log(e, b.l[i])
							}
					}
					$[p]=b;
				}
				return $[p];
			},
			on: function (f, b) {
				/// <summary>add callback</summary>
				/// <param name="f" type="Function">callback</param>
				b = this;
				b.l.push(f);
				if (!b.h) b.h = R(b.c, b.p, U)
			},
			un: function (f, b) {
				/// <summary>remove callback</summary>
				/// <param name="f" type="Function">callback</param>
				b = this;
				K.arrRemove(b.l, f);
				if (!b.l[A]) {
					T(b.h);
					delete b.h
				}
			}
		}),
		FX: K.clazz(K.Evt, {
			ctor: function (f,p, t) {
				/// <summary>constructor method</summary>
				/// <param name="f" type="Function">ani ALG method</param>
				t = this;
				if (!t.g || f) {
					f = _r(f) ? f : $r;
					t.g = function (b, c) {
						return f(t.t, b, c - b, t.a)
					}
				}
				if(!t.z)t.z = new K.TM(p)
			},
			run: function (m, c, p, f, t) {
				/// <summary>add a ani</summary>
				/// <param name="m" type="Integer">keep time</param>
				/// <param name="c" type="Function">callback(fx,param)</param>
				/// <param name="p" type="Object">callback param</param>
				/// <param name="f" type="Function">ALG</param>
				t = this;
				(t.q || (t.q = [])).push([m, c, f, p]);
				!t.m && t.n()
			},
			n: function (t, o) {
				/// <summary>process next</summary>
				t = this;
				t.o = o = t.q && t.q.shift();
				if (o) {
					t.ctor(o[2]);
					t.c = _r(o[1]) ? o[1] : _u;
					t.a = o[0] || 1000;
					t.d = $q();
					!t.m && t.z.on(t.m = function (f) {
						t.t = $q() - t.d;
						if (t.t > t.a) f = t.t = t.a;
						try {
							t.c(t.g, t.o[3])
						} catch (e) {
							K.log(f = e, t.c)
						}
						f && t.n()
					});
				} else {
					t.stop();
				}
			},
			stop: function (f, t) {
				/// <summary>stop ani</summary>
				/// <param name="f" type="Boolean">is not fire end event</param>
				t = this;
				if (t.m && t.z) {
					t.z.un(t.m);
					delete t.m;
				}
				!f && t.fireEvt('end');
			}
		}),
		JS: K.clazz(K.Evt, {
			run: function (p,t) {
				/// <summary>run js file or code</summary>
				t = this;
				t.q || (t.q = []);
				t.q.push(_k({
					url:Q,//load url
					code:Q,//exec code 
					jsonp:Q,// jsonp call back name
					start:_u,//start function
					done:_u,//done function
					timeout:3E4,//timeout
					charset:'UTF-8'
				},p));
				!t.m && t.j()
			},
			j: function (o, t, f, a,id) {
				/// <summary>run next</summary>
				t = this;
				o = t.q.shift();
				if (!t.m) t.m = D.documentElement;
				if (o) {
					o.start();
					if(o.jsonp){
						o.x=K.id();
						K.JS[o.x]=function(){
							o.done.apply(o,arguments);
							o.x=Q;
							T(o.g);
						}
					}
					if ($o[o.url]) {
						$o[o.url] == U ? R(o.done) : $o[o.url].push(o.done);
						R(t.j, 50, V, t)
					} else {
						if (o.url&&!o.jsonp) $o[o.url] = [o.done];
						a = K('script', {
							type: 'text/javascript',
							defer: 'defer',
							id:id=K.id(),
							charset: o.charset
						});
						a.async = U;
						f = function (z) {
							if (z!=A&&/(?:[4d]|te)$/.test(a.readyState)) {
								z=U;
							}
							if(z){
								if (o.code) {
									R(o.done)
								} else if(o.jsonp) {
									if(z!=U){
										K.JS[o.x]=_u;
										o.done('timeout');
									}else{
										if(o.x)o.g=R(o.done,30,0,o,'fail');
									}
								}else{
									while ($o[o.url][A]) R($o[o.url].shift(),0,0,o);
									$o[o.url] = U;
								}
								T(t._);
								T(t.$);
								a.onerror = a.onload = Q;
								K.nodeDel(a);
								R(t.j, 50, V, t)
							}
						};
						if(a.readyState)
						t._ = R(f, 50, U);
						a.onerror = a.onload = f;
						a[o.code ? 'text' : 'src'] =o.code? o.code+';K("'+id+'").onload()':o.url+(o.x?[/\?/.test(o.url)?'&':'?',o.jsonp,'=K.JS.',o.x].join(''):'');
						t.m.insertBefore(a,t.m.firstChild);
						t.$=R(f,o.timeout,V,t,A);//time out
					}
				} else {
					delete t.m;
					t.fireEvt('end')
				}
			}
		}),
		TP: {
			fix: function (s, f) {
				/// <summary>fix</summary>
				/// <param name="s" type="String">src string</param>
				/// <param name="f" type="Boolean">ignore backslash</param>
				/// <returns type="String" />
				return K.strSwap(s,[new E("("+ (f ? "" : "\\\\|") + "')", "g"), /"/g], ['\\$1', '&quot;'])
			},
			using: function (a, c, b, d) {
				/// <summary>using templet</summary>
				/// <param name="a" type="String|HTMLElement">node or node id or src string</param>
				/// <param name="c" type="String">sub templet key</param>
				b = (d = K(a)) ? a : _t[a] || (_t[a] = K.id()); //if node get node id as key else generate one
				$F = [b, c].join('$'); //generate unique key to cache result
				if (!$G[$F]) {//not exist
					G = d ? K.nodeVal(a) : a; //is node ,get value
					G = K.strSwap(G,/\s+/g, ' '); //trim blank
					if (G && c) {//exist templet and sub templet 
						G = G.match(new E(K.strFormat('<{0}>([\\s\\S]*?)</{0}>',c))); //get sub templet
						if (!G) throw 'no tpl:' + c; //not exist
						G = G[1]; //use sub templet
					}
				}
				return this
			},
			getFilled: function (d,a) {
				/// <summary>get the filled string</summary>
				/// <param name="d" type="Object">src data</param>
				d=d||{};
				try {
					if (!$G[$F]) {
						a = { s: "var _=[];_.push('" + K.strSwap(G,
							$K = $K || [/\s+/g,/<#/g,/;*#>/g,/\\(?=[^\r\n]*\n)/g,/\\/g,/\t/g, /'(?=[^\r\n]*\n)/g, /'/g, /\t/g, /\r=([^\n]+)\n/g, /\r/g, /\n/g, /([{;]);/g], 
							$L = $L || [" ", "\r", "\n","\t","\\\\","\\", "\t", "\\'", "'", "',$1,'", "');", ";_.push('", "$1"]) + "');return _.join('')" }
						a.f = new Function(this.KEY, a.s);
						$G[$F] = a
					} else {
						a = $G[$F]
					}
					G = '';
					return a.f(d)
				} catch (e) {
					return ['ex:',e.message,'src:',K.strHTML(a.s)].join('');
				}
			},
			toFill: function (a, b) {
				/// <summary>fill node</summary>
				/// <param name="a" type="String|HTMLElement|Array">node or node ids</param>
				/// <param name="b" type="Object">data</param>
				K.nodeVal(a, this.getFilled(b))
			},
			KEY: 'cx'
		}
	});
	W.K = K.on(W, 'unload', K.evtClean)//;//.go()
});