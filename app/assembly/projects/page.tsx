import AssemblyHome from '../assembly-home';
import goParts from '../../../public/assembly/parts.json';
import iqParts from '../../../public/assembly/iq/parts.json';
import legoParts from '../../../public/assembly/lego/parts.json';
import {partPreviewSrc} from '../../../public/assembly/part-preview';

export const metadata={title:'Assembly Studio · Dự án của bạn · mindX'};
const catalogs={
 vexgo:{count:goParts.length,preview:partPreviewSrc('vexgo','269-6690-000')},
 vexiq:{count:iqParts.length,preview:partPreviewSrc('vexiq','228-2560')},
 lego:{count:legoParts.length,preview:partPreviewSrc('lego','95646c01')},
};
export default function ProjectsPage(){return <AssemblyHome catalogs={catalogs}/>;}
