/* Reference effect: real ambient video, not a moving still or scroll-linked camera.
   Scroll updates only navigation and the small reading indicator. Content stays in flow. */
(() => {
 'use strict';
 const root=document.documentElement;
 const video=document.querySelector('.scene__video');
 const hero=document.querySelector('.hero');
 const button=document.querySelector('.motion-toggle');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const nav=document.querySelector('.nav');
 const progress=document.querySelector('.reading-progress');
 const links=[...document.querySelectorAll('.nav a[href^="#"]')];
 const sections=links.map(link=>({link,target:document.querySelector(link.hash)})).filter(item=>item.target);
 let paused=false,visible=true,scrollQueued=false;
 try { paused=localStorage.getItem('lb-motion')==='paused'; } catch (_) {}
 function describe(){
  const stopped=paused||reduced.matches;
  root.dataset.motion=reduced.matches?'reduced':paused?'paused':'ambient-video';
  button.disabled=reduced.matches;
  button.querySelector('.motion-toggle__icon').textContent=stopped?'▶':'Ⅱ';
  button.setAttribute('aria-pressed',String(stopped));
  button.setAttribute('aria-label',reduced.matches?'Background motion disabled for reduced motion':stopped?'Play background motion':'Pause background motion');
  button.querySelector('.motion-toggle__label').textContent=stopped?'MOTION OFF':'MOTION ON';
 }
 async function playback(){
  describe();
  if(!video) return;
  if(paused||reduced.matches||!visible||document.hidden){video.pause();return}
  if(!video.src){video.src=video.dataset.src;video.load()}
  video.defaultMuted=true;video.muted=true;
  try {await video.play();} catch (_) { /* Static approved poster remains if autoplay is unavailable. */ }
 }
 video?.addEventListener('playing',()=>video.classList.add('is-ready'));
 video?.addEventListener('error',()=>video.classList.remove('is-ready'));
 button.addEventListener('click',()=>{
  paused=!(paused||reduced.matches);
  if(reduced.matches){describe();return}
  try {localStorage.setItem('lb-motion',paused?'paused':'active')} catch (_) {}
  playback();
 });
 reduced.addEventListener('change',playback);
 document.addEventListener('visibilitychange',playback);
 if('IntersectionObserver' in window){
  new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;playback()},{threshold:0}).observe(hero);
 }
 function navigation(){
  scrollQueued=false;
  const y=scrollY;
  nav?.classList.toggle('is-scrolled',y>60);
  if(progress){const total=root.scrollHeight-innerHeight;progress.style.transform=`scaleX(${total>0?Math.min(1,Math.max(0,y/total)):0})`}
  let current=sections[0];
  for(const item of sections){if(item.target.getBoundingClientRect().top<=innerHeight*.4) current=item}
  sections.forEach(item=>item.link===current?.link?item.link.setAttribute('aria-current','location'):item.link.removeAttribute('aria-current'));
 }
 addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(navigation)}},{passive:true});
 addEventListener('resize',navigation,{passive:true});
 navigation();playback();
})();
