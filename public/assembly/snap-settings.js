export const SNAP_PRESETS={
 mm:{label:'1 mm',axes:[1,1,1]},
 stud:{label:'Stud 8 mm · cao 3,2 mm',axes:[8,3.2,8]},
 half:{label:'Nửa stud 4 mm · cao 3,2 mm',axes:[4,3.2,4]},
 plate:{label:'Plate 3,2 mm',axes:[3.2,3.2,3.2]},
};
export const snapPreset=(settings,platform)=>Object.hasOwn(SNAP_PRESETS,settings?.snapPreset)?settings.snapPreset:platform==='lego'?'stud':'mm';
export function snapPosition(position,preset,enabled=true,origin=[0,0,0]){
 if(!enabled)return [...position];const axes=SNAP_PRESETS[preset]?.axes||SNAP_PRESETS.mm.axes;
 return position.map((n,i)=>Number((origin[i]+Math.round((n-origin[i])/axes[i])*axes[i]).toFixed(6)));
}
