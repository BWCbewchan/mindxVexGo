import {IQ_POWER_PACK_NAME,IQ_POWER_PACK_BRAIN,IQ_POWER_PACK_BATTERY,iqBatteryPose} from './iq-power-pack.js';
import {requestProjectCheckpoint} from './lifecycle-checkpoint.js';
import {installChainPicker} from './chain-picker.js';
import {buildSprocketChain,sprocketTeeth} from './chain-route.js';
import {createKitCatalogLoader} from './kit-catalog-loader.js';
import {partSource,partModelUrl} from './part-source.js';
import {totalKitCount,legoPartKit} from './kit-policy.js';
import {installPartsLibrary} from './parts-library.js';
import {croppedPartThumbnail} from './part-thumbnail.js';
import {assemblyMatingContext,movingAssemblyIds} from './assembly-mating.js';
import {installChainBuilder,buildChain,isChainLink} from './chain-builder.js';
import {installConnectionSuggestions} from './connection-suggestions.js';
import {installAutomaticGuideRepair} from './automatic-guide-repair.js';
import {installGuideWorkbench} from './guide-workbench.js?v=assembly-perf-102';
import {SNAP_PRESETS,snapPreset,snapPosition} from './snap-settings.js';
import {guideCamera} from './guide-camera.js';
import {installGuidePreviews} from './guide-previews.js';
import {parseLDraw,exportLDraw,ldrawColors} from './ldraw-model.js';
import {packageGuide,downloadFile} from './guide-package.js';
import {markOriginalGOCables} from './cad-cables.js';
import {DataRenderer,installDataView} from './data-renderer.js';
import {installDocumentAPI} from './document-api.js';
import {printDataGuide} from './data-guide.js';
import {applyLEGOAppearance} from './lego/appearance.js';
import {partPreviewSrc} from './part-preview.js?v=library-color-75';
import {applyIQAppearance,iqAppearance} from './iq/color-profile.js?v=library-color-75';
import {PLATFORM,PROJECT_ID} from './platform.js';
import {projectKey,saveProject,loadProject} from './project-store.js';
import {installAssemblyAPI} from './ai-api.js?v=guide-tools-83';
import {assertKitChange,kitReport,validateKitProfile} from './kit-policy.js';
import {installKitSettings} from './kit-settings.js?v=assembly-perf-102';
import {installSimulationLauncher} from '../simulation/assembly-launcher.js';
import {installAssemblyAssistant} from './assembly-assistant.js?v=assembly-perf-102';
import {seatedConnections,groupAncestors,groupMembers,layerLocked,layerVisible,validGroupTree,groupSelection as groupParts} from './assembly-review.js';
import {copySelection,ungroupSelection as ungroupParts} from './selection-operations.js';
import {createGuideEditor,stepKey} from './guide-editing.js?v=assembly-perf-102';
const editGuide=createGuideEditor();
import {installDrivePreview} from './drive-preview.js';
import {renderLayers} from './layers-tree-panel.js?v=assembly-perf-102';
let layerAnchor=null;
import {visibleBounds,VisibleBoxHelper,invalidateVisibleBounds} from './visible-bounds.js?v=assembly-perf-102';
import {installWiring} from './wiring.js?v=toggle-59';
import {installWiring3D} from './wiring-3d.js?v=assembly-perf-102';
import {installInspectorChrome} from './inspector-chrome.js?v=assembly-perf-102';
import {installEditorChrome} from './editor-chrome.js?v=group-toolbar-78';
import {installCameraNavigation} from './camera-navigation.js?v=free-nav-17';
import {optimizeStaticModel} from './render-model.js';
import {createRenderScheduler} from './render-scheduler.js';
import {loadPool} from './load-pool.js';
let renderLoop=null;
import {generateStudentGuide} from './guide-sequence.js?v=guide-drive-100';
import {installPDFPreview} from './guide-pdf-preview.js?v=assembly-perf-102';
import {prepPaper,stepPaper,stepPairPaper,pairableStep,finishedPaper,readyPaperImages} from './guide-paper.js?v=assembly-perf-102';
import {guidePage} from './guide-page-settings.js';
import {createGuideRenderer} from './guide-renderer.js?v=assembly-perf-102';
import {repairAssemblyLinks} from './repair-links.js?v=repair-depth-38';
import {collisionClient} from './collision-client.js?v=asset-startup-102';
const fitChecker=collisionClient(()=>jointReferences);
import {stagingPosition} from './staging-position.js';
import {withElectronics as withRequiredElectronics,missingElectronics} from './electronics.js';
import {installDirectTools} from './direct-tools.js?v=assembly-perf-102';
import {installQuickAttach} from './quick-attach.js?v=kit-79';
import {linkedPoses,normalizeMatedJoints} from './mating.js?v=fit-tolerance-36';
import {constrainJoints} from './joint-constraints.js?v=compatibility-27';
import {platformConnectorsUrl} from './platform-registry.js?v=assembly-perf-102';
import {readAssemblyCatalog} from './project-catalog.js?v=assembly-perf-102';
const [jointReferences,initialCatalog]=await Promise.all([
 fetch(platformConnectorsUrl(PLATFORM.id)).then(response=>{if(!response.ok)throw Error('Không tải được dữ liệu khớp CAD.');return response.json();}).then(data=>data.parts),
 readAssemblyCatalog(PLATFORM.id),
]);
import {installConnectTool} from './connect-tool.js?v=compatibility-27';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {TransformControls} from 'three/addons/controls/TransformControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
const $=id=>document.getElementById(id),copy=v=>structuredClone(v),key=PROJECT_ID?projectKey(PLATFORM.id,PROJECT_ID):['api-cart','competition','original-platform'].includes(new URLSearchParams(location.search).get('demo'))?'mindx-vexgo-demo-'+new URLSearchParams(location.search).get('demo'):PLATFORM.id==='lego'?'mindx-lego-assembly-v1':PLATFORM.id==='vexiq'?'mindx-vexiq-assembly-v1':'mindx-vexgo-assembly-v1';
let shownParts=null,repairReportParts=null,dataView=null;
let assemblyAssistant=null;
function guideContacts(){return assemblyAssistant?.data().connections||seatedConnections(project.parts,jointReferences);}
let automaticGuideRepair=null;
let exportingGuide=false,guidePreviews=null,guideWorkbench=null,pdfPreview=null,liveGuideRenderer=null,previewRenderer=null,previewStepIndex=-1;
const printMedia=matchMedia('print');
let connectTool=null,quickAttach=null,directTools=null,connectionSuggestions=null,chainBuilder=null,chainPicker=null,chainPickButton=null,selectedIds=new Set();
let selectedGroupId=null,kitSettings=null;
let kitCatalogLoader=null;
let catalog=[],project={version:1,platform:PLATFORM.id,title:'My '+PLATFORM.name+' build',parts:[],groups:[],steps:[]},studentGuide={ready:false,steps:[],blockers:[],notes:[]},selected=null,preview=false,busy=false,history=[],future=[],objects=new Map(),cache=new Map(),dragStart=null,highlights=[],guideReturnPose=null;
const scene=new THREE.Scene();scene.background=new THREE.Color('#ffffff');
const connectedWires=installWiring3D(scene,()=>objects,message=>status(message));
const camera=new THREE.PerspectiveCamera(40,1,.001,100);camera.position.set(.45,.32,.45);
let renderer;
try{if(new URLSearchParams(location.search).get('view')==='data'||!globalThis.WebGLRenderingContext&&!globalThis.WebGL2RenderingContext)throw Error('Data view');renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});}catch{renderer=new DataRenderer();document.body.dataset.viewMode='data';}
let renderDPR=Math.min(devicePixelRatio,1.5);renderer.setPixelRatio(renderDPR);renderer.outputColorSpace=THREE.SRGBColorSpace;$('viewport').append(renderer.domElement);if(renderer.isDataRenderer)dataView=installDataView($('viewport'),{project:()=>project,guide:()=>studentGuide,selected:()=>selected,select:id=>select(id)});
const orbit=new OrbitControls(camera,renderer.domElement);orbit.enableDamping=true;orbit.target.set(0,.04,0);
// Even CAD inspection lighting: no cast shadows or dark metallic reflections.
renderer.shadowMap.enabled=false;
scene.add(new THREE.HemisphereLight(0xffffff,0xffffff,2));
for(const position of [[3,2,3],[-3,2,3],[-3,2,-3],[3,2,-3]]){const light=new THREE.DirectionalLight(0xffffff,1.2);light.position.set(...position);light.castShadow=false;scene.add(light);}
const grid=new THREE.GridHelper(1,100,0xa4bcb1,0xd8e2dc);scene.add(grid);
const controls=new TransformControls(camera,renderer.domElement);scene.add(controls.getHelper());controls.setTranslationSnap(.001);controls.setRotationSnap(THREE.MathUtils.degToRad(15));
const nativePointerHover=controls.pointerHover.bind(controls);controls.pointerHover=pointer=>{nativePointerHover(pointer);if(controls.axis===null&&pointer&&controls.object&&!controls.dragging)controls.axis=visibleTransformAxisAt(pointer);};
const box=new VisibleBoxHelper(new THREE.Object3D(),0x1686ed);box.visible=false;scene.add(box);
const loader=new GLTFLoader(),ray=new THREE.Raycaster(),mouse=new THREE.Vector2();
function status(message){$('status').textContent=message;}
function visibleTransformAxisAt(pointer){if(controls.getMode()!=='translate')return null;const rect=renderer.domElement.getBoundingClientRect();if(!rect.width||!rect.height)return null;camera.updateMatrixWorld(true);const px=rect.left+(pointer.x+1)*rect.width/2,py=rect.top+(1-pointer.y)*rect.height/2,root=controls.getHelper();root.updateMatrixWorld(true);let nearest=null;root.traverse(object=>{if(!object.isMesh||!['X','Y','Z'].includes(object.name)||object.tag==='helper')return;for(let parent=object;parent&&parent!==root;parent=parent.parent)if(!parent.visible)return;const materials=Array.isArray(object.material)?object.material:[object.material];if(!materials.some(material=>material?.opacity===undefined||material.opacity>.8))return;const bounds=new THREE.Box3().setFromObject(object);if(bounds.isEmpty())return;let left=Infinity,top=Infinity,right=-Infinity,bottom=-Infinity;for(const x of [bounds.min.x,bounds.max.x])for(const y of [bounds.min.y,bounds.max.y])for(const z of [bounds.min.z,bounds.max.z]){const point=new THREE.Vector3(x,y,z).project(camera);if(point.z<-1||point.z>1)continue;const sx=rect.left+(point.x+1)*rect.width/2,sy=rect.top+(1-point.y)*rect.height/2;left=Math.min(left,sx);right=Math.max(right,sx);top=Math.min(top,sy);bottom=Math.max(bottom,sy);}const dx=Math.max(left-px,0,px-right),dy=Math.max(top-py,0,py-bottom);if(dx>9||dy>9)return;const distance=Math.hypot(dx,dy);if(!nearest||distance<nearest.distance)nearest={axis:object.name,distance};});return nearest?.axis||null;}
let collisionTimer=null,collisionReport={issues:[],truncated:false};
const issuePanel=document.createElement('section');issuePanel.className='collision-panel';issuePanel.setAttribute('aria-label','Fit review');$('precision-fields').after(issuePanel,$('warnings'));
const protection=document.createElement('label'),protectInput=document.createElement('input');protectInput.type='checkbox';protectInput.checked=true;protectInput.id='collision-protection';protection.append(protectInput,document.createTextNode(' Prevent new body penetration'));document.querySelector('nav').append(protection);
function inspectFit(parts=preview?(shownParts||project.parts):project.parts){return fitChecker.check(parts,objects);}
let indexedCatalog=null,catalogSize=-1,catalogById=new Map(),instanceNames=new Map(),instanceNamesKey='',instanceNamesCatalog=null;
function catalogIndex(){
 if(indexedCatalog!==catalog||catalogSize!==catalog.length){indexedCatalog=catalog;catalogSize=catalog.length;catalogById=new Map(catalog.map(part=>[part.id,part]));}
 return catalogById;
}
function partName(part){return part?.label&&part.label!==part.sku&&!/^\d{3}-\d{4}-/.test(part.label)?part.label:catalogIndex().get(part?.sku)?.name||part?.sku||'Part';}
function refreshInstanceNames(){
 const key=JSON.stringify([catalog.length,project.parts.map(p=>[p.id,p.sku,p.label])]);
 if(key===instanceNamesKey&&instanceNamesCatalog===catalog)return;
 instanceNamesKey=key;instanceNamesCatalog=catalog;instanceNames=new Map();
 const groups=new Map();
 for(const part of project.parts){const name=partName(part);if(!groups.has(name))groups.set(name,[]);groups.get(name).push(part.id);}
 for(const [name,ids] of groups)ids.forEach((id,i)=>instanceNames.set(id,ids.length>1?`${name} · ${i+1}`:name));
}
function instanceName(part){return instanceNames.get(part?.id)||partName(part);}
function groupFor(part){return project.groups.find(group=>group.id===part?.groupId);}
function locked(part){return layerLocked(project,part);}
function selectLayerGroup(id,activeId){const group=project.groups.find(group=>group.id===id),ids=groupMembers(project,id).map(part=>part.id);if(!group||!ids.length)return false;select(ids.includes(activeId)?activeId:ids.at(-1),false,false);selectedIds=new Set(ids);selectedGroupId=id;renderLists();return true;}
function selectGroupMember(id){const part=project.parts.find(row=>row.id===id),group=groupFor(part);if(!group){select(id);return false;}return selectLayerGroup(group.id,id);}
function cleanGroups(){const used=new Set(project.parts.flatMap(part=>[part.groupId,...groupAncestors(project,part).map(g=>g.id)]).filter(Boolean));project.groups=project.groups.filter(group=>used.has(group.id));}
const toolOptions=document.createElement('details');toolOptions.className='tool-options';
const optionsSummary=document.createElement('summary');optionsSummary.textContent='Options';
const optionsBody=document.createElement('div');optionsBody.className='tool-options-body';
for(const id of ['snap','move-joined','magnet','collision-protection']){const label=$(id).closest('label');$(id).setAttribute('aria-label',label.textContent.trim());optionsBody.append(label);}
toolOptions.append(optionsSummary,optionsBody);document.querySelector('nav').append(toolOptions);
document.querySelector('header a').href='/assembly/projects';document.querySelector('header b').textContent='/ '+PLATFORM.name;document.title=PLATFORM.name+' Assembly · mindX';
async function beforeWorkspaceNavigate(){if(busy||pendingProjectSaves>0||controls.dragging||directTools?.active()){status('Hoàn tất hoặc hủy thao tác đang kéo trước khi chuyển dự án.');return false;}chainPicker?.cancel();quickAttach?.close();connectTool?.cancel();const kept=await save(false,{skipThumbnail:true});if(!kept)return false;setBusy(true);try{await requestProjectCheckpoint(PLATFORM.id,PROJECT_ID);}finally{setBusy(false);}return true;}
installEditorChrome({beforeNavigate:beforeWorkspaceNavigate});
const backgroundMenu=[...document.querySelectorAll('.app-menu')].find(menu=>menu.querySelector('summary')?.textContent==='View')?.querySelector('.app-menu-panel');
for(const [value,label] of [['white','Nền 3D trắng'],['black','Nền 3D đen']]){const button=document.createElement('button');button.type='button';button.id='scene-background-'+value;button.textContent=label;button.onclick=()=>{if(busy||preview||controls.dragging)return;checkpoint();project.editorSettings={...project.editorSettings,sceneBackground:value};syncSceneBackground();save(false);renderLists();backgroundMenu.closest('details').open=false;};backgroundMenu?.append(button);}
function syncSceneBackground(){if(exportingGuide)return;const dark=project.editorSettings?.sceneBackground==='black';scene.background.set(dark?'#000000':'#ffffff');grid.material.transparent=true;grid.material.opacity=dark?.28:1;for(const value of ['white','black'])document.getElementById('scene-background-'+value)?.setAttribute('aria-pressed',String((dark?'black':'white')===value));renderLoop?.invalidate();}
installInspectorChrome();
const guideTools=node('div');guideTools.className='guide-export-tools';const zipButton=node('button','Xuất ảnh + HTML (ZIP)');zipButton.id='guide-zip';zipButton.onclick=()=>exportStudentGuide({zip:true});$('guide-export').before(guideTools);guideTools.append($('guide-export'),zipButton);$('guide-export').textContent='PDF';$('guide-export').title='Xuất hướng dẫn PDF';zipButton.textContent='Ảnh ZIP';const zipMenu=node('button','Xuất bộ ảnh hướng dẫn (ZIP)…');zipMenu.id='guide-zip-menu';zipMenu.onclick=()=>exportStudentGuide({zip:true});$('new').closest('.app-menu-panel').append(zipMenu);
let snapSelect=null;
if(PLATFORM.id==='lego'){$('snap').closest('label').lastChild.textContent=' Snap LEGO / 15°';$('snap').setAttribute('aria-label','Snap LEGO / 15°');const label=node('label','Lưới LEGO ');snapSelect=node('select');snapSelect.id='lego-snap-preset';snapSelect.setAttribute('aria-label','Bước snap LEGO');for(const [id,preset] of Object.entries(SNAP_PRESETS)){const option=node('option',preset.label);option.value=id;snapSelect.append(option);}label.append(snapSelect);optionsBody.prepend(label);snapSelect.onchange=()=>{if(busy||preview)return;checkpoint();project.editorSettings={...project.editorSettings,snapPreset:snapSelect.value};syncSnapSettings();save(false);};}
function syncSnapSettings(){const preset=snapPreset(project.editorSettings,PLATFORM.id);if(snapSelect)snapSelect.value=preset;controls.setTranslationSnap(PLATFORM.id==='lego'?null:$('snap').checked?.001:null);controls.setRotationSnap($('snap').checked?THREE.MathUtils.degToRad(15):null);}
function snapForDrag(position,origin){return PLATFORM.id==='lego'?snapPosition(position,snapPreset(project.editorSettings,PLATFORM.id),$('snap').checked,origin):position;}
const guideObjects=new Map();
async function prepareGuideObjects(step,kitId=project.kit?.kitId){
 const parts=step.guideSupport?[...step.parts,step.guideSupport]:step.parts;
 const models=await loadPool(parts,p=>{
  const kit=p.legoKitId||kitId,key=JSON.stringify([p.sku,p.ldrawColorHex,kit,p.position,p.rotation]);
  let task=guideObjects.get(key);
  if(task)guideObjects.delete(key);
  else task=model(p.sku,p.ldrawColorHex,kit).then(obj=>{
   transform(obj,p);obj.traverse(mesh=>{if(mesh.userData.cable)mesh.visible=false;});return obj;
  }).catch(error=>{if(guideObjects.get(key)===task)guideObjects.delete(key);throw error;});
  guideObjects.set(key,task);
  if(guideObjects.size>192)guideObjects.delete(guideObjects.keys().next().value);
  return task;
 });
 return new Map(parts.map((p,i)=>[p.id,models[i]]));
}
async function renderGuideCard(step,options={}){const map=await prepareGuideObjects(step,Object.hasOwn(options,'kitId')?options.kitId||null:project.kit?.kitId);if(options.alive&&!options.alive())return null;previewRenderer??=createGuideRenderer();const current=new Map(project.parts.map(p=>[p.id,p])),same=step.parts.every(p=>JSON.stringify([p.position,p.rotation])===JSON.stringify([current.get(p.id)?.position,current.get(p.id)?.rotation]));const contacts=same?guideContacts():seatedConnections(step.parts,jointReferences);if(options.frame==='detail'){const shot=previewRenderer.render(map,step,jointReferences,{width:320,height:240,detailScale:.4,frameOnly:'detail',contacts});return shot.detail||shot.assembled;}return previewRenderer.render(map,step,jointReferences,{width:options.width||1000,height:options.height||680,detail:false,contacts});}
guidePreviews=installGuidePreviews({enabled:!renderer.isDataRenderer,prepare:prepareGuideObjects,render(map,step){previewRenderer??=createGuideRenderer();return previewRenderer.render(map,step,jointReferences,{width:400,height:300,detail:false,contacts:guideContacts()}).assembled;}});
guideWorkbench=installGuideWorkbench({platform:PLATFORM.id,enabled:!renderer.isDataRenderer,suspended:()=>!!pdfPreview?.active(),appearance:()=>project.kit?.kitId||'',live:()=>project.editorSettings?.liveGuidePreview!==false,setLive(value){checkpoint();project.editorSettings={...project.editorSettings,liveGuidePreview:!!value};save(false);guideUIStamp='';renderStudentGuide();},render:renderGuideCard,prepareLive:async(step,appearance,alive)=>{const map=await prepareGuideObjects(step,appearance||null);if(!alive())return null;liveGuideRenderer??=createGuideRenderer();const shot=liveGuideRenderer.render(map,{...step,view:'auto',camera:undefined},jointReferences,{width:480,height:360,detail:true,live:true,liveFrame:'detail',contacts:guideContacts()});return {canvas:liveGuideRenderer.renderCanvas,framing:shot.detailFrame?.camera||shot.framing,draw:(camera,w,h)=>liveGuideRenderer.drawView(camera,w,h),thumbnail:()=>liveGuideRenderer.thumbnail()};},sceneCamera:()=>guideCamera({direction:camera.position.clone().sub(orbit.target).normalize().toArray(),up:new THREE.Vector3(0,1,0).applyQuaternion(camera.quaternion).toArray(),zoom:1}),camera(key,value,all){const preferences=copy(project.guidePreferences||{});preferences.steps||={};const keys=all?studentGuide.steps.map(stepKey):[key];if(all&&value)preferences.defaultCamera=value;for(const id of keys){const row={...preferences.steps[id]},page=copy(row.page||{});page.frames||={};page.frames.detail={...page.frames.detail};if(value)page.frames.detail.camera=value;else delete page.frames.detail.camera;row.page=page;Object.defineProperty(preferences.steps,id,{value:row,enumerable:true,writable:true,configurable:true});}return changeGuidePreferences(preferences,{allowPreview:true,cameraOnly:true});},suggest:()=>connectionSuggestions?.open(),reorder:reorderInlineGuide,export:zip=>exportStudentGuide({zip})});$('guide-summary').before(guideWorkbench.element);const guideAdvanced=node('details');guideAdvanced.className='guide-advanced-settings';const guideAdvancedLabel=node('summary','Thứ tự & ghi chú bước');guideAdvanced.append(guideAdvancedLabel);$('guide-steps').before(guideAdvanced);guideAdvanced.append($('guide-steps'));
let pdfOrbitRenderer=null;
async function preparePDFOrbit(step,name,alive){const map=await prepareGuideObjects(step);if(!alive())return null;pdfOrbitRenderer??=createGuideRenderer();pdfOrbitRenderer.render(map,step,jointReferences,{live:true,liveFrame:name,detail:name==='detail',width:480,height:360,detailScale:.55,contextEdges:step.parts.length<=32,contacts:guideContacts()});return {canvas:pdfOrbitRenderer.renderCanvas,draw:(camera,w,h)=>pdfOrbitRenderer.drawView(camera,w,h)};}
async function renderPDFStep(step,{quick=false,thumbnail=false,frame,alive}={}){
 const map=await prepareGuideObjects(step);
 if(alive&&!alive())return null;
 previewRenderer??=createGuideRenderer();
 const width=thumbnail?200:quick?420:900;
 return previewRenderer.render(map,step,jointReferences,{markers2D:true,frameOnly:frame,contacts:guideContacts(),width,height:width,detailScale:thumbnail?.23:quick?.5:1,contextEdges:!thumbnail&&step.parts.length<=32});
}
pdfPreview=installPDFPreview({platform:PLATFORM,guide:()=>studentGuide,project:()=>copy(project),catalog:()=>catalog,render:renderPDFStep,prepareLive:preparePDFOrbit,completed:async({thumbnail=false,alive}={})=>{const map=await prepareGuideObjects({parts:project.parts});if(alive&&!alive())return null;previewRenderer??=createGuideRenderer();return previewRenderer.completed(map,thumbnail?{width:280,height:153,contextEdges:false}:{width:1000,height:546,contextEdges:project.parts.length<=32});},reorder(from,to){
 const result=reorderInlineGuide(from,to);
 if(result?.ok===false)throw Error(result.error);
 return result;
},saveExplodeForAll,save(key,value){const prefs=copy(project.guidePreferences||{});prefs.steps||={};Object.defineProperty(prefs.steps,key,{value:{...prefs.steps[key],page:guidePage(value)},writable:true,enumerable:true,configurable:true});return changeGuidePreferences(prefs,{allowPreview:true,cameraOnly:true});},undo,undoDepth:()=>history.length,layout:()=>project.guidePreferences?.layout==='single'?'single':'vex',setLayout(value){const prefs=copy(project.guidePreferences||{});if(value==='single')prefs.layout='single';else delete prefs.layout;return changeGuidePreferences(prefs,{allowPreview:true,cameraOnly:true});},export:async()=>{if(!await exportStudentGuide())throw Error($('status').textContent);},focus:()=>{guideWorkbench.resume();renderLoop?.invalidate();scheduleProjectThumbnail();$('guide-export').focus();}});
function saveExplodeForAll(mm){
 const preferences=copy(project.guidePreferences||{});
 preferences.steps||={};
 for(const step of studentGuide.steps){
  const key=stepKey(step),previous=preferences.steps[key];
  const frames=previous?.page?.frames||{};
  const page=guidePage({frames:{...frames,detail:{...frames.detail,explodeMM:mm}}});
  Object.defineProperty(preferences.steps,key,{value:{...previous,page},writable:true,enumerable:true,configurable:true});
 }
 return changeGuidePreferences(preferences,{allowPreview:true,cameraOnly:true});
}
async function openPDFPreview(){
 if(busy)return;
 renderStudentGuide(true);
 if(!studentGuide.ready){status(studentGuide.blockers.join(' '));return;}
 if(renderer.isDataRenderer)return exportStudentGuide();
 return pdfPreview.open(guideWorkbench.currentIndex(),ensureGuideAudit);
}
const guideShortcut=node('button','Guide / PDF');guideShortcut.id='guide-shortcut';guideShortcut.title='Hướng dẫn lắp, xem trước và xuất PDF';guideShortcut.onclick=()=>{if(document.body.classList.contains('hide-panel'))$('panel-toggle').click();$('inspector-tab-2')?.click();renderStudentGuide();};document.querySelector('header').append(guideShortcut);const guideReadiness=node('p');guideReadiness.id='guide-readiness';guideReadiness.setAttribute('role','status');$('guide-summary').before(guideReadiness);$('student-guide-title').firstChild.textContent='Hướng dẫn lắp ';
guideAdvanced.addEventListener('toggle',()=>{guideUIStamp='';renderStudentGuide();});
const workbenchMenu=node('button','Ảnh bước & góc nhìn…');workbenchMenu.id='guide-workbench-menu';workbenchMenu.onclick=()=>{workbenchMenu.closest('details').open=false;guideWorkbench.open();};$('new').closest('.app-menu-panel').append(workbenchMenu);
if(PLATFORM.id==='lego'){
 const panel=$('new').closest('.app-menu-panel'),input=node('input');input.type='file';input.accept='.ldr,.mpd';input.hidden=true;input.id='lego-ldr-input';document.body.append(input);
 const load=node('button','Nhập LDraw (.ldr / .mpd)…');load.id='lego-ldr-import';load.onclick=()=>input.click();const out=node('button','Xuất LDraw (.ldr)…');out.id='lego-ldr-export';out.onclick=()=>{try{downloadFile(exportLDraw(project,catalog),'text/plain;charset=utf-8','model.ldr');status('Đã xuất LDraw. Dùng JSON để giữ đầy đủ group, khớp và góc nhìn.');}catch(error){status(error.message);}};panel.append(load,out);
 input.onchange=async()=>{const file=input.files[0];if(!file)return;if(busy||preview){status('Trở về mô hình đầy đủ và chờ thao tác kết thúc trước khi nhập LDraw.');input.value='';return;}try{if(file.size>5e6)throw Error('File LDraw phải nhỏ hơn 5 MB.');const config=await fetch('/assembly/lego/ldraw/ldconfig.ldr');if(!config.ok)throw Error('Không đọc được bảng màu LEGO.');const data=parseLDraw(await file.text(),catalog,{colors:ldrawColors(await config.text())});await window.assemblyAPI.loadJSON(data);fit();status(`Đã nhập ${data.parts.length} linh kiện LDraw. Ctrl+Z để hoàn tác.`);}catch(error){status('Nhập LDraw thất bại: '+error.message);}finally{input.value='';}};
}

document.addEventListener('pointerdown',event=>{if(!toolOptions.contains(event.target))toolOptions.open=false;});
document.addEventListener('keydown',event=>{if(event.key==='Escape')toolOptions.open=false;});
async function guardTransform({autoAttach=true}={}){
 const lockedBefore=history.at(-1);
 if(lockedBefore&&project.parts.some(p=>locked(p)&&lockedBefore.parts.some(old=>old.id===p.id&&JSON.stringify([old.position,old.rotation])!==JSON.stringify([p.position,p.rotation])))){
  project.parts=copy(lockedBefore.parts);history.pop();await show();status('Movement cancelled: a locked layer would move.');return false;
 }

 const jointBefore=history.at(-1);
 if(!busy&&!preview&&jointBefore){
  const corrected=constrainJoints(project.parts,jointBefore.parts,jointReferences,{autoAttach:autoAttach&&$('magnet').checked&&selectedIds.size<=1});
  if(!corrected.ok){project.parts=copy(jointBefore.parts);history.pop();await show();warnings();status('Move rejected: '+corrected.reason);return false;}
  for(const part of project.parts){const obj=objects.get(part.id);if(obj)transform(obj,part);}
  if(corrected.corrections.length)refreshSelection();
 }
 const before=history.at(-1);if(!protectInput.checked||busy||preview||!before||before.parts.some(p=>!project.parts.some(n=>n.id===p.id)))return true;
 const prior=new Map(before.parts.map(p=>[p.id,p]));
 const changed=project.parts.filter(p=>!prior.has(p.id)||JSON.stringify([p.position,p.rotation])!==JSON.stringify([prior.get(p.id).position,prior.get(p.id).rotation]));if(!changed.length)return true;
 setBusy(true);
 try{
 const stamp=JSON.stringify(project.parts);const current=await inspectFit();if(stamp!==JSON.stringify(project.parts))return true;if(!current.issues.some(i=>i.kind==='penetration'))return true;
 for(const p of changed)if(prior.has(p.id))transform(objects.get(p.id),prior.get(p.id));
 const priorCheck=inspectFit(before.parts);
 for(const p of changed)transform(objects.get(p.id),p);
 const oldKeys=new Set((await priorCheck).issues.filter(i=>i.kind==='penetration').map(i=>i.key));
 const newIssues=current.issues.filter(i=>i.kind==='penetration'&&!oldKeys.has(i.key));
 if(!newIssues.length)return true;
 const labels=newIssues.map(i=>[i.a,i.b].map(id=>project.parts.find(p=>p.id===id)?.label).join(' / '));
 const added=changed.some(p=>!prior.has(p.id));
 if(added){project.parts=copy(before.parts);await show();}else{for(const p of project.parts)Object.assign(p,copy(prior.get(p.id)));for(const p of changed)transform(objects.get(p.id),p);}
 history.pop();setBusy(false);refreshSelection();warnings();
 status('Move rejected: detected body penetration in '+labels.join('; ')+'. Previous position restored.');return false;
 }finally{setBusy(false);renderLists();}
}
let pendingProjectSaves=0;
async function save(check=true,options={}){pendingProjectSaves++;try{try{if(check&&!await guardTransform(options))return false;}catch(error){status('Fit check failed. Edit not saved: '+error.message);return false;}try{project.connections=assemblyAssistant?.data().connections||[];renderStudentGuide();project.steps=[];project.platform=PLATFORM.id;if(PROJECT_ID){saveProject(PLATFORM.id,PROJECT_ID,project);window.parent.postMessage({type:'assembly-project-saved',title:project.title,projectId:PROJECT_ID,platform:PLATFORM.id},location.origin);if(!options.skipThumbnail)scheduleProjectThumbnail();}else localStorage.setItem(key,JSON.stringify(project));status(`Draft saved locally · ${project.parts.length} parts · ${document.body.classList.contains('guide-active')&&studentGuide.ready?`${studentGuide.steps.length} guide steps generated`:'changes saved'}`);if(!options.skipAutoRepair)automaticGuideRepair?.schedule();return true;}catch{status('Browser storage is full. Save project to a file.');return false;}}finally{pendingProjectSaves--;}}
let thumbnailTimer=null;function scheduleProjectThumbnail(){if(renderer.isDataRenderer)return;clearTimeout(thumbnailTimer);if(!PROJECT_ID||!project.parts.length)return;thumbnailTimer=setTimeout(()=>{if(busy||preview||controls.dragging||exportingGuide||pdfPreview?.active())return;try{const canvas=document.createElement('canvas');canvas.width=400;canvas.height=240;canvas.getContext('2d').drawImage(renderer.domElement,0,0,400,240);saveProject(PLATFORM.id,PROJECT_ID,project,{thumbnail:canvas.toDataURL('image/jpeg',.7)});}catch{}},1500);}
function withElectronics(parts,item,entries){if(PLATFORM.id==='lego'&&!item.legoKitId)item.legoKitId=legoPartKit(entries.find(p=>p.id===item.sku),project.kit);if(!project.kit?.enforce)return withRequiredElectronics(parts,item,entries);const stock=new Map(kitReport([],entries,project.kit).flatMap(row=>row.skus.map(sku=>[sku,row.available])));return withRequiredElectronics(parts,item,entries,undefined,sku=>(stock.get(sku)||0)>0);}
function assertAdditions(additions){assertKitChange(project.parts,[...project.parts,...additions],catalog,project.kit);}
function checkpoint(){history.push(copy(project));if(history.length>60)history.shift();future=[];}
function setBusy(value){busy=value;controls.enabled=!value;for(const el of document.querySelectorAll('#objects button,#groups button,#groups input,#guide-steps button'+(kitSettings?'':',#parts button')))el.disabled=value||preview;if($('connect'))$('connect').disabled=value||preview||!selected||locked(project.parts.find(part=>part.id===selected));$('save').disabled=value;for(const el of $('transforms').querySelectorAll('input'))el.disabled=value;if($('guide-return'))$('guide-return').disabled=value;for(const id of ['open','export','guide-export','guide-repair','new','move','rotate','group','ungroup','duplicate','delete','undo','redo','fit','title','lego-ldr-import','lego-ldr-export','guide-zip','guide-zip-menu','guide-workbench-open','guide-workbench-menu'])if($(id))$(id).disabled=value;kitSettings?.render();}
const modelKeys=new WeakMap(),embeddedCables=new WeakMap();
function effectiveModelKit(id,kitId){return PLATFORM.id==='lego'?kitId||legoPartKit(catalogIndex().get(id),project.kit):null;}
function modelKey(id,color,kitId){return JSON.stringify([id,color,kitId]);}
function setEmbeddedCableVisibility(obj,visible){
 let cables=embeddedCables.get(obj);
 if(!cables){cables=[];obj.traverse(mesh=>{if(mesh.userData.cable)cables.push(mesh);});embeddedCables.set(obj,cables);}
 let changed=false;
 for(const cable of cables)if(cable.visible!==visible){cable.visible=visible;changed=true;}
 if(changed)invalidateVisibleBounds(obj);
}
async function model(id,instanceColor,kitId){
 kitId=effectiveModelKit(id,kitId);
 if(!cache.has(id)){
  const task=loader.loadAsync(partModelUrl(PLATFORM.id,id)).then(({scene:modelScene})=>{
   modelScene.traverse(obj=>{if(!obj.isMesh)return;obj.castShadow=false;obj.receiveShadow=false;for(const material of Array.isArray(obj.material)?obj.material:[obj.material]){if(material.isMeshStandardMaterial){material.metalness=0;material.roughness=.85;material.needsUpdate=true;}}});
   const source=partSource(PLATFORM.id,id);
   if(source.platform==='vexgo'&&markOriginalGOCables(modelScene,source.id,{[source.id]:jointReferences[id]}))return modelScene;
   if(source.platform==='vexiq')applyIQAppearance(modelScene,{...catalogIndex().get(id),id:source.id,sku:source.id});
   return optimizeStaticModel(modelScene);
  }).catch(error=>{if(cache.get(id)===task)cache.delete(id);throw error;});
  cache.set(id,task);
 }
 const instance=(await cache.get(id)).clone(true);
 if(PLATFORM.id==='lego')applyLEGOAppearance(instance,catalogIndex().get(id),kitId,instanceColor);
 modelKeys.set(instance,modelKey(id,instanceColor,kitId));
 return instance;
}
function moveJoined(before,id){const changed=project.parts.find(p=>p.id===id),ids=dragStart?.assemblyIds||[...selectedIds],graph=!dragStart?.assemblyIds&&$('move-joined').checked?before:before.map(p=>({...p,mate:undefined}));for(const [otherId,pose] of linkedPoses(graph,id,changed,ids)){const part=project.parts.find(p=>p.id===otherId);if(locked(part))continue;Object.assign(part,pose);const obj=objects.get(otherId);if(obj)transform(obj,part);}}
const rad=THREE.MathUtils.degToRad;
function sameScenePose(obj,{position:[x,y,z],rotation:[rx,ry,rz]}){
 return obj.position.x===x/1000&&obj.position.y===y/1000&&obj.position.z===z/1000&&obj.rotation.x===rad(rx)&&obj.rotation.y===rad(ry)&&obj.rotation.z===rad(rz);
}
function transform(obj,{position:[x,y,z],rotation:[rx,ry,rz]}){
 obj.position.set(x/1000,y/1000,z/1000);obj.rotation.set(rad(rx),rad(ry),rad(rz));obj.updateMatrixWorld(true);
 renderLoop?.invalidate();
}
async function show(parts=project.parts){
 assemblyAssistant?.reset();setBusy(true);controls.detach();box.visible=false;
 for(const h of highlights){scene.remove(h);h.geometry.dispose();h.material.dispose();}highlights=[];
 try{
  const next=new Map();
  const missing=parts.filter(part=>{
   const existing=objects.get(part.id);
   if(existing&&modelKeys.get(existing)===modelKey(part.sku,part.ldrawColorHex,effectiveModelKit(part.sku,part.legoKitId))){next.set(part.id,existing);return false;}
   return true;
  });
  const models=await loadPool(missing,part=>model(part.sku,part.ldrawColorHex,part.legoKitId));
  missing.forEach((part,i)=>next.set(part.id,models[i]));
  for(const [id,obj] of objects)if(next.get(id)!==obj)scene.remove(obj);
  objects.clear();shownParts=parts;
  for(const part of parts){
   const obj=next.get(part.id);obj.userData.instance=part.id;
   setEmbeddedCableVisibility(obj,!preview&&!part.wiring&&!project.hideCables);
   if(!obj.parent||!sameScenePose(obj,part))transform(obj,part);
   obj.visible=preview||layerVisible(project,part);objects.set(part.id,obj);
   if(obj.parent!==scene)scene.add(obj);
  }
  select(null,false,false);
 }catch(error){status('Could not load CAD part: '+error.message);}
 finally{setBusy(false);renderLists();renderLoop?.invalidate();}
}
function refreshSelection(){const ids=new Set(selectedIds),groupId=selectedGroupId;select(selected,false,false);selectedIds=ids;const members=groupMembers(project,groupId);selectedGroupId=project.groups.some(group=>group.id===groupId)&&members.length===ids.size&&members.every(part=>ids.has(part.id))?groupId:null;renderLists();}
function select(id,additive=false,render=true){selectedGroupId=null;if(quickAttach?.active())quickAttach.close();if(connectTool?.active())connectTool.cancel();if(additive&&id){if(selectedIds.has(id))selectedIds.delete(id);else selectedIds.add(id);if(!selectedIds.has(id))id=[...selectedIds].at(-1)||null;}else selectedIds=new Set(id?[id]:[]);selected=id;controls.detach();box.visible=false;const part=project.parts.find(p=>p.id===id),obj=objects.get(id);$('selection').textContent=part?`${partName(part)}${groupFor(part)?` · ${groupFor(part).name}`:''}${locked(part)?' · Locked':''}`:'Select a part in the scene.';$('transforms').replaceChildren();if(part&&obj&&!preview&&!locked(part)){controls.attach(obj);box.setFromObject(obj);box.visible=true;for(const kind of ['position','rotation'])for(let axis=0;axis<3;axis++){const label=document.createElement('label');label.textContent=(kind==='position'?'mm ':'° ')+['X','Y','Z'][axis];const input=document.createElement('input');input.type='number';input.step=kind==='position'?'1':'15';input.value=part[kind][axis].toFixed(2);let committed=input.value;const commit=()=>{if(input.value===committed)return;committed=input.value;const v=Number(input.value);if(!Number.isFinite(v)||Math.abs(v)>10000){input.value=part[kind][axis];return;}const before=copy(project.parts);checkpoint();part[kind][axis]=v;transform(obj,part);moveJoined(before,part.id);box.update();save();warnings();};input.onchange=commit;input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();commit();}};label.append(input);$('transforms').append(label);}}if(render)renderLists();}
function warnings(){
 clearTimeout(collisionTimer);$('warnings').textContent='Đang kiểm tra hình học…';
 const check=async()=>{
  if(busy||controls.dragging||directTools?.active()){collisionTimer=setTimeout(check,140);return;}
  try{const stamp=JSON.stringify(project.parts),result=await inspectFit();if(stamp!==JSON.stringify(project.parts))return;collisionReport=result;issuePanel.replaceChildren(node('h3','Kiểm tra lắp ráp'));
   const expected=result.issues.filter(i=>i.kind==='joint'),remaining=result.issues.filter(i=>i.kind!=='joint');
   for(const issue of remaining){const button=node('button');button.className='fit-issue '+issue.kind;const names=[issue.a,issue.b].map(id=>instanceName(project.parts.find(p=>p.id===id)));button.textContent=(issue.kind==='penetration'?'Cấn thân: ':'Tiếp xúc cần xem: ')+names.join(' / ');button.onclick=()=>{select(issue.a);select(issue.b,true);status('Kiểm tra cặp đang chọn; đổi góc nhìn để thấy vùng tiếp xúc.');};issuePanel.append(button);}
   if(expected.length){const details=node('details');details.append(node('summary',`${expected.length} tiếp xúc tại khớp lắp`),node('p','Tiếp xúc chốt/lỗ có thể là bình thường. Xem từng khớp và độ sâu ở phần Khớp lắp & giữ trục.'));issuePanel.append(details);}
   const hard=result.issues.filter(i=>i.kind==='penetration').length;$('warnings').textContent=`${hard} lỗi cấn thân phát hiện · ${expected.length} tiếp xúc tại khớp${result.truncated?' · danh sách rút gọn':''}. Kiểm tra CAD có lấy mẫu, cần thử độ chắc bằng bộ thật.`;assemblyAssistant?.render();
  }catch(error){$('warnings').textContent='Chưa kiểm tra được: '+error.message;}
 };
 collisionTimer=setTimeout(check,120);
}

function renderGroups(){const list=$('groups');if(!list)return;list.replaceChildren();$('group-count').textContent=String(project.groups.length);for(const group of project.groups){const row=document.createElement('div');row.className='layer-row';const selectButton=document.createElement('button');selectButton.className='layer-select';selectButton.textContent=group.name;selectButton.setAttribute('aria-label',`Select group ${group.name}`);selectButton.setAttribute('aria-pressed',String(project.parts.filter(part=>part.groupId===group.id).every(part=>selectedIds.has(part.id))&&selectedIds.size>0));selectButton.onclick=()=>{const ids=project.parts.filter(part=>part.groupId===group.id).map(part=>part.id);if(!ids.length)return;selectGroupMember(ids[0]);};const rename=document.createElement('input');rename.value=group.name;rename.maxLength=60;rename.setAttribute('aria-label',`Rename group ${group.name}`);rename.onchange=()=>{const name=rename.value.trim();if(!name){rename.value=group.name;return;}checkpoint();group.name=name;renderLists();save();};const visible=document.createElement('button');visible.textContent=group.visible?'◉':'○';visible.title=group.visible?'Hide group':'Show group';visible.setAttribute('aria-label',`${group.visible?'Hide':'Show'} group ${group.name}`);visible.onclick=()=>{checkpoint();group.visible=!group.visible;for(const part of project.parts.filter(part=>part.groupId===group.id)){const obj=objects.get(part.id);if(obj)obj.visible=group.visible;}if(!group.visible&&[...selectedIds].some(id=>project.parts.some(part=>part.id===id&&part.groupId===group.id)))select(null);else renderLists();save();};const lock=document.createElement('button');lock.textContent=group.locked?'🔒':'🔓';lock.title=group.locked?'Unlock group':'Lock group';lock.setAttribute('aria-label',`${group.locked?'Unlock':'Lock'} group ${group.name}`);lock.setAttribute('aria-pressed',String(group.locked));lock.onclick=()=>{checkpoint();group.locked=!group.locked;refreshSelection();save();};const remove=document.createElement('button');remove.textContent='Ungroup';remove.title=`Ungroup ${group.name}`;remove.onclick=()=>ungroup(group.id);for(const control of [selectButton,rename,visible,lock,remove])control.disabled=busy||preview;row.append(selectButton,rename,visible,lock,remove);list.append(row);}}
function reorderInlineGuide(from,to){
 const order=studentGuide.steps.map(stepKey);if(!Number.isInteger(from)||!Number.isInteger(to)||from<0||to<0||from>=order.length||to>=order.length)return {ok:false,error:'Số thứ tự không hợp lệ.'};
 const [id]=order.splice(from,1);order.splice(to,0,id);const preferences={...copy(project.guidePreferences||{}),order};
 const changed=changeGuidePreferences(preferences,{allowPreview:true,cameraOnly:true});if(changed)status(`Đã chuyển bước ${from+1} đến ${to+1}; đã cập nhật các bước và ảnh phía sau. Ctrl+Z để hoàn tác.`);return changed;
}
function changeGuidePreferences(preferences,{allowPreview=false,cameraOnly=false}={}){
 if(busy||preview&&!allowPreview)return false;
 const candidate=editGuide(baseStudentGuide(preferences),preferences,guidePaths(),jointReferences);
 checkpoint();project.guidePreferences=preferences;studentGuide=candidate;guideDataStamp=JSON.stringify([project.parts,project.guidePreferences,catalog]);save(false,{skipThumbnail:cameraOnly});renderLists();status('Đã cập nhật hướng dẫn. Ctrl+Z để hoàn tác.');return true;
}
function moveGuideStep(from,to){
 if(!preview)reorderInlineGuide(from,to);
}
function installGuideEditing(article,step,index){
 const actions=node('div');actions.className='guide-step-actions';
 for(const [label,to] of [['Lên',index-1],['Xuống',index+1]]){const button=node('button',label);button.setAttribute('aria-label',`${label} bước ${index+1}`);button.disabled=busy||preview||to<0||to>=studentGuide.steps.length;button.onclick=()=>moveGuideStep(index,to);actions.append(button);}
 const editor=node('details');editor.className='guide-edit';editor.append(node('summary','Sửa hướng dẫn / góc nhìn'));
 const title=node('input');title.value=step.title;title.maxLength=160;title.setAttribute('aria-label',`Tiêu đề bước ${index+1}`);
 const note=node('textarea');note.value=step.note;note.maxLength=1200;note.setAttribute('aria-label',`Hướng dẫn bước ${index+1}`);
 const view=node('select');view.setAttribute('aria-label',`Góc nhìn bước ${index+1}`);for(const [id,label] of [['auto','Tự chọn góc thấy khớp'],['custom','Góc đã chụp'],['front','Trước'],['rear','Sau'],['left','Trái'],['right','Phải'],['top','Trên'],['bottom','Dưới']]){const option=node('option',label);option.value=id;view.append(option);}view.value=step.view||'auto';
 const apply=node('button','Áp dụng');apply.disabled=busy||preview;apply.onclick=()=>{const preferences=copy(project.guidePreferences||{});preferences.steps||={};preferences.steps[stepKey(step)]={...preferences.steps[stepKey(step)],title:title.value,note:note.value,view:view.value};changeGuidePreferences(preferences);};for(const [text,field] of [['Tiêu đề',title],['Hướng dẫn',note],['Góc nhìn',view]]){const label=node('label',text);label.append(field);editor.append(label);}editor.append(apply);article.append(actions,editor);
 const capture=node('button','Dùng góc nhìn này');capture.className='guide-camera-capture';capture.setAttribute('aria-label',`Dùng góc nhìn này cho bước ${index+1}`);capture.disabled=busy||renderer.isDataRenderer||preview&&previewStepIndex!==index;capture.onclick=()=>{const direction=camera.position.clone().sub(orbit.target).normalize().toArray(),value=guideCamera({direction,up:new THREE.Vector3(0,1,0).applyQuaternion(camera.quaternion).toArray()});if(!value){status('Góc nhìn không hợp lệ.');return;}const preferences=copy(project.guidePreferences||{});preferences.steps||={};preferences.steps[stepKey(step)]={...preferences.steps[stepKey(step)],view:'custom',camera:value};changeGuidePreferences(preferences,{allowPreview:true});};article.append(capture);
 article.draggable=!busy&&!preview;article.ondragstart=e=>{if(e.target.closest('input,textarea,select')){e.preventDefault();return;}e.dataTransfer.setData('application/x-vex-guide',String(index));};article.ondragover=e=>e.preventDefault();article.ondrop=e=>{e.preventDefault();const raw=e.dataTransfer.getData('application/x-vex-guide');if(raw!==''&&Number.isInteger(Number(raw)))moveGuideStep(Number(raw),index);};
}
let guideDataStamp='',guideUIStamp='',guideBaseStamp='',guideBase=null,guideAuditResult=null,guideAuditPending=null,guideChecker=null;
let guideDraftStamp='',guideDrafts=new Map();
const guidePaths=()=>guideAuditResult?.stamp===JSON.stringify(project.parts)?guideAuditResult.paths:null;
function baseStudentGuide(preferences=project.guidePreferences){
 const poseStamp=JSON.stringify(project.parts),audited=guideAuditResult?.stamp===poseStamp?guideAuditResult:null,checked=audited?.guide;
 // A saved manual order can refer to step batches from the draft plan. Per-step
 // page/camera edits are presentation only: they follow matching steps and must
 // never pull the guide back to an unchecked draft sequence.
 const manualKeys=new Set(preferences?.order||[]);
 const matchingKeys=guide=>guide?.ready?guide.steps.reduce((count,step)=>count+Number(manualKeys.has(stepKey(step))),0):-1;
 const useChecked=!!checked?.ready&&matchingKeys(checked)===manualKeys.size;
 const draftStamp=JSON.stringify([poseStamp,catalog]);
 const stamp=JSON.stringify([draftStamp,useChecked,[...manualKeys].sort()]);
 if(stamp!==guideBaseStamp){
  if(guideDraftStamp!==draftStamp){guideDrafts.clear();guideDraftStamp=draftStamp;}
  const draft=prioritizeMountedElectronics=>{
   if(!guideDrafts.has(prioritizeMountedElectronics))guideDrafts.set(prioritizeMountedElectronics,generateStudentGuide(project.parts,{references:jointReferences,nameFor:partName,inferConnections:true,prioritizeMountedElectronics}));
   return guideDrafts.get(prioritizeMountedElectronics);
  };
  let base=checked;
  if(!useChecked){
   base=draft(true);
   if(PLATFORM.id==='vexiq'&&matchingKeys(base)<manualKeys.size){
    const legacy=draft(false);
    if(matchingKeys(legacy)>matchingKeys(base))base=legacy;
   }
  }
  guideBase={...base,steps:base.steps.map(step=>({...step}))};
  // A draft kept for a manual order, or a best-effort checked plan, is never a verified sequence.
 if(guideBase.ready&&(!audited||!useChecked||checked?.reviewRequired||checked&&!checked.ready)){guideBase.reviewRequired=true;guideBase.auditBlockers=checked?.ready?[]:checked?.blockers||[];}
  for(const step of guideBase.steps)step.reviewRequired=!!guideBase.reviewRequired;
  guideBaseStamp=stamp;
  if(guideAuditResult&&!audited&&$('guide-path-audit-status'))$('guide-path-audit-status').textContent='Mô hình đã thay đổi; cần kiểm tra lại đường lắp.';
 }
 return guideBase;
}
function renderStudentGuide(force=false){
 if(!force&&!document.body.classList.contains('guide-active')&&!pdfPreview?.active()&&!renderer.isDataRenderer){
  const unavailable=busy||!project.parts.length;
  $('export').disabled=unavailable;
  zipMenu.disabled=unavailable||renderer.isDataRenderer;
  return;
 }
 const dataStamp=JSON.stringify([project.parts,project.guidePreferences,catalog]);
 const uiStamp=dataStamp+':'+busy+':'+preview;
 if(uiStamp===guideUIStamp)return;guideUIStamp=uiStamp;
 if(repairReportParts!==null&&repairReportParts!==JSON.stringify(project.parts)){repairReportParts=null;if($('guide-repair-status'))$('guide-repair-status').textContent='';}
 if(dataStamp!==guideDataStamp){studentGuide=editGuide(baseStudentGuide(),project.guidePreferences,guidePaths(),jointReferences);guideDataStamp=dataStamp;}
 const count=$('guide-count'),summary=$('guide-summary'),list=$('guide-steps');
 count.textContent=studentGuide.ready?`${studentGuide.steps.length} bước`:'';
 guidePreviews?.begin();list.replaceChildren();
 if(!studentGuide.ready){summary.textContent=studentGuide.blockers[0]||'Connect the model parts to generate a build sequence.';for(const issue of studentGuide.blockers.slice(1)){const p=node('p',issue);p.className='guide-blocker';list.append(p);}}
 else summary.textContent=`${studentGuide.steps.length} steps generated from the saved part connections. Preview a step or export the complete PDF.`;
 for(const note of studentGuide.notes){const warning=node('p',note);warning.className='guide-warning';list.append(warning);}
 for(let i=0;guideAdvanced.open&&i<studentGuide.steps.length;i++){
  const step=studentGuide.steps[i],article=node('article');article.className='student-guide-step';
  const open=node('button',`Step ${i+1} · ${step.title}`);open.className='student-guide-open';open.disabled=busy;open.setAttribute('aria-label',`Preview guide step ${i+1}: ${step.title}`);open.onclick=()=>viewGuideStep(i);article.append(open,node('p',step.note));
  const added=node('div');added.className='guide-added';for(const part of step.added){const item=node('span'),thumb=node('img');thumb.src=partPreviewSrc(PLATFORM.id,part.sku,step.parts.find(p=>p.id===part.id)?.legoKitId);thumb.alt='';thumb.loading='lazy';item.append(thumb,node('span',part.name));added.append(item);}article.append(added);installGuideEditing(article,step,i);list.append(article);if(!busy&&!exportingGuide)guidePreviews?.add(article,step,JSON.stringify([step.parts,step.added,step.view,step.camera,project.kit?.kitId]),{paused:project.editorSettings?.liveGuidePreview===false});
 }
 const detachedNames=(studentGuide.detached||[]).slice(0,4).map(ids=>{const p=project.parts.find(part=>part.id===ids[0]);return p?partName(p)+(ids.length>1?` (+${ids.length-1})`:''):null;}).filter(Boolean).join(', ');
 const orderLabel=studentGuide.assemblyAxis?`từ trong ra hai phía theo trục ${studentGuide.assemblyAxis} · `:'';
 guideReadiness.className=studentGuide.ready?'guide-ready':'guide-pending';guideReadiness.textContent=busy?'Đang kiểm tra và tạo hướng dẫn…':studentGuide.ready?`${studentGuide.steps.length} bước · ${orderLabel}${studentGuide.reviewRequired?'Preview / PDF nháp · chưa xác nhận đường lắp':'Preview và PDF sẵn sàng'}`:/separate mechanical|separate .*assembl|starting part/i.test(studentGuide.blockers.join(' '))?`Guide vẫn hoạt động: mô hình còn cụm rời${detachedNames?` (${detachedNames})`:''} hoặc thiếu khớp. Ghép cụm, xoá chi tiết thừa hoặc Tự sửa liên kết trước khi xuất PDF.`:studentGuide.blockers[0]||'Thêm và nối các chi tiết để tự tạo bước.';
 guideWorkbench?.update(studentGuide,{busy});workbenchMenu.disabled=busy||!studentGuide.ready;
 zipMenu.disabled=zipButton.disabled=busy||!studentGuide.ready||renderer.isDataRenderer;zipButton.title=renderer.isDataRenderer?'Xuất ảnh cần WebGL; PDF dữ liệu vẫn dùng được.':'';syncSnapSettings();
 $('export').disabled=busy||!studentGuide.ready;if($('guide-export'))$('guide-export').disabled=busy||!studentGuide.ready;
 if($('guide-repair'))$('guide-repair').disabled=busy||preview||project.parts.length<2;if($('guide-path-audit'))$('guide-path-audit').disabled=busy||preview||!studentGuide.ready;
 if($('guide-auto-order')){
  $('guide-auto-order').hidden=!project.guidePreferences?.order?.length;
  $('guide-auto-order').disabled=busy||preview||!studentGuide.ready;
 }
 if(!busy&&!preview&&studentGuide.ready&&document.body.classList.contains('guide-active'))queueMicrotask(()=>{if(!busy&&!preview)void ensureGuideAudit();});
}
const auditGuide=node('button','Kiểm tra đường lắp 3D');auditGuide.id='guide-path-audit';auditGuide.hidden=renderer.isDataRenderer;
const autoOrder=node('button','Sắp xếp lại tự động');autoOrder.id='guide-auto-order';autoOrder.hidden=true;
const auditResult=node('p');auditResult.id='guide-path-audit-status';auditResult.className='hint';$('guide-summary').after(auditGuide,autoOrder,auditResult);
async function ensureGuideAudit(){
 if(renderer.isDataRenderer||project.parts.length<2)return true;
 const stamp=JSON.stringify(project.parts);
 if(guideAuditResult?.stamp===stamp)return true;
 if(guideAuditPending?.stamp===stamp)return guideAuditPending.task;
 if(!project.parts.every(p=>objects.has(p.id)))return false;
 const parts=project.parts,names=Object.fromEntries(parts.map(p=>[p.id,partName(p)]));
 auditResult.textContent='Đang kiểm tra đường lắp trong nền…';
 const job={stamp};
 job.task=(async()=>{
  try{
   guideChecker??=collisionClient(()=>jointReferences);
   const result=await guideChecker.auditGuide(parts,objects,names);
   if(stamp!==JSON.stringify(project.parts))return false;
   guideAuditResult={...result,stamp};
   guideBaseStamp='';guideDataStamp='';guideUIStamp='';
   // A manual order saved for an older step plan would pull the guide back to
   // the unchecked draft. Drop it (undoable) and keep the CAD-checked order.
   const savedOrder=project.guidePreferences?.order||[];
   if(result.guide?.ready&&savedOrder.length){
    const keys=new Set(result.guide.steps.map(stepKey));
    if(savedOrder.some(key=>!keys.has(key))){
     const preferences=copy(project.guidePreferences);delete preferences.order;
     if(changeGuidePreferences(preferences,{cameraOnly:true}))status('Thứ tự chỉnh tay cũ không còn khớp mô hình nên đã dùng thứ tự lắp tự động đã kiểm tra. Ctrl+Z để hoàn tác.');
    }
   }
   renderStudentGuide();
   const blocked=studentGuide.steps.filter(step=>step.insertionBlocked).length;
   auditResult.textContent=blocked?blocked+' bước cần chuẩn bị cụm riêng hoặc đổi thứ tự.':'Đã kiểm tra các đường lắp thẳng trong CAD.';
   return true;
  }catch(error){auditResult.textContent='Chưa kiểm tra được đường lắp: '+error.message;status(auditResult.textContent);return false;}
  finally{if(guideAuditPending===job)guideAuditPending=null;}
 })();
 guideAuditPending=job;
 return job.task;
}
auditGuide.onclick=()=>{if(!busy&&!preview&&studentGuide.ready)void ensureGuideAudit();};
autoOrder.onclick=async()=>{
 if(busy||preview||!await ensureGuideAudit()||busy||preview)return;
 const preferences=copy(project.guidePreferences||{});
 delete preferences.order;
 if(changeGuidePreferences(preferences,{cameraOnly:true}))status('Đã áp dụng thứ tự lắp tự động. Ctrl+Z để hoàn tác.');
};
document.addEventListener('assembly-inspector-change',()=>{if(document.body.classList.contains('guide-active'))renderStudentGuide();});
const repairButton=node('button','✦ Tự sửa liên kết');repairButton.id='guide-repair';repairButton.className='primary';repairButton.title='Khôi phục khớp hợp lệ và chỉnh cụm lệch tối đa 2 mm. Ctrl+Z để hoàn tác.';$('guide-summary').before(repairButton);
const repairStatus=node('p');repairStatus.id='guide-repair-status';repairStatus.className='hint';repairStatus.setAttribute('role','status');repairButton.after(repairStatus);
repairButton.onclick=async()=>{
 if(busy||preview)return;quickAttach?.close();connectTool?.cancel();
 const original=copy(project),savedPose=pose();setBusy(true);repairStatus.textContent='Đang kiểm tra khớp tương thích…';
 try{
  const baseline=await inspectFit(),oldKeys=new Set(baseline.issues.filter(i=>i.kind==='penetration').map(i=>i.key));
  const result=repairAssemblyLinks(project.parts,jointReferences,{isLocked:locked});
  if(!result.recovered&&!result.removed){repairStatus.textContent=studentGuide.ready?'Các liên kết đã hợp lệ. Có thể xuất PDF.':`Chưa thể tự nối ${result.components.length} cụm. Tự sửa chỉ nối khớp gần ≤ 2 mm; không kéo mảnh ở xa vào xe. Chọn cụm rời trong Layers: đưa về đúng khớp hoặc xóa nếu là mảnh dư. ${studentGuide.blockers[0]||''}`;return;}
  project.parts=result.parts;await show();setBusy(true);const check=await inspectFit();
  if(check.issues.some(i=>i.kind==='penetration'&&!oldKeys.has(i.key))){project=original;await show();repairStatus.textContent='Không áp dụng vì phát hiện mảnh cấn nhau. Vị trí cũ đã được giữ lại.';return;}
  history.push(original);if(history.length>60)history.shift();future=[];await save(false);
  repairReportParts=JSON.stringify(project.parts);repairStatus.textContent=`Đã nối ${result.recovered} khớp, bỏ ${result.removed} liên kết lỗi, chỉnh ${result.moved} cụm lệch. ${studentGuide.ready?'Có thể xuất PDF.':'Còn cụm rời cần nối; xem thông tin bên dưới.'} Ctrl+Z để hoàn tác.`;
 }catch(error){project=original;await show();repairStatus.textContent='Chưa sửa được: '+error.message;}
 finally{applyPose(savedPose);setBusy(false);renderLists();warnings();}
};
// Keep PDF/ZIP above the instruction feed; retain legacy IDs for existing consumers.
const guidePanel=$('inspector-content-2'),guideSection=document.querySelector('.student-guide'),legacyGuide=node('div');guidePanel.prepend(guideTools);guideTools.hidden=false;legacyGuide.hidden=true;legacyGuide.id='guide-legacy-controls';
for(const child of [...guideSection.children])if(child!==guideWorkbench.element)legacyGuide.append(child);guideSection.append(legacyGuide);
const guidePlanning=node('div');guidePlanning.className='guide-export-tools';guidePlanning.append(auditGuide,autoOrder);
guideSection.prepend(guidePlanning,auditResult);
for(const child of [...guidePanel.children])if(child!==guideSection)child.hidden=!child.classList.contains('guide-export-tools');
function guideRepairKey(){return JSON.stringify(project.parts.map(p=>[p.id,p.sku,p.position,p.rotation,p.mate,p.snapBlocked,locked(p)]));}
async function repairGuideAutomatically(){
 if(project.parts.length<2)return;
 const result=repairAssemblyLinks(project.parts,jointReferences,{isLocked:locked,respectReleased:true});if(!result.recovered&&!result.removed)return;
 const original=copy(project),savedPose=pose(),selection={active:selected,ids:[...selectedIds],groupId:selectedGroupId};setBusy(true);
 try{
  const baseline=await inspectFit(),oldKeys=new Set(baseline.issues.filter(i=>i.kind==='penetration').map(i=>i.key));project.parts=result.parts;
  if(result.moved){await show();setBusy(true);}const check=await inspectFit();
  if(check.issues.some(i=>i.kind==='penetration'&&!oldKeys.has(i.key))){project=original;if(result.moved){await show();setBusy(true);}return;}
  if(!history.length)history.push(original);repairReportParts=JSON.stringify(project.parts);await save(false,{skipAutoRepair:true});
 }catch(error){project=original;await show();status('Chưa thể tự sửa liên kết: '+error.message);}
 finally{applyPose(savedPose);select(project.parts.some(p=>p.id===selection.active)?selection.active:null);selectedIds=new Set(selection.ids.filter(id=>project.parts.some(p=>p.id===id)));selectedGroupId=selection.groupId;setBusy(false);renderLists();warnings();}
}
automaticGuideRepair=installAutomaticGuideRepair({key:guideRepairKey,blocked:()=>busy||preview||exportingGuide||!!pdfPreview?.active()||controls.dragging||!!directTools?.active()||!!quickAttach?.active()||pendingProjectSaves>0,run:repairGuideAutomatically,onError:error=>status('Chưa thể tự sửa liên kết: '+error.message)});
function renderLists(){
 refreshInstanceNames();syncSceneBackground();if(chainPickButton){chainPickButton.hidden=!sprocketTeeth(project.parts.find(p=>p.id===selected));chainPickButton.disabled=busy||preview;}
 if(!kitSettings)for(const el of $('parts').querySelectorAll('button'))el.disabled=busy||preview;
 renderLayers({project:()=>project,selection:()=>selectedIds,selectedGroup:()=>selectedGroupId,selectGroup:selectLayerGroup,disabled:()=>busy||preview,locked,name:instanceName,labelVersion:()=>catalog.length,checkpoint,refresh:refreshSelection,save,group:groupSelection,ungroup,select,clean:cleanGroups,anchor:()=>layerAnchor,setAnchor:id=>layerAnchor=id,selectRange:ids=>{select(ids.at(-1)||null,false,false);selectedIds=new Set(ids);renderLists();}});renderStudentGuide();assemblyAssistant?.render();kitSettings?.render();dataView?.render();
 for(const id of ['move','rotate','group','ungroup','duplicate','delete'])$(id).disabled=busy||preview;
 document.body.classList.toggle('group-selection',selectedIds.size>1);
 if(selectedIds.size>1)$('selection').textContent=`${selectedIds.size} parts selected · Ctrl / ⌘ / Shift to change selection`;
 $('group').disabled=busy||preview||selectedIds.size<2;
 $('ungroup').disabled=busy||preview||!project.parts.some(part=>selectedIds.has(part.id)&&part.groupId);
 $('duplicate').disabled=busy||preview||!selected||[...selectedIds].some(id=>locked(project.parts.find(part=>part.id===id)));
 $('delete').disabled=busy||preview||!selected||[...selectedIds].some(id=>locked(project.parts.find(part=>part.id===id)));
 $('save').disabled=busy;
 if($('connect'))$('connect').disabled=busy||preview||!selected||locked(project.parts.find(part=>part.id===selected));
 $('undo').disabled=busy||!history.length;$('redo').disabled=busy||!future.length;
}

function groupSelection(){if(busy||preview||selectedIds.size<2)return;const parts=project.parts.filter(part=>selectedIds.has(part.id));if(parts.some(locked)){status('Unlock selected layers before grouping.');return;}checkpoint();const group={id:crypto.randomUUID(),name:`Group ${project.groups.length+1}`,visible:true,locked:false};groupParts(project,parts.map(p=>p.id),group);selectedGroupId=group.id;cleanGroups();renderLists();save(false);status(`${parts.length} parts grouped as ${group.name}.`);}
function ungroup(groupId){
 if(busy||preview)return;const target=groupId||selectedGroupId,ids=target?groupMembers(project,target).map(part=>part.id):[...selectedIds],parts=project.parts.filter(part=>ids.includes(part.id));
 if(!parts.some(part=>part.groupId))return;if(parts.some(locked)){status('Unlock selected layers before ungrouping.');return;}
 checkpoint();ungroupParts(project,ids,target);selectedGroupId=null;cleanGroups();refreshSelection();save(false);status('Đã bỏ nhóm, giữ nguyên vị trí các chi tiết.');
}
$('group').onclick=groupSelection;$('ungroup').onclick=()=>ungroup();
function libraryCard(part){const b=document.createElement('button'),img=document.createElement('img'),name=document.createElement('span');img.alt='';img.loading='lazy';img.onload=async()=>{img.onload=null;const source=img.src,clean=await croppedPartThumbnail(img);if(img.isConnected&&img.src===source){img.src=clean;img.dataset.backgroundRemoved='true';}};img.src=partPreviewSrc(PLATFORM.id,part.id,PLATFORM.id==='lego'?part.libraryKitId||project.kit?.kitId:undefined);b.dataset.sku=part.id;b.title='Add '+part.name+' · '+part.id;if(partSource(PLATFORM.id,part.id).platform==='vexiq'){const source=partSource(PLATFORM.id,part.id),appearance=iqAppearance({...part,id:source.id,sku:source.id});b.dataset.colorStatus=appearance?'mapped':'source';if(!appearance)b.title+=' · Màu CAD chưa đối chiếu với bộ 228-7755';}b.setAttribute('aria-label','Add '+part.name);name.textContent=isChainLink(PLATFORM.id,part.id)?'Sợi xích · Chain Assembly':part.name;if(isChainLink(PLATFORM.id,part.id)){img.onload=null;img.src='/assembly/iq/chain-assembly-preview.png';b.dataset.action='create-chain';b.setAttribute('aria-label','Tạo sợi xích');b.title='Tạo sợi xích · quấn qua hai nhông, hoặc chuẩn bị dải xích / vòng kín';}if(part.powerPack){
 const packImage=node('span');packImage.className='library-power-pack-preview';
 const batteryImage=node('img');batteryImage.alt='';batteryImage.loading='lazy';batteryImage.draggable=false;
 batteryImage.src=partPreviewSrc(PLATFORM.id,part.powerPack);
 packImage.append(img,batteryImage);b.append(packImage,name);
}else b.append(img,name);if(isChainLink(PLATFORM.id,part.id)){const hint=document.createElement('small');hint.className='library-part-tag';hint.textContent='Quấn qua 2 nhông';b.append(hint);}b.disabled=busy||preview;b.draggable=true;img.draggable=false;b.addEventListener('pointerenter',()=>{if(!busy&&!preview)model(part.id).catch(()=>{});},{once:true});b.ondragstart=e=>{if(busy||preview){e.preventDefault();return;}e.dataTransfer.effectAllowed='copy';e.dataTransfer.setData('application/x-mindx-part',part.id);if(part.powerPack)e.dataTransfer.setData('application/x-mindx-power-pack','1');if(img.complete)e.dataTransfer.setDragImage(img,img.width/2,img.height/2);model(part.id).catch(()=>{});status('Kéo vào vùng 3D rồi thả để thêm '+part.name+'.');};b.ondragend=()=>$('viewport').classList.remove('library-drop-active');b.onclick=()=>add(part);const sku=document.createElement('small');sku.className='library-part-code';sku.textContent=(part.sourcePlatform?part.sourcePlatform.toUpperCase()+' · ':'')+(part.sourceId||part.id);b.append(sku);return b;}
const partsLibrary=installPartsLibrary({platform:PLATFORM.id,catalog:()=>catalog,project:()=>project,card:libraryCard,refresh:()=>renderCatalog(),async navigateKit(kit){if(!await beforeWorkspaceNavigate())return;const target='/assembly/projects?create='+kit.platform+(kit.platform==='lego'?'&kit='+encodeURIComponent(kit.id):'');window.parent.location.assign(target);}});
function renderCatalog(){if(PLATFORM.id==='lego')document.documentElement.dataset.legoKit=project.kit?.kitId||'';partsLibrary.render();kitSettings?.render(true);}

const libraryDrop=$('viewport');
libraryDrop.addEventListener('dragover',e=>{if(!e.dataTransfer.types.includes('application/x-mindx-part')||busy||preview)return;e.preventDefault();e.dataTransfer.dropEffect='copy';libraryDrop.classList.add('library-drop-active');});
libraryDrop.addEventListener('dragleave',e=>{if(!libraryDrop.contains(e.relatedTarget))libraryDrop.classList.remove('library-drop-active');});
libraryDrop.addEventListener('drop',async e=>{libraryDrop.classList.remove('library-drop-active');const sku=e.dataTransfer.getData('application/x-mindx-part');if(!sku)return;e.preventDefault();if(busy||preview)return;let part=catalog.find(p=>p.id===sku);if(!part)return;
 if(e.dataTransfer.getData('application/x-mindx-power-pack')==='1'){
  const source=partSource(PLATFORM.id,part.id);
  if(source.platform!=='vexiq'||source.id!==IQ_POWER_PACK_BRAIN)return;
  const batteryId=part.id.replace(source.id,IQ_POWER_PACK_BATTERY);
  part={...part,powerPack:batteryId};
 }
 const rect=renderer.domElement.getBoundingClientRect(),pointer=new THREE.Vector2((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1),ray=new THREE.Raycaster();ray.setFromCamera(pointer,camera);const hit=ray.intersectObjects([...objects.values()].filter(o=>o.visible),true).find(h=>h.object.isMesh),point=hit?.point.clone()||ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,1,0),0),new THREE.Vector3())||ray.ray.intersectPlane(new THREE.Plane().setFromNormalAndCoplanarPoint(camera.getWorldDirection(new THREE.Vector3()),orbit.target),new THREE.Vector3());if(point)await add(part,point);});
function chainCapacity(part){const modelLimit=Math.min(200,250-project.parts.length);if(!project.kit?.enforce)return modelLimit;const stock=kitReport(project.parts,catalog,project.kit).find(row=>row.skus.includes(part.id));return Math.max(0,Math.min(modelLimit,stock?.remaining||0));}
chainBuilder=installChainBuilder({capacity:chainCapacity,create:addChain,sprockets:()=>project.parts.filter(sprocketTeeth).map(p=>({...p,displayName:instanceName(p)})),selected:()=>[...selectedIds],findSprockets(){if(document.body.classList.contains('hide-library'))$('library-toggle').click();$('search').value='sprocket';$('category').value='transmission';renderCatalog();}});
chainPicker=installChainPicker({suspendTools:()=>{controls.detach();box.visible=false;},resumeTools:refreshSelection,parts:()=>project.parts,objects,scene,camera,canvas:renderer.domElement,name:instanceName,status,invalidate:()=>renderLoop?.invalidate(),blocked:()=>busy||preview||!!pdfPreview?.active()||controls.dragging||!!directTools?.active(),closePreviews:()=>{quickAttach?.close();connectTool?.cancel();},complete(part,firstId,secondId){select(firstId);selectedIds=new Set([firstId,secondId]);renderLists();chainBuilder.open(part,null,{firstId,secondId});}});
chainPickButton=node('button','Nối xích từ nhông này…');chainPickButton.id='chain-connect-selection';chainPickButton.type='button';chainPickButton.hidden=true;chainPickButton.onclick=()=>{const part=catalog.find(p=>isChainLink(PLATFORM.id,p.id));if(part)chainPicker.start(part,selected);else status('Thêm bộ kit VEX IQ trong Cài đặt bộ kit để dùng xích.');};$('precision-fields').after(chainPickButton);
async function addChain(part,{count,shape,firstId,secondId,extraLinks,dropPoint}){
 if(busy||preview)throw Error('Hoàn tất thao tác đang làm trước khi tạo xích.');if(count>chainCapacity(part))throw Error('Không đủ mắt xích trong bộ kit hoặc đã đạt giới hạn chi tiết.');setBusy(true);
 try{
  const prototype=await model(part.id),position=dropPoint?dropPoint.toArray().map(v=>v*1000):stagingPosition(prototype,objects),chain=shape==='sprockets'?buildSprocketChain(part,project.parts.find(p=>p.id===firstId),project.parts.find(p=>p.id===secondId),{extraLinks}):buildChain(part,{count,shape,position});if(chain.parts.length>chainCapacity(part))throw Error('Không đủ mắt xích trong bộ kit hoặc đã đạt giới hạn chi tiết.');assertAdditions(chain.parts);
  const models=await loadPool(chain.parts,()=>model(part.id));const nextObjects=new Map(objects);for(const [i,p] of chain.parts.entries()){transform(models[i],p);nextObjects.set(p.id,models[i]);}
  const minY=Math.min(...models.map(obj=>visibleBounds(obj).min.y));if(shape!=='sprockets'&&minY<.001)for(const [i,p] of chain.parts.entries()){p.position[1]+=(.001-minY)*1000;transform(models[i],p);}
  const before=await inspectFit(),report=await fitChecker.check([...project.parts,...chain.parts],nextObjects),existing=new Set(before.issues.filter(i=>i.kind==='penetration').map(i=>i.key));if(report.issues.some(i=>i.kind==='penetration'&&!existing.has(i.key)))throw Error('Xích chạm xuyên một chi tiết. Chọn vị trí thoáng hơn hoặc tăng số mắt cho vòng kín.');
  checkpoint();project.groups.push(chain.group);project.parts.push(...chain.parts);for(const [i,p] of chain.parts.entries()){const obj=models[i];obj.userData.instance=p.id;objects.set(p.id,obj);scene.add(obj);}shownParts=project.parts;assemblyAssistant?.reset();setBusy(false);mode('translate');selectLayerGroup(chain.group.id,chain.parts[0].id);await save(false);warnings();assemblyAssistant?.frame(chain.parts.map(p=>p.id),camera.position.clone().sub(orbit.target).toArray());renderLoop?.invalidate();status(`Đã tạo sợi xích ${count} mắt · ${shape==='sprockets'?'quấn qua hai nhông':shape==='loop'?'vòng kín':'dải thẳng'}. Di chuyển cả sợi như một group; Ctrl+Z để hoàn tác.`);
 }finally{setBusy(false);}
}
async function add(part,dropPoint=null){
 if(isChainLink(PLATFORM.id,part.id)){if(!busy&&!preview){const chosen=project.parts.filter(p=>selectedIds.has(p.id)&&sprocketTeeth(p)),active=project.parts.find(p=>p.id===selected&&sprocketTeeth(p));if(active&&selectedGroupId)chainPicker.start(part,active.id);else if(chosen.length===1)chainPicker.start(part,chosen[0].id);else chainBuilder.open(part,dropPoint);}return;}chainPicker?.cancel();
 if(project.parts.length+(part.powerPack?2:1+missingElectronics(project.parts,part.id).length)>250){status('Maximum 250 parts.');return;}
 if(busy||preview){status('Trở về mô hình đầy đủ trước khi thêm chi tiết.');return;}
 setBusy(true);
 try{
  const partKit=PLATFORM.id==='lego'?part.libraryKitId||project.kit?.kitId:undefined;
  const previewModel=await model(part.id,undefined,partKit);
  const brainEntry=part.powerPack?catalog.find(entry=>entry.id===part.id):part;
  const item={id:crypto.randomUUID(),sku:part.id,label:brainEntry.name,kind:part.kind,...(partKit?{legoKitId:partKit}:{}),position:[0,0,0],rotation:[0,0,0]};
  let placementModel=previewModel,batteryEntry,batteryModel,group=null;
  if(part.powerPack){
   batteryEntry=catalog.find(entry=>entry.id===part.powerPack);
   if(!batteryEntry)throw Error('Bộ kit này thiếu pin Gen 2.');
   batteryModel=await model(batteryEntry.id);
   const batteryPreview=batteryModel.clone(true);
   transform(batteryPreview,iqBatteryPose(item));
   placementModel=new THREE.Group();
   placementModel.add(previewModel.clone(true),batteryPreview);
   group={id:crypto.randomUUID(),name:IQ_POWER_PACK_NAME,visible:true,locked:false};
  }
  const bounds=dropPoint?visibleBounds(placementModel):null;
  const center=bounds?.getCenter(new THREE.Vector3());
  item.position=dropPoint?[dropPoint.x-center.x,dropPoint.y-bounds.min.y+.001,dropPoint.z-center.z].map(n=>n*1000):stagingPosition(placementModel,objects);
  let additions;
  if(group){
   item.groupId=group.id;
   additions=[item,{id:crypto.randomUUID(),sku:batteryEntry.id,label:batteryEntry.name,kind:batteryEntry.kind,groupId:group.id,...iqBatteryPose(item)}];
  }else{
   additions=withElectronics(project.parts,item,catalog);
   const brain=additions.find(part=>partSource(PLATFORM.id,part.sku).id===IQ_POWER_PACK_BRAIN);
   const battery=brain&&additions.find(part=>part.sku===brain.sku.replace(IQ_POWER_PACK_BRAIN,IQ_POWER_PACK_BATTERY));
   if(battery){
    group={id:crypto.randomUUID(),name:IQ_POWER_PACK_NAME,visible:true,locked:false};
    brain.groupId=group.id;
    Object.assign(battery,iqBatteryPose(brain),{groupId:group.id});
   }
  }
  assertAdditions(additions);
  const models=batteryModel?[previewModel,batteryModel]:await loadPool(additions,p=>p.id===item.id?previewModel:model(p.sku,p.ldrawColorHex,p.legoKitId));
  checkpoint();
  if(group)project.groups.push(group);
  project.parts.push(...additions);assemblyAssistant?.reset();shownParts=project.parts;
  for(const [index,p] of additions.entries()){const obj=models[index];obj.userData.instance=p.id;obj.traverse(mesh=>{if(mesh.userData.cable)mesh.visible=false;});transform(obj,p);obj.visible=layerVisible(project,p);objects.set(p.id,obj);scene.add(obj);}
  setBusy(false);mode('translate');
  if(group&&item.groupId===group.id)selectLayerGroup(group.id,item.id);else select(item.id);
  save();warnings();
  if(group)status('Đã thêm cụm '+IQ_POWER_PACK_NAME+'.');
  else if(additions.length>1)status('Đã thêm chi tiết cùng thiết bị điện tử đi kèm.');
 }catch(error){status('Không thêm được chi tiết: '+error.message);}finally{setBusy(false);}
}

function pose(){return {position:camera.position.toArray(),target:orbit.target.toArray(),up:camera.up.toArray(),projection:assemblyAssistant?.projectionState()};}
function applyPose(p){camera.up.fromArray(p.up||[0,1,0]);camera.position.fromArray(p.position);orbit.target.fromArray(p.target);assemblyAssistant?.restoreProjection(p.projection);orbit.update();}
async function viewGuideStep(i){if(busy||!studentGuide.ready)return;const step=studentGuide.steps[i];if(!step)return;if(!preview)guideReturnPose=pose();preview=true;previewStepIndex=i;await show(step.parts);fit();const guideViews={front:[0,.15,1],rear:[0,.15,-1],left:[-1,.15,0],right:[1,.15,0],top:[0,1,.001],bottom:[0,-1,.001]};if(guideViews[step.view])assemblyAssistant?.frame(null,guideViews[step.view],true);if(step.view==='custom'&&guideCamera(step.camera)){const distance=camera.position.distanceTo(orbit.target);camera.up.fromArray(step.camera.up);camera.position.copy(orbit.target).addScaledVector(new THREE.Vector3(...step.camera.direction),distance);orbit.update();}controls.detach();box.visible=false;for(const part of step.added){const obj=objects.get(part.id);if(!obj)continue;const outline=new VisibleBoxHelper(obj,0x21a474);scene.add(outline);highlights.push(outline);}$('guide-return').hidden=false;status(`Hướng dẫn · Bước ${i+1} / ${studentGuide.steps.length}: ${step.title}`);renderLists();}
async function returnToAssembly(){if(busy)return;preview=false;previewStepIndex=-1;await show();applyPose(guideReturnPose||pose());guideReturnPose=null;$('guide-return').hidden=true;warnings();status('Returned to the complete assembly.');}
$('guide-return').onclick=returnToAssembly;
function remove(){if(!selected||preview||busy)return;if([...selectedIds].some(id=>locked(project.parts.find(part=>part.id===id)))){status('Unlock selected layers before deleting their parts.');return;}checkpoint();const ids=new Set(selectedIds);project.parts=project.parts.filter(p=>!ids.has(p.id));for(const part of project.parts)if(ids.has(part.mate?.target))delete part.mate;cleanGroups();show().then(()=>{save(false);warnings();});}
$('delete').onclick=remove;$('duplicate').onclick=async()=>{
 if(preview||busy||!selected||!selectedIds.size)return;
 setBusy(true);
 try{
  const copied=copySelection(project,[...selectedIds],{groupId:selectedGroupId}),additions=[];
  for(const part of copied.parts)additions.push(...withElectronics([...project.parts,...additions],part,catalog));
  assertAdditions(additions);
  const staged=new THREE.Group();
  for(const part of additions){const obj=await model(part.sku,part.ldrawColorHex,part.legoKitId);obj.traverse(mesh=>{if(mesh.userData.cable)mesh.visible=false;});transform(obj,part);staged.add(obj);}
  const incoming=visibleBounds(staged),occupied=new THREE.Box3();
  for(const obj of objects.values()){const visible=obj.visible;obj.visible=true;occupied.union(visibleBounds(obj));obj.visible=visible;}
  const offset=incoming.isEmpty()||occupied.isEmpty()?25:(occupied.max.x-incoming.min.x)*1000+25;
  for(const part of additions){part.position[0]+=offset;if(part.position.some(value=>Math.abs(value)>10000))throw Error('Move the assembly closer to the origin before duplicating.');}
  checkpoint();project.parts.push(...additions);project.groups.push(...copied.groups);await show();
  select(copied.ids.at(-1));selectedIds=new Set(copied.ids);selectedGroupId=copied.groupId;renderLists();await save(false);warnings();
  status(`Đã nhân bản ${copied.parts.length} chi tiết${copied.groups.length?' và nhóm':''} sang bên phải · Ctrl+Z để hoàn tác.`);
 }catch(error){status('Could not duplicate selection: '+error.message);}
 finally{setBusy(false);renderLists();}
};
async function undo(redo=false){if(busy)return;const from=redo?future:history,to=redo?history:future;if(!from.length)return;to.push(copy(project));project=from.pop();preview=false;previewStepIndex=-1;$('title').value=project.title;await show();if(guideReturnPose)applyPose(guideReturnPose);guideReturnPose=null;$('guide-return').hidden=true;save(false);warnings();}
$('undo').onclick=()=>undo();$('redo').onclick=()=>undo(true);
function mode(value){controls.setMode(value);$('move').setAttribute('aria-pressed',String(value==='translate'));$('rotate').setAttribute('aria-pressed',String(value==='rotate'));}
$('move').onclick=()=>mode('translate');$('rotate').onclick=()=>mode('rotate');$('snap').onchange=syncSnapSettings;
const deg=THREE.MathUtils.radToDeg;
const gizmoDelta=new THREE.Quaternion(),gizmoPosition=new THREE.Vector3(),gizmoRotation=new THREE.Euler();
function flushGizmoMove(){
 const drag=dragStart;
 if(!drag?.pending)return;
 drag.pending=false;
 const {part,obj}=drag,translate=controls.mode==='translate';
 if(!drag.moved){
  drag.moved=true;
  if(translate&&!$('move-joined').checked){
   if(selectedIds.size>1)directTools?.releaseGroup([...selectedIds]);else directTools?.releasePart(part);
  }
 }
 const mm=obj.position.toArray().map(value=>value*1000);
 part.position=translate?snapForDrag(mm,drag.startPosition):mm;
 obj.position.set(part.position[0]/1000,part.position[1]/1000,part.position[2]/1000);
 obj.updateMatrixWorld(true);
 part.rotation=[deg(obj.rotation.x),deg(obj.rotation.y),deg(obj.rotation.z)];
 if(drag.members.length){
  gizmoDelta.copy(obj.quaternion).multiply(drag.inverseRotation);
  for(const member of drag.members){
   member.part.position=gizmoPosition.copy(member.offset).applyQuaternion(gizmoDelta).add(obj.position).multiplyScalar(1000).toArray();
   gizmoRotation.setFromQuaternion(member.rotation.copy(gizmoDelta).multiply(member.startRotation));
   member.part.rotation=[deg(gizmoRotation.x),deg(gizmoRotation.y),deg(gizmoRotation.z)];
   transform(member.obj,member.part);
  }
 }
 if(translate)directTools?.previewTransform(drag.ids,drag.context);
}
controls.addEventListener('dragging-changed',async e=>{
 orbit.enabled=!e.value;
 if(quickAttach?.handlesTransform()){if(!e.value)quickAttach.settlePreview();return;}
 if(e.value){
  const part=project.parts.find(row=>row.id===selected),obj=objects.get(selected);
  if(!part||!obj)return;
  const moveJoined=$('move-joined').checked,context=controls.mode==='translate'||moveJoined?assemblyMatingContext(project.parts,jointReferences):null;
  const ids=moveJoined?[...movingAssemblyIds(project.parts,jointReferences,selected,[...selectedIds],context)]:selectedIds.size>1?[...selectedIds]:[selected];
  if(ids.some(id=>locked(project.parts.find(row=>row.id===id)))){dragStart={blocked:true};status('Cụm có layer bị khóa. Mở khóa trước khi di chuyển.');return;}
  checkpoint();
  const members=ids.filter(id=>id!==selected).flatMap(id=>{
   const member=objects.get(id),row=project.parts.find(p=>p.id===id);
   return member&&row?[{obj:member,part:row,offset:member.position.clone().sub(obj.position),startRotation:member.quaternion.clone(),rotation:new THREE.Quaternion()}]:[];
  });
  dragStart={part,obj,ids,context,members,startPosition:[...part.position],inverseRotation:obj.quaternion.clone().invert(),moved:false,pending:false};
 }else if(dragStart){
  if(dragStart.blocked){dragStart=null;refreshSelection();return;}
  flushGizmoMove();
  if(dragStart.moved&&controls.mode==='translate')directTools?.finishTransform();
  dragStart=null;await save();refreshSelection();warnings();
 }
});
controls.addEventListener('objectChange',()=>{
 if(quickAttach?.handlesTransform()){quickAttach.previewChanged();return;}
 if(dragStart?.blocked){const part=project.parts.find(row=>row.id===selected),obj=objects.get(selected);if(part&&obj)transform(obj,part);return;}
 if(dragStart){dragStart.pending=true;renderLoop?.invalidate();}
});
const marquee=document.createElement('div');marquee.className='selection-marquee';marquee.hidden=true;$('viewport').append(marquee);let boxGesture=null,clickDown;
function projectedBounds(obj,rect){const bounds=visibleBounds(obj);if(bounds.isEmpty())return null;let left=Infinity,top=Infinity,right=-Infinity,bottom=-Infinity;for(const x of [bounds.min.x,bounds.max.x])for(const y of [bounds.min.y,bounds.max.y])for(const z of [bounds.min.z,bounds.max.z]){const point=new THREE.Vector3(x,y,z).project(camera);if(point.z<-1||point.z>1)continue;const px=(point.x+1)*rect.width/2,py=(1-point.y)*rect.height/2;left=Math.min(left,px);right=Math.max(right,px);top=Math.min(top,py);bottom=Math.max(bottom,py);}return Number.isFinite(left)?{left,top,right,bottom}:null;}
function finishBoxSelection(e){const gesture=boxGesture;if(!gesture||e.pointerId!==gesture.pointer)return;boxGesture=null;marquee.hidden=true;renderer.domElement.releasePointerCapture?.(e.pointerId);const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;if(Math.hypot(dx,dy)<4){const rect=renderer.domElement.getBoundingClientRect();mouse.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);ray.setFromCamera(mouse,camera);const hit=ray.intersectObjects([...objects.values()].filter(obj=>obj.visible),true).find(h=>h.object.isMesh);let obj=hit?.object;while(obj&&!obj.userData.instance)obj=obj.parent;select(obj?.userData.instance||null,gesture.additive);return;}const rect=renderer.domElement.getBoundingClientRect(),selection={left:Math.min(gesture.x,e.clientX)-rect.left,top:Math.min(gesture.y,e.clientY)-rect.top,right:Math.max(gesture.x,e.clientX)-rect.left,bottom:Math.max(gesture.y,e.clientY)-rect.top},ids=gesture.additive?new Set(gesture.original):new Set();for(const [id,obj] of objects){if(!obj.visible)continue;const bounds=projectedBounds(obj,rect);if(bounds&&bounds.right>=selection.left&&bounds.left<=selection.right&&bounds.bottom>=selection.top&&bounds.top<=selection.bottom)ids.add(id);}if(!ids.size&&!gesture.additive){select(null);return;}const first=[...ids][0]||null;select(first);selectedIds=ids;renderLists();status(`${ids.size} part${ids.size===1?'':'s'} selected · Ctrl+G to group.`);}
function isTransformHandleAt(e){const rect=renderer.domElement.getBoundingClientRect();if(!rect.width||!rect.height||!controls.object)return false;mouse.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);controls.pointerHover(mouse);return controls.axis!==null;}
let transformPointer=null;
renderer.domElement.addEventListener('pointerdown',e=>{if(e.button!==0||!isTransformHandleAt(e))return;transformPointer=e.pointerId;orbit.enabled=false;},true);
renderer.domElement.addEventListener('pointerup',e=>{if(transformPointer!==e.pointerId)return;transformPointer=null;orbit.enabled=!controls.dragging;});
renderer.domElement.addEventListener('pointercancel',e=>{if(transformPointer!==e.pointerId)return;transformPointer=null;orbit.enabled=true;});
renderer.domElement.addEventListener('pointerdown',e=>{if(e.button!==0||(!e.ctrlKey&&!e.metaKey)||busy||preview||isTransformHandleAt(e)||directTools?.active())return;e.preventDefault();e.stopImmediatePropagation();boxGesture={pointer:e.pointerId,x:e.clientX,y:e.clientY,additive:true,original:[...selectedIds]};marquee.hidden=false;marquee.style.left=`${e.clientX-renderer.domElement.getBoundingClientRect().left}px`;marquee.style.top=`${e.clientY-renderer.domElement.getBoundingClientRect().top}px`;marquee.style.width='0px';marquee.style.height='0px';renderer.domElement.setPointerCapture(e.pointerId);},true);
renderer.domElement.addEventListener('pointermove',e=>{if(!boxGesture||e.pointerId!==boxGesture.pointer)return;e.preventDefault();e.stopImmediatePropagation();const rect=renderer.domElement.getBoundingClientRect();marquee.style.left=`${Math.min(boxGesture.x,e.clientX)-rect.left}px`;marquee.style.top=`${Math.min(boxGesture.y,e.clientY)-rect.top}px`;marquee.style.width=`${Math.abs(e.clientX-boxGesture.x)}px`;marquee.style.height=`${Math.abs(e.clientY-boxGesture.y)}px`;},true);
renderer.domElement.addEventListener('pointerup',e=>{if(!boxGesture||e.pointerId!==boxGesture.pointer)return;e.preventDefault();e.stopImmediatePropagation();finishBoxSelection(e);},true);renderer.domElement.addEventListener('pointercancel',e=>{if(boxGesture?.pointer===e.pointerId){boxGesture=null;marquee.hidden=true;}},true);
renderer.domElement.addEventListener('pointerdown',e=>{clickDown=[e.clientX,e.clientY];});renderer.domElement.addEventListener('pointerup',e=>{if(preview||controls.dragging||controls.axis||!clickDown||Math.hypot(e.clientX-clickDown[0],e.clientY-clickDown[1])>4)return;const rect=renderer.domElement.getBoundingClientRect();mouse.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);ray.setFromCamera(mouse,camera);const hit=ray.intersectObjects([...objects.values()].filter(obj=>obj.visible),true).find(h=>h.object.isMesh);let obj=hit?.object;while(obj&&!obj.userData.instance)obj=obj.parent;const id=obj?.userData.instance;if((e.ctrlKey||e.metaKey||e.shiftKey)||!selectGroupMember(id))select(id,e.ctrlKey||e.metaKey||e.shiftKey);});
function fit(extra){const damping=orbit.enableDamping;orbit.enableDamping=false;orbit.update();const bounds=new THREE.Box3();for(const obj of objects.values())bounds.union(visibleBounds(obj));if(extra)bounds.union(visibleBounds(extra));if(bounds.isEmpty()){camera.position.set(.45,.32,.45);orbit.target.set(0,.04,0);}else{const center=bounds.getCenter(new THREE.Vector3()),size=bounds.getSize(new THREE.Vector3()),radius=Math.max(size.length()/2,.0125),vertical=THREE.MathUtils.degToRad(camera.fov/2),horizontal=Math.atan(Math.tan(vertical)*camera.aspect),distance=radius/Math.sin(Math.min(vertical,horizontal))*1.15;orbit.target.copy(center);camera.position.copy(center).add(new THREE.Vector3(1,.7,1).normalize().multiplyScalar(distance));}assemblyAssistant?.fitProjection();orbit.update();orbit.enableDamping=damping;}
$('fit').onclick=()=>fit();
function download(data,name,type='application/json'){const url=URL.createObjectURL(new Blob([data],{type})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
$('save').onclick=async()=>{if(busy)return;quickAttach?.close();connectTool?.cancel();if(!await save(false,{skipThumbnail:true}))return;download(JSON.stringify(project,null,2),PLATFORM.name.replaceAll(' ','')+'-assembly.json');};
function validateGuidePreferences(value){
 if(!value||typeof value!=='object')return {};
 const result={steps:Object.create(null)};if(guideCamera(value.defaultCamera))result.defaultCamera=guideCamera(value.defaultCamera);if(Array.isArray(value.order)&&value.order.length<=250&&value.order.every(id=>typeof id==='string'&&id.length<26000))result.order=[...new Set(value.order)];
 for(const [key,row] of Object.entries(value.steps||{}).slice(0,250)){if(!row||typeof row!=='object')continue;result.steps[key]={...(typeof row.title==='string'?{title:row.title.slice(0,160)}:{}),...(typeof row.note==='string'?{note:row.note.slice(0,1200)}:{}),...(row.view!==undefined?{view:['auto','custom','front','rear','left','right','top','bottom'].includes(row.view)?row.view:'auto'}:{}),...(guideCamera(row.camera)?{camera:guideCamera(row.camera)}:{}),...(row.page?{page:guidePage(row.page)}:{})};}return result;
}
function validate(data){
 const ids=new Set(catalog.map(part=>part.id)),vector=value=>Array.isArray(value)&&value.length===3&&value.every(number=>typeof number==='number'&&Number.isFinite(number)&&Math.abs(number)<=10000),groups=Array.isArray(data?.groups)?data.groups:[];
 if(groups.length>250||new Set(groups.map(group=>group.id)).size!==groups.length||groups.some(group=>typeof group.id!=='string'||group.id.length>100||typeof group.name!=='string'||!group.name.trim()||group.name.length>120||(group.visible!==undefined&&typeof group.visible!=='boolean')||(group.locked!==undefined&&typeof group.locked!=='boolean')))throw Error('Invalid group/layer data.');
 if(!validGroupTree(groups))throw Error('Nhóm bị vòng lặp hoặc thiếu nhóm cha.');
 const groupIds=new Set(groups.map(group=>group.id)),parts=rows=>Array.isArray(rows)&&rows.length<=250&&new Set(rows.map(part=>part.id)).size===rows.length&&rows.every(part=>typeof part.id==='string'&&part.id.length<=100&&ids.has(part.sku)&&typeof part.label==='string'&&part.label.length<=200&&vector(part.position)&&vector(part.rotation)&&(!part.groupId||groupIds.has(part.groupId)));
 if((data?.platform&&data.platform!==PLATFORM.id)||(PLATFORM.id==='vexiq'&&data?.platform!=='vexiq'))throw Error('File thuộc thư viện khác. Mở từ màn hình dự án để chọn đúng VEX GO / VEX IQ.');
 if(data?.version!==1||typeof data.title!=='string'||data.title.length>120||!parts(data.parts))throw Error('Invalid project format, unavailable part or too many parts.');
 return {version:1,platform:PLATFORM.id,title:data.title,hideCables:!!data.hideCables,parts:normalizeMatedJoints(copy(data.parts).map(p=>({...p,kind:catalog.find(entry=>entry.id===p.sku)?.kind})),jointReferences),groups:groups.map(group=>({id:group.id,name:group.name.trim(),visible:group.visible!==false,locked:!!group.locked,collapsed:!!group.collapsed,...(group.parentId?{parentId:group.parentId}:{})})),kit:data.kit?validateKitProfile(data.kit,catalog,PLATFORM.id):null,guidePreferences:validateGuidePreferences(data.guidePreferences),editorSettings:{snapPreset:snapPreset(data.editorSettings,PLATFORM.id),liveGuidePreview:true,sceneBackground:data.editorSettings?.sceneBackground==='black'?'black':'white'},steps:[]};
}
$('open').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>5e6)throw Error('Project file must be smaller than 5 MB.');const raw=JSON.parse(await file.text());if(PROJECT_ID&&raw.platform&&raw.platform!==PLATFORM.id){quickAttach?.close();connectTool?.cancel();window.parent.postMessage({type:'assembly-import-request',project:raw},location.origin);return;}await kitCatalogLoader.ensure(raw.kit,raw.parts);const next=validate(raw);if(PROJECT_ID){window.parent.postMessage({type:'assembly-import-request',project:next},location.origin);return;}window.dispatchEvent(new Event('assembly-project-replaced'));checkpoint();project=next;preview=false;$('title').value=project.title;await show();save(false);warnings();fit();}catch(error){status(error.message);}finally{e.target.value='';}};
$('title').onchange=()=>{checkpoint();project.title=$('title').value.trim()||'My '+PLATFORM.name+' build';save();};
$('new').onclick=async()=>{if(await beforeWorkspaceNavigate())window.parent.postMessage({type:'assembly-new-request'},location.origin);};
window.addEventListener('message',async event=>{if(event.origin!==location.origin||event.source!==window.parent||event.data?.type!=='assembly-new-result'||!event.data.approved||busy)return;checkpoint();project={version:1,platform:PLATFORM.id,title:'My '+PLATFORM.name+' build',parts:[],groups:[],steps:[]};preview=false;$('title').value=project.title;renderCatalog();await show();save();warnings();});
function syncPanels(){for(const [id,cls] of [['library-toggle','hide-library'],['panel-toggle','hide-panel']])$(id).setAttribute('aria-expanded',String(!document.body.classList.contains(cls)));}
function togglePanel(cls){document.body.classList.toggle(cls);if(matchMedia('(max-width:650px)').matches&&!document.body.classList.contains(cls))document.body.classList.add(cls==='hide-library'?'hide-panel':'hide-library');syncPanels();}
$('library-toggle').onclick=()=>togglePanel('hide-library');$('panel-toggle').onclick=()=>togglePanel('hide-panel');$('close-library').onclick=()=>togglePanel('hide-library');$('close-inspector').onclick=()=>togglePanel('hide-panel');
document.addEventListener('keydown',e=>{const editing=/INPUT|TEXTAREA|SELECT/.test(e.target.tagName),modifier=e.ctrlKey||e.metaKey,key=e.key.toLowerCase(),mutation=['v','r','delete','backspace'].includes(key)||(modifier&&['z','s','g','j'].includes(key));if(mutation&&!editing){quickAttach?.close();connectTool?.cancel();}if(modifier&&key==='p'){e.preventDefault();openPDFPreview();return;}if(modifier&&key==='s'){e.preventDefault();if(!busy){e.target.blur?.();$('save').click();}return;}if(editing||busy)return;if(modifier&&key==='j'){e.preventDefault();if(!controls.dragging&&!directTools?.active())$('duplicate').click();return;}if(modifier&&key==='g'){e.preventDefault();if(e.shiftKey)ungroup();else groupSelection();return;}if(key==='f'){e.preventDefault();fit();}if(e.key==='Escape'){quickAttach?.close();connectTool?.cancel();if(boxGesture){boxGesture=null;marquee.hidden=true;}select(null);}if(e.key==='Delete'||e.key==='Backspace'){e.preventDefault();remove();}if(!modifier&&key==='v')mode('translate');if(!modifier&&key==='r')mode('rotate');if(modifier&&key==='z'){e.preventDefault();undo(e.shiftKey);}});
let librarySearchTimer=null;$('search').oninput=()=>{clearTimeout(librarySearchTimer);librarySearchTimer=setTimeout(renderCatalog,120);};$('category').onchange=renderCatalog;
const smallScreen=matchMedia('(max-width:650px)');if(smallScreen.matches)document.body.classList.add('hide-library','hide-panel');smallScreen.addEventListener('change',event=>{if(event.matches)document.body.classList.add('hide-library','hide-panel');syncPanels();});syncPanels();
new ResizeObserver(()=>{document.body.style.setProperty('--header-height',document.querySelector('header').getBoundingClientRect().height+'px');document.body.style.setProperty('--panel-top',($('viewport').getBoundingClientRect().top)+'px');const r=$('viewport').getBoundingClientRect();if(!r.width||!r.height)return;camera.aspect=r.width/r.height;camera.updateProjectionMatrix();renderer.setSize(r.width,r.height);renderLoop?.invalidate();}).observe($('viewport'));
const cameraNavigation=installCameraNavigation({canvas:renderer.domElement,camera,orbit,blocked:()=>busy||!!pdfPreview?.active()||preview||controls.dragging||!!directTools?.active()});
renderer.domElement.title='W/A/S/D: move camera · Right mouse: look around · Q/E: down/up · Shift: faster';
renderLoop=createRenderScheduler(time=>{if(printMedia.matches||exportingGuide||pdfPreview?.active())return false;directTools?.flushMove?.();flushGizmoMove();for(const part of shownParts||project.parts){const obj=objects.get(part.id);if(obj){obj.visible=(preview||layerVisible(project,part))&&(preview||assemblyAssistant?.visible(part.id)!==false);setEmbeddedCableVisibility(obj,!preview&&!part.wiring&&!project.hideCables);}}connectedWires.update(preview?[]:(shownParts||project.parts),!!project.hideCables);if(box.visible)box.update();cameraNavigation.update(time);const orbitMoving=orbit.update(),interacting=orbitMoving||cameraNavigation.moving()||controls.dragging||!!directTools?.active(),ratio=Math.min(devicePixelRatio,interacting?1:1.5);if(ratio!==renderDPR){renderDPR=ratio;renderer.setPixelRatio(ratio);}connectTool?.updateMarkers();quickAttach?.update();directTools?.update();renderer.render(scene,camera);return orbitMoving||cameraNavigation.moving();},{inputFilter:event=>!event.target?.closest?.('#guide-workbench,#guide-pdf-preview')});
orbit.addEventListener('change',()=>renderLoop.invalidate());controls.addEventListener('change',()=>renderLoop.invalidate());
// Asynchronous library, guide and inspector changes may complete after input.
new MutationObserver(records=>{const changed=records.filter(row=>!(row.target.closest?.('#guide-workbench,#guide-pdf-preview')||row.target.parentElement?.closest('#guide-workbench,#guide-pdf-preview')));if(changed.length){renderLoop.invalidate();}}).observe(document.body,{childList:true,subtree:true,characterData:true});
printMedia.addEventListener('change',()=>renderLoop.invalidate());
function node(tag,text){const el=document.createElement(tag);if(text!==undefined)el.textContent=text;return el;}
async function exportStudentGuide({zip=false}={}){
 if(busy)return false;
 if(project.kit?.enforce&&kitReport(project.parts,catalog,project.kit).some(row=>row.remaining<0)){status('Guide export failed: Mô hình vượt số lượng bộ kit. Mở File → Cài đặt bộ kit để xem linh kiện đang thiếu.');return false;}
 renderStudentGuide(true);
 if(!studentGuide.ready){status(studentGuide.blockers.join(' '));return false;}
 if(!renderer.isDataRenderer&&!await ensureGuideAudit())return false;
 if(renderer.isDataRenderer&&zip){status('Xuất ảnh ZIP cần WebGL. Bạn vẫn có thể xuất PDF dữ liệu.');return false;}
 if(renderer.isDataRenderer){printDataGuide(project,studentGuide,$('print-guide'));status('Bản hướng dẫn dữ liệu sẵn sàng. Chọn Save as PDF trong hộp in.');return true;}
 const savedPose=guideReturnPose||pose(),container=$('print-guide');container.replaceChildren();preview=false;setBusy(true);exportingGuide=true;
 const savedBackground=scene.background.clone(),savedGridVisible=grid.visible;let printRenderer=null;
 try{
  printRenderer=createGuideRenderer();
  const fullParts=project.parts,finalParts=new Map(fullParts.map(p=>[p.id,p]));
  preview=true;await show(fullParts);setBusy(true);applyPose(savedPose);const fitResult=await inspectFit(fullParts);
  // Overlapping bodies (a flexed diagonal brace, an off-grid connector) are a
   // model warning, not a reason to withhold the whole guide. Name the pairs.
   const overlaps=fitResult.issues.filter(issue=>issue.kind==='penetration');
   const overlapNote=overlaps.length?` Lưu ý: mô hình còn ${overlaps.length} cặp chi tiết chồng lấn (${overlaps.slice(0,3).map(issue=>[issue.a,issue.b].map(id=>partName(finalParts.get(id)||{sku:id})).join(' / ')).join('; ')}${overlaps.length>3?'; …':''}) — xem Fit review và kiểm tra khi lắp thật.`:'';
  scene.background.set('#ffffff');grid.visible=false;
  controls.detach();box.visible=false;
  container.append(prepPaper(project,catalog,PLATFORM));
  const rendered=[];
  for(let i=0;i<studentGuide.steps.length;i++){
   const step=studentGuide.steps[i],stepObjects=new Map();
   // A cumulative step is a subset of the checked final poses. Removing pieces
   // cannot introduce new geometric intersections; reject any edited pose instead.
   for(const part of step.parts){const final=finalParts.get(part.id);if(!final||JSON.stringify([part.position,part.rotation])!==JSON.stringify([final.position,final.rotation]))throw Error('A guide step changed the saved CAD pose. Regenerate the guide.');const obj=objects.get(part.id);if(!obj)throw Error('Missing CAD object for guide step.');stepObjects.set(part.id,obj);}
   if(step.guideSupport){
    const support=objects.get(step.guideSupport.id);
    if(!support)throw Error('Missing reference CAD object for guide step.');
    stepObjects.set(step.guideSupport.id,support);
   }
   status(`Đang xuất bước ${i+1} / ${studentGuide.steps.length}…`);await new Promise(requestAnimationFrame);
   controls.detach();box.visible=false;const shots=printRenderer.render(stepObjects,step,jointReferences,{contacts:guideContacts(),markers2D:true});
   rendered.push({step,index:i,shots});
  }
  // VEX layout: two small consecutive steps share a page unless the author chose one step per page.
  const pairing=project.guidePreferences?.layout!=='single';
  for(let k=0;k<rendered.length;k++){
   const a=rendered[k],b=rendered[k+1];
   if(pairing&&b&&pairableStep(a.step)&&pairableStep(b.step)){container.append(stepPairPaper([a,b],studentGuide.steps.length,PLATFORM,project.kit?.kitId));k++;}
   else container.append(stepPaper(a.step,a.index,studentGuide.steps.length,a.shots,PLATFORM,project.kit?.kitId));
  }
  await show(fullParts);setBusy(true);for(const obj of objects.values())obj.traverse(mesh=>{if(mesh.userData.cable)mesh.visible=false;});container.append(finishedPaper(project,printRenderer.completed(objects)));
  await readyPaperImages(container);if(zip){const bytes=await packageGuide(container,project,studentGuide,catalog);downloadFile(bytes,'application/zip','build-guide.zip');status('Đã xuất ZIP: ảnh từng bước, HTML offline và mô hình JSON.'+overlapNote);}else{window.print();status('Student guide is ready. Choose Save as PDF in the print dialog.'+overlapNote);}return true;
 }catch(error){status('Guide export failed: '+error.message);return false;}
 finally{exportingGuide=false;printRenderer?.dispose();scene.background.copy(savedBackground);grid.visible=savedGridVisible;preview=false;previewStepIndex=-1;await show();applyPose(savedPose);guideReturnPose=null;$('guide-return').hidden=true;warnings();}
}
$('export').onclick=openPDFPreview;if($('guide-export'))$('guide-export').onclick=openPDFPreview;
if(PLATFORM.id==='vexgo')installWiring({parts:()=>project.parts,name:partName,locked,busy:()=>busy,checkpoint,save,project:()=>project});
assemblyAssistant=installAssemblyAssistant({project:()=>project,catalog:()=>catalog,references:jointReferences,objects,camera,orbit,canvas:renderer.domElement,bounds:visibleBounds,selected:()=>selected,selection:()=>[...selectedIds],name:instanceName,select,status,fit,blocked:()=>busy||!!pdfPreview?.active()||preview||controls.dragging||!!directTools?.active(),closePreviews:()=>{quickAttach?.close();connectTool?.cancel();}});
connectionSuggestions=installConnectionSuggestions({parts:()=>project.parts,references:jointReferences,isLocked:id=>locked(project.parts.find(p=>p.id===id)),blocked:()=>busy||preview||!!pdfPreview?.active()||controls.dragging||!!directTools?.active(),closePreviews:()=>{quickAttach?.close();connectTool?.cancel();},name:partName,preview:p=>partPreviewSrc(PLATFORM.id,p.sku,p.legoKitId||project.kit?.kitId),locate(ids){select(ids.at(-1));selectedIds=new Set(ids);renderLists();assemblyAssistant.frame(ids,camera.position.clone().sub(orbit.target).toArray());renderLoop?.invalidate();},connect(c){select(c.sourceId);connectTool.begin(c);assemblyAssistant.frame([c.sourceId,c.targetId],camera.position.clone().sub(orbit.target).toArray(),true);renderLoop?.invalidate();},choose(id,ref){select(id);quickAttach.openReference(id,ref);renderLoop?.invalidate();}});
installDrivePreview({project:()=>project,references:jointReferences,objects,selected:()=>selected,connections:()=>assemblyAssistant.data().connections,blocked:()=>busy||!!pdfPreview?.active()||preview||controls.dragging||!!directTools?.active(),closePreviews:()=>{quickAttach?.close();connectTool?.cancel();},resetInspection:()=>assemblyAssistant.reset(),setBusy,detach:()=>{controls.detach();box.visible=false;},check:inspectFit,transform,refresh:refreshSelection});
setBusy(true);
let startupError=null;
try{catalog=initialCatalog;kitCatalogLoader=createKitCatalogLoader({platform:PLATFORM.id,catalog,references:jointReferences});$('count').textContent=catalog.length;renderCatalog();connectTool=await installConnectTool({references:jointReferences,scene,camera,canvas:renderer.domElement,objects,controls,box,project:()=>project,selected:()=>selected,selection:()=>selectedIds,isLocked:id=>locked(project.parts.find(p=>p.id===id)),reveal:()=>{if(document.body.classList.contains('hide-panel'))$('panel-toggle').click();$('inspector-tab-0')?.click();},busy:()=>busy||!!chainPicker?.active(),preview:()=>preview,transform,select,checkpoint,save,warnings,status});quickAttach=await installQuickAttach({references:jointReferences,selection:()=>selectedIds,isLocked:id=>locked(project.parts.find(p=>p.id===id)),captureSelection:()=>({active:selected,ids:[...selectedIds],groupId:selectedGroupId}),restoreSelection(snapshot){const ids=snapshot.ids.filter(id=>project.parts.some(p=>p.id===id));select(ids.includes(snapshot.active)?snapshot.active:ids.at(-1)||null);selectedIds=new Set(ids);selectedGroupId=project.groups.some(g=>g.id===snapshot.groupId)?snapshot.groupId:null;renderLists();},scene,camera,orbit,canvas:renderer.domElement,objects,controls,box,catalog,project:()=>project,selected:()=>selected,busy:()=>busy||!!chainPicker?.active(),preview:()=>preview,connectActive:()=>connectTool.active()||!!directTools?.active(),fit,model,transform,select,checkpoint,show,save,warnings,status,withElectronics,assertAdditions,pose,applyPose,connectExisting:(id,ref)=>connectTool.begin({sourceId:id,sourceRef:ref})});directTools=await installDirectTools({references:jointReferences,invalidate:()=>renderLoop?.invalidate(),snapPosition:snapForDrag,scene,camera,canvas:renderer.domElement,objects,controls,orbit,box,project:()=>project,selected:()=>selected,selection:()=>selectedIds,busy:()=>busy||!!chainPicker?.active(),preview:()=>preview,quickActive:()=>quickAttach.active(),connectActive:()=>connectTool.active(),transform,select,selectGroup:selectGroupMember,checkpoint:()=>{const redo=copy(future);checkpoint();return redo;},discardCheckpoint:redo=>{history.pop();future=redo||[];},refreshSelection,moveOthers:moveJoined,openPinAt:(id,point)=>quickAttach.openPinAt(id,point),closePreviews:()=>{quickAttach.close();connectTool.cancel();},isLocked:id=>locked(project.parts.find(part=>part.id===id)),assertAdditions,save,warnings,status});let draft=localStorage.getItem(key);if(!PROJECT_ID){const legacy=localStorage.getItem('mindx-vexgo-assembly-v1');if(legacy){try{if(JSON.parse(legacy).platform==='vexiq'){if(!localStorage.getItem('mindx-vexiq-assembly-v1'))localStorage.setItem('mindx-vexiq-assembly-v1',legacy);if(PLATFORM.id==='vexiq'&&!draft)draft=legacy;if(PLATFORM.id==='vexgo'&&key==='mindx-vexgo-assembly-v1')draft=null;}}catch{}}}if(draft){const data=JSON.parse(draft);await kitCatalogLoader.ensure(data.kit,data.parts);project=validate(data);}else if(PROJECT_ID)throw Error('Không tìm thấy dự án trên trình duyệt này. Mở từ màn hình dự án.');$('title').value=project.title;renderCatalog();await show();save();warnings();}catch(error){startupError=error;status('Không mở được editor: '+error.message);}
if(startupError){setBusy(true);throw startupError;}
kitSettings=installKitSettings({project:()=>project,catalog:()=>catalog,busy:()=>busy||!!chainPicker?.active(),preview:()=>preview,gesture:()=>controls.dragging||!!directTools?.active(),closePreviews:()=>{quickAttach?.close();connectTool?.cancel();},status,
 async prepareKit(kit){await kitCatalogLoader.ensure(kit,project.parts);},
 async configure(kit){const before=copy(project),historyBefore=copy(history),futureBefore=copy(future);checkpoint();project.kit=kit;if(PLATFORM.id==='lego')await show();renderLists();if(kit.additionalKits?.length)partsLibrary.showProject();renderCatalog();if(!await save(false)){project=before;history=historyBefore;future=futureBefore;renderLists();renderCatalog();throw Error('Không lưu được bộ kit. Kiểm tra bộ nhớ trình duyệt.');}const missing=kitReport(project.parts,catalog,kit).filter(row=>row.remaining<0);status(missing.length?`Đã đặt ${totalKitCount(kit)} bộ kit · mô hình còn thiếu ${missing.length} loại linh kiện.`:`Đã áp dụng ${totalKitCount(kit)} bộ kit.`);}
});kitSettings.render();
if(PLATFORM.id!=='lego')installSimulationLauncher({blocked:()=>busy||!!pdfPreview?.active()||preview||controls.dragging||!!directTools?.active(),closePreviews:()=>{quickAttach?.close();connectTool?.cancel();},save,status});

const editorBindings={prepareKit:(kit,parts=project.parts)=>kitCatalogLoader.ensure(kit,parts),context:{projectId:PROJECT_ID,platform:PLATFORM.id},save,project:()=>project,catalog:()=>catalog,references:jointReferences,locked,selection:()=>[...selectedIds],select:ids=>{select(ids.at(-1),false,false);selectedIds=new Set(ids);renderLists();},busy:()=>busy||!!pdfPreview?.active()||pendingProjectSaves>0||preview||controls.dragging||!!directTools?.active()||!!quickAttach?.active()||!!kitSettings?.active()||!!chainPicker?.active(),clean:cleanGroups,withElectronics:(item,additions=[])=>withElectronics([...project.parts,...additions],item,catalog),assertAdditions,staging:async sku=>stagingPosition(await model(sku),objects),fitReport:inspectFit,review:()=>assemblyAssistant.data(),guide:()=>{renderStudentGuide(true);return studentGuide;},auditGuide:async()=>{
  // Startup repair can change poses while a check is running; retry on the settled model.
  for(let attempt=0;attempt<5;attempt++){for(let i=0;i<600&&(busy||preview||!project.parts.every(p=>objects.has(p.id)));i++)await new Promise(resolve=>setTimeout(resolve,100));if(busy||preview)return false;if(await ensureGuideAudit()&&guideAuditResult?.stamp===JSON.stringify(project.parts))return true;}
  return false;
 },exportGuide:async({format='pdf'}={})=>{if(!['pdf','zip'].includes(format))throw Error('Định dạng guide không hợp lệ.');if(format==='zip'&&renderer.isDataRenderer)throw Error('Xuất ảnh ZIP cần WebGL.');const success=await exportStudentGuide({zip:format==='zip'});if(!success)throw Error($('status').textContent||'Guide export failed.');return {printRequested:format==='pdf',downloadRequested:format==='zip',format,requiresReview:!!studentGuide.reviewRequired};},undo,
 async transaction(fn,{replaceAll=false}={}){const before=copy(project),redo=copy(future),historyBefore=copy(history),selectionBefore=[...selectedIds];setBusy(true);
  try{const baseline=await inspectFit();const old=new Set(baseline.issues.filter(i=>i.kind==='penetration').map(i=>i.key));const result=await fn();assertKitChange(before.parts,project.parts,catalog,project.kit);if(JSON.stringify(before.kit)!==JSON.stringify(project.kit))renderCatalog();await show();setBusy(true);const check=await inspectFit();const collisions=check.issues.filter(i=>i.kind==='penetration'&&(replaceAll||!old.has(i.key)));if(collisions.length)throw Error('New body penetration: '+collisions.map(i=>i.key).join(', '));history.push(before);if(history.length>60)history.shift();future=[];if(!await save(false))throw Error('Could not save project');warnings();return result;}
  catch(error){project=before;history=historyBefore;future=redo;await show();select(selectionBefore.at(-1)||null);selectedIds=new Set(selectionBefore);await save(false);throw error;}
  finally{setBusy(false);renderLists();}
 }
};
installAssemblyAPI(editorBindings);
installDocumentAPI({...editorBindings,platform:PLATFORM.id,mode:renderer.isDataRenderer?'data':'webgl',replace(next){project=validate(next);selected=null;selectedIds.clear();controls.detach();box.visible=false;$('title').value=project.title;renderCatalog();}});
