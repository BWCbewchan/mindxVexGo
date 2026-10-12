import {partPreviewSrc} from './part-preview.js?v=library-color-75';
import {applyIQAppearance,iqAppearance} from './iq/color-profile.js?v=library-color-75';
import {PLATFORM,PROJECT_ID,assetUrl} from './platform.js';
import {projectKey,saveProject,loadProject} from './project-store.js';
import {installAssemblyAPI} from './ai-api.js?v=usability-72';
import {inventoryPages} from './guide-inventory.js';
import {installAssemblyAssistant} from './assembly-assistant.js?v=usability-71';
import {groupAncestors,groupMembers,layerLocked,layerVisible,validGroupTree,groupSelection as groupParts,dissolveGroup} from './assembly-review.js';
import {editGuide,stepKey} from './guide-editing.js';
import {installDrivePreview} from './drive-preview.js';
import {renderLayers} from './layers-tree-panel.js?v=usability-71';
let layerAnchor=null;
import {visibleBounds,VisibleBoxHelper} from './visible-bounds.js';
import {installWiring} from './wiring.js?v=toggle-59';
import {installWiring3D} from './wiring-3d.js?v=soft-cable-55';
import {installInspectorChrome} from './inspector-chrome.js?v=inspector-22';
import {installEditorChrome} from './editor-chrome.js?v=duplicate-21';
import {installCameraNavigation} from './camera-navigation.js?v=free-nav-17';
import {optimizeStaticModel} from './render-model.js';
import {generateStudentGuide} from './guide-sequence.js?v=usability-72';
import {createGuideRenderer} from './guide-renderer.js?v=usability-72';
import {repairAssemblyLinks} from './repair-links.js?v=repair-depth-38';
import {collisionClient} from './collision-client.js?v=integral-pegs-61';
const fitChecker=collisionClient();
import {stagingPosition} from './staging-position.js';
import {withElectronics,missingElectronics} from './electronics.js';
import {installDirectTools} from './direct-tools.js?v=visible-bounds-60';
import {installQuickAttach} from './quick-attach.js?v=usability-72';
import {linkedPoses,normalizeMatedJoints} from './mating.js?v=fit-tolerance-36';
import {constrainJoints} from './joint-constraints.js?v=compatibility-27';
const jointReferences=(await(await fetch(assetUrl('connectors.json?v=compatibility-27'), {cache:'no-store'})).json()).parts;
import {installConnectTool} from './connect-tool.js?v=compatibility-27';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {TransformControls} from 'three/addons/controls/TransformControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
const $=id=>document.getElementById(id),copy=v=>structuredClone(v),key=PROJECT_ID?projectKey(PLATFORM.id,PROJECT_ID):['api-cart','competition','original-platform'].includes(new URLSearchParams(location.search).get('demo'))?'mindx-vexgo-demo-'+new URLSearchParams(location.search).get('demo'):'mindx-vexgo-assembly-v1';
let shownParts=null,repairReportParts=null;
let assemblyAssistant=null;
let exportingGuide=false;
const printMedia=matchMedia('print');
let connectTool=null,quickAttach=null,directTools=null,selectedIds=new Set();
let catalog=[],project={version:1,platform:PLATFORM.id,title:'My '+PLATFORM.name+' build',parts:[],groups:[],steps:[]},studentGuide={ready:false,steps:[],blockers:[],notes:[]},selected=null,preview=false,busy=false,history=[],future=[],objects=new Map(),cache=new Map(),dragStart=null,highlights=[],guideReturnPose=null;
const scene=new THREE.Scene();scene.background=new THREE.Color('#edf2f1');
const connectedWires=installWiring3D(scene,()=>objects,message=>status(message));
const camera=new THREE.PerspectiveCamera(40,1,.001,100);camera.position.set(.45,.32,.45);
let renderer;
try{renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});}catch{ $('status').textContent='3D requires WebGL. Enable hardware acceleration or try a supported browser.';throw Error('WebGL unavailable'); }
renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;$('viewport').append(renderer.domElement);
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
function visibleTransformAxisAt(pointer){if(controls.getMode()!=='translate')return null;const rect=renderer.domElement.getBoundingClientRect();if(!rect.width||!rect.height)return null;camera.updateMatrixWorld(true);scene.updateMatrixWorld(true);const px=rect.left+(pointer.x+1)*rect.width/2,py=rect.top+(1-pointer.y)*rect.height/2,root=controls.getHelper();let nearest=null;root.traverse(object=>{if(!object.isMesh||!['X','Y','Z'].includes(object.name)||object.tag==='helper')return;for(let parent=object;parent&&parent!==root;parent=parent.parent)if(!parent.visible)return;const materials=Array.isArray(object.material)?object.material:[object.material];if(!materials.some(material=>material?.opacity===undefined||material.opacity>.8))return;const bounds=new THREE.Box3().setFromObject(object);if(bounds.isEmpty())return;let left=Infinity,top=Infinity,right=-Infinity,bottom=-Infinity;for(const x of [bounds.min.x,bounds.max.x])for(const y of [bounds.min.y,bounds.max.y])for(const z of [bounds.min.z,bounds.max.z]){const point=new THREE.Vector3(x,y,z).project(camera);if(point.z<-1||point.z>1)continue;const sx=rect.left+(point.x+1)*rect.width/2,sy=rect.top+(1-point.y)*rect.height/2;left=Math.min(left,sx);right=Math.max(right,sx);top=Math.min(top,sy);bottom=Math.max(bottom,sy);}const dx=Math.max(left-px,0,px-right),dy=Math.max(top-py,0,py-bottom);if(dx>9||dy>9)return;const distance=Math.hypot(dx,dy);if(!nearest||distance<nearest.distance)nearest={axis:object.name,distance};});return nearest?.axis||null;}
let collisionTimer=null,collisionReport={issues:[],truncated:false};
const issuePanel=document.createElement('section');issuePanel.className='collision-panel';issuePanel.setAttribute('aria-label','Fit review');$('precision-fields').after(issuePanel,$('warnings'));
const protection=document.createElement('label'),protectInput=document.createElement('input');protectInput.type='checkbox';protectInput.checked=true;protectInput.id='collision-protection';protection.append(protectInput,document.createTextNode(' Prevent new body penetration'));document.querySelector('nav').append(protection);
function inspectFit(parts=preview?(shownParts||project.parts):project.parts){return fitChecker.check(parts,objects);}
function partName(part){return part?.label&&part.label!==part.sku&&!/^\d{3}-\d{4}-/.test(part.label)?part.label:catalog.find(item=>item.id===part?.sku)?.name||part?.sku||'Part';}
function instanceName(part){const name=partName(part),same=project.parts.filter(p=>partName(p)===name);return same.length>1?`${name} · ${same.findIndex(p=>p.id===part.id)+1}`:name;}
function groupFor(part){return project.groups.find(group=>group.id===part?.groupId);}
function locked(part){return layerLocked(project,part);}
function selectGroupMember(id){const part=project.parts.find(row=>row.id===id),group=groupFor(part);if(!group){select(id);return false;}const ids=groupMembers(project,group.id).map(row=>row.id);select(id);selectedIds=new Set(ids);renderLists();return true;}
function cleanGroups(){const used=new Set(project.parts.flatMap(part=>[part.groupId,...groupAncestors(project,part).map(g=>g.id)]).filter(Boolean));project.groups=project.groups.filter(group=>used.has(group.id));}
const toolOptions=document.createElement('details');toolOptions.className='tool-options';
const optionsSummary=document.createElement('summary');optionsSummary.textContent='Options';
const optionsBody=document.createElement('div');optionsBody.className='tool-options-body';
for(const id of ['snap','move-joined','magnet','collision-protection']){const label=$(id).closest('label');$(id).setAttribute('aria-label',label.textContent.trim());optionsBody.append(label);}
toolOptions.append(optionsSummary,optionsBody);document.querySelector('nav').append(toolOptions);
document.querySelector('header a').href='/assembly';document.querySelector('header b').textContent='/ '+PLATFORM.name;document.title=PLATFORM.name+' Assembly · mindX';
installEditorChrome();
installInspectorChrome();
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
async function save(check=true,options={}){try{if(check&&!await guardTransform(options))return false;}catch(error){status('Fit check failed. Edit not saved: '+error.message);return false;}try{project.connections=assemblyAssistant?.data().connections||[];renderStudentGuide();project.steps=[];project.platform=PLATFORM.id;if(PROJECT_ID){saveProject(PLATFORM.id,PROJECT_ID,project);window.parent.postMessage({type:'assembly-project-saved',title:project.title,projectId:PROJECT_ID,platform:PLATFORM.id},location.origin);scheduleProjectThumbnail();}else localStorage.setItem(key,JSON.stringify(project));status(`Draft saved locally · ${project.parts.length} parts · ${studentGuide.ready?`${studentGuide.steps.length} guide steps generated`:'guide needs review'}`);return true;}catch{status('Browser storage is full. Save project to a file.');return false;}}
let thumbnailTimer=null;function scheduleProjectThumbnail(){clearTimeout(thumbnailTimer);if(!PROJECT_ID||!project.parts.length)return;thumbnailTimer=setTimeout(()=>{if(busy||preview||controls.dragging||exportingGuide)return;try{const canvas=document.createElement('canvas');canvas.width=400;canvas.height=240;canvas.getContext('2d').drawImage(renderer.domElement,0,0,400,240);saveProject(PLATFORM.id,PROJECT_ID,project,{thumbnail:canvas.toDataURL('image/jpeg',.7)});}catch{}},1500);}
function checkpoint(){history.push(copy(project));if(history.length>60)history.shift();future=[];}
function setBusy(value){busy=value;controls.enabled=!value;for(const el of document.querySelectorAll('#objects button,#parts button,#groups button,#groups input,#guide-steps button'))el.disabled=value||preview;if($('connect'))$('connect').disabled=value||preview||!selected||locked(project.parts.find(part=>part.id===selected));$('save').disabled=value;for(const el of $('transforms').querySelectorAll('input'))el.disabled=value;if($('guide-return'))$('guide-return').disabled=value;for(const id of ['open','export','guide-export','guide-repair','new','move','rotate','group','ungroup','duplicate','delete','undo','redo','fit','title'])if($(id))$(id).disabled=value;}
async function model(id){if(!cache.has(id))cache.set(id,loader.loadAsync(assetUrl(`parts/${id}/model.glb`)).then(g=>{g.scene.traverse(obj=>{if(!obj.isMesh)return;obj.castShadow=false;obj.receiveShadow=false;for(const material of Array.isArray(obj.material)?obj.material:[obj.material]){if(material.isMeshStandardMaterial){material.metalness=0;material.roughness=.85;material.needsUpdate=true;}}});if(PLATFORM.id==='vexgo'&&id.startsWith('269-')&&id!=='269-6685-000'){
 const body=new THREE.Box3();for(const ref of jointReferences[id]||[])body.expandByPoint(new THREE.Vector3().fromArray(ref.point).multiplyScalar(.001));body.expandByScalar(.008);if(id==='269-6695-000')body.set(new THREE.Vector3(-.013,-.013,-.0195),new THREE.Vector3(.013,.013,.001));g.scene.updateMatrixWorld(true);
 g.scene.traverse(obj=>{if(!obj.isMesh)return;const bounds=new THREE.Box3().setFromObject(obj),size=bounds.getSize(new THREE.Vector3()),dims=[size.x,size.y,size.z].sort((a,b)=>a-b);
 obj.userData.cable=(id==='269-6686-000'&&bounds.max.y>.039)||(dims[2]>.08&&dims[1]<.012)||(!body.isEmpty()&&!body.intersectsBox(bounds));});
 if(g.scene.children.some(()=>{let cable=false;g.scene.traverse(o=>{if(o.userData.cable)cable=true;});return cable;}))return g.scene;
 }if(PLATFORM.id==='vexiq')applyIQAppearance(g.scene,catalog.find(part=>part.id===id));return optimizeStaticModel(g.scene);}));return (await cache.get(id)).clone(true);}
function moveJoined(before,id){const changed=project.parts.find(p=>p.id===id),graph=$('move-joined').checked?before:before.map(p=>({...p,mate:undefined}));for(const [otherId,pose] of linkedPoses(graph,id,changed,[...selectedIds])){const part=project.parts.find(p=>p.id===otherId);if(locked(part))continue;Object.assign(part,pose);const obj=objects.get(otherId);if(obj)transform(obj,part);}}
function transform(obj,part){obj.position.fromArray(part.position.map(v=>v/1000));obj.rotation.set(...part.rotation.map(THREE.MathUtils.degToRad));obj.updateMatrixWorld(true);}
async function show(parts=project.parts){assemblyAssistant?.reset();shownParts=parts;setBusy(true);controls.detach();box.visible=false;for(const h of highlights){scene.remove(h);h.geometry.dispose();h.material.dispose();}highlights=[];for(const obj of objects.values())scene.remove(obj);objects.clear();try{for(const part of parts){const obj=await model(part.sku);obj.userData.instance=part.id;const cableMeshes=[];obj.traverse(mesh=>{if(mesh.userData.cable)cableMeshes.push(mesh);});for(const mesh of cableMeshes)mesh.visible=false;transform(obj,part);obj.visible=preview||layerVisible(project,part);objects.set(part.id,obj);scene.add(obj);}select(null);renderLists();}catch(error){status('Could not load CAD part: '+error.message);}finally{setBusy(false);renderLists();}}
function refreshSelection(){const ids=new Set(selectedIds);select(selected);selectedIds=ids;renderLists();}
function select(id,additive=false){if(quickAttach?.active())quickAttach.close();if(connectTool?.active())connectTool.cancel();if(additive&&id){if(selectedIds.has(id))selectedIds.delete(id);else selectedIds.add(id);if(!selectedIds.has(id))id=[...selectedIds].at(-1)||null;}else selectedIds=new Set(id?[id]:[]);selected=id;controls.detach();box.visible=false;const part=project.parts.find(p=>p.id===id),obj=objects.get(id);$('selection').textContent=part?`${partName(part)}${groupFor(part)?` · ${groupFor(part).name}`:''}${locked(part)?' · Locked':''}`:'Select a part in the scene.';$('transforms').replaceChildren();if(part&&obj&&!preview&&!locked(part)){controls.attach(obj);box.setFromObject(obj);box.visible=true;for(const kind of ['position','rotation'])for(let axis=0;axis<3;axis++){const label=document.createElement('label');label.textContent=(kind==='position'?'mm ':'° ')+['X','Y','Z'][axis];const input=document.createElement('input');input.type='number';input.step=kind==='position'?'1':'15';input.value=part[kind][axis].toFixed(2);let committed=input.value;const commit=()=>{if(input.value===committed)return;committed=input.value;const v=Number(input.value);if(!Number.isFinite(v)||Math.abs(v)>10000){input.value=part[kind][axis];return;}const before=copy(project.parts);checkpoint();part[kind][axis]=v;transform(obj,part);moveJoined(before,part.id);box.update();save();warnings();};input.onchange=commit;input.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();commit();}};label.append(input);$('transforms').append(label);}}renderLists();}
function warnings(){
 clearTimeout(collisionTimer);$('warnings').textContent='Đang kiểm tra hình học…';
 collisionTimer=setTimeout(async()=>{
  try{const stamp=JSON.stringify(project.parts),result=await inspectFit();if(stamp!==JSON.stringify(project.parts))return;collisionReport=result;issuePanel.replaceChildren(node('h3','Kiểm tra lắp ráp'));
   const expected=result.issues.filter(i=>i.kind==='joint'),remaining=result.issues.filter(i=>i.kind!=='joint');
   for(const issue of remaining){const button=node('button');button.className='fit-issue '+issue.kind;const names=[issue.a,issue.b].map(id=>instanceName(project.parts.find(p=>p.id===id)));button.textContent=(issue.kind==='penetration'?'Cấn thân: ':'Tiếp xúc cần xem: ')+names.join(' / ');button.onclick=()=>{select(issue.a);select(issue.b,true);status('Kiểm tra cặp đang chọn; đổi góc nhìn để thấy vùng tiếp xúc.');};issuePanel.append(button);}
   if(expected.length){const details=node('details');details.append(node('summary',`${expected.length} tiếp xúc tại khớp lắp`),node('p','Tiếp xúc chốt/lỗ có thể là bình thường. Xem từng khớp và độ sâu ở phần Khớp lắp & giữ trục.'));issuePanel.append(details);}
   const hard=result.issues.filter(i=>i.kind==='penetration').length;$('warnings').textContent=`${hard} lỗi cấn thân phát hiện · ${expected.length} tiếp xúc tại khớp${result.truncated?' · danh sách rút gọn':''}. Kiểm tra CAD có lấy mẫu, cần thử độ chắc bằng bộ thật.`;assemblyAssistant?.render();
  }catch(error){$('warnings').textContent='Chưa kiểm tra được: '+error.message;}
 },120);
}

function renderGroups(){const list=$('groups');if(!list)return;list.replaceChildren();$('group-count').textContent=String(project.groups.length);for(const group of project.groups){const row=document.createElement('div');row.className='layer-row';const selectButton=document.createElement('button');selectButton.className='layer-select';selectButton.textContent=group.name;selectButton.setAttribute('aria-label',`Select group ${group.name}`);selectButton.setAttribute('aria-pressed',String(project.parts.filter(part=>part.groupId===group.id).every(part=>selectedIds.has(part.id))&&selectedIds.size>0));selectButton.onclick=()=>{const ids=project.parts.filter(part=>part.groupId===group.id).map(part=>part.id);if(!ids.length)return;selectGroupMember(ids[0]);};const rename=document.createElement('input');rename.value=group.name;rename.maxLength=60;rename.setAttribute('aria-label',`Rename group ${group.name}`);rename.onchange=()=>{const name=rename.value.trim();if(!name){rename.value=group.name;return;}checkpoint();group.name=name;renderLists();save();};const visible=document.createElement('button');visible.textContent=group.visible?'◉':'○';visible.title=group.visible?'Hide group':'Show group';visible.setAttribute('aria-label',`${group.visible?'Hide':'Show'} group ${group.name}`);visible.onclick=()=>{checkpoint();group.visible=!group.visible;for(const part of project.parts.filter(part=>part.groupId===group.id)){const obj=objects.get(part.id);if(obj)obj.visible=group.visible;}if(!group.visible&&[...selectedIds].some(id=>project.parts.some(part=>part.id===id&&part.groupId===group.id)))select(null);else renderLists();save();};const lock=document.createElement('button');lock.textContent=group.locked?'🔒':'🔓';lock.title=group.locked?'Unlock group':'Lock group';lock.setAttribute('aria-label',`${group.locked?'Unlock':'Lock'} group ${group.name}`);lock.setAttribute('aria-pressed',String(group.locked));lock.onclick=()=>{checkpoint();group.locked=!group.locked;refreshSelection();save();};const remove=document.createElement('button');remove.textContent='Ungroup';remove.title=`Ungroup ${group.name}`;remove.onclick=()=>ungroup(group.id);for(const control of [selectButton,rename,visible,lock,remove])control.disabled=busy||preview;row.append(selectButton,rename,visible,lock,remove);list.append(row);}}
function changeGuidePreferences(preferences){
 if(busy||preview)return false;
 const generated=generateStudentGuide(project.parts,{references:jointReferences,nameFor:partName,inferConnections:true});
 const candidate=editGuide(generated,preferences);if(candidate.editError){status(candidate.editError);return false;}
 checkpoint();project.guidePreferences=preferences;save(false);renderLists();status('Đã cập nhật hướng dẫn. Ctrl+Z để hoàn tác.');return true;
}
function moveGuideStep(from,to){
 if(from<0||to<0||to>=studentGuide.steps.length)return;
 const order=studentGuide.steps.map(stepKey),[id]=order.splice(from,1);order.splice(to,0,id);
 changeGuidePreferences({...copy(project.guidePreferences||{}),order});
}
function installGuideEditing(article,step,index){
 const actions=node('div');actions.className='guide-step-actions';
 for(const [label,to] of [['Lên',index-1],['Xuống',index+1]]){const button=node('button',label);button.setAttribute('aria-label',`${label} bước ${index+1}`);button.disabled=busy||preview||to<0||to>=studentGuide.steps.length;button.onclick=()=>moveGuideStep(index,to);actions.append(button);}
 const editor=node('details');editor.className='guide-edit';editor.append(node('summary','Sửa hướng dẫn / góc nhìn'));
 const title=node('input');title.value=step.title;title.maxLength=160;title.setAttribute('aria-label',`Tiêu đề bước ${index+1}`);
 const note=node('textarea');note.value=step.note;note.maxLength=1200;note.setAttribute('aria-label',`Hướng dẫn bước ${index+1}`);
 const view=node('select');view.setAttribute('aria-label',`Góc nhìn bước ${index+1}`);for(const [id,label] of [['auto','Tự chọn góc thấy khớp'],['front','Trước'],['rear','Sau'],['left','Trái'],['right','Phải'],['top','Trên'],['bottom','Dưới']]){const option=node('option',label);option.value=id;view.append(option);}view.value=step.view||'auto';
 const apply=node('button','Áp dụng');apply.disabled=busy||preview;apply.onclick=()=>{const preferences=copy(project.guidePreferences||{});preferences.steps||={};preferences.steps[stepKey(step)]={title:title.value,note:note.value,view:view.value};changeGuidePreferences(preferences);};for(const [text,field] of [['Tiêu đề',title],['Hướng dẫn',note],['Góc nhìn',view]]){const label=node('label',text);label.append(field);editor.append(label);}editor.append(apply);article.append(actions,editor);
 article.draggable=!busy&&!preview;article.ondragstart=e=>{if(e.target.closest('input,textarea,select')){e.preventDefault();return;}e.dataTransfer.setData('application/x-vex-guide',String(index));};article.ondragover=e=>e.preventDefault();article.ondrop=e=>{e.preventDefault();const raw=e.dataTransfer.getData('application/x-vex-guide');if(raw!==''&&Number.isInteger(Number(raw)))moveGuideStep(Number(raw),index);};
}
function renderStudentGuide(){
 if(repairReportParts!==null&&repairReportParts!==JSON.stringify(project.parts)){repairReportParts=null;if($('guide-repair-status'))$('guide-repair-status').textContent='';}
 studentGuide=editGuide(generateStudentGuide(project.parts,{references:jointReferences,nameFor:partName,inferConnections:true}),project.guidePreferences);
 const count=$('guide-count'),summary=$('guide-summary'),list=$('guide-steps');
 count.textContent=studentGuide.ready?`${studentGuide.steps.length} steps`:'';
 list.replaceChildren();
 if(studentGuide.editError){const warning=node('p',studentGuide.editError+' Đang dùng thứ tự tự động để giữ đúng phụ thuộc.');warning.className='guide-warning';list.append(warning);}
 if(!studentGuide.ready){summary.textContent=studentGuide.blockers[0]||'Connect the model parts to generate a build sequence.';for(const issue of studentGuide.blockers.slice(1)){const p=node('p',issue);p.className='guide-blocker';list.append(p);}}
 else summary.textContent=`${studentGuide.steps.length} steps generated from the saved part connections. Preview a step or export the complete PDF.`;
 for(const note of studentGuide.notes){const warning=node('p',note);warning.className='guide-warning';list.append(warning);}
 for(let i=0;i<studentGuide.steps.length;i++){
  const step=studentGuide.steps[i],article=node('article');article.className='student-guide-step';
  const open=node('button',`Step ${i+1} · ${step.title}`);open.className='student-guide-open';open.disabled=busy;open.setAttribute('aria-label',`Preview guide step ${i+1}: ${step.title}`);open.onclick=()=>viewGuideStep(i);article.append(open,node('p',step.note));
  const added=node('div');added.className='guide-added';for(const part of step.added){const item=node('span'),thumb=node('img');thumb.src=partPreviewSrc(PLATFORM.id,part.sku);thumb.alt='';thumb.loading='lazy';item.append(thumb,node('span',part.name));added.append(item);}article.append(added);installGuideEditing(article,step,i);list.append(article);
 }
 $('export').disabled=busy||!studentGuide.ready;if($('guide-export'))$('guide-export').disabled=busy||!studentGuide.ready;
 if($('guide-repair'))$('guide-repair').disabled=busy||preview||project.parts.length<2;
}
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
function renderLists(){
 for(const el of $('parts').querySelectorAll('button'))el.disabled=busy||preview;
 renderLayers({project:()=>project,selection:()=>selectedIds,disabled:()=>busy||preview,locked,name:instanceName,checkpoint,refresh:refreshSelection,save,group:groupSelection,ungroup,select,clean:cleanGroups,anchor:()=>layerAnchor,setAnchor:id=>layerAnchor=id,selectRange:ids=>{select(ids.at(-1)||null);selectedIds=new Set(ids);renderLists();}});renderStudentGuide();assemblyAssistant?.render();
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

function groupSelection(){if(busy||preview||selectedIds.size<2)return;const parts=project.parts.filter(part=>selectedIds.has(part.id));if(parts.some(locked)){status('Unlock selected layers before grouping.');return;}checkpoint();const group={id:crypto.randomUUID(),name:`Group ${project.groups.length+1}`,visible:true,locked:false};groupParts(project,parts.map(p=>p.id),group);cleanGroups();renderLists();save();status(`${parts.length} parts grouped as ${group.name}.`);}
function ungroup(groupId){
 if(busy||preview)return;const ids=new Set(selectedIds),complete=project.groups.filter(g=>{const members=groupMembers(project,g.id);return members.length&&members.length===ids.size&&members.every(p=>ids.has(p.id));});
 const group=groupId?project.groups.find(g=>g.id===groupId):complete.find(g=>!groupAncestors(project,g).some(a=>complete.includes(a)));
 if(group){if(locked(group))return;checkpoint();dissolveGroup(project,group.id);}else{const parts=project.parts.filter(p=>ids.has(p.id)&&p.groupId);if(!parts.length||parts.some(locked))return;checkpoint();for(const p of parts)delete p.groupId;}
 cleanGroups();renderLists();save(false);status('Đã bỏ nhóm, giữ nguyên vị trí các chi tiết.');
}
$('group').onclick=groupSelection;$('ungroup').onclick=()=>ungroup();
function renderCatalog(){const q=$('search').value.toLowerCase(),cat=$('category').value;$('parts').replaceChildren();for(const part of catalog.filter(p=>(!cat||p.category===cat||(cat.startsWith('kind-')&&p.kind===cat.slice(5))||(cat==='pins'&&connectTool?.isPin(p.id)))&&(p.name+' '+p.id).toLowerCase().includes(q))){const b=document.createElement('button'),img=document.createElement('img'),name=document.createElement('span');img.src=partPreviewSrc(PLATFORM.id,part.id);img.alt='';img.loading='lazy';b.title='Add '+part.name+' · '+part.id;if(PLATFORM.id==='vexiq'){const appearance=iqAppearance(part);b.dataset.colorStatus=appearance?'mapped':'source';if(!appearance)b.title+=' · Màu CAD chưa đối chiếu với bộ 228-7755';}b.setAttribute('aria-label','Add '+part.name);name.textContent=part.name;b.append(img,name);b.disabled=busy||preview;b.onclick=()=>add(part);$('parts').append(b);}if(!$('parts').children.length){const empty=document.createElement('p');empty.className='hint';empty.textContent='No matching parts. Try another name, code or category.';$('parts').append(empty);}}
async function add(part){if(project.parts.length+1+missingElectronics(project.parts,part.id).length>250){status('Not enough room for this part and its electronics. Maximum 250 parts.');return;}if(busy||preview){status('Return to assembly before adding parts.');return;}try{const previewModel=await model(part.id);if(busy||preview)return;const item={id:crypto.randomUUID(),sku:part.id,label:part.name,kind:part.kind,position:stagingPosition(previewModel,objects),rotation:[0,0,0]},additions=withElectronics(project.parts,item,catalog);checkpoint();project.parts.push(...additions);await show();select(item.id);save();warnings();if(additions.length>1)status('Part added with missing Brain / battery. Position and connect them before building.');}catch(error){status('Could not add part: '+error.message);}}
function pose(){return {position:camera.position.toArray(),target:orbit.target.toArray(),projection:assemblyAssistant?.projectionState()};}
function applyPose(p){camera.position.fromArray(p.position);orbit.target.fromArray(p.target);assemblyAssistant?.restoreProjection(p.projection);orbit.update();}
async function viewGuideStep(i){if(busy||!studentGuide.ready)return;const step=studentGuide.steps[i];if(!step)return;if(!preview)guideReturnPose=pose();preview=true;await show(step.parts);fit();const guideViews={front:[0,.15,1],rear:[0,.15,-1],left:[-1,.15,0],right:[1,.15,0],top:[0,1,.001],bottom:[0,-1,.001]};if(guideViews[step.view])assemblyAssistant?.frame(null,guideViews[step.view],true);controls.detach();box.visible=false;for(const part of step.added){const obj=objects.get(part.id);if(!obj)continue;const outline=new VisibleBoxHelper(obj,0x21a474);scene.add(outline);highlights.push(outline);}$('guide-return').hidden=false;status(`Hướng dẫn · Bước ${i+1} / ${studentGuide.steps.length}: ${step.title}`);renderLists();}
async function returnToAssembly(){if(busy)return;preview=false;await show();applyPose(guideReturnPose||pose());guideReturnPose=null;$('guide-return').hidden=true;warnings();status('Returned to the complete assembly.');}
$('guide-return').onclick=returnToAssembly;
function remove(){if(!selected||preview||busy)return;if([...selectedIds].some(id=>locked(project.parts.find(part=>part.id===id)))){status('Unlock selected layers before deleting their parts.');return;}checkpoint();const ids=new Set(selectedIds);project.parts=project.parts.filter(p=>!ids.has(p.id));for(const part of project.parts)if(ids.has(part.mate?.target))delete part.mate;cleanGroups();show().then(()=>{save(false);warnings();});}
$('delete').onclick=remove;$('duplicate').onclick=async()=>{if(preview||busy||!selected||project.parts.length>=250)return;const part=project.parts.find(p=>p.id===selected);if(project.parts.length+1+missingElectronics(project.parts,part.sku).length>250){status('Not enough room for required electronics.');return;}try{const next=copy(part);delete next.mate;delete next.locked;next.id=crypto.randomUUID();const previewModel=await model(next.sku);transform(previewModel,{position:[0,0,0],rotation:next.rotation});next.position=stagingPosition(previewModel,objects);checkpoint();project.parts.push(...withElectronics(project.parts,next,catalog));await show();select(next.id);save();warnings();}catch(error){status('Could not duplicate part: '+error.message);}};
async function undo(redo=false){if(busy)return;const from=redo?future:history,to=redo?history:future;if(!from.length)return;to.push(copy(project));project=from.pop();preview=false;$('title').value=project.title;await show();save(false);warnings();}
$('undo').onclick=()=>undo();$('redo').onclick=()=>undo(true);
function mode(value){controls.setMode(value);$('move').setAttribute('aria-pressed',String(value==='translate'));$('rotate').setAttribute('aria-pressed',String(value==='rotate'));}
$('move').onclick=()=>mode('translate');$('rotate').onclick=()=>mode('rotate');$('snap').onchange=()=>{controls.setTranslationSnap($('snap').checked?.001:null);controls.setRotationSnap($('snap').checked?THREE.MathUtils.degToRad(15):null);};
controls.addEventListener('dragging-changed',async e=>{orbit.enabled=!e.value;if(quickAttach?.handlesTransform()){if(!e.value)quickAttach.settlePreview();return;}if(e.value){checkpoint();dragStart={moved:false};}else if(dragStart){dragStart=null;await save();refreshSelection();warnings();}});
controls.addEventListener('objectChange',()=>{if(quickAttach?.handlesTransform()){quickAttach.previewChanged();return;}if(!selected)return;const before=copy(project.parts),obj=objects.get(selected),part=project.parts.find(p=>p.id===selected);if(dragStart&&!dragStart.moved){dragStart.moved=true;if(controls.mode==='translate'&&!$('move-joined').checked)directTools?.releasePart(part);}part.position=obj.position.toArray().map(v=>v*1000);part.rotation=[obj.rotation.x,obj.rotation.y,obj.rotation.z].map(THREE.MathUtils.radToDeg);moveJoined(before,selected);box.update();});
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
$('save').onclick=()=>{if(busy)return;quickAttach?.close();connectTool?.cancel();download(JSON.stringify(project,null,2),PLATFORM.name.replaceAll(' ','')+'-assembly.json');};
function validateGuidePreferences(value){
 if(!value||typeof value!=='object')return {};
 const result={steps:{}};if(Array.isArray(value.order)&&value.order.length<=250&&value.order.every(id=>typeof id==='string'&&id.length<26000))result.order=[...new Set(value.order)];
 for(const [key,row] of Object.entries(value.steps||{}).slice(0,250)){if(!row||typeof row!=='object')continue;result.steps[key]={title:typeof row.title==='string'?row.title.slice(0,160):'',note:typeof row.note==='string'?row.note.slice(0,1200):'',view:['auto','front','rear','left','right','top','bottom'].includes(row.view)?row.view:'auto'};}return result;
}
function validate(data){
 const ids=new Set(catalog.map(part=>part.id)),vector=value=>Array.isArray(value)&&value.length===3&&value.every(number=>typeof number==='number'&&Number.isFinite(number)&&Math.abs(number)<=10000),groups=Array.isArray(data?.groups)?data.groups:[];
 if(groups.length>250||new Set(groups.map(group=>group.id)).size!==groups.length||groups.some(group=>typeof group.id!=='string'||group.id.length>100||typeof group.name!=='string'||!group.name.trim()||group.name.length>120||(group.visible!==undefined&&typeof group.visible!=='boolean')||(group.locked!==undefined&&typeof group.locked!=='boolean')))throw Error('Invalid group/layer data.');
 if(!validGroupTree(groups))throw Error('Nhóm bị vòng lặp hoặc thiếu nhóm cha.');
 const groupIds=new Set(groups.map(group=>group.id)),parts=rows=>Array.isArray(rows)&&rows.length<=250&&new Set(rows.map(part=>part.id)).size===rows.length&&rows.every(part=>typeof part.id==='string'&&part.id.length<=100&&ids.has(part.sku)&&typeof part.label==='string'&&part.label.length<=200&&vector(part.position)&&vector(part.rotation)&&(!part.groupId||groupIds.has(part.groupId)));
 if((data?.platform&&data.platform!==PLATFORM.id)||(PLATFORM.id==='vexiq'&&data?.platform!=='vexiq'))throw Error('File thuộc thư viện khác. Mở từ màn hình dự án để chọn đúng VEX GO / VEX IQ.');
 if(data?.version!==1||typeof data.title!=='string'||data.title.length>120||!parts(data.parts))throw Error('Invalid project format, unavailable part or too many parts.');
 return {version:1,platform:PLATFORM.id,title:data.title,hideCables:!!data.hideCables,parts:normalizeMatedJoints(copy(data.parts).map(p=>({...p,kind:catalog.find(entry=>entry.id===p.sku)?.kind})),jointReferences),groups:groups.map(group=>({id:group.id,name:group.name.trim(),visible:group.visible!==false,locked:!!group.locked,collapsed:!!group.collapsed,...(group.parentId?{parentId:group.parentId}:{})})),guidePreferences:validateGuidePreferences(data.guidePreferences),steps:[]};
}
$('open').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>5e6)throw Error('Project file must be smaller than 5 MB.');const next=validate(JSON.parse(await file.text()));if(PROJECT_ID){window.parent.postMessage({type:'assembly-import-request',project:next},location.origin);return;}checkpoint();project=next;preview=false;$('title').value=project.title;await show();save(false);warnings();fit();}catch(error){status(error.message);}finally{e.target.value='';}};
$('title').onchange=()=>{checkpoint();project.title=$('title').value.trim()||'My '+PLATFORM.name+' build';save();};
$('new').onclick=()=>{window.parent.postMessage({type:'assembly-new-request'},location.origin);};
window.addEventListener('message',async event=>{if(event.origin!==location.origin||event.source!==window.parent||event.data?.type!=='assembly-new-result'||!event.data.approved||busy)return;checkpoint();project={version:1,platform:PLATFORM.id,title:'My '+PLATFORM.name+' build',parts:[],groups:[],steps:[]};preview=false;$('title').value=project.title;await show();save();warnings();});
function syncPanels(){for(const [id,cls] of [['library-toggle','hide-library'],['panel-toggle','hide-panel']])$(id).setAttribute('aria-expanded',String(!document.body.classList.contains(cls)));}
function togglePanel(cls){document.body.classList.toggle(cls);if(matchMedia('(max-width:650px)').matches&&!document.body.classList.contains(cls))document.body.classList.add(cls==='hide-library'?'hide-panel':'hide-library');syncPanels();}
$('library-toggle').onclick=()=>togglePanel('hide-library');$('panel-toggle').onclick=()=>togglePanel('hide-panel');$('close-library').onclick=()=>togglePanel('hide-library');$('close-inspector').onclick=()=>togglePanel('hide-panel');
document.addEventListener('keydown',e=>{const editing=/INPUT|TEXTAREA|SELECT/.test(e.target.tagName),modifier=e.ctrlKey||e.metaKey,key=e.key.toLowerCase(),mutation=['v','r','delete','backspace'].includes(key)||(modifier&&['z','s','g','j'].includes(key));if(mutation&&!editing){quickAttach?.close();connectTool?.cancel();}if(modifier&&key==='s'){e.preventDefault();if(!busy){e.target.blur?.();$('save').click();}return;}if(editing||busy)return;if(modifier&&key==='j'){e.preventDefault();if(!controls.dragging&&!directTools?.active())$('duplicate').click();return;}if(modifier&&key==='g'){e.preventDefault();if(e.shiftKey)ungroup();else groupSelection();return;}if(key==='f'){e.preventDefault();fit();}if(e.key==='Escape'){quickAttach?.close();connectTool?.cancel();if(boxGesture){boxGesture=null;marquee.hidden=true;}select(null);}if(e.key==='Delete'||e.key==='Backspace'){e.preventDefault();remove();}if(!modifier&&key==='v')mode('translate');if(!modifier&&key==='r')mode('rotate');if(modifier&&key==='z'){e.preventDefault();undo(e.shiftKey);}});
$('search').oninput=renderCatalog;$('category').onchange=renderCatalog;
const smallScreen=matchMedia('(max-width:650px)');if(smallScreen.matches)document.body.classList.add('hide-library','hide-panel');smallScreen.addEventListener('change',event=>{if(event.matches)document.body.classList.add('hide-library','hide-panel');syncPanels();});syncPanels();
new ResizeObserver(()=>{document.body.style.setProperty('--header-height',document.querySelector('header').getBoundingClientRect().height+'px');document.body.style.setProperty('--panel-top',($('viewport').getBoundingClientRect().top)+'px');const r=$('viewport').getBoundingClientRect();if(!r.width||!r.height)return;camera.aspect=r.width/r.height;camera.updateProjectionMatrix();renderer.setSize(r.width,r.height);}).observe($('viewport'));
const cameraNavigation=installCameraNavigation({canvas:renderer.domElement,camera,orbit,blocked:()=>busy||preview||controls.dragging||!!directTools?.active()});
renderer.domElement.title='W/A/S/D: move camera · Right mouse: look around · Q/E: down/up · Shift: faster';
renderer.setAnimationLoop(time=>{if(printMedia.matches||exportingGuide)return;connectedWires.update(preview?[]:(shownParts||project.parts),!!project.hideCables);for(const part of shownParts||project.parts){const obj=objects.get(part.id);if(obj){obj.visible=(preview||layerVisible(project,part))&&(preview||assemblyAssistant?.visible(part.id)!==false);obj.traverse(mesh=>{if(mesh.userData.cable)mesh.visible=!preview&&!part.wiring&&!project.hideCables;});}}if(box.visible)box.update();cameraNavigation.update(time);orbit.update();connectTool?.updateMarkers();quickAttach?.update();directTools?.update();renderer.render(scene,camera);});
function node(tag,text){const el=document.createElement(tag);if(text!==undefined)el.textContent=text;return el;}
async function exportStudentGuide(){
 if(busy)return;
 renderStudentGuide();
 if(!studentGuide.ready){status(studentGuide.blockers.join(' '));return;}
 const savedPose=guideReturnPose||pose(),container=$('print-guide');container.replaceChildren();preview=false;setBusy(true);exportingGuide=true;
 const savedBackground=scene.background.clone(),savedGridVisible=grid.visible;let printRenderer=null;
 try{
  printRenderer=createGuideRenderer();
  const fullParts=project.parts,counts=new Map();for(const part of fullParts)counts.set(part.sku,(counts.get(part.sku)||0)+1);
  preview=true;await show(fullParts);setBusy(true);applyPose(savedPose);const fitResult=await inspectFit(fullParts);
  if(fitResult.issues.some(issue=>issue.kind==='penetration'))throw Error('Resolve detected body penetration before exporting. Select a pair in Fit review.');
  scene.background.set('#ffffff');grid.visible=false;
  controls.detach();box.visible=false;
  const header=(label)=>{const row=node('div');row.className='guide-document-header';const heading=node('div');heading.className='guide-document-title';const icon=node('span');icon.className='guide-document-icon';icon.setAttribute('aria-hidden','true');icon.innerHTML=label==='CHUẨN BỊ'?'<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 5h16a2 2 0 0 1 2 2v21H6V7a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M11 12h10M11 17h10M11 22h7M12 3h8v5h-8z" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>':'<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M13 3h6l1 4 3 1 3-2 4 5-2 3v4l2 3-4 5-3-2-3 1-1 4h-6l-1-4-3-1-3 2-4-5 2-3v-4l-2-3 4-5 3 2 3-1z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><circle cx="16" cy="16" r="4" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>';heading.append(icon,node('span',label));const logo=node('img');logo.className='guide-document-logo';logo.src='/mindx-logo-color-mark.png';logo.alt='mindX Tech & AI School';row.append(heading,logo);const rule=node('div');rule.className='guide-document-rule';const dot=node('span');rule.append(dot);return [row,rule];};
  const prepPages=inventoryPages(counts,catalog);
  prepPages.forEach((groups,index)=>{
   const prep=node('article');prep.className='guide-page guide-prep';const [prepHeader,prepRule]=header('CHUẨN BỊ');prep.append(prepHeader,prepRule,node('h1',project.title));
   const inventory=node('div');inventory.className='guide-droplet-inventory';
   const items=groups.flatMap(group=>group.items.map(part=>({...part,categoryTitle:group.title})));
   const columns=Math.min(8,Math.max(3,Math.ceil(items.length/3))),rows=Math.ceil(items.length/columns);
   inventory.style.setProperty('--droplet-columns',String(columns));inventory.style.setProperty('--droplet-image-height',Math.min(38,Math.max(16,142/rows-12))+'mm');
   for(let offset=0;offset<items.length;offset+=columns){const row=node('div');row.className='guide-droplet-row';
    for(const part of items.slice(offset,offset+columns)){const card=node('div');card.className='guide-droplet-part';const thumb=node('img');thumb.src=partPreviewSrc(PLATFORM.id,part.id);thumb.alt=part.name;const quantity=node('strong',`${part.count}×`);quantity.className='droplet-quantity';const name=node('span',part.name),category=node('small',part.categoryTitle);card.append(thumb,quantity,name,category);row.append(card);}inventory.append(row);
   }
   prep.append(inventory,node('p','Xếp linh kiện theo nhóm trước khi lắp.'));container.append(prep);
  });
  for(let i=0;i<studentGuide.steps.length;i++){
   const step=studentGuide.steps[i],stepObjects=new Map();
   // A cumulative step is a subset of the checked final poses. Removing pieces
   // cannot introduce new geometric intersections; reject any edited pose instead.
   for(const part of step.parts){const final=fullParts.find(p=>p.id===part.id);if(!final||JSON.stringify([part.position,part.rotation])!==JSON.stringify([final.position,final.rotation]))throw Error('A guide step changed the saved CAD pose. Regenerate the guide.');const obj=objects.get(part.id);if(!obj)throw Error('Missing CAD object for guide step.');stepObjects.set(part.id,obj);}
   status(`Đang xuất bước ${i+1} / ${studentGuide.steps.length}…`);await new Promise(requestAnimationFrame);
   controls.detach();box.visible=false;const shots=printRenderer.render(stepObjects,step,jointReferences);
   const page=node('article');page.className='guide-page guide-assembly-step';const [stepHeader,stepRule]=header('LẮP RÁP');page.append(stepHeader,stepRule);
   const stepTitle=node('h2');stepTitle.className='guide-step-title';const number=node('span',String(i+1));number.className='guide-step-number';stepTitle.append(number,node('span',step.title));page.append(stepTitle);
   const content=node('div');content.className='guide-step-content';
   const figure=node('figure');figure.className='guide-main-figure';const image=node('img');image.className='guide-step-image';image.src=shots.assembled;image.alt=`${step.title}: assembled ${PLATFORM.name} parts`;figure.append(image,node('figcaption','Sau khi lắp · viền đỏ là chi tiết mới'));content.append(figure);
   const side=node('div');side.className='guide-step-side';const needed=node('div');needed.className='guide-needed';needed.append(node('h3',i===0?'Chuẩn bị các chi tiết':'Thêm ở bước này'));
   const addedCounts=new Map();for(const part of step.added){const row=addedCounts.get(part.sku)||{...part,count:0};row.count++;addedCounts.set(part.sku,row);}
   for(const part of addedCounts.values()){const card=node('div');card.className='guide-needed-part';const thumb=node('img');thumb.src=partPreviewSrc(PLATFORM.id,part.sku);thumb.alt='';card.append(thumb,node('span',`${part.count}× ${part.name}`));needed.append(card);}side.append(needed);
   if(shots.detail){const detail=node('figure');detail.className='guide-detail-figure';const closeup=node('img');closeup.src=shots.detail;closeup.alt=shots.seatedDetail?'Cận cảnh vị trí sau khi lắp':'Chi tiết mới tách nhẹ để chỉ hướng lắp';detail.append(closeup,node('figcaption',shots.seatedDetail?'Cận cảnh · sau khi lắp':'Hướng lắp · hình tách chi tiết'));side.append(detail);}content.append(side);page.append(content);
   const instruction=node('p',shots.seatedDetail?'Hình cận cảnh vị trí sau khi lắp; giữ cụm như hình.':step.note);instruction.className='guide-step-instruction';page.append(instruction);const footer=node('div',`${i+1} / ${studentGuide.steps.length}`);footer.className='guide-page-number';page.append(footer);container.append(page);
  }
  await show(fullParts);setBusy(true);for(const obj of objects.values())obj.traverse(mesh=>{if(mesh.userData.cable)mesh.visible=false;});const finished=node('article');finished.className='guide-page guide-finished';const [finishHeader,finishRule]=header('HOÀN THÀNH');finished.append(finishHeader,finishRule,node('h2',project.title));const hero=node('img');hero.className='guide-finished-image';hero.src=printRenderer.completed(objects);hero.alt='Sản phẩm đã lắp hoàn chỉnh';finished.append(hero);container.append(finished);
  await Promise.all([...container.querySelectorAll('img')].map(image=>image.decode()));window.print();status('Student guide is ready. Choose Save as PDF in the print dialog.');
 }catch(error){status('Guide export failed: '+error.message);}
 finally{exportingGuide=false;printRenderer?.dispose();scene.background.copy(savedBackground);grid.visible=savedGridVisible;preview=false;await show();applyPose(savedPose);guideReturnPose=null;$('guide-return').hidden=true;warnings();}
}
$('export').onclick=exportStudentGuide;if($('guide-export'))$('guide-export').onclick=exportStudentGuide;
if(PLATFORM.id==='vexgo')installWiring({parts:()=>project.parts,name:partName,locked,busy:()=>busy,checkpoint,save,project:()=>project});
assemblyAssistant=installAssemblyAssistant({project:()=>project,catalog:()=>catalog,references:jointReferences,objects,camera,orbit,canvas:renderer.domElement,bounds:visibleBounds,selected:()=>selected,selection:()=>[...selectedIds],name:instanceName,select,status,fit,blocked:()=>busy||preview||controls.dragging||!!directTools?.active(),closePreviews:()=>{quickAttach?.close();connectTool?.cancel();}});
installDrivePreview({project:()=>project,references:jointReferences,objects,selected:()=>selected,connections:()=>assemblyAssistant.data().connections,blocked:()=>busy||preview||controls.dragging||!!directTools?.active(),closePreviews:()=>{quickAttach?.close();connectTool?.cancel();},resetInspection:()=>assemblyAssistant.reset(),setBusy,detach:()=>{controls.detach();box.visible=false;},check:inspectFit,transform,refresh:refreshSelection});
setBusy(true);
let startupError=null;
try{catalog=await(await fetch(assetUrl('parts.json?v=library-names-1'),{cache:'no-store'})).json();$('count').textContent=catalog.length;if(PLATFORM.id==='vexiq')for(const [value,label] of [['body','Beams & connectors'],['shaft','Shafts'],['pin','Connector pins'],['wheel','Wheels'],['gear','Gears'],['retainer','Collars & spacers'],['accessory','Other accessories']]){const option=document.createElement('option');option.value='kind-'+value;option.textContent=label;$('category').append(option);}renderCatalog();connectTool=await installConnectTool({scene,camera,canvas:renderer.domElement,objects,controls,box,project:()=>project,selected:()=>selected,busy:()=>busy,preview:()=>preview,transform,select,checkpoint,save,warnings,status});quickAttach=await installQuickAttach({scene,camera,orbit,canvas:renderer.domElement,objects,controls,box,catalog,project:()=>project,selected:()=>selected,busy:()=>busy,preview:()=>preview,connectActive:()=>connectTool.active()||!!directTools?.active(),fit,model,transform,select,checkpoint,show,save,warnings,status,withElectronics,pose,applyPose});directTools=await installDirectTools({scene,camera,canvas:renderer.domElement,objects,controls,orbit,box,project:()=>project,selected:()=>selected,selection:()=>selectedIds,busy:()=>busy,preview:()=>preview,quickActive:()=>quickAttach.active(),connectActive:()=>connectTool.active(),transform,select,selectGroup:selectGroupMember,checkpoint:()=>{const redo=copy(future);checkpoint();return redo;},discardCheckpoint:redo=>{history.pop();future=redo||[];},refreshSelection,moveOthers:moveJoined,openPinAt:(id,point)=>quickAttach.openPinAt(id,point),closePreviews:()=>{quickAttach.close();connectTool.cancel();},isLocked:id=>locked(project.parts.find(part=>part.id===id)),save,warnings,status});const draft=localStorage.getItem(key);if(draft)project=validate(JSON.parse(draft));else if(PROJECT_ID)throw Error('Không tìm thấy dự án trên trình duyệt này. Mở từ màn hình dự án.');$('title').value=project.title;await show();save();warnings();}catch(error){startupError=error;status('Không mở được editor: '+error.message);}
if(startupError){setBusy(true);throw startupError;}

installAssemblyAPI({project:()=>project,catalog:()=>catalog,references:jointReferences,locked,selection:()=>[...selectedIds],select:ids=>{select(ids.at(-1));selectedIds=new Set(ids);renderLists();},busy:()=>busy||preview||controls.dragging||!!directTools?.active()||!!quickAttach?.active(),clean:cleanGroups,withElectronics:item=>withElectronics(project.parts,item,catalog),staging:async sku=>stagingPosition(await model(sku),objects),fitReport:inspectFit,review:()=>assemblyAssistant.data(),guide:()=>studentGuide,exportGuide:async()=>{await exportStudentGuide();if($('status').textContent.startsWith('Guide export failed:'))throw Error($('status').textContent);return {printRequested:true};},undo,
 async transaction(fn){const before=copy(project),redo=copy(future),historyBefore=copy(history),selectionBefore=[...selectedIds];setBusy(true);
  try{const baseline=await inspectFit();const old=new Set(baseline.issues.filter(i=>i.kind==='penetration').map(i=>i.key));const result=await fn();await show();setBusy(true);const check=await inspectFit();const collisions=check.issues.filter(i=>i.kind==='penetration'&&!old.has(i.key));if(collisions.length)throw Error('New body penetration: '+collisions.map(i=>i.key).join(', '));history.push(before);if(history.length>60)history.shift();future=[];if(!await save(false))throw Error('Could not save project');warnings();return result;}
  catch(error){project=before;history=historyBefore;future=redo;await show();select(selectionBefore.at(-1)||null);selectedIds=new Set(selectionBefore);await save(false);throw error;}
  finally{setBusy(false);renderLists();}
 }
});
