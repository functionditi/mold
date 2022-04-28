//to-do
//add rarity, 
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


  
setA=[[//penicillium
        {name: 'midgreen', color: '#3e7277'}, 
        {name: 'yellow', color: '#FFEA9E'},
        {name: 'lightgreen', color: '#a7ba92'},
        {name: 'mint', color: '#e7f2ef'},
        {name: 'white', color: '#FFFFFF'}],
      //cladosporium
      [{name: 'turquoise', color: '#2b6b95'}, 
        {name: 'grey', color: '#787372'},
        {name: 'green grey', color: '#7d9693'},
        {name: 'mint', color: '#a7c18c'},
        {name: 'offwhite', color: '#F7EADE'}],
      //aspergillus
       [{name: 'brown', color: '#3e2628'}, 
        {name: 'mediumbrown', color: '#735656'},
        {name: 'lightbrown', color: '#a18887'},
        {name: 'offwhite', color: '#E8E8E8'},
        {name: 'purple', color: '#b2b4d7'}],
      //serratia marcescens
      [{name: 'mauve', color: '#3e2628'}, 
        {name: 'lightbrown', color: '#c3a296'},
        {name: 'pink', color: '#d17565'},
        {name: 'pinkish offwhite', color: '#cc9e98'},
        {name: 'pondgreen', color: '#5a7650'}],
      //serpula lacrymans
       [{name: 'grey green', color: '#000000'}, 
        {name: 'grey', color: '#aba79f'},
        {name: 'white', color: '#ffffff'},
        {name: 'beige', color: '#cec0b2'},
        {name: 'mustard yellow', color: '#FFD46F'}],
      //alternaria
      [{name: 'deep green', color: '#4d7a6a'}, 
        {name: 'dark turquoise', color: '#405e57'},
        {name: 'grey', color: '#dee7de'},
        {name: 'beige', color: '#e5d0c6'},
        {name: 'light green', color: '#bdc9aa'}]
     
     ];
  colorsSetC=['#ff0000', '#e79900'];
}

function draw() {

  let rarity_factor=Math.random();
  let index_c;
  if (rarity_factor<0.8){
    index_c=Math.floor(Math.random()*3);
  }
  else
    index_c=3+Math.floor(Math.random()*3);
  console.log(index_c)
  let index_r=[];
  let status_color;
  switch(index_c){
    case 0: status_color='penicillium';
      break;
    case 1:status_color='cladosporium';
      break;
    case 2:status_color='aspergillus';
      break;
    case 3:status_color='serratia marcescens';
      break;
    case 4:status_color='serpula lacrymans';
      break;
    case 5:status_color='alternaria';
      break;
  }
  
  //i should fix the logic
  for (let i=0; i<6; i++){
    index_r[i]=Math.floor(Math.random()*5);
    for (let j=i-1; j>=0; j--){
      while(index_r[i]==index_r[j]){
            index_r[i]=Math.floor(Math.random()*5);
      }
      
    }
  }

  
  console.log(index_r[0], index_r[1], index_r[2], index_r[3], index_r[4]);
  layer1col=setA[index_c][index_r[0]].color;
  gridcol=setA[index_c][index_r[1]].color;
  layer2col=setA[index_c][index_r[2]].color;
  layer3col=setA[index_c][index_r[3]].color;
  bgcol=setA[index_c][index_r[4]].color;
  
  background(bgcol);
  drawPerlin();
  
  
  
  let status_grids='no';
  let status_bloom='no';
  console.log(rarity_factor)
  if (rarity_factor<0.2){
    drawBloom();
    status_bloom='yes';
  }
  if (rarity_factor<0.7){
    drawGrid();
    status_grids='yes';
  }
  detectSample();
  
  
let div = createDiv('').size(500, 100);
    div.html("grids "+status_grids+"; bloom "+status_bloom+"; color "+status_color+";");
}

function drawGrid(){
  yoff=0;
  let sep=5+Math.floor(Math.random()*10)*10;
  console.log("This is grid sep "+sep);
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
  let sep=Math.floor(Math.random()*12)+3;
  //let sep=int(random(3, 15));
  console.log("this is perlin sep "+ sep);
  let lod=2+Math.random()*7;
  let falloff=(Math.random()*0.25)+0.05;
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
    let xSample=Math.random()*width;
   let ySample=Math.random()*height;
    
    
     noStroke();
    
    grid_pixel=grid.get(xSample, ySample);
    
          if (brightness(grid_pixel)<5){
             fill(gridcol);
            
              ellipse(xSample, ySample, Math.floor(Math.random()*7));
        }
     pixel=sample.get(xSample, ySample);
     
          if (brightness(pixel)<40 && brightness(pixel)>=30){
           fill(layer1col);
            ellipse(xSample, ySample, Math.floor(Math.random()*7));
          }

           if (brightness(pixel)<30 && brightness(pixel)>=20){
        
            fill(layer2col);
            ellipse(xSample, ySample, Math.floor(Math.random()*7));
        }
          if (brightness(pixel)<20 && brightness(pixel)>5){
            fill(layer3col);
            ellipse(xSample, ySample, Math.floor(Math.random()*7));
        }
  
}
}

function drawBloom(){
  let n_blooms=Math.floor(Math.random()*6)+2;
  for (let n=0; n<n_blooms; n++){
    push();
    translate(Math.random()*width, Math.random()*height);
      phase=Math.random()*100;
    zoff=Math.random()*5;
   
    let noiseMax = map(Math.random(), 0, 1, 1, 5);
    let spread=(Math.random()*2.8)+0.2;  
  
    let compactness=(Math.random()*(spread-0.1))+0.1;     
    let strokeVal=Math.floor(Math.random()*colorsSetC.length);
    stroke(colorsSetC[strokeVal]);
    console.log("This is strokeVal in drawBloom "+strokeVal);
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
