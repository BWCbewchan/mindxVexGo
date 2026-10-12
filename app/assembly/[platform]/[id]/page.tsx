import {notFound} from 'next/navigation';
import AssemblyClient from '../../assembly-client';
import {platformValid,projectIdValid} from '../../../../public/assembly/project-store';
export default async function ProjectPage({params}:{params:Promise<{platform:string;id:string}>}){
 const {platform,id}=await params;if(!platformValid(platform)||!projectIdValid(id))notFound();
 return <AssemblyClient platform={platform} projectId={id}/>;
}
