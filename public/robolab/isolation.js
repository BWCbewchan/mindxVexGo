(() => {
 'use strict';
 const prefix=document.currentScript?.dataset.storagePrefix||'mindx-robolab:v1:',p=Storage.prototype;
 const raw={get:p.getItem,set:p.setItem,remove:p.removeItem,key:p.key,length:Object.getOwnPropertyDescriptor(p,'length').get};
 const keys=storage=>Array.from({length:raw.length.call(storage)},(_,i)=>raw.key.call(storage,i)).filter(key=>key?.startsWith(prefix));
 p.getItem=function(key){return raw.get.call(this,prefix+String(key));};
 p.setItem=function(key,value){return raw.set.call(this,prefix+String(key),String(value));};
 p.removeItem=function(key){return raw.remove.call(this,prefix+String(key));};
 p.clear=function(){for(const key of keys(this))raw.remove.call(this,key);};
 p.key=function(index){return keys(this)[Number(index)]?.slice(prefix.length)??null;};
 Object.defineProperty(p,'length',{configurable:true,get(){return keys(this).length;}});
 const factory=IDBFactory.prototype,open=factory.open,remove=factory.deleteDatabase;
 factory.open=function(name,...args){return open.call(this,prefix+String(name),...args);};
 factory.deleteDatabase=function(name){return remove.call(this,prefix+String(name));};
 if(!localStorage.getItem('mscad.lang'))localStorage.setItem('mscad.lang','en');
})();
