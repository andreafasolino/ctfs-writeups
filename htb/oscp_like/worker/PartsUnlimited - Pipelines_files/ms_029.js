"use strict";define("Build/Common/Commands",["require","exports","react","Build/Common/Library/ErrorHandler","VSSUI/Dialog","VSSUI/FormItem","VSSUI/TextField","VSS/Core/Observable","VSS/Core/Util/String","VSS/Platform/Layout","VSS/Legacy/Legacy","Build/Queue-Panel/QueuePanel","Build/Common/Library/Legacy/Stores/Queue","Build/Common/Library/SingletonManager","VSS/Platform/Feature","VSSUI/Button"],function(e,t,o,s,i,n,r,a,l,d,p,m,h,c,u,f){var g,C,D;g=t.Resources={},Object.defineProperty(t,"__esModule",{value:!0}),t.Resources.Cancel="Cancel",t.Resources.Create="Create",t.Resources.CannotBeEmptyErrorMessage="Cannot be empty.",t.Resources.CannotEndWithPeriodErrorMessage="Cannot end with a '.'.",t.Resources.ChooseFolder="Choose folder...",t.Resources.DefinitionDescriptionTextboxLabel="Description",t.Resources.DefinitionFolderTextboxLabel="Select folder",t.Resources.DefinitionNameTextboxLabel="Name",t.Resources.Delete="Delete",t.Resources.DeleteDefinitionDialogMessage="Are you sure? This action cannot be undone. This will permanently delete the pipeline '{0}'. Deletion includes all builds and associated artifacts.",t.Resources.DeleteDraftDefinitionDialogMessage="Are you sure? This action cannot be undone. This will permanently delete the draft pipeline '{0}'.",t.Resources.DeleteFolderDialogMessage="Are you sure? This action cannot be undone. This will permanently delete the folder '{0}'. Deletion includes all pipelines and associated builds and artifacts.",t.Resources.DeleteDefinitionDialogTitle="Delete '{0}'?",t.Resources.DeleteDraftDefinitionDialogTitle="Delete draft of '{0}'?",t.Resources.DeleteFolderDialogTitle="Delete '{0}'?",t.Resources.DeleteDefinitionTextboxLabel="Please type the name of the pipeline to confirm.",t.Resources.DeleteDraftDefinitionTextboxLabel="Please type the name of the draft pipeline to confirm.",t.Resources.DeleteFolderTextboxLabel="Please type the complete folder path to confirm.",t.Resources.FolderNamePlaceholder="Type a folder name",t.Resources.FolderPathTextboxLabel="Path",t.Resources.NewFolderDialogTitle="New folder",t.Resources.OK="OK",t.Resources.RenameDefinitionDialogTitle="Rename/move pipeline",t.Resources.RenameFolderDialogTitle="Rename folder",t.Resources.Save="Save",t.Resources.SaveAsTemplateDefinitionDialogTitle="Save as a template...",t.Resources.SelectFolder="Select folder",t.Resources.UnallowedCharactersErrorMessage="{0} are not allowed.",C=t.Constants={},Object.defineProperty(t,"__esModule",{value:!0}),(D=t.Constants.DisallowedCharacters||(t.Constants.DisallowedCharacters={})).DisallowedPipelineNameCharacters='<>|\\:$@"/',D.DisallowedFolderPathCharacters='<>|:$@"/%+*?',D.DisallowedFolderNameCharacters=D.DisallowedFolderPathCharacters+"\\",t.deletedefinitionCommandtypes={},Object.defineProperty(t,"__esModule",{value:!0}),function(e){t.deletedefinitionCommand={},Object.defineProperty(t,"__esModule",{value:!0});class p extends d.VssComponent{constructor(e){super(e),this.deleteText=new a.ObservableValue(""),this._onCommit=(()=>{this.props.onClose();let e=this.props.pageContext.getRestClient("IBuildRestClient");if(this.props.definition){let t=this.props.definition;e.deleteDefinition(t.project.id,t.id).then(()=>{this.props.onDefinitionDeleted&&this.props.onDefinitionDeleted(t)},s.handleError)}else if(this.props.path){let t=this.props.path;e.deleteFolder(this.props.projectId,t).then(()=>{this.props.onFolderDeleted&&this.props.onFolderDeleted(t)},s.handleError)}}),this._onDismiss=(()=>{this.props.onClose()}),this._onTextChanged=((e,t)=>{this.deleteText.value=t,this.props.definition&&this.props.definition.name===t||this.props.path&&this.props.path===t?this.setState({deletionConfirmed:!0}):this.setState({deletionConfirmed:!1})}),this.state={deletionConfirmed:!1}}render(){let e="",t="",s="";if(this.props.definition)2===this.props.definition.quality?(e=l.format(g.DeleteDraftDefinitionDialogTitle,this.props.definition.name),t=l.format(g.DeleteDraftDefinitionDialogMessage,this.props.definition.name),s=g.DeleteDraftDefinitionTextboxLabel):(e=l.format(g.DeleteDefinitionDialogTitle,this.props.definition.name),t=l.format(g.DeleteDefinitionDialogMessage,this.props.definition.name),s=g.DeleteDefinitionTextboxLabel);else if(this.props.path){const o=this.props.path.split("\\"),i=o[o.length-1];e=l.format(g.DeleteFolderDialogTitle,i),t=l.format(g.DeleteFolderDialogMessage,this.props.path),s=g.DeleteFolderTextboxLabel}return o.createElement(i.Dialog,{calloutContentClassName:"ci-dialog",onDismiss:this._onDismiss,footerButtonProps:[{onClick:this._onDismiss,text:g.Cancel},{disabled:!this.state.deletionConfirmed,onClick:this._onCommit,primary:!0,text:g.Delete}],titleProps:{text:e,size:1}},o.createElement("div",null,t),o.createElement("br",null),o.createElement(n.FormItem,{label:s},o.createElement(r.TextField,{onChange:this._onTextChanged,value:this.deleteText})))}}p.componentType="ciDeleteDefinitionComponent",d.VssComponent.register(p.componentType,p)}(),function(e){t.importdefinitionCommand={},Object.defineProperty(t,"__esModule",{value:!0});class s extends d.VssComponent{constructor(e){super(e)}render(){return o.createElement(p.LegacyComponent,{modules:["Build/Scripts/Components/ImportDefinitionDialog"],wrappedType:"ci-import-dialog"})}}s.componentType="ciImportDefinitionComponent",d.VssComponent.register(s.componentType,s)}(),t.newfolderCommandtypes={},Object.defineProperty(t,"__esModule",{value:!0}),function(e){t.newfolderCommand={},Object.defineProperty(t,"__esModule",{value:!0});class a extends d.VssComponent{constructor(e){super(e),this._onCommit=(()=>{this.props.onClose();let e=this.props.pageContext.getRestClient("IBuildRestClient"),t={path:this.props.parentPath+"\\"+this.state.name.trim()};e.createFolder(t,this.props.projectId,t.path).then(e=>{this.props.onFolderCreated&&this.props.onFolderCreated(e)},s.handleError)}),this._onDismiss=(()=>{this.props.onClose()}),this._onNameChanged=((e,t)=>{let o="";if(0===t.trim().length)o="";else{const e=C.DisallowedCharacters.DisallowedFolderNameCharacters;for(let s=0;s<e.length;s++)-1!==t.indexOf(e[s])&&(o=l.format(g.UnallowedCharactersErrorMessage,e))}this.setState({name:t,nameErrorMessage:o})}),this.state={name:"",description:"",nameErrorMessage:""}}render(){return o.createElement(i.Dialog,{calloutContentClassName:"ci-dialog",footerButtonProps:[{onClick:this._onDismiss,text:g.Cancel},{disabled:this.state.nameErrorMessage.length>0||0===this.state.name.trim().length,onClick:this._onCommit,primary:!0,text:g.Create}],onDismiss:this._onDismiss,titleProps:{text:g.NewFolderDialogTitle,size:1}},o.createElement(n.FormItem,{message:this.state.nameErrorMessage,error:this.state.nameErrorMessage.length>0},o.createElement(r.TextField,{value:this.state.name,onChange:this._onNameChanged,placeholder:g.FolderNamePlaceholder})))}}a.componentType="ciNewFolderComponent",d.VssComponent.register(a.componentType,a)}(),t.permissionsCommandtypes={},Object.defineProperty(t,"__esModule",{value:!0}),function(e){t.permissionsCommand={},Object.defineProperty(t,"__esModule",{value:!0});class s extends d.VssComponent{constructor(e){super(e)}render(){return o.createElement(p.LegacyComponent,{modules:["Build/Scripts/Components/DefinitionPermissionsDialog"],wrappedType:"ci-permissions-dialog",definition:this.props.definition,path:this.props.path})}}s.componentType="ciPermissionsComponent",d.VssComponent.register(s.componentType,s)}(),t.queuebuildCommandtypes={},Object.defineProperty(t,"__esModule",{value:!0}),function(e){t.queuebuildCommand={},Object.defineProperty(t,"__esModule",{value:!0});class s extends d.VssComponent{constructor(e){super(e),this._storeChanged=(()=>{this.setState({queues:this._queueStore.getQueues()})}),this._onSuccess=((e,t,o)=>{this.props.onSuccess(o)}),e=e;let t=c.getSingletonManager().get(h.QueueStore.key);t||(t=new h.QueueStore({pageContext:e.pageContext,project:e.project}),c.getSingletonManager().add(h.QueueStore.key,t)),this._queueStore=t,this.state={queues:this._queueStore.getQueues()}}componentDidMount(){this._queueStore.addListener(this._storeChanged)}componentWillUnmount(){this._queueStore.removeListener(this._storeChanged)}render(){const e=this.props.definition;let t={agentQueues:this.state.queues,defaultAgentQueue:null,defaultSourceBranch:this.props.defaultSourceBranch||"",definitionId:e.id,definitionName:e.name,processType:this.props.processType,repository:this.props.repository,queueDialogSource:this.props.source,onSuccess:this._onSuccess,onClosed:this.props.onClosed,definitionQueueStatus:e.queueStatus,runTimeVariables:this._getRuntimeVariables(this.props.variables),addDefinitionDemands:!0};const s=this.props.queue;s&&(t.defaultAgentQueue={projectId:this.props.project,id:s.id,name:s.name,pool:s.pool});const i=u.isFeatureEnabled(this.props.pageContext,"ms.vss-build-web.ci-new-landing-pages",!1),n=u.isFeatureFlagEnabled(this.props.pageContext,"Build2.NewQueuePanel",!1);return i||n?o.createElement(m.QueuePanel,{showPanel:!0,pageContext:this.props.pageContext,projectId:this.props.project,definitionId:this.props.definition.id,buildRepository:this.props.repository,sourceBranch:this.props.defaultSourceBranch||"",runtimeVariables:t.runTimeVariables,onDismiss:this.props.onDismiss}):o.createElement(p.LegacyComponent,Object.assign({modules:["CIWorkflow/Scripts/Scenarios/Definition/ControllerViews/QueueBuildDialog"],wrappedType:"ci-queue-build-dialog",dependencies:["ms.vss-web.legacy-vss-ui-content"]},t))}_getRuntimeVariables(e){const t=[];e=e||{};for(let o in e)if(e.hasOwnProperty(o)){let s=e[o];s.allowOverride&&t.push({name:o,variable:{value:s.value,isSecret:s.isSecret,allowOverride:!0}})}return t}}s.componentType="ciQueueBuildComponent",d.VssComponent.register(s.componentType,s)}(),t.savedefinitionCommandtypes={},Object.defineProperty(t,"__esModule",{value:!0}),function(e){t.savedefinitionCommand={},Object.defineProperty(t,"__esModule",{value:!0});class a extends d.VssComponent{constructor(e){super(e),this._onCommit=((e,t,o)=>{this.props.onClose();const i=e.trim(),n=t.trim();let r=this.props.pageContext.getRestClient("IBuildRestClient");if(this.props.definition)r.getDefinition(this.props.definition.project.id,this.props.definition.id).then(e=>{if(this.props.saveAsTemplate){e.quality=1;let t={name:i,description:o,template:e};r.saveTemplate(t,e.project.id,t.name.replace(/[^0-9a-zA-Z-_.]/g,"")).then(e=>{},s.handleError)}else e.name=i,e.description=o,e.path=n,r.updateDefinition(e,e.project.id,e.id).then(e=>{this.props.onDefinitionSaved&&this.props.onDefinitionSaved(e)},s.handleError)},s.handleError);else if(this.props.folder){let e={path:n+"\\"+i,description:o},t=this.props.folder.path;r.updateFolder(e,this.props.projectId,t).then(e=>{this.props.onFolderSaved&&this.props.onFolderSaved(e,t)},s.handleError)}}),this._onDismiss=(()=>{this.props.onClose()}),this._onNameChanged=((e,t)=>{let o="";if(0===t.trim().length)o=g.CannotBeEmptyErrorMessage;else{const e=this.props.definition?C.DisallowedCharacters.DisallowedPipelineNameCharacters:C.DisallowedCharacters.DisallowedFolderNameCharacters;for(let s=0;s<e.length;s++)-1!==t.indexOf(e[s])&&(o=l.format(g.UnallowedCharactersErrorMessage,e))}this.setState({name:t,nameErrorMessage:o})}),this._onPathChanged=((e,t)=>{let o="";if(0===t.trim().length)o=g.CannotBeEmptyErrorMessage;else if(l.endsWith(t,"."))o=g.CannotEndWithPeriodErrorMessage;else{const e=C.DisallowedCharacters.DisallowedFolderPathCharacters;for(let s=0;s<e.length;s++)-1!==t.indexOf(e[s])&&(o=l.format(g.UnallowedCharactersErrorMessage,e))}this.setState({definitionPath:t,pathErrorMessage:o})}),this._onShowFolderDialog=(()=>{this.setState({showFolderDialog:!0})}),this._onDismissFolderDialog=(()=>{this.setState({showFolderDialog:!1})}),this._onFolderDialogResult=(e=>{this.setState({definitionPath:e.path})});let t="",o="";e.definition?(t=e.definition.name,o=e.definition.path):e.folder&&(t=this._getName(e.folder),o=this._getParentPath(e.folder)),this.state={name:t,definitionPath:o,description:"",nameErrorMessage:"",pathErrorMessage:"",showFolderDialog:!1}}render(){let e={title:g.SelectFolder,okManageDialogCallBack:this._onFolderDialogResult,onManageDialogDissmiss:this._onDismissFolderDialog,showDialogActions:!1,defaultPath:this.state.definitionPath,showDialog:this.state.showFolderDialog},t=g.RenameDefinitionDialogTitle;return this.props.saveAsTemplate?t=g.SaveAsTemplateDefinitionDialogTitle:this.props.definition||(t=g.RenameFolderDialogTitle),o.createElement(i.Dialog,{calloutContentClassName:"ci-dialog",footerButtonProps:[{onClick:this._onDismiss,text:g.Cancel},{disabled:this.state.nameErrorMessage.length>0||this.state.pathErrorMessage.length>0,onClick:this._onCommit.bind(this,this.state.name,this.state.definitionPath,this.state.description),primary:!0,text:g.Save}],onDismiss:this._onDismiss,titleProps:{text:t,size:1}},o.createElement(p.LegacyComponent,Object.assign({modules:["Build/Scripts/Components/FolderManageDialog"],wrappedType:"ci-folder-manage-dialog"},e)),o.createElement(n.FormItem,{label:g.DefinitionNameTextboxLabel,message:this.state.nameErrorMessage,error:this.state.nameErrorMessage.length>0},o.createElement(r.TextField,{value:this.state.name,onChange:this._onNameChanged})),!this.props.saveAsTemplate&&this.props.definition&&o.createElement("div",{className:"ci-folder-picker-container flex"},o.createElement(n.FormItem,{className:"flex-grow",label:g.DefinitionFolderTextboxLabel,message:this.state.pathErrorMessage,error:this.state.pathErrorMessage.length>0},o.createElement(r.TextField,{value:this.state.definitionPath,onChange:this._onPathChanged})),o.createElement(f.Button,{subtle:!0,className:"flex-self-end",iconProps:{iconName:"More"},disabled:!1,onClick:this._onShowFolderDialog,ariaLabel:g.ChooseFolder})))}_getName(e){let t=e.path.lastIndexOf("\\");return e.path.substring(t+1)}_getParentPath(e){let t=e.path.lastIndexOf("\\");return e.path.substring(0,t)}}a.componentType="ciSaveDefinitionComponent",d.VssComponent.register(a.componentType,a)}()},["Resources","Constants","deletedefinition/Command.types","deletedefinition/Command","importdefinition/Command","newfolder/Command.types","newfolder/Command","permissions/Command.types","permissions/Command","queuebuild/Command.types","queuebuild/Command","savedefinition/Command.types","savedefinition/Command"]),document.dispatchEvent(new CustomEvent("scriptLoaded",{cancelable:!1,detail:{id:"ms.vss-build-web.common-commands"}}));