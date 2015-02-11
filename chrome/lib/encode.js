"undefined"!=typeof 
module&&module.exports&&(this["encoding-indexes"]=require("./encoding-indexes.js")["encoding-indexes"]),function(n){"use 
strict";function e(n,e,i){return n>=e&&i>=n}function i(n,e){return Math.floor(n/e)}function r(n){if(void 
0===n)return{};if(n===Object(n))return n;throw TypeError("Could not convert argument to dictionary")}function t(n){for(var 
e=String(n),i=e.length,r=0,t=[];i>r;){var s=e.charCodeAt(r);if(55296>s||s>57343)t.push(s);else 
if(s>=56320&&57343>=s)t.push(65533);else if(s>=55296&&56319>=s)if(r===i-1)t.push(65533);else{var 
o=n.charCodeAt(r+1);if(o>=56320&&57343>=o){var a=1023&s,u=1023&o;t.push(65536+(a<<10)+u),r+=1}else t.push(65533)}r+=1}return 
t}function s(n){for(var e="",i=0;i<n.length;++i){var 
r=n[i];65535>=r?e+=String.fromCharCode(r):(r-=65536,e+=String.fromCharCode((r>>10)+55296,(1023&r)+56320))}return e}function 
o(n){this.tokens=[].slice.call(n)}function a(n,e){if(n)throw TypeError("Decoder error");return e||65533}function u(n){throw 
TypeError("The code point "+n+" could not be encoded.")}function l(){}function c(){}function f(n){return 
n=String(n).trim().toLowerCase(),Object.prototype.hasOwnProperty.call(F,n)?F[n]:null}function d(n,e){return 
e?e[n]||null:null}function h(n,e){var i=e.indexOf(n);return-1===i?null:i}function g(e){if(!("encoding-indexes"in n))throw 
Error("Indexes missing. Did you forget to include encoding-indexes.js?");return n["encoding-indexes"][e]}function 
p(n){if(n>39419&&189e3>n||n>1237575)return null;var e,i=0,r=0,t=g("gb18030");for(e=0;e<t.length;++e){var 
s=t[e];if(!(s[0]<=n))break;i=s[0],r=s[1]}return r+n-i}function b(n){var e,i=0,r=0,t=g("gb18030");for(e=0;e<t.length;++e){var 
s=t[e];if(!(s[1]<=n))break;i=s[1],r=s[0]}return r+n-i}function m(n){var i=h(n,g("jis0208"));return 
null===i||e(i,8272,8835)?null:i}function w(n,e){if(!(this instanceof w))return new w(n,e);if(n=void 
0!==n?String(n):Q,e=r(e),this._encoding=f(n),null===this._encoding||"replacement"===this._encoding.name)throw 
RangeError("Unknown encoding: "+n);if(!H[this._encoding.name])throw Error("Decoder not present. Did you forget to include 
encoding-indexes.js?");return 
this._streaming=!1,this._BOMseen=!1,this._decoder=null,this._fatal=Boolean(e.fatal),this._ignoreBOM=Boolean(e.ignoreBOM),Object.defineProperty?(Object.defineProperty(this,"encoding",{value:this._encoding.name}),Object.defineProperty(this,"fatal",{value:this._fatal}),Object.defineProperty(this,"ignoreBOM",{value:this._ignoreBOM})):(this.encoding=this._encoding.name,this.fatal=this._fatal,this.ignoreBOM=this._ignoreBOM),this}function 
_(n,e){if(!(this instanceof _))return new _(n,e);if(n=void 
0!==n?String(n):Q,e=r(e),this._encoding=f(n),null===this._encoding||"replacement"===this._encoding.name)throw 
RangeError("Unknown encoding: "+n);var 
i=Boolean(e.NONSTANDARD_allowLegacyEncoding),t="utf-8"!==this._encoding.name&&"utf-16le"!==this._encoding.name&&"utf-16be"!==this._encoding.name;if(null===this._encoding||t&&!i)throw 
RangeError("Unknown encoding: "+n);if(!G[this._encoding.name])throw Error("Encoder not present. Did you forget to include 
encoding-indexes.js?");return 
this._streaming=!1,this._encoder=null,this._options={fatal:Boolean(e.fatal)},Object.defineProperty?Object.defineProperty(this,"encoding",{value:this._encoding.name}):this.encoding=this._encoding.name,this}function 
v(n){var i=n.fatal,r=0,t=0,s=0,o=128,u=191;this.handler=function(n,l){if(l===q&&0!==s)return s=0,a(i);if(l===q)return 
z;if(0===s){if(e(l,0,127))return l;if(e(l,194,223))s=1,r=l-192;else 
if(e(l,224,239))224===l&&(o=160),237===l&&(u=159),s=2,r=l-224;else{if(!e(l,240,244))return 
a(i);240===l&&(o=144),244===l&&(u=143),s=3,r=l-240}return r<<=6*s,null}if(!e(l,o,u))return 
r=s=t=0,o=128,u=191,n.prepend(l),a(i);if(o=128,u=191,t+=1,r+=l-128<<6*(s-t),t!==s)return null;var c=r;return r=s=t=0,c}}function 
y(n){n.fatal;this.handler=function(n,i){if(i===q)return z;if(e(i,0,127))return i;var 
r,t;e(i,128,2047)?(r=1,t=192):e(i,2048,65535)?(r=2,t=224):e(i,65536,1114111)&&(r=3,t=240);for(var s=[(i>>6*r)+t];r>0;){var 
o=i>>6*(r-1);s.push(128|63&o),r-=1}return s}}function k(n,i){var r=i.fatal;this.handler=function(i,t){if(t===q)return 
z;if(e(t,0,127))return t;var s=n[t-128];return null===s?a(r):s}}function 
j(n,i){i.fatal;this.handler=function(i,r){if(r===q)return z;if(e(r,0,127))return r;var t=h(r,n);return 
null===t&&u(r),t+128}}function x(n){var i=n.fatal,r=0,t=0,s=0;this.handler=function(n,o){if(o===q&&0===r&&0===t&&0===s)return 
z;o!==q||0===r&&0===t&&0===s||(r=0,t=0,s=0,a(i));var 
u;if(0!==s){u=null,e(o,48,57)&&(u=p(10*(126*(10*(r-129)+(t-48))+(s-129))+o-48));var l=[t,s,o];return 
r=0,t=0,s=0,null===u?(n.prepend(l),a(i)):u}if(0!==t)return 
e(o,129,254)?(s=o,null):(n.prepend([t,o]),r=0,t=0,a(i));if(0!==r){if(e(o,48,57))return t=o,null;var c=r,f=null;r=0;var 
h=127>o?64:65;return(e(o,64,126)||e(o,128,254))&&(f=190*(c-129)+(o-h)),u=null===f?null:d(f,g("gb18030")),null===f&&n.prepend(o),null===u?a(i):u}return 
e(o,0,127)?o:128===o?8364:e(o,129,254)?(r=o,null):a(i)}}function A(n,r){n.fatal;this.handler=function(n,t){if(t===q)return 
z;if(e(t,0,127))return t;if(r&&8364===t)return 128;var s=h(t,g("gb18030"));if(null!==s){var 
o=i(s,190)+129,a=s%190,l=63>a?64:65;return[o,a+l]}if(r)return u(t);s=b(t);var c=i(i(i(s,10),126),10);s-=10*c*126*10;var 
f=i(i(s,10),126);s-=10*f*126;var d=i(s,10),p=s-10*d;return[c+129,f+48,d+129,p+48]}}function S(n){var 
i=n.fatal,r=0;this.handler=function(n,t){if(t===q&&0!==r)return r=0,a(i);if(t===q&&0===r)return z;if(0!==r){var 
s=r,o=null;r=0;var u=127>t?64:98;switch((e(t,64,126)||e(t,161,254))&&(o=157*(s-129)+(t-u)),o){case 1133:return[202,772];case 
1135:return[202,780];case 1164:return[234,772];case 1166:return[234,780]}var l=null===o?null:d(o,g("big5"));return 
null===o&&n.prepend(t),null===l?a(i):l}return e(t,0,127)?t:e(t,129,254)?(r=t,null):a(i)}}function 
B(n){n.fatal;this.handler=function(n,r){if(r===q)return z;if(e(r,0,127))return r;var t=h(r,g("big5"));if(null===t)return 
u(r);var s=i(t,157)+129;if(161>s)return u(r);var o=t%157,a=63>o?64:98;return[s,o+a]}}function E(n){var 
i=n.fatal,r=!1,t=0;this.handler=function(n,s){if(s===q&&0!==t)return t=0,a(i);if(s===q&&0===t)return 
z;if(142===t&&e(s,161,223))return t=0,65377+s-161;if(143===t&&e(s,161,254))return r=!0,t=s,null;if(0!==t){var o=t;t=0;var 
u=null;return 
e(o,161,254)&&e(s,161,254)&&(u=d(94*(o-161)+(s-161),g(r?"jis0212":"jis0208"))),r=!1,e(s,161,254)||n.prepend(s),null===u?a(i):u}return 
e(s,0,127)?s:142===s||143===s||e(s,161,254)?(t=s,null):a(i)}}function O(n){n.fatal;this.handler=function(n,r){if(r===q)return 
z;if(e(r,0,127))return r;if(165===r)return 92;if(8254===r)return 126;if(e(r,65377,65439))return[142,r-65377+161];var 
t=h(r,g("jis0208"));if(null===t)return u(r);var s=i(t,94)+161,o=t%94+161;return[s,o]}}function I(n){var 
i=n.fatal,r={ASCII:0,Roman:1,Katakana:2,LeadByte:3,TrailByte:4,EscapeStart:5,Escape:6},t=r.ASCII,s=r.ASCII,o=0,u=!1;this.handler=function(n,l){switch(t){default:case 
r.ASCII:return 27===l?(t=r.EscapeStart,null):e(l,0,127)&&14!==l&&15!==l&&27!==l?(u=!1,l):l===q?z:(u=!1,a(i));case r.Roman:return 
27===l?(t=r.EscapeStart,null):92===l?(u=!1,165):126===l?(u=!1,8254):e(l,0,127)&&14!==l&&15!==l&&27!==l&&92!==l&&126!==l?(u=!1,l):l===q?z:(u=!1,a(i));case 
r.Katakana:return 27===l?(t=r.EscapeStart,null):e(l,33,95)?(u=!1,65377+l-33):l===q?z:(u=!1,a(i));case r.LeadByte:return 
27===l?(t=r.EscapeStart,null):e(l,33,126)?(u=!1,o=l,t=r.TrailByte,null):l===q?z:(u=!1,a(i));case r.TrailByte:if(27===l)return 
t=r.EscapeStart,a(i);if(e(l,33,126)){t=r.LeadByte;var c=94*(o-33)+l-33,f=d(c,g("jis0208"));return null===f?a(i):f}return 
l===q?(t=r.LeadByte,n.prepend(l),a(i)):(t=r.LeadByte,a(i));case r.EscapeStart:return 
36===l||40===l?(o=l,t=r.Escape,null):(n.prepend(l),u=!1,t=s,a(i));case r.Escape:var h=o;o=0;var 
p=null;if(40===h&&66===l&&(p=r.ASCII),40===h&&74===l&&(p=r.Roman),40===h&&73===l&&(p=r.Katakana),36!==h||64!==l&&66!==l||(p=r.LeadByte),null!==p){t=t=p;var 
b=u;return u=!0,b?a(i):null}return n.prepend([h,l]),u=!1,t=s,a(i)}}}function C(n){var 
r=(n.fatal,{ASCII:0,Roman:1,jis0208:2}),t=r.ASCII;this.handler=function(n,s){if(s===q&&t!==r.ASCII)return 
n.prepend(s),[27,40,66];if(s===q&&t===r.ASCII)return z;if(t===r.ASCII&&e(s,0,127))return 
s;if(t===r.Roman&&e(s,0,127)&&92!==s&&126!==s){if(e(s,0,127))return s;if(165===s)return 92;if(8254===s)return 
126}if(e(s,0,127)&&t!==r.ASCII)return n.prepend(s),t=r.ASCII,[27,40,66];if((165===s||8254===s)&&t!==r.Roman)return 
n.prepend(s),t=r.Roman,[27,40,74];var o=h(s,g("jis0208"));if(null===o)return u(s);if(t!==r.jis0208)return 
n.prepend(s),t=r.jis0208,[27,36,66];var a=i(o,94)+33,l=o%94+33;return[a,l]}}function L(n){var 
i=n.fatal,r=0;this.handler=function(n,t){if(t===q&&0!==r)return r=0,a(i);if(t===q&&0===r)return z;if(0!==r){var 
s=r,o=null;r=0;var u=127>t?64:65,l=160>s?129:193;(e(t,64,126)||e(t,128,252))&&(o=188*(s-l)+t-u);var 
c=null===o?null:d(o,g("jis0208"));return 
null===c&&null!==o&&e(o,8836,10528)?57344+o-8836:(null===o&&n.prepend(t),null===c?a(i):c)}return 
e(t,0,128)?t:e(t,161,223)?65377+t-161:e(t,129,159)||e(t,224,252)?(r=t,null):a(i)}}function 
M(n){n.fatal;this.handler=function(n,r){if(r===q)return z;if(e(r,0,128))return r;if(165===r)return 92;if(8254===r)return 
126;if(e(r,65377,65439))return r-65377+161;var t=m(r);if(null===t)return u(r);var 
s=i(t,188),o=31>s?129:193,a=t%188,l=63>a?64:65;return[s+o,a+l]}}function T(n){var 
i=n.fatal,r=0;this.handler=function(n,t){if(t===q&&0!==r)return r=0,a(i);if(t===q&&0===r)return z;if(0!==r){var 
s=r,o=null;r=0,e(t,65,254)&&(o=190*(s-129)+(t-65));var u=null===o?null:d(o,g("euc-kr"));return 
null===o&&e(t,0,127)&&n.prepend(t),null===u?a(i):u}return e(t,0,127)?t:e(t,129,254)?(r=t,null):a(i)}}function 
R(n){n.fatal;this.handler=function(n,r){if(r===q)return z;if(e(r,0,127))return r;var t=h(r,g("euc-kr"));if(null===t)return 
u(r);var s=i(t,190)+129,o=t%190+65;return[s,o]}}function D(n,e){var i=n>>8,r=255&n;return e?[i,r]:[r,i]}function P(n,i){var 
r=i.fatal,t=null,s=null;this.handler=function(i,o){if(o===q&&(null!==t||null!==s))return 
a(r);if(o===q&&null===t&&null===s)return z;if(null===t)return t=o,null;var u;if(u=n?(t<<8)+o:(o<<8)+t,t=null,null!==s){var 
l=s;return s=null,e(u,56320,57343)?65536+1024*(l-55296)+(u-56320):(i.prepend(D(u,n)),a(r))}return 
e(u,55296,56319)?(s=u,null):e(u,56320,57343)?a(r):u}}function U(n,i){i.fatal;this.handler=function(i,r){if(r===q)return 
z;if(e(r,0,65535))return D(r,n);var t=D((r-65536>>10)+55296,n),s=D((r-65536&1023)+56320,n);return t.concat(s)}}function 
K(n){n.fatal;this.handler=function(n,i){return i===q?z:e(i,0,127)?i:63360+i-128}}function 
N(n){n.fatal;this.handler=function(n,i){return i===q?z:e(i,0,127)?i:e(i,63360,63487)?i-63360+128:u(i)}}var 
q=-1;o.prototype={endOfStream:function(){return!this.tokens.length},read:function(){return 
this.tokens.length?this.tokens.shift():q},prepend:function(n){if(Array.isArray(n))for(var 
e=n;e.length;)this.tokens.unshift(e.pop());else this.tokens.unshift(n)},push:function(n){if(Array.isArray(n))for(var 
e=n;e.length;)this.tokens.push(e.shift());else this.tokens.push(n)}};var 
z=-1;l.prototype={handler:function(){}},c.prototype={handler:function(){}};var 
J=[{encodings:[{labels:["unicode-1-1-utf-8","utf-8","utf8"],name:"utf-8"}],heading:"The 
Encoding"},{encodings:[{labels:["866","cp866","csibm866","ibm866"],name:"ibm866"},{labels:["csisolatin2","iso-8859-2","iso-ir-101","iso8859-2","iso88592","iso_8859-2","iso_8859-2:1987","l2","latin2"],name:"iso-8859-2"},{labels:["csisolatin3","iso-8859-3","iso-ir-109","iso8859-3","iso88593","iso_8859-3","iso_8859-3:1988","l3","latin3"],name:"iso-8859-3"},{labels:["csisolatin4","iso-8859-4","iso-ir-110","iso8859-4","iso88594","iso_8859-4","iso_8859-4:1988","l4","latin4"],name:"iso-8859-4"},{labels:["csisolatincyrillic","cyrillic","iso-8859-5","iso-ir-144","iso8859-5","iso88595","iso_8859-5","iso_8859-5:1988"],name:"iso-8859-5"},{labels:["arabic","asmo-708","csiso88596e","csiso88596i","csisolatinarabic","ecma-114","iso-8859-6","iso-8859-6-e","iso-8859-6-i","iso-ir-127","iso8859-6","iso88596","iso_8859-6","iso_8859-6:1987"],name:"iso-8859-6"},{labels:["csisolatingreek","ecma-118","elot_928","greek","greek8","iso-8859-7","iso-ir-126","iso8859-7","iso88597","iso_8859-7","iso_8859-7:1987","sun_eu_greek"],name:"iso-8859-7"},{labels:["csiso88598e","csisolatinhebrew","hebrew","iso-8859-8","iso-8859-8-e","iso-ir-138","iso8859-8","iso88598","iso_8859-8","iso_8859-8:1988","visual"],name:"iso-8859-8"},{labels:["csiso88598i","iso-8859-8-i","logical"],name:"iso-8859-8-i"},{labels:["csisolatin6","iso-8859-10","iso-ir-157","iso8859-10","iso885910","l6","latin6"],name:"iso-8859-10"},{labels:["iso-8859-13","iso8859-13","iso885913"],name:"iso-8859-13"},{labels:["iso-8859-14","iso8859-14","iso885914"],name:"iso-8859-14"},{labels:["csisolatin9","iso-8859-15","iso8859-15","iso885915","iso_8859-15","l9"],name:"iso-8859-15"},{labels:["iso-8859-16"],name:"iso-8859-16"},{labels:["cskoi8r","koi","koi8","koi8-r","koi8_r"],name:"koi8-r"},{labels:["koi8-u"],name:"koi8-u"},{labels:["csmacintosh","mac","macintosh","x-mac-roman"],name:"macintosh"},{labels:["dos-874","iso-8859-11","iso8859-11","iso885911","tis-620","windows-874"],name:"windows-874"},{labels:["cp1250","windows-1250","x-cp1250"],name:"windows-1250"},{labels:["cp1251","windows-1251","x-cp1251"],name:"windows-1251"},{labels:["ansi_x3.4-1968","ascii","cp1252","cp819","csisolatin1","ibm819","iso-8859-1","iso-ir-100","iso8859-1","iso88591","iso_8859-1","iso_8859-1:1987","l1","latin1","us-ascii","windows-1252","x-cp1252"],name:"windows-1252"},{labels:["cp1253","windows-1253","x-cp1253"],name:"windows-1253"},{labels:["cp1254","csisolatin5","iso-8859-9","iso-ir-148","iso8859-9","iso88599","iso_8859-9","iso_8859-9:1989","l5","latin5","windows-1254","x-cp1254"],name:"windows-1254"},{labels:["cp1255","windows-1255","x-cp1255"],name:"windows-1255"},{labels:["cp1256","windows-1256","x-cp1256"],name:"windows-1256"},{labels:["cp1257","windows-1257","x-cp1257"],name:"windows-1257"},{labels:["cp1258","windows-1258","x-cp1258"],name:"windows-1258"},{labels:["x-mac-cyrillic","x-mac-ukrainian"],name:"x-mac-cyrillic"}],heading:"Legacy 
single-byte 
encodings"},{encodings:[{labels:["chinese","csgb2312","csiso58gb231280","gb2312","gb_2312","gb_2312-80","gbk","iso-ir-58","x-gbk"],name:"gbk"},{labels:["gb18030"],name:"gb18030"}],heading:"Legacy 
multi-byte Chinese (simplified) 
encodings"},{encodings:[{labels:["big5","big5-hkscs","cn-big5","csbig5","x-x-big5"],name:"big5"}],heading:"Legacy multi-byte 
Chinese (traditional) 
encodings"},{encodings:[{labels:["cseucpkdfmtjapanese","euc-jp","x-euc-jp"],name:"euc-jp"},{labels:["csiso2022jp","iso-2022-jp"],name:"iso-2022-jp"},{labels:["csshiftjis","ms_kanji","shift-jis","shift_jis","sjis","windows-31j","x-sjis"],name:"shift_jis"}],heading:"Legacy 
multi-byte Japanese 
encodings"},{encodings:[{labels:["cseuckr","csksc56011987","euc-kr","iso-ir-149","korean","ks_c_5601-1987","ks_c_5601-1989","ksc5601","ksc_5601","windows-949"],name:"euc-kr"}],heading:"Legacy 
multi-byte Korean 
encodings"},{encodings:[{labels:["csiso2022kr","hz-gb-2312","iso-2022-cn","iso-2022-cn-ext","iso-2022-kr"],name:"replacement"},{labels:["utf-16be"],name:"utf-16be"},{labels:["utf-16","utf-16le"],name:"utf-16le"},{labels:["x-user-defined"],name:"x-user-defined"}],heading:"Legacy 
miscellaneous 
encodings"}],F={};J.forEach(function(n){n.encodings.forEach(function(n){n.labels.forEach(function(e){F[e]=n})})});var 
G={},H={},Q="utf-8";w.prototype={decode:function(n,e){var i;i="object"==typeof n&&n instanceof ArrayBuffer?new 
Uint8Array(n):"object"==typeof n&&"buffer"in n&&n.buffer instanceof ArrayBuffer?new 
Uint8Array(n.buffer,n.byteOffset,n.byteLength):new 
Uint8Array(0),e=r(e),this._streaming||(this._decoder=H[this._encoding.name]({fatal:this._fatal}),this._BOMseen=!1),this._streaming=Boolean(e.stream);for(var 
t,a=new 
o(i),u=[];!a.endOfStream()&&(t=this._decoder.handler(a,a.read()),t!==z);)null!==t&&(Array.isArray(t)?u.push.apply(u,t):u.push(t));if(!this._streaming){do{if(t=this._decoder.handler(a,a.read()),t===z)break;null!==t&&(Array.isArray(t)?u.push.apply(u,t):u.push(t))}while(!a.endOfStream());this._decoder=null}return 
u.length&&(-1===["utf-8","utf-16le","utf-16be"].indexOf(this.encoding)||this._ignoreBOM||this._BOMseen||(65279===u[0]?(this._BOMseen=!0,u.shift()):this._BOMseen=!0)),s(u)}},_.prototype={encode:function(n,e){n=n?String(n):"",e=r(e),this._streaming||(this._encoder=G[this._encoding.name](this._options)),this._streaming=Boolean(e.stream);for(var 
i,s=[],a=new 
o(t(n));!a.endOfStream()&&(i=this._encoder.handler(a,a.read()),i!==z);)Array.isArray(i)?s.push.apply(s,i):s.push(i);if(!this._streaming){for(;;){if(i=this._encoder.handler(a,a.read()),i===z)break;Array.isArray(i)?s.push.apply(s,i):s.push(i)}this._encoder=null}return 
new Uint8Array(s)}},G["utf-8"]=function(n){return new y(n)},H["utf-8"]=function(n){return new 
v(n)},function(){"encoding-indexes"in n&&J.forEach(function(n){"Legacy single-byte 
encodings"===n.heading&&n.encodings.forEach(function(n){var e=n.name,i=g(e);H[e]=function(n){return new 
k(i,n)},G[e]=function(n){return new j(i,n)}})})}(),H.gbk=function(n){return new x(n)},G.gbk=function(n){return new 
A(n,!0)},G.gb18030=function(n){return new A(n)},H.gb18030=function(n){return new x(n)},G.big5=function(n){return new 
B(n)},H.big5=function(n){return new S(n)},G["euc-jp"]=function(n){return new O(n)},H["euc-jp"]=function(n){return new 
E(n)},G["iso-2022-jp"]=function(n){return new C(n)},H["iso-2022-jp"]=function(n){return new I(n)},G.shift_jis=function(n){return 
new M(n)},H.shift_jis=function(n){return new L(n)},G["euc-kr"]=function(n){return new R(n)},H["euc-kr"]=function(n){return new 
T(n)},G["utf-16be"]=function(n){return new U(!0,n)},H["utf-16be"]=function(n){return new 
P(!0,n)},G["utf-16le"]=function(n){return new U(!1,n)},H["utf-16le"]=function(n){return new 
P(!1,n)},G["x-user-defined"]=function(n){return new N(n)},H["x-user-defined"]=function(n){return new K(n)},"TextEncoder"in 
n||(n.TextEncoder=_),"TextDecoder"in n||(n.TextDecoder=w)}(this);
