const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const fetch = require("node-fetch");
process.env.PORT || 3000;
let prefix = '.';

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
//For avoidong Heroku $PORT error

client.login(process.env.TOKEN);

client.on("ready", ()=> {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity("Dick", {type: "PLAYING"})
})



client.on("messageCreate", msg => {
  if (msg.content == "gang"){
    msg.channel.send("shit")
  }
})

//SAY


//SAY

//CLEAR

client.on("messageCreate", async (msg) => {
  try{

    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'clear') {
      
      if(!args[0]) return msg.reply("Enter amount of messages you want to clear");
      if(isNaN(args[0])) return msg.reply("Please enter a real number");

      msg.channel.messages.fetch({limit: args[0]}).then(msg =>{
            msg.channel.bulkDelete(messages);
          
      })
    }}
    catch(err){
        console.log(`Error in the main Functionality! ${err}`);
        msg.react('❌');
    }
});


//CLEAR

//8BALL

client.on("messageCreate", async (msg) => {
  try{

    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    function doMagic8BallVoodoo() {
    var rand = ['kā es to redzu, jā.','vēlāk jautā vēlreiz.','labāk tagad nestāsti.','tagad nevar paredzēt.','koncentrējies un jautā vēlreiz.','ar to nerēķinies.','tas ir skaidrs.','tā noteikti ir.','visticamāk.','mana atbilde ir nē.','mani avoti saka nē.','perspektīva nav tik laba.','perspektīva laba.','atbilde miglaina, mēģini vēlreiz.','zīmes norāda uz jā.','ļoti apšaubāmi.','bez šaubām.','jā.','jā - noteikti.','vari paļauties uz to.'];

    return rand[Math.floor(Math.random()*rand.length)];
    }
    if(command === '8ball'){
      msg.reply(doMagic8BallVoodoo());
    }}
     catch(err){
        console.log(`Error in the main Functionality! ${err}`);
        msg.react('❌');
    }
});
//8BALL


//GIF

client.on("messageCreate", async (msg) => {
  try{
    let query = msg.content.split(" ");
    if(query[0] == ".gif") {
      let url = `https://api.tenor.com/v1/search?q=${query[1]}&key=${process.env.TENORKEY}"`;
      let response = await fetch(url);
      let data = await response.json();
      let random = Math.floor(Math.random() * data.results.length);
      msg.channel.send(data.results[random].url);
    }}
    catch(err){
        console.log(`Error in the main Functionality! ${err}`);
        msg.react('❌');
    }
});

//GIPHY
/*client.on("messageCreate", async (msg) => {
  try{
    let query = msg.content.split(" ");
    if(query[0] == ".gif") {
       let url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHYKEY}&q=${query[1]}`; 
      let response = await fetch(url);
      let jsn = await response.json();
      let random = Math.floor(Math.random() * jsn.data.length);
      msg.channel.send(jsn.data[random].url);
    }}
    catch(err){
        console.log(`Neatrada tadu gifu! ${err}`);
        msg.react('❌');
    }
});*/
//GIF






 
