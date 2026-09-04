export default function MindxLogo({inverse=false,compact=false}:{inverse?:boolean;compact?:boolean}){
 return <span className={'mindx-official-logo'+(compact?' compact':'')} aria-label="mindX Tech and AI School"><img src={inverse?'/mindx-logo-white-mark.png':'/mindx-logo-color-mark.png'} alt=""/></span>;
}
