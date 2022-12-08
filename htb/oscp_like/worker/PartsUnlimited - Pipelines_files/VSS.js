// Copyright (C) Microsoft Corporation. All rights reserved.
var XDM,VSS;(function(n){function u(){return new o}function s(){return Math.floor(Math.random()*(f-t)+t).toString(36)+Math.floor(Math.random()*(f-t)+t).toString(36)}var i,r,e;n.createDeferred=u;var o=function(){function n(){var n=this;this._resolveCallbacks=[];this._rejectCallbacks=[];this._isResolved=!1;this._isRejected=!1;this.resolve=function(t){n._resolve(t)};this.reject=function(t){n._reject(t)};this.promise={};this.promise.then=function(t,i){return n._then(t,i)}}return n.prototype._then=function(t,i){var u=this,r;return!t&&!i||this._isResolved&&!t||this._isRejected&&!i?this.promise:(r=new n,this._resolveCallbacks.push(function(n){u._wrapCallback(t,n,r,!1)}),this._rejectCallbacks.push(function(n){u._wrapCallback(i,n,r,!0)}),this._isResolved?this._resolve(this._resolvedValue):this._isRejected&&this._reject(this._rejectValue),r.promise)},n.prototype._wrapCallback=function(n,t,i,r){if(!n){r?i.reject(t):i.resolve(t);return}var u;try{u=n(t)}catch(f){i.reject(f);return}u===undefined?i.resolve(t):u&&typeof u.then=="function"?u.then(function(n){i.resolve(n)},function(n){i.reject(n)}):i.resolve(u)},n.prototype._resolve=function(n){if(this._isRejected||this._isResolved||(this._isResolved=!0,this._resolvedValue=n),this._isResolved&&this._resolveCallbacks.length>0){var t=this._resolveCallbacks.splice(0);window.setTimeout(function(){for(var i=0,r=t.length;i<r;i++)t[i](n)})}},n.prototype._reject=function(n){if(this._isRejected||this._isResolved||(this._isRejected=!0,this._rejectValue=n,this._rejectCallbacks.length===0&&window.console&&window.console.warn&&(console.warn("Rejected XDM promise with no reject callbacks"),n&&console.warn(n))),this._isRejected&&this._rejectCallbacks.length>0){var t=this._rejectCallbacks.splice(0);window.setTimeout(function(){for(var i=0,r=t.length;i<r;i++)t[i](n)})}},n}(),t=parseInt("10000000000",36),f=Number.MAX_SAFE_INTEGER||9007199254740991;i=function(){function n(){this._registeredObjects={}}return n.prototype.register=function(n,t){this._registeredObjects[n]=t},n.prototype.unregister=function(n){delete this._registeredObjects[n]},n.prototype.getInstance=function(n,t){var i=this._registeredObjects[n];return i?typeof i=="function"?i(t):i:null},n}();n.XDMObjectRegistry=i;n.globalObjectRegistry=new i;r=function(){function t(n,r){r===void 0&&(r=null);this._nextMessageId=1;this._deferreds={};this._nextProxyFunctionId=1;this._proxyFunctions={};this._postToWindow=n;this._targetOrigin=r;this._channelObjectRegistry=new i;this._channelId=t._nextChannelId++;this._targetOrigin||(this._handshakeToken=s())}return t.prototype.getObjectRegistry=function(){return this._channelObjectRegistry},t.prototype.invokeRemoteMethod=function(n,t,i,r,f){var e={id:this._nextMessageId++,methodName:n,instanceId:t,instanceContext:r,params:this._customSerializeObject(i,f),jsonrpc:"2.0",serializationSettings:f},o;return this._targetOrigin||(e.handshakeToken=this._handshakeToken),o=u(),this._deferreds[e.id]=o,this._sendRpcMessage(e),o.promise},t.prototype.getRemoteObjectProxy=function(n,t){return this.invokeRemoteMethod(null,n,null,t)},t.prototype.invokeMethod=function(n,t){var f=this,r,u,i;if(!t.methodName){this._success(t,n,t.handshakeToken);return}if(r=n[t.methodName],typeof r!="function"){this._error(t,new Error("RPC method not found: "+t.methodName),t.handshakeToken);return}try{u=[];t.params&&(u=this._customDeserializeObject(t.params));i=r.apply(n,u);i&&i.then&&typeof i.then=="function"?i.then(function(n){f._success(t,n,t.handshakeToken)},function(n){f._error(t,n,t.handshakeToken)}):this._success(t,i,t.handshakeToken)}catch(e){this._error(t,e,t.handshakeToken)}},t.prototype.getRegisteredObject=function(t,i){if(t==="__proxyFunctions")return this._proxyFunctions;var r=this._channelObjectRegistry.getInstance(t,i);return r||(r=n.globalObjectRegistry.getInstance(t,i)),r},t.prototype.onMessage=function(n){var u=this,t=n,i,r;if(t.instanceId){if(i=this.getRegisteredObject(t.instanceId,t.instanceContext),!i)return!1;typeof i.then=="function"?i.then(function(n){u.invokeMethod(n,t)},function(n){u._error(t,n,t.handshakeToken)}):this.invokeMethod(i,t)}else{if(r=this._deferreds[t.id],!r)return!1;t.error?r.reject(this._customDeserializeObject([t.error])[0]):r.resolve(this._customDeserializeObject([t.result])[0]);delete this._deferreds[t.id]}return!0},t.prototype.owns=function(n,t,i){var r=i;if(this._postToWindow===n){if(this._targetOrigin)return t?t.toLowerCase()==="null"||this._targetOrigin.toLowerCase().indexOf(t.toLowerCase())===0:!1;if(r.handshakeToken&&r.handshakeToken===this._handshakeToken)return this._targetOrigin=t,!0}return!1},t.prototype.error=function(n,t){var i=n;this._error(i,t,i.handshakeToken)},t.prototype._error=function(n,t,i){var r={id:n.id,error:this._customSerializeObject([t],n.serializationSettings)[0],jsonrpc:"2.0",handshakeToken:i};this._sendRpcMessage(r)},t.prototype._success=function(n,t,i){var r={id:n.id,result:this._customSerializeObject([t],n.serializationSettings)[0],jsonrpc:"2.0",handshakeToken:i};this._sendRpcMessage(r)},t.prototype._sendRpcMessage=function(n){var t=JSON.stringify(n);this._postToWindow.postMessage(t,"*")},t.prototype._shouldSkipSerialization=function(n){for(var r,i=0,u=t.WINDOW_TYPES_TO_SKIP_SERIALIZATION.length;i<u;i++)if(r=t.WINDOW_TYPES_TO_SKIP_SERIALIZATION[i],window[r]&&n instanceof window[r])return!0;if(window.jQuery)for(i=0,u=t.JQUERY_TYPES_TO_SKIP_SERIALIZATION.length;i<u;i++)if(r=t.JQUERY_TYPES_TO_SKIP_SERIALIZATION[i],window.jQuery[r]&&n instanceof window.jQuery[r])return!0;return!1},t.prototype._customSerializeObject=function(n,i,r,u,f){var h=this,a,o,l,v,e,c,s;if((r===void 0&&(r=null),u===void 0&&(u=1),f===void 0&&(f=1),!n||f>t.MAX_XDM_DEPTH)||this._shouldSkipSerialization(n))return null;if(a=function(t,e,o){var s,c,l,a,v;try{s=t[o]}catch(y){}(c=typeof s,c!=="undefined")&&(l=-1,c==="object"&&(l=r.originalObjects.indexOf(s)),l>=0?(a=r.newObjects[l],a.__circularReferenceId||(a.__circularReferenceId=u++),e[o]={__circularReference:a.__circularReferenceId}):c==="function"?(v=h._nextProxyFunctionId++,e[o]={__proxyFunctionId:h._registerProxyFunction(s,n),__channelId:h._channelId}):c==="object"?e[o]=s&&s instanceof Date?{__proxyDate:s.getTime()}:h._customSerializeObject(s,i,r,u,f+1):o!=="__proxyFunctionId"&&(e[o]=s))},r||(r={newObjects:[],originalObjects:[]}),r.originalObjects.push(n),n instanceof Array)for(o=[],r.newObjects.push(o),e=0,c=n.length;e<c;e++)a(n,o,e);else{o={};r.newObjects.push(o);l={};try{for(s in n)l[s]=!0;for(v=Object.getOwnPropertyNames(n),e=0,c=v.length;e<c;e++)l[v[e]]=!0}catch(y){}for(s in l)(s&&s[0]!=="_"||i&&i.includeUnderscoreProperties)&&a(n,o,s)}return r.originalObjects.pop(),r.newObjects.pop(),o},t.prototype._registerProxyFunction=function(n,t){var i=this._nextProxyFunctionId++;return this._proxyFunctions["proxy"+i]=function(){return n.apply(t,Array.prototype.slice.call(arguments,0))},i},t.prototype._customDeserializeObject=function(n,t){var e=this,o=this,r,i,u,f;if(!n)return null;if(t||(t={}),r=function(n,i){var r=n[i],u=typeof r;i==="__circularReferenceId"&&u==="number"?(t[r]=n,delete n[i]):u==="object"&&r&&(r.__proxyFunctionId?n[i]=function(){return o.invokeRemoteMethod("proxy"+r.__proxyFunctionId,"__proxyFunctions",Array.prototype.slice.call(arguments,0),null,{includeUnderscoreProperties:!0})}:r.__proxyDate?n[i]=new Date(r.__proxyDate):r.__circularReference?n[i]=t[r.__circularReference]:e._customDeserializeObject(r,t))},n instanceof Array)for(i=0,u=n.length;i<u;i++)r(n,i);else if(typeof n=="object")for(f in n)r(n,f);return n},t._nextChannelId=1,t.MAX_XDM_DEPTH=100,t.WINDOW_TYPES_TO_SKIP_SERIALIZATION=["Node","Window","Event"],t.JQUERY_TYPES_TO_SKIP_SERIALIZATION=["jQuery"],t}();n.XDMChannel=r;e=function(){function n(){this._channels=[];this._subscribe(window)}return n.get=function(){return this._default||(this._default=new n),this._default},n.prototype.addChannel=function(n,t){var i=new r(n,t);return this._channels.push(i),i},n.prototype.removeChannel=function(n){this._channels=this._channels.filter(function(t){return t!==n})},n.prototype._handleMessageReceived=function(n){var i,e,r,t,u,f;if(typeof n.data=="string")try{t=JSON.parse(n.data)}catch(o){}if(t){for(u=!1,i=0,e=this._channels.length;i<e;i++)r=this._channels[i],r.owns(n.source,n.origin,t)&&(f=r,u=r.onMessage(t,n.origin)||u);!f||u||(window.console&&console.error("No handler found on any channel for message: "+JSON.stringify(t)),t.instanceId&&f.error(t,"The registered object "+t.instanceId+" could not be found."))}},n.prototype._subscribe=function(n){var t=this;n.addEventListener?n.addEventListener("message",function(n){t._handleMessageReceived(n)}):n.attachEvent("onmessage",function(n){t._handleMessageReceived(n)})},n}();n.XDMChannelManager=e})(XDM||(XDM={})),function(n){function yt(){function r(){n||(n=setTimeout(function(){n=0;it()},50))}var n,i=!1,t;try{i=typeof document.cookie=="string"}catch(f){}i||Object.defineProperty(Document.prototype,"cookie",{get:function(){return""},set:function(){}});t=!1;try{t=!!window.localStorage}catch(f){}t||(delete window.localStorage,u=new nt(r),Object.defineProperty(window,"localStorage",{value:u}),delete window.sessionStorage,Object.defineProperty(window,"sessionStorage",{value:new nt}))}function tt(f){r=f||{};o=r.usePlatformScripts;v=r.usePlatformStyles;window.setTimeout(function(){var f={notifyLoadSucceeded:!r.explicitNotifyLoaded,extensionReusedCallback:r.extensionReusedCallback,vssSDKVersion:n.VssSDKVersion,applyTheme:r.applyTheme};i.invokeRemoteMethod("initialHandshake","VSS.HostControl",[f]).then(function(n){var f,r,e,h,c,s,a,i;if(t=n.pageContext,k=t.webContext,d=n.initialConfig||{},g=n.contribution,l=n.extensionContext,n.sandboxedStorage){if(f=!1,u)if(n.sandboxedStorage.localStorage){for(r=n.sandboxedStorage.localStorage,e=0,h=Object.keys(u);e<h.length;e++)i=h[e],c=u.getItem(i),c!==r[i]&&(r[i]=c,f=!0);for(s=0,a=Object.keys(r);s<a.length;s++)i=a[s],u.setItem(i,r[i])}else u.length>0&&(f=!0);vt=!0;f&&it()}n.themeData&&ct(n.themeData);o||v?lt():b()})},0)}function it(){var n={localStorage:JSON.stringify(u||{})};i.invokeRemoteMethod("updateSandboxedStorage","VSS.HostControl",[n])}function bt(n,t){var i;i=typeof n=="string"?[n]:n;t||(t=function(){});a?rt(i,t):(r?o||(o=!0,h&&(h=!1,lt())):tt({usePlatformScripts:!0}),ut(function(){rt(i,t)}))}function rt(n,i){t.diagnostics.bundlingEnabled?window.require(["VSS/Bundling"],function(t){t.requireModules(n).spread(function(){i.apply(this,arguments)})}):window.require(n,i)}function ut(n){h?window.setTimeout(n,0):(f||(f=[]),f.push(n))}function kt(){i.invokeRemoteMethod("notifyLoadSucceeded","VSS.HostControl")}function ft(n){i.invokeRemoteMethod("notifyLoadFailed","VSS.HostControl",[n])}function et(){return k}function dt(){return d}function ot(){return l}function gt(){return g}function ni(n,t){return st(n).then(function(n){return t||(t={}),t.webContext||(t.webContext=et()),t.extensionContext||(t.extensionContext=ot()),n.getInstance(n.id,t)})}function st(t){var r=XDM.createDeferred();return n.ready(function(){i.invokeRemoteMethod("getServiceContribution","vss.hostManagement",[t]).then(function(n){var t=n;t.getInstance=function(t,i){return ht(n,t,i)};r.resolve(t)},r.reject)}),r.promise}function ti(t){var r=XDM.createDeferred();return n.ready(function(){i.invokeRemoteMethod("getContributionsForTarget","vss.hostManagement",[t]).then(function(n){var t=[];n.forEach(function(n){var i=n;i.getInstance=function(t,i){return ht(n,t,i)};t.push(i)});r.resolve(t)},r.reject)}),r.promise}function ht(t,r,u){var f=XDM.createDeferred();return n.ready(function(){i.invokeRemoteMethod("getBackgroundContributionInstance","vss.hostManagement",[t,r,u]).then(f.resolve,f.reject)}),f.promise}function ii(n,t){i.getObjectRegistry().register(n,t)}function ri(n){i.getObjectRegistry().unregister(n)}function ui(n,t){return i.getObjectRegistry().getInstance(n,t)}function fi(){return i.invokeRemoteMethod("getAccessToken","VSS.HostControl")}function ei(){return i.invokeRemoteMethod("getAppToken","VSS.HostControl")}function oi(n,t){s||(s=document.getElementsByTagName("body").item(0));var r=typeof n=="number"?n:s.scrollWidth,u=typeof t=="number"?t:s.scrollHeight;i.invokeRemoteMethod("resize","VSS.HostControl",[r,u])}function ct(n){var t,i;if(e||(e=document.createElement("style"),e.type="text/css",document.head.appendChild(e)),t=[],n)for(i in n)t.push("--"+i+": "+n[i]);e.innerText=":root { "+t.join("; ")+" } body { color: var(--text-primary-color) }"}function lt(){var i=ci(t.webContext),f,g,n,s,e,h,k,nt,tt,d,u;if(window.__vssPageContext=t,window.__cultureInfo=t.microsoftAjaxConfig.cultureInfo,v!==!1&&t.coreReferences.stylesheets&&t.coreReferences.stylesheets.forEach(function(n){if(n.isCoreStylesheet){var t=document.createElement("link");t.href=c(n.url,i);t.rel="stylesheet";w(t,"head")}}),!o){a=!0;b();return}if(f=[],g=!1,t.coreReferences.scripts&&(t.coreReferences.scripts.forEach(function(n){if(n.isCoreModule){var r=!1,t=window;n.identifier==="JQuery"?r=!!t.jQuery:n.identifier==="JQueryUI"?r=!!(t.jQuery&&t.jQuery.ui&&t.jQuery.ui.version):n.identifier==="AMDLoader"&&(r=typeof t.define=="function"&&!!t.define.amd);r?g=!0:f.push({source:c(n.url,i)})}}),t.coreReferences.coreScriptsBundle&&!g&&(f=[{source:c(t.coreReferences.coreScriptsBundle.url,i)}]),t.coreReferences.extensionCoreReferences&&f.push({source:c(t.coreReferences.extensionCoreReferences.url,i)})),n={baseUrl:l.baseUri,contributionPaths:null,paths:{},shim:{}},r.moduleLoaderConfig&&(r.moduleLoaderConfig.baseUrl&&(n.baseUrl=r.moduleLoaderConfig.baseUrl),hi(r.moduleLoaderConfig,n),at(r.moduleLoaderConfig,n)),t.moduleLoaderConfig&&(at(t.moduleLoaderConfig,n),s=t.moduleLoaderConfig.contributionPaths,s))for(e in s)if(s.hasOwnProperty(e)&&!n.paths[e]&&(h=s[e].value,n.paths[e]=h.match("^https?://")?h:i+h,k=t.moduleLoaderConfig.paths,k)){nt=e+"/";tt=y(i,t.moduleLoaderConfig.baseUrl);for(d in k)si(d,nt)&&(u=k[d],u.match("^https?://")||(u=u[0]==="/"?y(i,u):y(tt,u)),n.paths[d]=u)}window.__vssModuleLoaderConfig=n;f.push({content:"require.config("+JSON.stringify(n)+");"});p(f,0,function(){a=!0;b()})}function si(n,t){return n&&n.length>=t.length?n.substr(0,t.length).localeCompare(t)===0:!1}function y(n,t){var i=n||"";return i[i.length-1]!=="/"&&(i+="/"),t&&(i+=t[0]==="/"?t.substr(1):t),i}function hi(n,t,i){var r,u;if(n.paths){t.paths||(t.paths={});for(r in n.paths)n.paths.hasOwnProperty(r)&&(u=n.paths[r],i&&(u=i(r,n.paths[r])),u&&(t.paths[r]=u))}}function at(n,t){if(n.shim){t.shim||(t.shim={});for(var i in n.shim)n.shim.hasOwnProperty(i)&&(t.shim[i]=n.shim[i])}}function ci(n){var r=n.account||n.host,t=r.uri,i=r.relativeUri;return t&&i&&(t[t.length-1]!=="/"&&(t+="/"),i[i.length-1]!=="/"&&(i+="/"),t=t.substr(0,t.length-i.length)),t}function p(n,t,i){var f=this,r,u;if(t>=n.length){i.call(this);return}r=document.createElement("script");r.type="text/javascript";n[t].source?(u=n[t].source,r.src=u,r.addEventListener("load",function(){p.call(f,n,t+1,i)}),r.addEventListener("error",function(){ft("Failed to load script: "+u)}),w(r,"head")):n[t].content&&(r.textContent=n[t].content,w(r,"head"),p.call(this,n,t+1,i))}function w(n,t){var i=document.getElementsByTagName(t)[0];i||(i=document.createElement(t),document.appendChild(i));i.appendChild(n)}function c(n,t){var i=(n||"").toLowerCase();return i.substr(0,2)!=="//"&&i.substr(0,5)!=="http:"&&i.substr(0,6)!=="https:"&&(n=t+(i[0]==="/"?"":"/")+n),n}function b(){var t=this,n;h=!0;f&&(n=f,f=null,n.forEach(function(n){n.call(t)}))}var wt;n.VssSDKVersion=2;n.VssSDKRestVersion="5.1";var s,e,k,t,l,d,g,r,a=!1,o,v,h=!1,f,i=XDM.XDMChannelManager.get().addChannel(window.parent),u,vt=!1,nt=function(){function n(){t&&t.call(this)}function i(){}var t;return Object.defineProperties(i.prototype,{getItem:{get:function(){return function(n){var t=this[""+n];return typeof t=="undefined"?null:t}}},setItem:{get:function(){return function(t,i){t=""+t;var u=this[t],r=""+i;u!==r&&(this[t]=r,n())}}},removeItem:{get:function(){return function(t){t=""+t;typeof this[t]!="undefined"&&(delete this[t],n())}}},clear:{get:function(){return function(){var r=Object.keys(this),t,i,u;if(r.length>0){for(t=0,i=r;t<i.length;t++)u=i[t],delete this[u];n()}}}},key:{get:function(){return function(n){return Object.keys(this)[n]}}},length:{get:function(){return Object.keys(this).length}}}),i}();if(!window.__vssNoSandboxShim)try{yt()}catch(pt){window.console&&window.console.warn&&window.console.warn("Failed to shim support for sandboxed properties: "+pt.message+'. Set "window.__vssNoSandboxShim = true" in order to bypass the shim of sandboxed properties.')}(function(n){n.Dialog="ms.vss-web.dialog-service";n.Navigation="ms.vss-web.navigation-service";n.ExtensionData="ms.vss-web.data-service"})(wt=n.ServiceIds||(n.ServiceIds={}));n.init=tt;n.require=bt;n.ready=ut;n.notifyLoadSucceeded=kt;n.notifyLoadFailed=ft;n.getWebContext=et;n.getConfiguration=dt;n.getExtensionContext=ot;n.getContribution=gt;n.getService=ni;n.getServiceContribution=st;n.getServiceContributions=ti;n.register=ii;n.unregister=ri;n.getRegisteredObject=ui;n.getAccessToken=fi;n.getAppToken=ei;n.resize=oi;n.applyTheme=ct}(VSS||(VSS={}));