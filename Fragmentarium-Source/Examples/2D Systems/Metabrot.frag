#version 400
#extension GL_EXT_gpu_shader4 : enable
#extension GL_ARB_gpu_shader5 : enable
#extension GL_ARB_gpu_shader_fp64 : enable

#include "Progressive2D-4.frag"

#group Metabrot
uniform float R; slider[0,0,1]
uniform float G; slider[0,0.4,1]
uniform float B; slider[0,0.7,1]
uniform float ColDiv; slider[1,256,384]
uniform float bailout; slider[0,6,160]
uniform int  maxiters; slider[10,100,1000]
uniform vec2 c; slider[(-2,-2),(-0.2,0.0),(2,2)]
uniform bool PreIter; checkbox[false]
// z = csqr(z)+c; before entering the iteration loop
uniform int  preiterations; slider[1,2,10]
uniform int  Type; slider[0,0,2]

double dist = 0.0;

dvec2 csqr( dvec2 a ) {
 if(Type==0) return dvec2(a.x*a.x-a.y*a.y, 2.0*a.x*a.y );
 if(Type==1) return dvec2(a.x*a.x-a.y*a.y, 2.0*a.x*a.y) + a;
 if(Type==2) return dvec2(a.x*a.x-a.y*a.y, 2.0*a.x*a.y) - a;
}

vec3 color(vec2 p)
{
   //z from current pixel
	dvec2 z = p;
	if(PreIter) {
		for(int i=0; i<preiterations; i++) {
			z = csqr(z)+c;
		}
	}
   int i;
   for(i=0; i<maxiters; i++)
   {
     // http://www.fractalforums.com/images-showcase-(rate-my-fractal)/meta-mandelbrot-(mandeljulia)/
     z = csqr( csqr(z)+c ) + csqr(c)+z;

     dist=max(dist,dot(z,z));
     if (dist>bailout) break;
   }

   if (i < maxiters) {
      // The color scheme here is based on one from Inigo Quilez's Shader Toy:
      float co =  float(i) + 1. - (log(.5*log(float(dist)))- log(.5*log(bailout))) / log(bailout);
      co = 6.2831*sqrt(co/float(ColDiv));
      return .5+.5*vec3( cos(co+R), cos(co+G), cos(co+B) );
   }  else {
      float ld = log(log(float(6.2831*dist)))-log(length(vec2(z)));
      return vec3(ld+R,ld+G,ld+B)*(float(dist));
   }
}

#preset Default
Gamma = 2
Brightness = 1
Contrast = 1
Saturation = 1
Center = 0.0272422,0.0040042
Zoom = 0.75
ToneMapping = 3
Exposure = 1
AARange = 1
AAExp = 6
GaussianAA = false
R = 0
G = 0.4
B = 0.7
ColDiv = 256
bailout = 5
maxiters = 1000
c = -0.2,2.27e-05
PreIter = false
preiterations = 1
Type = 0
#endpreset

#preset Range-000
c1:SineCurve:43:-0.2:0.2:60:1441:0.3:1:1.7:1:0
c2:CosineCurve:44:-0.2:0.2:60:1441:0.3:1:1.7:1:0
#endpreset

#preset variant0
Gamma = 2
Brightness = 1
Contrast = 1
Saturation = 1
Center = 0.0689088,-0.0206871
Zoom = 0.75
ToneMapping = 3
Exposure = 1
AARange = 1.5
AAExp = 6
GaussianAA = false
R = 0
G = 0.4
B = 0.7
ColDiv = 384
bailout = 8
maxiters = 1000
c = -0.2,2.27e-05
PreIter = true
preiterations = 1
Type = 0
#endpreset

#preset variant1
Gamma = 2
Brightness = 1
Contrast = 1
Saturation = 1
Center = -0.4797023,-0.0083414
Zoom = 0.75
ToneMapping = 3
Exposure = 1
AARange = 1.5
AAExp = 6
GaussianAA = false
R = 0
G = 0.4
B = 0.7
ColDiv = 384
bailout = 22
maxiters = 1000
c = -0.2,2.27e-05
PreIter = true
preiterations = 3
Type = 1
#endpreset

#preset variant2
Gamma = 2
Brightness = 1
Contrast = 1
Saturation = 1
Center = 0.494066,-0.0210375
Zoom = 1.02
ToneMapping = 3
Exposure = 1
AARange = 1.5
AAExp = 6
GaussianAA = false
R = 0
G = 0.4
B = 0.7
ColDiv = 384
bailout = 27
maxiters = 1000
c = -0.2,2.27e-05
PreIter = true
preiterations = 4
Type = 2
#endpreset
