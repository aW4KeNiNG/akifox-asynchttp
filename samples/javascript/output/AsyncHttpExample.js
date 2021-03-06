(function (console) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var AsyncHttpExample = function() { };
AsyncHttpExample.__name__ = ["AsyncHttpExample"];
AsyncHttpExample.setContent = function(id,content) {
	var d = window.document.getElementById(id);
	if(d == null) js_Browser.alert("Unknown element : " + id);
	d.innerHTML = content;
};
AsyncHttpExample.main = function() {
	com_akifox_asynchttp_AsyncHttp.logEnabled = true;
	new com_akifox_asynchttp_HttpRequest({ url : "test.html", callback : function(response) {
		if(response.get_isOK()) AsyncHttpExample.setContent("asynchttp-text",response.get_content()); else AsyncHttpExample.setContent("asynchttp-text","ERROR -> " + response.get_status());
	}}).send();
	new com_akifox_asynchttp_HttpRequest({ url : "test.xml", callback : function(response1) {
		if(response1.get_isOK()) {
			AsyncHttpExample.setContent("asynchttp-xml-print",StringTools.htmlEscape(response1.get_content()));
			AsyncHttpExample.setContent("asynchttp-xml-code",response1.get_content());
		} else AsyncHttpExample.setContent("asynchttp-xml","ERROR -> " + response1.get_status());
	}}).send();
	new com_akifox_asynchttp_HttpRequest({ url : "test.js", callback : function(response2) {
		if(response2.get_isOK()) {
			AsyncHttpExample.setContent("asynchttp-js-print",response2.get_content());
			AsyncHttpExample.setContent("asynchttp-js-code",response2.get_content());
		} else AsyncHttpExample.setContent("asynchttp-js-print","ERROR -> " + response2.get_status());
	}}).send();
};
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = ["EReg"];
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.__name__ = ["Lambda"];
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
var List = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype = {
	iterator: function() {
		return new _$List_ListIterator(this.h);
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
_$List_ListIterator.__name__ = ["_List","ListIterator"];
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
Math.__name__ = ["Math"];
var Reflect = function() { };
Reflect.__name__ = ["Reflect"];
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
var Std = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,addChar: function(c) {
		this.b += String.fromCharCode(c);
	}
	,addSub: function(s,pos,len) {
		if(len == null) this.b += HxOverrides.substr(s,pos,null); else this.b += HxOverrides.substr(s,pos,len);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = ["StringTools"];
StringTools.htmlEscape = function(s,quotes) {
	s = s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
	if(quotes) return s.split("\"").join("&quot;").split("'").join("&#039;"); else return s;
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null; else return js_Boot.getClass(o);
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
var Xml = function(nodeType) {
	this.nodeType = nodeType;
	this.children = [];
	this.attributeMap = new haxe_ds_StringMap();
};
Xml.__name__ = ["Xml"];
Xml.parse = function(str) {
	return haxe_xml_Parser.parse(str);
};
Xml.createElement = function(name) {
	var xml = new Xml(Xml.Element);
	if(xml.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + xml.nodeType);
	xml.nodeName = name;
	return xml;
};
Xml.createPCData = function(data) {
	var xml = new Xml(Xml.PCData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createCData = function(data) {
	var xml = new Xml(Xml.CData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createComment = function(data) {
	var xml = new Xml(Xml.Comment);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createDocType = function(data) {
	var xml = new Xml(Xml.DocType);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createProcessingInstruction = function(data) {
	var xml = new Xml(Xml.ProcessingInstruction);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) throw new js__$Boot_HaxeError("Bad node type, unexpected " + xml.nodeType);
	xml.nodeValue = data;
	return xml;
};
Xml.createDocument = function() {
	return new Xml(Xml.Document);
};
Xml.prototype = {
	set: function(att,value) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		this.attributeMap.set(att,value);
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + this.nodeType);
		return this.attributeMap.exists(att);
	}
	,addChild: function(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		if(x.parent != null) x.parent.removeChild(x);
		this.children.push(x);
		x.parent = this;
	}
	,removeChild: function(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element or Document but found " + this.nodeType);
		if(HxOverrides.remove(this.children,x)) {
			x.parent = null;
			return true;
		}
		return false;
	}
	,__class__: Xml
};
var com_akifox_asynchttp__$AsyncHttp_HttpTransferMode = { __ename__ : true, __constructs__ : ["UNDEFINED","FIXED","CHUNKED"] };
com_akifox_asynchttp__$AsyncHttp_HttpTransferMode.UNDEFINED = ["UNDEFINED",0];
com_akifox_asynchttp__$AsyncHttp_HttpTransferMode.UNDEFINED.toString = $estr;
com_akifox_asynchttp__$AsyncHttp_HttpTransferMode.UNDEFINED.__enum__ = com_akifox_asynchttp__$AsyncHttp_HttpTransferMode;
com_akifox_asynchttp__$AsyncHttp_HttpTransferMode.FIXED = ["FIXED",1];
com_akifox_asynchttp__$AsyncHttp_HttpTransferMode.FIXED.toString = $estr;
com_akifox_asynchttp__$AsyncHttp_HttpTransferMode.FIXED.__enum__ = com_akifox_asynchttp__$AsyncHttp_HttpTransferMode;
com_akifox_asynchttp__$AsyncHttp_HttpTransferMode.CHUNKED = ["CHUNKED",2];
com_akifox_asynchttp__$AsyncHttp_HttpTransferMode.CHUNKED.toString = $estr;
com_akifox_asynchttp__$AsyncHttp_HttpTransferMode.CHUNKED.__enum__ = com_akifox_asynchttp__$AsyncHttp_HttpTransferMode;
var com_akifox_asynchttp_ContentKind = { __ename__ : true, __constructs__ : ["XML","JSON","IMAGE","TEXT","BYTES"] };
com_akifox_asynchttp_ContentKind.XML = ["XML",0];
com_akifox_asynchttp_ContentKind.XML.toString = $estr;
com_akifox_asynchttp_ContentKind.XML.__enum__ = com_akifox_asynchttp_ContentKind;
com_akifox_asynchttp_ContentKind.JSON = ["JSON",1];
com_akifox_asynchttp_ContentKind.JSON.toString = $estr;
com_akifox_asynchttp_ContentKind.JSON.__enum__ = com_akifox_asynchttp_ContentKind;
com_akifox_asynchttp_ContentKind.IMAGE = ["IMAGE",2];
com_akifox_asynchttp_ContentKind.IMAGE.toString = $estr;
com_akifox_asynchttp_ContentKind.IMAGE.__enum__ = com_akifox_asynchttp_ContentKind;
com_akifox_asynchttp_ContentKind.TEXT = ["TEXT",3];
com_akifox_asynchttp_ContentKind.TEXT.toString = $estr;
com_akifox_asynchttp_ContentKind.TEXT.__enum__ = com_akifox_asynchttp_ContentKind;
com_akifox_asynchttp_ContentKind.BYTES = ["BYTES",4];
com_akifox_asynchttp_ContentKind.BYTES.toString = $estr;
com_akifox_asynchttp_ContentKind.BYTES.__enum__ = com_akifox_asynchttp_ContentKind;
var com_akifox_asynchttp_AsyncHttp = function() {
};
com_akifox_asynchttp_AsyncHttp.__name__ = ["com","akifox","asynchttp","AsyncHttp"];
com_akifox_asynchttp_AsyncHttp.log = function(message,fingerprint) {
	if(fingerprint == null) fingerprint = "";
	if(com_akifox_asynchttp_AsyncHttp.logEnabled) console.log("" + fingerprint + " INFO: " + message);
	return message;
};
com_akifox_asynchttp_AsyncHttp.error = function(message,fingerprint,throwError) {
	if(throwError == null) throwError = false;
	if(fingerprint == null) fingerprint = "";
	if(com_akifox_asynchttp_AsyncHttp.logErrorEnabled) console.log("" + fingerprint + " ERROR: " + message);
	if(throwError) throw new js__$Boot_HaxeError("AsyncHttp Error: " + message);
	return message;
};
com_akifox_asynchttp_AsyncHttp.determineContentKind = function(contentType) {
	var contentKind = com_akifox_asynchttp_ContentKind.BYTES;
	var _g = 0;
	var _g1 = com_akifox_asynchttp_AsyncHttp.CONTENT_KIND_MATCHES;
	while(_g < _g1.length) {
		var el = _g1[_g];
		++_g;
		if(el.regex.match(contentType)) {
			contentKind = el.kind;
			break;
		}
	}
	return contentKind;
};
com_akifox_asynchttp_AsyncHttp.determineIsBinary = function(contentKind) {
	if(contentKind == com_akifox_asynchttp_ContentKind.BYTES || contentKind == com_akifox_asynchttp_ContentKind.IMAGE) return true;
	return false;
};
com_akifox_asynchttp_AsyncHttp.prototype = {
	send: function(request) {
		if(request.get_finalised()) {
			com_akifox_asynchttp_AsyncHttp.error("Unable to send the request: it was already sent before\n" + "To send it again you have to clone it before.",request.get_fingerprint(),true);
			return;
		}
		request.finalise();
		this.httpViaHaxeHttp(request);
	}
	,callback: function(request,time,url,headers,status,content,error) {
		if(error == null) error = "";
		headers.finalise();
		var response = new com_akifox_asynchttp_HttpResponse(request,time,url,headers,status,content,error);
		if(request.get_callbackError() != null && !response.get_isOK()) (request.get_callbackError())(response); else if(request.get_callback() != null) (request.get_callback())(response);
		response = null;
	}
	,httpViaHaxeHttp: function(request) {
		var _g = this;
		if(request == null) return;
		var start = haxe_Timer.stamp();
		var url = request.get_url();
		var status = 0;
		var headers = new com_akifox_asynchttp_HttpHeaders();
		var content = null;
		var r = new haxe_Http(url.toString());
		r.async = request.get_async();
		if(request.get_content() != null) r.setPostData(Std.string(request.get_content()));
		var httpstatusDone = false;
		r.onError = function(msg) {
			var errorMessage = com_akifox_asynchttp_AsyncHttp.error("Request failed -> " + msg,request.get_fingerprint(),null);
			var time = _g.elapsedTime(start);
			_g.callback(request,time,url,headers,status,content,errorMessage);
		};
		r.onData = function(data) {
			if(!httpstatusDone) status = 200;
			var time1 = _g.elapsedTime(start);
			content = haxe_io_Bytes.ofString(data);
			com_akifox_asynchttp_AsyncHttp.log("Response Complete " + status + " (" + time1 + " s)\n> " + request.get_method() + " " + Std.string(request.get_url()),request.get_fingerprint());
			_g.callback(request,time1,url,headers,status,content,null);
		};
		r.onStatus = function(http_status) {
			status = http_status;
			com_akifox_asynchttp_AsyncHttp.log("Response HTTP Status " + status,request.get_fingerprint());
			httpstatusDone = true;
		};
		r.request(request.get_content() != null);
	}
	,elapsedTime: function(start) {
		return Std["int"]((haxe_Timer.stamp() - start) * 1000) / 1000;
	}
	,randomUID: function(size) {
		if(size == null) size = 32;
		var nchars = com_akifox_asynchttp_AsyncHttp.UID_CHARS.length;
		var uid = new StringBuf();
		var _g = 0;
		while(_g < size) {
			var i = _g++;
			uid.addChar((function($this) {
				var $r;
				var index = Std.random(nchars);
				$r = HxOverrides.cca(com_akifox_asynchttp_AsyncHttp.UID_CHARS,index);
				return $r;
			}(this)));
		}
		return uid.b;
	}
	,__class__: com_akifox_asynchttp_AsyncHttp
};
var com_akifox_asynchttp_HttpHeaders = function(headers) {
	this._finalised = false;
	this._headers = new haxe_ds_StringMap();
	if(headers == null) return;
	console.log(Type.getClassName(Type.getClass(headers)));
	var _g = Type.getClassName(Type.getClass(headers));
	switch(_g) {
	case "com.akifox.asynchttp.HttpHeaders":case "HttpHeaders":
		var $it0 = (js_Boot.__cast(headers , com_akifox_asynchttp_HttpHeaders)).keys();
		while( $it0.hasNext() ) {
			var key = $it0.next();
			this.add(key,(js_Boot.__cast(headers , com_akifox_asynchttp_HttpHeaders)).get(key));
		}
		break;
	default:
		var _g1 = 0;
		var _g2 = Reflect.fields(headers);
		while(_g1 < _g2.length) {
			var key1 = _g2[_g1];
			++_g1;
			var value = Reflect.getProperty(headers,key1);
			this.add(key1,value);
		}
	}
};
com_akifox_asynchttp_HttpHeaders.__name__ = ["com","akifox","asynchttp","HttpHeaders"];
com_akifox_asynchttp_HttpHeaders.validateRequest = function(header) {
	if(header == null) return false;
	if((function($this) {
		var $r;
		var x = header.toLowerCase();
		$r = HxOverrides.indexOf(com_akifox_asynchttp_HttpHeaders.FORBIDDEN_ON_REQUEST,x,0);
		return $r;
	}(this)) >= 0) return false;
	return true;
};
com_akifox_asynchttp_HttpHeaders.prototype = {
	get_finalised: function() {
		return this._finalised;
	}
	,toString: function() {
		return "[HttpHeaders <" + this._headers.toString() + ">]";
	}
	,clone: function() {
		return new com_akifox_asynchttp_HttpHeaders(this);
	}
	,finalise: function() {
		this._finalised = true;
	}
	,keys: function() {
		return this._headers.keys();
	}
	,exists: function(key) {
		return this._headers.exists(key);
	}
	,get: function(key) {
		if(this._headers.exists(key)) return this._headers.get(key);
		return "";
	}
	,add: function(key,value) {
		if(this._finalised) {
			if(com_akifox_asynchttp_AsyncHttp.logErrorEnabled) console.log("" + "" + " ERROR: " + "HttpHeaders.add() -> Can't add an header. This HttpHeaders object is immutable");
			"HttpHeaders.add() -> Can't add an header. This HttpHeaders object is immutable";
			return this;
		}
		{
			this._headers.set(key,value);
			value;
		}
		return this;
	}
	,remove: function(key) {
		if(key == null) return this;
		if(this._finalised) {
			if(com_akifox_asynchttp_AsyncHttp.logErrorEnabled) console.log("" + "" + " ERROR: " + "HttpHeaders.remove() -> Can't remove an header. This HttpHeaders object is immutable");
			"HttpHeaders.remove() -> Can't remove an header. This HttpHeaders object is immutable";
			return this;
		}
		this._headers.remove(key);
		return this;
	}
	,__class__: com_akifox_asynchttp_HttpHeaders
	,__properties__: {get_finalised:"get_finalised"}
};
var com_akifox_asynchttp_HttpMethod = function() { };
com_akifox_asynchttp_HttpMethod.__name__ = ["com","akifox","asynchttp","HttpMethod"];
com_akifox_asynchttp_HttpMethod.validate = function(value) {
	if(value == null || HxOverrides.indexOf(com_akifox_asynchttp_HttpMethod.METHODS,value,0) == -1) value = "GET";
	return value;
};
var com_akifox_asynchttp_HttpRequest = function(options) {
	this._callbackError = null;
	this._callback = null;
	this._contentIsBinary = false;
	this._contentType = "application/x-www-form-urlencoded";
	this._content = null;
	this._method = "GET";
	this._url = null;
	this._http11 = true;
	this._async = true;
	this._timeout = 10;
	this._headers = new com_akifox_asynchttp_HttpHeaders();
	this._finalised = false;
	this._fingerprint = new com_akifox_asynchttp_AsyncHttp().randomUID(8);
	if(options != null) {
		if(options.async != null) this.set_async(options.async);
		if(options.http11 != null) this.set_http11(options.http11);
		if(options.url != null) this.set_url(options.url);
		if(options.callback != null) this.set_callback(options.callback);
		if(options.callbackError != null) this.set_callbackError(options.callbackError);
		if(options.headers != null) this._headers = options.headers.clone();
		if(options.timeout != null) this.set_timeout(options.timeout);
		if(options.method != null) this.set_method(options.method);
		if(options.content != null) this.set_content(options.content);
		if(options.contentType != null) this.set_contentType(options.contentType);
		if(options.contentIsBinary != null) this.set_contentIsBinary(options.contentIsBinary);
	}
};
com_akifox_asynchttp_HttpRequest.__name__ = ["com","akifox","asynchttp","HttpRequest"];
com_akifox_asynchttp_HttpRequest.prototype = {
	get_finalised: function() {
		return this._finalised;
	}
	,toString: function() {
		return "[HttpRequest <" + this._fingerprint + "> (" + this._method + " " + Std.string(this._url) + ")]";
	}
	,clone: function() {
		return new com_akifox_asynchttp_HttpRequest({ async : this._async, http11 : this._http11, url : this._url, callback : this._callback, headers : this._headers, timeout : this._timeout, method : this._method, content : this._content, contentType : this._contentType, contentIsBinary : this._contentIsBinary});
	}
	,finalise: function() {
		this._headers.finalise();
		this._finalised = true;
	}
	,send: function() {
		new com_akifox_asynchttp_AsyncHttp().send(this);
	}
	,get_fingerprint: function() {
		return this._fingerprint;
	}
	,get_headers: function() {
		return this._headers;
	}
	,set_headers: function(value) {
		if(this._finalised) {
			if(com_akifox_asynchttp_AsyncHttp.logErrorEnabled) console.log("" + this._fingerprint + " ERROR: " + "HttpRequest.headers -> Can't modify a property when the instance is already sent");
			throw new js__$Boot_HaxeError("AsyncHttp Error: " + "HttpRequest.headers -> Can't modify a property when the instance is already sent");
			"HttpRequest.headers -> Can't modify a property when the instance is already sent";
			return this._headers;
		}
		return this._headers = value;
	}
	,get_timeout: function() {
		return this._timeout;
	}
	,set_timeout: function(value) {
		if(this._finalised) {
			if(com_akifox_asynchttp_AsyncHttp.logErrorEnabled) console.log("" + this._fingerprint + " ERROR: " + "HttpRequest.timeout -> Can't modify a property when the instance is already sent");
			throw new js__$Boot_HaxeError("AsyncHttp Error: " + "HttpRequest.timeout -> Can't modify a property when the instance is already sent");
			"HttpRequest.timeout -> Can't modify a property when the instance is already sent";
			return this._timeout;
		}
		if(value < 1) value = 1;
		return this._timeout = value;
	}
	,get_async: function() {
		return this._async;
	}
	,set_async: function(value) {
		if(this._finalised) {
			if(com_akifox_asynchttp_AsyncHttp.logErrorEnabled) console.log("" + this._fingerprint + " ERROR: " + "HttpRequest.async -> Can't modify a property when the instance is already sent");
			throw new js__$Boot_HaxeError("AsyncHttp Error: " + "HttpRequest.async -> Can't modify a property when the instance is already sent");
			"HttpRequest.async -> Can't modify a property when the instance is already sent";
			return this._async;
		}
		return this._async = value;
	}
	,get_http11: function() {
		return this._http11;
	}
	,set_http11: function(value) {
		if(this._finalised) {
			if(com_akifox_asynchttp_AsyncHttp.logErrorEnabled) console.log("" + this._fingerprint + " ERROR: " + "HttpRequest.http11 -> Can't modify a property when the instance is already sent");
			throw new js__$Boot_HaxeError("AsyncHttp Error: " + "HttpRequest.http11 -> Can't modify a property when the instance is already sent");
			"HttpRequest.http11 -> Can't modify a property when the instance is already sent";
			return this._http11;
		}
		return this._http11 = value;
	}
	,get_url: function() {
		return this._url;
	}
	,set_url: function(value) {
		var v = null;
		var _g = Type.getClassName(Type.getClass(value));
		switch(_g) {
		case "String":
			v = new com_akifox_asynchttp_URL(value);
			break;
		case "com.akifox.asynchttp.URL":case "URL":
			v = value.clone();
			break;
		default:
			if(com_akifox_asynchttp_AsyncHttp.logErrorEnabled) console.log("" + this._fingerprint + " ERROR: " + "HttpRequest.url -> Please specify an URL Object or a String");
			throw new js__$Boot_HaxeError("AsyncHttp Error: " + "HttpRequest.url -> Please specify an URL Object or a String");
			"HttpRequest.url -> Please specify an URL Object or a String";
			return this._url;
		}
		if(this._finalised) {
			if(com_akifox_asynchttp_AsyncHttp.logErrorEnabled) console.log("" + this._fingerprint + " ERROR: " + "HttpRequest.url -> Can't modify a property when the instance is already sent");
			throw new js__$Boot_HaxeError("AsyncHttp Error: " + "HttpRequest.url -> Can't modify a property when the instance is already sent");
			"HttpRequest.url -> Can't modify a property when the instance is already sent";
			return this._url;
		}
		return this._url = v;
	}
	,get_method: function() {
		return this._method;
	}
	,set_method: function(value) {
		if(this._finalised) {
			if(com_akifox_asynchttp_AsyncHttp.logErrorEnabled) console.log("" + this._fingerprint + " ERROR: " + "HttpRequest.method -> Can't modify a property when the instance is already sent");
			throw new js__$Boot_HaxeError("AsyncHttp Error: " + "HttpRequest.method -> Can't modify a property when the instance is already sent");
			"HttpRequest.method -> Can't modify a property when the instance is already sent";
			return this._method;
		}
		value = com_akifox_asynchttp_HttpMethod.validate(value);
		return this._method = value;
	}
	,get_content: function() {
		return this._content;
	}
	,set_content: function(value) {
		if(this._finalised) {
			if(com_akifox_asynchttp_AsyncHttp.logErrorEnabled) console.log("" + this._fingerprint + " ERROR: " + "HttpRequest.content -> Can't modify a property when the instance is already sent");
			throw new js__$Boot_HaxeError("AsyncHttp Error: " + "HttpRequest.content -> Can't modify a property when the instance is already sent");
			"HttpRequest.content -> Can't modify a property when the instance is already sent";
			return this._content;
		}
		return this._content = value;
	}
	,get_contentType: function() {
		return this._contentType;
	}
	,set_contentType: function(value) {
		if(this._finalised) {
			if(com_akifox_asynchttp_AsyncHttp.logErrorEnabled) console.log("" + this._fingerprint + " ERROR: " + "HttpRequest.contentType -> Can't modify a property when the instance is already sent");
			throw new js__$Boot_HaxeError("AsyncHttp Error: " + "HttpRequest.contentType -> Can't modify a property when the instance is already sent");
			"HttpRequest.contentType -> Can't modify a property when the instance is already sent";
			return this._contentType;
		}
		if(value == null) value = "application/x-www-form-urlencoded";
		this._contentIsBinary = com_akifox_asynchttp_AsyncHttp.determineIsBinary(com_akifox_asynchttp_AsyncHttp.determineContentKind(value));
		return this._contentType = value;
	}
	,get_contentIsBinary: function() {
		return this._contentIsBinary;
	}
	,set_contentIsBinary: function(value) {
		if(this._finalised) {
			if(com_akifox_asynchttp_AsyncHttp.logErrorEnabled) console.log("" + this._fingerprint + " ERROR: " + "HttpRequest.contentIsBinary -> Can't modify a property when the instance is already sent");
			throw new js__$Boot_HaxeError("AsyncHttp Error: " + "HttpRequest.contentIsBinary -> Can't modify a property when the instance is already sent");
			"HttpRequest.contentIsBinary -> Can't modify a property when the instance is already sent";
			return this._contentIsBinary;
		}
		return this._contentIsBinary = value;
	}
	,get_callback: function() {
		return this._callback;
	}
	,set_callback: function(value) {
		if(this._finalised) {
			if(com_akifox_asynchttp_AsyncHttp.logErrorEnabled) console.log("" + this._fingerprint + " ERROR: " + "HttpRequest.callback -> Can't modify a property when the instance is already sent");
			throw new js__$Boot_HaxeError("AsyncHttp Error: " + "HttpRequest.callback -> Can't modify a property when the instance is already sent");
			"HttpRequest.callback -> Can't modify a property when the instance is already sent";
			return this._callback;
		}
		return this._callback = value;
	}
	,get_callbackError: function() {
		return this._callbackError;
	}
	,set_callbackError: function(value) {
		if(this._finalised) {
			if(com_akifox_asynchttp_AsyncHttp.logErrorEnabled) console.log("" + this._fingerprint + " ERROR: " + "HttpRequest.callbackError -> Can't modify a property when the instance is already sent");
			throw new js__$Boot_HaxeError("AsyncHttp Error: " + "HttpRequest.callbackError -> Can't modify a property when the instance is already sent");
			"HttpRequest.callbackError -> Can't modify a property when the instance is already sent";
			return this._callbackError;
		}
		return this._callbackError = value;
	}
	,__class__: com_akifox_asynchttp_HttpRequest
	,__properties__: {set_callbackError:"set_callbackError",get_callbackError:"get_callbackError",set_callback:"set_callback",get_callback:"get_callback",set_contentIsBinary:"set_contentIsBinary",get_contentIsBinary:"get_contentIsBinary",set_contentType:"set_contentType",get_contentType:"get_contentType",set_content:"set_content",get_content:"get_content",set_method:"set_method",get_method:"get_method",set_url:"set_url",get_url:"get_url",set_http11:"set_http11",get_http11:"get_http11",set_async:"set_async",get_async:"get_async",set_timeout:"set_timeout",get_timeout:"get_timeout",get_headers:"get_headers",get_fingerprint:"get_fingerprint",get_finalised:"get_finalised"}
};
var com_akifox_asynchttp_HttpResponse = function(request,time,url,headers,status,content,error) {
	this._error = null;
	this._filename = null;
	this._request = request;
	this._time = time;
	this._url = url;
	this._status = status;
	this._isOK = this._status >= 200 && this._status < 400;
	this._headers = headers;
	this._error = error;
	if(!this._isOK && this._status != 0) this._error = com_akifox_asynchttp_HttpResponse._httpStatus.h[this._status];
	if(this._headers.exists("content-type")) this._contentType = this._headers.get("content-type"); else this._contentType = "text/plain";
	this._contentKind = com_akifox_asynchttp_AsyncHttp.determineContentKind(this._contentType);
	this._contentIsBinary = com_akifox_asynchttp_AsyncHttp.determineIsBinary(this._contentKind);
	this._contentRaw = content;
	if(!this._contentIsBinary) this._content = this.toText(); else this._content = this._contentRaw;
	this._contentLength = 0;
	if(this._headers.exists("content-length")) this._contentLength = Std.parseInt(this._headers.get("content-length")); else if(content != null) this._contentLength = this._content.length;
};
com_akifox_asynchttp_HttpResponse.__name__ = ["com","akifox","asynchttp","HttpResponse"];
com_akifox_asynchttp_HttpResponse.prototype = {
	toString: function() {
		return "[HttpResponse <" + this._request.get_fingerprint() + "> (isOK=" + Std.string(this._isOK) + ", status=" + this._status + ", length=" + this._contentLength + " bytes in " + this._time + " sec), error=" + this._error + "]";
	}
	,get_isBinary: function() {
		return this._contentIsBinary;
	}
	,get_isText: function() {
		return !this._contentIsBinary;
	}
	,get_isXml: function() {
		return this._contentKind == com_akifox_asynchttp_ContentKind.XML;
	}
	,get_isJson: function() {
		return this._contentKind == com_akifox_asynchttp_ContentKind.JSON;
	}
	,get_isImage: function() {
		return this._contentKind == com_akifox_asynchttp_ContentKind.IMAGE;
	}
	,toXml: function() {
		var _contentXml = null;
		try {
			_contentXml = Xml.parse(this.toText());
		} catch( msg ) {
			if (msg instanceof js__$Boot_HaxeError) msg = msg.val;
			com_akifox_asynchttp_AsyncHttp.error("HttpResponse.toXml() -> " + Std.string(msg),this._request.get_fingerprint(),null);
		}
		return _contentXml;
	}
	,toJson: function() {
		var _contentJson = null;
		try {
			_contentJson = JSON.parse(this.toText());
		} catch( msg ) {
			if (msg instanceof js__$Boot_HaxeError) msg = msg.val;
			com_akifox_asynchttp_AsyncHttp.error("HttpResponse.toJson() -> " + Std.string(msg),this._request.get_fingerprint(),null);
		}
		return _contentJson;
	}
	,toText: function() {
		var _contentText = null;
		try {
			_contentText = Std.string(this._contentRaw);
		} catch( msg ) {
			if (msg instanceof js__$Boot_HaxeError) msg = msg.val;
			com_akifox_asynchttp_AsyncHttp.error("HttpResponse.toText() -> " + Std.string(msg),this._request.get_fingerprint(),null);
		}
		return _contentText;
	}
	,get_request: function() {
		return this._request;
	}
	,get_fingerprint: function() {
		return this._request.get_fingerprint();
	}
	,get_url: function() {
		return this._url;
	}
	,get_urlString: function() {
		return this._url.toString();
	}
	,get_headers: function() {
		return this._headers;
	}
	,get_status: function() {
		return this._status;
	}
	,get_content: function() {
		return this._content;
	}
	,get_contentRaw: function() {
		return this._contentRaw;
	}
	,get_contentType: function() {
		return this._contentType;
	}
	,get_contentIsBinary: function() {
		return this._contentIsBinary;
	}
	,get_contentLength: function() {
		return this._contentLength;
	}
	,get_time: function() {
		return this._time;
	}
	,get_filename: function() {
		if(this._filename == null) {
			var filename = "";
			var rx = new EReg("([^?/]*)($|\\?.*)","");
			if(rx.match(this._url.toString())) filename = rx.matched(1);
			if(filename == "") filename = "unknown";
			this._filename = filename;
		}
		return this._filename;
	}
	,get_isOK: function() {
		return this._isOK;
	}
	,get_error: function() {
		return this._error;
	}
	,__class__: com_akifox_asynchttp_HttpResponse
	,__properties__: {get_error:"get_error",get_isOK:"get_isOK",get_filename:"get_filename",get_time:"get_time",get_contentLength:"get_contentLength",get_contentIsBinary:"get_contentIsBinary",get_contentType:"get_contentType",get_contentRaw:"get_contentRaw",get_content:"get_content",get_status:"get_status",get_headers:"get_headers",get_urlString:"get_urlString",get_url:"get_url",get_fingerprint:"get_fingerprint",get_request:"get_request",get_isImage:"get_isImage",get_isJson:"get_isJson",get_isXml:"get_isXml",get_isText:"get_isText",get_isBinary:"get_isBinary"}
};
var com_akifox_asynchttp_URL = function(urlString) {
	this._querystring = "";
	this._resource = "";
	this._port = "";
	this._host = "";
	this._protocol = "";
	this.regexURL = new EReg("^([a-z]+:|)(//[^/\\?:]+|)(:\\d+|)([^\\?]*|)(\\?.*|)","i");
	this._urlString = urlString;
	if(this.regexURL.match(urlString)) {
		var _this = this.regexURL.matched(1);
		this._protocol = HxOverrides.substr(_this,0,-1);
		if(this._protocol == null) this._protocol = "";
		var _this1 = this.regexURL.matched(2);
		this._host = HxOverrides.substr(_this1,2,null);
		if(this._host == null) this._host = "";
		this._port = this.regexURL.matched(3);
		if(this._port == null) this._port = "";
		this._resource = this.regexURL.matched(4);
		if(this._resource == null) this._resource = "";
		this._querystring = this.regexURL.matched(5);
		if(this._querystring == null) this._querystring = "";
	}
};
com_akifox_asynchttp_URL.__name__ = ["com","akifox","asynchttp","URL"];
com_akifox_asynchttp_URL.prototype = {
	toString: function() {
		return "" + this.get_protocol() + this._host + this._port + this._resource + this._querystring;
	}
	,clone: function() {
		return new com_akifox_asynchttp_URL(this.toString());
	}
	,merge: function(url) {
		if(this._protocol == "") this._protocol = url._protocol;
		if(this._host == "") this._host = url._host;
		if(this._port == "") this._port = url._port;
		this._resource = this.mergeResources(this._resource,url._resource);
		return this;
	}
	,mergeResources: function(resNew,resOriginal) {
		if(resOriginal == null) resOriginal = "";
		var result;
		var levels;
		if(HxOverrides.substr(resNew,0,1) == "/") levels = resNew.split("/"); else {
			levels = resOriginal.split("/");
			levels.pop();
			levels = levels.concat(resNew.split("/"));
		}
		var finish = false;
		do {
			var loop = levels.length;
			var i = 0;
			while(true) {
				if(levels[i] == "..") {
					if(i > 0) levels.splice(i - 1,2); else levels.shift();
					break;
				}
				i++;
				if(i >= loop) {
					finish = true;
					break;
				}
			}
		} while(!finish);
		result = levels.join("/");
		if(HxOverrides.substr(result,0,1) != "/") result = "/" + result;
		return result;
	}
	,get_isSsl: function() {
		return this._protocol == "https";
	}
	,get_isHttp: function() {
		return HxOverrides.substr(this._protocol,0,4) == "http";
	}
	,get_isRelative: function() {
		return this._protocol == "" || this._host == "";
	}
	,get_protocol: function() {
		if(this._protocol != "") return "" + this._protocol + "://";
		return "";
	}
	,get_port: function() {
		if(this._port == "") {
			if(this.get_isHttp() && !this.get_isSsl()) return 80; else if(this.get_isHttp() && this.get_isSsl()) return 443; else return 0;
		} else return Std.parseInt(HxOverrides.substr(this._port,1,null));
	}
	,get_host: function() {
		return this._host;
	}
	,get_resource: function() {
		if(this._resource == "") return "/";
		return this._resource;
	}
	,get_querystring: function() {
		return this._querystring;
	}
	,__class__: com_akifox_asynchttp_URL
	,__properties__: {get_querystring:"get_querystring",get_resource:"get_resource",get_host:"get_host",get_port:"get_port",get_protocol:"get_protocol",get_isRelative:"get_isRelative",get_isHttp:"get_isHttp",get_isSsl:"get_isSsl"}
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = ["haxe","IMap"];
var haxe_Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
haxe_Http.__name__ = ["haxe","Http"];
haxe_Http.prototype = {
	setPostData: function(data) {
		this.postData = data;
		return this;
	}
	,request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js_Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s;
			try {
				s = r.status;
			} catch( e ) {
				if (e instanceof js__$Boot_HaxeError) e = e.val;
				s = null;
			}
			if(s != null) {
				var protocol = window.location.protocol.toLowerCase();
				var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
				var isLocal = rlocalProtocol.match(protocol);
				if(isLocal) if(r.responseText != null) s = 200; else s = 404;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var _g_head = this.params.h;
			var _g_val = null;
			while(_g_head != null) {
				var p;
				p = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				if(uri == null) uri = ""; else uri += "&";
				uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e1 ) {
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var _g_head1 = this.headers.h;
		var _g_val1 = null;
		while(_g_head1 != null) {
			var h1;
			h1 = (function($this) {
				var $r;
				_g_val1 = _g_head1[0];
				_g_head1 = _g_head1[1];
				$r = _g_val1;
				return $r;
			}(this));
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,__class__: haxe_Http
};
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
haxe__$Int64__$_$_$Int64.__name__ = ["haxe","_Int64","___Int64"];
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Timer = function() { };
haxe_Timer.__name__ = ["haxe","Timer"];
haxe_Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
haxe_ds_IntMap.__name__ = ["haxe","ds","IntMap"];
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	__class__: haxe_ds_IntMap
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,toString: function() {
		var s = new StringBuf();
		s.b += "{";
		var keys = this.arrayKeys();
		var _g1 = 0;
		var _g = keys.length;
		while(_g1 < _g) {
			var i = _g1++;
			var k = keys[i];
			if(k == null) s.b += "null"; else s.b += "" + k;
			s.b += " => ";
			s.add(Std.string(__map_reserved[k] != null?this.getReserved(k):this.h[k]));
			if(i < keys.length) s.b += ", ";
		}
		s.b += "}";
		return s.b;
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
haxe_io_Bytes.__name__ = ["haxe","io","Bytes"];
haxe_io_Bytes.ofString = function(s) {
	var a = [];
	var i = 0;
	while(i < s.length) {
		var c = StringTools.fastCodeAt(s,i++);
		if(55296 <= c && c <= 56319) c = c - 55232 << 10 | StringTools.fastCodeAt(s,i++) & 1023;
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe_io_Bytes(new Uint8Array(a).buffer);
};
haxe_io_Bytes.prototype = {
	getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_Error = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.toString = $estr;
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.toString = $estr;
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.toString = $estr;
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; $x.toString = $estr; return $x; };
var haxe_io_FPHelper = function() { };
haxe_io_FPHelper.__name__ = ["haxe","io","FPHelper"];
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var haxe_xml_Parser = function() { };
haxe_xml_Parser.__name__ = ["haxe","xml","Parser"];
haxe_xml_Parser.parse = function(str,strict) {
	if(strict == null) strict = false;
	var doc = Xml.createDocument();
	haxe_xml_Parser.doParse(str,strict,0,doc);
	return doc;
};
haxe_xml_Parser.doParse = function(str,strict,p,parent) {
	if(p == null) p = 0;
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = str.charCodeAt(p);
	var buf = new StringBuf();
	var escapeNext = 1;
	var attrValQuote = -1;
	while(!(c != c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				buf.addSub(str,start,p - start);
				var child = Xml.createPCData(buf.b);
				buf = new StringBuf();
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			} else if(c == 38) {
				buf.addSub(str,start,p - start);
				state = 18;
				escapeNext = 13;
				start = p + 1;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child1 = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw new js__$Boot_HaxeError("Expected <![CDATA[");
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw new js__$Boot_HaxeError("Expected <!DOCTYPE");
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) throw new js__$Boot_HaxeError("Expected <!--"); else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw new js__$Boot_HaxeError("Expected node name");
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) throw new js__$Boot_HaxeError("Expected node name");
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				nsubs++;
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				break;
			case 62:
				state = 9;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				var tmp;
				if(start == p) throw new js__$Boot_HaxeError("Expected attribute name");
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw new js__$Boot_HaxeError("Duplicate attribute");
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected =");
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				buf = new StringBuf();
				state = 8;
				start = p + 1;
				attrValQuote = c;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected \"");
			}
			break;
		case 8:
			switch(c) {
			case 38:
				buf.addSub(str,start,p - start);
				state = 18;
				escapeNext = 8;
				start = p + 1;
				break;
			case 62:
				if(strict) throw new js__$Boot_HaxeError("Invalid unescaped " + String.fromCharCode(c) + " in attribute value"); else if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val = buf.b;
					buf = new StringBuf();
					xml.set(aname,val);
					state = 0;
					next = 4;
				}
				break;
			case 60:
				if(strict) throw new js__$Boot_HaxeError("Invalid unescaped " + String.fromCharCode(c) + " in attribute value"); else if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val1 = buf.b;
					buf = new StringBuf();
					xml.set(aname,val1);
					state = 0;
					next = 4;
				}
				break;
			default:
				if(c == attrValQuote) {
					buf.addSub(str,start,p - start);
					var val2 = buf.b;
					buf = new StringBuf();
					xml.set(aname,val2);
					state = 0;
					next = 4;
				}
			}
			break;
		case 9:
			p = haxe_xml_Parser.doParse(str,strict,p,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw new js__$Boot_HaxeError("Expected >");
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw new js__$Boot_HaxeError("Expected >");
			}
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) throw new js__$Boot_HaxeError("Expected node name");
				var v = HxOverrides.substr(str,start,p - start);
				if(v != (function($this) {
					var $r;
					if(parent.nodeType != Xml.Element) throw new js__$Boot_HaxeError("Bad node type, expected Element but found " + parent.nodeType);
					$r = parent.nodeName;
					return $r;
				}(this))) throw new js__$Boot_HaxeError("Expected </" + (function($this) {
					var $r;
					if(parent.nodeType != Xml.Element) throw "Bad node type, expected Element but found " + parent.nodeType;
					$r = parent.nodeName;
					return $r;
				}(this)) + ">");
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				var xml1 = Xml.createComment(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml1);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				var xml2 = Xml.createDocType(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml2);
				nsubs++;
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				var xml3 = Xml.createProcessingInstruction(str1);
				parent.addChild(xml3);
				nsubs++;
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(s.charCodeAt(0) == 35) {
					var c1;
					if(s.charCodeAt(1) == 120) c1 = Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)); else c1 = Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.b += String.fromCharCode(c1);
				} else if(!haxe_xml_Parser.escapes.exists(s)) {
					if(strict) throw new js__$Boot_HaxeError("Undefined entity: " + s);
					buf.b += Std.string("&" + s + ";");
				} else buf.add(haxe_xml_Parser.escapes.get(s));
				start = p + 1;
				state = escapeNext;
			} else if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45) && c != 35) {
				if(strict) throw new js__$Boot_HaxeError("Invalid character in entity: " + String.fromCharCode(c));
				buf.b += "&";
				buf.addSub(str,start,p - start);
				p--;
				start = p + 1;
				state = escapeNext;
			}
			break;
		}
		c = StringTools.fastCodeAt(str,++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) {
			buf.addSub(str,start,p - start);
			var xml4 = Xml.createPCData(buf.b);
			parent.addChild(xml4);
			nsubs++;
		}
		return p;
	}
	if(!strict && state == 18 && escapeNext == 13) {
		buf.b += "&";
		buf.addSub(str,start,p - start);
		var xml5 = Xml.createPCData(buf.b);
		parent.addChild(xml5);
		nsubs++;
		return p;
	}
	throw new js__$Boot_HaxeError("Unexpected end");
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = ["js","Boot"];
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return (Function("return typeof " + name + " != \"undefined\" ? " + name + " : null"))();
};
var js_Browser = function() { };
js_Browser.__name__ = ["js","Browser"];
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw new js__$Boot_HaxeError("Unable to create XMLHttpRequest object.");
};
js_Browser.alert = function(v) {
	window.alert(js_Boot.__string_rec(v,""));
};
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
js_html_compat_ArrayBuffer.__name__ = ["js","html","compat","ArrayBuffer"];
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
js_html_compat_DataView.__name__ = ["js","html","compat","DataView"];
js_html_compat_DataView.prototype = {
	getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) return v - 256; else return v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) return v - 65536; else return v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) return v + 4294967296.; else return v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
js_html_compat_Uint8Array.__name__ = ["js","html","compat","Uint8Array"];
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.__name__ = ["Array"];
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
var ArrayBuffer = (Function("return typeof ArrayBuffer != 'undefined' ? ArrayBuffer : null"))() || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = (Function("return typeof DataView != 'undefined' ? DataView : null"))() || js_html_compat_DataView;
var Uint8Array = (Function("return typeof Uint8Array != 'undefined' ? Uint8Array : null"))() || js_html_compat_Uint8Array._new;
Xml.Element = 0;
Xml.PCData = 1;
Xml.CData = 2;
Xml.Comment = 3;
Xml.DocType = 4;
Xml.ProcessingInstruction = 5;
Xml.Document = 6;
com_akifox_asynchttp_AsyncHttp.logEnabled = false;
com_akifox_asynchttp_AsyncHttp.logErrorEnabled = true;
com_akifox_asynchttp_AsyncHttp.errorSafe = false;
com_akifox_asynchttp_AsyncHttp.userAgent = "akifox-asynchttp";
com_akifox_asynchttp_AsyncHttp.maxRedirections = 10;
com_akifox_asynchttp_AsyncHttp.DEFAULT_CONTENT_TYPE = "text/plain";
com_akifox_asynchttp_AsyncHttp.DEFAULT_FILENAME = "unknown";
com_akifox_asynchttp_AsyncHttp.CONTENT_KIND_MATCHES = [{ kind : com_akifox_asynchttp_ContentKind.IMAGE, regex : new EReg("^image/(jpe?g|png|gif)","i")},{ kind : com_akifox_asynchttp_ContentKind.XML, regex : new EReg("(application/xml|text/xml|\\+xml)","i")},{ kind : com_akifox_asynchttp_ContentKind.JSON, regex : new EReg("^(application/json|\\+json)","i")},{ kind : com_akifox_asynchttp_ContentKind.TEXT, regex : new EReg("(^text|application/javascript)","i")}];
com_akifox_asynchttp_AsyncHttp.UID_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
com_akifox_asynchttp_HttpHeaders.FORBIDDEN_ON_REQUEST = ["user-agent","host","content-type","content-length"];
com_akifox_asynchttp_HttpMethod.GET = "GET";
com_akifox_asynchttp_HttpMethod.POST = "POST";
com_akifox_asynchttp_HttpMethod.PUT = "PUT";
com_akifox_asynchttp_HttpMethod.DELETE = "DELETE";
com_akifox_asynchttp_HttpMethod.METHODS = ["GET","POST","PUT","DELETE"];
com_akifox_asynchttp_HttpMethod.DEFAULT_METHOD = "GET";
com_akifox_asynchttp_HttpRequest.DEFAULT_CONTENT_TYPE = "application/x-www-form-urlencoded";
com_akifox_asynchttp_HttpResponse._httpStatus = (function($this) {
	var $r;
	var _g = new haxe_ds_IntMap();
	_g.h[100] = "Continue";
	_g.h[101] = "Switching Protocols";
	_g.h[102] = "Processing";
	_g.h[200] = "OK";
	_g.h[201] = "Created";
	_g.h[202] = "Accepted";
	_g.h[203] = "Non-Authoritative Information";
	_g.h[204] = "No Content";
	_g.h[205] = "Reset Content";
	_g.h[206] = "Partial Content";
	_g.h[207] = "Multi-Status";
	_g.h[300] = "Multiple Choices";
	_g.h[301] = "Moved Permanently";
	_g.h[302] = "Found";
	_g.h[303] = "See Other";
	_g.h[304] = "Not Modified";
	_g.h[305] = "Use Proxy";
	_g.h[306] = "Switch Proxy";
	_g.h[307] = "Temporary Redirect";
	_g.h[400] = "Bad Request";
	_g.h[401] = "Unauthorized";
	_g.h[402] = "Payment Required";
	_g.h[403] = "Forbidden";
	_g.h[404] = "Not Found";
	_g.h[405] = "Method Not Allowed";
	_g.h[406] = "Not Acceptable";
	_g.h[407] = "Proxy Authentication Required";
	_g.h[408] = "Request Timeout";
	_g.h[409] = "Conflict";
	_g.h[410] = "Gone";
	_g.h[411] = "Length Required";
	_g.h[412] = "Precondition Failed";
	_g.h[413] = "Request Entity Too Large";
	_g.h[414] = "Request-URI Too Long";
	_g.h[415] = "Unsupported Media Type";
	_g.h[416] = "Requested Range Not Satisfiable";
	_g.h[417] = "Expectation Failed";
	_g.h[418] = "I'm a teapot";
	_g.h[422] = "Unprocessable Entity";
	_g.h[423] = "Locked";
	_g.h[424] = "Failed Dependency";
	_g.h[425] = "Unordered Collection";
	_g.h[426] = "Upgrade Required";
	_g.h[449] = "Retry With";
	_g.h[450] = "Blocked by Windows Parental Controls";
	_g.h[500] = "Internal Server Error";
	_g.h[501] = "Not Implemented";
	_g.h[502] = "Bad Gateway";
	_g.h[503] = "Service Unavailable";
	_g.h[504] = "Gateway Timeout";
	_g.h[505] = "HTTP Version Not Supported";
	_g.h[506] = "Variant Also Negotiates";
	_g.h[507] = "Insufficient Storage";
	_g.h[509] = "Bandwidth Limit Exceeded";
	_g.h[510] = "Not Extended";
	$r = _g;
	return $r;
}(this));
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
haxe_xml_Parser.escapes = (function($this) {
	var $r;
	var h = new haxe_ds_StringMap();
	if(__map_reserved.lt != null) h.setReserved("lt","<"); else h.h["lt"] = "<";
	if(__map_reserved.gt != null) h.setReserved("gt",">"); else h.h["gt"] = ">";
	if(__map_reserved.amp != null) h.setReserved("amp","&"); else h.h["amp"] = "&";
	if(__map_reserved.quot != null) h.setReserved("quot","\""); else h.h["quot"] = "\"";
	if(__map_reserved.apos != null) h.setReserved("apos","'"); else h.h["apos"] = "'";
	$r = h;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
AsyncHttpExample.main();
})(typeof console != "undefined" ? console : {log:function(){}});
