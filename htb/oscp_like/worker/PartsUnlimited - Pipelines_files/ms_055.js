"use strict";define("VSSUI",["require","exports","react"],function(e,t,a){var r,o,n,s;r=t.ComponentsCardCardContent={},Object.defineProperty(t,"__esModule",{value:!0}),t.ComponentsCardCardContent.CardContent=(e=>a.createElement(t.Surface.SurfaceContext.Consumer,null,r=>{const{contentPadding:o=!0}=e;return a.createElement("div",{className:t.Util.css(e.className,"bolt-card-content flex-row flex-grow",o&&r.horizontalClassName)},e.children)})),o=t.ComponentsCardCustomCard={},Object.defineProperty(t,"__esModule",{value:!0}),t.ComponentsCardCustomCard.CustomCard=(e=>a.createElement(t.Surface.SurfaceContext.Consumer,null,r=>a.createElement(t.Surface.Surface,Object.assign({},r,{spacing:1}),a.createElement("div",{className:t.Util.css(e.className,"bolt-card flex-column depth-8",1===r.background&&"bolt-card-white")},e.children)))),n=t.ComponentsCardCard={},Object.defineProperty(t,"__esModule",{value:!0}),t.ComponentsCardCard.Card=(e=>{const{titleProps:n={},headerClassName:s,headerCommandBarItems:d,headerDescriptionProps:C={}}=e,{text:l,className:c,size:m,ariaLevel:i}=n;return a.createElement(o.CustomCard,{className:t.Util.css(e.className,(l||d)&&"bolt-card-with-header")},(l||d)&&a.createElement(t.Header.Header,{className:t.Util.css(s,"bolt-card-header"),commandBarItems:d,description:C.text,descriptionClassName:C.className,title:l,titleAriaLevel:i,titleClassName:c,titleSize:m}),a.createElement(r.CardContent,Object.assign({},e.contentProps),e.children))}),s=t.ComponentsCardCardFooter={},Object.defineProperty(t,"__esModule",{value:!0}),t.ComponentsCardCardFooter.CardFooter=(e=>a.createElement(t.Surface.SurfaceContext.Consumer,null,r=>a.createElement("div",{className:t.Util.css(e.className,"bolt-card-footer flex-row flex-noshrink",r.horizontalClassName)},e.children))),t.Card={},Object.defineProperty(t,"__esModule",{value:!0}),t.Card.Card=n.Card,t.Card.CardContent=r.CardContent,t.Card.CardFooter=s.CardFooter,t.Card.CustomCard=o.CustomCard},["Components/Card/CardContent","Components/Card/CustomCard","Components/Card/Card","Components/Card/CardFooter","Card"]),document.dispatchEvent(new CustomEvent("scriptLoaded",{cancelable:!1,detail:{id:"ms.vss-features.ui-card-content"}}));