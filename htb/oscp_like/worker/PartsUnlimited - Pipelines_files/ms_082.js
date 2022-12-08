"use strict";define("CodeCoverage/CodeCoverageTab",["require","exports","VSS/Reflux/Action","CodeCoverage/Common/Constants","CodeCoverage/Common/Sources/CodeCoverageSource","Tfs/Platform/Page","VSS/Core/Util/String","VSS/Platform/Location","react","VSS/Platform/Layout","OfficeFabric/DetailsList","VSSUI/Link","Test/TestSummary/Components/ResultSummaryDetailsChart","VSS/Reflux/Store","VSSUI/PickList","VSSUI/FilterBar","VSSUI/TextFilterBarItem","VSSUI/Utilities/Filter","VSS/Platform/Feature","VSSUI/Spinner","CodeCoverage/Common/Common","CodeCoverage/Common/RunViewArtifact","VSS/Core/Observable","VSS/Platform/Context"],function(e,t,o,r,i,a,s,n,l,d,c,u,C,g,v,m,h,S,p,f,_,b,L,T){var y,x,B,E,w,M,A,F,P,I,N,k,D;y=t.Resources={},Object.defineProperty(t,"__esModule",{value:!0}),t.Resources.LineCoverageText="Line Coverage",t.Resources.ModuleCoverageText="Modules",t.Resources.TotalCoverageLinesText="Total Lines",t.Resources.CoveredLinesText="Covered Lines",t.Resources.CoverageVisualText="Coverage Chart",t.Resources.CoverageModuleFilterPlaceholder="Filter by module name",t.Resources.BuildConfigurationText="Build configuration",t.Resources.BuildPlatformText="Build platform",t.Resources.EmptyLiteralText="empty",t.Resources.DownloadCodeCoverageResults="Download code coverage results",t.Resources.BuildDetailsSummaryNoCodeCoverageNoLink="No code coverage data available.",t.Resources.UpgradeToModernBrowser="Please upgrade to a newer version of your browser to view Code Coverage data.",t.Resources.NoBuildArtifactsFound='Code coverage report cannot be rendered as report HTML was not found. Please verify that "Report Directory" containing an HTML report was specified when [publishing code coverage](https://go.microsoft.com/fwlink/?linkid=2081549).',t.Resources.BuildCodeCoverageNoResults="( Coverage results unavailable to download )",function(e){x=t.ActionsCodeCoverageTabActionHub={},Object.defineProperty(t,"__esModule",{value:!0});class r{constructor(){this.updateModuleFilterText=new o.Action,this.updateBuildConfigSelection=new o.Action,this.updateBuildCodeCoverage=new o.Action,this.updateCodeCoverageSummary=new o.Action,this.updateNoCodeCoverageMessage=new o.Action}static getInstance(){return r._instance||(r._instance=new r),r._instance}}t.ActionsCodeCoverageTabActionHub.CodeCoverageTabActionHub=r}(),function(e){B=t.ActionsCodeCoverageTabActionCreator={},Object.defineProperty(t,"__esModule",{value:!0});class o{constructor(e){this.pageContext=e,this._actions=x.CodeCoverageTabActionHub.getInstance(),this._source=i.CodeCoverageSource.getInstance(e),this._perfService=this.pageContext.pageContext.getService("IVssPerformanceService")}static getInstance(e){return o._instance||(o._instance=new o(e)),o._instance}updateModuleFilter(e){this._actions.updateModuleFilterText.invoke(e)}updateBuildConfigSelection(e){this._actions.updateBuildConfigSelection.invoke(e)}fetchBuildCodeCoverage(e){this._perfService.startScenario(r.PerfScenarios.APICall,!1,void 0,{Call:"getBuildCodeCoverage"}),this._source.getBuildCodeCoverage(e).then(t=>{t&&t.length?this._actions.updateBuildCodeCoverage.invoke(this._getCodeCoverageDetails(t)):this.fetchCodeCoverageHTMLSummary(e),this._perfService.endScenario(r.PerfScenarios.Area,r.PerfScenarios.APICall,!1,void 0,{Call:"getBuildCodeCoverage"})})}fetchCodeCoverageHTMLSummary(e){this._perfService.startScenario(r.PerfScenarios.APICall,!1,void 0,{Call:"getBuildArtifacts"}),this._source.getBuildArtifacts(e).then(t=>{if(t&&t.length>0){const o=this._getHTMLSummaryLinkFromArtifact(t,e.buildId);o?this._actions.updateCodeCoverageSummary.invoke(o):this._actions.updateNoCodeCoverageMessage.invoke(y.NoBuildArtifactsFound)}else this._actions.updateNoCodeCoverageMessage.invoke(y.BuildDetailsSummaryNoCodeCoverageNoLink),console.log(y.BuildDetailsSummaryNoCodeCoverageNoLink);this._perfService.endScenario(r.PerfScenarios.Area,r.PerfScenarios.APICall,!1,void 0,{Call:"getBuildArtifacts"})})}_getHTMLSummaryLinkFromArtifact(e,t){let o=e.filter(e=>s.equals(e.name,s.format("Code Coverage Report_{0}",t)));if(o.length>=1&&o[0].resource&&o[0].resource._links&&o[0].resource._links.web&&o[0].resource._links.web.href&&o[0].resource._links.web.href.length&&o[0].resource.data&&o[0].resource.data.length){const e=a.getTFSPageData(this.pageContext.pageContext);if(e){let t=this._getCollectionUrl(),r=e.project.id,i=o[0].resource.data;"#"===i.charAt(0)&&(i=i.substring(1)),"/"!==i.charAt(0)&&(i="/"+i);let a=t.lastIndexOf("/")===t.length-1?t:t+"/";return a=a+r+"/_apis/test/CodeCoverage/browse"+i+"/index.html"}console.log(y.NoBuildArtifactsFound)}else console.log(y.NoBuildArtifactsFound);return null}_getCodeCoverageDetails(e){return{buildCoverages:e.map(e=>{const t=[];let o=0,r=0;return e.modules.forEach(e=>{const i=0|e.statistics.linesCovered,a=i+(0|e.statistics.linesNotCovered)+(0|e.statistics.linesPartiallyCovered);o+=a,r+=i,t.push({moduleName:e.name,moduleUrl:e.fileUrl,coveredLines:i,totalLines:a,lineCoverage:s.localeFormat("{0}%",(a?i/a*100:0).toFixed(2))})}),{codeCoverageModuleList:t,summaryViewProps:{moduleCount:e.modules.length,totalLines:o,totalCoveredLines:r,coveragePercent:s.localeFormat("{0}%",(o?r/o*100:0).toFixed(2))},coverageDownloadLink:e.codeCoverageFileUrl||""}}),buildConfigurations:this._getBuildConfigurations(e)}}_getBuildConfigurations(e){return e.map(e=>e.configuration)}_getCollectionUrl(){return n.routeUrl(this.pageContext.pageContext,"ms.vss-tfs-web.project-overview-route")}}t.ActionsCodeCoverageTabActionCreator.CodeCoverageTabActionCreator=o}(),function(e){E=t.ComponentsCoveredBarChart={},Object.defineProperty(t,"__esModule",{value:!0});t.ComponentsCoveredBarChart.CoveredBarChart=class extends d.VssComponent{render(){const e=this.props.coveredPercentage/100*this.props.width;return l.createElement("div",{className:"bar-chart-container"},l.createElement("div",{className:"covered-bar",style:{width:e+"px"}}),l.createElement("div",{className:"not-covered-bar",style:{width:this.props.width-e+"px"}}))}}}(),function(e){w=t.ComponentsCodeCoverageDetailsList={},Object.defineProperty(t,"__esModule",{value:!0});const o=280,i=(e,t)=>e-t;var a;!function(e){e[e.Modules=0]="Modules",e[e.CoveredLines=1]="CoveredLines",e[e.TotalLines=2]="TotalLines",e[e.LineCoverage=3]="LineCoverage",e[e.CoverageVisual=4]="CoverageVisual"}(a||(a={}));t.ComponentsCodeCoverageDetailsList.CodeCoverageDetailsList=class extends d.VssComponent{constructor(e,t){super(e,t),this._renderColumn=((e,t,r)=>{switch(r.key){case a[a.Modules]:return e.moduleUrl?l.createElement(u.Link,{className:"coverage-module-link",href:e.moduleUrl},e.moduleName):l.createElement("span",null,e.moduleName);case a[a.CoveredLines]:return l.createElement("span",null,e.coveredLines);case a[a.TotalLines]:return l.createElement("span",null,e.totalLines);case a[a.LineCoverage]:return l.createElement("span",null,e.lineCoverage);case a[a.CoverageVisual]:return l.createElement(E.CoveredBarChart,{coveredPercentage:e.totalLines?100*e.coveredLines/e.totalLines:0,width:o})}return l.createElement("div",null)}),this._onColumnClick=((e,t)=>{const o=this._getComparer(t.key);if(!o)return;const i=this.state.sortedColumnKey===t.key&&!t.isSortedDescending;this.setState({sortedColumnKey:t.key,isSortedDescending:i,listItems:this._sortItems(this.state.listItems,o,i)}),this._telemetryService.publishEvent(r.TelemetryEvents.Area,r.TelemetryEvents.DetailsListSortClicked,{Column:t.key,Order:i?"Descending":"Ascending"})});const i=this._sortItems(this._generateItemList(),this._getComparer(a[a.Modules]),!1);this.state={sortedColumnKey:a[a.LineCoverage],isSortedDescending:!1,listItems:i},this._telemetryService=this.context.pageContext.getService("IVssTelemetryService")}_generateItemList(){return this.props.codeCoverageModuleList.filter(e=>e instanceof Object)}_getFilteredList(){const e=this.state.listItems,t=this.props.moduleFilterText;return""===t.trim()?e:e.filter(e=>e.moduleName.toLocaleLowerCase().indexOf(t.toLocaleLowerCase().trim())>=0)}_getColumnList(){return[this._createColumn(a[a.Modules],y.ModuleCoverageText,this._renderColumn),this._createColumn(a[a.CoveredLines],y.CoveredLinesText,this._renderColumn),this._createColumn(a[a.TotalLines],y.TotalCoverageLinesText,this._renderColumn),this._createColumn(a[a.LineCoverage],y.LineCoverageText,this._renderColumn),this._createColumn(a[a.CoverageVisual],y.CoverageVisualText,this._renderColumn,o)]}_createColumn(e,t,o,r){return{fieldName:e,key:e,name:t,onRender:o,onColumnClick:this._onColumnClick,minWidth:r||100,isResizable:!0,isSorted:this.state.sortedColumnKey===e,isSortedDescending:this.state.isSortedDescending,isPadded:!0,columnActionsMode:c.ColumnActionsMode.clickable,isRowHeader:!1,className:"code-coverage-details-list-cell"}}_sortItems(e,t,o){const r=o?(e,o)=>t(o,e):t;return e.slice().sort(r)}_getComparer(e){switch(e){case a[a.Modules]:return(e,t)=>s.localeIgnoreCaseComparer(e.moduleName,t.moduleName);case a[a.CoveredLines]:return(e,t)=>i(e.coveredLines,t.coveredLines);case a[a.TotalLines]:return(e,t)=>i(e.totalLines,t.totalLines);case a[a.LineCoverage]:case a[a.CoverageVisual]:default:return(e,t)=>i(parseFloat(e.lineCoverage),parseFloat(t.lineCoverage))}}render(){const e={items:this._getFilteredList(),columns:this._getColumnList(),selectionMode:c.SelectionMode.none,className:"code-coverage-details-list"};return l.createElement("div",{className:"coverage-details-list-container"},l.createElement(c.DetailsList,Object.assign({},e)))}}}(),function(e){M=t.ComponentsCodeCoverageSummaryView={},Object.defineProperty(t,"__esModule",{value:!0});const o={dataType:C.DataType.String,difference:{value:"",valueType:C.ValueType.Unchanged,shouldShowIcon:!1,diffType:C.DifferenceType.Unchanged}};t.ComponentsCodeCoverageSummaryView.CodeCoverageSummaryView=class extends d.VssComponent{render(){return l.createElement("div",{className:"code-coverage-summary-container"},l.createElement(C.ResultSummaryNumberChartComponent,Object.assign({title:y.LineCoverageText,value:this.props.coveragePercent},o)),l.createElement(C.ResultSummaryNumberChartComponent,Object.assign({title:y.ModuleCoverageText,value:this.props.moduleCount},o)),l.createElement(C.ResultSummaryNumberChartComponent,Object.assign({title:y.TotalCoverageLinesText,value:this.props.totalLines},o)),l.createElement(C.ResultSummaryNumberChartComponent,Object.assign({title:y.CoveredLinesText,value:this.props.totalCoveredLines},o)))}}}(),function(e){A=t.ComponentsMessageArea={},Object.defineProperty(t,"__esModule",{value:!0});t.ComponentsMessageArea.MessageArea=class extends d.VssComponent{Linkyfy(e){const t=[];let o=e;const r=/\[(.*?)\]\((.*?)\)/;let i=o.match(r);for(;i;)t.push(o.slice(0,i.index)),t.push(l.createElement(u.Link,{key:t.length,href:i[2]},i[1])),i=(o=o.slice(i.index+i[0].length)).match(r);return o&&t.push(o),t}render(){return l.createElement("div",null,this.Linkyfy(this.props.text))}}}(),function(e){F=t.StoresBuildConfigSelectorStore={},Object.defineProperty(t,"__esModule",{value:!0});t.StoresBuildConfigSelectorStore.BuildConfigSelectorStore=class extends g.Store{constructor(e,t,o){super(e),this.changeEvent=e,this._actionsHub=t,this._defaultState=o,this._updateConfigSelectorState=(e=>{this._state={buildConfigurationList:this._state.buildConfigurationList,selectedConfiguration:this._state.buildConfigurationList[e]},this.emitChanged()}),this._initialize()}getState(){return this._state}_initialize(){this._state=this._defaultState,this._actionsHub.updateBuildConfigSelection.addListener(this._updateConfigSelectorState)}}}(),function(e){P=t.ComponentsBuildConfigSelector={},Object.defineProperty(t,"__esModule",{value:!0});t.ComponentsBuildConfigSelector.BuildConfigSelector=class extends d.VssComponent{constructor(e,t){super(e),this._actionHub=x.CodeCoverageTabActionHub.getInstance(),this.ConfigSelectionChangeEvent="configSelectionChangeEvent",this._onStoreStateChanged=(()=>{this.setState(this._buildSelectorStore.getState())});const o=this._generatePickListItems();this._actionCreator=B.CodeCoverageTabActionCreator.getInstance(t),this.state={buildConfigurationList:o,selectedConfiguration:o[0]}}componentWillMount(){this._buildSelectorStore=new F.BuildConfigSelectorStore(this.ConfigSelectionChangeEvent,this._actionHub,this.state),this._buildSelectorStore.addChangedListener(this._onStoreStateChanged)}componentWillUnmount(){this._buildSelectorStore.removeChangedListener(this._onStoreStateChanged)}_generatePickListItems(){return this.props.configurations.length?this.props.configurations.map((e,t)=>this._getIBuildConfigItem(t,e.flavor,e.platform)):[this._getIBuildConfigItem(0)]}_getIBuildConfigItem(e,t,o){return{index:e,name:`${`${y.BuildConfigurationText}:  ${t||y.EmptyLiteralText}`} | ${`${y.BuildPlatformText}:  ${o||y.EmptyLiteralText}`}`}}render(){return l.createElement("div",{className:"build-config-selector"},l.createElement(v.PickListDropdown,{className:"build-config-picklist",getListItem:e=>({key:e.index.toString(),name:e.name}),initiallySelectedItems:[this.state.selectedConfiguration],getPickListItems:()=>this.state.buildConfigurationList,onSelectionChanged:e=>this._actionCreator.updateBuildConfigSelection(e.selectedItems[0].index)}))}}}(),function(e){I=t.ComponentsCodeCoverageHtmlSummary={},Object.defineProperty(t,"__esModule",{value:!0});t.ComponentsCodeCoverageHtmlSummary.CodeCoverageHtmlSummary=class extends d.VssComponent{render(){return l.createElement("div",{className:"code-coverage-summary-part"},this.props.modernBrowserAvailable?l.createElement("div",{className:"code-coverage-frame-part"},l.createElement("iframe",{sandbox:"",src:this.props.codeCoverageSummaryLink,className:"code-coverage-summary-frame"})):"")}}}(),function(e){N=t.ComponentsCodeCoverageModuleFilterBar={},Object.defineProperty(t,"__esModule",{value:!0});t.ComponentsCodeCoverageModuleFilterBar.CodeCoverageModuleFilterBar=class extends d.VssComponent{constructor(e,t){super(e),this._onFilterChanged=(()=>{const e=this.state.filter.getState();this.actionCreator.updateModuleFilter(e.moduleFilter?e.moduleFilter.value:"")}),this.actionCreator=B.CodeCoverageTabActionCreator.getInstance(t),this.state={filter:new S.Filter}}componentDidMount(){this.state.filter.subscribe(this._onFilterChanged,S.FILTER_CHANGE_EVENT)}componentWillUnmount(){this.state.filter.unsubscribe(this._onFilterChanged,S.FILTER_CHANGE_EVENT)}render(){return l.createElement("div",{className:"module-filterbar-container"},l.createElement(m.FilterBar,{filter:this.state.filter},l.createElement(h.KeywordFilterBarItem,{filterItemKey:"moduleFilter",placeholder:y.CoverageModuleFilterPlaceholder})))}}}(),function(e){k=t.StoresBuildCodeCoverageStore={},Object.defineProperty(t,"__esModule",{value:!0});t.StoresBuildCodeCoverageStore.BuildCodeCoverageStore=class extends g.Store{constructor(e,t){super(e),this.changeEvent=e,this._actionsHub=t,this._updateBuildCodeCoverage=(e=>{this._state.buildCodeCoverageDetails=e,this._state.showCodeCoverageDetails=!0,this._state.showCodeCoverageHTMLSummary=!1,this.emitChanged()}),this._updateModuleFilterText=(e=>{this._state.moduleFilterText=e,this.emitChanged()}),this._updateCodeCoverageSummary=(e=>{this._state.modernBrowserAvailable?(this._state.showCodeCoverageHTMLSummary=!0,this._state.showCodeCoverageDetails=!1,this._state.codeCoverageSummaryLink=e,this.emitChanged()):this._updateNoCodeCoverageMessage(y.UpgradeToModernBrowser)}),this._updateConfigSelectorState=(e=>{this._state.selectedBuildConfiguration=e,this.emitChanged()}),this._updateNoCodeCoverageMessage=(e=>{this._state.showCodeCoverageHTMLSummary=!1,this._state.showCodeCoverageDetails=!1,this._state.messageAreaText=e,this.emitChanged()}),this._initialize()}getState(){return this._state}_initialize(){this._state=this._getDefaultState(),this._actionsHub.updateBuildConfigSelection.addListener(this._updateConfigSelectorState),this._actionsHub.updateBuildCodeCoverage.addListener(this._updateBuildCodeCoverage),this._actionsHub.updateCodeCoverageSummary.addListener(this._updateCodeCoverageSummary),this._actionsHub.updateModuleFilterText.addListener(this._updateModuleFilterText),this._actionsHub.updateNoCodeCoverageMessage.addListener(this._updateNoCodeCoverageMessage)}_getDefaultState(){return{showCodeCoverageHTMLSummary:!1,codeCoverageSummaryLink:"",buildCodeCoverageDetails:null,moduleFilterText:"",showCodeCoverageDetails:!1,selectedBuildConfiguration:0,modernBrowserAvailable:this._isSandboxAvailable(),messageAreaText:""}}_isSandboxAvailable(){return"sandbox"in document.createElement("iframe")}}}(),function(e){D=t.ComponentsBuildCodeCoverage={},Object.defineProperty(t,"__esModule",{value:!0});t.ComponentsBuildCodeCoverage.BuildCodeCoverage=class extends d.VssComponent{constructor(e,t){super(e,t),this.BuildCodeCoverageChangeEvent="buildCodeCoverageChangeEvent",this.ModuleCoverageMergeFeatureFlag="TestManagement.Server.ModuleCoverageMerge",this.NewUIForDotCoverageFeatureFlag="TestManagement.Server.ModuleDetailsUIForDotCoverage",this._getSpinner=(()=>l.createElement(f.Spinner,{className:"flex flex-grow absolute-fill",size:"large"})),this._onStoreChanged=(()=>{this.setState(this._store.getState())}),this._perfService=this.context.pageContext.getService("IVssPerformanceService"),this._telemetryService=this.context.pageContext.getService("IVssTelemetryService")}componentWillMount(){this._store=new k.BuildCodeCoverageStore(this.BuildCodeCoverageChangeEvent,x.CodeCoverageTabActionHub.getInstance()),this._actionCreator=B.CodeCoverageTabActionCreator.getInstance(this.context),this.setState(this._store.getState()),this._actionCreator.fetchBuildCodeCoverage(this.props.runViewArtifact),this._store.addChangedListener(this._onStoreChanged)}componentDidMount(){this._perfService.endScenario(r.PerfScenarios.Area,r.PerfScenarios.CodeCoverageTab,!0)}componentWillUnmount(){this._store.removeChangedListener(this._onStoreChanged)}render(){return this.state&&(this.state.showCodeCoverageHTMLSummary||this.state.showCodeCoverageDetails||this.state.messageAreaText)?l.createElement("div",{className:"code-coverage-details"},this._getCodeCoverageUI()):this._getSpinner()}_getCodeCoverageUI(){if(this.state.showCodeCoverageHTMLSummary)return l.createElement(I.CodeCoverageHtmlSummary,{modernBrowserAvailable:this.state.modernBrowserAvailable,codeCoverageSummaryLink:this.state.codeCoverageSummaryLink});let e=this.state.messageAreaText;if(this.state.showCodeCoverageDetails){const t=p.isFeatureFlagEnabled(this.context.pageContext,this.ModuleCoverageMergeFeatureFlag,!1),o=p.isFeatureFlagEnabled(this.context.pageContext,this.NewUIForDotCoverageFeatureFlag,!1),r=this.state.buildCodeCoverageDetails.buildConfigurations,i=this.state.buildCodeCoverageDetails.buildCoverages[this.state.selectedBuildConfiguration],a=this._getCodeCoverageDownloadLink(i);if(o||t&&!a)return l.createElement("div",null,l.createElement(P.BuildConfigSelector,{configurations:r}),l.createElement(M.CodeCoverageSummaryView,Object.assign({},i.summaryViewProps)),a,l.createElement(N.CodeCoverageModuleFilterBar,null),l.createElement("div",{className:"toolbar-grid-separator"}),l.createElement(w.CodeCoverageDetailsList,{codeCoverageModuleList:i.codeCoverageModuleList,moduleFilterText:this.state.moduleFilterText}));if(a)return l.createElement("div",null,r.length>1?l.createElement(P.BuildConfigSelector,{configurations:r}):"",a);e=y.BuildCodeCoverageNoResults}return l.createElement("div",null,l.createElement("div",{className:"code-coverage-download-link"},l.createElement("span",{className:"empty-results-message-bar"},l.createElement(A.MessageArea,{text:e}))))}_getCodeCoverageDownloadLink(e){if(""!==e.coverageDownloadLink)return l.createElement("div",{className:"code-coverage-download-link"},l.createElement(u.Link,{href:e.coverageDownloadLink,onClick:()=>{this._telemetryService.publishEvent(r.TelemetryEvents.Area,r.TelemetryEvents.DownloadLinkClicked,{})}},y.DownloadCodeCoverageResults))}}}(),function(e){t[e]={},Object.defineProperty(t,"__esModule",{value:!0});class o extends T.VssService{constructor(){super(...arguments),this.codeCoverageTabEnabled=!1,this.onBuildStatusChanged=(()=>{if(this.tcmServiceContributionLoaded&&!this.codeCoverageTabEnabled&&this.buildContext&&2===this.buildContext.status.value){const e=new b.RunViewArtifact(this.buildContext.runId.value,this.buildContext.projectId.value,this.buildContext.status.value);_.GetCodeCoverageTimelineSummaryData(e,this.codeCoverageSource).then(t=>{t&&t.length&&(this.codeCoverageTabEnabled=!0,this.tabs.push({id:"codecoverage-tab",render:()=>l.createElement(D.BuildCodeCoverage,{runViewArtifact:e}),name:"Code Coverage",onBeforePivotChange:()=>(this._telemetryService.publishEvent(r.TelemetryEvents.Area,r.TelemetryEvents.CodeCoverageTabClicked,{}),!0)}))})}})}_serviceStart(e){super._serviceStart(e),this._telemetryService=this.pageContext.getService("IVssTelemetryService"),this.tabs=new L.ObservableArray,this.codeCoverageSource=i.CodeCoverageSource.getInstance({pageContext:this.pageContext}),this.contributionService=this.pageContext.getService("IVssContributionService"),this.getTcmContribution().then(()=>{this.tcmServiceContributionLoaded||(this.tcmServiceContributionLoaded=!0,this.onBuildStatusChanged())})}getTabs(e,t){return this.buildContext=t,t.status&&2!==t.status.value?t.status.subscribe(this.onBuildStatusChanged):this.onBuildStatusChanged(),this.tabs}getTcmContribution(){return this.tcmContribution||(this.tcmContribution=this.contributionService.getContributionAsync("ms.vss-codecoverage-web.tcm-service-location")),this.tcmContribution}}t[e].CodeCoveragePipelineTabService=o,t[e].CodeCoveragePipelineTabServiceName="codecoverage-pipeline-tab-service",T.Services.add(t[e].CodeCoveragePipelineTabServiceName,{serviceFactory:o})}("ServicesCodeCoveragePipelineTabService"),function(e){t[e]={},Object.defineProperty(t,"__esModule",{value:!0});class o extends T.VssService{constructor(){super(...arguments),this.codeCoverageTabEnabled=!1}_serviceStart(e){super._serviceStart(e),this._telemetryService=this.pageContext.getService("IVssTelemetryService"),this._perfService=this.pageContext.getService("IVssPerformanceService"),this.codeCoverageSource=i.CodeCoverageSource.getInstance({pageContext:this.pageContext})}loadItems(e,t){t?t.onBuildChanged(t=>{const o=b.RunViewArtifact.GetArtifactDataFromBuild(t);this.onBuildChanged(o,e)}):console.error("itemContext should've been present.")}onBuildChanged(e,t){this.codeCoverageTabEnabled||2!=e.buildStatus||_.GetCodeCoverageTimelineSummaryData(e,this.codeCoverageSource).then(o=>{o&&o.length&&(this.codeCoverageTabEnabled=!0,t([{id:"codecoverage-tab",render:()=>(this._perfService.startScenario(r.PerfScenarios.CodeCoverageTab,!0),l.createElement(D.BuildCodeCoverage,{runViewArtifact:e},null)),text:"Code Coverage",onBeforePivotChange:()=>(this._telemetryService.publishEvent(r.TelemetryEvents.Area,r.TelemetryEvents.CodeCoverageTabClicked,{}),!0)}]))})}}t[e].CodeCoverageTabProviderService=o,t[e].CodeCoverageTabProviderServiceName="codecoverage-tab-provider-service",T.Services.add(t[e].CodeCoverageTabProviderServiceName,{serviceFactory:o})}("ServicesCodeCoverageTabProviderService")},["Resources","Actions/CodeCoverageTabActionHub","Actions/CodeCoverageTabActionCreator","Components/CoveredBarChart","Components/CodeCoverageDetailsList","Components/CodeCoverageSummaryView","Components/MessageArea","Stores/BuildConfigSelectorStore","Components/BuildConfigSelector","Components/CodeCoverageHtmlSummary","Components/CodeCoverageModuleFilterBar","Stores/BuildCodeCoverageStore","Components/BuildCodeCoverage","Services/CodeCoveragePipelineTabService","Services/CodeCoverageTabProviderService"]),document.dispatchEvent(new CustomEvent("scriptLoaded",{cancelable:!1,detail:{id:"ms.vss-codecoverage-web.codecoverage-tab"}}));