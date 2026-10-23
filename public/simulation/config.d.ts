export type Devices={motors:Array<{id:string;label:string}>;wheels:Array<{id:string}>;brain:boolean;battery:boolean;eye:boolean;colorEye:boolean;distanceEye:boolean;bumper:boolean;magnet:boolean;sample:boolean};
export type Drive={leftMotor:string;rightMotor:string;wheelDiameter:number;trackWidth:number;maxRpm:number;yaw:number};
export type SimField={id:string;name:string;instructions:string;requires:Array<'eye'|'colorEye'|'distanceEye'|'magnet'|'bumper'>;objective:'navigate'|'delivery'|'draw';drawDistance?:number;width:number;height:number;start:{x:number;y:number;heading:number};goal:{x:number;y:number;radius:number};walls:Array<{id?:string;x:number;y:number;width:number;height:number}>;blocks:Array<{id:string;x:number;y:number;width:number;height:number;color:string;pushable:boolean}>;zones:Array<{id?:string;x:number;y:number;radius:number;color:string}>;checkpoints:Array<{x:number;y:number;radius:number}>;robot:Drive&{radius:number;eye:boolean;colorEye:boolean;distanceEye:boolean;bumper:boolean;magnet:boolean}};
export function robotDevices(project:{platform?:string;parts:Array<{id:string;sku:string;label?:string;kind?:unknown}>}|null,catalog?:Array<{id:string;name:string}>):Devices;
export function defaultDrive(devices:Devices):Drive;
export function validateDrive(value:unknown,devices:Devices):Drive;
export function validateDriveSettings(value:unknown,devices:Devices):Drive;
export function playground(name:string,drive:Drive,devices:Devices,radius?:number):SimField;
