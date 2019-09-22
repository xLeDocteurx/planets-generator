# Planets Generator

~~A small P5.js planets 3D generator~~
A small Three.js planets 3D generator

Update : Went from P5.js to Three.js. P5 had a really low framerate at high resolutions.

![cubes view](https://github.com/xLeDocteurx/planets-generator/blob/master/git/sc004.png)

### How it works :
For now it's a raw prototype.
The magic append in 4 core loops, functions. (preload, setup, update, render)

preload

setup

update

render

### Things to come :
- ~~Draw a 3D cube.~~
- ~~Extrapolate the veteces depending on their distance from the center of the cube.~~
- ~~Resurect GUI.~~
- ~~Simple perlin noise modulation of the surface.~~
- A more complex noise engine with multiple layers and noises type.
- Coloring the polygons depending on their hight.
- Struggle to developp a terrain erosion algorythm.
- Bouyakasha.



##### Pros :
- Is using P5 to interface datas to webGL
- Homemade algorythm to calculate the verteces of the sphere.
( Régular 3D sphere methods uses triangles strips or non linear space division wich makes the spheres have way more triangle on the poles than on the ecuador )

##### Cons :
- Is usin p5 to interface datas to webGL
( P5 is great, maybe my favorite framework but has some lacks on 3D when rendering an unreasonable amount of polygons )
