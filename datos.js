/* =====================================================================
   FIGURAS SVG Y LAS 20 PREGUNTAS
===================================================================== */
const C = 'currentColor';
const wrap=(inner,w=100,h=100)=>`<svg viewBox="0 0 ${w} ${h}" width="100%" height="auto" aria-hidden="true">${inner}</svg>`;
const L = (x1,y1,x2,y2,w=7) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${C}" stroke-width="${w}" stroke-linecap="round"/>`;
const polyPts = (n,r=36,rot=-90) => {const p=[];for(let k=0;k<n;k++){const a=(rot+k*360/n)*Math.PI/180;p.push((50+r*Math.cos(a)).toFixed(1)+','+(50+r*Math.sin(a)).toFixed(1));}return p.join(' ')};
const poly = (n,r=36,fill='none') => `<polygon points="${polyPts(n,r)}" fill="${fill}" stroke="${C}" stroke-width="6" stroke-linejoin="round"/>`;
const arrow = a => wrap(`<g transform="rotate(${a} 50 50)">${L(50,79,50,27)}<path d="M37 39 L50 25 L63 39" fill="none" stroke="${C}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></g>`);
const dotsRow = n => {const g=16,x0=50-(n-1)*g/2;let s='';for(let i=0;i<n;i++)s+=`<circle cx="${x0+i*g}" cy="50" r="6.5" fill="${C}"/>`;return wrap(s)};
const P2 = [[17,17],[53,17],[17,53],[53,53]];
const shade2 = cells => wrap(P2.map((p,i)=>cells.includes(i)?`<rect x="${p[0]}" y="${p[1]}" width="30" height="30" rx="5" fill="${C}"/>`:`<rect x="${p[0]}" y="${p[1]}" width="30" height="30" rx="5" fill="none" stroke="${C}" stroke-width="5"/>`).join(''));
const cornerDot = pos => {const p={UL:[20,20],UR:[80,20],LR:[80,80],LL:[20,80],C:[50,50]}[pos];return wrap(`<rect x="20" y="20" width="60" height="60" rx="7" fill="none" stroke="${C}" stroke-width="6"/><circle cx="${p[0]}" cy="${p[1]}" r="8" fill="${C}"/>`)};
const nested = k => {const st=k>4?7:9;let s='';for(let i=0;i<k;i++){const o=i*st;s+=`<rect x="${14+o}" y="${14+o}" width="${72-2*o}" height="${72-2*o}" fill="none" stroke="${C}" stroke-width="${k>4?4:5}"/>`}return wrap(s)};
const nestedD = k => {let s='';for(let i=0;i<k;i++)s+=poly(4,36-i*9);return wrap(s)};
const clockFig = h => {const a=(h*30-90)*Math.PI/180;return wrap(`<circle cx="50" cy="50" r="34" fill="none" stroke="${C}" stroke-width="6"/><circle cx="${(50+26*Math.cos(a)).toFixed(1)}" cy="${(50+26*Math.sin(a)).toFixed(1)}" r="8" fill="${C}"/>`)};
const circE = wrap(`<circle cx="50" cy="50" r="32" fill="none" stroke="${C}" stroke-width="6"/>`);
const circF = wrap(`<circle cx="50" cy="50" r="32" fill="${C}"/>`);
const sqE = wrap(`<rect x="18" y="18" width="64" height="64" rx="7" fill="none" stroke="${C}" stroke-width="6"/>`);
const sqF = wrap(`<rect x="18" y="18" width="64" height="64" rx="7" fill="${C}"/>`);
const triE = wrap(poly(3,37));
const diaE = wrap(poly(4,37));
const triRot = (a,fill) => wrap(`<g transform="rotate(${a} 50 50)">${poly(3,34,fill==='fill'?C:'none')}</g>`);
const dotGrid = (cols,rows) => {let s='';const x0=50-(cols-1)*9,y0=50-(rows-1)*9;for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)s+=`<circle cx="${x0+c*18}" cy="${y0+r*18}" r="5.5" fill="${C}"/>`;return wrap(s)};
const track = pos => {let s='';for(let i=1;i<=5;i++){const x=4+(i-1)*19;s+=`<rect x="${x}" y="38" width="16" height="24" rx="4" fill="none" stroke="${C}" stroke-width="4"/>`;if(i===pos)s+=`<circle cx="${x+8}" cy="50" r="6" fill="${C}"/>`}return wrap(s)};
const cornerM = cor => {const m={UL:'M22 22 L44 22 L22 44 Z',UR:'M78 22 L78 44 L56 22 Z',LR:'M78 78 L56 78 L78 56 Z',LL:'M22 78 L22 56 L44 78 Z'};return wrap(`<rect x="22" y="22" width="56" height="56" rx="7" fill="none" stroke="${C}" stroke-width="6"/><path d="${m[cor]}" fill="${C}"/>`)};
const vDots = n => ({1:[50],2:[37,63],3:[24,50,76],4:[17,39,61,83]}[n].map(y=>`<circle cx="50" cy="${y}" r="7.5" fill="${C}"/>`).join(''));
const matrix=(cells,cols)=>{
  const rows=Math.ceil(cells.length/cols);
  let s='';
  cells.forEach((c,i)=>{
    const col=i%cols;
    const row=Math.floor(i/cols);
    const x=col*100;
    const y=row*100;
    
    // Extraer contenido interno si es un SVG completo
    let content = c;
    if (typeof c === 'string' && c.includes('<svg')) {
      const match = c.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
      if (match) content = match[1];
    }
    
    s+=`<g transform="translate(${x},${y})">`+(content==='?'
      ?`<rect x="20" y="20" width="60" height="60" rx="12" fill="none" stroke="${C}" stroke-width="4" stroke-dasharray="8 7"/><text x="50" y="66" text-anchor="middle" font-size="42" font-weight="800" fill="${C}" font-family="system-ui,sans-serif">?</text>`
      :content)+`</g>`});
  return wrap(s,cols*100,rows*100);
};
const cV=L(50,22,50,78), cH=L(22,50,78,50);
const cX=L(27,27,73,73)+L(73,27,27,73);
const sq = s => `<rect x="${50-s/2}" y="${50-s/2}" width="${s}" height="${s}" rx="5" fill="none" stroke="${C}" stroke-width="6"/>`;
const cSq=`<rect x="22" y="22" width="56" height="56" rx="7" fill="none" stroke="${C}" stroke-width="6"/>`;
const cDot=`<circle cx="50" cy="50" r="8" fill="${C}"/>`;
const cCir=`<circle cx="50" cy="50" r="30" fill="none" stroke="${C}" stroke-width="6"/>`;
const cCross=`<path d="M37 50 H63 M50 37 V63" stroke="${C}" stroke-width="7" stroke-linecap="round" fill="none"/>`;

const QUESTIONS = [
  {ask:'¿Qué figura completa la secuencia?',view:'seq',seq:[arrow(0),arrow(45),arrow(90)],opts:[arrow(225),arrow(135),arrow(0),arrow(90)],a:1,hint:'Observa cuánto gira la flecha de una figura a la siguiente… y hacia qué lado.',exp:'La flecha gira 45° en sentido horario en cada paso: arriba → diagonal → derecha; la siguiente apunta a la diagonal inferior derecha.'},
  {ask:'¿Qué figura falta?',view:'seq',seq:[wrap(poly(3)),wrap(poly(4)),wrap(poly(5))],opts:[wrap(`<circle cx="50" cy="50" r="34" fill="none" stroke="${C}" stroke-width="6"/>`),wrap(poly(6)),wrap(poly(3)),wrap(poly(5))],a:1,hint:'Cuenta los lados de cada figura: 3, 4, 5…',exp:'Cada figura tiene un lado más que la anterior: triángulo (3), cuadrado (4), pentágono (5) → hexágono (6).'},
  {ask:'¿Cuál continúa?',view:'seq',seq:[dotsRow(1),dotsRow(2),dotsRow(3)],opts:[dotsRow(2),dotsRow(4),dotsRow(6),dotsRow(3)],a:1,hint:'No mires la forma: cuenta cuántos puntos hay en cada paso.',exp:'El número de puntos aumenta de uno en uno: 1, 2, 3 → 4 puntos.'},
  {ask:'¿Qué opción completa la matriz?',view:'panel',panel:matrix([cV,cH,cV+cH,L(27,27,73,73),L(73,27,27,73),'?'],3),opts:[wrap(cX),wrap(cV+cH),wrap(L(27,27,73,73)),wrap(L(73,27,27,73))],a:0,hint:'En cada fila, la tercera figura junta las líneas de las dos primeras.',exp:'En cada fila, la tercera figura reúne las líneas de las dos primeras: diagonal ↘ y diagonal ↙ juntas forman la ✕.'},
  {ask:'¿Cuál sigue?',view:'seq',seq:[shade2([0]),shade2([0,1]),shade2([0,1,2])],opts:[shade2([0,1,2,3]),shade2([0,3]),shade2([1,3]),shade2([])],a:0,hint:'Fíjate en qué orden se van llenando las celdas.',exp:'Las celdas se van rellenando en orden de lectura (izquierda a derecha, arriba a abajo): ya hay 3 llenas, sigue la cuadrícula completa.'},
  {ask:'¿Qué pieza falta?',view:'seq',seq:[cornerDot('UL'),cornerDot('UR'),cornerDot('LR')],opts:[cornerDot('UR'),cornerDot('C'),cornerDot('LL'),cornerDot('UL')],a:2,hint:'Sigue el recorrido del punto por las esquinas: ¿en qué dirección avanza?',exp:'El punto avanza por las esquinas del cuadrado en sentido horario: superior izquierda → superior derecha → inferior derecha → inferior izquierda.'},
  {ask:'¿Cuál continúa la secuencia?',view:'seq',seq:[nested(1),nested(2),nested(3)],opts:[nested(4),nested(2),nested(3),nestedD(4)],a:0,hint:'Cuenta cuántos cuadrados hay dentro de cada figura.',exp:'Cada paso añade un cuadrado dentro del anterior: 1, 2, 3 → 4 cuadrados anidados (y siempre alineados, sin girar).'},
  {ask:'¿Qué opción completa el patrón?',view:'seq',seq:[circF,sqE,circF,sqE],opts:[sqF,circE,circF,sqE],a:2,hint:'El patrón se repite cada dos figuras: ¿qué pareja se alterna?',exp:'Se alternan dos estados: círculo relleno, cuadrado vacío, círculo relleno, cuadrado vacío… Tras el cuadrado vacío toca círculo relleno.'},
  {ask:'¿Cuál falta?',view:'seq',seq:[arrow(0),arrow(270),arrow(180)],opts:[arrow(90),arrow(0),arrow(180),arrow(270)],a:0,hint:'La flecha gira un cuarto de vuelta cada vez. ¿En qué sentido?',exp:'La flecha gira 90° en sentido antihorario por paso: arriba → izquierda → abajo → derecha.'},
  {ask:'¿Qué sigue?',view:'panel',panel:matrix([`<circle cx="50" cy="50" r="36" fill="none" stroke="${C}" stroke-width="6"/>`,`<circle cx="50" cy="50" r="26" fill="none" stroke="${C}" stroke-width="6"/>`,`<circle cx="50" cy="50" r="16" fill="none" stroke="${C}" stroke-width="6"/>`,sq(72),sq(52),'?'],3),opts:[sq(52),wrap(`<circle cx="50" cy="50" r="16" fill="none" stroke="${C}" stroke-width="6"/>`),wrap(sq(32)),sq(72)],a:2,hint:'Mira la fila completa: el mismo tipo de figura, pero distinto…',exp:'En cada fila las figuras se repiten en tamaño grande, mediano y pequeño. En la fila de los cuadrados falta el cuadrado pequeño.'},
  {ask:'¿Qué figura completa la serie?',view:'seq',seq:[wrap(poly(6)),wrap(poly(5)),wrap(poly(4))],opts:[wrap(`<circle cx="50" cy="50" r="34" fill="none" stroke="${C}" stroke-width="6"/>`),wrap(poly(4)),wrap(poly(3)),wrap(poly(6))],a:2,hint:'Cuenta los lados: 6, 5, 4…',exp:'Cada figura tiene un lado menos que la anterior: 6, 5, 4 → 3 lados: el triángulo.'},
  {ask:'¿Cuál completa la matriz?',view:'panel',panel:matrix([cornerM('UL'),cornerM('UR'),cornerM('LR'),'?'],2),opts:[cornerM('UR'),cornerM('LL'),cornerM('UL'),cornerM('LR')],a:1,hint:'La esquina marcada se mueve siempre igual: ¿hacia dónde gira?',exp:'En cada fila, la segunda figura es la primera girada 90° en sentido horario. La esquina inferior derecha girada 90° pasa a la inferior izquierda.'},
  {ask:'¿Qué opción continúa?',view:'seq',seq:[track(1),track(2),track(3),track(4),track(3)],opts:[track(4),track(2),track(5),track(1)],a:1,hint:'La ficha avanza hasta un extremo… ¿y después qué hace?',exp:'La ficha avanza hacia la derecha hasta el extremo (1, 2, 3, 4) y luego rebota en sentido contrario: 4, 3 → 2.'},
  {ask:'¿Cuál falta?',view:'seq',seq:[clockFig(12),clockFig(3),clockFig(6)],opts:[clockFig(3),clockFig(9),clockFig(6),clockFig(12)],a:1,hint:'Piensa en las horas de un reloj: ¿cuántas horas avanza cada paso?',exp:'El punto se mueve como la manecilla del reloj, avanzando 3 horas por paso: 12 → 3 → 6 → 9.'},
  {ask:'¿Qué figura sigue?',view:'seq',seq:[circE,sqE,triE,circE,sqE],opts:[diaE,sqE,triE,circE],a:2,hint:'La secuencia se repite en bloques. ¿Cada cuántas figuras?',exp:'El ciclo se repite cada tres figuras: círculo, cuadrado, triángulo. Después de círculo y cuadrado viene el triángulo.'},
  {ask:'¿Cuál completa el patrón?',view:'seq',seq:[dotGrid(1,1),dotGrid(2,1),dotGrid(2,2),dotGrid(4,2)],opts:[dotGrid(3,3),dotGrid(4,3),dotGrid(4,4),dotGrid(5,2)],a:2,hint:'Compara las cantidades: 1, 2, 4, 8… ¿qué operación las relaciona?',exp:'La cantidad de puntos se duplica en cada paso: 1, 2, 4, 8 → 16.'},
  {ask:'¿Qué opción continúa?',view:'seq',seq:[triRot(0,'fill'),triRot(45,'none'),triRot(90,'fill'),triRot(135,'none')],opts:[triRot(180,'none'),triRot(90,'fill'),triRot(180,'fill'),triRot(0,'none')],a:2,hint:'Aquí cambian dos cosas a la vez: la orientación y el relleno.',exp:'Dos reglas a la vez: el triángulo gira 45° por paso y el relleno se alterna (lleno, vacío…). El quinto triángulo está relleno y apunta hacia abajo.'},
  {ask:'¿Cuál falta?',view:'panel',panel:matrix([vDots(1),vDots(2),vDots(3),vDots(2),vDots(3),vDots(1),vDots(3),vDots(1),'?'],3),opts:[wrap(vDots(3)),wrap(vDots(1)),wrap(vDots(4)),wrap(vDots(2))],a:3,hint:'Revisa filas y columnas: todas contienen exactamente 1, 2 y 3 puntos.',exp:'Cada fila y cada columna contiene exactamente 1, 2 y 3 puntos. En la última fila ya están el 3 y el 1: falta el grupo de 2 puntos.'},
  {ask:'¿Qué figura completa la serie?',view:'panel',panel:matrix([cSq,cDot,cSq+cDot,cCir,cCross,'?'],3),opts:[wrap(cCir+cCross),wrap(cSq+cCross),wrap(cCir+cDot),wrap(cCross)],a:0,hint:'La tercera figura de cada fila se arma con las dos primeras.',exp:'La tercera figura de cada fila combina las dos primeras: el contorno de la primera más el elemento de la segunda. Círculo + cruz = círculo con cruz.'},
  {ask:'¿Cuál es la mejor continuación?',view:'panel',panel:matrix([shade2([0,1]),shade2([0,2]),shade2([1,2]),shade2([0,3]),shade2([3,2]),shade2([0,2]),shade2([0,3]),shade2([1,3]),'?'],3),opts:[shade2([2,3]),shade2([0,1]),shade2([0,2]),shade2([0,1,2,3])],a:1,hint:'Compara las dos primeras figuras de la fila: lo que se repite… desaparece.',exp:'En cada fila, la tercera figura conserva solo las celdas que aparecen en una sola de las dos primeras (lo repetido se cancela). La celda inferior derecha se repite y desaparece: queda la fila superior llena.'}
  // ===== PREGUNTAS AVANZADAS (21-25) =====

{ask:'¿Qué figura completa la matriz?',view:'panel',
 panel:matrix([
   wrap(`<circle cx="50" cy="50" r="30" fill="none" stroke="${C}" stroke-width="5"/>`),
   wrap(`<circle cx="50" cy="50" r="20" fill="none" stroke="${C}" stroke-width="5"/>`),
   wrap(`<circle cx="50" cy="50" r="10" fill="none" stroke="${C}" stroke-width="5"/>`),
   wrap(`<rect x="20" y="20" width="60" height="60" fill="none" stroke="${C}" stroke-width="5"/>`),
   wrap(`<rect x="30" y="30" width="40" height="40" fill="none" stroke="${C}" stroke-width="5"/>`),
   '?',
   wrap(`<polygon points="50,20 80,80 20,80" fill="none" stroke="${C}" stroke-width="5"/>`),
   wrap(`<polygon points="50,35 65,65 35,65" fill="none" stroke="${C}" stroke-width="5"/>`),
   wrap(`<polygon points="50,50 57,65 43,65" fill="none" stroke="${C}" stroke-width="5"/>`)
 ],3),
 opts:[wrap(`<rect x="40" y="40" width="20" height="20" fill="none" stroke="${C}" stroke-width="5"/>`),
       wrap(`<rect x="35" y="35" width="30" height="30" fill="none" stroke="${C}" stroke-width="5"/>`),
       wrap(`<rect x="25" y="25" width="50" height="50" fill="none" stroke="${C}" stroke-width="5"/>`),
       wrap(`<rect x="20" y="20" width="60" height="60" fill="none" stroke="${C}" stroke-width="5"/>`)],a:0,
 hint:'Observa cada fila: la misma figura en tres tamaños diferentes.',
 exp:'Cada fila muestra la misma figura (círculo, cuadrado, triángulo) en tamaño grande, mediano y pequeño. En la fila del cuadrado falta el más pequeño.'},

{ask:'¿Cuál continúa la secuencia?',view:'seq',
 seq:[wrap(`<g><rect x="10" y="10" width="30" height="30" fill="${C}"/><circle cx="70" cy="70" r="15" fill="none" stroke="${C}" stroke-width="5"/></g>`),
      wrap(`<g><rect x="25" y="25" width="30" height="30" fill="${C}"/><circle cx="55" cy="55" r="15" fill="none" stroke="${C}" stroke-width="5"/></g>`),
      wrap(`<g><rect x="40" y="40" width="30" height="30" fill="${C}"/><circle cx="40" cy="40" r="15" fill="none" stroke="${C}" stroke-width="5"/></g>`),
      wrap(`<g><rect x="55" y="55" width="30" height="30" fill="${C}"/><circle cx="25" cy="25" r="15" fill="none" stroke="${C}" stroke-width="5"/></g>`)],
 opts:[wrap(`<g><rect x="70" y="70" width="30" height="30" fill="${C}"/><circle cx="10" cy="10" r="15" fill="none" stroke="${C}" stroke-width="5"/></g>`),
       wrap(`<g><rect x="10" y="70" width="30" height="30" fill="${C}"/><circle cx="70" cy="10" r="15" fill="none" stroke="${C}" stroke-width="5"/></g>`),
       wrap(`<g><rect x="40" y="40" width="30" height="30" fill="${C}"/><circle cx="40" cy="40" r="15" fill="none" stroke="${C}" stroke-width="5"/></g>`),
       wrap(`<g><rect x="25" y="25" width="30" height="30" fill="${C}"/><circle cx="55" cy="55" r="15" fill="none" stroke="${C}" stroke-width="5"/></g>`)],a:0,
 hint:'Hay dos figuras moviéndose en direcciones opuestas.',
 exp:'El cuadrado relleno se mueve diagonalmente hacia abajo-derecha, mientras el círculo vacío se mueve hacia arriba-izquierda. Ambos avanzan 15px por paso.'},

{ask:'¿Qué figura falta en la matriz?',view:'panel',
 panel:matrix([
   wrap(`<line x1="20" y1="50" x2="80" y2="50" stroke="${C}" stroke-width="6"/>`),
   wrap(`<line x1="50" y1="20" x2="50" y2="80" stroke="${C}" stroke-width="6"/>`),
   wrap(`<line x1="20" y1="20" x2="80" y2="80" stroke="${C}" stroke-width="6"/><line x1="80" y1="20" x2="20" y2="80" stroke="${C}" stroke-width="6"/>`),
   wrap(`<circle cx="50" cy="50" r="30" fill="none" stroke="${C}" stroke-width="5"/>`),
   wrap(`<rect x="20" y="20" width="60" height="60" fill="none" stroke="${C}" stroke-width="5"/>`),
   '?',
   wrap(`<polygon points="50,20 80,80 20,80" fill="none" stroke="${C}" stroke-width="5"/>`),
   wrap(`<polygon points="50,20 80,50 50,80 20,50" fill="none" stroke="${C}" stroke-width="5"/>`),
   wrap(`<polygon points="30,30 70,30 70,70 30,70" fill="none" stroke="${C}" stroke-width="5"/>`)
 ],3),
 opts:[wrap(`<circle cx="50" cy="50" r="30" fill="none" stroke="${C}" stroke-width="5"/><rect x="20" y="20" width="60" height="60" fill="none" stroke="${C}" stroke-width="5"/>`),
       wrap(`<circle cx="50" cy="50" r="20" fill="none" stroke="${C}" stroke-width="5"/>`),
       wrap(`<rect x="30" y="30" width="40" height="40" fill="none" stroke="${C}" stroke-width="5"/>`),
       wrap(`<circle cx="50" cy="50" r="30" fill="${C}"/>`)],a:0,
 hint:'La tercera columna combina las figuras de las dos primeras.',
 exp:'En cada fila, la tercera figura es la superposición de las dos primeras: línea horizontal + vertical = cruz; círculo + cuadrado = círculo dentro de cuadrado; triángulo + rombo = triángulo dentro de rombo.'},

{ask:'¿Cuál es la siguiente figura?',view:'seq',
 seq:[wrap(`<g><circle cx="30" cy="50" r="12" fill="${C}"/><circle cx="70" cy="50" r="12" fill="none" stroke="${C}" stroke-width="4"/></g>`),
      wrap(`<g><circle cx="30" cy="50" r="12" fill="none" stroke="${C}" stroke-width="4"/><circle cx="70" cy="50" r="12" fill="${C}"/></g>`),
      wrap(`<g><circle cx="30" cy="30" r="12" fill="${C}"/><circle cx="70" cy="70" r="12" fill="none" stroke="${C}" stroke-width="4"/></g>`),
      wrap(`<g><circle cx="30" cy="30" r="12" fill="none" stroke="${C}" stroke-width="4"/><circle cx="70" cy="70" r="12" fill="${C}"/></g>`)],
 opts:[wrap(`<g><circle cx="50" cy="30" r="12" fill="${C}"/><circle cx="50" cy="70" r="12" fill="none" stroke="${C}" stroke-width="4"/></g>`),
       wrap(`<g><circle cx="50" cy="30" r="12" fill="none" stroke="${C}" stroke-width="4"/><circle cx="50" cy="70" r="12" fill="${C}"/></g>`),
       wrap(`<g><circle cx="30" cy="50" r="12" fill="${C}"/><circle cx="70" cy="50" r="12" fill="none" stroke="${C}" stroke-width="4"/></g>`),
       wrap(`<g><circle cx="70" cy="30" r="12" fill="${C}"/><circle cx="30" cy="70" r="12" fill="none" stroke="${C}" stroke-width="4"/></g>`)],a:1,
 hint:'Los círculos cambian de posición y alternan su relleno.',
 exp:'Los dos círculos intercambian posiciones (izquierda-derecha, luego diagonal) y alternan cuál está relleno. Tras la diagonal ascendente, viene la vertical con el círculo superior vacío.'},

{ask:'¿Qué figura completa el patrón?',view:'panel',
 panel:matrix([
   wrap(`<g><rect x="15" y="15" width="25" height="25" fill="${C}"/><rect x="60" y="60" width="25" height="25" fill="${C}"/></g>`),
   wrap(`<g><rect x="15" y="60" width="25" height="25" fill="${C}"/><rect x="60" y="15" width="25" height="25" fill="${C}"/></g>`),
   wrap(`<g><rect x="15" y="15" width="25" height="25" fill="${C}"/><rect x="60" y="15" width="25" height="25" fill="${C}"/><rect x="15" y="60" width="25" height="25" fill="${C}"/><rect x="60" y="60" width="25" height="25" fill="${C}"/></g>`),
   wrap(`<g><circle cx="27" cy="27" r="12" fill="${C}"/><circle cx="73" cy="73" r="12" fill="${C}"/></g>`),
   wrap(`<g><circle cx="27" cy="73" r="12" fill="${C}"/><circle cx="73" cy="27" r="12" fill="${C}"/></g>`),
   '?',
   wrap(`<g><polygon points="27,15 40,40 15,40" fill="${C}"/><polygon points="73,60 85,85 60,85" fill="${C}"/></g>`),
   wrap(`<g><polygon points="27,60 40,85 15,85" fill="${C}"/><polygon points="73,15 85,40 60,40" fill="${C}"/></g>`),
   wrap(`<g><polygon points="27,15 40,40 15,40" fill="${C}"/><polygon points="73,15 85,40 60,40" fill="${C}"/><polygon points="27,60 40,85 15,85" fill="${C}"/><polygon points="73,60 85,85 60,85" fill="${C}"/></g>`)
 ],3),
 opts:[wrap(`<g><circle cx="27" cy="27" r="12" fill="${C}"/><circle cx="73" cy="27" r="12" fill="${C}"/><circle cx="27" cy="73" r="12" fill="${C}"/><circle cx="73" cy="73" r="12" fill="${C}"/></g>`),
       wrap(`<g><circle cx="50" cy="50" r="20" fill="${C}"/></g>`),
       wrap(`<g><circle cx="27" cy="27" r="12" fill="${C}"/><circle cx="73" cy="73" r="12" fill="${C}"/></g>`),
       wrap(`<g><circle cx="27" cy="73" r="12" fill="${C}"/><circle cx="73" cy="27" r="12" fill="${C}"/></g>`)],a:0,
 hint:'La tercera columna muestra la combinación de las dos primeras.',
 exp:'En cada fila, la tercera figura contiene todos los elementos de las dos primeras: cuadrados diagonales + cuadrados cruzados = 4 cuadrados; círculos diagonales + círculos cruzados = 4 círculos; triángulos diagonales + triángulos cruzados = 4 triángulos.'}
];