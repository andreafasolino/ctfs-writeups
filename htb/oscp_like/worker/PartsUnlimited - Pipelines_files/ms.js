"use strict";define("Build/Common/Library/Legacy",["require","exports","VSS/Core/Observable","VSSUI/Utilities/ItemContribution","VSS/Features/Frame/ContributedPivotBarActionProvider","VSS/Features/Frame/ContributedPivotBarItemProvider","Build/Flux/Action","react","Build/Common/Library/Components/BuildPersona","Build/Common/Library/Identity","Build/SourceProviders/Common","VSS/Core/Util/String","VSS/Features/Identities/IdentityPickerProvider","VSSUI/Card","VSSUI/Dialog","VSSUI/IdentityPicker","VSSUI/List","VSSUI/Utilities/Date","VSSUI/Utilities/Provider","VSSUI/FormItem","VSSUI/TextField","VSSUI/Button","VSS/Platform/Layout","VSSUI/ComboBox","VSSUI/Util","Build/Common/Library/RepositoryService","VSS/Core/Util/Object","VSSUI/MessageCard","VSSUI/Panel","VSSUI/RadioButton","Build/Flux/Store","DistributedTask/Common/Library/Sources/Queue"],function(e,t,s,i,o,r,n,a,l,c,h,d,p,u,m,S,v,g,b,_,C,P,y,f,x,I,w,B,k,D,E,F){var T,V,N,O;T=t.Resources={},Object.defineProperty(t,"__esModule",{value:!0}),t.Resources.OkButtonText="Ok",t.Resources.BranchesError="Error loading branches",t.Resources.CancelButtonText="Cancel",t.Resources.CommitsLabel="Commit",t.Resources.PipelineSettingsPanelTitle="Pipeline settings",t.Resources.PipelineSettingsSubheaderStatus="Processing of new run requests",t.Resources.PipelineSettingsStatusEnabled="Enabled",t.Resources.PipelineSettingsStatusDisabled="Disabled",t.Resources.PipelineSettingsStatusPaused="Paused",t.Resources.PipelineSettingsYamlDiscard="This will discard unsaved changes in the current YAML file",t.Resources.PipelineSettingsYamlFetchError="An unspecified error occurred while fetching existing YAML files.",t.Resources.PipelineSettingsYamlFilePath="YAML file path",t.Resources.SaveButtonLabel="Save",t.Resources.ShelvesetPickerDialogTitle="Shelveset picker",t.Resources.ShelvesetCommentFormat="{0} created {1} ({2})",t.Resources.ShelvesetNameFormat="{0}: {1}",t.Resources.ShelvesetTextboxTitle="Shelveset name",t.Resources.SourceVersionTextboxTitle="Source version",function(e){var r;t.ObservablePivotActionArray={},Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.StaticFirst=0]="StaticFirst",e[e.ContributedFirst=1]="ContributedFirst"}(r=t.ObservablePivotActionArray.ItemOrdering||(t.ObservablePivotActionArray.ItemOrdering={}));t.ObservablePivotActionArray.ObservableHeaderCommandArray=class extends s.ObservableArray{constructor(e,t,s,r,n,a){super([]),this._convert=(e=>{let t={id:e.key,text:e.name,iconProps:e.iconProps,isPrimary:!1,important:!1,disabled:e.disabled,href:e.href,onActivate:(t,s)=>e.onClick&&e.onClick(s),itemType:e.separator?1:0};if(e.children){t.subMenuProps={},t.subMenuProps.id=e.key+"-submenu";let s=[];e.children.forEach(e=>{s.push(this._convertChildAction(e))}),t.subMenuProps.items=s}return this._mutate&&(t=this._mutate(t)),t}),this._convertChildAction=(e=>{let t={id:e.key,text:e.name,iconProps:e.iconProps,disabled:e.disabled,href:e.href,onActivate:(t,s)=>e.onClick&&e.onClick(s),itemType:e.separator?1:0};if(e.children){t.subMenuProps={id:e.key+"submenu",items:[]};let s=[];e.children.forEach(e=>{s.push(this._convertChildAction(e))}),t.subMenuProps.items=s}return this._mutate&&(t=this._mutate(t)),t});let l=[];l=l.concat(t),this._contributedItems=[],s.forEach(t=>{const s=new o.ContributedPivotBarActionProvider({context:e,targetId:t.contributionId,getContext:t.getContributionContext});let r=new i.ContributedItemWithIdArray(s,e=>e,e=>e.key);this._contributedItems.push(r),r.subscribe((e,t)=>{this.value=this._getItems()})}),this._staticItems=t,this._divider=n,this._order=r,this._mutate=a,this.value=this._getItems()}_getItems(){let e=[];if(this._order===r.ContributedFirst&&(this._contributedItems.forEach(t=>{e=e.concat(t.value.map(this._convert))}),e.length>0&&this._divider&&(e=e.concat(this._divider))),e=e.concat(this._staticItems),this._order===r.StaticFirst){let t=!1;this._contributedItems.forEach(s=>{this._divider&&!t&&s.value.length>0&&(e=e.concat(this._divider),t=!0),e=e.concat(s.value.map(this._convert))})}return e}}}(),function(e){t.PivotItemToTabProvider={},Object.defineProperty(t,"__esModule",{value:!0}),t.PivotItemToTabProvider.getPivotItemToTabProvider=function(e,t,s,o,n){return new i.ObservableArrayWrappingItemProvider(new i.MutatedItemProvider(new r.ContributedPivotBarItemProvider({pageContext:e,tabGroupIds:[t],getContext:s}),e=>{const t=function(e,t,s){const i=e.id||e.itemKey||"";return i&&!e.url&&(t[i]||(t[i]=s.createObservableUrl({view:i})),e.url=t[i],e.itemKey=i),e}(e,o,n);return{id:t.itemKey||t.id,name:t.text,render:t.render,order:t.order,url:t.url,onBeforeTabChange:t.onBeforePivotChange}})).getItems()}}(),function(e){V=t.ComponentsShelvesetAction={},Object.defineProperty(t,"__esModule",{value:!0});t.ComponentsShelvesetAction.ShelvesetPickerActionCreator=class{constructor(e){this._actionHub=e.actionHub||new s}closePicker(e){this._actionHub.pickerDismissed.invoke(e)}};class s{constructor(){this._pickerDismissed=new n.Action}get pickerDismissed(){return this._pickerDismissed}}t.ComponentsShelvesetAction.ShelvesetPickerActionHub=s}(),function(e){N=t.ComponentsShelvesetPickerDialog={},Object.defineProperty(t,"__esModule",{value:!0});t.ComponentsShelvesetPickerDialog.ShelvesetPickerDialog=class extends a.Component{constructor(e){super(e),this._pickedIdentity=new s.ObservableValue(void 0),this._selectedShelvesetName="",this._setCurrentUser=(()=>{if(this.props.pageContext){const e=this.props.pageContext.getService("IVssPageService").getData();e&&e.user&&(this._owner=e.user)}}),this._renderRow=((e,t,s)=>{const i=t.comment?d.format(T.ShelvesetNameFormat,t.name,t.comment):t.name;return a.createElement(v.ListItem,{key:"list-item"+e,index:e,details:s,className:"shelveset-row"},this._getUserImage(t),a.createElement("div",{className:"shelveset-info"},a.createElement("span",{className:"shelveset-title text-ellipsis"},i),a.createElement("span",{className:"shelveset-details"},this._getShelvesetDetails(t))))}),this._getShelvesetDetails=(e=>{let t="";const s=e.createdDate;return t=d.format(T.ShelvesetCommentFormat,e.owner.displayName,s.toLocaleDateString(),g.ago(s))}),this._getUserImage=(e=>a.createElement("span",{"aria-hidden":!0,className:"shelveset-owner"},a.createElement(l.BuildPersona,{size:"medium-plus",cssClass:"build-list-persona",displayName:e.owner.displayName,imageUrl:c.getAvatarUrl(e.owner),unloadableImageUrls:this._unloadableImageUrls}))),this._onSelectionChanged=((e,t)=>{const s=this.state.shelvesets[t.index];s&&(this._selectedShelvesetName=s.name+";"+s.owner.uniqueName,this.setState(this._getState()))}),this._onPeoplePickerChange=(e=>{e&&e.subjectDescriptor&&(this._owner=this._convertPickerIdentityToIdentityRef(e)||this._owner,this._fetchShelvesets()),this._pickedIdentity.value=e}),this._fetchShelvesets=(()=>{this._sourceProvider.fetchShelvesets(this._owner.id).then(e=>{this._shelvesets=e.sort((e,t)=>e.createdDate<t.createdDate?1:t.createdDate<e.createdDate?-1:0),this.setState(this._getState())})}),this._getState=(()=>({shelvesets:this._shelvesets,owner:this._owner,selectedShelvesetName:this._selectedShelvesetName})),this._onClickOk=(()=>{this._actionCreator.closePicker(this.state.selectedShelvesetName)}),this._onDismiss=(()=>{this._actionCreator.closePicker("")}),this._actionCreator=new V.ShelvesetPickerActionCreator({actionHub:this.props.actionHub}),this._listSelection=new v.ListSelection,this._unloadableImageUrls=new Set,this._shelvesets=[],this._setCurrentUser(),this.state=this._getState(),this._pickedIdentity.value=this._convertIdentityRefToPickerIdentity(this._owner);const t=this.props.pageContext?this.props.pageContext.getService("ISourceProviderService"):void 0;this._sourceProvider=t?t.getSourceProvider(h.RepositoryTypes.TfsVersionControl):void 0,this._fetchShelvesets()}render(){if(this.props.pageContext){const e=new p.PeoplePickerProvider(this.props.pageContext,{options:{MinResults:5,MaxResults:20}});return a.createElement(m.Dialog,{className:"shelveset-dialog",titleProps:{text:T.ShelvesetPickerDialogTitle},footerButtonProps:[{text:T.OkButtonText,primary:!0,onClick:this._onClickOk,disabled:!this.state.selectedShelvesetName},{text:T.CancelButtonText,onClick:this._onDismiss}],onDismiss:this._onDismiss,showCloseButton:!0},a.createElement("div",{className:"group-add-peoplepicker"},a.createElement(S.IdentityPickerDropdown,{pickerProvider:e,onChange:this._onPeoplePickerChange,value:this._pickedIdentity}),this.state.shelvesets&&this.state.shelvesets.length>0&&a.createElement(u.Card,null,a.createElement("div",{style:{display:"flex",height:"300px"}},a.createElement(v.ScrollableList,{itemProvider:new b.ArrayItemProvider(this.state.shelvesets),renderRow:this._renderRow,onSelect:this._onSelectionChanged,selection:this._listSelection,width:"100%"})))))}return a.createElement("div",null)}_convertIdentityRefToPickerIdentity(e){if(e)return{subjectDescriptor:e.descriptor,displayName:e.displayName,localId:e.id,signInAddress:e.uniqueName,isHosted:!0,entityType:""}}_convertPickerIdentityToIdentityRef(e){if(e)return{descriptor:e.subjectDescriptor,displayName:e.displayName,id:e.localId,uniqueName:e.signInAddress}}}}(),function(e){O=t.ComponentsTfvcSourceSelector={},Object.defineProperty(t,"__esModule",{value:!0});t.ComponentsTfvcSourceSelector.TfvcSourceSelector=class extends a.Component{constructor(e){super(e),this._showShelvesetPickerDialog=!1,this._findShelveset=(()=>{this._showShelvesetPickerDialog=!0,this.setState(this._getState())}),this._closeShelvesetPickerDialog=(e=>{this._showShelvesetPickerDialog=!1,this.setState(this._getState())}),this._actionHub=e.actionHub?e.actionHub:new V.ShelvesetPickerActionHub,this.state=this._getState()}render(){return a.createElement("div",{className:"tfvc-source-selector"},a.createElement("div",null,a.createElement(_.FormItem,{label:T.SourceVersionTextboxTitle},a.createElement(C.TextField,{value:this.props.sourceVersion,onChange:(e,t)=>{this.props.onVersionSelected&&this.props.onVersionSelected(t)}}))),a.createElement("div",{className:"shelveset-selector-container"},a.createElement("div",{className:"shelveset-name"},a.createElement(_.FormItem,{label:T.ShelvesetTextboxTitle},a.createElement(C.TextField,{value:this.props.shelvesetName,onChange:(e,t)=>{this.props.onShelvesetSelected&&this.props.onShelvesetSelected(t)}}))),a.createElement("div",{className:"shelveset-picker-button"},a.createElement(P.Button,{iconProps:{iconName:"More"},onClick:this._findShelveset})),this.state.showShelvesetPickerDialog&&a.createElement(N.ShelvesetPickerDialog,{pageContext:this.props.pageContext,project:this.props.projectId,actionHub:this._actionHub})))}componentDidMount(){this._actionHub.pickerDismissed.addListener(this._closeShelvesetPickerDialog)}componentWillUnmount(){this._actionHub.pickerDismissed.removeListener(this._closeShelvesetPickerDialog)}_getState(){return{showShelvesetPickerDialog:this._showShelvesetPickerDialog}}}}(),function(e){t.ComponentsBranchDropdown={},Object.defineProperty(t,"__esModule",{value:!0});const s="branchDropdown",i="branchDropdown--combobox";t.ComponentsBranchDropdown.BranchDropdown=class extends y.VssComponent{constructor(e,t){super(e,t),this._getExternalSourceProvider=(()=>a.createElement("div",null,a.createElement(f.ComboBox,{className:i,label:this.props.label,ariaLabel:this.props.ariaLabel,options:this._getComboBoxBranches(),autoComplete:!0,allowFreeform:!0,onChanged:this._onBranchOptionSelected,onMenuOpen:this._onComboBoxOpen,text:this._getFriendlyName(this.props.defaultBranch)}),this.props.description&&a.createElement("span",{className:"branch-dropdown-description font-size secondary-text"},this.props.description),this.props.viewCommits&&a.createElement(_.FormItem,{className:"branchDropdown--textbox",label:T.CommitsLabel},a.createElement(C.TextField,{value:this.props.currentCommit,onChange:(e,t)=>{this._onVersionSelected(t)},disabled:!1})))),this._onVersionSelected=(e=>{let t=e;this.props.onBranchSelected&&e.startsWith("GB")?(t=e.substring("GB".length),this.props.onBranchSelected(t)):this.props.onBranchSelected&&e.startsWith("GT")?this.props.onBranchSelected(t):this.props.onVersionSelected&&e.startsWith("GC")?(t=e.substring("GC".length),this.props.onVersionSelected(t)):this.props.onVersionSelected&&this.props.onVersionSelected(e)}),this._getFriendlyName=(e=>e.startsWith("refs/heads/")?e.substr("refs/heads/".length):e),this._onBranchOptionSelected=((e,t,s)=>{const i=e?e.text:s;i&&this.props.onBranchSelected&&this.props.onBranchSelected(i)}),this._onComboBoxOpen=(()=>{if(!this.props.comboBoxMaxWidth)return;const e=document.querySelector(".ms-Callout.ms-ComboBox-callout");e&&(e.style.minWidth=this.props.comboBoxMaxWidth+"px")}),this.state={branches:[]}}componentDidMount(){super.componentDidMount(),this._repoIsExternal&&0==this.state.branches.length&&this._getBranches(),this._resizeLegacyComboBox()}render(){return a.createElement("div",{className:x.css(this.props.className,s)},this._repoIsTfsGit?this._renderVersionDropdown():this._repoIsTfvc?a.createElement("div",null,a.createElement(O.TfvcSourceSelector,{pageContext:this.props.pageContext,projectId:this.props.projectId,label:this.props.label,onVersionSelected:this.props.onVersionSelected,onShelvesetSelected:this.props.onShelvesetSelected,actionHub:this.props.actionHub,sourceVersion:this.props.sourceVersion,shelvesetName:this.props.shelvesetName})):this._getExternalSourceProvider())}componentDidUpdate(e,t){super.componentDidUpdate(e,t),e.defaultBranch!==this.props.defaultBranch&&this._resizeLegacyComboBox()}get _repoIsTfsGit(){return this.props.repositoryType.toLocaleLowerCase()===h.RepositoryTypes.TfsGit.toLocaleLowerCase()}get _repoIsTfvc(){return this.props.repositoryType.toLocaleLowerCase()===h.RepositoryTypes.TfsVersionControl.toLocaleLowerCase()}get _repoIsExternal(){return!this._repoIsTfsGit&&!this._repoIsTfvc}_renderVersionDropdown(){return a.createElement(a.Fragment,null,this.props.label&&a.createElement("label",{className:x.css("ms-label","branchDropdown--label")},this.props.label),a.createElement(y.WrappedComponent,{wrappedType:"version-dropdown-async",dependencies:["ms.vss-code-web.common-content"],wrappedProps:{repositoryId:this.props.repositoryId,projectId:this.props.projectId,versionDropdownProps:{className:"branchDropdown--dropdown",providerOptions:{repository:{},currentIdentityId:"",viewMyBranches:!0,viewTagsPivot:this.props.viewTags||!1,viewCommitsPivot:this.props.viewCommits||!1,onVersionSelected:this._onVersionSelected,selectedVersionString:this._getVersionFromBranchName(this.props.defaultBranch)},isDrodownFullWidth:!1!==this.props.isDrodownFullWidth}}}),this.props.description&&a.createElement("span",{className:"branch-dropdown-description font-size secondary-text"},this.props.description))}_getVersionFromBranchName(e){return"GB"+e}_getComboBoxBranches(){return this.state.branches.map(e=>{const t=this._getFriendlyName(e);return{key:t,text:t}})}_getBranches(){const e={connectionId:this.props.connectionId,sourceProvider:this.props.repositoryType,repository:this.props.repositoryId},t=this.context.pageContext.getService("IVssContributionService");t.getDataAsync("ms.vss-build-web.git-branch-data-provider",e,!0).then(e=>{if(e)this.setState({branches:e.branches});else if(this.props.onError){const e=t.getDataProviderExceptions()["ms.vss-build-web.git-branch-data-provider"],s=e&&e.message||T.BranchesError;this.props.onError(s)}},e=>{if(this.props.onError){const t=e&&e.message||T.BranchesError;this.props.onError(t)}})}_resizeLegacyComboBox(){if(!this._repoIsExternal||!this.props.comboBoxMinWidth||!this.props.comboBoxMaxWidth)return;const e=document.querySelector(`.${s} .${i}`),t=e&&e.querySelector(".ms-ComboBox-Input");if(t){const s=52,i=this.props.comboBoxMinWidth,o=this.props.comboBoxMaxWidth;t.style.width="0";let r=t.scrollWidth;if(!r){const e=document.createElement("div");e.style.position="absolute",e.style.top="-10000px",e.style.left="-10000px",e.textContent=t.value,document.body.appendChild(e),r=e.offsetWidth||o,document.body.removeChild(e)}t.style.width="",r+=s;const n=Math.max(Math.min(r,o),i);e.style.width=n+"px"}}}}(),function(e){t.ComponentsPipelineSettingsPanel={},Object.defineProperty(t,"__esModule",{value:!0});t.ComponentsPipelineSettingsPanel.PipelineSettingsPanel=class extends y.VssComponent{constructor(e,t){super(e,t),this._isFirstTimeOpened=!0,this._onDismiss=(()=>{this.setState({modifiedSettings:Object.assign({},this.state.originalSettings),selectedConfigFileKey:this.state.originalSettings.yamlFilePath}),this.props.onDismiss()}),this._onSave=(()=>{const e=this.state.originalSettings,t=Object.assign({},this.state.modifiedSettings);t.status===e.status&&delete t.status,t.yamlFilePath===e.yamlFilePath&&delete t.yamlFilePath,this.props.onSave(t)}),this._onStatusChanged=(e=>{this.setState({modifiedSettings:Object.assign({},this.state.modifiedSettings,{status:Number(e)})})}),this._onYamlFileChanged=((e,t,s)=>{const i=e&&e.text||s;let o=e&&e.text?String(e.key):"";if(!o){o="__FreeFormTextKey__";const e=this.state.configFiles;let t=e[0];t.key!==o&&(t=this._toComboBoxOption(o,s),e.unshift(t)),t.text=s,this.setState({configFiles:e})}this.setState({modifiedSettings:Object.assign({},this.state.modifiedSettings,{yamlFilePath:i}),selectedConfigFileKey:o})});const s=this.props.definition.process,i={status:this.props.definition.queueStatus,yamlFilePath:s.yamlFilename};this.state={originalSettings:i,modifiedSettings:Object.assign({},i),configFiles:this._toComboBoxOptions([i.yamlFilePath]),selectedConfigFileKey:i.yamlFilePath}}render(){const e=[{text:T.CancelButtonText,disabled:this.props.isSaving,onClick:this.props.onDismiss},{text:T.SaveButtonLabel,primary:!0,disabled:this.props.isSaving||!this._isDirty(),onClick:this._onSave}];return a.createElement("div",null,this.props.isOpen&&a.createElement(k.Panel,{titleProps:{text:T.PipelineSettingsPanelTitle,size:1},onDismiss:this._onDismiss,footerButtonProps:e},this._renderBody()))}_renderBody(){this._isFirstTimeOpened&&(this._getConfigFiles(),this._isFirstTimeOpened=!1);let e="";return this.props.isYamlDirty&&this.state.modifiedSettings.yamlFilePath!==this.state.originalSettings.yamlFilePath&&(e=T.PipelineSettingsYamlDiscard),a.createElement("div",{className:"ci-designer-settings-panel-body flex-grow"},this.props.errorMessage&&a.createElement(B.MessageCard,{className:"error-message",severity:"Error"},this.props.errorMessage),a.createElement(D.RadioButtonGroup,{text:T.PipelineSettingsSubheaderStatus,selectedButtonId:String(this.state.modifiedSettings.status),onSelect:this._onStatusChanged},a.createElement(D.RadioButton,{id:String(0),text:T.PipelineSettingsStatusEnabled}),a.createElement(D.RadioButton,{id:String(1),text:T.PipelineSettingsStatusPaused}),a.createElement(D.RadioButton,{id:String(2),text:T.PipelineSettingsStatusDisabled})),a.createElement(f.ComboBox,{className:"yaml-file-path-input",allowFreeform:!0,label:T.PipelineSettingsYamlFilePath,options:this.state.configFiles,selectedKey:this.state.selectedConfigFileKey,errorMessage:e,onChanged:this._onYamlFileChanged}))}_getConfigFiles(){const e=this.props.definition,t={connectionId:e.repository.properties&&e.repository.properties.connectedServiceId,id:e.repository.id,name:e.repository.name,sourceProviderType:e.repository.type,defaultBranch:this.props.branch};this.context.pageContext.getService("IRepositoryService").getConfigFiles(t,I.ConfigFileType.Yaml).then(e=>{const t=e.files||[],s=this.state.originalSettings.yamlFilePath;t.indexOf(s)<0&&t.unshift(s),this.setState({configFiles:this._toComboBoxOptions(t)})},e=>{const t=e&&e.message||T.PipelineSettingsYamlFetchError;this.props.onError(t)})}_toComboBoxOptions(e){return e.map(e=>this._toComboBoxOption(e,e))}_toComboBoxOption(e,t){return{key:e,text:t}}_isDirty(){return!w.shallowCompare(this.state.originalSettings,this.state.modifiedSettings)}}}(),function(e){t.StoresQueue={},Object.defineProperty(t,"__esModule",{value:!0});class s extends E.Store{constructor(e){super(),this._queues=[],this._queuesInitializing=!1,this._queuesUpdated=(e=>{this._queues=e,this.emitChanged()}),this._queueSelected=(e=>{const t={id:e.id,name:e.name};this._selectedQueue=t,this.emitChanged()}),this._actionHub=e.actionHub?e.actionHub:new o,this._actionCreator=new i({actionHub:this._actionHub,source:new F.QueueSource({pageContext:e.pageContext,project:e.project})}),this._actionHub.queuesUpdated.addListener(this._queuesUpdated),this._actionHub.queueSelected.addListener(this._queueSelected)}getQueues(){return this._queuesInitializing||(this._queuesInitializing=!0,this._actionCreator.fetchQueues()),this._queues.filter(e=>!e.pool||e.pool&&!e.pool.isLegacy)}getSelectedQueue(){return this._selectedQueue}getActionHub(){return this._actionHub}dispose(){this._actionHub.queuesUpdated.removeListener(this._queuesUpdated),this._actionHub.queueSelected.removeListener(this._queueSelected)}}s.key="build-commands-queue-store",t.StoresQueue.QueueStore=s;class i{constructor(e){this._source=e.source,this._actionHub=e.actionHub}fetchQueues(){this._source.getQueues().then(e=>{this._actionHub.queuesUpdated.invoke(e)})}selectQueue(e){this._actionHub.queueSelected.invoke(e)}}t.StoresQueue.QueueActionCreator=i;class o{constructor(){this._queuesUpdated=new n.Action,this._queueSelected=new n.Action}get queuesUpdated(){return this._queuesUpdated}get queueSelected(){return this._queueSelected}}t.StoresQueue.QueueActionHub=o}()},["Resources","ObservablePivotActionArray","PivotItemToTabProvider","Components/ShelvesetAction","Components/ShelvesetPickerDialog","Components/TfvcSourceSelector","Components/BranchDropdown","Components/PipelineSettingsPanel","Stores/Queue"]),document.dispatchEvent(new CustomEvent("scriptLoaded",{cancelable:!1,detail:{id:"ms.vss-build-web.common-library-legacy"}}));