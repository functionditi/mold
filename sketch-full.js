//to-do
//add rarity, 
let sample, sep, w, h, bgcol, layer1col, layer2col, layer3col, gridcol, bloomcol, fuzz=0;
var xoff=0, yoff=0, dottie, xoff_=10000, yoff_=10000;
var offset;
let c=0;
let phase = 0;
let zoff = 0;
let noiseVal=0;
let noiseForLine=[];
let line_sep;
let index_c,  index_r=[];
let status_color;
let status_fuzz='no (common)';
let status_grids='no (rare)';
let status_bloom='no (common)';
let status_perlinsize;


function setup() {
  createCanvas(windowWidth, windowHeight);
  sample = createGraphics(windowWidth, windowHeight);
  grid = createGraphics(windowWidth, windowHeight);
  noLoop();
  colorsbg=[ '#ffffff',];


  
setA=[[//penicillium
{name: 'brown', color: '#3e2628'}, 
{name: 'mediumbrown', color: '#735656'},
{name: 'lightbrown', color: '#a18887'},
{name: 'offwhite', color: '#E8E8E8'},
{name: 'purple', color: '#b2b4d7'}],
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
  
  assignColor();
  
  const colorh1=document.querySelector('.colortitle');
  colorh1.innerHTML=`<div class="overlay-container" style="background-color: ${gridcol};">
  <h1 style="color:${bgcol};">hyperphae. </h1>
  <h2 style="color:${bgcol};">Mold in real life is pretty but also pretty gross.</h2>
  <h2 style="color:${bgcol};"> This project uses perlin noise and random() to mimic mold growth and combines organic processes with systemisation in a format abstracted from microbiological nature.</h2>
   <h2><a style="color:${bgcol}"; href="./gallery.html">See the gallery</a></h2> 
  </div>
  
  `;
  background(bgcol);
  drawPerlin();
  assignRarity();
  detectSample();

}

function assignColor(){
  //assigning color (and also rarity)
  let rarity_factor_1=Math.random();
  if (rarity_factor_1<0.25){
    index_c=0;
  }
  else if(rarity_factor_1>=0.25 && rarity_factor_1<0.5){
    index_c=1;
  }
  else if(rarity_factor_1>=0.5 && rarity_factor_1<0.75){
    index_c=2;
  }
  else if(rarity_factor_1>=0.75 && rarity_factor_1<0.85){
    index_c=3;
  }
  else if(rarity_factor_1>=0.85 && rarity_factor_1<0.95){
    index_c=4;
  }
  else
    index_c=5;
  
 console.log(rarity_factor_1);
  
  //naming the color palettes
  switch(index_c){
    case 0: status_color='penicillium (common)';
      break;
    case 1:status_color='cladosporium (common)';
      break;
    case 2:status_color='aspergillus (common)';
      break;
    case 3:status_color='serratia marcescens (rare)';
      break;
    case 4:status_color='serpula lacrymans (rare)';
      break;
    case 5:status_color='alternaria (super rare)';
      break;
  }
  
  //shuffling the colors in the palette so we have more variety in outcomes
  //credits to rohitsingh07052 on geeksforgeeks.org for the shuffle algorithm

  let n=setA[index_c].length;
 
  for (let i=0; i<n; i++){
    index_r[i]=i;
  }

  for (i=n-1; i>0; i--){
    let j = Math.floor(Math.random() * (i + 1));
    let temp=index_r[i];
    index_r[i]=index_r[j];
    index_r[j]=temp;
  }
  
    console.log(index_r[0], index_r[1], index_r[2], index_r[3], index_r[4]);
  
  //assigning the colors to variables (for easier use later)
  layer1col=setA[index_c][index_r[0]].color;
  gridcol=setA[index_c][index_r[1]].color;
  layer2col=setA[index_c][index_r[2]].color;
  layer3col=setA[index_c][index_r[3]].color;
  bgcol=setA[index_c][index_r[4]].color;
  
}

function assignRarity(){
  
  //using random() to assign rarity to different elements
  
  //grids or not?
  if (Math.random()<0.8){
    drawGrid();
    status_grids='yes (common) ';
  }
  
  //fuzz if the sep in drawPerlin is below 6. Otherwise, doesn't look fuzzy
  if (fuzz==1){
    drawFuzz();
    status_fuzz='yes (rare)'
  }
  
  //fungal blooms or not?
  if (Math.random()<0.2){
    drawBloom();
    status_bloom='yes (rare)';
  }
  
  //write in html
  // let div = createDiv('').size(600, 500);
  // div.html(`color `+status_color+`<br>grids `+status_grids+`<br>bloom `+status_bloom+`<br>fuzz `+status_fuzz);
}

function drawGrid(){
  yoff=0;
  let sep=5+Math.floor(Math.random()*10)*10;
 
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
  
  // this draws squares on the sample layer and based on the perlin noise value, the squares are filled with a value from 0 to 255 (black to white with greys in between)
  yoff=0;
  let counter=0;
  let sep=Math.floor(Math.random()*12)+3;
  
  switch(sep){
    case 3: case 4: case 5: case 6: status_perlinsize="intricate";
      break;
    case 7: case 8: case 9: case 10: status_perlinsize="moderate";
      break;
      case 11: case 12: case 13: case 14: case 15: status_perlinsize="large";
  }
  
  //draws fuzz (in the assignRarity() function only if the noise squares are smaller. (better visual outcome)
  if(sep<=6){
    fuzz=1;
  }
  line_sep=sep; //making sure that when we draw the fuzz lines, everything lines up well. line_sep is global but sep is local
  
  let lod=2+Math.random()*7;
  let falloff=(Math.random()*0.25)+0.05;
  for (var i=0; i<width; i+=sep)
    {
      xoff=0;
      for (var j=0; j<height; j+=sep)
          {

            sample.push();
            noiseDetail(lod, falloff);
            noiseVal=noise(xoff, yoff);
            noiseForLine[counter]=noiseVal;//storing noise values for the fuzz later
            let fillcol=map(noiseVal, 0, 1, 0, 300);
            sample.fill(fillcol);
            sample.noStroke();
            sample.translate(i, j)
            sample.rect(0, 0, sep);
            sample.pop();
            xoff+=0.1;
            counter++;
          }
      yoff+=0.1;
    }
}

function drawFuzz(){
   let counter=0;
  for (let i=0; i<width; i+=line_sep){
    for (let j=0; j<height; j+=line_sep){
      let line_pixel=sample.get(i, j);
      if (brightness(line_pixel)<40 && brightness(line_pixel)>=30){
         push();
          let a=atan(map(noiseForLine[counter], 0, 1, -PI, TWO_PI));
            translate(i, j);
             rotate(a);
        stroke(layer1col);
        strokeWeight(0.5);
            line(-5, -5, 5, 5);
       
        pop();
      }
     
      counter++;
    }
  }
}

function detectSample(){
   
  let pixel;
  let grid_pixel;

  for (let i=0; i<80000; i++){
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
   yoff+=0.1;
    xoff+=0.01;
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
         
             let size=(Math.random()*0.15)+0.05;    
          point(x*i*size, y*i*size);
      } 
    }
    pop();
  }
  
 
    

}

