"use strict";define("Build/Client",["require","exports","VSS/Platform/Context","VSS/Platform/RestClientBase","VSS/Platform/Location","VSS/Platform/Util/Url"],function(e,t,i,r,s,o){!function(e){t[e]={},Object.defineProperty(t,"__esModule",{value:!0});t[e].ApprovalClientName="build.approval.IApprovalRestClient",t[e].getApprovalClient=function(i,r){return i.getRestClient(t[e].ApprovalClientName,r)},i.RestClients.add(t[e].ApprovalClientName,{factory:class extends r.RestClientBase{constructor(e){super(e)}async getApproval(e,t,i){const r={$expand:i};return this.beginRequest({apiVersion:"5.1-preview.1",routeTemplate:"{project}/_apis/pipelines/approvals/{approvalId}",routeValues:{project:e,approvalId:t},queryParams:r})}async queryApprovals(e,t,i){const r={approvalIds:t&&t.join(","),$expand:i};return this.beginRequest({apiVersion:"5.1-preview.1",routeTemplate:"{project}/_apis/pipelines/approvals/{approvalId}",routeValues:{project:e},queryParams:r})}async updateApprovals(e,t){return this.beginRequest({apiVersion:"5.1-preview.1",method:"PATCH",routeTemplate:"{project}/_apis/pipelines/approvals/{approvalId}",routeValues:{project:t},body:e})}},options:{serviceInstanceType:"00025394-6065-48ca-87d9-7f5672854ef7"}})}("RestClientApproval"),function(e){t[e]={},Object.defineProperty(t,"__esModule",{value:!0});t[e].BuildClientName="IBuildRestClient",t[e].getBuildClient=function(i,r){return i.getRestClient(t[e].BuildClientName,r)},i.RestClients.add(t[e].BuildClientName,{factory:class extends r.RestClientBase{constructor(e){super(e)}async createArtifact(e,t,i){return this.beginRequest({apiVersion:"5.1",method:"POST",routeTemplate:"{project}/_apis/build/builds/{buildId}/artifacts/{artifactName}",routeValues:{project:t,buildId:i},body:e})}async getArtifact(e,t,i){const r={artifactName:i};return this.beginRequest({apiVersion:"5.1",routeTemplate:"{project}/_apis/build/builds/{buildId}/artifacts/{artifactName}",routeValues:{project:e,buildId:t},queryParams:r})}async getArtifactContentZip(e,t,i){const r={artifactName:i};return this.beginRequest({apiVersion:"5.1",httpResponseType:"application/zip",routeTemplate:"{project}/_apis/build/builds/{buildId}/artifacts/{artifactName}",routeValues:{project:e,buildId:t},queryParams:r})}async getArtifacts(e,t){return this.beginRequest({apiVersion:"5.1",routeTemplate:"{project}/_apis/build/builds/{buildId}/artifacts/{artifactName}",routeValues:{project:e,buildId:t}})}async getFile(e,t,i,r,s){const o={artifactName:i,fileId:r,fileName:s};return this.beginRequest({apiVersion:"5.1",httpResponseType:"application/octet-stream",routeTemplate:"{project}/_apis/build/builds/{buildId}/artifacts/{artifactName}",routeValues:{project:e,buildId:t},queryParams:o})}async getAttachments(e,t,i){return this.beginRequest({apiVersion:"5.1-preview.2",routeTemplate:"{project}/_apis/build/builds/{buildId}/attachments/{type}",routeValues:{project:e,buildId:t,type:i}})}async getAttachment(e,t,i,r,s,o){return this.beginRequest({apiVersion:"5.1-preview.2",httpResponseType:"application/octet-stream",routeTemplate:"{project}/_apis/build/builds/{buildId}/{timelineId}/{recordId}/attachments/{type}/{name}",routeValues:{project:e,buildId:t,timelineId:i,recordId:r,type:s,name:o}})}async authorizeProjectResources(e,t){return this.beginRequest({apiVersion:"5.1-preview.1",method:"PATCH",routeTemplate:"{project}/_apis/build/authorizedresources",routeValues:{project:t},body:e})}async getProjectResources(e,t,i){const r={type:t,id:i};return this.beginRequest({apiVersion:"5.1-preview.1",routeTemplate:"{project}/_apis/build/authorizedresources",routeValues:{project:e},queryParams:r})}async getBadge(e,t,i){const r={branchName:i};return this.beginRequest({apiVersion:"5.1",routeTemplate:"_apis/public/build/definitions/{project}/{definitionId}/badge",routeValues:{project:e,definitionId:t},queryParams:r})}async listBranches(e,t,i,r,s){const o={serviceEndpointId:i,repository:r,branchName:s};return this.beginRequest({apiVersion:"5.1-preview.1",routeTemplate:"{project}/_apis/sourceProviders/{providerName}/branches",routeValues:{project:e,providerName:t},queryParams:o})}async getBuildBadge(e,t,i,r){const s={repoId:i,branchName:r};return this.beginRequest({apiVersion:"5.1-preview.2",routeTemplate:"{project}/_apis/build/repos/{repoType}/badge",routeValues:{project:e,repoType:t},queryParams:s})}async getBuildBadgeData(e,t,i,r){const s={repoId:i,branchName:r};return this.beginRequest({apiVersion:"5.1-preview.2",routeTemplate:"{project}/_apis/build/repos/{repoType}/badge",routeValues:{project:e,repoType:t},queryParams:s})}async deleteBuild(e,t){return this.beginRequest({apiVersion:"5.1",method:"DELETE",routeTemplate:"{project}/_apis/build/builds/{buildId}",routeValues:{project:e,buildId:t}})}async getBuild(e,t,i){const r={propertyFilters:i};return this.beginRequest({apiVersion:"5.1",routeTemplate:"{project}/_apis/build/builds/{buildId}",routeValues:{project:e,buildId:t},queryParams:r})}async getBuilds(e,t,i,r,s,o,n,a,u,p,l,d,c,b,m,g,y,h,j,V,I){const T={definitions:t&&t.join(","),queues:i&&i.join(","),buildNumber:r,minTime:s,maxTime:o,requestedFor:n,reasonFilter:a,statusFilter:u,resultFilter:p,tagFilters:l&&l.join(","),properties:d&&d.join(","),$top:c,continuationToken:b,maxBuildsPerDefinition:m,deletedFilter:g,queryOrder:y,branchName:h,buildIds:j&&j.join(","),repositoryId:V,repositoryType:I};return this.beginRequest({apiVersion:"5.1",routeTemplate:"{project}/_apis/build/builds/{buildId}",routeValues:{project:e},queryParams:T})}async queueBuild(e,t,i,r,s){const o={ignoreWarnings:i,checkInTicket:r,sourceBuildId:s};return this.beginRequest({apiVersion:"5.1",method:"POST",routeTemplate:"{project}/_apis/build/builds/{buildId}",routeValues:{project:t},queryParams:o,body:e})}async updateBuild(e,t,i,r){const s={retry:r};return this.beginRequest({apiVersion:"5.1",method:"PATCH",routeTemplate:"{project}/_apis/build/builds/{buildId}",routeValues:{project:t,buildId:i},queryParams:s,body:e})}async updateBuilds(e,t){return this.beginRequest({apiVersion:"5.1",method:"PATCH",routeTemplate:"{project}/_apis/build/builds/{buildId}",routeValues:{project:t},body:e})}async getBuildChanges(e,t,i,r,s){const o={continuationToken:i,$top:r,includeSourceChange:s};return this.beginRequest({apiVersion:"5.1",routeTemplate:"{project}/_apis/build/builds/{buildId}/changes",routeValues:{project:e,buildId:t},queryParams:o})}async getChangesBetweenBuilds(e,t,i,r){const s={fromBuildId:t,toBuildId:i,$top:r};return this.beginRequest({apiVersion:"5.1-preview.2",routeTemplate:"{project}/_apis/build/changes",routeValues:{project:e},queryParams:s})}async getBuildController(e){return this.beginRequest({apiVersion:"5.1",routeTemplate:"_apis/build/Controllers/{controllerId}",routeValues:{controllerId:e}})}async getBuildControllers(e){const t={name:e};return this.beginRequest({apiVersion:"5.1",routeTemplate:"_apis/build/Controllers/{controllerId}",queryParams:t})}async createDefinition(e,t,i,r){const s={definitionToCloneId:i,definitionToCloneRevision:r};return this.beginRequest({apiVersion:"5.1",method:"POST",routeTemplate:"{project}/_apis/build/definitions/{definitionId}",routeValues:{project:t},queryParams:s,body:e})}async deleteDefinition(e,t){return this.beginRequest({apiVersion:"5.1",method:"DELETE",routeTemplate:"{project}/_apis/build/definitions/{definitionId}",routeValues:{project:e,definitionId:t}})}async getDefinition(e,t,i,r,s,o){const n={revision:i,minMetricsTime:r,propertyFilters:s&&s.join(","),includeLatestBuilds:o};return this.beginRequest({apiVersion:"5.1",routeTemplate:"{project}/_apis/build/definitions/{definitionId}",routeValues:{project:e,definitionId:t},queryParams:n})}async getDefinitions(e,t,i,r,s,o,n,a,u,p,l,d,c,b,m,g,y){const h={name:t,repositoryId:i,repositoryType:r,queryOrder:s,$top:o,continuationToken:n,minMetricsTime:a,definitionIds:u&&u.join(","),path:p,builtAfter:l,notBuiltAfter:d,includeAllProperties:c,includeLatestBuilds:b,taskIdFilter:m,processType:g,yamlFilename:y};return this.beginRequest({apiVersion:"5.1",routeTemplate:"{project}/_apis/build/definitions/{definitionId}",routeValues:{project:e},queryParams:h})}async restoreDefinition(e,t,i){const r={deleted:i};return this.beginRequest({apiVersion:"5.1",method:"PATCH",routeTemplate:"{project}/_apis/build/definitions/{definitionId}",routeValues:{project:e,definitionId:t},queryParams:r})}async updateDefinition(e,t,i,r,s){const o={secretsSourceDefinitionId:r,secretsSourceDefinitionRevision:s};return this.beginRequest({apiVersion:"5.1",method:"PUT",routeTemplate:"{project}/_apis/build/definitions/{definitionId}",routeValues:{project:t,definitionId:i},queryParams:o,body:e})}async getFileContents(e,t,i,r,s,o){const n={serviceEndpointId:i,repository:r,commitOrBranch:s,path:o};return this.beginRequest({apiVersion:"5.1-preview.1",httpResponseType:"text/plain",routeTemplate:"{project}/_apis/sourceProviders/{providerName}/fileContents",routeValues:{project:e,providerName:t},queryParams:n})}async createFolder(e,t,i){const r={path:i};return this.beginRequest({apiVersion:"5.1-preview.2",method:"PUT",routeTemplate:"{project}/_apis/build/folders/{*path}",routeValues:{project:t},queryParams:r,body:e})}async deleteFolder(e,t){const i={path:t};return this.beginRequest({apiVersion:"5.1-preview.2",method:"DELETE",routeTemplate:"{project}/_apis/build/folders/{*path}",routeValues:{project:e},queryParams:i})}async getFolders(e,t,i){const r={queryOrder:i};return this.beginRequest({apiVersion:"5.1-preview.2",routeTemplate:"{project}/_apis/build/folders/{*path}",routeValues:{project:e,path:t},queryParams:r})}async updateFolder(e,t,i){const r={path:i};return this.beginRequest({apiVersion:"5.1-preview.2",method:"POST",routeTemplate:"{project}/_apis/build/folders/{*path}",routeValues:{project:t},queryParams:r,body:e})}async getLatestBuild(e,t,i){const r={branchName:i};return this.beginRequest({apiVersion:"5.1-preview.1",routeTemplate:"{project}/_apis/build/latest/{*definition}",routeValues:{project:e,definition:t},queryParams:r})}async getBuildLog(e,t,i,r,s){const o={startLine:r,endLine:s};return this.beginRequest({apiVersion:"5.1",httpResponseType:"text/plain",routeTemplate:"{project}/_apis/build/builds/{buildId}/logs/{logId}",routeValues:{project:e,buildId:t,logId:i},queryParams:o})}async getBuildLogLines(e,t,i,r,s){const o={startLine:r,endLine:s};return this.beginRequest({apiVersion:"5.1",routeTemplate:"{project}/_apis/build/builds/{buildId}/logs/{logId}",routeValues:{project:e,buildId:t,logId:i},queryParams:o})}async getBuildLogs(e,t){return this.beginRequest({apiVersion:"5.1",routeTemplate:"{project}/_apis/build/builds/{buildId}/logs/{logId}",routeValues:{project:e,buildId:t}})}async getBuildLogsZip(e,t){return this.beginRequest({apiVersion:"5.1",httpResponseType:"application/zip",routeTemplate:"{project}/_apis/build/builds/{buildId}/logs/{logId}",routeValues:{project:e,buildId:t}})}async getBuildLogZip(e,t,i,r,s){const o={startLine:r,endLine:s};return this.beginRequest({apiVersion:"5.1",httpResponseType:"application/zip",routeTemplate:"{project}/_apis/build/builds/{buildId}/logs/{logId}",routeValues:{project:e,buildId:t,logId:i},queryParams:o})}async getProjectMetrics(e,t,i){const r={minMetricsTime:i};return this.beginRequest({apiVersion:"5.1-preview.1",routeTemplate:"{project}/_apis/build/Metrics/{metricAggregationType}",routeValues:{project:e,metricAggregationType:t},queryParams:r})}async getDefinitionMetrics(e,t,i){const r={minMetricsTime:i};return this.beginRequest({apiVersion:"5.1-preview.1",routeTemplate:"{project}/_apis/build/definitions/{definitionId}/Metrics",routeValues:{project:e,definitionId:t},queryParams:r})}async getBuildOptionDefinitions(e){return this.beginRequest({apiVersion:"5.1",routeTemplate:"{project}/_apis/build/options",routeValues:{project:e}})}async getPathContents(e,t,i,r,s,o){const n={serviceEndpointId:i,repository:r,commitOrBranch:s,path:o};return this.beginRequest({apiVersion:"5.1-preview.1",routeTemplate:"{project}/_apis/sourceProviders/{providerName}/pathContents",routeValues:{project:e,providerName:t},queryParams:n})}async getBuildProperties(e,t,i){const r={filter:i&&i.join(",")};return this.beginRequest({apiVersion:"5.1-preview.1",routeTemplate:"{project}/_apis/build/builds/{buildId}/properties",routeValues:{project:e,buildId:t},queryParams:r})}async updateBuildProperties(e,t,i){return this.beginRequest({apiVersion:"5.1-preview.1",method:"PATCH",routeTemplate:"{project}/_apis/build/builds/{buildId}/properties",routeValues:{project:t,buildId:i},customHeaders:{"Content-Type":"application/json-patch+json"},body:e})}async getDefinitionProperties(e,t,i){const r={filter:i&&i.join(",")};return this.beginRequest({apiVersion:"5.1-preview.1",routeTemplate:"{project}/_apis/build/definitions/{definitionId}/properties",routeValues:{project:e,definitionId:t},queryParams:r})}async updateDefinitionProperties(e,t,i){return this.beginRequest({apiVersion:"5.1-preview.1",method:"PATCH",routeTemplate:"{project}/_apis/build/definitions/{definitionId}/properties",routeValues:{project:t,definitionId:i},customHeaders:{"Content-Type":"application/json-patch+json"},body:e})}async getPullRequest(e,t,i,r,s){const o={repositoryId:r,serviceEndpointId:s};return this.beginRequest({apiVersion:"5.1-preview.1",routeTemplate:"{project}/_apis/sourceProviders/{providerName}/pullRequests/{pullRequestId}",routeValues:{project:e,providerName:t,pullRequestId:i},queryParams:o})}async getBuildReport(e,t,i){const r={type:i};return this.beginRequest({apiVersion:"5.1-preview.2",routeTemplate:"{project}/_apis/build/builds/{buildId}/report",routeValues:{project:e,buildId:t},queryParams:r})}async getBuildReportHtmlContent(e,t,i){const r={type:i};return this.beginRequest({apiVersion:"5.1-preview.2",httpResponseType:"text/html",routeTemplate:"{project}/_apis/build/builds/{buildId}/report",routeValues:{project:e,buildId:t},queryParams:r})}async listRepositories(e,t,i,r,s,o,n){const a={serviceEndpointId:i,repository:r,resultSet:s,pageResults:o,continuationToken:n};return this.beginRequest({apiVersion:"5.1-preview.1",routeTemplate:"{project}/_apis/sourceProviders/{providerName}/repositories",routeValues:{project:e,providerName:t},queryParams:a})}async authorizeDefinitionResources(e,t,i){return this.beginRequest({apiVersion:"5.1-preview.1",method:"PATCH",routeTemplate:"{project}/_apis/build/definitions/{definitionId}/resources",routeValues:{project:t,definitionId:i},body:e})}async getDefinitionResources(e,t){return this.beginRequest({apiVersion:"5.1-preview.1",routeTemplate:"{project}/_apis/build/definitions/{definitionId}/resources",routeValues:{project:e,definitionId:t}})}async getResourceUsage(){return this.beginRequest({apiVersion:"5.1-preview.2",routeTemplate:"_apis/build/ResourceUsage"})}async getDefinitionRevisions(e,t){return this.beginRequest({apiVersion:"5.1",routeTemplate:"{project}/_apis/build/definitions/{definitionId}/revisions",routeValues:{project:e,definitionId:t}})}async getBuildSettings(e){return this.beginRequest({apiVersion:"5.1",routeTemplate:"{project}/_apis/build/settings",routeValues:{project:e}})}async updateBuildSettings(e,t){return this.beginRequest({apiVersion:"5.1",method:"PATCH",routeTemplate:"{project}/_apis/build/settings",routeValues:{project:t},body:e})}async listSourceProviders(e){return this.beginRequest({apiVersion:"5.1-preview.1",routeTemplate:"{project}/_apis/sourceProviders",routeValues:{project:e}})}async getStatusBadge(e,t,i,r,s,o,n){const a={branchName:i,stageName:r,jobName:s,configuration:o,label:n};return this.beginRequest({apiVersion:"5.1-preview.1",routeTemplate:"{project}/_apis/build/status/{*definition}",routeValues:{project:e,definition:t},queryParams:a})}async addBuildTag(e,t,i){return this.beginRequest({apiVersion:"5.1",method:"PUT",routeTemplate:"{project}/_apis/build/builds/{buildId}/tags/{*tag}",routeValues:{project:e,buildId:t,tag:i}})}async addBuildTags(e,t,i){return this.beginRequest({apiVersion:"5.1",method:"POST",routeTemplate:"{project}/_apis/build/builds/{buildId}/tags/{*tag}",routeValues:{project:t,buildId:i},body:e})}async deleteBuildTag(e,t,i){return this.beginRequest({apiVersion:"5.1",method:"DELETE",routeTemplate:"{project}/_apis/build/builds/{buildId}/tags/{*tag}",routeValues:{project:e,buildId:t,tag:i}})}async getBuildTags(e,t){return this.beginRequest({apiVersion:"5.1",routeTemplate:"{project}/_apis/build/builds/{buildId}/tags/{*tag}",routeValues:{project:e,buildId:t}})}async getTags(e){return this.beginRequest({apiVersion:"5.1",routeTemplate:"{project}/_apis/build/tags",routeValues:{project:e}})}async addDefinitionTag(e,t,i){return this.beginRequest({apiVersion:"5.1-preview.2",method:"PUT",routeTemplate:"{project}/_apis/build/definitions/{DefinitionId}/tags/{*tag}",routeValues:{project:e,definitionId:t,tag:i}})}async addDefinitionTags(e,t,i){return this.beginRequest({apiVersion:"5.1-preview.2",method:"POST",routeTemplate:"{project}/_apis/build/definitions/{DefinitionId}/tags/{*tag}",routeValues:{project:t,definitionId:i},body:e})}async deleteDefinitionTag(e,t,i){return this.beginRequest({apiVersion:"5.1-preview.2",method:"DELETE",routeTemplate:"{project}/_apis/build/definitions/{DefinitionId}/tags/{*tag}",routeValues:{project:e,definitionId:t,tag:i}})}async getDefinitionTags(e,t,i){const r={revision:i};return this.beginRequest({apiVersion:"5.1-preview.2",routeTemplate:"{project}/_apis/build/definitions/{DefinitionId}/tags/{*tag}",routeValues:{project:e,definitionId:t},queryParams:r})}async deleteTemplate(e,t){return this.beginRequest({apiVersion:"5.1",method:"DELETE",routeTemplate:"{project}/_apis/build/definitions/templates/{templateId}",routeValues:{project:e,templateId:t}})}async getTemplate(e,t){return this.beginRequest({apiVersion:"5.1",routeTemplate:"{project}/_apis/build/definitions/templates/{templateId}",routeValues:{project:e,templateId:t}})}async getTemplates(e){return this.beginRequest({apiVersion:"5.1",routeTemplate:"{project}/_apis/build/definitions/templates/{templateId}",routeValues:{project:e}})}async saveTemplate(e,t,i){return this.beginRequest({apiVersion:"5.1",method:"PUT",routeTemplate:"{project}/_apis/build/definitions/templates/{templateId}",routeValues:{project:t,templateId:i},body:e})}async getBuildTimeline(e,t,i,r,s){const o={changeId:r,planId:s};return this.beginRequest({apiVersion:"5.1",routeTemplate:"{project}/_apis/build/builds/{buildId}/Timeline/{timelineId}",routeValues:{project:e,buildId:t,timelineId:i},queryParams:o})}async restoreWebhooks(e,t,i,r,s){const o={serviceEndpointId:r,repository:s};return this.beginRequest({apiVersion:"5.1-preview.1",method:"POST",routeTemplate:"{project}/_apis/sourceProviders/{providerName}/webhooks",routeValues:{project:t,providerName:i},queryParams:o,body:e})}async listWebhooks(e,t,i,r){const s={serviceEndpointId:i,repository:r};return this.beginRequest({apiVersion:"5.1-preview.1",routeTemplate:"{project}/_apis/sourceProviders/{providerName}/webhooks",routeValues:{project:e,providerName:t},queryParams:s})}async getBuildWorkItemsRefs(e,t,i){const r={$top:i};return this.beginRequest({apiVersion:"5.1",routeTemplate:"{project}/_apis/build/builds/{buildId}/workitems",routeValues:{project:e,buildId:t},queryParams:r})}async getBuildWorkItemsRefsFromCommits(e,t,i,r){const s={$top:r};return this.beginRequest({apiVersion:"5.1",method:"POST",routeTemplate:"{project}/_apis/build/builds/{buildId}/workitems",routeValues:{project:t,buildId:i},queryParams:s,body:e})}async getWorkItemsBetweenBuilds(e,t,i,r){const s={fromBuildId:t,toBuildId:i,$top:r};return this.beginRequest({apiVersion:"5.1-preview.2",routeTemplate:"{project}/_apis/build/workitems",routeValues:{project:e},queryParams:s})}},options:{resourceAreaId:"965220d5-5bb9-42cf-8d67-9b146df2a5a4",serviceInstanceType:"00025394-6065-48ca-87d9-7f5672854ef7"}})}("RestClientBuild"),function(e){var r,n,a,u;t.Linking={},Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.AgentQueues="ms.vss-build-web.agent-queues-route",e.BuildResult="ms.vss-build-web.ci-results-hub-route",e.CIEditor="ms.vss-ciworkflow.ci-editor-route",e.YamlEditor="ms.vss-build-web.ci-definition-designer-route",e.CIHub="ms.vss-build-web.ci-definitions-hub-route",e.PipelinesHub="ms.vss-build-web.pipelines-hub-route",e.DeletedPipelines="ms.vss-build-web.deleted-pipelines-route",e.FolderView="ms.vss-build-web.pipelines-folder-route",e.WitForms="ms.vss-work-web.work-items-form-route",e.WitQuery="ms.vss-work-web.query-route",e.ProjectSettings="ms.vss-admin-web.project-admin-hub-route"}(r||(r={})),function(e){e.BuildId="buildId",e.DefinitionId="definitionId",e.DefinitionScope="definitionScope",e.Project="project",e.Team="team",e.View="view"}(n=t.Linking.RouteParameters||(t.Linking.RouteParameters={})),function(e){e.Id="id",e.Wiql="wiql",e.queryPath="query"}(a=t.Linking.WITRouteParameters||(t.Linking.WITRouteParameters={})),function(e){e.AdminPivot="adminPivot"}(u=t.Linking.ProjectRouteParameters||(t.Linking.ProjectRouteParameters={}));i.Services.add("IBuildLinkingService",{serviceFactory:class extends i.VssService{getAgentQueueUrl(e,t,i,o){const n={};this._initializeRouteValues(n,i,o);let a=s.routeUrl(this.pageContext,r.AgentQueues,n);return a+=`?queueId=${e}`,t&&(a+=`&agentId=${t}`),a}getDefinitionEditUrl(e,t,i,o){const a={};this._initializeRouteValues(a,i,o);let u=s.routeUrl(this.pageContext,r.CIEditor,a);return u+=`?_a=edit-build-definition&id=${e}`,t&&(u+=`&${n.View}=${t}`),u}getYamlPipelineEditUrl(e,t,i,o){const n={};return this._initializeRouteValues(n,i,o),n.pipelineId=e.toString(),t&&(n.branch=t),s.routeUrl(this.pageContext,r.YamlEditor,n)}getNewDefinitionEditUrl(e){const t={};this._initializeRouteValues(t);let i=s.routeUrl(this.pageContext,r.CIEditor,t);return i+="?_a=build-definition-getting-started",e&&(i+="&path="+encodeURIComponent(e)),i}getCloneDefinitionEditUrl(e,t,i){const o={};this._initializeRouteValues(o,t,i);let n=s.routeUrl(this.pageContext,r.CIEditor,o);return n+=`?_a=clone-build-definition&id=${e}`}getDefinitionUrl(e,t,i,o){t=t||r.CIHub;const a={};this._initializeRouteValues(a,i,o),e&&(a[n.DefinitionId]=e+"");let u=s.routeUrl(this.pageContext,t,a);return u+=e?"&_a=summary":""}getPipelinesUrl(e,t,i,o,a){const u={};this._initializeRouteValues(u,o,a),e&&(u[n.DefinitionId]=e+"");let p=s.routeUrl(this.pageContext,r.PipelinesHub,u);return p+="&_a=summary",p+=t?"&repositoryFilter="+t:"",p+=i?"&branchFilter="+i:""}getBuildUrl(e,t,i,o,a){const u={};this._initializeRouteValues(u,i,o),u[n.BuildId]=e+"";let p=s.routeUrl(this.pageContext,r.BuildResult,u);return t&&(p+=`&${n.View}=${t}`),a&&Object.keys(a).forEach(e=>{a[e]&&(p+=`&${e}=${a[e]}`)}),p}getFolderUrl(e){const t={};this._initializeRouteValues(t);let i=s.routeUrl(this.pageContext,r.CIHub,t);return e&&(i+="?path="+encodeURIComponent(e)),this.getAbsoluteUrl(i)}getWorkItemUrl(e,t,i){const o={};return this._initializeRouteValues(o,t,i),o[a.Id]=e+"",s.routeUrl(this.pageContext,r.WitForms,o)}getWorkItemQueryUrl(e,t,i){const o={};this._initializeRouteValues(o,t,i);let n=s.routeUrl(this.pageContext,r.WitQuery,o)+"/"+a.queryPath;return e&&(n+="?"+a.Wiql+"="+encodeURIComponent(e)),this.getAbsoluteUrl(n)}getProjectSettingsUrl(e,t){const i=r.ProjectSettings,o={};return this._initializeRouteValues(o),delete o[n.Team],o[u.AdminPivot]="projectOverview",s.routeUrl(this.pageContext,i,o)}getAbsoluteUrl(e){return e.startsWith("http://")||e.startsWith("https://")||(e=o.combineUrlPaths(location.origin,e)),e}getDeletedPipelinesUrl(e,t){const i={};return this._initializeRouteValues(i,e,t),s.routeUrl(this.pageContext,r.DeletedPipelines,i)}getPipelinesFolderUrl(e,t,i){const o={};return this._initializeRouteValues(o,e,t),i&&(o[n.DefinitionScope]=i),s.routeUrl(this.pageContext,r.FolderView,o)}_initializeRouteValues(e,t,i){if(!t||!i){const e=this.pageContext.getService("ITfsPageService"),r=e.getData();if(r){!t&&r.project&&(t=r.project.name);const s=e.getHorizontalNavigationTeamData();!i&&s&&(i=s.name)}}t&&(e[n.Project]=t),i&&(e[n.Team]=i)}}})}()},["RestClient/Approval","RestClient/Build","Linking"]),document.dispatchEvent(new CustomEvent("scriptLoaded",{cancelable:!1,detail:{id:"ms.vss-build-web.common-client"}}));