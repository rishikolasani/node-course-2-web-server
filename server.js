const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log=`${now}:${req.method}${req.url}`;
console.log(log);
fs.appendFile('server.log',log+ '\n',(err)=>{
  if(err){
    console.log('unable to append to server.log');
  }
});

  next();
});
//app.use((req,res,next)=>{
  //res.render('maintainance.hbs');
//});
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentDate',()=>{
  return new Date().getFullYear();

});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});
app.get('/',(req,res)=>{
  //res.send('<h1>Hello Express!!!!!!!!!!!</h1>');
  /*res.send({
    name:'Richie',
    likes:[
      'Biking',
      'video games'
    ]


  });*/
  res.render('home.hbs',{
    PageTitle:'Home  page',
    message: 'welcome'

  });
});
app.get('/about',(req,res)=>{
res.render('about.hbs',{
  PageTitle:'about page'

});
});
app.get('/bad',(req,res)=>{
  res.send({
    error:'there is an error '
  });
});
app.listen(port,()=>{
  console.log(`server up on port ${port}`);
});
