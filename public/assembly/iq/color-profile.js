// Presentation colors from the supplied kit's official illustrations. CAD is untouched.
export const IQ_COLOR_VERSION='kit-228-7755-v2';
export const KIT_COLOR_SOURCE='https://www.vexrobotics.com/parts/228-7755';
export const IQ_PALETTE=Object.freeze({lightGray:'#b0b3b2',pinGray:'#b3b4b2',darkGray:'#53575a',mediumGray:'#898d8d',white:'#d9d8d6',black:'#25282a',rubber:'#3e3e3e',blue:'#0075c9',orange:'#f26728',green:'#98ca3d',metal:'#cdd0cd'});
const svg=name=>'https://content.vexrobotics.com/resources/parts-posters/iqgen2/education-kit/'+name+'.svg';
const rule=(color,image,evidence='kit',regions=[])=>({color:IQ_PALETTE[color],colorName:color,source:svg(image),evidence,regions});
const supplementarySource='https://www.pltw.org/hubfs/operations/equipment_supplies/eng_bill_of_materials/IED_VEX_IQ_Kit_228-7342_.pdf';
const variantOf={'2260':'060','2261':'061','2258':'084','2268':'064','2269':'065','2271':'067','2288':'129','2295':'134','2296':'136'};
const explicit={
 '060':['blue','pins-and-standoffs-1x1-connector-pin'],
 '061':['pinGray','pins-and-standoffs-1x2-connector-pin'],
 '062':['darkGray','pins-and-standoffs-2x2-connector-pin'],
 '086':['mediumGray','pins-and-standoffs-0x2-connector-pin'],
 '087':['darkGray','pins-and-standoffs-0x3-connector-pin'],
 '073':['orange','pins-and-standoffs-1x1-idler-pin'],
 '084':['green','pins-and-standoffs-0x2-idler-pin'],
 '063':['black','pins-and-standoffs-0.25x-pitch-standoff'],
 '064':['white','pins-and-standoffs-pitch-standoffs-inner'],
 '109':['black','pins-and-standoffs-0.5x-pitch-standoff-extender'],
 '328':['orange','shafts-1x-pitch-plastic-motor-snap-shaft'],
 '078':['orange','shafts-pitch-plastic-motor-shafts-inner'],
 '094':['blue','shafts-pitch-plastic-motor-shafts-inner'],
 '079':['green','shafts-pitch-plastic-motor-shafts-inner'],
 '081':['mediumGray','shafts-pitch-capped-plastic-shafts-inner'],
 '083':['darkGray','shafts-pitch-capped-plastic-shafts-inner'],
 '143':['rubber','shafts-rubber-shaft-collar'],
 '168':['rubber','shafts-rubber-shaft-collar','family'],
 '114':['black','shafts-0.25-pitch-shaft-spacer'],
 '112':['mediumGray','shafts-washer'],
 '147':['orange','beams-and-plates-angle-beams-2'],
 '148':['blue','beams-and-plates-angle-beams-2'],
 '149':['green','beams-and-plates-angle-beams-2'],
 '1485':['orange','beams-and-plates-angle-beams-2','family'],
 '1486':['blue','beams-and-plates-angle-beams-2','family'],
 '145':['blue','beams-and-plates-angle-beams-2'],
 '144':['blue','beams-and-plates-angle-beams'],
 '150':['blue','beams-and-plates-angle-beams'],
 '151':['blue','beams-and-plates-angle-beams'],
 '140':['blue','beams-and-plates-lock-beams'],
 '141':['blue','beams-and-plates-lock-beams'],
 '1925':['blue','wheels-2x2-center-offset-round-lock-beam'],
 '208':['pinGray','wheels-wheel-hub'],
 '1208':['pinGray','wheels-wheel-hub'],
 '1950':['white','wheels-2x-wide-48.5mm-diameter-hub','family'],
 '1953':['white','wheels-2x-wide-48.5mm-diameter-hub'],
 '213':['blue','gears-gears-inner'],
 '214':['blue','gears-gears-inner'],
 '227':['blue','gears-gears-inner'],
 '228':['blue','gears-gears-inner'],
 '232':['orange','sprockets-and-chain-sprockets-inner'],
 '233':['orange','sprockets-and-chain-sprockets-inner'],
 '235':['orange','sprockets-and-chain-sprockets-inner'],
 '230':['darkGray','sprockets-and-chain-chain-link'],
 '420':['blue','specialty-parts-1x-wide-spool'],
 '246':['blue','specialty-parts-1x4-crank-arm-with-23-tooth-gear-inner'],
 '157':['blue','specialty-parts-rubber-band-anchor'],
 '524':['white','specialty-parts-2x8-smooth-panel-inner'],
 '468':['orange','specialty-parts-silicone-rubber-band-inner'],
};
export function iqAppearance(entry){
 if(!entry?.id)return null;
 const id=entry.sku||entry.id.split('--')[0],tail=id.startsWith('228-2500-')?id.slice(9):null,name=entry.name||'';
 if(variantOf[tail]){const canonical='228-2500-'+variantOf[tail],appearance=iqAppearance({...entry,id:canonical,sku:canonical,name:name.replace(/\s*\(Weak\)/,'')});return appearance?{...appearance,evidence:'family',variantOf:canonical}:null;}
 if(['2234','2236','2238'].includes(tail))return rule('metal','shafts-pitch-motor-shafts-inner','kit',[{match:'OVERMOLD',color:IQ_PALETTE[{2234:'orange',2236:'blue',2238:'green'}[tail]]}]);
 if(explicit[tail])return rule(...explicit[tail]);
 if(id==='228-2560')return rule('darkGray','electronics-smart-motor','kit',[{match:'228-2560-002',color:'#b3b4b2'},{match:'228-2540-901',color:IQ_PALETTE.black}]);
 if(id==='228-2677')return rule('darkGray','electronics-bumper-sensor','kit',[{match:'228-2677-002',color:'#c8c8c8'}]);
 if(id==='228-3010')return rule('darkGray','electronics-touch-led','kit',[{match:'Middle_touch_LED',color:'#c8c8c8'},{match:'Middle touch LED',color:'#c8c8c8'}]);
 if(['163','164','165','166','217'].includes(tail))return {...rule('blue','gears-gears-inner','manufacturer'),source:supplementarySource,sourcePage:['217'].includes(tail)?1:3};
 if(['097','098'].includes(tail))return {...rule('mediumGray','shafts-washer','manufacturer'),source:supplementarySource,sourcePage:8};
 if(['125'].includes(tail))return {...rule('black','shafts-0.25-pitch-shaft-spacer','manufacturer'),source:supplementarySource,sourcePage:4};
 if(tail==='156')return {...rule('darkGray','beams-and-plates-plates','manufacturer'),source:supplementarySource,sourcePage:8};
 // Do not recolor a first-generation Brain/sensor as a different generation.
 if(entry.category==='electronics'||/\(Weak\)|High Strength|v1/i.test(name))return null;
 if(/^0x2 Connector Pin/.test(name))return rule('mediumGray','pins-and-standoffs-0x2-connector-pin','family');
 if(/^\d+x\d+ Connector Pin$/.test(name))return rule('darkGray','pins-and-standoffs-2x2-connector-pin','family');
 if(/^\d+x\d+ Beam$/.test(name))return rule('lightGray','beams-and-plates-beams', 'family');
 if(/^\d+x\d+ Plate$/.test(name))return rule('darkGray','beams-and-plates-plates','family');
 if(/Corner Connector/.test(name))return rule('white','connectors-double-triple-corner-connectors','family');
 if(/Standoff Connector/.test(name))return rule('blue','pins-and-standoffs-standoff-connectors','family');
 if(/Pitch Standoff$/.test(name))return rule('black','pins-and-standoffs-pitch-standoffs-inner','family');
 if(/Beam/.test(name)&&/30 Degree/.test(name))return rule('orange','beams-and-plates-angle-beams-2','family');
 if(/Beam/.test(name)&&/45 Degree/.test(name))return rule('blue','beams-and-plates-angle-beams-2','family');
 if(/Beam/.test(name)&&/60 Degree/.test(name))return rule('green','beams-and-plates-angle-beams-2','family');
 if(/Right Angle Beam|Tee Beam/.test(name))return rule('blue','beams-and-plates-angle-beams','family');
 if(/Truss Plate|Girder Plate|Wedge Plate|Convex Plate/.test(name))return rule('darkGray','beams-and-plates-plates','family');
 if(/Truss Beam|Linear Motion Beam|Smooth Beam|Robot Arm Beam|Beam with Chamferred Ends/.test(name))return rule('lightGray','beams-and-plates-beams','family');
 if(/Pulley/.test(name))return rule('blue','specialty-parts-1x-wide-spool','family');
 if(/Lock Beam/.test(name))return rule('blue','beams-and-plates-lock-beams','family');
 if(/Capped Plastic Shaft|Pitch Plastic Shaft$/.test(name))return rule('darkGray','shafts-pitch-capped-plastic-shafts-inner','family');
 if(/Pitch (Capped )?Shaft$/.test(name))return rule('metal','shafts-pitch-capped-shafts-inner','family');
 if(/\d+ Tooth (?:Idler |Crown |Bevel )?Gear$|Worm Gear|Rack Gear/.test(name))return rule('blue','gears-gears-inner','family');
 if(/Sprocket/.test(name))return rule('orange','sprockets-and-chain-sprockets-inner','family');
 if(/Tire|Intake Flap|Traction Link|Rubber Belt/.test(name))return rule('black','specialty-parts-intake-flaps-inner','family');
 if(/Smooth Panel/.test(name))return rule('white','specialty-parts-2x8-smooth-panel-inner','family');
 if(/Wheel Hub/.test(name))return rule('lightGray','wheels-wheel-hub','family');
 if(/Spool$/.test(name))return rule('blue','specialty-parts-1x-wide-spool','family');
 return null;
}
export function applyIQAppearance(root,entry){
 const appearance=iqAppearance(entry);if(!appearance)return root;
 const materials=new Map();root.traverse(mesh=>{if(!mesh.isMesh)return;const names=[];for(let node=mesh;node;node=node.parent)names.push(node.name||'');const path=names.join('/');
  const color=appearance.regions.find(region=>path.includes(region.match))?.color||appearance.color;
  const colorMaterial=original=>{const key=original.uuid+color;if(!materials.has(key)){const material=original.clone();material.color.set(color);material.metalness=0;material.roughness=.85;material.needsUpdate=true;materials.set(key,material);}return materials.get(key);};
  mesh.material=Array.isArray(mesh.material)?mesh.material.map(colorMaterial):colorMaterial(mesh.material);
 });root.userData.iqAppearance={version:IQ_COLOR_VERSION,...appearance};return root;
}
