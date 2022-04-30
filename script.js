console.log("hi")

fetch('https://api.airtable.com/v0/app69FfGiH9XszKX7/mold', {
    headers:{
        Authorization: 'Bearer keyctJlPuX2trmpxu',
    },
})
    .then(response=>response.json())
    .then(data=>{
    console.log(data);

    const outputContainer=document.querySelector('.output-container');

    data.records
    .sort((a, b)=>a.fields.number - b.fields.number)
    .forEach(output=>  {
        console.log(output);

        outputContainer.innerHTML+=`
        <div class="grid-item">
        <img src="${
            output.fields.outputImg[0].thumbnails.large.url
        }">
        <div class="grid-subitem">
        <div class="grid-qr"><img style="width: 100%;" src="./assets/qr-code.png"></div>
        <div class="specimen-type">${output.fields.color}</div>
        <div class="grid-text">Grids: ${output.fields.grids}</div>
        <div class="grid-text">Bloom: ${output.fields.bloom}</div>
        <div class="grid-text">Fuzz: ${output.fields.fuzz}</div>
        </div>
            
            
        </div>
        
        `
    });
});

