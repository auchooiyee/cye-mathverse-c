// Integer-weight simple networks. Crossings in the drawing do not create vertices.
export function validateNetwork(m) {
  const ids = new Set(m.nodes.map(n => n.id));
  if (ids.size !== m.nodes.length || !ids.has(m.start) || !ids.has(m.end)) throw new Error('Invalid mission vertices');
  const pairs = new Set();
  for (const e of m.edges) {
    const pair = [e.a, e.b].sort().join('|');
    if (!ids.has(e.a) || !ids.has(e.b) || e.a === e.b || pairs.has(pair)) throw new Error('Expected a simple network');
    pairs.add(pair);
    if (![e.km,e.cost].every(w => Number.isSafeInteger(w) && w > 0)) throw new Error('Weights must be positive safe integers');
  }
  if (!m.required.every(id => ids.has(id)) || new Set(m.required).size !== m.required.length) throw new Error('Invalid stops');
  if (!['distance','cost','budget'].includes(m.goal)) throw new Error('Invalid goal');
  if (m.goal === 'budget' && (!Number.isSafeInteger(m.budget) || m.budget <= 0)) throw new Error('Invalid budget');
  return true;
}

export function roadBetween(m, from, to) {
  return m.edges.find(e => e.a === from && e.b === to || !e.directed && e.b === from && e.a === to);
}
export function neighbours(m, from) {
  return m.nodes.filter(n => { const e=roadBetween(m,from,n.id); return e && !e.closed; });
}
export function inspectRoute(m, route) {
  const fail=(tag,message)=>({valid:false,tag,message,km:0,cost:0,legs:[],missing:[...m.required]});
  if (!Array.isArray(route) || route.length<1 || route.length>65 || route.some(id=>typeof id!=='string'||!m.nodes.some(n=>n.id===id))) return fail('invalid-route','Choose known map stops, with at most 64 road segments.');
  if (route[0]!==m.start) return fail('wrong-start',`Start at ${m.start}, your dispatch point.`);
  let km=0,cost=0;const legs=[];
  for(let i=1;i<route.length;i++){
    const from=route[i-1],to=route[i],e=roadBetween(m,from,to);
    if(!e){const reverse=m.edges.find(e=>e.a===to&&e.b===from&&e.directed);return fail(reverse?'one-way':'not-connected',reverse?`${to} → ${from} is one-way. You cannot drive ${from} → ${to}.`:`There is no road from ${from} to ${to}. A line crossing is not a junction.`);}
    if(e.closed)return fail('closed-road',`Road ${from}–${to} is closed. Choose a detour.`);
    km+=e.km;cost+=e.cost;legs.push({from,to,km:e.km,cost:e.cost});
  }
  return {valid:true,km,cost,legs,missing:m.required.filter(id=>!route.includes(id)),end:route.at(-1)};
}

// Dijkstra over (vertex, visited-required-stop mask) supports delivery tours and ties.
export function optimalRoute(m) {
  validateNetwork(m);
  const metric=m.goal==='distance'?'km':'cost',full=(1<<m.required.length)-1;
  const bit=id=>{const i=m.required.indexOf(id);return i<0?0:1<<i;};
  const first={node:m.start,mask:bit(m.start),weight:0,route:[m.start]};
  const queue=[first],best=new Map([[`${first.node}|${first.mask}`,0]]);
  while(queue.length){
    queue.sort((a,b)=>a.weight-b.weight);const item=queue.shift(),key=`${item.node}|${item.mask}`;
    if(item.weight!==best.get(key))continue;
    if(item.node===m.end&&item.mask===full&&item.route.length>1)return {value:item.weight,route:item.route,metric};
    for(const n of neighbours(m,item.node)){
      const edge=roadBetween(m,item.node,n.id),mask=item.mask|bit(n.id),weight=item.weight+edge[metric],nextKey=`${n.id}|${mask}`;
      if(weight<(best.get(nextKey)??Infinity)){best.set(nextKey,weight);queue.push({node:n.id,mask,weight,route:[...item.route,n.id]});}
    }
  }
  return null;
}

export function gradeRoute(m, route) {
  const r=inspectRoute(m,route);
  if(!r.valid)return {...r,correct:false};
  const fail=(tag,message)=>({...r,correct:false,tag,message});
  if(route.length<2)return fail('empty','Add a connected stop before dispatching.');
  if(r.end!==m.end)return fail('wrong-destination',`Your route ends at ${r.end}. The delivery must finish at ${m.end}.`);
  if(r.missing.length)return fail('missing-stop',`Your route skips ${r.missing.join(', ')}. Visit every parcel stop before finishing.`);
  if(m.goal==='budget' && r.cost>m.budget)return fail('over-budget',`This route costs RM${r.cost}, which is RM${r.cost-m.budget} over the RM${m.budget} budget. Compare the road charges, then plan again.`);
  if(m.goal!=='budget'){
    const best=optimalRoute(m);if(!best)return fail('unreachable','No legal delivery route exists for this mission.');
    if(r[best.metric]!==best.value)return fail('not-optimal',`You reached every stop, but a ${m.goal==='cost'?'cheaper':'shorter'} route exists. Your ${m.goal==='cost'?`RM${r.cost}`:`${r.km} km`} route can be improved. Compare a different branch; fewer roads need not mean a smaller total.`);
  }
  return {...r,correct:true,tag:'delivered',message:m.goal==='budget'?`All parcels delivered for RM${r.cost}. RM${m.budget-r.cost} remains in your budget!`:`Delivery complete! ${m.goal==='cost'?`RM${r.cost} is the lowest cost`:`${r.km} km is a shortest route`}. Your route made the difference.`};
}
