'use strict';
function inspectIP(value){
 const s=value.trim();
 if(/^\d{1,3}(\.\d{1,3}){3}$/.test(s)){
  const parts=s.split('.');
  if(parts.some(p=>Number(p)>255 || (p.length>1 && p[0]==='0')))return null;
  return {version:4,address:parts.join('.')};
 }
 if(!s.includes(':') || !/^[0-9a-fA-F:.]+$/.test(s))return null;
 try{const host=new URL('http://['+s+']/').hostname;return {version:6,address:host.slice(1,-1)};}catch{return null;}
}
if(typeof module!=='undefined')module.exports={inspectIP};
if(typeof document!=='undefined'){
 const el=id=>document.getElementById(id);let current='',hidden=false,busy=false,lastV4='',lastV6='';
 function paint(){el('address').textContent=hidden?'•••• •••• ••••':current;el('hide').textContent=hidden?'Show address':'Hide address';}
 async function request(host,version){const control=new AbortController();const timer=setTimeout(()=>control.abort(),8000);try{const r=await fetch('https://'+host+'?format=json',{signal:control.signal,cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer'});if(!r.ok)throw Error('Request failed');const d=await r.json();const ip=inspectIP(d.ip||'');if(!ip || (version && ip.version!==version))throw Error('Invalid response');return ip.address;}finally{clearTimeout(timer);}}
 el('refresh').addEventListener('click',async()=>{
  if(busy)return;busy=true;current='';hidden=false;el('refresh').disabled=true;el('copy').disabled=true;el('hide').disabled=true;el('address').textContent='Checking…';el('status').textContent='CHECKING';el('message').textContent='';el('ipv4').textContent='Checking…';el('ipv6').textContent='Checking…';el('checked').textContent='—';
  const result=await Promise.allSettled([request('api64.ipify.org'),request('api.ipify.org',4),request('api6.ipify.org',6)]);
  const v4=result[1].status==='fulfilled'?result[1].value:null;const v6=result[2].status==='fulfilled'?result[2].value:null;current=result[0].status==='fulfilled'?result[0].value:(v4||v6||'');
  lastV4=v4||'Unavailable';lastV6=v6||'Unavailable';el('ipv4').textContent=lastV4;el('ipv6').textContent=v6||'Unavailable';el('checked').textContent=new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',second:'2-digit'});
  if(current){paint();el('status').textContent='CHECK COMPLETE';el('detail').textContent='Public '+(inspectIP(current).version===4?'IPv4':'IPv6')+' seen by ipify. VPNs and proxies can change this address.';el('copy').disabled=false;el('hide').disabled=false;}else{el('address').textContent='Could not connect.';el('status').textContent='RETRY AVAILABLE';el('detail').textContent='The IP service could not be reached. Check your connection or browser blockers, then retry.';}
  el('refresh').textContent='Refresh IP ↻';el('refresh').disabled=false;busy=false;
 });
 el('copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(current);el('message').textContent='Address copied.';}catch{el('message').textContent='Clipboard unavailable. Show the address and select it to copy manually.';}});
 el('hide').addEventListener('click',()=>{hidden=!hidden;paint();el('ipv4').textContent=hidden?'Hidden':lastV4;el('ipv6').textContent=hidden?'Hidden':lastV6;});
 el('inspect-form').addEventListener('submit',e=>{e.preventDefault();const ip=inspectIP(el('input-ip').value);el('inspection').textContent=ip?'Valid IPv'+ip.version+' · '+ip.address:'That is not a valid IPv4 or IPv6 address. Enter an address without a port, URL, or brackets.';});
}
