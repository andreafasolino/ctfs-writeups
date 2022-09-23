"use strict";define("Favorites/Common",["require","exports","VSS/Platform/Context","VSS/Platform/RestClientBase","VSS/Core/Observable"],function(e,t,r,i,o){var s,a;t.Resources={},Object.defineProperty(t,"__esModule",{value:!0}),t.Resources.FavoriteItemPickerBrowseAllText="Browse all items",t.Resources.FavoriteItemPickerLoadingMessage="Loading favorites...",t.Resources.FavoriteStarFavoritedTitle="Remove from favorites",t.Resources.FavoriteStarUnfavoritedTitle="Add to favorites",t.Resources.FavoriteItemPickerAriaDescription="Use right arrow to toggle favorite status.",t.Resources.FavoriteServiceCouldNotBeQueried="Favorites could not load favorites from service at {0} \n {1}",t.Constants={},Object.defineProperty(t,"__esModule",{value:!0}),(a=t.Constants.FavoriteStorageScopes||(t.Constants.FavoriteStorageScopes={})).Collection="Collection",a.Project="Project",a.Organization="Organization",(s=t.Constants.OwnerScopeTypes||(t.Constants.OwnerScopeTypes={})).Team="Team",s.User="User",t.ContractsService={},Object.defineProperty(t,"__esModule",{value:!0}),function(e){t[e]={},Object.defineProperty(t,"__esModule",{value:!0});t[e].FavoriteClientName="IFavoriteRestClient",t[e].getFavoriteClient=function(r,i){return r.getRestClient(t[e].FavoriteClientName,i)},r.RestClients.add(t[e].FavoriteClientName,{factory:class extends i.RestClientBase{constructor(e){super(e)}async getFavoriteProviders(e){const t={faultInMissingHost:e};return this.beginRequest({apiVersion:"4.1-preview.1",routeTemplate:"_apis/Favorite/FavoriteProviders",queryParams:t})}async createFavorite(e){return this.beginRequest({apiVersion:"4.1-preview.1",method:"POST",routeTemplate:"_apis/Favorite/Favorites/{favoriteId}",body:e})}async createFavoriteOfOwner(e,t,r){const i={ownerScopeType:t,ownerScopeId:r};return this.beginRequest({apiVersion:"4.1-preview.1",method:"POST",routeTemplate:"_apis/Favorite/Favorites/{favoriteId}",queryParams:i,body:e})}async deleteFavoriteById(e,t,r,i){const o={artifactType:t,artifactScopeType:r,artifactScopeId:i};return this.beginRequest({apiVersion:"4.1-preview.1",method:"DELETE",routeTemplate:"_apis/Favorite/Favorites/{favoriteId}",routeValues:{favoriteId:e},queryParams:o})}async deleteFavoriteOfOwnerById(e,t,r,i,o,s){const a={ownerScopeType:t,ownerScopeId:r,artifactType:i,artifactScopeType:o,artifactScopeId:s};return this.beginRequest({apiVersion:"4.1-preview.1",method:"DELETE",routeTemplate:"_apis/Favorite/Favorites/{favoriteId}",routeValues:{favoriteId:e},queryParams:a})}async getFavoriteByArtifact(e,t,r,i,o){const s={artifactType:e,artifactId:t,artifactScopeType:r,artifactScopeId:i,includeExtendedDetails:o};return this.beginRequest({apiVersion:"4.1-preview.1",routeTemplate:"_apis/Favorite/Favorites/{favoriteId}",queryParams:s})}async getFavoriteById(e,t,r,i,o){const s={artifactScopeType:t,artifactType:r,artifactScopeId:i,includeExtendedDetails:o};return this.beginRequest({apiVersion:"4.1-preview.1",routeTemplate:"_apis/Favorite/Favorites/{favoriteId}",routeValues:{favoriteId:e},queryParams:s})}async getFavoriteOfOwnerById(e,t,r,i,o,s,a){const n={ownerScopeType:t,ownerScopeId:r,artifactScopeType:i,artifactType:o,artifactScopeId:s,includeExtendedDetails:a};return this.beginRequest({apiVersion:"4.1-preview.1",routeTemplate:"_apis/Favorite/Favorites/{favoriteId}",routeValues:{favoriteId:e},queryParams:n})}async getFavorites(e,t,r,i){const o={artifactType:e,artifactScopeType:t,artifactScopeId:r,includeExtendedDetails:i};return this.beginRequest({apiVersion:"4.1-preview.1",routeTemplate:"_apis/Favorite/Favorites/{favoriteId}",queryParams:o})}async getFavoritesOfOwner(e,t,r,i,o,s){const a={ownerScopeType:e,ownerScopeId:t,artifactType:r,artifactScopeType:i,artifactScopeId:o,includeExtendedDetails:s};return this.beginRequest({apiVersion:"4.1-preview.1",routeTemplate:"_apis/Favorite/Favorites/{favoriteId}",queryParams:a})}}})}("RestClientFavorite"),function(e){t.FavoritesService={},Object.defineProperty(t,"__esModule",{value:!0});class i extends o.ObservableArray{constructor(e,t,r,i,o){super(t),this.pageContext=e,this.artifactType=r,this.artifactScopeType=i,this.artifactScopeId=o,this.onFavoriteAdded=(e=>{this.isAssociatedFavorite(e)&&this.push(e)}),this.onFavoriteRemoved=(e=>{this.isAssociatedFavorite(e)&&this.removeAll(t=>t.id===e.id)});const s=this.pageContext.getService("IFavoritesService");s.subscribe(this.onFavoriteAdded,"favoriteAdded"),s.subscribe(this.onFavoriteRemoved,"favoriteRemoved")}isAssociatedFavorite(e){return!(this.artifactType&&e.artifactType!==this.artifactType||this.artifactScopeId&&(e.artifactScope.type!==this.artifactScopeType||e.artifactScope.id!==this.artifactScopeId))}dispose(){const e=this.pageContext.getService("IFavoritesService");e.unsubscribe(this.onFavoriteAdded,"favoriteAdded"),e.unsubscribe(this.onFavoriteRemoved,"favoriteRemoved")}}r.Services.add("IFavoritesService",{serviceFactory:class extends r.VssObservableService{constructor(){super(...arguments),this.favoriteCollections={}}canUseFavorites(){return this.pageContext.getService("IVssSecurityService"),this.pageContext.getService("IVssSecurityService").hasPermission("fa557b48-b5bf-458a-bb2b-1b680426fe8b","/Favorites",3)}canFetchExtendedDetails(){return!0}getFavorites(e,t,r,o){if(!this.canUseFavorites()){let o=new i(this.pageContext,[],e,t,r);return Promise.resolve(o)}const s=`${e}:${t}:${r}:${o}`,a=this.favoriteCollections[s];if(a)return a;const n=this.getProvider(e).then(s=>this.pageContext.getRestClient("IFavoriteRestClient",{serviceInstanceType:s.serviceIdentifier}).getFavorites(e,t,r,o).then(o=>new i(this.pageContext,o,e,t,r)));return this.favoriteCollections[s]=n,n}getTeamFavorites(e,t,r,o,s){if(!this.canUseFavorites()){let e=new i(this.pageContext,[],t,r,o);return Promise.resolve(e)}const a=`${t}:${r}:${o}:${s}:${e}`,n=this.favoriteCollections[a];if(n)return n;const v=this.getProvider(t).then(a=>this.pageContext.getRestClient("IFavoriteRestClient",{serviceInstanceType:a.serviceIdentifier,rootPath:a.serviceUri}).getFavoritesOfOwner("Team",e,t,r,o,s).then(e=>new i(this.pageContext,e,t,r,o)));return this.favoriteCollections[a]=v,v}getFavoritesForScope(e,t,r){if(!this.canUseFavorites()){let r=new i(this.pageContext,[],void 0,e,t);return Promise.resolve(r)}const o=`${e}:${t}:${r}`,s=this.favoriteCollections[o];if(s)return s;const a=this.getProviders().then(o=>{let s={};for(const i in o){const a=o[i];if(!s[a.serviceUri]){const i=this.pageContext.getRestClient("IFavoriteRestClient",{serviceInstanceType:a.serviceIdentifier}).getFavorites(void 0,e,t,r);s[a.serviceUri]=i}}let a=[];return Object.keys(s).map(e=>s[e]).forEach(e=>{a.push(e.then(e=>e,e=>(this.pageContext.getService("IVssTelemetryService").publishEvent("Favorites","FavoritesService",e),[])))}),Promise.all(a).then(r=>new i(this.pageContext,[].concat(...r),void 0,e,t))});return this.favoriteCollections[o]=a,a}addFavorite(e){return this.canUseFavorites()?this.getProvider(e.artifactType).then(t=>this.pageContext.getRestClient("IFavoriteRestClient",{serviceInstanceType:t.serviceIdentifier}).createFavorite(e).then(e=>(this._notify(e,"favoriteAdded"),e),e=>{throw this._notify(e,"favoriteError"),e}),e=>{throw this._notify(e,"favoriteError"),e}):(this.logNoEditPermissionError(),Promise.resolve(e))}addTeamFavorite(e,t){return this.canUseFavorites()?this.getProvider(t.artifactType).then(r=>this.pageContext.getRestClient("IFavoriteRestClient",{serviceInstanceType:r.serviceIdentifier}).createFavoriteOfOwner(t,"Team",e).then(e=>(this._notify(e,"favoriteAdded"),e),e=>{throw this._notify(e,"favoriteError"),e}),e=>{throw this._notify(e,"favoriteError"),e}):(this.logNoEditPermissionError(),Promise.resolve(t))}removeFavorite(e){return this.canUseFavorites()?this.getProvider(e.artifactType).then(t=>this.pageContext.getRestClient("IFavoriteRestClient",{serviceInstanceType:t.serviceIdentifier}).deleteFavoriteById(e.id,e.artifactType,e.artifactScope.type,e.artifactScope.id).then(()=>{this._notify(e,"favoriteRemoved")},e=>{throw this._notify(e,"favoriteError"),e}),e=>{throw this._notify(e,"favoriteError"),e}):(this.logNoEditPermissionError(),Promise.resolve())}removeTeamFavorite(e,t){return this.canUseFavorites()?this.getProvider(t.artifactType).then(r=>this.pageContext.getRestClient("IFavoriteRestClient",{serviceInstanceType:r.serviceIdentifier}).deleteFavoriteOfOwnerById(t.id,"Team",e,t.artifactType,t.artifactScope.type,t.artifactScope.id).then(()=>{this._notify(t,"favoriteRemoved")},e=>{throw this._notify(e,"favoriteError"),e}),e=>{throw this._notify(e,"favoriteError"),e}):(this.logNoEditPermissionError(),Promise.resolve())}getProvider(e){if(!this.canUseFavorites())return this.logNoEditPermissionError(),Promise.resolve(null);const t=this.pageContext.getService("IVssContributionService").getSharedData("_favoriteProviders");if(t){const r=t[e];if(r)return Promise.resolve(r)}return this.getProviders().then(t=>t[e])}getProviders(){if(!this.canUseFavorites())return this.logNoEditPermissionError(),Promise.resolve({});if(!this.providersPromise){const e=this.pageContext.getRestClient("IFavoriteRestClient");this.providersPromise=e.getFavoriteProviders().then(e=>e.reduce((e,t)=>(e[t.artifactType]=t,e),{}))}return this.providersPromise}logNoEditPermissionError(){console.error("Favorites client UI should not expose or allow write operations with Favorites, when the active user does not have neccessary permission.")}}})}(),function(e){t.Telemetry={},Object.defineProperty(t,"__esModule",{value:!0});r.Services.add("IFavoritesTelemetryService",{serviceFactory:class extends r.VssService{publishNavigateEvent(e,t){this.publishEvent("onclick",{favoriteType:e,source:t})}publishEvent(e,t){this.pageContext.getService("IVssTelemetryService").publishEvent("Favorites",e,t)}}}),t.Telemetry.publishNavigateEvent=function(e,t,r){return e.getService("IFavoritesTelemetryService").publishNavigateEvent(t,r)}}()},["Resources","Constants","Contracts/Service","RestClient/Favorite","FavoritesService","Telemetry"]),document.dispatchEvent(new CustomEvent("scriptLoaded",{cancelable:!1,detail:{id:"ms.vss-favorites.favorites-common"}}));