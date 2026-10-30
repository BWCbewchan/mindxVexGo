import type {Platform} from './project-store';
export const PLATFORM_IDS:Platform[];
export function platformName(id:Platform):string;
export function platformAssetRoot(id:Platform):string;
export function platformCatalogUrl(id:Platform):string;
export function platformEditorUrl(id:Platform):string;
