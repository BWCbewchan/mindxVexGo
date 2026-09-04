import fs from 'node:fs/promises';
const path='app/training/missions.json';
const catalog=JSON.parse(await fs.readFile(path,'utf8')).filter(l=>!l.id.startsWith('thinking-'));
// Each route is authored around a separate learning question, not random maze seeds.
const routes=[
 ['Two stops, one direction','BEGINNER','Sequence and distance subtraction','Visit 1, then 2, then the goal. Work out each segment rather than using distances from the start.','Subtract consecutive x coordinates.',[[500,200],[950,200],[1400,200]]],
 ['Reverse parking','BEGINNER','Reverse versus turning','Visit the point behind the starting direction, then park at the goal. Try using reverse instead of a U-turn.','A negative displacement can be covered while keeping the same heading.',[[100,200],[100,750]]],
 ['Left is relative','BEGINNER','Robot-relative directions','Reach the lower point, then the point to its right, then the goal above it. Decide left and right from the robot heading.','After moving down, a left turn points right on the map.',[[200,650],[700,650],[700,200]]],
 ['Rectangle patrol','BEGINNER','Repeated opposite sides','Visit three corners in order and return to the start. Pair equal side lengths.','Opposite sides of a rectangle have equal lengths.',[[1100,200],[1100,900],[200,900],[200,200]]],
 ['Staircase courier','BEGINNER','Recognizing a repeated pair','Climb three map steps in order. Find the pair of movements that repeats.','One horizontal segment and one vertical segment form a step.',[[500,200],[500,500],[800,500],[800,800],[1100,800],[1100,1100]]],
 ['Unequal strides','BEGINNER','Changing a variable','Visit the markers on one line; the gaps grow each time. Consider storing the next distance in a variable.','The consecutive gaps are 200, 300, 400 and 500 mm.',[[400,200],[700,200],[1100,200],[1600,200]]],
 ['Triangle survey','INTERMEDIATE','Diagonal length and bearing','Visit the three survey corners in order. Work out a diagonal heading instead of using only right angles.','Use the horizontal and vertical differences to calculate distance and bearing.',[[1000,200],[600,900],[200,200]]],
 ['Diamond circuit','INTERMEDIATE','Exterior turn angles','Trace all four diamond corners and return. Compare the angle turned with the interior angle.','Equal diagonals create four equal route segments.',[[650,100],[1100,550],[650,1000],[200,550],[650,100]]],
 ['Figure-eight junction','INTERMEDIATE','State at a shared junction','Visit the numbered points on both loops in order. The shared center means different turns on different visits.','Use a stage variable to distinguish repeated visits to the center.',[[800,650],[1300,200],[1300,1100],[800,650],[300,1100],[300,200],[800,650]]],
 ['Out and back','BEGINNER','Reversing a sequence','Visit the outbound points, then return through them in reverse order.','Reverse the order of segments, not just each direction.',[[600,200],[600,800],[1200,800],[600,800],[600,200],[200,200]]],
 ['Nested patrol','INTERMEDIATE','Nested repetition','Trace a small rectangle, transfer to the next one, then trace that rectangle. Look for an inner and outer pattern.','Make a rectangle My Block and call it for each patrol area.',[[500,200],[500,500],[200,500],[200,200],[900,200],[1200,200],[1200,500],[900,500],[900,200]]],
 ['Compass reset','INTERMEDIATE','Absolute heading versus relative turn','Visit north, east, south and west survey points in order. Try turn-to-heading commands.','Heading 0 points up, 90 right, 180 down and 270 left.',[[700,200],[700,100],[1400,100],[1400,1000],[100,1000]]],
 ['Growing spiral','CHALLENGE','Arithmetic progressions','Trace the expanding spiral through all markers. Derive the next leg length from a pattern.','Two neighboring legs share a length before it increases.',[[400,200],[400,400],[100,400],[100,100],[700,100],[700,700],[100,700],[100,1300],[1300,1300]]],
 ['Zigzag inspection','INTERMEDIATE','Alternating decisions','Inspect alternating upper and lower markers without skipping their order.','Alternate the vertical direction after each horizontal step.',[[450,200],[450,1000],[800,1000],[800,200],[1150,200],[1150,1000],[1500,1000]]],
 ['Offset docking','INTERMEDIATE','Two-stage alignment','Reach the alignment point before the final narrow goal. Separate sideways positioning from the final approach.','Align one coordinate first, then approach along the other.',[[900,200],[900,1050],[1300,1050],[1300,1350]]],
 ['Coordinate translator','INTERMEDIATE','Coordinate differences','Visit markers with irregular spacing. Build a table of changes in x and y before coding.','Each command is based on the difference between the current and next point.',[[475,200],[475,675],[1125,675],[1125,1175],[1475,1175]]],
 ['Short-long rhythm','BEGINNER','Parameterized My Blocks','Follow alternating short and long legs. Reuse one movement routine with different arguments.','Pass the distance into your My Block rather than copying it.',[[350,200],[350,800],[500,800],[500,1400],[650,1400],[1250,1400]]],
 ['Heading wraparound','CHALLENGE','Angles across zero','Move between slanted markers across the north direction. Consider the shortest rotation across 0 degrees.','A heading close to 360 degrees is close to 0 degrees.',[[250,900],[150,200],[350,900],[450,200],[650,900]]],
 ['Cross the center twice','CHALLENGE','Remembering progress','Pass the center, complete the top branch, return to the center and take the bottom branch.','The same position can require different actions depending on progress.',[[800,800],[800,200],[1400,200],[800,800],[800,1400],[1400,1400]]],
 ['Symmetry workshop','INTERMEDIATE','Mirrored instructions','Trace one side, then its mirror. Decide which turns must change sign.','Mirroring keeps distances but swaps left and right turns.',[[500,200],[500,600],[800,600],[800,1000],[1100,1000],[1100,600],[1400,600]]],
 ['Progressive squares','CHALLENGE','Reusing a routine at different scales','Complete a small square followed by a larger square. Use the same routine with a new side length.','A square routine needs only one length argument.',[[400,200],[400,400],[200,400],[200,200],[800,200],[800,800],[200,800],[200,200]]],
 ['Return-point memory','CHALLENGE','Saving a reference position','Visit the inspection point, detour through the next markers, then return to the saved point.','Keep the inspection coordinate separate from your changing position.',[[700,200],[1100,650],[700,1100],[300,650],[700,200],[1400,200]]],
 ['Precision slalom','CHALLENGE','Smooth bearing changes','Visit small target regions on alternating diagonals. Choose headings carefully to stay inside each region.','Compute each new bearing from the next target rather than accumulating guesses.',[[450,450],[700,200],[950,450],[1200,200],[1450,450],[1450,1100]]],
 ['Mission decomposition','CHALLENGE','Planning independent subroutines','Visit the loading point, inspection area, service point and exit in that order. Give each stage a named My Block.','Write and test each stage before connecting the complete mission.',[[500,200],[500,1000],[1000,1000],[1000,500],[1450,500],[1450,1400]]]
];
for(const [index,[name,level,focus,description,hint,points]] of routes.entries()){
 const goal=points.at(-1);
 catalog.push({id:'thinking-'+(index+1),level:(43+index)+' · '+level,focus,hint,description:description+' Visit numbered checkpoints in order before the green goal.',field:{name,width:1800,height:1600,start:{x:200,y:200,heading:90},goal:{x:goal[0],y:goal[1],radius:45},walls:[],checkpoints:points.slice(0,-1).map(([x,y])=>({x,y,radius:45}))}});
}
const cargo=[
 ['Inspection before delivery','INTERMEDIATE','Multi-stage cargo workflow','Visit the inspection markers in order, then collect the red cargo and deliver it.','Separate inspection from pickup so the magnet is enabled only when needed.',[[500,1100],[1100,1100]],['red']],
 ['Shared red depot','INTERMEDIATE','Repeated deliveries to one destination','Deliver two red blocks to the shared red depot. Plan a return route that avoids the first delivered block.','Approach different positions inside the large shared delivery zone.',[[300,1100]],['red','red']],
 ['Cross-color dispatch','CHALLENGE','Matching rather than nearest destination','Deliver red and blue cargo to opposite-row destinations. The nearest zone has the wrong color.','Read cargo color before choosing the delivery destination.',[[800,1100]],['red','blue']],
 ['Three-stop dispatch','CHALLENGE','Reusable pickup and return cycle','Deliver three different cargo colors, returning to a clear travel lane after every drop.','A pickup-delivery-return My Block can accept row and destination arguments.',[[200,1200]],['red','green','blue']],
 ['Far-to-near collection','CHALLENGE','Choosing collection order','Inspect the far marker before collecting the two cargo blocks. Compare far-first and near-first delivery plans.','Your program can choose collection order after the mandatory inspection.',[[1300,1200],[300,1200]],['green','blue']],
 ['Final logistics exam','CHALLENGE','Combining planning and classification','Complete the ordered inspection route and sort three cargo colors into shuffled destinations.','Break the job into inspection, classification, transport and safe return phases.',[[600,1100],[1200,1100],[1200,1350],[200,1350]],['blue','red','green']]
];
for(const [i,[name,level,focus,description,hint,points,colors]] of cargo.entries()){
 const blocks=colors.map((color,j)=>({id:'parcel-'+j,x:450,y:300+j*300,color}));
 let zones=colors.map((color,j)=>({x:1350,y:300+j*300,radius:110,color}));
 if(i===1)zones=[{x:1350,y:550,radius:220,color:'red'}];
 if(i===2)zones=zones.map((z,j)=>({...z,y:600-j*300}));
 if(i===5)zones=zones.map((z,j)=>({...z,y:300+((j+1)%3)*300}));
 catalog.push({id:'thinking-'+(25+i),level:(67+i)+' · '+level,focus,hint,description,field:{name,width:1800,height:1600,start:{x:200,y:200,heading:90},goal:{x:1500,y:1300,radius:70},walls:[],blocks,zones,checkpoints:points.map(([x,y])=>({x,y,radius:55}))}});
}
await fs.writeFile(path,JSON.stringify(catalog,null,2)+'\n');
console.log('Added 30 authored reasoning missions; total '+catalog.length);
