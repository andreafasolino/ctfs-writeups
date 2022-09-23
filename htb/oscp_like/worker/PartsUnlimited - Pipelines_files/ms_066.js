"use strict";define("CodeCoverage/Common",["require","exports","VSS/Reflux/Action","Test/Client/TestManagementServices","VSS/Core/Util/String"],function(e,t,o,a,i){var r,n;!function(e){t.ActionsCodeCoverageActionHub={},Object.defineProperty(t,"__esModule",{value:!0});t.ActionsCodeCoverageActionHub.CodeCoverageActionHub=class{constructor(){this.initializeCodeCodeCoverageSummary=new o.Action}};t.ActionsCodeCoverageActionHub.CodeCoverageSummaryData=class{}}(),function(e){t.RunViewArtifact={},Object.defineProperty(t,"__esModule",{value:!0});class o{constructor(e,t,o){this.buildId=e,this.projectId=t,this.buildStatus=o}static GetArtifactDataFromBuild(e){return new o(e.id,e.project.id,e.status)}}t.RunViewArtifact.RunViewArtifact=o}(),function(e){r=t.SourcesCodeCoverageSource={},Object.defineProperty(t,"__esModule",{value:!0});class o{constructor(e){this.pageContext=e,this.apiCallCache={}}static getInstance(e){return o._instance||(o._instance=new o(e)),o._instance}getBuildCodeCoverage(e){return this.getTcmService().getBuildCodeCoverage(e.buildId,1)}getBuildArtifacts(e){return this.pageContext.pageContext.getRestClient("IBuildRestClient").getArtifacts(e.projectId,e.buildId)}getCodeCoverageSummary(e){let t=this.getTcmService();if(this.apiCallCache[e.buildId])return this.apiCallCache[e.buildId].complete?Promise.resolve(this.apiCallCache[e.buildId].value):this.apiCallCache[e.buildId].promise;const o=t.getCodeCoverageSummary(e.buildId);this.apiCallCache[e.buildId]={promise:o,complete:!1,value:null};const a=t=>{this.apiCallCache[e.buildId].complete=!0,this.apiCallCache[e.buildId].value=t};return o.then(a,a),o}getTcmService(){return this.tcmService||(this.tcmService=this.pageContext.pageContext.getService(a.TestManagementServiceName)),this.tcmService}}t.SourcesCodeCoverageSource.CodeCoverageSource=o}(),function(e){n=t.Common={},Object.defineProperty(t,"__esModule",{value:!0}),t.Common.GetCodeCoverageTimelineSummaryData=((e,t)=>2==e.buildStatus?t.getCodeCoverageSummary(e).then(e=>{if(e){return o(e.coverageData)||[]}return console.warn("getCodeCoverageSummary promise returned null"),[]},e=>(console.error(e),[])):Promise.resolve([]));const o=e=>{const t=[];return e?(e.forEach(e=>{const o=e.coverageStats.filter(e=>e.label&&(!i.localeIgnoreCaseComparer(e.label,"Lines")||!i.localeIgnoreCaseComparer(e.label,"Line")));if(o.length){const a=o[0].covered||0,i=o[0].total||o[0].covered;t.push({buildConfiguration:e.buildFlavor,buildPlatform:e.buildPlatform,coveredPercentage:i?a/i*100:0})}}),t):[]}}(),function(e){t.ActionsCodeCoverageActionCreator={},Object.defineProperty(t,"__esModule",{value:!0});t.ActionsCodeCoverageActionCreator.CodeCoverageActionCreator=class{constructor(e,t){this._actionHub=e,this.pageContext=t,this._source=r.CodeCoverageSource.getInstance(t)}fetchCodeCoverageSummary(e){n.GetCodeCoverageTimelineSummaryData(e,this._source).then(e=>{e&&e.length&&this._actionHub.initializeCodeCodeCoverageSummary.invoke({timelineSummaryData:e})})}}}(),function(e){t.Constants={},Object.defineProperty(t,"__esModule",{value:!0});class o{}o.Area="CodeCoverage",o.CodeCoverageTab="CodeCoverage.Tab",o.TimelineSummary="CodeCoverage.TimelineSummary",o.APICall="CodeCoverage.ApiCall",t.Constants.PerfScenarios=o;class a{}a.Area="CodeCoverage",a.DownloadLinkClicked="DownloadLinkClicked",a.DetailsListSortClicked="DetailsListSortClicked",a.CodeCoverageTabClicked="CodeCoverageTabClicked",t.Constants.TelemetryEvents=a}()},["Actions/CodeCoverageActionHub","RunViewArtifact","Sources/CodeCoverageSource","Common","Actions/CodeCoverageActionCreator","Constants"]),document.dispatchEvent(new CustomEvent("scriptLoaded",{cancelable:!1,detail:{id:"ms.vss-codecoverage-web.common"}}));