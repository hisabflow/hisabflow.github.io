const CACHE='hisabflow-themes-v10-20';
const CORE=['./','./index.html','./manifest.json','./icon.svg','./icon-192.png','./icon-512.png','./icon-maskable-512.png'];
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(CACHE);await Promise.all(CORE.map(async u=>{try{await c.add(u)}catch(_){}}));await self.skipWaiting()})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
if(r.mode==='navigate'){e.respondWith((async()=>{const c=await caches.open(CACHE);const cached=(await c.match('./index.html'))||(await caches.match(r));
const net=fetch(r).then(fresh=>{if(fresh.ok)c.put('./index.html',fresh.clone());return fresh});net.catch(()=>{});
try{return await Promise.race([net,new Promise((_,rej)=>setTimeout(rej,4000))])}catch(_){if(cached)return cached;try{return await net}catch(__){return Response.error()}}})());return}
e.respondWith((async()=>{const hit=await caches.match(r);if(hit)return hit;try{const fresh=await fetch(r);if(fresh.ok){const c=await caches.open(CACHE);c.put(r,fresh.clone())}return fresh}catch(_){return Response.error()}})())});
