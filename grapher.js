var canvas,ctx,width,height;
var ticks;
var N;
var mx, my, scalefactor
window.onload = function load(event) {
  canvas = document.getElementsByTagName('canvas')[0];
  ctx = canvas.getContext('2d');
  width = canvas.width = 999;
  height = canvas.height = 999;
  N=31;
  mx = 0;
  my = 0;
  scalefactor = 4;
  var m = document.getElementById('m'),
      d = document.getElementById('d');


  var ediv = document.createElement('div');
  document.body.appendChild(ediv)
  ediv.style = `
    position: absolute;
    top: 5px;
    width: 989px;
    display: flex;
  `;

  var inp = document.createElement('input');
  ediv.appendChild(inp)
  inp.style = `font: 14px Kurinto Mono;
  flex-grow: 1;`

  inp.value = 'z';

  var rbtn = document.createElement('button');
  ediv.appendChild(rbtn);
  rbtn.style = `font: 14px Kurinto Mono`
  rbtn.innerText = 'Run';

  rbtn.onclick = function() {
    run(inp.value);
  }

  inp.onkeydown = function(event) {
    if (event.key === 'Enter') run(inp.value);
  };

  window.onpointermove = function(event) {
    var [cx,cy] = [event.clientX,event.clientY],
        [x,y] = [cx-canvas.offsetLeft,cy-canvas.offsetTop],
        [xx,yy] = [S(xmin,xmax,x),-S(ymin,ymax,y)];
    mx = xx;
    my = yy;
    m.innerHTML = '&nbsp;(' + 
      xx.toFixed(2) + ',' + 
      yy.toFixed(2) + ')'

    m.style.left = cx + 'px';
    d.style.left = cx - 1 + 'px';
    m.style.top = cy - m.offsetHeight + 'px';
    d.style.top = cy - 1 + 'px';
    Z = [xx,yy];
  }
  d.onpointerdown = function(event) {
    if (!event.shiftKey) {
      xmin = (xmin + mx) / scalefactor;
      xmax = (xmax + mx) / scalefactor;
      ymin = (ymin - my) / scalefactor;
      ymax = (ymax - my) / scalefactor;
      run();
    } else {
      xmin = xmin * scalefactor - mx;
      xmax = xmax * scalefactor - mx;
      ymin = ymin * scalefactor + my;
      ymax = ymax * scalefactor + my;
      run();
    }
  }
  ticks = 0;
  init();
  run();
}





function run(expr) {

    if (expr) fn = compile(expr);
    //requestAnimationFrame(run);
    draw();
    ticks++;
}


function draw() {
ctx.fillStyle = 'black';
ctx.fillRect(0,0,width,height);
ctx.fillStyle = 'white';

ctx.fillText(ticks,width/2,height/2);

ctx.strokeStyle = 'white';
ctx.lineCap = 'square';
ctx.lineWidth = 1;

l1 = r => (2/pi) * atan(r);

l2 = (r,a) => pow(r,a) / (pow(r,a) + 1);

for (iy = 0; iy < 999; iy++) {
for (ix = 0; ix < 999; ix++) {
    
    var x = S(xmin,xmax,ix),
        y = S(ymin,ymax,iy),
        z = fn([x,y]);
        
    if (isNaN(z[0])) {
    ctx.strokeStyle = 'black';
    } else {
    var r = n_abs(z),
        zarg = n_arg(z),
        h = (360*zarg+tau/3)/tau,
        ll = 100*l2(r,.25);
    if (isNaN(ll)) ll = (r>0)*100;

    ctx.strokeStyle = 'hsl(' + h + ',100%,' + ll + '%)';
    }
    ctx.beginPath();
    ctx.moveTo(ix-.5,999-iy-.5);
    ctx.lineTo(ix-.5,999-iy-.5);
    ctx.stroke();
    ctx.closePath();
}}


}






var [xmin,xmax,ymin,ymax] = [-2.5,2.5,-2.5,2.5];
var fn;
function init() {
    
    fn = z => z;
    [xmin,xmax,ymin,ymax] = [-2.5,2.5,-2.5,2.5];
}


S = (min,max,n) => (max-min)/999 * n  + min;
SS = (min,max,c) => (c - min) * 999/(max-min);

f = [];
b = [];

b[-4] = [-10,10,-10,10];
f[-4] = zeta;


b[-3] = [-10,10,-10,10];
f[-3] = function(z) {
    var d = cos(2*z[0]) + cos(2*z[1]);
    return [
    sinh(2*z[0]) / d,
    sin(2*z[1]) / d,
    ]
}

b[-2] = [-10,10,-10,10];
f[-2] = z => c_gamma(z);

b[-1] = [-2,1,-1.5,1.5];
f[-1] = z => {
  var c = [z[0],z[1]];
  for (var i=0; i<64; i++) {
    z = c_add(c_mul(z, z), c);
  }
  return z;
}


//H_off=270
b[0] = [-5,5,-5,5];
f[0] = z => c_div(
c_mul(z, c_mul(
c_add(z,[3,-4]),
c_add(z,[-2,-3])
)),
c_mul(
c_add(z,[4,2]),
c_add(z,[-2,3])
))


f[1] = z => c_sin(z);
b[1] = [-7,7,-7,7];

f[2] = z => c_cos(z);
b[2] = [-7,7,-7,7];

f[3] = z => c_tan(z);
b[3] = [-7,7,-7,7];

f[4] = z => c_csc(z);
b[4] = [-7,7,-7,7];

f[5] = z => c_sec(z);
b[5] = [-7,7,-7,7];

f[6] = z => c_cot(z);
b[6] = [-7,7,-7,7];

f[7] = z => c_sinh(z);
b[7] = [-7,7,-7,7];

f[8] = z => c_cosh(z);
b[8] = [-7,7,-7,7];

f[9] = z => c_tanh(z);
b[9] = [-7,7,-7,7];

f[10] = z => c_csch(z);
b[10] = [-7,7,-7,7];

f[11] = z => c_sech(z);
b[11] = [-7,7,-7,7];

f[12] = z => c_coth(z);
b[12] = [-7,7,-7,7];

f[13] = z => c_asin(z);
b[13] = [-7,7,-7,7];

f[14] = z => c_acos(z);
b[14] = [-7,7,-7,7];

f[15] = z => c_atan(z);
b[15] = [-7,7,-7,7];

f[16] = z => c_acsc(z);
b[16] = [-7,7,-7,7];

f[17] = z => c_asec(z);
b[17] = [-7,7,-7,7];

f[18] = z => c_acot(z);
b[18] = [-7,7,-7,7];


f[19] = z => c_asinh(z);
b[19] = [-7,7,-7,7];

f[20] = z => c_acosh(z);
b[20] = [-7,7,-7,7];

f[21] = z => c_atanh(z);
b[21] = [-7,7,-7,7];

f[22] = z => c_acsch(z);
b[22] = [-7,7,-7,7];

f[23] = z => c_asech(z);
b[23] = [-7,7,-7,7];

f[24] = z => c_acoth(z);
b[24] = [-7,7,-7,7];

f[25] = z => c_gamma(z);
b[25] = [-7,7,-7,7];

f[26] = z => c_fact(z);
b[26] = [-7,7,-7,7];

f[27] = z => c_pow(c_cos(z),c_pow(z,c_pow(z,c_pow(z,c_pow(z,c_sin(z))))));
b[27] = [-7,7,-7,7];

f[28] = z => c_add(c_add(c_add(n_mul(n_pow(z,3),5),n_mul(n_pow(z,2),-5)),n_mul(z,-4)),[5,0]);
b[28] = [-7,7,-7,7];

f[29] = z => c_add(c_add(n_mul(c_sq(z),15),n_mul(z,-10)),[-4,0])
b[29] = [-7,7,-7,7];

f[30] = c_der(c_gamma);
b[30] = [-7,7,-7,7];

f[31] = theta000;
b[31] = [-15,15,-15,15];

f[32] = z => czeta_strip(z);
b[32] = [-1,1,-1,1];