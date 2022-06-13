"use strict";(self.webpackChunkgeoview_core=self.webpackChunkgeoview_core||[]).push([[286],{475:(e,t,a)=>{var s=a(1292),i=a(4702),r=a(19),n=a(9510),o=a(2746),p=a(7576),l=a(3110),c=a(8217),m=a(4201),u=a(6281),d=a(3457),f=a(3688),b=a.n(f),h=a(5202),y=window;function v(e){var t=e.mapId,a=e.config,s=y.cgpv,i=s.api,r=s.react,n=s.ui,o=r.useState,p=r.useEffect,l=(r.useCallback,n.makeStyles((function(){return{listContainer:{overflowY:"scroll",height:"600px"},card:{boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2)",transition:"0.3s",borderRadius:"5px","&:hover":{boxShadow:"0 8px 16px 0 rgba(0, 0, 0, 0.2)"},marginBottom:10,height:"250px",width:"100%",display:"block",position:"relative"},thumbnail:{borderRadius:"5px",position:"absolute",height:"100%",width:"100%",opacity:.8},container:{background:"rgba(0,0,0,.68)",color:"#fff",overflow:"hidden",textOverflow:"ellipsis",height:"40px",display:"flex",alignItems:"center",padding:"0 5px",boxSizing:"border-box",position:"absolute",left:0,bottom:0,width:"inherit"}}}))),c=o([]),f=(0,d.Z)(c,2),v=f[0],g=f[1],x=l(),B=function(e){i.map(t).basemap.setBasemap(e)},w=function(){var e=(0,u.Z)(b().mark((function e(){var s,r,n,o;return b().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:i.map(t).basemap.basemaps=[],i.map(t).basemap.basemaps,s=b().mark((function e(s){var r,n;return b().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=a.coreBasemaps[s],e.next=3,i.map(t).basemap.createCoreBasemap(r);case 3:(n=e.sent)&&g((function(e){return[].concat((0,m.Z)(e),[n])}));case 5:case"end":return e.stop()}}),e)})),r=0;case 4:if(!(r<a.coreBasemaps.length)){e.next=9;break}return e.delegateYield(s(r),"t0",6);case 6:r++,e.next=4;break;case 9:for(n=function(e){var s=a.customBasemaps[e],r=i.map(t).basemap.createCustomBasemap(s);r&&g((function(e){return[].concat((0,m.Z)(e),[r])}))},o=0;o<a.customBasemaps.length;o++)n(o);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return p((function(){w()}),[]),(0,h.jsx)("div",{className:x.listContainer,children:v.map((function(e){return(0,h.jsxs)("div",{role:"button",tabIndex:0,className:x.card,onClick:function(){return B(e.id)},onKeyPress:function(){return B(e.id)},children:["string"==typeof e.thumbnailUrl&&(0,h.jsx)("img",{src:e.thumbnailUrl,alt:e.altText,className:x.thumbnail}),Array.isArray(e.thumbnailUrl)&&e.thumbnailUrl.map((function(t,a){return(0,h.jsx)("img",{src:t,alt:e.altText,className:x.thumbnail},a)})),(0,h.jsx)("div",{className:x.container,children:e.name})]},e.id)}))})}const g=JSON.parse('{"$schema":"http://json-schema.org/draft-07/schema#","title":"GeoView Basemap  Panel Schema","type":"object","version":1,"comments":"Configuration for GeoView basemap switcher panel package.","additionalProperties":false,"definitions":{"basemapNameNode":{"type":"object","properties":{"en":{"type":"string"},"fr":{"type":"string"}},"description":"The display name of the layer."},"basemapDescriptionNode":{"type":"object","properties":{"en":{"type":"string"},"fr":{"type":"string"}},"description":"Basemap description."},"thumbnailUrlNode":{"type":"object","properties":{"en":{"type":"array","uniqueItems":true,"items":{"type":"string"}},"fr":{"type":"array","uniqueItems":true,"items":{"type":"string"}}},"description":"Basemap thumbnail urls."},"basemapLayerUrlNode":{"type":"object","properties":{"en":{"type":"string"},"fr":{"type":"string"}},"description":"The service endpoint of the basemap layer."},"basemapAttributionNode":{"type":"object","properties":{"en":{"type":"string"},"fr":{"type":"string"}},"description":"Basemap attribution text."},"basemapLayersNode":{"type":"object","properties":{"id":{"type":"string","description":"the id of the layer"},"url":{"$ref":"#/definitions/basemapLayerUrlNode"},"opacity":{"type":"number","description":"the opacity of this layer","default":0},"options":{"type":"object","description":"basemap layer options","properties":{"tms":{"type":"boolean","default":false},"tileSize":{"type":"integer","default":1},"noWrap":{"type":"boolean","default":false},"attribution":{"type":"boolean","default":false}},"additionalItems":false}},"additionalItems":false,"required":["id","url"]},"basemap":{"type":"object","properties":{"id":{"type":"string","description":"the basemap id","enum":["transport","simple","osm","nogeom"]},"shaded":{"type":"boolean","description":"if a shaded layer should be included with this basemap","default":false},"labeled":{"type":"boolean","description":"if labels should be enabled in this basemap","default":false}},"additionalProperties":false,"required":["id","shaded","labeled"]},"customBasemap":{"type":"object","properties":{"id":{"type":"string","description":"the basemap id"},"name":{"$ref":"#/definitions/basemapNameNode"},"description":{"$ref":"#/definitions/basemapDescriptionNode"},"thumbnailUrl":{"$ref":"#/definitions/thumbnailUrlNode"},"layers":{"type":"array","description":"a list of basemap layers","items":{"$ref":"#/definitions/basemapLayersNode"},"minItems":1},"attribution":{"$ref":"#/definitions/basemapAttributionNode"},"zoomLevels":{"type":"object","description":"Zoom levels for the basemap","properties":{"min":{"type":"integer","minimum":0,"maximum":24,"default":0},"max":{"type":"integer","minimum":0,"maximum":24,"default":24}},"additionalProperties":false,"required":["min","max"]}},"additionalProperties":false,"required":["id","name","description","layers"]}},"properties":{"customBasemaps":{"type":"array","description":"A list of custom basemaps","items":{"$ref":"#/definitions/customBasemap"},"minItems":0},"coreBasemaps":{"type":"array","description":"A list of basemaps available in the core to show in the panel","items":{"$ref":"#/definitions/basemap"},"minItems":1},"isOpen":{"type":"boolean","description":"Specifies whether the basemap switcher panel is initially open or closed","default":false},"canSwichProjection":{"type":"boolean","description":"Allow the user to switch projection from the basemap switcher panel","default":false},"languages":{"type":"array","uniqueItems":true,"items":{"type":"string","enum":["en-CA","fr-CA"]},"default":["en-CA","fr-CA"],"description":"ISO 639-1 code indicating the languages supported by the configuration file.","minItems":1},"version":{"type":"string","enum":["1.0"],"description":"The schema version used to validate the configuration file. The schema should enumerate the list of versions accepted by this version of the viewer."}},"required":["coreBasemaps","customBasemaps","languages"]}'),x=JSON.parse('{"isOpen":false,"canSwichProjection":true,"coreBasemaps":[{"id":"transport","shaded":true,"labeled":true},{"id":"transport","shaded":true,"labeled":false},{"id":"simple","shaded":true,"labeled":false},{"id":"nogeom","shaded":false,"labeled":true}],"customBasemaps":[{"id":"simpletestlabel","name":{"en":"Custom simple with labels","fr":"Perso simple avec étiquettes"},"description":{"en":"This is a custom province basemap in LCC projection.","fr":"Ceci est une carte de base personnalisée en projection ccl."},"thumbnailUrl":{"en":["https://maps-cartes.services.geo.ca/server2_serveur2/rest/services/BaseMaps/Simple/MapServer/WMTS/tile/1.0.0/Simple/default/default028mm/8/285/268.jpg"],"fr":["https://maps-cartes.services.geo.ca/server2_serveur2/rest/services/BaseMaps/Simple/MapServer/WMTS/tile/1.0.0/Simple/default/default028mm/8/285/268.jpg"]},"layers":[{"id":"simple2","url":{"en":"https://maps-cartes.services.geo.ca/server2_serveur2/rest/services/BaseMaps/Simple/MapServer/WMTS/tile/1.0.0/Simple/default/default028mm/{z}/{y}/{x}.jpg","fr":"https://maps-cartes.services.geo.ca/server2_serveur2/rest/services/BaseMaps/Simple/MapServer/WMTS/tile/1.0.0/Simple/default/default028mm/{z}/{y}/{x}.jpg"},"opacity":0.5,"options":{"tms":false,"tileSize":1,"noWrap":false,"attribution":false}},{"id":"label2","url":{"en":"https://maps-cartes.services.geo.ca/server2_serveur2/rest/services/BaseMaps/CBMT_TXT_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT_TXT_3978/default/default028mm/{z}/{y}/{x}.jpg","fr":"https://maps-cartes.services.geo.ca/server2_serveur2/rest/services/BaseMaps/CBCT_TXT_3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBCT_TXT_3978/default/default028mm/{z}/{y}/{x}.jpg"},"opacity":1,"options":{"tms":false,"tileSize":1,"noWrap":false,"attribution":false}}],"attribution":{"en":"test attribution","fr":"test attribution"},"zoomLevels":{"min":0,"max":17}}],"languages":["en-CA","fr-CA"]}');function B(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,s=(0,p.Z)(e);if(t){var i=(0,p.Z)(this).constructor;a=Reflect.construct(s,arguments,i)}else a=s.apply(this,arguments);return(0,o.Z)(this,a)}}var w=window,S=function(e){(0,n.Z)(a,e);var t=B(a);function a(e,i){var n;return(0,s.Z)(this,a),n=t.call(this,e,i),(0,l.Z)((0,r.Z)(n),"schema",(function(){return g})),(0,l.Z)((0,r.Z)(n),"defaultConfig",(function(){return(0,c.ZQ)(x)})),(0,l.Z)((0,r.Z)(n),"translations",(0,c.ZQ)({"en-CA":{basemapPanel:"Basemaps"},"fr-CA":{basemapPanel:"Fond de carte"}})),(0,l.Z)((0,r.Z)(n),"added",(function(){var e=(0,r.Z)(n),t=e.configObj,a=e.pluginProps.mapId,s=w.cgpv;if(s){var i,o,p=s.api,l=p.map(a).language,c={tooltip:n.translations[l].basemapPanel,tooltipPlacement:"right",icon:'<i class="material-icons">map</i>',type:"textWithIcon"},m={title:n.translations[l].basemapPanel,icon:'<i class="material-icons">map</i>',width:200,status:null==t?void 0:t.isOpen};n.buttonPanel=p.map(a).appBarButtons.createAppbarPanel(c,m,null),null===(i=n.buttonPanel)||void 0===i||null===(o=i.panel)||void 0===o||o.changeContent((0,h.jsx)(v,{mapId:a,config:t||{}}))}})),n.buttonPanel=null,n}return(0,i.Z)(a,[{key:"removed",value:function(){var e=this.pluginProps.mapId,t=w.cgpv;if(t){var a=t.api;this.buttonPanel&&(a.map(e).appBarButtons.removeAppbarPanel(this.buttonPanel.id),a.map(e).basemap.basemaps=[],a.map(e).basemap.loadDefaultBasemaps(a.map(e).basemap.basemapOptions))}}}]),a}(c.EV);w.plugins=w.plugins||{},w.plugins["basemap-panel"]=(0,c.RF)(S)}},e=>{var t;t=475,e(e.s=t)}]);
//# sourceMappingURL=geoview-basemap-panel.js.map