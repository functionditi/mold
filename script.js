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
            
        </div>
        
        `
    });
});

