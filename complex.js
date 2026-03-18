function c(n,i=0) {
  if (Array.isArray(n)) return n;
  return [n,i]
}

function c_pol(r,p) {
  return [r*cos(p),r*sin(p)];
}

function c_real(z) {
  return [z[0],0];
}

function c_imag(z) {
  return [z[1],0];
}

function n_abs(z) {
  return hypot(z[0],z[1])
}

function n_arg(z) {
  return atan2(z[1],z[0])
}

function c_abs(z) {
  return [hypot(z[0],z[1]),0];
}

function c_arg(z) {
  return [atan2(z[1],z[0]),0];
}

function c_neg(z) {
  return [-z[0],-z[1]];
}

function c_conj(z) {
  return [z[0],-z[1]];
}

function c_sq(z) {
  var [x,y] = z;
  return [x*x-y*y,2*x*y];
}

function c_cube(z) {
  var [x,y] = z;
  return [x*x*x-3*x*y*y,3*x*x*y-y*y*y];
}

function c_sqrt(z) {
  var [x,y] = z;
  var ab = n_abs(z);
  return [
    sqrt((ab+x)/2),
    sqrt((ab-x)/2) * sign(y)
  ];
}

function c_pow(z,w) {
    return c_exp(c_mul(w,c_ln(z)));
}

function n_pow(z,n) {
  return c_pol(n_abs(z) ** n, n_arg(z) * n);
}

function c_exp(z) {
  return c_pol(exp(z[0]),z[1]);
}

function c_ln(z) {
  return [ln(n_abs(z)),n_arg(z)];
}

function c_recip(z) {
  var [x,y] = z,
      den = x*x+y*y;
  return [x/den,-y/den];
}

function c_add(z,w) {
  return [z[0]+w[0],z[1]+w[1]];
}

function c_sub(z,w) {
  return [z[0]-w[0],z[1]-w[1]];
}

function n_mul(z,n) {
  return [z[0]*n,z[1]*n];
}

function n_div(z,n) {
  return [z[0]/n,z[1]/n];
}

function c_mul(z,w) {
  var [x,y] = z,
      [u,v] = w;
  return [x*u-y*v,x*v+y*u];
}

function c_div(z,w) {
  return c_mul(z,c_recip(w))
}

function i_mul(z) {
  return [-z[1],z[0]];
}

function e_mul(z,w) {
  return n_mul(z,exp(w));
}

function c_cis(z) {
  return c_exp(i_mul(z));
}

function c_add8(a,b,c,d,e,f,g,h) {
  return [
    a[0]+b[0]+c[0]+d[0]+e[0]+f[0]+g[0]+h[0],
    a[1]+b[1]+c[1]+d[1]+e[1]+f[1]+g[1]+h[1],
  ];
}

function c_sin(z) {
  var iz = i_mul(z);
  return n_mul(i_mul(c_sub(c_exp(iz),c_exp(c_neg(iz)))),-.5);
}

function c_cos(z) {
  var iz = i_mul(z);
  return n_mul(c_add(c_exp(iz),c_exp(c_neg(iz))),.5);
}

function c_tan(z) {
  return i_mul(c_tanh(c_neg(i_mul(z))));
}

function c_csc(z) {
  return c_recip(c_sin(z));
}

function c_sec(z) {
  return c_recip(c_cos(z));
}

function c_cot(z) {
  return c_recip(c_tan(z));
}

function c_sinh(z) {
  var exp_z = c_exp(z);
  return n_mul(c_sub(exp_z, c_recip(exp_z)), .5);;
}

function c_cosh(z) {
  var exp_z = c_exp(z);
  return n_mul(c_add(exp_z, c_recip(exp_z)), .5);
}

function c_tanh(z) {
  var a = c_exp(n_mul(z, 2.));
  var b = c_recip(a);
  if (z[0] > 0) {
    return c_div(c_sub(c_one, b), c_add(c_one, b));
  } else {
    return c_div(c_sub(a, c_one), c_add(a, c_one));
  }
}

function c_csch(z) {
  return c_recip(c_sinh(z));
}

function c_sech(z) {
  return c_recip(c_cosh(z));
}

function c_coth(z) {
  return c_recip(c_tanh(z));
}

function c_asin(z) {
  var a = c_sqrt(c_sub(c_one, c_sq(z)));
  if (z[1] < 0) {
    return c_neg(i_mul(c_ln(c_add(a, i_mul(z)))));
  } else {
    return c_neg(i_mul(c_neg(c_ln(c_sub(a, i_mul(z))))));
  }
}

function c_acos(z) {
  return c_sub([pi2,0], c_asin(z));
}

function c_atan(z) {
  var iz = i_mul(z);
  return n_mul(i_mul(c_sub(c_ln(c_sub(c_one, iz)), c_ln(c_add(c_one, iz)))), .5);
}

function c_acsc(z) {
  return c_asin(c_recip(z));
}

function c_asec(z) {
  return c_acos(c_recip(z));
}

function c_acot(z) {
  return c_atan(c_recip(z));
}

function c_asinh(z) {
  return c_neg(i_mul(c_asin(i_mul(z))));
}

function c_acosh(z) {
  return c_neg(i_mul(c_acos(z)));
}

function c_atanh(z) {
  return c_neg(i_mul(c_atan(i_mul(z))));
}

function c_asech(z) {
  return c_neg(i_mul(c_asec(z)));
}

function c_acsch(z) {
  return c_neg(i_mul(c_acsc(c_neg(i_mul(z)))));
}

function c_acoth(z) {
  return c_neg(i_mul(c_acot(c_neg(i_mul(z)))));
}

function c_gamma(z) {
  if (z[0] < 0.5) {
    return c_gamma_left(z);
  } else {
    return c_gamma_right(z);
  }
}

function c_gamma_left(z) {
  return e_mul(
    c_recip(c_mul(
      c_sin(e_mul(z, lnpi)), 
      c_gamma_right(c_sub(c_one, z))
    )),
    lnpi
  );
}

function c_gamma_right(z) {
  var w = c_sub(z,c_one);
  var t = c_add(w, [7.5, 0]);
  var x = [0.99999999999980993, 0];
  x = c_add(x, n_mul(c_recip(c_add(w, [1, 0])), 676.5203681218851));
  x = c_sub(x, n_mul(c_recip(c_add(w, [2, 0])), 1259.1392167224028));
  x = c_add(x, n_mul(c_recip(c_add(w, [3, 0])), 771.32342877765313));
  x = c_sub(x, n_mul(c_recip(c_add(w, [4, 0])), 176.61502916214059));
  x = c_add(x, n_mul(c_recip(c_add(w, [5, 0])), 12.507343278686905));
  x = c_sub(x, n_mul(c_recip(c_add(w, [6, 0])), .13857109526572012));
  x = c_add(x, n_mul(c_recip(c_add(w, [7, 0])), 9.9843695780195716e-6));
  x = c_add(x, n_mul(c_recip(c_add(w, [8, 0])), 1.5056327351493116e-7));
  return n_mul(c_mul(x, c_exp(c_sub(c_mul(c_ln(t), c_add(w,[0.5, 0])),t))), sqrt(tau));
}

function c_fact(z) {
  return c_gamma(c_add(z,c_one));
}

function c_beta(z,w) {
  return c_div(c_mul(c_gamma(z), c_gamma(w)), c_gamma(c_add(z, w)));
}

function c_binom(z,w) {
  var zz = c_sub(z, w);
  return c_div(z, c_mul(c_mul(w, zz), c_beta(zz, w)));
}

function c_lambertw(z) {
  var L1 = c_ln(z);
  if (z[1] < -8.) {return z;}
  var est = (z[0]*z[0]+z[1]*z[1] > 9) ? c_sub(L1,c_ln(L1)) : c_sub(c_sqrt([e*z[0]+1,e*z[1]]),c_one);
  for (i = 0; i < 3; i++) {
    est = c_sub(est,c_div(c_mul(est, c_sub(c_add(est,c_ln(est)),L1)), [est[0]+1,est[1]]));
  }
  return est;
}


function czeta_helper(z, ns, bases) {
  var phases = bases.map(row => row.map(item => item * z[1]));
  var cutoff = sqrt(z[1]/tau) + 100*step(z[1],120);
  var res = [0, 0, 0, 0];
  for (row = 0; row < 4; row++) {
    var mags = bases[row].map(base => Math.exp(z[0] * base));
    var vcutoff = mags.map((mag, index) => clamp(0.884 * (cutoff - ns[row][index] + 0.5), 0, 1));
    var mags2 = vcutoff.map((cutoff, index) => cutoff / (ns[row][index] * mags[index]));
    mags = mags.map((mag, index) => mag * vcutoff[index]);
    var re = phases[row].map(phase => cos(phase));
    var im = phases[row].map(phase => sin(phase));

    res[0] += dot(mags, re);
    res[1] += dot(mags, im);
    res[2] += dot(mags2, re);
    res[3] += dot(mags2, im) * -1;
  }

  return res;
}

function czeta_helper_2(z, bases, coeffs) {
  var phases = bases.map(row => row.map(item => item * z[1]));
  var res = [0, 0];
  for (var row = 0; row < 4; row++) {
    var mags = bases[row].map((base, index) => exp(z[0] * base) * coeffs[row][index]);
    var re = phases[row].map(phase => cos(phase));
    var im = phases[row].map(phase => sin(phase));

    res[0] += dot(mags, re);
    res[1] += dot(mags, im);
  }
  return res;
}

function zeta_character(z) {
  var A = [-1 - 2*ln2, pi2];
  var B = [1 + ln2, 0];

  var zconj = [1 - 2*z[0], -2*z[1]];
  return c_exp(
    c_add(c_add(c_mul(z, c_add(A,c_ln(zconj)))
    ,n_mul((c_sub(B,c_ln(z))),.5))
    ,n_mul(zconj,(0.5 * lnpi)))
  );
}



function czeta_strip(z) {
  var zeta_est = [1,0,1,0];

  zeta_est = czeta_helper(z,
  mat4(2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17),
  mat4(
    -0.693147180560,-1.098612288668,-1.386294361120,-1.609437912434,
    -1.791759469228,-1.945910149055,-2.079441541680,-2.197224577336,
    -2.302585092994,-2.397895272798,-2.484906649788,-2.564949357462,
    -2.639057329615,-2.708050201102,-2.772588722240,-2.833213344056
  )).map((zh,i) => zh + zeta_est[i]);
  zeta_est = czeta_helper(z,
  mat4(18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33),
  mat4(
    -2.890371757896,-2.944438979166,-2.995732273554,-3.044522437723,
    -3.091042453358,-3.135494215929,-3.178053830348,-3.218875824868,
    -3.258096538021,-3.295836866004,-3.332204510175,-3.367295829986,
    -3.401197381662,-3.433987204485,-3.465735902800,-3.496507561466
  )).map((zh,i) => zh + zeta_est[i]);

  var zetaA = [zeta_est[0],zeta_est[1]];
  var zetaB = [zeta_est[2],zeta_est[3]];
  zetaB = c_mul(zetaB, c_conj(zeta_character(c_sub(c_one,c_conj(z)))));

  if (z[1] < 120) {
    var t = 1 - min(z[0], 1);
    var alpha = t*t * (3 - 2*t);
    return mix(zetaA, zetaB, alpha);
  } else {
    return c_add(zetaA, zetaB);
  }
}



function ceta_strip(z) {
  return c_mul(c_sub(c_one, c_exp([ln2 * (1-z[0]),ln2 * -z[1]])), czeta_strip(z));
}

function ceta_right(z) {
  if (z[0] < 3 && z[1] > 54) return ceta_strip(z);
  var result = [1,0];
  result = czeta_helper_2(z,
  mat4(
    -0.69314718055995,-1.09861228866811,-1.38629436111989,-1.60943791243410,
    -1.79175946922805,-1.94591014905531,-2.07944154167984,-2.19722457733622,
    -2.30258509299405,-2.39789527279837,-2.48490664978800,-2.56494935746154,
    -2.63905732961526,-2.70805020110221,-2.77258872223978,-2.83321334405622
  ),
  mat4(
    -1.00000000000000,1.00000000000000,-1.00000000000000,1.00000000000000,
    -0.99999999999995,0.99999999999847,-0.99999999996425,0.99999999937104,
    -0.99999999142280,0.99999990708781,-0.99999918494666,0.99999411949279,
    -0.99996466193028,0.99982127062071,-0.99923254216349,0.99718148818347
  )).map((zh,i) => zh + result[i]);
  result = czeta_helper_2(z,
  mat4(
    -2.89037175789616,-2.94443897916644,-2.99573227355399,-3.04452243772342,
    -3.09104245335832,-3.13549421592915,-3.17805383034795,-3.21887582486820,
    -3.25809653802148,-3.29583686600433,-3.33220451017520,-3.36729582998647,
    -3.40119738166216,-3.43398720448515,-3.46573590279973,-3.49650756146648
  ),
  mat4(
    -0.99109047939434,0.97562125072353,-0.94195422388664,0.87910910712444,
    -0.77852772396727,0.64073335549827,-0.47964042231228,0.31968999219853,
    -0.18572334624203,0.09196690020310,-0.03784892366350,0.01254701255408,
    -0.00320994916827,0.00059346134942,-0.00007044051625,0.00000402517236
  )).map((zh,i) => zh + result[i]);
  return result;
}

function ceta(z) {
  var conjugate_mask = [1,1];
  if (z[1] < 0) {
    z = c_conj(z);
    conjugate_mask[1] *= -1;
  }
  var result;
  if (z[0] < 0) {
    result = ceta_left(z);
  } else {
    result = ceta_right(z);
  }
  return [result[0] * conjugate_mask[0],result[1] * conjugate_mask[1]];
};

function ceta_left(z) {
  z[0] *= -1;
  var component_a;
  var SQ2PI2 = 1.2533141373155001;
  var log_r = ln(n_abs(z));
  if (z[1] > 200) {
    component_a = n_mul(i_mul(c_exp(
      [
        z[0] + (log_r - 1)*z[0] - log_r/2,
        (log_r - 1)*z[1] - pi/4
      ]
    )), SQ2PI2);
  } else if (z[1] > 20) {
    var theta = n_arg(z);
    component_a = n_mul(i_mul(c_exp(
      [
        (theta - pi2)*i_mul(z)[0] + (log_r - 1)*z[0] - .5*log_r,
        (theta - pi2)*i_mul(z)[1] + (log_r - 1)*z[1] - .5*theta
      ]
    )),SQ2PI2);
  } else {
    component_a = c_mul(c_gamma(z), c_sin(n_mul(z,pi2)));
  }
  var component_b = c_mul(z, ceta_right([z[0]+1,z[1]]));
  var multiplier_a = c_exp(n_mul(([z[0]+1,z[1]]),-lnpi));
  var multiplier_b = c_div(c_sub(c_one, c_exp([-ln2*(z[0]+1), -ln2*z[1]])), c_sub(c_one, c_exp([-ln2*z[0],-ln2*z[1]])));

  var component = c_mul(component_a, component_b);
  var multiplier = c_mul(multiplier_a, multiplier_b);
  return n_mul(c_conj(c_mul(component, multiplier)),2);
}

function c_zeta(z) {
  return c_div(ceta(z), c_sub(c_one, c_exp([ln2*(1-z[0]), ln2*(-z[1])])));
}

function c_nome(z) {
  return n_mul(i_mul(c_ln(z)), -pi2);
}

function c_erf(z) {
  let result;

  if (Math.abs(z[1]) > 5.5) {
    result = c_erf_large([Math.abs(z[0]), Math.abs(z[1])]);
  } else {
    result = c_erf_small([Math.abs(z[0]), Math.abs(z[1])]);
  }

  if (z[1] < 0) {
    result[1] *= -1;
  }
  if (z[0] < 0) {
    result[0] *= -1;
    result[0] -= 1e-7;
  }

  return result;
}


function rerf(z) {
  let k = 1.0 - Math.exp(-z[0] * z[0]);
  const K = 1.119;
  const coeff = [1.0 / 12.0, 7.0 / 480.0, 5.0 / 896.0, 787.0 / 276480.0];
  let series = 1.0 - dot(coeff, [k, k * k, k * k * k, k * k * k * k]);
  return [K * Math.sqrt(k) * series, 0];
}

function c_erf_large(z) {
  let k = i_mul(c_recip(z));
  let k2 = c_sq(k);
  let corrections = e_mul(
    c_mul(k, c_add(c_one, c_mul([0.5, 0], k2))),
    [-lnpi / 2, 0]
  );
  return c_add(
    c_one,
    i_mul(c_mul(c_exp(c_sq(i_mul(z))), corrections))
  );
}

function c_erf_small(z) {
  var z2 = z[0]*z[0];
  var xy = 2*z[0]*z[1];
  var K = exp(-z2)/pi;
  var q = 4*z2;
  var a = cos(xy);
  var b = sin(xy);
  var offset = (z[1] + z[0])*max(z[1] - z[0], 0);
  var scale = exp(-offset);
  var series = [0, 0];
  for (i = 0; i < 16; i += 4) {
    var k = [i+1,i+2,i+3,i+4];
    var kk = k.map(ki => (ki*ki)/4 + z2 + offset);
    var kz = k.map(ki => ki*z[1]);
    var e1 = kz.map((kzi,i) => exp(kzi - kk[i]));
    var e2 = kz.map((kzi,i) => exp(-kzi - kk[i]));
    var aa = k.map((ki,i) => z[0]*(e1[i] + e2[i]));
    var bb = k.map((ki,i) => .5*ki*(e1[i] - e2[i]));
    var denom = k.map(ki => 1/(ki*ki + q));
    series[0] += dot(e1.map((_, i) => 2*z[0]*exp(-kk[i]) - a*aa[i] + b*bb[i]), denom);
    series[1] += dot(bb.map((bbi, i) => b*aa[i] + a*bbi), denom);
  }
  let rerf_z = rerf(z);
  let result = [
    scale*(rerf_z[0] + (K/(2*z[0]))*(1 - a)) + series[0]*2/pi,
    scale*(rerf_z[1] + (K/(2*z[0]))*b) + series[1]*2/pi
  ];
  return result;
}

function c_theta00(z,w) {
  var result = [1,0];
  var A = [2*z[0],2*z[1]];
  for (i = 2; i < 10; i += 4) {
    var n = i;
    var B = n_mul(w,n);
    result = c_add(result, c_add8(
      c_cis(B.map((Bi,i) => pi*(n-1)*(B[i]-w[i]+A[i]))),
      c_cis(B.map((Bi,i) => pi*(n-1)*(B[i]-w[i]-A[i]))),
      c_cis(B.map((Bi,i) => pi*n*(B[i]+A[i]))),
      c_cis(B.map((Bi,i) => pi*n*(B[i]-A[i]))),
      c_cis(B.map((Bi,i) => pi*(n+1)*(B[i]+w[i]+A[i]))),
      c_cis(B.map((Bi,i) => pi*(n+1)*(B[i]+w[i]-A[i]))),
      c_cis(B.map((Bi,i) => pi*(n+2)*(B[i]+2*w[i]+A[i]))),
      c_cis(B.map((Bi,i) => pi*(n+2)*(B[i]+2*w[i]-A[i])))
    ));
  }
  return result;
}

function c_theta01(z,w) {
  return c_theta00([z[0]+.5,z[1]], w);
}

function c_theta10(z,w) {
  return c_mul(c_cis([pi*(z[0] + .25*w[0]),pi*(z[1] + .25*w[1])]), c_theta00([z[0] + .5*w[0],z[1] + .5*w[1]], w));
}

function c_theta11(z,w) {
  return c_mul(c_cis([.25*pi*(w[0] + 4*z[0] + 2),.25*pi*(w[1] + 4*z[1])]), c_theta00([z[0] + .5*(w[0] + 1),z[1] + .5*w[1]], w));
}

function c_exp_raw(z) {
  var phase = z[1];
  var expz = exp(max(z[0], -40));
  return [expz*cos(phase), expz*sin(phase)];
}

function theta000(z) {
  var result = [0.5,0];
  var iz = i_mul(z);
  for (i = 1; i < 8; i++) {
    var n = i;
    result = c_add(result,c_exp_raw(n_mul(iz,pi*n*n)));
  }
  return n_mul(result,2);
}

function theta00f(z,w) {
  var result = [1,0];
  var A = n_mul(i_mul(z),2);
  var iw = i_mul(w);
  for (i = 1; i < 4; i++) {
    var n = i;
    var B = n_mul(iw,n);
    result = c_add(result,c_exp_raw(n_mul(c_add(B,A),pi*n)));
    result = c_add(result,c_exp_raw(n_mul(c_sub(B,A),pi*n)));
  }
  return result;
}

function theta01f(z,w) {
  return theta00f([z[0] + .5, z[1]], w);
}

function theta10f(z,w) {
  return c_mul(c_exp_raw(n_mul(i_mul(c_add(z,n_mul(w,.25))),pi)), theta00f(c_add(z,n_mul(w,.5)), w));
}

function theta11f(z,w) {
  return c_mul(
    c_exp_raw(n_mul(i_mul(c_add(c_add(w,n_mul(z,4)),[2,0])),0.25 * pi)), 
    theta00f(c_add(z,n_mul([w[0]+1,w[1]],.5)), w)
  );
}

function invert_tau(z) {
  var rt_k = c_sqrt(c_sqrt(c_sub(c_one,c_sq(z))));
  var ell = n_mul(c_div(c_sub(c_one, rt_k), c_add(c_one, rt_k)),.5);
  var log_l = c_ln(ell);
  var q = c_add(c_add(ell, n_mul(c_exp_raw(n_mul(log_l,.5)),2)), n_mul(c_exp_raw(n_mul(log_l,.9)),15));
  return c_neg(n_div(i_mul(c_ln(q)),pi));
}

function jacobi_reduce(z,w) {
  var t00 = theta000(w);
  var zz = c_div(z, n_mul(c_sq(t00),pi));
  var n = 2*floor(.5*zz[1]/w[1] + .5);
  return c_sub(zz, n_mul(w,n));
}


function raw_sn(z,w) {
  return c_neg(c_div(
    c_mul(theta000(w), theta11f(z, w)),
    c_mul(theta10f([0,0], w), theta01f(z, w))
  ));
};

function raw_cn(z,w) {
  return c_div(
    c_mul(theta01f([0,0], w), theta10f(z, w)),
    c_mul(theta10f([0,0], w), theta01f(z, w))
  );
};

function raw_dn(z,w) {
  return c_div(
    c_mul(theta01f([0,0], w), theta00f(z, w)),
    c_mul(theta000(w), theta01f(z, w))
  );
};

function csn(z,w) {
var t = invert_tau(w);
var zz = jacobi_reduce(z, t);
return raw_sn(zz, t);
}

function ccn(z,w) {
var t = invert_tau(w);
var zz = jacobi_reduce(z, t);
return raw_cn(zz, t);
}

function cdn(z,w) {
var t = invert_tau(w);
var zz = jacobi_reduce(z, t);
return raw_dn(zz, t);
}


function zeta(s, N=1000) {
  var z = [0,0];
  for (n=1; n<N; n++) {
    z = c_add(z,c_recip(c_pow([n,0],s)));
  }
  return z;
}

function c_der(f,h=.0001) {
  return z => {
    var zh = [z[0]+h,z[1]+h],
        fzh = f(zh),
        fz = f(z),
        n = [fzh[0] - fz[0], fzh[1] - fz[1]];
    return c_div(n,[h,h]);
  };
}