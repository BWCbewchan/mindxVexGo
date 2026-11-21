import ReferenceDetail from './view';
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;return <ReferenceDetail slug={slug}/>;}
