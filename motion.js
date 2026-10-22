/* Native scroll, one shared image world, restrained camera motion. No scroll interception. */
(() => {
 'use strict';
 const root=document.documentElement;
 const media=matchMedia('(prefers-reduced-motion: reduce)');
 const sceneElements=[...document.querySelectorAll('.scene')];
 const toggle=document.querySelector('.motion-toggle');
 const blender=document.querySelector('.hero__blender');
 if(!sceneElements.length||!toggle||!blender)return;
 const clamp=(x,min=0,max=1)=>Math.min(max,Math.max(min,x));
 const smooth=x=>x*x*(3-2*x);
 const world=document.createElement('div');world.className='world';world.setAttribute('aria-hidden','true');world.dataset.renderer='css';
 const layers=sceneElements.map((section,index)=>{
  const image=section.querySelector('.scene__image').cloneNode();image.className='world__layer';image.alt='';image.removeAttribute('loading');image.removeAttribute('fetchpriority');image.decoding='async';image.style.opacity=index===0?'1':'0';world.append(image);return image;
 });
 document.body.prepend(world);root.classList.add('motion-ready');
 let paused=false,raf=0,last=0,time=0,scroll=scrollY,camera=scrollY,px=0,py=0,tx=0,ty=0,renderer=null;
 let viewport={width:innerWidth,height:innerHeight};
 let geometry=[];
 const contents=sceneElements.map(e=>e.querySelector('.hero__content,.studio__content,.workflow__content,.selling__content,.closing__content'));
 const screens=[...document.querySelectorAll('.scene-product')];let screenGeometry=[];
 const nav=document.querySelector('.nav');
 const navTargets=[['top','#top'],['ai-studio','#ai-studio'],['build-process','#ai-studio'],['workflow-ai','#workflow-ai'],['workspace','#workflow-ai'],['integrations','#integrations'],['ai-toolkit','#integrations'],['selling','#selling'],['frontend-examples','#selling'],['questions','#selling'],['start','#selling']];
 let navigation=[];
 function measure(){
  viewport={width:innerWidth,height:innerHeight};
  geometry=sceneElements.map(e=>({top:e.getBoundingClientRect().top+scrollY,height:e.offsetHeight}));
  screenGeometry=screens.map(e=>({top:e.offsetTop+e.closest('.scene').offsetTop,height:e.offsetHeight}));
  navigation=navTargets.map(([id,href])=>({top:document.getElementById(id).getBoundingClientRect().top+scrollY,href}));
  renderer?.resize();request();
 }
 function setMode(){
  root.dataset.motion=media.matches?'reduced':paused?'paused':'full';
  toggle.setAttribute('aria-pressed',String(paused));
  toggle.setAttribute('aria-label',paused?'Resume ambient motion':'Pause ambient motion');
  toggle.querySelector('.motion-toggle__label').textContent=paused?'Motion paused':'Motion on';
  toggle.querySelector('.motion-toggle__icon').textContent=paused?'▷':'Ⅱ';
  if(media.matches){renderer?.destroy();renderer=null;world.dataset.renderer='css';contents.forEach(e=>e.style.removeProperty('transform'));blender.style.removeProperty('transform');layers.forEach(e=>e.style.removeProperty('transform'));}
  else if(!renderer)initRenderer();
  last=0;request();
 }
 function request(){if(!raf&&!document.hidden)raf=requestAnimationFrame(frame)}
 function frame(now){
  raf=0;const dt=last?Math.min(50,now-last):16.67;last=now;
  const active=!media.matches&&!paused;
  if(active){time+=dt/1000;camera+=(scroll-camera)*(1-Math.exp(-dt/105));px+=(tx-px)*.055;py+=(ty-py)*.055}else{camera=scroll;px=0;py=0}
  const vh=viewport.height;
  let from=0,to=0,mix=0;
  for(let i=1;i<geometry.length;i++){
   // The next original artwork starts dissolving in before the chapter arrives.
   const progress=clamp((scroll-(geometry[i].top-vh*.8))/(vh*.85));
   if(progress>0){from=i-1;to=i;mix=smooth(progress)}
  }
  world.dataset.blend=mix.toFixed(4);world.dataset.scene=String(to);
  layers.forEach((layer,index)=>{
   layer.style.opacity=String(index===from?1:index===to?mix:0);
   if(active)layer.style.transform=`translate3d(${(px*5).toFixed(2)}px,${(Math.sin(time*.1)*5+(scroll-camera)*.025+py*4).toFixed(2)}px,0) scale(1.015)`;
  });
  if(renderer)renderer.draw(from,to,mix,time,active?px:0,active?py:0);
  const heroProgress=clamp(scroll/geometry[0].height);
  if(active){
   blender.style.transform=`translate3d(${(px*7).toFixed(2)}px,${(heroProgress*-85+py*5).toFixed(2)}px,0) rotate(${(heroProgress*7+px*.75).toFixed(2)}deg)`;
   contents.forEach((content,i)=>{
    const relative=(scroll-geometry[i].top)/vh;
    if(relative>-1.4&&relative<1.5)content.style.transform=`translate3d(0,${(clamp(relative,-1,1)*(viewport.width>650?-22:-10)).toFixed(2)}px,0)`;
   });
  }else{blender.style.removeProperty('transform');contents.forEach(e=>e.style.removeProperty('transform'))}
  screens.forEach((screen,i)=>{
   const depth=active?clamp((screenGeometry[i].top+screenGeometry[i].height*.5-scroll-vh*.5)/vh,-1,1):0;
   screen.style.setProperty('--screen-depth',`${(depth*(viewport.width>900?18:7)).toFixed(2)}px`);
  });
  const max=document.documentElement.scrollHeight-vh;
  root.style.setProperty('--page-progress',String(max>0?clamp(scroll/max):0));
  nav.classList.toggle('is-scrolled',scroll>70);
  let href='#top';for(const target of navigation)if(scroll+vh*.35>=target.top)href=target.href;
  nav.querySelectorAll('a[href^="#"]').forEach(a=>{if(a.getAttribute('href')===href)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});
  // Ambient rendering only while a scenic chapter is actually on screen.
  const scenic=geometry.some(g=>scroll+vh>g.top&&scroll<g.top+g.height);
  if((active&&scenic)||Math.abs(scroll-camera)>.15)request();
 }
 function initRenderer(){
  // File previews retain the composited CSS fallback; served pages use the same images as GPU textures.
  if(location.protocol==='file:'||media.matches||renderer)return;
  const canvas=document.createElement('canvas');
  const gl=canvas.getContext('webgl',{alpha:false,antialias:false,powerPreference:'low-power',preserveDrawingBuffer:false});
  if(!gl)return;
  const vertex='attribute vec2 a;varying vec2 uv;void main(){uv=(a+1.0)*0.5;gl_Position=vec4(a,0.,1.);}';
  const fragment=`precision mediump float;
   varying vec2 uv;uniform sampler2D one;uniform sampler2D two;uniform vec2 coverOne;uniform vec2 coverTwo;
   uniform float blend;uniform float clock;uniform vec2 pointer;
   vec2 flowing(vec2 p){float t=clock*.055;return vec2(sin(p.y*8.+t)*cos(p.x*4.-t*.7),cos(p.x*7.+t*.8)*sin(p.y*5.+t))*.0025;}
   vec3 image(sampler2D tex,vec2 ratio){vec2 q=(uv-.5)*ratio/1.045+.5;vec2 drift=vec2(sin(clock*.075)*.003,cos(clock*.06)*.003)+pointer*.0017;q+=flowing(q)+drift;return texture2D(tex,q).rgb;}
   void main(){vec3 a=image(one,coverOne);vec3 b=image(two,coverTwo);gl_FragColor=vec4(mix(a,b,blend),1.);}`;
  function shader(kind,source){const s=gl.createShader(kind);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)){gl.deleteShader(s);throw new Error('Shader compilation unavailable')}return s}
  try{
   const program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vertex));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);
   if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error('Renderer link unavailable');
   gl.useProgram(program);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
   const attr=gl.getAttribLocation(program,'a');gl.enableVertexAttribArray(attr);gl.vertexAttribPointer(attr,2,gl.FLOAT,false,0,0);
   const uniforms=Object.fromEntries(['one','two','coverOne','coverTwo','blend','clock','pointer'].map(k=>[k,gl.getUniformLocation(program,k)]));
   const textures=[];let destroyed=false;
   layers.forEach((image,index)=>{
    image.decode().then(()=>{
     if(destroyed)return;const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
     gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
     gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,image);textures[index]={texture,width:image.naturalWidth,height:image.naturalHeight};request();
    }).catch(()=>{ /* The source <img> remains the complete, accessible fallback. */ });
   });
   function cover(item){const ratio=viewport.width/viewport.height,source=item.width/item.height;return [Math.min(1,ratio/source),Math.min(1,source/ratio)]}
   const api={
    resize(){const dpr=Math.min(devicePixelRatio,viewport.width<650?1.25:1.5);canvas.width=Math.round(viewport.width*dpr);canvas.height=Math.round(viewport.height*dpr);gl.viewport(0,0,canvas.width,canvas.height)},
    draw(from,to,mix,clock,x,y){
     if(!textures[from]||!textures[to]){world.dataset.renderer='css';return}
     gl.useProgram(program);[from,to].forEach((index,unit)=>{gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,textures[index].texture)});
     gl.uniform1i(uniforms.one,0);gl.uniform1i(uniforms.two,1);gl.uniform2fv(uniforms.coverOne,cover(textures[from]));gl.uniform2fv(uniforms.coverTwo,cover(textures[to]));
     gl.uniform1f(uniforms.blend,mix);gl.uniform1f(uniforms.clock,clock);gl.uniform2f(uniforms.pointer,x,y);gl.drawArrays(gl.TRIANGLES,0,6);world.dataset.renderer='webgl';
    },
    destroy(){destroyed=true;textures.forEach(item=>gl.deleteTexture(item.texture));gl.deleteBuffer(buffer);gl.deleteProgram(program);canvas.remove()}
   };
   world.append(canvas);renderer=api;api.resize();
   canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();world.dataset.renderer='css';renderer=null;canvas.remove()});
  }catch(_){world.dataset.renderer='css';canvas.remove()}
 }
 toggle.addEventListener('click',()=>{paused=!paused;setMode()});
 addEventListener('scroll',()=>{scroll=scrollY;request()},{passive:true});
 addEventListener('resize',measure,{passive:true});
 if(matchMedia('(pointer:fine)').matches)addEventListener('pointermove',event=>{tx=(event.clientX/viewport.width-.5)*2;ty=(event.clientY/viewport.height-.5)*2;request()},{passive:true});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;last=0}else request()});
 media.addEventListener('change',setMode);
 if('ResizeObserver' in window)new ResizeObserver(measure).observe(document.querySelector('main'));
 measure();setMode();document.fonts.ready.then(measure);
})();
