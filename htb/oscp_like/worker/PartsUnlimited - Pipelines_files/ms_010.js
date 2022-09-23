"use strict";define("VSSUI",["require","exports","react"],function(e,t,o){var n,i;!function(e){n=t.ComponentsAccordionAccordion={},Object.defineProperty(t,"__esModule",{value:!0});t.ComponentsAccordionAccordion.Accordion=class extends o.Component{constructor(e){super(e);const t={};if(this.props.initiallyExpandedGroups){for(const o of e.items)t[o.key]=!1;for(const e of this.props.initiallyExpandedGroups)t[e]=!0}else for(const o of e.items)t[o.key]=!0===e.initiallyExpandAll;this.state={expandedDictionary:t}}expand(e){const{expandedDictionary:t}=this.state;t[e]||this.toggleExpand(e)}collapse(e){const{expandedDictionary:t}=this.state;t[e]&&this.toggleExpand(e)}render(){return o.createElement("div",{className:t.Util.css("accordion-root",this.props.className),role:this.props.items.length>1?"tablist":void 0},this.renderItems())}renderItems(){const{items:e}=this.props,t=[];for(let o=0;o<e.length;o++)t.push(this.renderItem(e[o],o));return t}renderItem(e,n){const{expandedDictionary:i}=this.state,s=this.props.items.length>1;return o.createElement("div",{className:"accordion-item",key:e.key},o.createElement(t.Button.Button,{subtle:!0,onClick:this.toggleExpand.bind(this,e.key),className:"accordion-header",ariaExpanded:i[e.key],ariaSetSize:s?this.props.items.length:void 0,ariaPosInSet:s?n+1:void 0},o.createElement(t.Icon.Icon,{iconName:i[e.key]?"ChevronDown":"ChevronRight",className:"accordion-chevron"}),o.createElement(t.TooltipEx.Tooltip,{overflowOnly:!0},o.createElement("div",{className:"text-ellipsis"},e.title||e.key))),o.createElement("div",{className:t.Util.css("accordion-content",!i[e.key]&&"hidden")},e.onRenderContent()))}toggleExpand(e){const{expandedDictionary:t}=this.state;t[e]=!t[e],this.props.onItemChanged&&this.props.onItemChanged(e,t[e]),this.forceUpdate()}}}(),function(e){i=t[e]={},Object.defineProperty(t,"__esModule",{value:!0}),function(o){for(var n in o)t[e].hasOwnProperty(n)||(t[e][n]=o[n])}(n)}("ComponentsAccordionindex"),function(e){t[e]={},Object.defineProperty(t,"__esModule",{value:!0}),function(o){for(var n in o)t[e].hasOwnProperty(n)||(t[e][n]=o[n])}(i)}("Accordion")},["Components/Accordion/Accordion","Components/Accordion/index","Accordion"]),document.dispatchEvent(new CustomEvent("scriptLoaded",{cancelable:!1,detail:{id:"ms.vss-features.ui-accordion-content"}}));