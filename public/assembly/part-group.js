export function libraryGroup(part){
 const name=part.name||'';
 if(part.category==='electronics'||['motor','electronic'].includes(part.kind))return 'electronics';
 if(/shaft collar|spacer|washer|bushing|bush\b/i.test(name)||part.kind==='retainer')return 'retainers';
 if(/pin tool/i.test(name))return 'specialty';
 if(/connector|joiner/i.test(name)&&!/connector pin|standoff/i.test(name))return 'connectors';
 if(/shaft|axle/i.test(name)||part.kind==='shaft')return 'shafts';
 if(/\bmotor\b|sensor|\bbrain\b|battery|controller|smart cable|\bradio\b|\bled\b/i.test(name))return 'electronics';
 if(/connector pin|idler pin|standoff|\bpin\b/i.test(name)||part.kind==='pin')return 'pins';
 if(/wheel|tire|tyre|\bhub\b/i.test(name)||part.kind==='wheel')return 'wheels';
 if(/gear|sprocket|chain|pulley|belt|worm/i.test(name)||part.kind==='gear')return 'transmission';
 if(/connector|joiner/i.test(name))return 'connectors';
 if(/beam|plate|frame|panel|liftarm|brick|tile/i.test(name))return 'beams';
 return 'specialty';
}
