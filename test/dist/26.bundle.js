(window.webpackJsonp=window.webpackJsonp||[]).push([[26],[,function(t,n,r){"use strict";var u={};r.r(u),r.d(u,"create",function(){return h}),r.d(u,"clone",function(){return s}),r.d(u,"copy",function(){return M}),r.d(u,"fromValues",function(){return d}),r.d(u,"set",function(){return l}),r.d(u,"identity",function(){return b}),r.d(u,"transpose",function(){return m}),r.d(u,"invert",function(){return q}),r.d(u,"adjoint",function(){return p}),r.d(u,"determinant",function(){return w}),r.d(u,"multiply",function(){return x}),r.d(u,"translate",function(){return g}),r.d(u,"scale",function(){return v}),r.d(u,"rotate",function(){return y}),r.d(u,"rotateX",function(){return A}),r.d(u,"rotateY",function(){return I}),r.d(u,"rotateZ",function(){return P}),r.d(u,"fromTranslation",function(){return F}),r.d(u,"fromScaling",function(){return D}),r.d(u,"fromRotation",function(){return R}),r.d(u,"fromXRotation",function(){return E}),r.d(u,"fromYRotation",function(){return T}),r.d(u,"fromZRotation",function(){return L}),r.d(u,"fromRotationTranslation",function(){return S}),r.d(u,"fromQuat2",function(){return V}),r.d(u,"getTranslation",function(){return z}),r.d(u,"getScaling",function(){return X}),r.d(u,"getRotation",function(){return Y}),r.d(u,"fromRotationTranslationScale",function(){return Z}),r.d(u,"fromRotationTranslationScaleOrigin",function(){return k}),r.d(u,"fromQuat",function(){return Q}),r.d(u,"frustum",function(){return j}),r.d(u,"perspective",function(){return J}),r.d(u,"perspectiveFromFieldOfView",function(){return O}),r.d(u,"ortho",function(){return W}),r.d(u,"lookAt",function(){return B}),r.d(u,"targetTo",function(){return C}),r.d(u,"str",function(){return G}),r.d(u,"frob",function(){return H}),r.d(u,"add",function(){return K}),r.d(u,"subtract",function(){return N}),r.d(u,"multiplyScalar",function(){return U}),r.d(u,"multiplyScalarAndAdd",function(){return $}),r.d(u,"exactEquals",function(){return _}),r.d(u,"equals",function(){return tt}),r.d(u,"mul",function(){return nt}),r.d(u,"sub",function(){return rt});var e={};r.r(e),r.d(e,"create",function(){return ut}),r.d(e,"clone",function(){return et}),r.d(e,"length",function(){return at}),r.d(e,"fromValues",function(){return ot}),r.d(e,"copy",function(){return it}),r.d(e,"set",function(){return ct}),r.d(e,"add",function(){return ft}),r.d(e,"subtract",function(){return ht}),r.d(e,"multiply",function(){return st}),r.d(e,"divide",function(){return Mt}),r.d(e,"ceil",function(){return dt}),r.d(e,"floor",function(){return lt}),r.d(e,"min",function(){return bt}),r.d(e,"max",function(){return mt}),r.d(e,"round",function(){return qt}),r.d(e,"scale",function(){return pt}),r.d(e,"scaleAndAdd",function(){return wt}),r.d(e,"distance",function(){return xt}),r.d(e,"squaredDistance",function(){return gt}),r.d(e,"squaredLength",function(){return vt}),r.d(e,"negate",function(){return yt}),r.d(e,"inverse",function(){return At}),r.d(e,"normalize",function(){return It}),r.d(e,"dot",function(){return Pt}),r.d(e,"cross",function(){return Ft}),r.d(e,"lerp",function(){return Dt}),r.d(e,"hermite",function(){return Rt}),r.d(e,"bezier",function(){return Et}),r.d(e,"random",function(){return Tt}),r.d(e,"transformMat4",function(){return Lt}),r.d(e,"transformMat3",function(){return St}),r.d(e,"transformQuat",function(){return Vt}),r.d(e,"rotateX",function(){return zt}),r.d(e,"rotateY",function(){return Xt}),r.d(e,"rotateZ",function(){return Yt}),r.d(e,"angle",function(){return Zt}),r.d(e,"str",function(){return kt}),r.d(e,"exactEquals",function(){return Qt}),r.d(e,"equals",function(){return jt}),r.d(e,"sub",function(){return Jt}),r.d(e,"mul",function(){return Ot}),r.d(e,"div",function(){return Wt}),r.d(e,"dist",function(){return Bt}),r.d(e,"sqrDist",function(){return Ct}),r.d(e,"len",function(){return Gt}),r.d(e,"sqrLen",function(){return Ht}),r.d(e,"forEach",function(){return Kt});var a={};r.r(a),r.d(a,"create",function(){return $t}),r.d(a,"identity",function(){return _t}),r.d(a,"setAxisAngle",function(){return tn}),r.d(a,"getAxisAngle",function(){return nn}),r.d(a,"multiply",function(){return rn}),r.d(a,"rotateX",function(){return un}),r.d(a,"rotateY",function(){return en}),r.d(a,"rotateZ",function(){return an}),r.d(a,"calculateW",function(){return on}),r.d(a,"slerp",function(){return cn}),r.d(a,"random",function(){return fn}),r.d(a,"invert",function(){return hn}),r.d(a,"conjugate",function(){return sn}),r.d(a,"fromMat3",function(){return Mn}),r.d(a,"fromEuler",function(){return dn}),r.d(a,"str",function(){return ln}),r.d(a,"clone",function(){return bn}),r.d(a,"fromValues",function(){return mn}),r.d(a,"copy",function(){return qn}),r.d(a,"set",function(){return pn}),r.d(a,"add",function(){return wn}),r.d(a,"mul",function(){return xn}),r.d(a,"scale",function(){return gn}),r.d(a,"dot",function(){return vn}),r.d(a,"lerp",function(){return yn}),r.d(a,"length",function(){return An}),r.d(a,"len",function(){return In}),r.d(a,"squaredLength",function(){return Pn}),r.d(a,"sqrLen",function(){return Fn}),r.d(a,"normalize",function(){return Dn}),r.d(a,"exactEquals",function(){return Rn}),r.d(a,"equals",function(){return En}),r.d(a,"rotationTo",function(){return Tn}),r.d(a,"sqlerp",function(){return Ln}),r.d(a,"setAxes",function(){return Sn});var o={};r.r(o),r.d(o,"create",function(){return Vn}),r.d(o,"clone",function(){return zn}),r.d(o,"fromValues",function(){return Xn}),r.d(o,"copy",function(){return Yn}),r.d(o,"set",function(){return Zn}),r.d(o,"add",function(){return kn}),r.d(o,"subtract",function(){return Qn}),r.d(o,"multiply",function(){return jn}),r.d(o,"divide",function(){return Jn}),r.d(o,"ceil",function(){return On}),r.d(o,"floor",function(){return Wn}),r.d(o,"min",function(){return Bn}),r.d(o,"max",function(){return Cn}),r.d(o,"round",function(){return Gn}),r.d(o,"scale",function(){return Hn}),r.d(o,"scaleAndAdd",function(){return Kn}),r.d(o,"distance",function(){return Nn}),r.d(o,"squaredDistance",function(){return Un}),r.d(o,"length",function(){return $n}),r.d(o,"squaredLength",function(){return _n}),r.d(o,"negate",function(){return tr}),r.d(o,"inverse",function(){return nr}),r.d(o,"normalize",function(){return rr}),r.d(o,"dot",function(){return ur}),r.d(o,"cross",function(){return er}),r.d(o,"lerp",function(){return ar}),r.d(o,"random",function(){return or}),r.d(o,"transformMat2",function(){return ir}),r.d(o,"transformMat2d",function(){return cr}),r.d(o,"transformMat3",function(){return fr}),r.d(o,"transformMat4",function(){return hr}),r.d(o,"rotate",function(){return sr}),r.d(o,"angle",function(){return Mr}),r.d(o,"str",function(){return dr}),r.d(o,"exactEquals",function(){return lr}),r.d(o,"equals",function(){return br}),r.d(o,"len",function(){return mr}),r.d(o,"sub",function(){return qr}),r.d(o,"mul",function(){return pr}),r.d(o,"div",function(){return wr}),r.d(o,"dist",function(){return xr}),r.d(o,"sqrDist",function(){return gr}),r.d(o,"sqrLen",function(){return vr}),r.d(o,"forEach",function(){return yr});const i=1e-6;let c="undefined"!=typeof Float32Array?Float32Array:Array;const f=Math.random;Math.PI;function h(){let t=new c(16);return c!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0),t[0]=1,t[5]=1,t[10]=1,t[15]=1,t}function s(t){let n=new c(16);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n[9]=t[9],n[10]=t[10],n[11]=t[11],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15],n}function M(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],t}function d(t,n,r,u,e,a,o,i,f,h,s,M,d,l,b,m){let q=new c(16);return q[0]=t,q[1]=n,q[2]=r,q[3]=u,q[4]=e,q[5]=a,q[6]=o,q[7]=i,q[8]=f,q[9]=h,q[10]=s,q[11]=M,q[12]=d,q[13]=l,q[14]=b,q[15]=m,q}function l(t,n,r,u,e,a,o,i,c,f,h,s,M,d,l,b,m){return t[0]=n,t[1]=r,t[2]=u,t[3]=e,t[4]=a,t[5]=o,t[6]=i,t[7]=c,t[8]=f,t[9]=h,t[10]=s,t[11]=M,t[12]=d,t[13]=l,t[14]=b,t[15]=m,t}function b(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function m(t,n){if(t===n){let r=n[1],u=n[2],e=n[3],a=n[6],o=n[7],i=n[11];t[1]=n[4],t[2]=n[8],t[3]=n[12],t[4]=r,t[6]=n[9],t[7]=n[13],t[8]=u,t[9]=a,t[11]=n[14],t[12]=e,t[13]=o,t[14]=i}else t[0]=n[0],t[1]=n[4],t[2]=n[8],t[3]=n[12],t[4]=n[1],t[5]=n[5],t[6]=n[9],t[7]=n[13],t[8]=n[2],t[9]=n[6],t[10]=n[10],t[11]=n[14],t[12]=n[3],t[13]=n[7],t[14]=n[11],t[15]=n[15];return t}function q(t,n){let r=n[0],u=n[1],e=n[2],a=n[3],o=n[4],i=n[5],c=n[6],f=n[7],h=n[8],s=n[9],M=n[10],d=n[11],l=n[12],b=n[13],m=n[14],q=n[15],p=r*i-u*o,w=r*c-e*o,x=r*f-a*o,g=u*c-e*i,v=u*f-a*i,y=e*f-a*c,A=h*b-s*l,I=h*m-M*l,P=h*q-d*l,F=s*m-M*b,D=s*q-d*b,R=M*q-d*m,E=p*R-w*D+x*F+g*P-v*I+y*A;return E?(E=1/E,t[0]=(i*R-c*D+f*F)*E,t[1]=(e*D-u*R-a*F)*E,t[2]=(b*y-m*v+q*g)*E,t[3]=(M*v-s*y-d*g)*E,t[4]=(c*P-o*R-f*I)*E,t[5]=(r*R-e*P+a*I)*E,t[6]=(m*x-l*y-q*w)*E,t[7]=(h*y-M*x+d*w)*E,t[8]=(o*D-i*P+f*A)*E,t[9]=(u*P-r*D-a*A)*E,t[10]=(l*v-b*x+q*p)*E,t[11]=(s*x-h*v-d*p)*E,t[12]=(i*I-o*F-c*A)*E,t[13]=(r*F-u*I+e*A)*E,t[14]=(b*w-l*g-m*p)*E,t[15]=(h*g-s*w+M*p)*E,t):null}function p(t,n){let r=n[0],u=n[1],e=n[2],a=n[3],o=n[4],i=n[5],c=n[6],f=n[7],h=n[8],s=n[9],M=n[10],d=n[11],l=n[12],b=n[13],m=n[14],q=n[15];return t[0]=i*(M*q-d*m)-s*(c*q-f*m)+b*(c*d-f*M),t[1]=-(u*(M*q-d*m)-s*(e*q-a*m)+b*(e*d-a*M)),t[2]=u*(c*q-f*m)-i*(e*q-a*m)+b*(e*f-a*c),t[3]=-(u*(c*d-f*M)-i*(e*d-a*M)+s*(e*f-a*c)),t[4]=-(o*(M*q-d*m)-h*(c*q-f*m)+l*(c*d-f*M)),t[5]=r*(M*q-d*m)-h*(e*q-a*m)+l*(e*d-a*M),t[6]=-(r*(c*q-f*m)-o*(e*q-a*m)+l*(e*f-a*c)),t[7]=r*(c*d-f*M)-o*(e*d-a*M)+h*(e*f-a*c),t[8]=o*(s*q-d*b)-h*(i*q-f*b)+l*(i*d-f*s),t[9]=-(r*(s*q-d*b)-h*(u*q-a*b)+l*(u*d-a*s)),t[10]=r*(i*q-f*b)-o*(u*q-a*b)+l*(u*f-a*i),t[11]=-(r*(i*d-f*s)-o*(u*d-a*s)+h*(u*f-a*i)),t[12]=-(o*(s*m-M*b)-h*(i*m-c*b)+l*(i*M-c*s)),t[13]=r*(s*m-M*b)-h*(u*m-e*b)+l*(u*M-e*s),t[14]=-(r*(i*m-c*b)-o*(u*m-e*b)+l*(u*c-e*i)),t[15]=r*(i*M-c*s)-o*(u*M-e*s)+h*(u*c-e*i),t}function w(t){let n=t[0],r=t[1],u=t[2],e=t[3],a=t[4],o=t[5],i=t[6],c=t[7],f=t[8],h=t[9],s=t[10],M=t[11],d=t[12],l=t[13],b=t[14],m=t[15];return(n*o-r*a)*(s*m-M*b)-(n*i-u*a)*(h*m-M*l)+(n*c-e*a)*(h*b-s*l)+(r*i-u*o)*(f*m-M*d)-(r*c-e*o)*(f*b-s*d)+(u*c-e*i)*(f*l-h*d)}function x(t,n,r){let u=n[0],e=n[1],a=n[2],o=n[3],i=n[4],c=n[5],f=n[6],h=n[7],s=n[8],M=n[9],d=n[10],l=n[11],b=n[12],m=n[13],q=n[14],p=n[15],w=r[0],x=r[1],g=r[2],v=r[3];return t[0]=w*u+x*i+g*s+v*b,t[1]=w*e+x*c+g*M+v*m,t[2]=w*a+x*f+g*d+v*q,t[3]=w*o+x*h+g*l+v*p,w=r[4],x=r[5],g=r[6],v=r[7],t[4]=w*u+x*i+g*s+v*b,t[5]=w*e+x*c+g*M+v*m,t[6]=w*a+x*f+g*d+v*q,t[7]=w*o+x*h+g*l+v*p,w=r[8],x=r[9],g=r[10],v=r[11],t[8]=w*u+x*i+g*s+v*b,t[9]=w*e+x*c+g*M+v*m,t[10]=w*a+x*f+g*d+v*q,t[11]=w*o+x*h+g*l+v*p,w=r[12],x=r[13],g=r[14],v=r[15],t[12]=w*u+x*i+g*s+v*b,t[13]=w*e+x*c+g*M+v*m,t[14]=w*a+x*f+g*d+v*q,t[15]=w*o+x*h+g*l+v*p,t}function g(t,n,r){let u,e,a,o,i,c,f,h,s,M,d,l,b=r[0],m=r[1],q=r[2];return n===t?(t[12]=n[0]*b+n[4]*m+n[8]*q+n[12],t[13]=n[1]*b+n[5]*m+n[9]*q+n[13],t[14]=n[2]*b+n[6]*m+n[10]*q+n[14],t[15]=n[3]*b+n[7]*m+n[11]*q+n[15]):(u=n[0],e=n[1],a=n[2],o=n[3],i=n[4],c=n[5],f=n[6],h=n[7],s=n[8],M=n[9],d=n[10],l=n[11],t[0]=u,t[1]=e,t[2]=a,t[3]=o,t[4]=i,t[5]=c,t[6]=f,t[7]=h,t[8]=s,t[9]=M,t[10]=d,t[11]=l,t[12]=u*b+i*m+s*q+n[12],t[13]=e*b+c*m+M*q+n[13],t[14]=a*b+f*m+d*q+n[14],t[15]=o*b+h*m+l*q+n[15]),t}function v(t,n,r){let u=r[0],e=r[1],a=r[2];return t[0]=n[0]*u,t[1]=n[1]*u,t[2]=n[2]*u,t[3]=n[3]*u,t[4]=n[4]*e,t[5]=n[5]*e,t[6]=n[6]*e,t[7]=n[7]*e,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=n[11]*a,t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],t}function y(t,n,r,u){let e,a,o,c,f,h,s,M,d,l,b,m,q,p,w,x,g,v,y,A,I,P,F,D,R=u[0],E=u[1],T=u[2],L=Math.sqrt(R*R+E*E+T*T);return L<i?null:(R*=L=1/L,E*=L,T*=L,e=Math.sin(r),o=1-(a=Math.cos(r)),c=n[0],f=n[1],h=n[2],s=n[3],M=n[4],d=n[5],l=n[6],b=n[7],m=n[8],q=n[9],p=n[10],w=n[11],x=R*R*o+a,g=E*R*o+T*e,v=T*R*o-E*e,y=R*E*o-T*e,A=E*E*o+a,I=T*E*o+R*e,P=R*T*o+E*e,F=E*T*o-R*e,D=T*T*o+a,t[0]=c*x+M*g+m*v,t[1]=f*x+d*g+q*v,t[2]=h*x+l*g+p*v,t[3]=s*x+b*g+w*v,t[4]=c*y+M*A+m*I,t[5]=f*y+d*A+q*I,t[6]=h*y+l*A+p*I,t[7]=s*y+b*A+w*I,t[8]=c*P+M*F+m*D,t[9]=f*P+d*F+q*D,t[10]=h*P+l*F+p*D,t[11]=s*P+b*F+w*D,n!==t&&(t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t)}function A(t,n,r){let u=Math.sin(r),e=Math.cos(r),a=n[4],o=n[5],i=n[6],c=n[7],f=n[8],h=n[9],s=n[10],M=n[11];return n!==t&&(t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[4]=a*e+f*u,t[5]=o*e+h*u,t[6]=i*e+s*u,t[7]=c*e+M*u,t[8]=f*e-a*u,t[9]=h*e-o*u,t[10]=s*e-i*u,t[11]=M*e-c*u,t}function I(t,n,r){let u=Math.sin(r),e=Math.cos(r),a=n[0],o=n[1],i=n[2],c=n[3],f=n[8],h=n[9],s=n[10],M=n[11];return n!==t&&(t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[0]=a*e-f*u,t[1]=o*e-h*u,t[2]=i*e-s*u,t[3]=c*e-M*u,t[8]=a*u+f*e,t[9]=o*u+h*e,t[10]=i*u+s*e,t[11]=c*u+M*e,t}function P(t,n,r){let u=Math.sin(r),e=Math.cos(r),a=n[0],o=n[1],i=n[2],c=n[3],f=n[4],h=n[5],s=n[6],M=n[7];return n!==t&&(t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[0]=a*e+f*u,t[1]=o*e+h*u,t[2]=i*e+s*u,t[3]=c*e+M*u,t[4]=f*e-a*u,t[5]=h*e-o*u,t[6]=s*e-i*u,t[7]=M*e-c*u,t}function F(t,n){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=n[0],t[13]=n[1],t[14]=n[2],t[15]=1,t}function D(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=n[1],t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=n[2],t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function R(t,n,r){let u,e,a,o=r[0],c=r[1],f=r[2],h=Math.sqrt(o*o+c*c+f*f);return h<i?null:(o*=h=1/h,c*=h,f*=h,u=Math.sin(n),a=1-(e=Math.cos(n)),t[0]=o*o*a+e,t[1]=c*o*a+f*u,t[2]=f*o*a-c*u,t[3]=0,t[4]=o*c*a-f*u,t[5]=c*c*a+e,t[6]=f*c*a+o*u,t[7]=0,t[8]=o*f*a+c*u,t[9]=c*f*a-o*u,t[10]=f*f*a+e,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t)}function E(t,n){let r=Math.sin(n),u=Math.cos(n);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=u,t[6]=r,t[7]=0,t[8]=0,t[9]=-r,t[10]=u,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function T(t,n){let r=Math.sin(n),u=Math.cos(n);return t[0]=u,t[1]=0,t[2]=-r,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=r,t[9]=0,t[10]=u,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function L(t,n){let r=Math.sin(n),u=Math.cos(n);return t[0]=u,t[1]=r,t[2]=0,t[3]=0,t[4]=-r,t[5]=u,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function S(t,n,r){let u=n[0],e=n[1],a=n[2],o=n[3],i=u+u,c=e+e,f=a+a,h=u*i,s=u*c,M=u*f,d=e*c,l=e*f,b=a*f,m=o*i,q=o*c,p=o*f;return t[0]=1-(d+b),t[1]=s+p,t[2]=M-q,t[3]=0,t[4]=s-p,t[5]=1-(h+b),t[6]=l+m,t[7]=0,t[8]=M+q,t[9]=l-m,t[10]=1-(h+d),t[11]=0,t[12]=r[0],t[13]=r[1],t[14]=r[2],t[15]=1,t}function V(t,n){let r=new c(3),u=-n[0],e=-n[1],a=-n[2],o=n[3],i=n[4],f=n[5],h=n[6],s=n[7],M=u*u+e*e+a*a+o*o;return M>0?(r[0]=2*(i*o+s*u+f*a-h*e)/M,r[1]=2*(f*o+s*e+h*u-i*a)/M,r[2]=2*(h*o+s*a+i*e-f*u)/M):(r[0]=2*(i*o+s*u+f*a-h*e),r[1]=2*(f*o+s*e+h*u-i*a),r[2]=2*(h*o+s*a+i*e-f*u)),S(t,n,r),t}function z(t,n){return t[0]=n[12],t[1]=n[13],t[2]=n[14],t}function X(t,n){let r=n[0],u=n[1],e=n[2],a=n[4],o=n[5],i=n[6],c=n[8],f=n[9],h=n[10];return t[0]=Math.sqrt(r*r+u*u+e*e),t[1]=Math.sqrt(a*a+o*o+i*i),t[2]=Math.sqrt(c*c+f*f+h*h),t}function Y(t,n){let r=n[0]+n[5]+n[10],u=0;return r>0?(u=2*Math.sqrt(r+1),t[3]=.25*u,t[0]=(n[6]-n[9])/u,t[1]=(n[8]-n[2])/u,t[2]=(n[1]-n[4])/u):n[0]>n[5]&&n[0]>n[10]?(u=2*Math.sqrt(1+n[0]-n[5]-n[10]),t[3]=(n[6]-n[9])/u,t[0]=.25*u,t[1]=(n[1]+n[4])/u,t[2]=(n[8]+n[2])/u):n[5]>n[10]?(u=2*Math.sqrt(1+n[5]-n[0]-n[10]),t[3]=(n[8]-n[2])/u,t[0]=(n[1]+n[4])/u,t[1]=.25*u,t[2]=(n[6]+n[9])/u):(u=2*Math.sqrt(1+n[10]-n[0]-n[5]),t[3]=(n[1]-n[4])/u,t[0]=(n[8]+n[2])/u,t[1]=(n[6]+n[9])/u,t[2]=.25*u),t}function Z(t,n,r,u){let e=n[0],a=n[1],o=n[2],i=n[3],c=e+e,f=a+a,h=o+o,s=e*c,M=e*f,d=e*h,l=a*f,b=a*h,m=o*h,q=i*c,p=i*f,w=i*h,x=u[0],g=u[1],v=u[2];return t[0]=(1-(l+m))*x,t[1]=(M+w)*x,t[2]=(d-p)*x,t[3]=0,t[4]=(M-w)*g,t[5]=(1-(s+m))*g,t[6]=(b+q)*g,t[7]=0,t[8]=(d+p)*v,t[9]=(b-q)*v,t[10]=(1-(s+l))*v,t[11]=0,t[12]=r[0],t[13]=r[1],t[14]=r[2],t[15]=1,t}function k(t,n,r,u,e){let a=n[0],o=n[1],i=n[2],c=n[3],f=a+a,h=o+o,s=i+i,M=a*f,d=a*h,l=a*s,b=o*h,m=o*s,q=i*s,p=c*f,w=c*h,x=c*s,g=u[0],v=u[1],y=u[2],A=e[0],I=e[1],P=e[2],F=(1-(b+q))*g,D=(d+x)*g,R=(l-w)*g,E=(d-x)*v,T=(1-(M+q))*v,L=(m+p)*v,S=(l+w)*y,V=(m-p)*y,z=(1-(M+b))*y;return t[0]=F,t[1]=D,t[2]=R,t[3]=0,t[4]=E,t[5]=T,t[6]=L,t[7]=0,t[8]=S,t[9]=V,t[10]=z,t[11]=0,t[12]=r[0]+A-(F*A+E*I+S*P),t[13]=r[1]+I-(D*A+T*I+V*P),t[14]=r[2]+P-(R*A+L*I+z*P),t[15]=1,t}function Q(t,n){let r=n[0],u=n[1],e=n[2],a=n[3],o=r+r,i=u+u,c=e+e,f=r*o,h=u*o,s=u*i,M=e*o,d=e*i,l=e*c,b=a*o,m=a*i,q=a*c;return t[0]=1-s-l,t[1]=h+q,t[2]=M-m,t[3]=0,t[4]=h-q,t[5]=1-f-l,t[6]=d+b,t[7]=0,t[8]=M+m,t[9]=d-b,t[10]=1-f-s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function j(t,n,r,u,e,a,o){let i=1/(r-n),c=1/(e-u),f=1/(a-o);return t[0]=2*a*i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=2*a*c,t[6]=0,t[7]=0,t[8]=(r+n)*i,t[9]=(e+u)*c,t[10]=(o+a)*f,t[11]=-1,t[12]=0,t[13]=0,t[14]=o*a*2*f,t[15]=0,t}function J(t,n,r,u,e){let a,o=1/Math.tan(n/2);return t[0]=o/r,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=o,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=-1,t[12]=0,t[13]=0,t[15]=0,null!=e&&e!==1/0?(a=1/(u-e),t[10]=(e+u)*a,t[14]=2*e*u*a):(t[10]=-1,t[14]=-2*u),t}function O(t,n,r,u){let e=Math.tan(n.upDegrees*Math.PI/180),a=Math.tan(n.downDegrees*Math.PI/180),o=Math.tan(n.leftDegrees*Math.PI/180),i=Math.tan(n.rightDegrees*Math.PI/180),c=2/(o+i),f=2/(e+a);return t[0]=c,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=f,t[6]=0,t[7]=0,t[8]=-(o-i)*c*.5,t[9]=(e-a)*f*.5,t[10]=u/(r-u),t[11]=-1,t[12]=0,t[13]=0,t[14]=u*r/(r-u),t[15]=0,t}function W(t,n,r,u,e,a,o){let i=1/(n-r),c=1/(u-e),f=1/(a-o);return t[0]=-2*i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*c,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*f,t[11]=0,t[12]=(n+r)*i,t[13]=(e+u)*c,t[14]=(o+a)*f,t[15]=1,t}function B(t,n,r,u){let e,a,o,c,f,h,s,M,d,l,m=n[0],q=n[1],p=n[2],w=u[0],x=u[1],g=u[2],v=r[0],y=r[1],A=r[2];return Math.abs(m-v)<i&&Math.abs(q-y)<i&&Math.abs(p-A)<i?b(t):(s=m-v,M=q-y,d=p-A,e=x*(d*=l=1/Math.sqrt(s*s+M*M+d*d))-g*(M*=l),a=g*(s*=l)-w*d,o=w*M-x*s,(l=Math.sqrt(e*e+a*a+o*o))?(e*=l=1/l,a*=l,o*=l):(e=0,a=0,o=0),c=M*o-d*a,f=d*e-s*o,h=s*a-M*e,(l=Math.sqrt(c*c+f*f+h*h))?(c*=l=1/l,f*=l,h*=l):(c=0,f=0,h=0),t[0]=e,t[1]=c,t[2]=s,t[3]=0,t[4]=a,t[5]=f,t[6]=M,t[7]=0,t[8]=o,t[9]=h,t[10]=d,t[11]=0,t[12]=-(e*m+a*q+o*p),t[13]=-(c*m+f*q+h*p),t[14]=-(s*m+M*q+d*p),t[15]=1,t)}function C(t,n,r,u){let e=n[0],a=n[1],o=n[2],i=u[0],c=u[1],f=u[2],h=e-r[0],s=a-r[1],M=o-r[2],d=h*h+s*s+M*M;d>0&&(h*=d=1/Math.sqrt(d),s*=d,M*=d);let l=c*M-f*s,b=f*h-i*M,m=i*s-c*h;return(d=l*l+b*b+m*m)>0&&(l*=d=1/Math.sqrt(d),b*=d,m*=d),t[0]=l,t[1]=b,t[2]=m,t[3]=0,t[4]=s*m-M*b,t[5]=M*l-h*m,t[6]=h*b-s*l,t[7]=0,t[8]=h,t[9]=s,t[10]=M,t[11]=0,t[12]=e,t[13]=a,t[14]=o,t[15]=1,t}function G(t){return"mat4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+", "+t[9]+", "+t[10]+", "+t[11]+", "+t[12]+", "+t[13]+", "+t[14]+", "+t[15]+")"}function H(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2)+Math.pow(t[4],2)+Math.pow(t[5],2)+Math.pow(t[6],2)+Math.pow(t[7],2)+Math.pow(t[8],2)+Math.pow(t[9],2)+Math.pow(t[10],2)+Math.pow(t[11],2)+Math.pow(t[12],2)+Math.pow(t[13],2)+Math.pow(t[14],2)+Math.pow(t[15],2))}function K(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t[3]=n[3]+r[3],t[4]=n[4]+r[4],t[5]=n[5]+r[5],t[6]=n[6]+r[6],t[7]=n[7]+r[7],t[8]=n[8]+r[8],t[9]=n[9]+r[9],t[10]=n[10]+r[10],t[11]=n[11]+r[11],t[12]=n[12]+r[12],t[13]=n[13]+r[13],t[14]=n[14]+r[14],t[15]=n[15]+r[15],t}function N(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t[3]=n[3]-r[3],t[4]=n[4]-r[4],t[5]=n[5]-r[5],t[6]=n[6]-r[6],t[7]=n[7]-r[7],t[8]=n[8]-r[8],t[9]=n[9]-r[9],t[10]=n[10]-r[10],t[11]=n[11]-r[11],t[12]=n[12]-r[12],t[13]=n[13]-r[13],t[14]=n[14]-r[14],t[15]=n[15]-r[15],t}function U(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=n[7]*r,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=n[11]*r,t[12]=n[12]*r,t[13]=n[13]*r,t[14]=n[14]*r,t[15]=n[15]*r,t}function $(t,n,r,u){return t[0]=n[0]+r[0]*u,t[1]=n[1]+r[1]*u,t[2]=n[2]+r[2]*u,t[3]=n[3]+r[3]*u,t[4]=n[4]+r[4]*u,t[5]=n[5]+r[5]*u,t[6]=n[6]+r[6]*u,t[7]=n[7]+r[7]*u,t[8]=n[8]+r[8]*u,t[9]=n[9]+r[9]*u,t[10]=n[10]+r[10]*u,t[11]=n[11]+r[11]*u,t[12]=n[12]+r[12]*u,t[13]=n[13]+r[13]*u,t[14]=n[14]+r[14]*u,t[15]=n[15]+r[15]*u,t}function _(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]&&t[4]===n[4]&&t[5]===n[5]&&t[6]===n[6]&&t[7]===n[7]&&t[8]===n[8]&&t[9]===n[9]&&t[10]===n[10]&&t[11]===n[11]&&t[12]===n[12]&&t[13]===n[13]&&t[14]===n[14]&&t[15]===n[15]}function tt(t,n){let r=t[0],u=t[1],e=t[2],a=t[3],o=t[4],c=t[5],f=t[6],h=t[7],s=t[8],M=t[9],d=t[10],l=t[11],b=t[12],m=t[13],q=t[14],p=t[15],w=n[0],x=n[1],g=n[2],v=n[3],y=n[4],A=n[5],I=n[6],P=n[7],F=n[8],D=n[9],R=n[10],E=n[11],T=n[12],L=n[13],S=n[14],V=n[15];return Math.abs(r-w)<=i*Math.max(1,Math.abs(r),Math.abs(w))&&Math.abs(u-x)<=i*Math.max(1,Math.abs(u),Math.abs(x))&&Math.abs(e-g)<=i*Math.max(1,Math.abs(e),Math.abs(g))&&Math.abs(a-v)<=i*Math.max(1,Math.abs(a),Math.abs(v))&&Math.abs(o-y)<=i*Math.max(1,Math.abs(o),Math.abs(y))&&Math.abs(c-A)<=i*Math.max(1,Math.abs(c),Math.abs(A))&&Math.abs(f-I)<=i*Math.max(1,Math.abs(f),Math.abs(I))&&Math.abs(h-P)<=i*Math.max(1,Math.abs(h),Math.abs(P))&&Math.abs(s-F)<=i*Math.max(1,Math.abs(s),Math.abs(F))&&Math.abs(M-D)<=i*Math.max(1,Math.abs(M),Math.abs(D))&&Math.abs(d-R)<=i*Math.max(1,Math.abs(d),Math.abs(R))&&Math.abs(l-E)<=i*Math.max(1,Math.abs(l),Math.abs(E))&&Math.abs(b-T)<=i*Math.max(1,Math.abs(b),Math.abs(T))&&Math.abs(m-L)<=i*Math.max(1,Math.abs(m),Math.abs(L))&&Math.abs(q-S)<=i*Math.max(1,Math.abs(q),Math.abs(S))&&Math.abs(p-V)<=i*Math.max(1,Math.abs(p),Math.abs(V))}const nt=x,rt=N;function ut(){let t=new c(3);return c!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t}function et(t){var n=new c(3);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n}function at(t){let n=t[0],r=t[1],u=t[2];return Math.sqrt(n*n+r*r+u*u)}function ot(t,n,r){let u=new c(3);return u[0]=t,u[1]=n,u[2]=r,u}function it(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t}function ct(t,n,r,u){return t[0]=n,t[1]=r,t[2]=u,t}function ft(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t}function ht(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t[2]=n[2]-r[2],t}function st(t,n,r){return t[0]=n[0]*r[0],t[1]=n[1]*r[1],t[2]=n[2]*r[2],t}function Mt(t,n,r){return t[0]=n[0]/r[0],t[1]=n[1]/r[1],t[2]=n[2]/r[2],t}function dt(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t[2]=Math.ceil(n[2]),t}function lt(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t[2]=Math.floor(n[2]),t}function bt(t,n,r){return t[0]=Math.min(n[0],r[0]),t[1]=Math.min(n[1],r[1]),t[2]=Math.min(n[2],r[2]),t}function mt(t,n,r){return t[0]=Math.max(n[0],r[0]),t[1]=Math.max(n[1],r[1]),t[2]=Math.max(n[2],r[2]),t}function qt(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t[2]=Math.round(n[2]),t}function pt(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t}function wt(t,n,r,u){return t[0]=n[0]+r[0]*u,t[1]=n[1]+r[1]*u,t[2]=n[2]+r[2]*u,t}function xt(t,n){let r=n[0]-t[0],u=n[1]-t[1],e=n[2]-t[2];return Math.sqrt(r*r+u*u+e*e)}function gt(t,n){let r=n[0]-t[0],u=n[1]-t[1],e=n[2]-t[2];return r*r+u*u+e*e}function vt(t){let n=t[0],r=t[1],u=t[2];return n*n+r*r+u*u}function yt(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t}function At(t,n){return t[0]=1/n[0],t[1]=1/n[1],t[2]=1/n[2],t}function It(t,n){let r=n[0],u=n[1],e=n[2],a=r*r+u*u+e*e;return a>0&&(a=1/Math.sqrt(a),t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a),t}function Pt(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]}function Ft(t,n,r){let u=n[0],e=n[1],a=n[2],o=r[0],i=r[1],c=r[2];return t[0]=e*c-a*i,t[1]=a*o-u*c,t[2]=u*i-e*o,t}function Dt(t,n,r,u){let e=n[0],a=n[1],o=n[2];return t[0]=e+u*(r[0]-e),t[1]=a+u*(r[1]-a),t[2]=o+u*(r[2]-o),t}function Rt(t,n,r,u,e,a){let o=a*a,i=o*(2*a-3)+1,c=o*(a-2)+a,f=o*(a-1),h=o*(3-2*a);return t[0]=n[0]*i+r[0]*c+u[0]*f+e[0]*h,t[1]=n[1]*i+r[1]*c+u[1]*f+e[1]*h,t[2]=n[2]*i+r[2]*c+u[2]*f+e[2]*h,t}function Et(t,n,r,u,e,a){let o=1-a,i=o*o,c=a*a,f=i*o,h=3*a*i,s=3*c*o,M=c*a;return t[0]=n[0]*f+r[0]*h+u[0]*s+e[0]*M,t[1]=n[1]*f+r[1]*h+u[1]*s+e[1]*M,t[2]=n[2]*f+r[2]*h+u[2]*s+e[2]*M,t}function Tt(t,n){n=n||1;let r=2*f()*Math.PI,u=2*f()-1,e=Math.sqrt(1-u*u)*n;return t[0]=Math.cos(r)*e,t[1]=Math.sin(r)*e,t[2]=u*n,t}function Lt(t,n,r){let u=n[0],e=n[1],a=n[2],o=r[3]*u+r[7]*e+r[11]*a+r[15];return o=o||1,t[0]=(r[0]*u+r[4]*e+r[8]*a+r[12])/o,t[1]=(r[1]*u+r[5]*e+r[9]*a+r[13])/o,t[2]=(r[2]*u+r[6]*e+r[10]*a+r[14])/o,t}function St(t,n,r){let u=n[0],e=n[1],a=n[2];return t[0]=u*r[0]+e*r[3]+a*r[6],t[1]=u*r[1]+e*r[4]+a*r[7],t[2]=u*r[2]+e*r[5]+a*r[8],t}function Vt(t,n,r){let u=r[0],e=r[1],a=r[2],o=r[3],i=n[0],c=n[1],f=n[2],h=e*f-a*c,s=a*i-u*f,M=u*c-e*i,d=e*M-a*s,l=a*h-u*M,b=u*s-e*h,m=2*o;return h*=m,s*=m,M*=m,d*=2,l*=2,b*=2,t[0]=i+h+d,t[1]=c+s+l,t[2]=f+M+b,t}function zt(t,n,r,u){let e=[],a=[];return e[0]=n[0]-r[0],e[1]=n[1]-r[1],e[2]=n[2]-r[2],a[0]=e[0],a[1]=e[1]*Math.cos(u)-e[2]*Math.sin(u),a[2]=e[1]*Math.sin(u)+e[2]*Math.cos(u),t[0]=a[0]+r[0],t[1]=a[1]+r[1],t[2]=a[2]+r[2],t}function Xt(t,n,r,u){let e=[],a=[];return e[0]=n[0]-r[0],e[1]=n[1]-r[1],e[2]=n[2]-r[2],a[0]=e[2]*Math.sin(u)+e[0]*Math.cos(u),a[1]=e[1],a[2]=e[2]*Math.cos(u)-e[0]*Math.sin(u),t[0]=a[0]+r[0],t[1]=a[1]+r[1],t[2]=a[2]+r[2],t}function Yt(t,n,r,u){let e=[],a=[];return e[0]=n[0]-r[0],e[1]=n[1]-r[1],e[2]=n[2]-r[2],a[0]=e[0]*Math.cos(u)-e[1]*Math.sin(u),a[1]=e[0]*Math.sin(u)+e[1]*Math.cos(u),a[2]=e[2],t[0]=a[0]+r[0],t[1]=a[1]+r[1],t[2]=a[2]+r[2],t}function Zt(t,n){let r=ot(t[0],t[1],t[2]),u=ot(n[0],n[1],n[2]);It(r,r),It(u,u);let e=Pt(r,u);return e>1?0:e<-1?Math.PI:Math.acos(e)}function kt(t){return"vec3("+t[0]+", "+t[1]+", "+t[2]+")"}function Qt(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]}function jt(t,n){let r=t[0],u=t[1],e=t[2],a=n[0],o=n[1],c=n[2];return Math.abs(r-a)<=i*Math.max(1,Math.abs(r),Math.abs(a))&&Math.abs(u-o)<=i*Math.max(1,Math.abs(u),Math.abs(o))&&Math.abs(e-c)<=i*Math.max(1,Math.abs(e),Math.abs(c))}const Jt=ht,Ot=st,Wt=Mt,Bt=xt,Ct=gt,Gt=at,Ht=vt,Kt=function(){let t=ut();return function(n,r,u,e,a,o){let i,c;for(r||(r=3),u||(u=0),c=e?Math.min(e*r+u,n.length):n.length,i=u;i<c;i+=r)t[0]=n[i],t[1]=n[i+1],t[2]=n[i+2],a(t,t,o),n[i]=t[0],n[i+1]=t[1],n[i+2]=t[2];return n}}();function Nt(t){let n=t[0],r=t[1],u=t[2],e=t[3];return Math.sqrt(n*n+r*r+u*u+e*e)}function Ut(t){let n=t[0],r=t[1],u=t[2],e=t[3];return n*n+r*r+u*u+e*e}!function(){let t=function(){let t=new c(4);return c!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0,t[3]=0),t}()}();function $t(){let t=new c(4);return c!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t[3]=1,t}function _t(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t}function tn(t,n,r){r*=.5;let u=Math.sin(r);return t[0]=u*n[0],t[1]=u*n[1],t[2]=u*n[2],t[3]=Math.cos(r),t}function nn(t,n){let r=2*Math.acos(n[3]),u=Math.sin(r/2);return u>i?(t[0]=n[0]/u,t[1]=n[1]/u,t[2]=n[2]/u):(t[0]=1,t[1]=0,t[2]=0),r}function rn(t,n,r){let u=n[0],e=n[1],a=n[2],o=n[3],i=r[0],c=r[1],f=r[2],h=r[3];return t[0]=u*h+o*i+e*f-a*c,t[1]=e*h+o*c+a*i-u*f,t[2]=a*h+o*f+u*c-e*i,t[3]=o*h-u*i-e*c-a*f,t}function un(t,n,r){r*=.5;let u=n[0],e=n[1],a=n[2],o=n[3],i=Math.sin(r),c=Math.cos(r);return t[0]=u*c+o*i,t[1]=e*c+a*i,t[2]=a*c-e*i,t[3]=o*c-u*i,t}function en(t,n,r){r*=.5;let u=n[0],e=n[1],a=n[2],o=n[3],i=Math.sin(r),c=Math.cos(r);return t[0]=u*c-a*i,t[1]=e*c+o*i,t[2]=a*c+u*i,t[3]=o*c-e*i,t}function an(t,n,r){r*=.5;let u=n[0],e=n[1],a=n[2],o=n[3],i=Math.sin(r),c=Math.cos(r);return t[0]=u*c+e*i,t[1]=e*c-u*i,t[2]=a*c+o*i,t[3]=o*c-a*i,t}function on(t,n){let r=n[0],u=n[1],e=n[2];return t[0]=r,t[1]=u,t[2]=e,t[3]=Math.sqrt(Math.abs(1-r*r-u*u-e*e)),t}function cn(t,n,r,u){let e,a,o,c,f,h=n[0],s=n[1],M=n[2],d=n[3],l=r[0],b=r[1],m=r[2],q=r[3];return(a=h*l+s*b+M*m+d*q)<0&&(a=-a,l=-l,b=-b,m=-m,q=-q),1-a>i?(e=Math.acos(a),o=Math.sin(e),c=Math.sin((1-u)*e)/o,f=Math.sin(u*e)/o):(c=1-u,f=u),t[0]=c*h+f*l,t[1]=c*s+f*b,t[2]=c*M+f*m,t[3]=c*d+f*q,t}function fn(t){let n=f(),r=f(),u=f(),e=Math.sqrt(1-n),a=Math.sqrt(n);return t[0]=e*Math.sin(2*Math.PI*r),t[1]=e*Math.cos(2*Math.PI*r),t[2]=a*Math.sin(2*Math.PI*u),t[3]=a*Math.cos(2*Math.PI*u),t}function hn(t,n){let r=n[0],u=n[1],e=n[2],a=n[3],o=r*r+u*u+e*e+a*a,i=o?1/o:0;return t[0]=-r*i,t[1]=-u*i,t[2]=-e*i,t[3]=a*i,t}function sn(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=n[3],t}function Mn(t,n){let r,u=n[0]+n[4]+n[8];if(u>0)r=Math.sqrt(u+1),t[3]=.5*r,r=.5/r,t[0]=(n[5]-n[7])*r,t[1]=(n[6]-n[2])*r,t[2]=(n[1]-n[3])*r;else{let u=0;n[4]>n[0]&&(u=1),n[8]>n[3*u+u]&&(u=2);let e=(u+1)%3,a=(u+2)%3;r=Math.sqrt(n[3*u+u]-n[3*e+e]-n[3*a+a]+1),t[u]=.5*r,r=.5/r,t[3]=(n[3*e+a]-n[3*a+e])*r,t[e]=(n[3*e+u]+n[3*u+e])*r,t[a]=(n[3*a+u]+n[3*u+a])*r}return t}function dn(t,n,r,u){let e=.5*Math.PI/180;n*=e,r*=e,u*=e;let a=Math.sin(n),o=Math.cos(n),i=Math.sin(r),c=Math.cos(r),f=Math.sin(u),h=Math.cos(u);return t[0]=a*c*h-o*i*f,t[1]=o*i*h+a*c*f,t[2]=o*c*f-a*i*h,t[3]=o*c*h+a*i*f,t}function ln(t){return"quat("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"}const bn=function(t){let n=new c(4);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n},mn=function(t,n,r,u){let e=new c(4);return e[0]=t,e[1]=n,e[2]=r,e[3]=u,e},qn=function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t},pn=function(t,n,r,u,e){return t[0]=n,t[1]=r,t[2]=u,t[3]=e,t},wn=function(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t[2]=n[2]+r[2],t[3]=n[3]+r[3],t},xn=rn,gn=function(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t},vn=function(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]+t[3]*n[3]},yn=function(t,n,r,u){let e=n[0],a=n[1],o=n[2],i=n[3];return t[0]=e+u*(r[0]-e),t[1]=a+u*(r[1]-a),t[2]=o+u*(r[2]-o),t[3]=i+u*(r[3]-i),t},An=Nt,In=An,Pn=Ut,Fn=Pn,Dn=function(t,n){let r=n[0],u=n[1],e=n[2],a=n[3],o=r*r+u*u+e*e+a*a;return o>0&&(o=1/Math.sqrt(o),t[0]=r*o,t[1]=u*o,t[2]=e*o,t[3]=a*o),t},Rn=function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]},En=function(t,n){let r=t[0],u=t[1],e=t[2],a=t[3],o=n[0],c=n[1],f=n[2],h=n[3];return Math.abs(r-o)<=i*Math.max(1,Math.abs(r),Math.abs(o))&&Math.abs(u-c)<=i*Math.max(1,Math.abs(u),Math.abs(c))&&Math.abs(e-f)<=i*Math.max(1,Math.abs(e),Math.abs(f))&&Math.abs(a-h)<=i*Math.max(1,Math.abs(a),Math.abs(h))},Tn=function(){let t=ut(),n=ot(1,0,0),r=ot(0,1,0);return function(u,e,a){let o=Pt(e,a);return o<-.999999?(Ft(t,n,e),Gt(t)<1e-6&&Ft(t,r,e),It(t,t),tn(u,t,Math.PI),u):o>.999999?(u[0]=0,u[1]=0,u[2]=0,u[3]=1,u):(Ft(t,e,a),u[0]=t[0],u[1]=t[1],u[2]=t[2],u[3]=1+o,Dn(u,u))}}(),Ln=function(){let t=$t(),n=$t();return function(r,u,e,a,o,i){return cn(t,u,o,i),cn(n,e,a,i),cn(r,t,n,2*i*(1-i)),r}}(),Sn=function(){let t=function(){let t=new c(9);return c!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[5]=0,t[6]=0,t[7]=0),t[0]=1,t[4]=1,t[8]=1,t}();return function(n,r,u,e){return t[0]=u[0],t[3]=u[1],t[6]=u[2],t[1]=e[0],t[4]=e[1],t[7]=e[2],t[2]=-r[0],t[5]=-r[1],t[8]=-r[2],Dn(n,Mn(n,t))}}();function Vn(){let t=new c(2);return c!=Float32Array&&(t[0]=0,t[1]=0),t}function zn(t){let n=new c(2);return n[0]=t[0],n[1]=t[1],n}function Xn(t,n){let r=new c(2);return r[0]=t,r[1]=n,r}function Yn(t,n){return t[0]=n[0],t[1]=n[1],t}function Zn(t,n,r){return t[0]=n,t[1]=r,t}function kn(t,n,r){return t[0]=n[0]+r[0],t[1]=n[1]+r[1],t}function Qn(t,n,r){return t[0]=n[0]-r[0],t[1]=n[1]-r[1],t}function jn(t,n,r){return t[0]=n[0]*r[0],t[1]=n[1]*r[1],t}function Jn(t,n,r){return t[0]=n[0]/r[0],t[1]=n[1]/r[1],t}function On(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t}function Wn(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t}function Bn(t,n,r){return t[0]=Math.min(n[0],r[0]),t[1]=Math.min(n[1],r[1]),t}function Cn(t,n,r){return t[0]=Math.max(n[0],r[0]),t[1]=Math.max(n[1],r[1]),t}function Gn(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t}function Hn(t,n,r){return t[0]=n[0]*r,t[1]=n[1]*r,t}function Kn(t,n,r,u){return t[0]=n[0]+r[0]*u,t[1]=n[1]+r[1]*u,t}function Nn(t,n){var r=n[0]-t[0],u=n[1]-t[1];return Math.sqrt(r*r+u*u)}function Un(t,n){var r=n[0]-t[0],u=n[1]-t[1];return r*r+u*u}function $n(t){var n=t[0],r=t[1];return Math.sqrt(n*n+r*r)}function _n(t){var n=t[0],r=t[1];return n*n+r*r}function tr(t,n){return t[0]=-n[0],t[1]=-n[1],t}function nr(t,n){return t[0]=1/n[0],t[1]=1/n[1],t}function rr(t,n){var r=n[0],u=n[1],e=r*r+u*u;return e>0&&(e=1/Math.sqrt(e),t[0]=n[0]*e,t[1]=n[1]*e),t}function ur(t,n){return t[0]*n[0]+t[1]*n[1]}function er(t,n,r){var u=n[0]*r[1]-n[1]*r[0];return t[0]=t[1]=0,t[2]=u,t}function ar(t,n,r,u){var e=n[0],a=n[1];return t[0]=e+u*(r[0]-e),t[1]=a+u*(r[1]-a),t}function or(t,n){n=n||1;var r=2*f()*Math.PI;return t[0]=Math.cos(r)*n,t[1]=Math.sin(r)*n,t}function ir(t,n,r){var u=n[0],e=n[1];return t[0]=r[0]*u+r[2]*e,t[1]=r[1]*u+r[3]*e,t}function cr(t,n,r){var u=n[0],e=n[1];return t[0]=r[0]*u+r[2]*e+r[4],t[1]=r[1]*u+r[3]*e+r[5],t}function fr(t,n,r){var u=n[0],e=n[1];return t[0]=r[0]*u+r[3]*e+r[6],t[1]=r[1]*u+r[4]*e+r[7],t}function hr(t,n,r){let u=n[0],e=n[1];return t[0]=r[0]*u+r[4]*e+r[12],t[1]=r[1]*u+r[5]*e+r[13],t}function sr(t,n,r,u){let e=n[0]-r[0],a=n[1]-r[1],o=Math.sin(u),i=Math.cos(u);return t[0]=e*i-a*o+r[0],t[1]=e*o+a*i+r[1],t}function Mr(t,n){let r=t[0],u=t[1],e=n[0],a=n[1],o=r*r+u*u;o>0&&(o=1/Math.sqrt(o));let i=e*e+a*a;i>0&&(i=1/Math.sqrt(i));let c=(r*e+u*a)*o*i;return c>1?0:c<-1?Math.PI:Math.acos(c)}function dr(t){return"vec2("+t[0]+", "+t[1]+")"}function lr(t,n){return t[0]===n[0]&&t[1]===n[1]}function br(t,n){let r=t[0],u=t[1],e=n[0],a=n[1];return Math.abs(r-e)<=i*Math.max(1,Math.abs(r),Math.abs(e))&&Math.abs(u-a)<=i*Math.max(1,Math.abs(u),Math.abs(a))}const mr=$n,qr=Qn,pr=jn,wr=Jn,xr=Nn,gr=Un,vr=_n,yr=function(){let t=Vn();return function(n,r,u,e,a,o){let i,c;for(r||(r=2),u||(u=0),c=e?Math.min(e*r+u,n.length):n.length,i=u;i<c;i+=r)t[0]=n[i],t[1]=n[i+1],a(t,t,o),n[i]=t[0],n[i+1]=t[1];return n}}();r.d(n,"a",function(){return u}),r.d(n,"b",function(){return a}),r.d(n,"c",function(){return o}),r.d(n,"d",function(){return e})}]]);