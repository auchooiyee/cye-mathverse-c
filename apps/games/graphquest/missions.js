export const VERSION='graphquest-1.0.0';
export const SOURCE='https://bukuteksdigital.my/wp-content/uploads/2020/06/DSKP-MATEMATIK-Tingkatan-4-DAN-Tingkatan-5-KSSM.pdf';
const small=[['A','Depot',100,290,'depot'],['B','Bakery',275,130,'bakery'],['C','Park',325,350,'park'],['D','Café',590,210,'cafe']];
const large=[['A','Depot',85,280,'depot'],['B','Garden',250,110,'park'],['C','Station',280,365,'station'],['D','School',460,110,'school'],['E','Clinic',480,365,'clinic'],['F','Festival',665,245,'festival']];
const nodes=list=>list.map(([id,name,x,y,kind])=>({id,name,x,y,kind}));
const edges=list=>list.map(([a,b,km,cost=km,flag=''])=>({a,b,km,cost,directed:flag==='oneway',closed:flag==='closed'}));
const network1=[['A','B',4,3],['A','C',7,1],['B','C',2,1],['B','D',8,2],['C','D',3,5]];
const network2=[['A','B',3,2],['A','C',4,2],['B','C',2,1],['B','D',3,2,'closed'],['C','E',3,2],['D','E',2,1],['D','F',5,3],['E','F',3,2],['C','D',4,3]];
const network3=[['A','B',2,2],['A','C',3,1],['B','C',2,2],['B','D',3,2],['C','E',2,1],['D','E',2,3],['D','F',3,2],['E','F',2,2],['C','D',4,2]];
export const missions=[
  {id:'G01',title:'The morning bun run',district:'Old Town',chapter:'01 · FIND YOUR WAY',goal:'distance',start:'A',end:'D',required:[],nodes:nodes(small),edges:edges(network1),
    prompt:'Fresh buns are ready! Find a shortest route from the depot A to the café D. Road labels show kilometres.',
    story:'The café opens soon. A clever route will keep those buns warm.',parcel:'Warm buns',badge:'Neighbourhood navigator',hint:'Compare A–B–D, A–C–D and the routes through both B and C. Add the edge weights, not the lengths on the drawing.',sp:['5.1.2','5.1.5'],provenance:'Adapted topology from the user’s Number Academy exam-f4-5 workshop; independently checked.'},
  {id:'G02',title:'Small budget, big delivery',district:'Old Town',chapter:'01 · FIND YOUR WAY',goal:'cost',start:'A',end:'D',required:[],nodes:nodes(small),edges:edges(network1),
    prompt:'The next parcel needs the cheapest route from A to D. Labels now show RM road charges. The shortest distance may cost more!',
    story:'Same streets. A different goal. Watch the road charges this time.',parcel:'Art supplies',badge:'Smart spender',hint:'A road may be long but cheap. Start by comparing the charges on A–B and A–C; then compare routes through B and C.',sp:['5.1.2','5.1.5']},
  {id:'G03',title:'A bridge takes a day off',district:'Riverside',chapter:'02 · EXPECT A DETOUR',goal:'distance',start:'A',end:'F',required:[],nodes:nodes(large),edges:edges(network2),
    prompt:'The B–D bridge is closed for repairs. Find a shortest open route from depot A to festival F. Never use the striped road.',
    story:'The festival still needs its decorations. Let’s find another way across.',parcel:'Festival flags',badge:'Detour designer',hint:'Remove the closed B–D road from your plan. Compare the route through C and E with routes through D.',sp:['5.1.2','5.1.5']},
  {id:'G04',title:'Follow the flow',district:'Riverside',chapter:'02 · EXPECT A DETOUR',goal:'distance',start:'C',end:'D',required:[],nodes:nodes(large),edges:edges([
    ['A','B',3,2,'oneway'],['A','C',4,2,'oneway'],['B','C',2,1,'oneway'],['B','D',3,2,'oneway'],['C','E',3,2,'oneway'],['E','D',2,1,'oneway'],['D','F',5,3,'oneway'],['E','F',3,2,'oneway'],['E','B',1,1,'oneway']]),
    prompt:'Pick up library books at station C and deliver them to school D. Every road is one-way. Find a shortest legal route.',
    story:'Arrows are promises: the van can only travel in their direction.',parcel:'Library books',badge:'One-way wonder',hint:'C has only one outgoing road. From E, compare going straight to D with going through B.',sp:['5.1.2','5.1.5']},
  {id:'G05',title:'Two stops, one little van',district:'Garden Quarter',chapter:'03 · DELIVER TOGETHER',goal:'budget',budget:9,start:'A',end:'F',required:['B','E'],nodes:nodes(large),edges:edges(network3),
    prompt:'Visit garden B and clinic E, then finish at festival F. Spend no more than RM9. Any legal route within budget works!',
    story:'Plants for the garden, supplies for the clinic. You choose the order.',parcel:'Community parcels',badge:'Community courier',hint:'Tick off B and E on your route. Compare A–B–C–E–F with a route through D. A budget limit allows more than one good answer.',sp:['5.1.2','5.1.5']},
  {id:'G06',title:'The whole town is counting on you',district:'Garden Quarter',chapter:'03 · DELIVER TOGETHER',goal:'distance',start:'A',end:'A',required:['B','D','E','F'],nodes:nodes(large),edges:edges(network3),
    prompt:'Visit B, D, E and F, then return to depot A. Find a shortest complete delivery tour. You may revisit a stop when needed.',
    story:'One last round before sunset. Bring every parcel home to its people.',parcel:'Celebration kits',badge:'Town route master',hint:'Try a loop around the outside. Compare its sum with detours across the middle. A tour and its reverse can both be optimal.',sp:['5.1.5']}
].map(m=>({...m,gameId:'M4-05',sk:'5.1',version:VERSION,reviewerStatus:'teacher-review-pending',sourceUrl:SOURCE,provenance:m.provenance||'Original CYE-MathVerse scenario and network'}));
