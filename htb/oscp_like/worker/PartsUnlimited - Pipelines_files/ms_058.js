"use strict";define("VSSUI",["require","exports","react"],function(e,n,t){var o,i;!function(e){o=n.ComponentsCoinCoinInitials={},Object.defineProperty(n,"__esModule",{value:!0});const t={red:45,green:137,blue:239},i=[{red:153,green:180,blue:51},{red:107,green:165,blue:231},{red:231,green:115,blue:189},{red:0,green:163,blue:0},{red:30,green:113,blue:69},{red:255,green:0,blue:151},{red:126,green:56,blue:120},{red:96,green:60,blue:186},{red:116,green:133,blue:202},{red:0,green:171,blue:169},t,{red:43,green:87,blue:151},{red:218,green:83,blue:44},{red:185,green:29,blue:71}],r=["[0-9]","[A-Z]","[Ѐ-Я]","[a-z]","[ά-ώ]","[ǅ]","[ῼ]","[ʰ-ˁ]","[ᴬ-ᵡ]","[א-ת]","[ء-غ]","[一-鿃]","[À-ÿ]","[Ā-ſ]","[ƀ-ɏ]"].join("|");n.ComponentsCoinCoinInitials.getInitialsColorFromName=function(e){if(!e)return t;let n=0;for(let t=e.length-1;t>=0;t--){const o=e.charCodeAt(t),i=t%8;n^=(o<<i)+(o>>8-i)}return i[n%i.length]},n.ComponentsCoinCoinInitials.getInitialsFromName=function(e){if(!e)return"";const n=e.split(" ").filter(e=>""!==e);if(0===n.length)return"";let t="",o="";return n.forEach(e=>{e[0].match(r)&&(0===t.length?t=e[0]:o=e[0])}),t.concat(o).toUpperCase()}}(),function(e){i=n.ComponentsCoinCoin={},Object.defineProperty(n,"__esModule",{value:!0});n.ComponentsCoinCoin.Coin=class extends t.Component{constructor(e){super(e),this.onImageError=(e=>{this.setState({imageError:!0})}),this.onLoad=(e=>{this.setState({imageLoaded:!0})}),this.handleKeyDown=(e=>{13!==e.keyCode&&32!==e.keyCode||this.props.onClick&&this.props.onClick()}),this.state={imageError:!1,imageLoaded:!1,showIdentityCard:!1}}render(){const{className:e,displayName:i,dataIsFocusable:r,onClick:s,isTabStop:a,imgAltText:l="",imageUrl:c,size:d}=this.props,m="size"+d,u={};r&&(u["data-is-focusable"]=!0),a&&(u.tabIndex=0),s&&(u.onKeyDown=this.handleKeyDown,u.onClick=s),u["aria-label"]=i;const g=o.getInitialsColorFromName(i),C=t.createElement("div",{className:n.Util.css("bolt-coin-content",m),style:g&&{background:n.UtilitiesColor.getColorString(g)}},t.createElement("span",null,o.getInitialsFromName(i))),p=void 0===c||this.state.imageError?C:t.createElement(t.Fragment,null,t.createElement("img",{className:n.Util.css("bolt-coin-content using-image",m,!this.state.imageLoaded&&"pending-load-image"),src:c,alt:l,onError:this.onImageError,onLoad:this.onLoad}),!this.state.imageLoaded&&C);return t.createElement(t.Fragment,null,t.createElement(n.TooltipEx.Tooltip,{text:i,showOnFocus:!0},t.createElement("div",Object.assign({className:n.Util.css("bolt-coin flex-noshrink",e,m,s&&"cursor-pointer")},u),p)))}}}(),n.Coin={},Object.defineProperty(n,"__esModule",{value:!0}),n.Coin.Coin=i.Coin},["Components/Coin/Coin.Initials","Components/Coin/Coin","Coin"]),document.dispatchEvent(new CustomEvent("scriptLoaded",{cancelable:!1,detail:{id:"ms.vss-features.ui-coin-content"}}));