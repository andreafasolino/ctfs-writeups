"use strict";define("Build/Common/Library",["require","exports","react","VSS/Features/PlatformUI/FPSLink","VSS/Platform/Layout","VSSUI/Icon","VSSUI/VssPersona","VSS/Platform/Location","VSSUI/Status","Build/Flux/Action","VSS/Platform/Context","VSS/Platform/History","VSS/Core/Observable","VSS/Features/SignalR/3rdParty/jquery.shimmed","Build/Flux/Sources/Contribution","Build/Flux/Store","VSS/Core/Util/String"],function(e,t,i,s,n,r,o,a,c,u,l,d,p,m,h,g,S){var b,v,f,y,P,C;b=t.Resources={},Object.defineProperty(t,"__esModule",{value:!0}),t.Resources.AgentPool="Agent pool",t.Resources.ARIALabelCopyToClipboard="Copy to clipboard",t.Resources.AutoAuthorizeErrorMessage="An unspecified error occurred while attempting to authorize resources.",t.Resources.CopiedToClipboardText="Copied to clipboard",t.Resources.CopyToClipboardText="Copy to clipboard",t.Resources.StatusAbandoned="Abandoned",t.Resources.StatusCanceled="Canceled",t.Resources.StatusFailed="Failed",t.Resources.StatusQueued="Queued",t.Resources.StatusRunning="Running",t.Resources.StatusSkipped="Skipped",t.Resources.StatusSuccess="Success",t.Resources.StatusUnknown="No runs",t.Resources.StatusWaiting="Waiting",t.Resources.StatusWarning="Warning",t.Resources.UnresolvedUser="Unresolved user",t.Resources.SaveButtonLabel="Save",t.Resources.SourceVersionTextboxTitle="Source version",t.Resources.ConfigFileDataProviderErrorMessage="Error retrieving config files for repository {0}.",t.Resources.SavePipelineCommentDisable="Disable pipeline",t.Resources.SavePipelineCommentEnable="Enable pipeline",t.Resources.SavePipelineCommentPause="Pause pipeline",t.Resources.SavePipelineCommentUnknownStatus="Change pipeline processing status",t.Resources.SavePipelineCommentYamlFile="Change YAML file to {0}",t.Resources.SavePipelineErrorMessage="An unspecified error occurred while saving the pipeline.",function(e){t.Array={},Object.defineProperty(t,"__esModule",{value:!0});const i="";t.Array.subtract=function(e,t){if(e=e||[],t=t||[],[].includes)return e.filter(e=>!t.includes(e));{let s={},n=[];for(let e=0;e<t.length;e++)s[(t[e]||i)+i]=!0;for(let t=0;t<e.length;t++)s[(e[t]||i)+i]||n.push(e[t]);return n}},t.Array.intersect=function(e,t){return t=t||[],(e=e||[]).filter(e=>-1!==t.indexOf(e))}}(),function(e){t.ComponentsBranchLink={},Object.defineProperty(t,"__esModule",{value:!0});t.ComponentsBranchLink.BranchLink=class extends n.VssComponent{constructor(e,t){super(e,t);const i=t.pageContext.getService("ISourceProviderService").getSourceProvider(e.repositoryType),s=i?i.getBranchText(e.branch):e.branch,n=i?i.getBranchIconName(e.branch):"OpenSource";this.state={branchIconName:n,branchName:s,branchLink:"#"}}componentDidMount(){super.componentDidMount();const e=this.context.pageContext.getService("ISourceProviderService").getSourceProvider(this.props.repositoryType);e&&this.trackPromise(e.fetchBranchLink({branchName:this.props.branch,repositoryName:this.props.repositoryName||this.props.repositoryId,repositoryUrl:this.props.repositoryUrl,links:{}})).promise.then(e=>{this.setState({branchLink:e})},e=>{e.isCanceled||console.log(e)})}render(){const{excludeTabStop:e=!0,monospace:t}=this.props;let n="scroll-hidden flex-row flex-baseline branch-link";return t&&(n+=" monospaced-text"),this.state.branchLink?i.createElement(s.FPSLink,{className:n,excludeTabStop:e,href:this.state.branchLink,subtle:!0},i.createElement("span",{className:"text-ellipsis"},i.createElement(r.Icon,{iconName:this.state.branchIconName,className:"pipelines-icon-right-margin"}),this.state.branchName)):this.state.branchName?(n+=" pipelines-icon-left-margin pipeline-link",i.createElement("div",{className:n},i.createElement("span",{className:"text-ellipsis"},i.createElement(r.Icon,{iconName:this.state.branchIconName,className:"pipelines-icon-right-margin"}),this.state.branchName))):i.createElement("span",null)}}}(),function(e){t.ComponentsBuildPersona={},Object.defineProperty(t,"__esModule",{value:!0});t.ComponentsBuildPersona.BuildPersona=class extends n.VssComponent{constructor(e,t){super(e,t),this._getFallbackImageUrl=(e=>{if(!this.props.displayName)return e>=40?a.getAssetLocation(this.context.pageContext,"ms.vss-build-web/common-library/default-user-avatar-large.svg"):a.getAssetLocation(this.context.pageContext,"ms.vss-build-web/common-library/default-user-avatar-small.svg")}),this._onImageError=(()=>{this.props.imageUrl&&this.setState({unloadableImageUrls:this.state.unloadableImageUrls.add(this.props.imageUrl)})}),this.state={unloadableImageUrls:e.unloadableImageUrls||new Set}}render(){return i.createElement(o.VssPersona,{size:this.props.size,cssClass:this.props.cssClass,identityDetailsProvider:{getIdentityImageUrl:e=>!this.props.imageUrl||this.state.unloadableImageUrls.has(this.props.imageUrl)?this._getFallbackImageUrl(e):this.props.imageUrl,getDisplayName:()=>this.props.displayName?this.props.displayName:b.UnresolvedUser},onImageError:this._onImageError})}}}(),function(e){t.ComponentsCommandComponent={},Object.defineProperty(t,"__esModule",{value:!0});const s=["ms.vss-distributedtask-web.common-library","ms.vss-build-web.common-commands"];t.ComponentsCommandComponent.CommandComponent=class extends i.Component{render(){return i.createElement(n.WrappedComponent,Object.assign({dependencies:s,wrappedType:this.props.commandType},this.props))}},t.ComponentsCommandComponent.prefetch=function(e){const t=e.getService("IVssContributionService");t.getContributionAsync("ms.vss-build-web.queue-panel"),t.getContributionAsync("ms.vss-build-web.common-commands"),t.getContributionAsync("ms.vss-build-web.common-library-legacy"),t.getContributionAsync("ms.vss-distributedtask-web.common-library")}}(),function(e){t.ComponentsCommitLink={},Object.defineProperty(t,"__esModule",{value:!0});t.ComponentsCommitLink.CommitLink=class extends n.VssComponent{constructor(e,t){super(e,t);const i=this.context.pageContext.getService("ISourceProviderService").getSourceProvider(this.props.repositoryType),s=i?i.getCommitText(this.props.commitId):"";this.state={commitLink:"#",commitText:s}}componentDidMount(){super.componentDidMount();const e=this.context.pageContext.getService("ISourceProviderService").getSourceProvider(this.props.repositoryType);e&&this.trackPromise(e.fetchCommitLink({repositoryName:this.props.repositoryName||this.props.repositoryId,commitId:this.props.commitId,displayUri:""})).promise.then(e=>{this.setState({commitLink:e})},e=>{e.isCanceled||console.log(e)})}render(){const{excludeTabStop:e=!0,monospace:t}=this.props;let n="scroll-hidden flex-row flex-baseline";return t&&(n+=" monospaced-text"),this.state.commitLink?i.createElement(s.FPSLink,{className:n,excludeTabStop:e,href:this.state.commitLink,subtle:!0},i.createElement("span",{className:"text-ellipsis"},this.state.commitText)):this.state.commitText?(n+=" bolt-table-link bolt-table-inline-link pipeline-link",i.createElement("div",{className:n},i.createElement("span",{className:"text-ellipsis"},this.state.commitText))):i.createElement("span",null)}}}(),v=t.Constants={},Object.defineProperty(t,"__esModule",{value:!0}),(C=t.Constants.ProcessType||(t.Constants.ProcessType={})).Designer=1,C.Yaml=2,C.Docker=3,(P=t.Constants.NavConstants||(t.Constants.NavConstants={})).buildId="buildId",P.changeId="changeId",P.timelineId="timelineId",P.job="j",P.line="l",P.stage="s",P.task="t",P.view="view",P.logs="logs",P.artifacts="artifacts",P.treeState="treeState",t.ContributedExtensiontypes={},Object.defineProperty(t,"__esModule",{value:!0}),function(e){t.Duration={},Object.defineProperty(t,"__esModule",{value:!0}),t.Duration.getDurationStats=function(e){e=Math.abs(e);const t=Math.floor(e/1e3),i=Math.floor(t/60),s=Math.floor(i/60);return{days:Math.floor(s/24),hours:s%24,minutes:i%60,seconds:t%60}},t.Duration.padZeroes=function(e,t=2){let i=e+"";for(;i.length<t;)i="0"+i;return i}}(),function(e){var i;t.ErrorHandler={},Object.defineProperty(t,"__esModule",{value:!0}),i||(i={}),t.ErrorHandler.handleError=function(e){console.error(e),i.registeredHandler&&i.registeredHandler(e)},t.ErrorHandler.registerErrorHandler=function(e){i.registeredHandler=e}}(),function(e){f=t.SingletonManager={},Object.defineProperty(t,"__esModule",{value:!0});class i{constructor(){this._objects={}}add(e,t){this._objects[e]=t}get(e){return this._objects[e]}remove(e){this._objects[e]&&this._objects[e].dispose(),delete this._objects[e]}dispose(){const e=this._objects||{};Object.keys(e).forEach(t=>{e[t].dispose()}),this._objects={}}}var s;t.SingletonManager.SingletonManager=i,t.SingletonManager.getSingletonManager=function(){return s||(s=new i),s}}(),function(e){y=t.PipelinesStateData={},Object.defineProperty(t,"__esModule",{value:!0});class i{constructor(){this._treeData=""}get treeData(){return this._treeData}updateTreeData(e){this._treeData=e}dispose(){this._treeData=""}}i.key="PipelinesTreeStateDataStore",t.PipelinesStateData.PipelinesStateData=i}(),function(e){function i(e){const t=e.getService("IVssHistoryService");let i=t.getState();delete i[v.NavConstants.treeState],t.replaceState(i),f.getSingletonManager().remove(y.PipelinesStateData.key)}function s(e,t){const i=e.getService("IVssHistoryService"),s=i.generateUrl({treeState:t});i.replaceState(void 0,s)}function n(e){const t=window.location.href;return t.lastIndexOf("_build")>=0||t.lastIndexOf("build-")>=0}function r(){return f.getSingletonManager().get(y.PipelinesStateData.key)}function o(){const e=new y.PipelinesStateData;return f.getSingletonManager().add(y.PipelinesStateData.key,e),e}t.StateHandler={},Object.defineProperty(t,"__esModule",{value:!0}),t.StateHandler.clearTreeState=i,t.StateHandler.updateTreeStateSettings=function(e,t){n(e)&&function(){let e=r();return e||(e=o()),e}().updateTreeData(t)},t.StateHandler.updateTreeStateUrl=s,t.StateHandler.getTreeState=function(e){let t="",n=r();return(t=e.getService("IVssHistoryService").getState()[v.NavConstants.treeState]||"")||n&&(t=n.treeData)&&s(e,t),n||t||i(e),n||o(),t},t.StateHandler.clearTreeStateOnUnmount=function(e){n(e)||i(e)}}(),function(e){t.Identity={},Object.defineProperty(t,"__esModule",{value:!0}),t.Identity.getAvatarUrl=function(e){let t="";return e&&(t=(t=e&&e._links&&e._links.avatar&&e._links.avatar.href)||e.imageUrl||""),t}}(),function(e){var i;function s(e){e=(e=e||"").toLowerCase();const t={statusProps:c.Statuses.Queued,label:b.StatusUnknown};switch(e){case i.Cancelled:t.statusProps=c.Statuses.Canceled,t.label=b.StatusCanceled;break;case i.Failed:t.statusProps=c.Statuses.Failed,t.label=b.StatusFailed;break;case i.InProgress:t.statusProps=c.Statuses.Running,t.label=b.StatusRunning;break;case i.Pending:t.statusProps=c.Statuses.Queued,t.label=b.StatusWaiting;break;case i.Queued:t.statusProps=c.Statuses.Waiting,t.label=b.StatusQueued;break;case i.Skipped:t.statusProps=c.Statuses.Skipped,t.label=b.StatusSkipped;break;case i.Succeeded:t.statusProps=c.Statuses.Success,t.label=b.StatusSuccess;break;case i.Waiting:t.statusProps=c.Statuses.Waiting,t.label=b.StatusWaiting;break;case i.Warning:t.statusProps=c.Statuses.Warning,t.label=b.StatusWarning}return t}t.Indicator={},Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.Cancelled="cancelled",e.Failed="failed",e.InProgress="inprogress",e.Pending="pending",e.Queued="queued",e.Skipped="skipped",e.Succeeded="succeeded",e.Unknown="unknown",e.Waiting="waiting",e.Warning="warning"}(i=t.Indicator.Status||(t.Indicator.Status={})),t.Indicator.getStatusIndicatorData=s,t.Indicator.getBuildStatusIndicatorData=function(e,t){let n=i.Unknown;switch(e){case 4:n=i.Cancelled;break;case 1:n=i.InProgress;break;case 32:case 8:n=i.Queued;break;case 2:switch(t){case 2:n=i.Succeeded;break;case 4:n=i.Warning;break;case 8:n=i.Failed;break;case 32:n=i.Cancelled}}return s(n)},t.Indicator.getTimelineStatusIndicatorData=function(e,t,n,r){let o=i.Unknown;switch(e){case 0:o=n?i.Waiting:r?i.Queued:i.Pending;break;case 1:o=i.InProgress;break;case 2:switch(t){case 0:o=i.Succeeded;break;case 1:o=i.Warning;break;case 2:o=i.Failed;break;case 3:o=i.Cancelled;break;case 4:o=i.Skipped;break;case 5:o=i.Cancelled}}return s(o)}}(),function(e){t.Navigation={},Object.defineProperty(t,"__esModule",{value:!0}),t.Navigation.openLinkSecurely=function(e,t=!1){const i=t?"_blank":"_self",s=window.open(e,i);s&&(s.opener=null)};t.Navigation.NavigationActionHub=class{constructor(){this._navigationChanged=new u.Action}get navigationChanged(){return this._navigationChanged}};l.Services.add("IBuildNavigationService",{serviceFactory:class extends l.VssService{constructor(){super(...arguments),this._onNavigate=(e=>{this._actionHub&&this._actionHub.navigationChanged.invoke(e)})}_serviceStart(e){super._serviceStart(e),this._historyService=this.pageContext.getService("IVssHistoryService"),this._historyService.subscribe(this._onNavigate,d.HistoryServiceEventNames.statePopped),this._linkingService=this.pageContext.getService("IBuildLinkingService")}_serviceEnd(e){super._serviceEnd(e),this._historyService&&this._historyService.unsubscribe(this._onNavigate,d.HistoryServiceEventNames.statePopped)}subscribeToNavigationChanges(e){this._actionHub=e}getCurrentState(){return this._historyService&&this._historyService.getState()||{}}getHistoryService(){return this._historyService}getLinkingService(){return this._linkingService}pushState(e){if(this._historyService){let t=this._historyService.getState();Object.keys(e).forEach(i=>{t[i]=e[i]}),this._historyService.pushState(t)}}}})}(),function(e){t.PipelinesL2Header={},Object.defineProperty(t,"__esModule",{value:!0});class i extends l.VssService{constructor(){super(...arguments),this.items=new p.ObservableArray}getBreadcrumbItems(e){return this.items.push({key:"Hub",text:"",priority:100,hidden:!0}),this.items}}t.PipelinesL2Header.PipelinesL2Header=i,l.Services.add("pipelines-l2-breadcrumb-service",{serviceFactory:i})}(),function(e){t.SignalRHubProxies={},Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.buildDetailHub="buildDetailHub"}(t.SignalRHubProxies.HubNames||(t.SignalRHubProxies.HubNames={})),t.SignalRHubProxies.getBuildProxyToRegister=function(e){const t=m.jqueryShimmed;return e.server={stopWatchingBuild:function(i,s){return e.invoke.apply(e,t.merge(["StopWatchingBuild"],t.makeArray(arguments)))},stopWatchingCollection:function(){return e.invoke.apply(e,t.merge(["StopWatchingCollection"],t.makeArray(arguments)))},stopWatchingProject:function(i){return e.invoke.apply(e,t.merge(["StopWatchingProject"],t.makeArray(arguments)))},watchBuild:function(i,s){return e.invoke.apply(e,t.merge(["WatchBuild"],t.makeArray(arguments)))},watchCollection:function(){return e.invoke.apply(e,t.merge(["WatchCollection"],t.makeArray(arguments)))},watchProject:function(i){return e.invoke.apply(e,t.merge(["WatchProject"],t.makeArray(arguments)))}},e}}(),function(e){t.PipelineResourcesService={},Object.defineProperty(t,"__esModule",{value:!0});const i="ms.vss-build-web.authorize-pipeline-resources-data-provider";l.Services.add("IPipelineResourcesService",{serviceFactory:class extends l.VssService{updateAuthorizedResource(e,t,i,s){const n=this.pageContext.getService("ITfsPageService").getData();let r="";n&&n.project&&(r=n.project.id);const o=[{authorized:s,id:i,type:t,name:""}];return this.pageContext.getRestClient("IBuildRestClient").authorizeDefinitionResources(o,r,e)}autoAuthorizeResources(e,t){const s={pipelineId:e,sourceBranch:t};return new Promise((e,t)=>{const n=this.pageContext.getService("IVssContributionService");n.getDataAsync(i,s,!0).then(s=>{if(s)e(s);else{const e=n.getDataProviderExceptions()[i],s=e&&e.message||b.AutoAuthorizeErrorMessage;t(new Error(s))}})})}}})}(),function(e){t.StoresPermissions={},Object.defineProperty(t,"__esModule",{value:!0});const i="_permissions",s="ms.vss-web.user-claims-data";t.StoresPermissions.PermissionsStore=class extends g.Store{constructor(e){super();const t=e.source?e.source:new h.ContributionSource({pageContext:e.pageContext});this._permissions=t.getSharedData(i)||{},this._claims=t.getData(s)||{}}hasPermission(e,t,i){if(this._permissions){const s=this._permissions[e];if(s){const n=s[t];return void 0===n&&console.warn("PermissionsStore: token "+t+", for namespace"+e+", has no permissions defined."),(i&n)>0}console.warn("PermissionsStore: namespace "+e+"has no permissions defined.")}return!1}hasClaim(e){return!(!this._claims||!this._claims[e])}}}(),function(e){var i,s,n;t.Security={},Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.BuildNamespaceId="33344d9c-fc72-4d6f-aba5-fa317101a7e9"}(i=t.Security.Constants||(t.Security.Constants={})),function(e){e.ViewBuilds=1,e.EditBuildQuality=2,e.RetainIndefinitely=4,e.DeleteBuilds=8,e.ManageBuildQualities=16,e.DestroyBuilds=32,e.UpdateBuildInformation=64,e.QueueBuilds=128,e.ManageBuildQueue=256,e.StopBuilds=512,e.ViewBuildDefinition=1024,e.EditBuildDefinition=2048,e.DeleteBuildDefinition=4096,e.OverrideBuildCheckInValidation=8192,e.AdministerBuildPermissions=16384,e.AllPermissions=32767}(s=t.Security.BuildRequiredPermissions||(t.Security.BuildRequiredPermissions={})),function(e){e.Anonymous="anonymous",e.Public="public",e.Member="member"}(n=t.Security.UserClaims||(t.Security.UserClaims={}));const r="/",o="\\";class a{constructor(e){this._store=e.store,this._projectId=e.projectId}canEditDefinition(e){return this.hasDefinitionPermission(e,s.EditBuildDefinition)}canChangeBuild(e){return this.hasDefinitionPermission(e,s.EditBuildQuality)}canCancelBuild(e,t){const i=(t.requestedBy&&t.requestedBy.id||"").toLowerCase(),n=(t.requestedFor&&t.requestedFor.id||"").toLowerCase();return(e=e||e.toLowerCase())===i||e===n||this.hasDefinitionPermission(t.definition,s.StopBuilds)}canCancelBuildByUserId(e,t,i,n,r){const o=(r||"").toLowerCase(),a=(n||"").toLowerCase();return(e=e||e.toLowerCase())===o||e===a||this._hasDefinitionPermission(t,i,s.StopBuilds)}canDeleteBuild(e){return this.hasDefinitionPermission(e,s.DeleteBuilds)}canDeleteBuildByDefinitionId(e,t){return this._hasDefinitionPermission(e,t,s.DeleteBuilds)}canQueueBuild(e){return this.hasDefinitionPermission(e,s.QueueBuilds)}canQueueBuildById(e,t){return this._hasDefinitionPermission(e,t,s.QueueBuilds)}canEditTagsByUserId(e,t,i,n,r){const o=(r||"").toLowerCase(),a=(n||"").toLowerCase();return(e=e||e.toLowerCase())===o||e===a||this._hasDefinitionPermission(t,i,s.EditBuildQuality)}canRetainBuild(e){return this.hasDefinitionPermission(e,s.RetainIndefinitely)||this.hasDefinitionPermission(e,s.UpdateBuildInformation)}canRetainBuildByDefinitionId(e,t){return this._hasDefinitionPermission(e,t,s.RetainIndefinitely)||this._hasDefinitionPermission(e,t,s.UpdateBuildInformation)}hasDefinitionPermission(e,t){return this._store.hasPermission(i.BuildNamespaceId,a.getDefinitionSecurityToken(this._projectId,e),t)}hasFolderPermission(e,t){return this._store.hasPermission(i.BuildNamespaceId,a._getDefinitionFolderSecurityToken(this._projectId,e),t)}isAnonymousUser(){return this._store.hasClaim(n.Anonymous)}isPublicUser(){return this._store.hasClaim(n.Public)}isMember(){return this._store.hasClaim(n.Member)}static getDefinitionSecurityToken(e,t){return a._getDefinitionSecurityToken(e,t.id.toString(),t.path)}static getSecurityTokenPath(e){return(e=e.replace(/\\/g,r))[0]===r&&(e=e.slice(1,e.length)),e}_hasDefinitionPermission(e,t,s){return this._store.hasPermission(i.BuildNamespaceId,a._getDefinitionSecurityToken(this._projectId,e,t),s)}static _getDefinitionSecurityToken(e,t,i){let s=t;return i!==o&&(s=a.getSecurityTokenPath(i)+r+s),e+r+s}static _getDefinitionFolderSecurityToken(e,t){return t===o?e:e+r+a.getSecurityTokenPath(t)+r}}t.Security.Security=a}(),function(e){t.RepositoryService={},Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.Yaml="yaml",e.Docker="docker"}(t.RepositoryService.ConfigFileType||(t.RepositoryService.ConfigFileType={}));l.Services.add("IRepositoryService",{serviceFactory:class extends l.VssService{getConfigFiles(e,t){const i={connectionId:e.connectionId,sourceProvider:e.sourceProviderType,repositoryId:e.id,repositoryName:e.name,configFileType:t,branch:e.defaultBranch};return this.getDataProviderResult("ms.vss-build-web.find-config-files-data-provider",e,i,b.ConfigFileDataProviderErrorMessage)}getDataProviderResult(e,t,i,s){const n=S.format(s,t.name||t.id),r=this.pageContext.getService("IVssContributionService");return r.getDataAsync(e,i,!0).then(t=>{if(t)return t;{const t=r.getDataProviderExceptions()[e],i=t&&t.message||n;throw new Error(i)}},e=>{throw new Error(e&&e.message||n)})}}})}(),function(e){t.SourcesBuild={},Object.defineProperty(t,"__esModule",{value:!0});const i=50;t.SourcesBuild.BuildSource=class{constructor(e){this._client=e.pageContext.getRestClient("IBuildRestClient"),this._project=e.project}getBuild(e){return this._client.getBuild(this._project,e)}getBuilds(e){return this._client.getBuilds(e.project||this._project,e.definitions,e.queues,e.buildNumber,e.minTime,e.maxTime,e.requestedFor,e.reasonFilter,e.statusFilter,e.resultFilter,e.tagFilters,e.properties,e.top||i,e.continuationToken,e.maxBuildsPerDefinition,e.deletedFilter,e.queryOrder,e.branchName,e.buildIds,e.repositoryId,e.repositoryType)}getClient(){return this._client}}}()},["Resources","Array","Components/BranchLink","Components/BuildPersona","Components/CommandComponent","Components/CommitLink","Constants","ContributedExtension.types","Duration","ErrorHandler","SingletonManager","PipelinesStateData","StateHandler","Identity","Indicator","Navigation","PipelinesL2Header","SignalRHubProxies","PipelineResourcesService","Stores/Permissions","Security","RepositoryService","Sources/Build"]),document.dispatchEvent(new CustomEvent("scriptLoaded",{cancelable:!1,detail:{id:"ms.vss-build-web.common-library"}}));