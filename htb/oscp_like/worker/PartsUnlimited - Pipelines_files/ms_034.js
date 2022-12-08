"use strict";define("VSS/Features/Frame",["require","exports","VSS/Platform/Layout","VSS/Platform/Location","VSS/Core/Util/String","VSS/Platform/Util/Url","react","VSS/Core/Observable","react-dom","VSSUI/FocusZone","VSSUI/Callout","VSS/Platform/Components/FPSLink","VSS/Platform/Util/DOM","VSSUI/Icon","VSSUI/Util","VSS/Platform/FPS","VSSUI/Link"],function(e,t,o,s,n,i,r,a,p,d,c,h,u,m,l,C,f){var v,g,b,y,x,I,P,_,S,E;t.Resources={},Object.defineProperty(t,"__esModule",{value:!0}),t.Resources.Close="Close",function(e){v=t.AssetResolverAssetResolver={},Object.defineProperty(t,"__esModule",{value:!0});t.AssetResolverAssetResolver.AssetResolver=class extends o.VssComponent{render(){const e=this.props.assets.map(e=>s.getAssetLocation(this.context.pageContext,e));return this.props.children(e)}}}(),function(e){g=t[e]={},Object.defineProperty(t,"__esModule",{value:!0}),function(o){for(var s in o)t[e].hasOwnProperty(s)||(t[e][s]=o[s])}(v)}("AssetResolverindex"),function(e){t[e]={},Object.defineProperty(t,"__esModule",{value:!0}),function(o){for(var s in o)t[e].hasOwnProperty(s)||(t[e][s]=o[s])}(g)}("AssetResolver"),function(e){b=t.ContributedIconUtil={},Object.defineProperty(t,"__esModule",{value:!0}),t.ContributedIconUtil.contributionIconToIconProps=function(e,t,s){let r;if(s){let a,p=!0;if("object"==typeof s){const t=e.getService("IVssThemeService").getCurrentTheme();s=s[t&&t.isDark?"dark":"light"],p=!1}if(s.match(/^https?:\/\//))a=s;else{const o=e.getService("IVssContributionService").getContributionProvider(t);o&&(a=i.combineUrlPaths(o.baseUri,s))}a&&(r={iconName:"None",className:o.css("icon third-party-icon contributed-icon-image",p&&"non-themed"),style:{backgroundImage:n.format("url({0})",a),backgroundRepeat:"no-repeat"}})}return r}}(),function(e){y=t.ContributedMenuItemProvider={},Object.defineProperty(t,"__esModule",{value:!0});class s{constructor(e,t,s){this.ownerDrawMenuItem=(e=>r.createElement(o.WrappedComponent,Object.assign({wrappedType:e.componentType},Object.assign({key:e.key},e.componentProperties)))),this.onMenuItem=((e,t)=>{if(t){const e=this._pageContext.getService("IVssContributionService");t.command?e.executeCommandEx(t.key,t.command,this._data):e.getService(t.key,!0).then(e=>{e&&e.execute&&e.execute(this._data)})}}),this._pageContext=e,this._menuId=t,this._data=s}loadItems(e,t){const o=[],s={},n=this._pageContext.getService("IVssContributionService"),i=n.getSharedData("_menuItems");if(i){const t=i[this._menuId];t&&t.length>0&&(t.forEach(e=>{e.onClick=e.command?this.onMenuItem:void 0,o.push(e)}),e(this.prepareMenuItems(o)))}const r=n.getContributionChildren(this._menuId,"ms.vss-web.menu-item");if(r)for(let e=0;e<r.length;e++){const t=r[e];let i=n.getContribution(t);i&&(o.push(this.createMenuItem(i,t)),s[t]=t)}const p=n.getContributionChildren(this._menuId,"ms.vss-web.action");if(p)for(let e=0;e<p.length;e++){const t=p[e],i=n.getContribution(t);i&&(o.push(this.createMenuItemFromAction(i,t)),s[t]=t)}const d=n.getContributionsByType("ms.vss-web.menu-item");if(d)for(let e in d)if(!s[e]){const t=d[e];t.menuId===this._menuId&&(o.push(this.createMenuItem(t,e)),s[e]=e)}o.length>0&&e(this.prepareMenuItems(o));const c=n.getContributionChildren(this._menuId,"ms.vss-web.menu-provider")||[],h={};for(let e=0;e<c.length;e++)h[c[e]]=c[e];const u=n.getContributionsByType("ms.vss-web.menu-provider");if(u)for(let e in u)if(!h[e]){u[e].menuId===this._menuId&&(c.push(e),h[e]=e)}if(c&&c.length>0){const o=c.slice(0);for(let s of c)n.getService(s,!0).then(n=>{if(n){const i=(n,i)=>{e(this.prepareMenuItems(n),i);const r=o.indexOf(s);r>-1&&(o.splice(r,1),0===o.length&&t())};if("function"==typeof n.loadItems)n.loadItems(i);else if("function"==typeof n.getMenuItems){const e=e=>{const t=[];for(let o=0;o<e.length;o++){let n;n=a.ObservableLike.getValue(e)[o];const i={key:s+o.toString(),name:n.text,groupId:n.groupId,iconProps:b.contributionIconToIconProps(this._pageContext,n.id,n.icon),onClick:(e,t)=>{n.action&&n.action(this._data)}};t.push(i)}return t},t=n.getMenuItems(this._data||{});t instanceof Promise?t.then(t=>{i(e(t),[])}):i(e(t),[])}}})}else t()}createMenuItem(e,t){return{command:e.command,href:e.href,iconProps:e.iconProps||b.contributionIconToIconProps(this._pageContext,e.id,e.icon),key:t,name:e.name,rank:e.rank,onClick:e.command?this.onMenuItem:void 0,groupKey:e.groupKey}}createMenuItemFromAction(e,t){const o=this._pageContext.getService("IVssContributionService");return{command:e.command,iconProps:e.iconProps||b.contributionIconToIconProps(this._pageContext,t,e.icon),key:t,name:e.text?e.text:e.title,groupKey:e.groupId,onClick:()=>{if(e.command)o.executeCommandEx(t,e.command,this._data);else{const s={serviceName:e.registeredObjectId||t,uri:e.uri,configuration:this._data};o.getServiceEx(t,s,!0).then(e=>{e&&e.execute&&e.execute(this._data)})}}}}prepareMenuItems(e){for(let t of e){t.componentType&&(t.onRender=this.ownerDrawMenuItem);const e=t.menuId;e&&(t.subMenuProps||(t.subMenuProps={}),t.subMenuProps.providers=[new s(this._pageContext,e)])}return e}}t.ContributedMenuItemProvider.ContributedMenuItemProvider=s}(),function(e){x=t.ResponsiveLayoutResponsiveLayout={},Object.defineProperty(t,"__esModule",{value:!0});t.ResponsiveLayoutResponsiveLayout.ResponsiveLayout=class extends o.VssComponent{constructor(e){super(e),this.adjustedIndex=0,this.updateLayout=(()=>{const e=p.findDOMNode(this);if(e&&e.children.length){const t=this.adjustedIndex,o=e.getBoundingClientRect();let s=0,n=0,i=!1;this.adjustDetails&&e.children.length===this.adjustDetails.length||(this.appliedAdjustments=[],this.adjustDetails=[],this.adjustments=this.props.adjustments.slice(0,this.props.adjustments.length),this.adjustments.sort((e,t)=>{let o=(e.priority||Number.MAX_VALUE)-(t.priority||Number.MAX_VALUE);return 0===o&&(o=t.index-e.index),o}),i=!0);for(let t=0;t<e.children.length;t++){const o=e.children[t].getBoundingClientRect();i?this.adjustDetails.push({adjustmentIndex:-1,clientRect:o}):this.adjustDetails[t].clientRect=o,this.props.ignoredChildren[t]&&(n+=1===this.props.orientation?o.height:o.width)}s=1===this.props.orientation?this.adjustDetails[this.adjustDetails.length-1].clientRect.bottom-this.adjustDetails[0].clientRect.top:this.adjustDetails[this.adjustDetails.length-1].clientRect.right-this.adjustDetails[0].clientRect.left,s-=Math.floor(n);const r=1===this.props.orientation?o.height:o.width;if(r<=s){const e={};let t=r-s;for(;t<0&&this.adjustedIndex<this.adjustments.length;){const o=this.adjustments[this.adjustedIndex],s=this.adjustDetails[o.index];let n;n=1===this.props.orientation?s.clientRect.height-(e[o.index]||0):s.clientRect.width-(e[o.index]||0),o.approxSize?n-=o.approxSize:s.hidden=!0,s.adjustmentIndex++,t+=n,this.appliedAdjustments[this.adjustedIndex]=n,e[o.index]=n+(e[o.index]||0),this.adjustedIndex++}}else if(r>s){let e=r-s;for(;this.adjustedIndex>0&&this.appliedAdjustments[this.adjustedIndex-1]<e;){const t=this.adjustments[--this.adjustedIndex],o=this.adjustDetails[t.index];o.adjustmentIndex--,e-=this.appliedAdjustments[this.adjustedIndex],o.hidden=!1}}t!=this.adjustedIndex&&(this.props.onLayoutChange&&this.props.onLayoutChange(this.adjustedIndex-1),window.setTimeout(()=>{this.forceUpdate()},0))}}),this.addEventListener(window,"resize",()=>{this.updateLayout()})}render(){let e=r.Children.only(this.props.children);return r.cloneElement(e,e.props,r.Children.map(e.props.children,(e,t)=>{if(this.adjustDetails&&this.adjustDetails[t]){if(this.adjustDetails[t].hidden)return r.createElement("div",{key:"PH"+t,className:"responsive-placeholder"});if(this.adjustDetails[t].adjustmentIndex>=0){const o=e,s=Object.assign({},o.props,{adjustmentIndex:this.adjustDetails[t].adjustmentIndex});return r.cloneElement(o,s,o.props&&o.props.children)}}return e}))}componentDidMount(){super.componentDidMount(),this.updateLayout()}componentDidUpdate(e,t){super.componentDidUpdate(e,t),this.updateLayout()}resetLayout(){delete this.adjustDetails,this.adjustedIndex=0}}}(),function(e){I=t[e]={},Object.defineProperty(t,"__esModule",{value:!0}),function(o){for(var s in o)t[e].hasOwnProperty(s)||(t[e][s]=o[s])}(x)}("ResponsiveLayout"),function(e){P=t.CommandBarCommandBarFlyout={},Object.defineProperty(t,"__esModule",{value:!0});class s extends o.VssComponent{constructor(){super(...arguments),this.onDismiss=(()=>{this.props.onDismiss&&this.props.onDismiss()})}render(){const e=r.Children.map(this.props.children,(e,t)=>e&&r.cloneElement(e,Object.assign({},e.props,{onDismiss:this.onDismiss}),e.props.children));return r.createElement(c.Callout,{ariaLabel:this.props.ariaLabel,className:o.css("command-bar-flyout",this.props.className),contentClassName:o.css("command-bar-flyout-content relative scroll-hidden",this.props.contentClassName),contentJustification:3,contentLocation:2,contentOrientation:0,id:this.props.id,escDismiss:this.props.escDismiss,lightDismiss:this.props.lightDismiss,modal:this.props.modal,onDismiss:this.onDismiss},r.createElement(d.FocusZone,{circularNavigation:!0,defaultActiveElement:this.props.defaultActiveElement||".command-bar-flyout-focus-element",focusOnMount:!0,handleTabKey:!0,includeDefaults:!0},r.createElement("div",{"aria-label":this.props.ariaLabel,className:"flex flex-column flex-grow scroll-hidden"},r.createElement("div",{className:"command-bar-flyout-focus-element",role:"presentation",tabIndex:-1}),e)))}componentWillUnmount(){super.componentWillUnmount(),this.calloutDismissed&&this.calloutDismissed()}}t.CommandBarCommandBarFlyout.CommandBarFlyout=s,o.VssComponent.register("commandBarFlyout",s)}(),function(e){_=t.CommandBarCommandBar={},Object.defineProperty(t,"__esModule",{value:!0});class n extends o.VssComponent{constructor(e,t){super(e,t),this.stateComponents={},this.components={},this.childCount=0,this.expand=((e,t,o)=>{if(t){if(!this.expanded||this.expandedKey!==e){if(this.components[e])return this.focusedKey&&this.focusedKey!==e&&this.focusComponent(this.components[e]),this.expandedReason=o,this.expandedKey=e,this.expanded=!0,this.forceUpdate(),!0}}else if(this.expandedKey===e&&this.expanded)return this.expandedReason=void 0,this.expandedKey=void 0,this.expanded=void 0,this.forceUpdate(),!0;return!1}),this.onBlur=(e=>{this.componentElement&&this.componentElement.contains(e.srcElement)&&this.setTimeout(()=>{this.processFocusChange=!0,this.forceUpdate()})}),this.onFocus=(e=>{if(this.focusElement===document.activeElement){const e=this.componentElement.querySelector("[tabIndex='-2']");e&&e.focus()}else this.componentElement&&this.componentElement.contains(e.target)&&(this.processFocusChange=!0,this.forceUpdate())}),this.onKeyDown=(e=>{if(!e.defaultPrevented&&this.focusedKey){let t,o=parseInt(this.focusedKey),s=o,n=!1,i=1===this.props.orientation?38:37,r=1===this.props.orientation?40:39;for(;e.which===i?(-1==--o&&(o=this.childCount-1),n=!0):e.which===r&&++o===this.childCount&&(o=0),o!==s;)if((t=this.components[o])&&this.focusComponent(t,n)){e.preventDefault();break}}}),this.onKeyDownBody=(e=>{this.setTimeout(()=>{this.onKeyDown(e)},0)}),this.processItems(e)}render(){this.componentDetails?this.childCount=this.componentDetails.length:this.props.children&&(this.childCount=r.Children.count(this.props.children));const e=[];let t;if(this.componentDetails?this.componentDetails.forEach((t,s)=>{e.push({groupKey:t.componentProperties&&t.componentProperties.groupKey,element:r.createElement(o.WrappedComponent,Object.assign({wrappedType:t.componentType},Object.assign(this.getItemProps(s.toString()),t.componentProperties,{key:s.toString()})))})},this):this.props.children&&r.Children.forEach(this.props.children,(t,o)=>{let s;t||(t=r.createElement("div",{className:"commandbar-item-placeholder"}),s={}),s="string"==typeof t.type?{ref:e=>{this.components[o.toString()]=e}}:this.getItemProps(o.toString()),e.push({groupKey:t.props&&(t.props.groupKey||t.props["data-groupKey"]),element:r.cloneElement(t,Object.assign(s,t.props),t.props.children)})}),this.props.groups){const o={};for(const e of this.props.groups)o[e.key]=e;const s=[];let n=void 0;for(const t of e){let e=void 0;if(t.groupKey&&(e=o[t.groupKey]),n&&e===n.group)n.items.push(t.element);else{let o=void 0;e&&(o=s.filter(t=>t.group===e)[0]),o?n=o:(n={group:e,items:[]},s.push(n)),n.items.push(t.element)}}t=[];let a=!1,p=!1,d=0;for(const e of s)e.group?(a&&e.group.useSeparators&&t.push(r.createElement(i,{key:"group-separator-"+(++d).toString()})),t.push(r.createElement("div",{key:"group-"+e.group.key,className:e.group.className,ref:e.group.ref},e.items)),e.group.useSeparators?(p=!0,a=!1):a=!0):(p&&t.push(r.createElement(i,{key:"group-separator-"+(++d).toString()})),t.push(...e.items),a=!0)}else t=e.map(e=>e.element);let s=r.createElement("div",{"aria-label":this.props["aria-label"],className:o.css("commandbar",this.props.className,this.props.componentRegion?"region-"+this.props.componentRegion:"",1===this.props.orientation?"flex-column":"flex-row",this.focusedKey?"focus":""),"data-renderedregion":this.props.componentRegion?this.props.componentRegion:null,ref:e=>{this.componentElement=e},role:"menubar",onFocus:this.onFocus,onKeyDown:e=>{this.onKeyDown(e.nativeEvent)}},r.createElement("div",{key:"focus.element",ref:e=>{this.focusElement=e},onFocus:this.onFocus,tabIndex:this.focusedKey?-1:0}),t);return this.responsiveProps&&(s=r.createElement(I.ResponsiveLayout,Object.assign({ref:e=>{this.responsiveLayout=e},orientation:1===this.props.orientation?1:0},this.responsiveProps),s)),s}componentDidUpdate(e,t){if(super.componentDidUpdate(e,t),this.processFocusChange){let e=!1;for(let t in this.components){const o=this.components[t];if(o){const s=p.findDOMNode(o);if(s&&document.activeElement&&u.contains(s,document.activeElement)){this.focusedKey!==t?"-2"===document.activeElement.getAttribute("tabIndex")&&(this.addEventListener(document.body,"blur",this.onBlur,!0),-1===navigator.userAgent.toLowerCase().indexOf("trident")&&this.addEventListener(document.body,"keydown",this.onKeyDownBody),this.expanded&&this.expand(t,!0,"focus"),e=!0,this.focusedKey=t,this.forceUpdate()):e=!0;break}}}e||(this.expandedKey&&this.expand(this.expandedKey,!1,"blur"),this.focusedKey&&(this.focusedKey=void 0,this.removeEventListener(document.body,"blur",this.onBlur,!0),this.removeEventListener(document.body,"keydown",this.onKeyDownBody),this.forceUpdate())),delete this.processFocusChange}}componentWillReceiveProps(e){if(super.componentWillReceiveProps(e),this.processItems(e),this.focusedKey&&(e.children||this.componentDetails)){const t=this.components[this.focusedKey];if(t){let o=!1;if(e.children)r.Children.map(this.props.children,(e,s)=>{(e.key===t.props.key||e.key===t.props.navigationId||t.props.contributedNavigation&&e.key===t.props.contributedNavigation.id)&&(o=!0)});else if(this.componentDetails)for(let e=0;e<this.componentDetails.length;e++){const s=this.componentDetails[e];if(s.componentProperties&&s.componentProperties.key===t.props.key){o=!0;break}}if(!o){let e,t=parseInt(this.focusedKey),o=t;for(;!((e=this.components[t])&&this.focusComponent(e)||(-1==--t&&(t=this.childCount-1),t===o)););}}}this.components={},this.stateComponents={}}focus(e){this.focusComponent(this.components[e.toString()])}resetLayout(){this.responsiveLayout&&this.responsiveLayout.resetLayout()}processItems(e){if(e.componentRegion){const t=this.context.pageContext.getService("IVssLayoutManager");this.componentDetails=t.getComponentsForRegion(e.componentRegion)}else e.items?this.componentDetails=e.items:this.componentDetails=void 0;if(e.responsiveProps){this.responsiveProps={adjustments:[],ignoredChildren:e.responsiveProps.ignoredChildren.slice(0,e.responsiveProps.ignoredChildren.length),onLayoutChange:e.responsiveProps.onLayoutChange};for(let t=0;t<e.responsiveProps.adjustments.length;t++)this.responsiveProps.adjustments[t]=Object.assign({},e.responsiveProps.adjustments[t]),this.responsiveProps.adjustments[t].index++;this.responsiveProps.ignoredChildren.splice(0,0,...[!0])}}focusComponent(e,t){const o=p.findDOMNode(e);if(o){let e;if("-2"===o.getAttribute("tabIndex"))e=o;else if(t){const t=o.querySelectorAll("[tabIndex='-2']");e=t.item(t.length-1)}else e=o.querySelector("[tabIndex='-2']");if(e)return e.focus(),!0}return!1}getItemProps(e){return{itemKey:e,expand:this.expand,expandOnHover:!0,expanded:this.expandedKey===e,expandedReason:this.expandedReason,mouseHoverDelayMs:this.expanded?0:200,ref:t=>{this.components[e]=this.stateComponents[e]||t},selected:this.focusedKey===e,shouldFocusOnMount:!!this.focusedKey}}}n.componentType="commandBar",t.CommandBarCommandBar.CommandBarComponent=n,o.VssComponent.register(n.componentType,n),o.VssComponent.register("commandbar",n);class i extends r.Component{render(){return r.createElement("div",{className:"flex separator",role:"separator"},r.createElement("div",{className:o.css("flex-cell","separator-item",this.props.className)}))}}i.componentType="commandBarSeperator",t.CommandBarCommandBar.CommandBarSeperatorComponent=i,o.VssComponent.register("commandBarSeparator",i),o.VssComponent.register(i.componentType,i);class a extends r.Component{constructor(e,t){super(e,t),this.onSearchExpanded=(()=>{this.setState({searchExpanded:!0})}),this.onSearchCollapsed=(()=>{this.setState({searchExpanded:!1})}),window.addEventListener("searchExpanded",this.onSearchExpanded),window.addEventListener("searchCollapsed",this.onSearchCollapsed),this.state={searchExpanded:!1}}componentWillUnmount(){window.removeEventListener("searchExpanded",this.onSearchExpanded),window.removeEventListener("searchCollapsed",this.onSearchCollapsed)}render(){return this.state.searchExpanded?null:r.createElement(i,Object.assign({},this.props))}}a.componentType="verticalHeaderCommandBarSeperator",t.CommandBarCommandBar.VerticalHeaderCommandBarSeparatorComponent=a,o.VssComponent.register("verticalHeaderCommandBarSeperator",a),o.VssComponent.register(a.componentType,a);t.CommandBarCommandBar.CommandBarChildComponent=class extends o.VssComponent{render(){return r.createElement("div",{"aria-label":this.props["aria-label"],className:o.css("commandbar-item",this.props.className,this.props.selected||this.props.expanded?" selected":""),id:this.props.id,role:"menuitem",tabIndex:this.props.noTabIndex?void 0:this.props.selected?0:-2},this.props.children)}};class d extends o.VssComponent{constructor(e,t){super(e,t),this.onDivClick=(e=>{if(!e.isDefaultPrevented()){if(this.props.telemetrySource){this.context.pageContext.getService("IVssTelemetryService").publishEvent("WebPlatform","Command",Object.assign({},this.props.telemetryProperties||{},{source:this.props.telemetrySource}))}this.props.onClick&&this.props.onClick(e)}}),this.onDivKeyDown=(e=>{e.isDefaultPrevented()||32!==e.which&&13!==e.which||this.onDivClick(e)}),this.computeHref(e)}render(){const e=!!this.href,t=o.css("commandbar-item commandbar-item-command",this.props.className),s={"aria-label":this.props["aria-label"],id:this.props.id,role:"menuitem",tabIndex:this.props.noTabIndex?void 0:this.props.selected?0:-2},n=[];return this.props.iconName&&n.push(r.createElement(m.Icon,{key:"icon",className:"commandbar-item-icon",iconName:this.props.iconName})),this.props.text&&n.push(r.createElement("span",{key:"text",className:"commandbar-item-text"},this.props.text)),n.splice(n.length,0,this.props.children),e?r.createElement(h.FPSLinkComponent,Object.assign({},s,{className:o.css("commandbar-item-link",t,this.props.selected||this.props.expanded?" selected":""),href:this.href,supportsFPS:!0===this.props.supportsFPS,title:this.props.title,onClick:this.props.onClick,onMouseDown:e=>{e.preventDefault()},telemetrySource:this.props.telemetrySource||"commandBarCommand",telemetryProperties:this.props.telemetryProperties,navigationId:this.props.navigationId}),n):r.createElement("div",Object.assign({},s,{className:o.css("commandbar-item-button cursor-pointer",t,this.props.selected?"selected":""),role:"button",title:this.props.title,onClick:this.onDivClick,onKeyDown:this.onDivKeyDown,onMouseDown:e=>{e.preventDefault()}}),n)}componentWillReceiveProps(e){super.componentWillReceiveProps(e),this.computeHref(e)}computeHref(e){e.href?this.href=e.href:e.routeId?this.href=s.routeUrl(this.context.pageContext,e.routeId,e.routeValues||{}):this.href=void 0}}d.componentType="commandBarCommand",t.CommandBarCommandBar.CommandBarCommandComponent=d,o.VssComponent.register("commandBarLink",d),o.VssComponent.register(d.componentType,d);class c extends o.VssComponent{constructor(){super(...arguments),this.onKeyDown=(e=>{if(this.element&&this.element.contains(e.target)&&!e.defaultPrevented){const t=this.props.expandKey||40;(13===e.which||e.which===t||e.shiftKey&&121===e.which)&&(this.props.expand&&this.props.itemKey&&this.props.expand(this.props.itemKey,!0,e.type),e.preventDefault())}}),this.onMouseEnter=(e=>{if(this.props.expandOnHover&&this.props.expand){const t=e.type;this.hoverTimeout&&this.clearTimeout(this.hoverTimeout),this.hoverTimeout=this.setTimeout(()=>{this.props.expand&&this.props.itemKey&&this.props.expand(this.props.itemKey,!0,t)},this.props.mouseHoverDelayMs)}}),this.onMouseLeave=(e=>{this.hoverTimeout&&(this.clearTimeout(this.hoverTimeout),delete this.hoverTimeout)}),this.onClick=(e=>{this.element&&this.element.contains(e.target)&&this.props.expand&&this.props.itemKey&&!e.defaultPrevented&&this.props.expand(this.props.itemKey,!this.props.expanded,e.type)}),this.touchEnd=(e=>{this.props.expand&&this.props.itemKey&&!this.props.expanded&&(this.props.expand(this.props.itemKey,!0,e.type),e.preventDefault())})}render(){return r.createElement("div",{"aria-controls":this.props.expanded?this.props.calloutId:void 0,"aria-expanded":this.props.expanded,"aria-haspopup":!0,"aria-label":this.props["aria-label"],"aria-owns":this.props.expanded?this.props.calloutId:void 0,className:o.css("commandbar-item cursor-pointer",this.props.className,this.props.selected||this.props.expanded?"selected":"",this.props.expanded?"expanded":""),id:this.props.id,ref:e=>this.element=e,role:"menuitem",tabIndex:this.props.noTabIndex?void 0:this.props.selected?0:-2,onClick:this.onClick,onMouseDown:e=>{this.element&&this.element.contains(e.target)&&e.preventDefault()},onKeyDown:this.onKeyDown,onMouseEnter:this.onMouseEnter,onMouseLeave:this.onMouseLeave,onTouchEnd:this.touchEnd},this.props.iconName&&r.createElement(m.Icon,{iconName:this.props.iconName}),this.props.children)}}t.CommandBarCommandBar.CommandBarExpandableComponent=c;class l extends o.VssComponent{constructor(e){super(e),e.menuProps&&(this.menuId=e.menuProps.id),this.menuId=this.menuId||"menu"+this.componentId}render(){const e=this.props.expanded?this.getMenuProps():null;return r.createElement(c,Object.assign({},this.props,{calloutId:this.props.expanded?this.menuId:void 0,className:o.css("commandbar-item-menu",this.props.className),id:"cmec"+this.componentId}),this.props.children,this.props.expanded?r.createElement(o.WrappedComponent,{wrappedType:"contextualMenu",wrappedRef:e=>{this.menuComponent=e},wrappedProps:e,dependencies:["ms.vss-features.ui-content"]}):null)}componentDidMount(){super.componentDidMount(),this.props.expanded&&this.forceUpdate()}getMenuProps(){let e=[];return this.props.menuId&&e.push(new y.ContributedMenuItemProvider(this.context.pageContext,this.props.menuId)),this.props.menuProps&&this.props.menuProps.providers&&e.push(...this.props.menuProps.providers),Object.assign({gapSpace:0,id:this.menuId,items:this.props.items||[],providers:e,bounds:{left:0,top:0,right:window.innerWidth,bottom:window.innerHeight,width:window.innerWidth,height:window.innerHeight}},this.props.menuProps,{mouseLeaveDelayMs:this.props.expandedReason&&"mouseenter"===this.props.expandedReason?this.props.mouseLeaveDelayMs:0,onDismiss:e=>{this.props.expand&&this.props.itemKey&&this.props.expand(this.props.itemKey,!1,e&&e.type)},shouldFocusOnMount:this.props.shouldFocusOnMount,target:"#cmec"+this.componentId})}}l.defaultProps=Object.assign({mouseLeaveDelayMs:500,mouseHoverDelayMs:200},o.VssComponent.defaultProps),t.CommandBarCommandBar.CommandBarMenuComponent=l,o.VssComponent.register("commandBarMenu",l);class C extends o.VssComponent{constructor(){super(...arguments),this.onDismiss=(()=>{this.props.expand&&this.props.itemKey&&this.props.expand(this.props.itemKey,!1)})}render(){return r.createElement(c,Object.assign({},this.props,{expandOnHover:!1,calloutId:this.props.expanded?"flyout"+this.componentId:void 0,className:o.css("commandbar-item-flyout",this.props.className),id:"cpec"+this.componentId}),this.props.children,this.props.expanded?r.createElement(P.CommandBarFlyout,Object.assign({},this.props.commandBarFlyoutProps,{id:"flyout"+this.componentId,onDismiss:this.onDismiss,openingElement:"#cpec"+this.componentId}),r.createElement(o.WrappedComponent,Object.assign({},this.props.wrappedComponent,{expandedReason:this.props.expandedReason}))):null)}}t.CommandBarCommandBar.CommandBarFlyoutComponent=C,o.VssComponent.register("commandBarFlyoutComponent",C)}(),function(e){t[e]={},Object.defineProperty(t,"__esModule",{value:!0}),function(o){for(var s in o)t[e].hasOwnProperty(s)||(t[e][s]=o[s])}(_)}("CommandBar"),function(e){S=t.ContributedContentComponent={},Object.defineProperty(t,"__esModule",{value:!0}),t.ContributedContentComponent.ContributedContentComponent=function(e){const t=Object.assign({},e.componentProperties,e.contribution.componentProperties,{className:l.css(e.className,e.componentProperties&&e.componentProperties.className,e.contribution.componentProperties&&e.contribution.componentProperties.className)}),s=[...e.dependencies||[],...e.contribution.dependencies||[]];return e.contribution.uri?r.createElement(o.WrappedComponent,{dependencies:s.concat(["ms.vss-web.ext-content"]),wrappedType:"ExternalContent",wrappedProps:Object.assign({},t,{contributionId:e.contributionId})}):e.contribution.componentType?r.createElement(o.WrappedComponent,{dependencies:s,wrappedType:e.contribution.componentType,wrappedProps:t}):null}}(),function(e){t.ContributedPivotBarActionProvider={},Object.defineProperty(t,"__esModule",{value:!0});t.ContributedPivotBarActionProvider.ContributedPivotBarActionProvider=class{constructor(e){this._pageContext=e.context,this._targetId=e.targetId,this._contributionType=e.contributionType||"ms.vss-web.action",this._getContext=e.getContext}loadItems(e){const t=this._pageContext.getService("IVssContributionService"),o=t.getContributionChildren(this._targetId,this._contributionType),s=[];if(o)for(const e of o){const o=t.getContribution(e);if(o){const n={key:e,name:o.text?o.text:o.title,iconProps:o.iconProps||b.contributionIconToIconProps(this._pageContext,e,o.icon),important:o.important,command:o.command,registeredObjectId:o.registeredObjectId,uri:o.uri,onClick:(o,s)=>{if(n){let o;if(this._getContext&&(o=this._getContext(n)),n.command)t.executeCommandEx(e,n.command,o);else{const e={serviceName:n.registeredObjectId||n.key,uri:n.uri,configuration:o};t.getServiceEx(n.key,e,!0).then(e=>{e&&e.execute&&e.execute(o)})}}}};s.push(n)}}e(s),(t.getContributionChildren(this._targetId,"ms.vss-web.action-provider")||[]).forEach(o=>{t.getService(o,!0).then(t=>{if(t){const s=this._getContext?this._getContext({key:o},!0):void 0;if(t.loadItems)t.loadItems((t,o)=>{e(t,o)},s);else if(t.getMenuItems){const n=e=>{const t=[];for(let s=0;s<e.length;s++){const n=e[s];let i=this._convertContributedMenuToPivotAction(n,o,s.toString());t.push(i)}return t},i=t.getMenuItems(s||{});i instanceof Promise?i.then(t=>{e(n(t),[])}):e(n(i),[])}}})})}_convertContributedMenuToPivotAction(e,t,o){let s={key:t+o,name:e.text?e.text:e.title,iconProps:b.contributionIconToIconProps(this._pageContext,this._targetId,e.icon),separator:e.separator,disabled:e.disabled,href:e.href,onClick:(o,s)=>{if(e.action){const o=this._getContext?this._getContext({key:t},!0):void 0;e.action(o)}}};if(e.childItems&&e.childItems instanceof Array){let n=[];e.childItems.forEach((e,s)=>{n.push(this._convertContributedMenuToPivotAction(e,t,o+"."+s.toString()))}),s.children=n}return s}}}(),function(e){function s(e,t,o,s){const n={id:t.id||t.itemKey||"",text:t.text||t.name||"",itemKey:t.itemKey,groupKey:t.groupKey,order:t.order,render:o,hidden:t.hidden,iconProps:t.iconProps};if(t.routeId){const o=e.getService("IVssLocationService");n.url=o.routeUrl(t.routeId,t.routeValues)}return(s||t.fpsRequired)&&(n.onBeforePivotChange=((t,o,s)=>!s||(C.FastPageSwitch(e,s,!0),t&&t.preventDefault(),!1))),n}t.ContributedPivotBarItemProvider={},Object.defineProperty(t,"__esModule",{value:!0}),t.ContributedPivotBarItemProvider.createPivotBarItem=s;t.ContributedPivotBarItemProvider.ContributedPivotBarItemProvider=class{constructor(e){this._pageContext=e.pageContext,e.tabGroupIds?this._tabGroupIds=e.tabGroupIds:e.contributions&&(this._contributions=e.contributions),this._tabType=e.tabType||"ms.vss-web.tab",this._getContext=e.getContext,this._additionalProps=e.props,this._dependencies=e.dependencies||[],this._loadingComponent=e.loadingComponent,this._getMutatedPivotBarItem=e.getMutatedPivotBarItem,this._loadedPivots=[],this._fpsRequired=!!e.fpsRequired}loadItems(e){const t=this._pageContext.getService("IVssContributionService"),o=this._getContributions(t),s=[];for(const e of o){const t=e.id;let o=e.pivotContribution;if(o&&(this._getMutatedPivotBarItem&&(o=this._getMutatedPivotBarItem(e,o)),o)){const e=this._getRenderMethod(o,t);if(e){const n=this._makeContributedPivotBarItem(o,t,e);-1===this._loadedPivots.indexOf(n.id)&&(this._loadedPivots.push(n.id),s.push(n))}else console.warn(`Cannot render contributed pivot ${t}.`)}}s.length>0&&e(s);let n=[];(this._tabGroupIds||[]).forEach(e=>{n=n.concat(t.getContributionChildren(e,"ms.vss-web.tab-provider")||[])}),n.forEach(o=>{t.getService(o).then(t=>{if(t){const s=this._getContext?this._getContext(o,!0):void 0;t.loadItems(t=>{const o=[];for(let e of t)-1===this._loadedPivots.indexOf(e.id)&&(this._loadedPivots.push(e.id),o.push(e));o.length>0&&e(o)},s)}})})}_getContributions(e){return this._tabGroupIds?this._queryContributions(e):this._contributions?this._contributions:[]}_queryContributions(e){const t=[];for(const o of this._tabGroupIds){const s=e.getContributionChildren(o,this._tabType);if(s){const o=s.map(t=>({id:t,pivotContribution:e.getContribution(t)})).filter(e=>!!e.pivotContribution);o.length>0&&t.push(...o)}}return t}_makeContributedPivotBarItem(e,t,o){const n=s(this._pageContext,e,o,this._fpsRequired);return n.id=t,n.sourceContribution=Object.assign({id:t},e),n}_getRenderMethod(e,t){const o=e.moduleContent;if(o)return this._fpsRequired||e.fpsRequired?t=>this._renderExternalHub(o,t,e.dependencies):t=>this._renderByContributionId(o,t,e.dependencies);if(e.uri)return o=>this._renderExternalContent(e.id||t,o,e.dependencies,e.componentProperties);if(e.id||e.uri||e.content)return o=>this._renderByContributionId(e.id||t,o,e.dependencies);if(e.componentType){const o=e.componentType;return s=>this._renderComponent(e,t,o,s)}return null}_renderComponent(e,t,s,n){let i=e.componentProperties?Object.assign({},e.componentProperties):{};return i=Object.assign({},i,this._additionalProps,this._getContext?Object.assign({},this._getContext(t)):{},{className:l.css(i.className,n)}),r.createElement(o.WrappedComponent,{dependencies:this._dependencies.concat(e.dependencies||[]),key:t,wrappedProps:i,wrappedType:s})}_renderExternalContent(e,t,s,n){return r.createElement(o.WrappedComponent,{dependencies:this._dependencies.concat(s||[]).concat(["ms.vss-web.ext-content"]),key:e,wrappedType:"ExternalContent",wrappedProps:Object.assign({contributionId:e},n,this._additionalProps,{initialHandshakeData:this._getContext?Object.assign({},this._getContext(e)):{},className:l.css(t,"flex-grow")})})}_renderExternalHub(e,t,s){return r.createElement(o.WrappedComponent,{key:e,dependencies:["ms.vss-web.legacy-content","ms.vss-web.legacy-vss-ui-content"],wrappedType:"legacy",wrappedProps:{className:t,componentType:"legacyHubShimComponent",dependentContributionIds:this._dependencies.concat(s||[]),modules:["VSSPreview/Flux/Components/ExternalHubShim"],contributionId:e}})}_renderByContributionId(e,t,s){let n=void 0;return this._getContext&&(n=this._getContext(e)),r.createElement(o.WrappedComponent,{key:e,dependencies:["ms.vss-web.legacy-content","ms.vss-web.legacy-vss-ui-content"],wrappedType:"legacy",wrappedProps:{componentType:"vssLegacyContributionContentHost",modules:["VSSPreview/Providers/ContentHost"],dependentContributionIds:this._dependencies.concat(s||[]),wrappedProps:{className:t,context:n,contribution:e,loadingComponent:this._loadingComponent},loadingComponent:this._loadingComponent}})}}}(),function(e){t.ContributedTabProvider={},Object.defineProperty(t,"__esModule",{value:!0});t.ContributedTabProvider.ContributedTabProvider=class extends a.ObservableArray{constructor(e){super(void 0),this.pageContext=e.pageContext,this.tabGroupIds=e.tabGroupIds||[],this.defaultRouteId=e.defaultRouteId,this.updateUrlOnPivotChange=e.updateUrlOnPivotChange,this.additionalProps=e.props||{},this.routeValues=e.routeValues||{},this.providerData=[],this.loadItems()}dispose(){this.providerData.forEach(e=>{e.provider.unsubscribe(e.processProvider),"function"==typeof e.provider.dispose&&e.provider.dispose()})}loadItems(){const e=this.pageContext.getService("IVssContributionService"),t=this.tabGroupIds;let o=[];(t||[]).forEach(t=>{o=o.concat(e.getContributionChildren(t,"ms.vss-web.tab-provider")||[])});const s=e.getContributionChildren(t[0],"ms.vss-web.tab"),n=s.map(t=>{const o=e.getContribution(t);return o.id?o:Object.assign({},o,{id:t})});n.forEach((e,t)=>{if(e){const o=s[t];e.render=(()=>r.createElement(S.ContributedContentComponent,{key:o,className:"flex-grow",contributionId:o,contribution:e,dependencies:e.dependencies,componentProperties:this.additionalProps})),this.addAdditionalProperties(e,o)}});const i=[];if(o&&o.length>0){for(let t of o){let o;(o=e.getServiceSync(t,!0))?(this.processContributedService(t,o),n.push(...o.value)):i.push(t)}if(i.length>0)for(let t of i)e.getService(t).then(e=>{e&&(this.processContributedService(t,e),this.push(...e.value))})}this.push(...n)}processContributedService(e,t){const o={contributionId:e,provider:t,processProvider:t=>{if(t.addedItems){for(let o of t.addedItems)this.addAdditionalProperties(o,e);this.push(...t.addedItems)}}};for(let o of t.value)this.addAdditionalProperties(o,e);o.provider.subscribe(o.processProvider),this.providerData.push(o)}addAdditionalProperties(e,t){if(e.routeId){const t=this.pageContext.getService("IVssLocationService");e.url=t.routeUrl(e.routeId,Object.assign({},this.routeValues,e.routeValues))}else if(this.defaultRouteId){const o=this.pageContext.getService("IVssLocationService");e.url=o.routeUrl(this.defaultRouteId,{contributionId:t})}e.fpsRequired?e.onBeforeTabChange=((e,t,o)=>!o||(C.FastPageSwitch(this.pageContext,o,!0),e&&e.preventDefault(),!1)):e.url&&this.updateUrlOnPivotChange&&(e.onBeforeTabChange=((t,o,s)=>(this.pageContext.getService("IVssHistoryService").pushState(void 0,e.url&&a.ObservableLike.getValue(e.url)),!0)))}}}(),function(e){E=t.FPSLinkFPSLink={},Object.defineProperty(t,"__esModule",{value:!0});t.FPSLinkFPSLink.FPSLink=class extends o.VssComponent{constructor(){super(...arguments),this.onClick=(e=>{this.props.onClick&&this.props.onClick(e),e.isDefaultPrevented()||(this.props.href&&!1!==this.props.supportsFPS?C.onClickFPS(this.context.pageContext,this.props.href,!0,e,{telemetrySource:this.props.telemetrySource,telemetryProperties:this.props.telemetryProperties,navigationId:this.props.navigationId}):this.props.telemetrySource&&this.context.pageContext.getService("IVssTelemetryService").publishEvent("WebPlatform","Link",Object.assign({},this.props.telemetryProperties||{},{source:this.props.telemetrySource})))})}render(){const e=Object.assign({},this.props,{onClick:this.onClick});return r.createElement(f.Link,Object.assign({},e))}}}(),function(e){t[e]={},Object.defineProperty(t,"__esModule",{value:!0}),function(o){for(var s in o)t[e].hasOwnProperty(s)||(t[e][s]=o[s])}(E)}("FPSLink")},["Resources","AssetResolver/AssetResolver","AssetResolver/index","AssetResolver","ContributedIconUtil","ContributedMenuItemProvider","ResponsiveLayout/ResponsiveLayout","ResponsiveLayout","CommandBar/CommandBarFlyout","CommandBar/CommandBar","CommandBar","ContributedContentComponent","ContributedPivotBarActionProvider","ContributedPivotBarItemProvider","ContributedTabProvider","FPSLink/FPSLink","FPSLink"]),document.dispatchEvent(new CustomEvent("scriptLoaded",{cancelable:!1,detail:{id:"ms.vss-features.frame-content"}}));