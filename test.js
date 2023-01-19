const covidData=require(`./index.js`);
covidData(`中国`,`新疆维吾尔`).then(data=>{
    console.log(data);
});