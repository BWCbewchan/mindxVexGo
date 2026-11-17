import * as THREE from 'three';

const projected=new THREE.Vector3(),viewPoint=new THREE.Vector3();

export function screenPoint(point,camera,width,height){
 projected.copy(point).project(camera);
 if(projected.z< -1||projected.z>1||Math.abs(projected.x)>1||Math.abs(projected.y)>1)return null;
 return {x:(projected.x+1)*width/2,y:(1-projected.y)*height/2};
}

export function markerWorldSize(point,camera,height,pixels){
 if(camera.isOrthographicCamera)return pixels*Math.abs(camera.top-camera.bottom)/(camera.zoom*Math.max(1,height));
 viewPoint.copy(point).applyMatrix4(camera.matrixWorldInverse);
 return pixels*2*Math.max(camera.near,-viewPoint.z)*Math.tan(THREE.MathUtils.degToRad(camera.fov/2))/(Math.max(1,height)*camera.zoom);
}

export function nearestScreenMarker(items,camera,width,height,x,y,radius=12){
 let best=null,distance=radius*radius,depth=Infinity;
 for(const marker of items){
  if(!marker.visible)continue;
  const point=screenPoint(marker.position,camera,width,height);
  if(!point)continue;
  const squared=(point.x-x)**2+(point.y-y)**2;
  const z=marker.position.clone().applyMatrix4(camera.matrixWorldInverse).z;
  if(squared<distance-.01||Math.abs(squared-distance)<.01&&-z<depth){best=marker;distance=squared;depth=-z;}
 }
 return best;
}
