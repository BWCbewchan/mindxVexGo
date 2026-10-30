export function applyLEGOAppearance(object,part,kitId){
 const code=part?.kitColors?.[kitId]??part?.defaultColor,color=part?.colors?.[code]||part?.color;
 if(!color)return;
 object.traverse(child=>{if(!child.isMesh)return;const paint=material=>{if(!material.userData.legoMain)return material;const copy=material.clone();copy.color.set(color);return copy;};child.material=Array.isArray(child.material)?child.material.map(paint):paint(child.material);});
}
