var sin = Math.sin,
    cos = Math.cos,
    sinh = Math.sinh,
    cosh = Math.cosh,
    atan = Math.atan,
    atan2 = Math.atan2,
    hypot = Math.hypot,
    abs = Math.abs,
    sqrt = Math.sqrt,
    sign = Math.sign,
    exp = Math.exp,
    ln = Math.log,
    min = Math.min,
    max = Math.max,
    pow = Math.pow,
    floor = Math.floor,
    ceil = Math.ceil;

var pi = Math.PI,
    tau = 2 * pi,
    pi2 = pi / 2,
    pi3 = 3 * pi2,
    lnpi = ln(pi),
    ln2 = ln(2),
    e = Math.E;

var c_one = [1,0],
    c_i = [0,1];

var step = (x, edge) => x < edge ? 0 : 1;
var clamp = (v, n, m) => max(n, min(m, v));
var mat4 = (a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p) => [
  [a,b,c,d],[e,f,g,h],[i,j,k,l],[m,n,o,p]
];
var mix = (a,b,t) => a.map((ai,i) => ai + t*(b[i] - ai));
var fact = n => n <= 1 ? 1 : n * fact(n - 1);
var dot = (v1,v2) => v1.reduce((a,_,i) => a + v1[i]*v2[i], 0);
