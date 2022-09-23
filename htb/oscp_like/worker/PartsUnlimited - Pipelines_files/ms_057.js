"use strict";define("Build/DesignerExtensions/YamlAssistant",["require","exports","Build/Flux/Store","VSS/Core/TimerManagement","Build/DesignerExtensions/YamlSnippetForm/Stores/SnippetFormStore","react","VSS/Core/Observable","VSS/Core/Util/String","VSS/Platform/Layout","VSSUI/HeaderCommandBar","VSSUI/Image","VSSUI/Intersection","VSSUI/List","VSSUI/Observer","VSSUI/Spinner","VSSUI/Tabs","VSSUI/TextField","VSSUI/TooltipEx","VSSUI/Utilities/Provider","Build/DesignerExtensions/YamlAssistantLibrary/Contracts/Constants","Build/DesignerExtensions/YamlAssistantLibrary/Components/ContributedSnippetForm"],function(e,t,s,i,n,r,a,o,l,p,c,S,d,m,h,u,_,g,b,v,x){var C,L,T,f;C=t.Resources={},Object.defineProperty(t,"__esModule",{value:!0}),t.Resources.FailedToLoadSnippet="Error loading task: {0}",t.Resources.SearchSnippetsLabel="Search tasks",t.Resources.SnippetsTabLabel="Tasks",t.Resources.VariablesTabLabel="Variables",t.Resources.CloseAssistant="Hide assistant",function(e){L=t.SourcesSnippetListSource={},Object.defineProperty(t,"__esModule",{value:!0});t.SourcesSnippetListSource.SnippetListSource=class{constructor(e){this._contributionService=e.getService("IVssContributionService")}getSnippets(){return this._snippetList?this._snippetList:(this._snippetList=this._contributionService.getData("ms.vss-build-web.yaml-assistant-data-provider")||[],this._snippetList)}}}(),function(e){T=t.StoresSnippetListStore={},Object.defineProperty(t,"__esModule",{value:!0});t.StoresSnippetListStore.SnippetListStore=class extends s.Store{constructor(){super(...arguments),this._searchText="",this._snippets=[],this._filteredSnippets=[],this._timerManagement=new i.TimerManagement}loadSnippets(e){this._throttledSearch=this._timerManagement.debounce(e=>this._searchSnippets(e),250),this._snippets=this._filteredSnippets=e,this.emitChanged()}getSnippets(){return this._filteredSnippets}getSearchText(){return this._searchText}filter(e){this._searchText=e,this._throttledSearch(e),this.emitChanged()}isLoading(){return 0===this._snippets.length}_searchSnippets(e){e?(e=e.toLocaleLowerCase(),this._filteredSnippets=this._snippets.filter(t=>t.friendlyName.toLocaleLowerCase().indexOf(e)>=0||t.description.toLocaleLowerCase().indexOf(e)>=0)):this._filteredSnippets=this._snippets,this.emitChanged()}}}(),function(e){f=t.ComponentsSnippetList={},Object.defineProperty(t,"__esModule",{value:!0});t.ComponentsSnippetList.SnippetList=class extends l.VssComponent{constructor(e){super(e),this._listRef=r.createRef(),this._isScrolled=new a.ObservableValue(!1),this._onScroll=(e=>{if(this._listRef&&this._listRef.current){const e=0!==this._listRef.current.scrollTop;this._isScrolled.value!==e&&(this._isScrolled.value=e)}}),this._renderRow=((e,t,s,i)=>r.createElement(d.ListItem,{key:i||"list-item"+e,index:e,details:s},r.createElement(g.Tooltip,{text:t.description},r.createElement("div",{className:"yaml-snippet-row"},r.createElement("div",{className:"flex-row h-scroll-hidden"},r.createElement(c.Image,{className:"yaml-snippet-icon",src:t.iconUrl}),r.createElement("div",{className:"snippet-row-main-column flex-column h-scroll-hidden"},r.createElement("span",{className:"text-ellipsis"},t.friendlyName),r.createElement("span",{className:"fontSize text-ellipsis secondary-text"},t.description))))))),this._getStateFromStore=(()=>{this.setState({snippets:this._store.getSnippets(),searchText:this._store.getSearchText(),loading:this._store.isLoading()})}),this._selectSnippet=((e,t)=>{e.stopPropagation(),e.preventDefault();const s=this.state.snippets[t.index];this.props.onSnippetSelected(s);const i=this.context.pageContext.getService("IVssTelemetryService");i&&i.publishEvent(v.TelemetryConstants.Area,v.TelemetryConstants.SnippetSelected,{name:s.friendlyName,version:s.version,isTemplate:Boolean(s.content)})}),this._onSelectedTabChanged=(e=>{this.setState({selectedTabId:e});const t=this.context.pageContext.getService("IVssTelemetryService");t&&t.publishEvent(v.TelemetryConstants.Area,v.TelemetryConstants.TabSwitch,{selectedTabId:e})}),this._tabCommands=(()=>r.createElement(p.HeaderCommandBar,{items:[{id:"hide-tasks",className:v.YamlAssistantToggleElement,onActivate:this.props.onDismiss,important:!0,iconProps:{iconName:"ClosePane"},ariaLabel:C.CloseAssistant,subtle:!0}]})),this.state={snippets:[],searchText:"",loading:!0,selectedTabId:"snippets"}}componentDidMount(){super.componentDidMount(),this._store=new T.SnippetListStore,this._store.addListener(this._getStateFromStore),this._source=new L.SnippetListSource(this.context.pageContext),this._loadSnippets()}componentWillUnmount(){super.componentWillUnmount(),this._store.dispose()}render(){return r.createElement("div",{className:"yaml-snippet-list flex-column flex-grow relative"},r.createElement(u.TabBar,{className:"snippet-list-tab-bar",tabSize:"compact",renderAdditionalContent:this._tabCommands,selectedTabId:this.state.selectedTabId,onSelectedTabChanged:this._onSelectedTabChanged},r.createElement("div",{role:"tab",className:"static-tab"},C.SnippetsTabLabel)),this._content())}_content(){return this.state.error&&this.state.error.message?r.createElement("span",null,o.format(C.FailedToLoadSnippet,this.state.error.message)):this.state.loading?r.createElement(h.Spinner,{size:"large"}):r.createElement(r.Fragment,null,r.createElement(m.Observer,{isScrolled:this._isScrolled},e=>r.createElement("div",{className:e.isScrolled?"scroll-decoration":void 0,role:"presentation","aria-hidden":"true"})),r.createElement(S.Intersection,{rootMargin:window.innerHeight/2},r.createElement("div",{className:"flex-grow scroll-auto",onScroll:this._onScroll,ref:this._listRef},r.createElement("div",{className:"snippet-search-container"},r.createElement(_.TextField,{value:this.state.searchText,className:"snippet-search-input flex-grow",placeholder:C.SearchSnippetsLabel,ariaLabel:C.SearchSnippetsLabel,prefixIconProps:{iconName:"Search"},onChange:(e,t)=>this._onSearchTextChanged(t),style:1})),r.createElement(d.List,{itemProvider:new b.ArrayItemProvider(this.state.snippets),renderRow:this._renderRow,selection:new d.ListSelection,singleClickActivation:!0,onActivate:this._selectSnippet,width:"100%",role:"list"}))))}_loadSnippets(){try{const e=this._source.getSnippets();this._store.loadSnippets(e)}catch(e){this.setState({error:e});const t=this.context.pageContext.getService("IVssTelemetryService");t&&t.publishEvent(v.TelemetryConstants.Area,v.TelemetryConstants.Error,{location:"loadSnippets",error:e})}}_onSearchTextChanged(e){this._store.filter(e)}}}(),function(e){t.YamlAssistantView={},Object.defineProperty(t,"__esModule",{value:!0});class s extends l.VssComponent{constructor(e){super(e),this._onYamlGenerated=(e=>{const t={yamlString:e,eventType:0};this.props.onYamlGenerated(t)}),this._onSnippetSelected=(e=>{this.setState({snippet:e})}),this._clearSnippet=(()=>{this.setState({snippet:void 0})}),this.state={}}render(){return r.createElement("div",{className:"yaml-assistant-view flex-column flex-grow"},this.state.snippet?r.createElement(x.ContributedSnippetForm,{onYamlGenerated:this._onYamlGenerated,onDismiss:this._clearSnippet,snippet:this.state.snippet}):r.createElement(f.SnippetList,{onDismiss:this.props.onDismiss,onSnippetSelected:this._onSnippetSelected}))}}t.YamlAssistantView.YamlAssistantView=s,l.Components.add("yaml-assistant-view",s)}()},["Resources","Sources/SnippetListSource","Stores/SnippetListStore","Components/SnippetList","YamlAssistantView"]),document.dispatchEvent(new CustomEvent("scriptLoaded",{cancelable:!1,detail:{id:"ms.vss-build-web.designer-extensions.yaml-assistant"}}));