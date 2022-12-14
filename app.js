const express=require('express');
const https=require('https');
const bodyParser=require('body-parser');
//const { urlencoded } = require('body-parser');
const app=express();
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req,res)=>{
    res.sendFile(__dirname+"/index.html");
    
});

app.post('/', function(req,res){
    /*console.log("Post is working");
    console.log();*/

    const place=req.body.cityName;
    const AppKey="754792641109843e69d20cb1ddad62d3";
    const unit="metric";

    const url="https://api.openweathermap.org/data/2.5/weather?q="+place+"&appid="+AppKey+"&units="+unit+"";
    https.get(url, function(response){
    console.log(response.statusCode);
    //response.send(response.statusCode);
    response.on('data', (data)=>{
        //console.log(data);
        const weatherApp=JSON.parse(data);
        //console.log(weatherApp);
        const temp1=weatherApp.weather[0].description;
        console.log(temp1);
        const temp=weatherApp.main.temp;
        const icon=weatherApp.weather[0].icon;
        const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<p>The weather is currently "+temp1+".</p>");
        res.write("<h1>The temperature in "+req.body.cityName+" is "+temp+" degrees Celcius</h1>");
        res.write("<img src="+imageURL+">");
        res.send();

        //res.sendFile(__dirname+"/index.html");
    })
});
})


app.listen(3000,()=>{
    console.log("Listening at port 3000...");
})




