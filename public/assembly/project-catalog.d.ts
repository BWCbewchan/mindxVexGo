import type {KitPlatform,KitCatalogEntry} from './kit-policy';
import type {ProjectData} from './project-store';
export function projectCatalog(platform:KitPlatform,project:ProjectData,fetcher?:typeof fetch):Promise<KitCatalogEntry[]>;
