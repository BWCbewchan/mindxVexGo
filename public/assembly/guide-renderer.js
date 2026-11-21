import {visibleBounds} from './visible-bounds.js';
import * as THREE from 'three';
import {worldReference,seatedPinMatches} from './mating.js?v=compatibility-27';
import {guideCamera} from './guide-camera.js';
import {createViewportBatches} from './viewport-batches.js?v=group-perf-109';

// Dedicated print renderer: no editor camera, UI dimensions, grid or selection helpers.
export function createGuideRenderer(){
 const renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});
 renderer.setPixelRatio(1);renderer.outputColorSpace=THREE.SRGBColorSpace;
 const scene=new THREE.Scene();scene.background=new THREE.Color('white');
 scene.add(new THREE.HemisphereLight(0xffffff,0xc8cdd1,1.4));
 for(const p of [[2,3,2],[-2,2,2],[-2,2,-2],[2,2,-2]]){const light=new THREE.DirectionalLight(0xffffff,.65);light.position.set(...p);scene.add(light);}
 const group=new THREE.Group();scene.add(group);
 const batches=createViewportBatches(scene);let drawObjects=new Map();
 const directions=[[1,.8,1],[-1,.8,1],[1,.8,-1],[-1,.8,-1],[1,.3,1],[-1,.3,1],[1,-.5,1],[-1,-.5,-1]].map(p=>new THREE.Vector3(...p).normalize());
 const owned=[],edgeCache=new Map(),camera=new THREE.OrthographicCamera(-1,1,1,-1,.00001,10),corner=new THREE.Vector3();let lastCamera=null,liveState=null;
 function clear(){group.clear();for(const r of owned.splice(0))r.dispose();}
 function bodyMeshes(roots){const meshes=[];for(const root of roots)root.traverseVisible(obj=>{if(obj.isMesh&&!obj.userData.guideAnnotation)meshes.push(obj);});return meshes;}
 function build(objects,addedIds,referenceId,contextEdges=true,newOutline=true){
  clear();
  const copies=new Map(),oldEdges=new THREE.LineBasicMaterial({color:0x687078,transparent:true,opacity:.28}),newEdges=new THREE.LineBasicMaterial({color:0xed1c24,transparent:true,opacity:.85});
  owned.push(oldEdges,newEdges);
  for(const [id,obj] of objects){
   if(id===referenceId)continue;
   const copy=obj.clone(true),isNew=addedIds?.has(id);
   copy.visible=true;
   copy.traverseVisible(mesh=>{
    if(!mesh.isMesh||!(isNew?newOutline:contextEdges))return;
    if(!edgeCache.has(mesh.geometry))edgeCache.set(mesh.geometry,new THREE.EdgesGeometry(mesh.geometry,35));
    const edge=new THREE.LineSegments(edgeCache.get(mesh.geometry),isNew?newEdges:oldEdges);
    edge.userData.guideNewEdge=isNew;mesh.add(edge);
   });
   group.add(copy);copies.set(id,copy);
  }
  drawObjects=copies;return copies;
 }
 function cameraFor(bounds,direction,width,height,up,zoom=1){
  const center=bounds.getCenter(new THREE.Vector3()),size=bounds.getSize(new THREE.Vector3());
  if(up)camera.up.fromArray(up);else camera.up.set(0,1,0);
  camera.position.copy(center).addScaledVector(direction,Math.max(.1,size.length()*3));camera.lookAt(center);camera.updateMatrixWorld(true);
  const inverse=camera.matrixWorldInverse;let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
  for(const x of [bounds.min.x,bounds.max.x])for(const y of [bounds.min.y,bounds.max.y])for(const z of [bounds.min.z,bounds.max.z]){corner.set(x,y,z).applyMatrix4(inverse);minX=Math.min(minX,corner.x);maxX=Math.max(maxX,corner.x);minY=Math.min(minY,corner.y);maxY=Math.max(maxY,corner.y);}
  const halfHeight=Math.max((maxY-minY)/2,(maxX-minX)/2/(width/height),.002)*1.06/Math.max(.25,Math.min(3,zoom)),halfWidth=halfHeight*width/height;
  // Projected AABB center is often different from the orbit target: center both axes.
  camera.left=(minX+maxX)/2-halfWidth;camera.right=(minX+maxX)/2+halfWidth;camera.bottom=(minY+maxY)/2-halfHeight;camera.top=(minY+maxY)/2+halfHeight;camera.updateProjectionMatrix();return camera;
 }
 function choose(bounds,point,approach=null,landingPoints=[],faceSocket=false,explodedTip=null,support=null){
  if(!point)return directions[0];
  const center=bounds.getCenter(new THREE.Vector3()),distance=Math.max(bounds.getSize(new THREE.Vector3()).length()*3,.2);
  const ray=new THREE.Raycaster(undefined,undefined,0,distance-.0015),meshes=bodyMeshes([group]);
  let candidates=directions;
  if(approach){
   const up=new THREE.Vector3(0,1,0),side=new THREE.Vector3().crossVectors(approach,up);
   if(side.lengthSq()<.01)side.crossVectors(approach,new THREE.Vector3(1,0,0));
   side.normalize();up.crossVectors(side,approach).normalize();
   const biases=faceSocket?[.7,.4]:landingPoints.length?[0,.45,-.45]:[.45];
   const viewsPerSide=landingPoints.length?16:8;
   candidates=biases.flatMap(bias=>Array.from({length:viewsPerSide},(_,i)=>{
    const angle=i*2*Math.PI/viewsPerSide;
    return approach.clone().multiplyScalar(bias).addScaledVector(side,Math.cos(angle)).addScaledVector(up,Math.sin(angle)).normalize();
   }));
  }
  let best=candidates[0],score=-Infinity;
  for(let i=0;i<candidates.length;i++){
   const d=candidates[i],origin=point.clone().addScaledVector(d,distance);
   ray.set(origin,d.clone().negate());
   const hits=ray.intersectObjects(meshes,false).length;
   let covered=0,crowded=0;
   for(const [j,landing] of landingPoints.entries()){
    ray.set(landing.clone().addScaledVector(d,distance),d.clone().negate());
    if(ray.intersectObjects(meshes,false).length)covered++;
    for(let k=0;k<j;k++){
     const gap=landing.clone().sub(landingPoints[k]);
     if(gap.addScaledVector(d,-gap.dot(d)).length()<.004)crowded++;
    }
   }
   let overlapsSupport=false;
   if(explodedTip&&support){ray.set(explodedTip,d.clone().negate());overlapsSupport=ray.intersectObject(support,true).some(hit=>hit.object.isMesh);}
   const value=-(overlapsSupport?40:0)-hits*20-covered*3-crowded*12-i*.1+point.clone().sub(center).dot(d);
   if(value>score){score=value;best=d;}
  }
  return best;
 }

 function capture(bounds,direction,width,height,up,zoom,encode=true){if(renderer.domElement.width!==width||renderer.domElement.height!==height)renderer.setSize(width,height,false);const camera=cameraFor(bounds,direction,width,height,up,zoom);lastCamera=camera;batches.draw(renderer,camera,drawObjects);return encode?renderer.domElement.toDataURL('image/png'):null;}
 return {
  completed(objects,options={}){build(objects,null,null,options.contextEdges);const bounds=visibleBounds(group);return capture(bounds,directions[0],options.width||2200,options.height||1200);},
  render(objects,step,references,options={}){
   const frameOnly=options.frameOnly||(options.live?options.liveFrame:null);
   const drawDetail=frameOnly!=='assembled'&&options.detail!==false;
   const joint=step.joint,reference=step.guideSupport,addedSet=new Set(step.added.map(p=>p.id));
   // A detail-only group page never draws the cumulative assembly. Avoid
   // cloning prior groups and building edge geometry that the page hides.
   const groupDetail=step.type==='group'&&frameOnly==='detail';
   const shown=groupDetail?new Map([...objects].filter(([id])=>addedSet.has(id))):objects;
   const newOutline=frameOnly==='detail'?step.page?.frames?.detail?.redOutline===true:
    frameOnly==='assembled'?step.page?.frames?.assembled?.redOutline!==false:
    step.page?.frames?.assembled?.redOutline!==false||step.page?.frames?.detail?.redOutline===true;
   const copies=build(shown,addedSet,reference?.id,options.contextEdges,newOutline),bounds=visibleBounds(group);
   const part=step.parts.find(p=>p.id===joint?.part),target=step.parts.find(p=>p.id===joint?.target)||reference;
   const motorDrive=part?.kind==='motor'&&joint?.sourceRef==='motor-output'&&target?.kind==='shaft';
   const ref=references[target?.sku]?.find(r=>r.id===joint?.targetRef);
   const socket=target&&ref?worldReference(target,ref):null;
   const views={front:[0,.15,1],rear:[0,.15,-1],left:[-1,.15,0],right:[1,.15,0],top:[0,1,.001],bottom:[0,-1,.001]};
   const custom=step.view==='custom'?guideCamera(step.camera):null,assembledCustom=guideCamera(step.page?.frames?.assembled?.camera)||custom,detailCustom=guideCamera(step.page?.frames?.detail?.camera)||custom;
   const point=socket?.point.clone().multiplyScalar(.001),direction=assembledCustom?new THREE.Vector3(...assembledCustom.direction):views[step.view]?new THREE.Vector3(...views[step.view]).normalize():step.overviewDirection?new THREE.Vector3(...step.overviewDirection).normalize():choose(bounds,point).clone();
   // Show the incoming side frame on the near side of the finished chassis.
   if(step.groupPhase==='join'&&addedSet.size>1&&!assembledCustom&&!views[step.view]&&!step.overviewDirection){
    const incoming=new THREE.Box3(),fixed=new THREE.Box3();
    for(const [id,obj] of copies)(addedSet.has(id)?incoming:fixed).union(visibleBounds(obj));
    if(!incoming.isEmpty()&&!fixed.isEmpty()){
     const outward=incoming.getCenter(new THREE.Vector3()).sub(fixed.getCenter(new THREE.Vector3()));
     if(outward.lengthSq()>1e-8){
      outward.normalize();
      const candidates=directions.slice(0,4);
      direction.copy(candidates.reduce((best,d)=>d.dot(outward)>best.dot(outward)?d:best).clone());
     }
    }
   }
   const markerLocations=[],landingAnchors=new Map();
   let chainClosing=false,markerGeometry,markerMaterial;
   const markHole=(location,anchor)=>{
    if(step.type==='chain-drive'&&!chainClosing)return;
    const position=location.clone();markerLocations.push(position);if(anchor)landingAnchors.set(position,anchor);
    if(options.markers2D)return;
    if(!markerGeometry){
     markerGeometry=new THREE.SphereGeometry(.0018,20,12);
     markerMaterial=new THREE.MeshBasicMaterial({color:0xa855f7,depthTest:false,depthWrite:false});
     owned.push(markerGeometry,markerMaterial);
    }
    const dot=new THREE.Mesh(markerGeometry,markerMaterial);
    dot.userData.guideAnnotation=true;dot.userData.guideHoleDot=true;dot.position.copy(location);dot.renderOrder=1100;group.add(dot);
   };
   if(drawDetail&&!step.insertionBlocked&&part&&socket){
    // Mark the fixed landing face, not every CAD contact on the support.
    // In a first-step batch the support is also listed in step.added.
    const rows=new Map(step.parts.map(row=>[row.id,row]));
    const placed=new Set();
    function landing(movingId,fixedId,refId){
     if(!addedSet.has(movingId)||movingId===target.id||movingId===fixedId)return;
     if(addedSet.has(fixedId)&&fixedId!==target.id)return;
     const fixed=rows.get(fixedId)||(fixedId===target.id?target:null);
     if(!fixed)return;
     const landingRef=references[fixed.sku]?.find(r=>r.id===refId);
     const key=JSON.stringify([fixedId,refId]);
     if(!landingRef||placed.has(key))return;
     placed.add(key);markHole(worldReference(fixed,landingRef).point.multiplyScalar(.001),key);
    }
    function contact(c){
     landing(c.part,c.target,c.targetRef);
     landing(c.target,c.part,c.sourceRef);
    }
    landing(part.id,target.id,ref.id);
    if(ref.kind==="pin")for(const match of seatedPinMatches(part,step.parts,references))landing(part.id,match.target,match.targetRef);
    for(const c of options.contacts||[])contact(c);
    for(const c of step.pinJoints||[])contact(c);
    for(const c of step.insertion?.contacts||[])contact(c);
    for(const row of step.parts)if(row.mate)contact({...row.mate,part:row.id});
   }
   const outline=name=>group.traverse(o=>{if(o.userData.guideHoleDot)o.visible=name==='detail';if(o.userData.guideNewEdge){o.visible=name==='detail'?step.page?.frames?.detail?.redOutline===true:step.page?.frames?.[name]?.redOutline!==false;o.material.opacity=step.page?.frames?.[name]?.redOutlineOpacity??.85;}});
   const width=options.width||1400,height=options.height||1400;
   const captureAssembled=()=>{outline('assembled');return capture(bounds,direction,width,height,assembledCustom?.up,assembledCustom?.zoom,!options.live);};
   let assembled=null;
   if(frameOnly==='detail'&&drawDetail)lastCamera=cameraFor(bounds,direction,width,height,assembledCustom?.up,assembledCustom?.zoom);
   else assembled=captureAssembled();
   if(options.live)liveState={bounds:bounds.clone(),direction:direction.clone(),up:assembledCustom?.up,zoom:assembledCustom?.zoom??1};
   const framing={direction:direction.toArray(),up:new THREE.Vector3(0,1,0).applyQuaternion(lastCamera.quaternion).toArray(),zoom:assembledCustom?.zoom??1};
   // Project CAD sockets from the displayed (possibly exploded) pose.
   const cadAnchors=()=>{
    const anchors=[];
    for(const row of [...step.parts,...(reference?[reference]:[])]){
     const copy=copies.get(row.id),original=objects.get(row.id);
     if(!original||(!copy?.visible&&row.id!==reference?.id))continue;
     const shift=copy?copy.position.clone().sub(original.position):new THREE.Vector3();
     for(const ref of references[row.sku]||[]){
      const world=worldReference(row,ref).point.multiplyScalar(.001).add(shift);
      const projected=world.clone().project(lastCamera);
      anchors.push({anchor:JSON.stringify([row.id,ref.id]),x:(1+projected.x)/2,y:(1-projected.y)/2,z:projected.z,world});
     }
    }
    return anchors;
   };
   const markers=()=>{const unique=new Map();for(const location of markerLocations){const p=location.clone().project(lastCamera),x=(p.x+1)/2,y=(1-p.y)/2;if(x>=0&&x<=1&&y>=0&&y<=1)unique.set(Math.round(x*10000)+'|'+Math.round(y*10000),{x,y,r:.012,anchor:landingAnchors.get(location)});}return [...unique.values()];};
   const assembledFrame={width,height,markers:[],camera:framing};let detailFrame=null;
   const captureDetail=(focus,fallback,width,height)=>{width=Math.round(width*(options.detailScale??1));height=Math.round(height*(options.detailScale??1));outline('detail');const image=capture(focus,detailCustom?new THREE.Vector3(...detailCustom.direction):fallback,width,height,detailCustom?.up??assembledCustom?.up,detailCustom?.zoom,!options.live);if(options.live&&options.liveFrame==='detail')liveState={bounds:focus.clone()};const anchors=cadAnchors(), automatic=markers();
    for(const dot of automatic){
     if(dot.anchor)continue;
     const match=anchors.find(a=>Math.hypot(dot.x-a.x,dot.y-a.y)<.00001);
     if(match)dot.anchor=match.anchor;
    }
    if(options.live&&step.page?.frames?.detail?.markers){
     group.traverse(o=>{if(o.userData.guideHoleDot)o.visible=false;});
     for(const dot of step.page.frames.detail.markers){
      const match=anchors.find(a=>a.anchor===dot.anchor);
      if(match)markHole(match.world);
     }
    }
    detailFrame={width,height,anchors:anchors.map(({world,...entry})=>entry),markers:automatic,camera:{direction:lastCamera.position.clone().sub(focus.getCenter(new THREE.Vector3())).normalize().toArray(),up:new THREE.Vector3(0,1,0).applyQuaternion(lastCamera.quaternion).toArray(),zoom:detailCustom?.zoom??1}};return image;};
   if(!drawDetail)return {assembled,detail:null,framing,assembledFrame,canvas:options.live?renderer.domElement:undefined};
   if(step.type==='group'){
    for(const [id,obj] of copies)obj.visible=addedSet.has(id);
    const focus=visibleBounds(group);
    const detail=captureDetail(focus,custom?new THREE.Vector3(...custom.direction):directions[0],900,650);
    return {assembled,detail,framing,assembledFrame,detailFrame};
   }
   let detail=null;
   if(step.type==='chain-drive'){
    const closing=step.parts.find(p=>p.id===step.added.at(-1)?.id),closingObject=copies.get(closing?.id),chainIds=new Set(step.added.map(p=>p.id)),focus=new THREE.Box3();
    for(const id of chainIds){const obj=copies.get(id);if(obj)focus.union(visibleBounds(obj));}
    if(closing&&closingObject){
     const axis=worldReference(closing,{point:[0,0,0],normal:[1,0,0]}).normal,offset=(step.page?.frames?.detail?.explodeMM??12)/1000,location=new THREE.Vector3(...closing.position).multiplyScalar(.001);closingObject.position.addScaledVector(axis,offset);group.updateMatrixWorld(true);focus.union(visibleBounds(closingObject));chainClosing=true;
     for(const r of references[closing.sku]||[])if(r.profile==='iq-chain-hinge')markHole(worldReference(closing,r).point.multiplyScalar(.001));
     if(offset>.001){const arrow=new THREE.ArrowHelper(axis.clone().negate(),location.clone().addScaledVector(axis,offset*.95),offset*.8,0xed1c24,.0065,.0045);group.add(arrow);for(const mesh of [arrow.line,arrow.cone]){mesh.userData.guideAnnotation=true;mesh.material.depthTest=false;mesh.material.depthWrite=false;mesh.renderOrder=1000;}owned.push(arrow.line.material,arrow.cone.material);}
     const tangent=worldReference(closing,{point:[0,0,0],normal:[0,-1,0]}).normal,side=worldReference(closing,{point:[0,0,0],normal:[0,0,1]}).normal,direction=axis.multiplyScalar(.75).addScaledVector(tangent,.25).addScaledVector(side,.45).normalize();detail=captureDetail(focus,direction,900,650);
    }else detail=captureDetail(bounds,direction,900,650);
    return {assembled,detail,framing,assembledFrame,detailFrame};
   }
   if(part&&socket){
    // Only the newly added piece is exploded; all earlier parts remain where saved.
    const added=copies.get(part.id);
    let targetObject=copies.get(target.id);
    const referenceObject=reference&&objects.get(reference.id);
    if(referenceObject){
     const ghost=new THREE.MeshBasicMaterial({color:0x8b97a3,transparent:true,opacity:.34,depthWrite:false,side:THREE.DoubleSide});
     owned.push(ghost);
     targetObject=referenceObject.clone(true);
     targetObject.visible=true;
     targetObject.traverseVisible(mesh=>{if(mesh.isMesh){mesh.material=ghost;mesh.renderOrder=10;}});

     group.add(targetObject);group.updateMatrixWorld(true);
    }
    if(!targetObject){if(frameOnly==='detail')assembled=captureAssembled();return {assembled,detail:null,framing,assembledFrame,detailFrame};}
    const axis=step.insertion?new THREE.Vector3(...step.insertion.axis).normalize():socket.normal;
    const offset=step.page?.frames?.detail?.explodeMM!==undefined?step.page.frames.detail.explodeMM/1000:step.insertion?Math.max(step.closingNote ? .03 : motorDrive ? .026 : .02,step.insertion.clearance/1000):Math.max(.020,Math.min(.035,new THREE.Box3().setFromObject(added).getSize(new THREE.Vector3()).length()*.45));
    let obstructed=false;
    if(!step.insertionBlocked&&!referenceObject&&!step.insertion){
     const ray=new THREE.Raycaster(point.clone().addScaledVector(axis,.001),axis,.001,offset);
     const obstacles=[...copies].filter(([id])=>!addedSet.has(id)&&id!==target.id).map(([,obj])=>obj);
     obstructed=ray.intersectObjects(bodyMeshes(obstacles),false).length>0;
    }
    if(step.insertionBlocked||obstructed){
     return {assembled,detail:captureDetail(visibleBounds(group),direction,900,650),seatedDetail:true,framing,assembledFrame,get detailFrame(){return detailFrame;}};
    }
    const pinDirections=new Map(),pinPaths=[];
    for(const c of step.pinJoints||[]){
     const ref=references[target.sku]?.find(r=>r.id===c.targetRef);
     if(!ref)continue;
     const socket=worldReference(target,ref);
     pinDirections.set(c.part,socket.normal);
     pinPaths.push({location:socket.point.multiplyScalar(.001),direction:socket.normal});
    }
    for(const [id,obj] of copies)if(addedSet.has(id)&&id!==target.id)obj.position.addScaledVector(pinDirections.get(id)||axis,offset);group.updateMatrixWorld(true);
    const arrowPoints=markerLocations.length?markerLocations:[point];
    if(offset>0)for(const {location,direction} of (pinPaths.length?pinPaths:arrowPoints.map(location=>({location,direction:axis})))){
     const tip=location.clone().addScaledVector(direction,offset);
     const geometry=new THREE.BufferGeometry().setFromPoints([location,tip]);
     const material=new THREE.LineBasicMaterial({color:0xd51692,depthTest:true,depthWrite:false});
     const line=new THREE.Line(geometry,material);
     line.userData.guideAnnotation=true;group.add(line);owned.push(geometry,material);
    }
    // The two panels show the same assembly before and after insertion.
    const focus=visibleBounds(group);
    detail=captureDetail(focus,direction,900,650);
   }
   if(!detailFrame&&addedSet.size){
    const focus=new THREE.Box3();
    for(const [id,obj] of copies){obj.visible=addedSet.has(id);if(obj.visible)focus.union(visibleBounds(obj));}
    if(!focus.isEmpty())detail=captureDetail(focus,detailCustom?null:directions[0],900,650);
   }
   return {assembled,detail,framing,assembledFrame,detailFrame};
  },
  get renderCanvas(){return renderer.domElement;},
  drawView(value,width,height){if(!liveState)throw Error('Prepare the live scene first.');const config=guideCamera(value);if(!config)throw Error('Invalid live camera');capture(liveState.bounds,new THREE.Vector3(...config.direction),width,height,config.up,config.zoom,false);return {direction:[...config.direction],up:new THREE.Vector3(0,1,0).applyQuaternion(lastCamera.quaternion).toArray(),zoom:config.zoom??1};},
  thumbnail(width=140,height=105){const out=document.createElement('canvas');out.width=width;out.height=height;out.getContext('2d').drawImage(renderer.domElement,0,0,width,height);return out.toDataURL('image/png');},
  dispose(){liveState=null;batches.dispose();drawObjects.clear();clear();for(const geometry of edgeCache.values())geometry.dispose();edgeCache.clear();renderer.dispose();renderer.forceContextLoss();},
 };
}
