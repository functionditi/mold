//to-do
//add rarity, study fxhash documentation

let sample, sep, w, h, bgcol, layer1col, layer2col, layer3col, gridcol, bloomcol;
var xoff=0, yoff=0, dottie, xoff_=10000, yoff_=10000;
var offset;
let c=0;
let phase = 0;
let zoff = 0;
let noiseVal=0;



function setup() {
  createCanvas(500, 500);
  sample = createGraphics(500, 500);
  grid = createGraphics(500, 500);
  noLoop();
  colorsbg=[ '#ffffff',];


  
setA=[[{name: 'midgreen', color: '#3e7277'}, 
        {name: 'yellow', color: '#FFEA9E'},
        {name: 'lightgreen', color: '#a7ba92'},
        {name: 'mint', color: '#e7f2ef'},
        {name: 'white', color: '#FFFFFF'}],
      
      [{name: 'turquoise', color: '#2b6b95'}, 
        {name: 'grey', color: '#787372'},
        {name: 'green grey', color: '#7d9693'},
        {name: 'mint', color: '#a7c18c'},
        {name: 'offwhite', color: '#F7EADE'}],
      
       [{name: 'brown', color: '#3e2628'}, 
        {name: 'mediumbrown', color: '#735656'},
        {name: 'lightbrown', color: '#a18887'},
        {name: 'offwhite', color: '#E8E8E8'},
        {name: 'purple', color: '#b2b4d7'}],
      
      [{name: 'mauve', color: '#3e2628'}, 
        {name: 'lightbrown', color: '#c3a296'},
        {name: 'pink', color: '#d17565'},
        {name: 'pinkish offwhite', color: '#cc9e98'},
        {name: 'pondgreen', color: '#5a7650'}],
      
       [{name: 'grey green', color: '#787e76'}, 
        {name: 'grey', color: '#aba79f'},
        {name: 'white', color: '#ffffff'},
        {name: 'beige', color: '#cec0b2'},
        {name: 'mustard yellow', color: '#FFD46F'}],
      
      [{name: 'deep green', color: '#4d7a6a'}, 
        {name: 'dark turquoise', color: '#405e57'},
        {name: 'grey', color: '#dee7de'},
        {name: 'beige', color: '#e5d0c6'},
        {name: 'light green', color: '#bdc9aa'}]
     
     ];
  colorsSetC=['#ff0000', '#e79900'];
}

function draw() {

 // bloomcol=random(colorsSetC);
 
  let index=int(random(5));
 
  layer1col=setA[index][0].color;
  gridcol=setA[index][1].color;
  layer2col=setA[index][2].color;
  layer3col=setA[index][3].color;
  bgcol=setA[index][4].color;
  
  background(bgcol);
  drawPerlin();
  drawGrid();
  detectSample();
  drawBloom();
// let div = createDiv('').size(500, 100);
//     div.html(setA[index][0].name +" "+ setA[index][1].name +" "+ setA[index][2].name +" "+ setA[index][3].name +" "+ setA[index][4].name);
}

function drawGrid(){
  yoff=0;
  let sep=int(random(5, 15))*10;
  for (var i=0; i<height; i+=sep)
    {
      xoff=0;
      for (var j=0; j<width-0; j+=sep)
          {

            grid.push();
            noiseDetail(4, 0.4);
            noiseVal=noise(xoff, yoff);
            let fillcol=map(noiseVal, 0, 1, 0, 300);
            grid.fill(fillcol);
            grid.stroke(0);
            grid.strokeWeight(3);
            grid.translate(i, j)
            grid.rect(0, 0, sep);
            grid.pop();
         
            xoff+=0.1;

          }
      yoff+=0.1;
    }  
}

function drawPerlin(){
  yoff=0;
  let sep=int(random(3, 15));
  let lod=random(2, 9);
  let falloff=random(0.05, 0.3); 
  for (var i=0; i<height; i+=sep)
    {
      xoff=0;
      for (var j=0; j<width-0; j+=sep)
          {

            sample.push();
            noiseDetail(lod, falloff);
            noiseVal=noise(xoff, yoff);
            let fillcol=map(noiseVal, 0, 1, 0, 300);
            sample.fill(fillcol);
            sample.noStroke();
            sample.translate(i, j)
            sample.rect(0, 0, sep);
            sample.pop();
            xoff+=0.1;

          }
      yoff+=0.1;
    }
  
       
}

function detectSample(){

  let pixel;
  let grid_pixel;
  for (let i=0; i<20000; i++){
    let xSample=random(width);
    let ySample=random(height);
    
     noStroke();
    
    grid_pixel=grid.get(xSample, ySample);
    
          if (brightness(grid_pixel)<5){
             fill(gridcol);
            
              ellipse(xSample+random(-0, 0), ySample+random(-0, 0), int(random(7)));
        }
     pixel=sample.get(xSample, ySample);
     
          if (brightness(pixel)<40 && brightness(pixel)>=30){
           fill(layer1col);
            ellipse(xSample+random(0, 0), ySample+random(0, 0), int(random(7)));
          }

           if (brightness(pixel)<30 && brightness(pixel)>=20){
        
            fill(layer2col);
            ellipse(xSample+random(0, 0), ySample+random(0, 0), int(random(7)));
        }
          if (brightness(pixel)<20 && brightness(pixel)>5){
            fill(layer3col);
            ellipse(xSample+random(0, 0), ySample+random(0, 0), int(random(7)));
        }
  
}
}

function drawBloom(){
 
  let n_blooms=int(random(2, 8));
  
  for (let n=0; n<n_blooms; n++){
    push();
    translate(random(width), random(height));
      phase=random(0, 100);
    zoff=random(0, 5);
   
    let noiseMax = map(random(width), 0, width, 1, 5);
    let spread=random(0.2, 3);
  
    let compactness=random(0.1, spread);
    stroke(random(colorsSetC));
    for (let i=0; i<spread; i+=compactness){
        //beginShape();
        //noiseDetail(4, 0.4);
          
      strokeWeight(3);
      //let noiseMax = noise(map(0, random(width), 0, 1, 3));
          for (let a = 0; a < 2*PI; a += radians(1.5)) {
          let xoff = map(cos(a + phase), -1, 1, 0, noiseMax);
          let yoff = map(sin(a + phase), -1, 1, 0, noiseMax);
          let r = map(noise(xoff, yoff), 0, 1, 100, 200);
          let x = r * cos(a);
          let y = r * sin(a);
         
             let size=random(0.05,0.2);
          point(x*i*size, y*i*size);
      } 
    }
    pop();
  }
  
 
    

}

function keyPressed() {
  if (keyCode==83) {
    saveCanvas('mold', 'png');
  }
}
