import {existsSync} from 'node:fs';
/** @type {import('next').NextConfig} */
const config={
 async rewrites(){return {beforeFiles:existsSync(new URL('./public/editor/runtime.html',import.meta.url))?[{source:'/editor/index.html',destination:'/editor/runtime.html'}]:[]};},
 async headers(){return [
  // Only content-addressed files can safely survive subsequent deployments.
  {source:'/editor/dist/main.:hash([a-f0-9]{16}).bundle.js',headers:[{key:'Cache-Control',value:'public, max-age=31536000, immutable'}]},
  // CAD and vendor URLs are stable names; revalidate after a short freshness
  // window instead of leaving an obsolete kit model cached indefinitely.
  {source:'/assembly/:path*/:file(model.glb|preview.png)',headers:[{key:'Cache-Control',value:'public, max-age=3600, must-revalidate'}]},
  {source:'/assembly/vendor/:path*',headers:[{key:'Cache-Control',value:'public, max-age=3600, must-revalidate'}]},
 ];},
};
export default config;
