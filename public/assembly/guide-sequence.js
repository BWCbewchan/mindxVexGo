import {nearestMate,worldReference} from './mating.js?v=guide-repair-31';
import { compatibleReferences } from './connector-policy.js';

const defaultElectronics = new Set([
  '269-6685-000', '269-6686-000', '269-6687-000', '269-6690-000',
  '269-6695-000', '269-6696-000', '269-6702-000',
]);

function connectedComponents(parts, edges) {
  const neighbors = new Map(parts.map(part => [part.id, new Set()]));
  for (const [parent, child] of edges) {
    neighbors.get(parent)?.add(child);
    neighbors.get(child)?.add(parent);
  }
  const seen = new Set(), result = [];
  for (const part of parts) {
    if (seen.has(part.id)) continue;
    const queue = [part.id], component = [];
    seen.add(part.id);
    while (queue.length) {
      const id = queue.shift();
      component.push(id);
      for (const next of neighbors.get(id) || []) if (!seen.has(next)) {
        seen.add(next);
        queue.push(next);
      }
    }
    result.push(component);
  }
  return result;
}

function jointDescription(part, parent, sourceRef, targetRef, nameFor) {
  const childName = nameFor(part), parentName = nameFor(parent);
  const shaftSupport = ref => ref?.id?.startsWith('square-shaft-support-');
  if (sourceRef.profile === 'square-drive' && targetRef.kind === 'hole' && shaftSupport(sourceRef)) {
    return `Luồn ${childName} qua lỗ đỡ trên ${parentName}`;
  }
  if (targetRef.profile === 'square-drive' && sourceRef.kind === 'hole' && shaftSupport(targetRef)) {
    return `Đưa lỗ đỡ của ${childName} thẳng hàng với ${parentName}`;
  }
  if (sourceRef.profile === 'square-drive' && targetRef.profile === 'square-drive') {
    return `Canh trục vuông của ${childName} với lỗ vuông trên ${parentName}`;
  }
  if (sourceRef.profile === 'square-drive' && targetRef.kind === 'hole') {
    return `Canh đầu trục của ${childName} với lỗ trên ${parentName}`;
  }
  if (sourceRef.kind === 'pin' && targetRef.kind === 'hole') {
    return `Canh chốt của ${childName} với lỗ trên ${parentName}`;
  }
  if (sourceRef.kind === 'hole' && targetRef.kind === 'pin') {
    return `Canh lỗ trên ${childName} với chốt của ${parentName}`;
  }
  return `Canh hai điểm nối của ${childName} và ${parentName}`;
}

/** Derive student-facing, cumulative assembly states from the final saved joints. */
export function generateStudentGuide(parts, {
  references = {},
  nameFor = part => part.label || part.sku,
  isElectronic = sku => defaultElectronics.has(sku),
  inferConnections = false,
} = {}) {
  if (!parts.length) return { ready: false, steps: [], blockers: ['Add the parts for the model first.'], notes: [] };
  parts=structuredClone(parts);
  let inferred=0;
  if(inferConnections){
    for(const part of parts.filter(p=>!p.mate)){
      const edges=parts.filter(p=>p.mate).map(p=>[p.id,p.mate.target]);
      const component=connectedComponents(parts,edges).find(c=>c.includes(part.id))||[];
      const match=nearestMate(part,parts,references,{distance:.2,excluded:component});
      if(!match)continue;
      const a=worldReference(part,match.sourceRef),b=worldReference(match.target,match.targetRef);
      if(a.normal.dot(b.normal)>-.999)continue;
      part.mate={target:match.target.id,sourceRef:match.sourceRef.id,targetRef:match.targetRef.id,depth:match.depth,twist:0,flip:false};inferred++;
    }
  }
  const byId = new Map(parts.map(part => [part.id, part]));
  const children = new Map(parts.map(part => [part.id, []]));
  const edges = [], blockers = [], warnings = [];
  if(inferred)warnings.push(`${inferred} existing aligned connections recovered for the guide; model positions were preserved.`);

  for (const part of parts) {
    if (!part.mate) continue;
    const parent = byId.get(part.mate.target);
    if (!parent) {
      blockers.push(`${nameFor(part)} is linked to a part that is no longer in this model.`);
      continue;
    }
    if (parent.id === part.id) {
      blockers.push(`${nameFor(part)} cannot be connected to itself.`);
      continue;
    }
    const sourceRef = references[part.sku]?.find(ref => ref.id === part.mate.sourceRef);
    const targetRef = references[parent.sku]?.find(ref => ref.id === part.mate.targetRef);
    if (!sourceRef || !targetRef || !compatibleReferences(sourceRef, targetRef, part.sku, parent.sku)) {
      blockers.push(`${nameFor(part)} has an invalid or incompatible connection. Reconnect it before exporting.`);
      continue;
    }
    children.get(parent.id).push({ part, sourceRef, targetRef });
    edges.push([parent.id, part.id]);
  }

  const structural = parts.filter(part => !isElectronic(part.sku));
  if (!structural.length) blockers.push('Add and connect the mechanical parts before exporting a build guide.');
  const structuralIds = new Set(structural.map(part => part.id));
  const structuralEdges = edges.filter(([parent, child]) => structuralIds.has(parent) && structuralIds.has(child));
  const structuralComponents = connectedComponents(parts, edges).filter(component=>component.some(id=>structuralIds.has(id)));
  if (structuralComponents.length > 1) {
    const names = structuralComponents.map(component => nameFor(byId.get(component[0]))).join(', ');
    blockers.push(`Connect the separate mechanical assemblies before exporting: ${names}.`);
  }

  const coreIds = new Set(structuralComponents.flat());
  // Electronics attached with explicit CAD joints are sequenced with the chassis.
  let changed = true;
  while (changed) {
    changed = false;
    for (const [parent, child] of edges) {
      if (coreIds.has(parent) && !coreIds.has(child)) { coreIds.add(child); changed = true; }
      if (coreIds.has(child) && !coreIds.has(parent)) { coreIds.add(parent); changed = true; }
    }
  }

  const roots = parts.filter(part => coreIds.has(part.id) && !part.mate);
  if (roots.length !== 1) blockers.push('The main assembly has no single starting part. Check for missing connections or a circular joint chain.');
  if (blockers.length) return { ready: false, steps: [], blockers: [...new Set(blockers)], notes: warnings };

  // A saved mate records the editing gesture, not a manufacturing dependency.
  // Re-root real drive assemblies on a motor/chassis, never a wheel retainer.
  const collar = part => part.sku === '228-2500-143';
  const motor = part => part.sku === '269-6690-000';
  const rank = part => collar(part) ? 100 : /Wheel/.test(nameFor(part)) || ['228-2500-1383','228-2500-1384'].includes(part.sku) ? 40 : /Shaft/.test(nameFor(part)) || ['228-2500-124','228-2500-2221','228-2500-2234','228-2500-2238'].includes(part.sku) ? 20 : 0;
  const orderParts=(a,b)=>rank(a)-rank(b)||nameFor(a).localeCompare(nameFor(b))||a.id.localeCompare(b.id);
  const adjacency = new Map(parts.map(part => [part.id, []]));
  const originalMates = new Map(parts.filter(part=>part.mate).map(part=>[part.id,{...part.mate}]));
  for (const [parentId, childId] of edges) {
    const child = byId.get(childId);
    adjacency.get(parentId).push(childId);
    adjacency.get(childId).push(parentId);
  }
  if (parts.length>1 && parts.some(part => motor(part) || collar(part))) {
    const candidates = parts.filter(part => coreIds.has(part.id) && !collar(part));
    const start = candidates.sort((a,b) => Number(motor(b))-Number(motor(a)) || adjacency.get(b.id).length-adjacency.get(a.id).length || a.id.localeCompare(b.id))[0];
    children.clear();for(const part of parts)children.set(part.id,[]);
    const visited = new Set([start.id]), queue=[start];delete start.mate;
    while(queue.length){
      const parent=queue.shift();
      for(const id of adjacency.get(parent.id)){
        if(visited.has(id))continue;
        const child=byId.get(id);
        // The parent's mate may already have been re-rooted: keep original joint records.
        const record=edges.find(([a,b])=>(a===parent.id&&b===id)||(a===id&&b===parent.id));
        const saved=originalMates.get(record[1]);
        child.mate=record[0]===parent.id?{...saved}:{...saved,target:parent.id,sourceRef:saved.targetRef,targetRef:saved.sourceRef};
        const sourceRef=references[child.sku].find(ref=>ref.id===child.mate.sourceRef),targetRef=references[parent.sku].find(ref=>ref.id===child.mate.targetRef);
        children.get(parent.id).push({part:child,sourceRef,targetRef});visited.add(id);queue.push(child);
      }
    }
    roots[0]=start;
  }
  const prerequisites=new Map(parts.map(part=>[part.id,new Set()]));
  for(const rows of children.values()){
    const stacks=new Map();
    for(const edge of rows){
      if(edge.targetRef.kind!=='pin'||edge.targetRef.profile!=='square-drive')continue;
      const end=edge.targetRef.id;const stack=stacks.get(end)||[];stack.push(edge.part);stacks.set(end,stack);
    }
    for(const stack of stacks.values()){
      // Inner members first, then hubs, finally retainers. Equal depths keep stable IDs.
      stack.sort((a,b)=>Number(collar(a))-Number(collar(b))||b.mate.depth-a.mate.depth||a.id.localeCompare(b.id));
      for(let i=1;i<stack.length;i++)prerequisites.get(stack[i].id).add(stack[i-1].id);
    }
  }
  // Choose among accessible joints; retainers stay last so hubs/supports can slide on.
  const ordered = [], visited = new Set([roots[0].id]), queue = [roots[0]];
  while (queue.length) {
    const completed=new Set(ordered.map(part=>part.id));
    const index=queue.findIndex(part=>[...prerequisites.get(part.id)].every(id=>completed.has(id)));
    if(index<0){blockers.push('The shaft stack has conflicting assembly dependencies. Review its supports and retainers.');break;}
    const [parent] = queue.splice(index,1);
    ordered.push(parent);
    const next = [...(children.get(parent.id) || [])]
      .filter(edge => coreIds.has(edge.part.id))
      .sort((a, b) => orderParts(a.part,b.part));
    for (const edge of next) {
      if (visited.has(edge.part.id)) {
        blockers.push(`The connection chain around ${nameFor(edge.part)} contains a loop.`);
        continue;
      }
      visited.add(edge.part.id);
      queue.push(edge.part);
    }
    queue.sort(orderParts);
  }
  if (ordered.length !== coreIds.size) blockers.push('Some connected parts cannot be placed in a safe assembly order. Check the joint chain.');
  if (blockers.length) return { ready: false, steps: [], blockers: [...new Set(blockers)], notes: warnings };

  const steps = [], included = new Set();
  const appendStep = (added, title, note, type = 'assembly') => {
    for (const part of added) included.add(part.id);
    steps.push({
      title,
      note,
      type,
      added: added.map(part => ({ id: part.id, sku: part.sku, name: nameFor(part) })),
      joint: added.at(-1)?.mate ? {part:added.at(-1).id,...added.at(-1).mate} : null,
      parts: parts.filter(part => included.has(part.id)).map(part => structuredClone(part)),
    });
  };

  const root = roots[0];
  const rootChildren = children.get(root.id) || [];
  if (!rootChildren.length) {
      appendStep([root], `Đặt ${nameFor(root)} theo hình`, `Đặt ${nameFor(root)} trên mặt phẳng và xoay theo đúng hướng trong hình. Đây là chi tiết đầu tiên, chưa có mối nối.`);
  } else {
    const first = ordered.find(part => part.id !== root.id && part.mate?.target === root.id);
    const firstEdge = rootChildren.find(item => item.part.id === first?.id);
    if (!first || !firstEdge) blockers.push(`${nameFor(root)} has no valid first connection.`);
    else {
      const action = jointDescription(first, root, firstEdge.sourceRef, firstEdge.targetRef, nameFor);
      appendStep([root, first], `Lắp ${nameFor(first)} vào ${nameFor(root)}`, `${action}. Giữ cụm bằng tay và lắp theo hướng mũi tên.`);
    }
  }

  for (const part of ordered) {
    if (included.has(part.id)) continue;
    const parent = byId.get(part.mate?.target);
    const edge = children.get(parent?.id)?.find(item => item.part.id === part.id);
    if (!parent || !edge) {
      blockers.push(`${nameFor(part)} is missing its assembly connection.`);
      continue;
    }
    const action = jointDescription(part, parent, edge.sourceRef, edge.targetRef, nameFor);
    const note = collar(part) ? `Luồn vòng chặn vào trục sau các chi tiết cần giữ. Đặt như hình; chừa khe để các chi tiết quay tự do, không ép chặt gây kẹt.` : `${action}. Giữ cụm bằng tay và lắp theo hướng mũi tên.`;
    appendStep([part], `Lắp ${nameFor(part)} vào ${nameFor(parent)}`, note);
  }

  const looseElectronics = parts.filter(part => isElectronic(part.sku) && !included.has(part.id));
  if (looseElectronics.length) {
    warnings.push('Brain, battery or other electronics without a modeled joint are placed at the end. Their mounting and cable routing are not represented in the CAD.');
    const names = looseElectronics.map(nameFor);
    appendStep(looseElectronics, `Add ${names.join(' and ')}`, 'Mount the electronics securely to the completed chassis and route the cables without pulling or trapping them. The CAD does not specify exact mounting points or cable paths.', 'electronics');
  }

  return { ready: blockers.length === 0 && steps.length > 0, steps, blockers: [...new Set(blockers)], notes: warnings };
}

// Retained for older project/test imports; generated guides do not allow manual reordering.
export function sequenceIssue(steps) {
  let previous = new Set();
  for (let i = 0; i < steps.length; i++) {
    const current = new Set(steps[i].parts.map(part => part.id));
    if ([...previous].some(id => !current.has(id))) return `Step ${i + 1} removes earlier parts.`;
    if (steps[i].parts.some(part => part.mate?.target && !current.has(part.mate.target))) return `Step ${i + 1} contains an attachment without its target part.`;
    previous = current;
  }
  return null;
}
