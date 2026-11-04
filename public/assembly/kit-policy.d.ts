export type KitPlatform='vexgo'|'vexiq'|'lego';
export type KitCatalogEntry={id:string;name:string;kind?:string;category?:string;sourcePlatform?:KitPlatform;sourceId?:string;sets?:Record<string,number>;components?:Array<{sku:string;quantity:number}>};
export type KitProfile={version:1;platform:KitPlatform;kitId?:string;name:string;count:number;enforce:boolean;items:Record<string,number>;additionalKits?:KitProfile[]};
export type KitRow={sku:string;skus:string[];name:string;category:string;used:number;available:number|null;remaining:number|null;integrated:number;sourcePlatform?:KitPlatform;additionalAvailable?:number};
export type KitAssemblyRow=KitRow&{derived:true;perKit:number|null;components:Array<{sku:string;name:string;quantity:number}>};
export function kitCatalog(catalog:KitCatalogEntry[],platform:KitPlatform):Array<Omit<KitRow,'used'|'available'|'remaining'|'integrated'>>;
export function defaultKitProfile(catalog:KitCatalogEntry[],platform:KitPlatform,kitId?:string):KitProfile;
export function kitCoverage(catalog:KitCatalogEntry[],platform:KitPlatform):Array<{name:string;quantity:number}>;
export function validateKitProfile(value:unknown,catalog:KitCatalogEntry[],platform:KitPlatform):KitProfile;
export function parseKitFile(text:string,filename:string,catalog:KitCatalogEntry[],platform:KitPlatform):KitProfile;
export function kitReport(parts:Array<{sku:string}>,catalog:KitCatalogEntry[],profile:KitProfile|null):KitRow[];
export function kitAssemblyReport(parts:Array<{sku:string}>,catalog:KitCatalogEntry[],profile:KitProfile|null):KitAssemblyRow[];
export function assertKitChange(before:Array<{sku:string}>,after:Array<{sku:string}>,catalog:KitCatalogEntry[],profile:KitProfile|null):void;

export function additionalKitProfile(catalog:KitCatalogEntry[],basePlatform:KitPlatform,platform:KitPlatform,kitId?:string):KitProfile;
export function totalKitCount(profile:KitProfile|null):number;

export function legoPartKit(part:KitCatalogEntry|undefined,profile:KitProfile|null):string|undefined;
