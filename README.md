# Planets Generator

~~A small P5.js planets 3D generator~~

A small Three.js planets 3D generator

https://planets-generator.herokuapp.com

Update : Went from P5.js to Three.js. P5 had a really low framerate at high resolutions.

![cubes view](https://github.com/xLeDocteurx/planets-generator/blob/master/git/sc005.png)

### How it works :
For now it's a raw prototype.
But you can run it with a simple "node server.js" from the root directory

### Things to come :
- ~~Draw a 3D cube.~~
- ~~Extrapolate the veteces depending on their distance from the center of the cube.~~
- ~~Resurect GUI.~~
- ~~Simple perlin noise modulation of the surface.~~
- ~~A more complex noise engine with multiple layers and noises type.~~
- ~~Coloring the polygons depending on their hight.~~
- More colors for differents terrain types.
- Only render the frontside of each polygon.
- Each noise layer can be setup eparatly as well as the falloff between each layer.
- Struggle to developp a terrain erosion algorythm.
- Bouyakasha.



##### Pros :
- Is using P5 to interface datas to webGL
- Homemade algorythm to calculate the verteces of the sphere.
( Régular 3D sphere methods uses triangles strips or non linear space division wich makes the spheres have way more triangle on the poles than on the ecuador )

##### Cons :
- Is usin p5 to interface datas to webGL
( P5 is great, maybe my favorite framework but has some lacks on 3D when rendering an unreasonable amount of polygons )
