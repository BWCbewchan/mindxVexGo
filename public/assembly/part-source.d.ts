import type {KitPlatform,KitCatalogEntry} from './kit-policy';
export function partSource(platform:KitPlatform,id:string):{platform:KitPlatform;id:string};
export function sourcePartId(id:string,source:KitPlatform,base:KitPlatform):string;
export function partModelUrl(platform:KitPlatform,id:string):string;
export function sourceCatalog(entries:KitCatalogEntry[],source:KitPlatform,base:KitPlatform):KitCatalogEntry[];
