const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const fetch = require("node-fetch");
process.env.PORT || 3000;

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
/*
client.on("messageCreate", msg => {
  let args = msg.content.split(" ");
  if (args[0] == ".clear"){
    if(!msg.member.hasPermission("MANAGE_MESSAGES")) return message.reply("nabags");
    if(args[0]) return message.channel.send("losis");
    msg.channel.bulkDelete(args[0]).then(() =>{
      msg.channel.send(`Cleare ${args[0]} messages`).then(msg1 => msg1.delete(5000));
    })
  }
})
*/
//CLEAR

//GIF

client.on("messageCreate", async (msg) => {
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
        //msg.react('❌');
    }
});
//GIF






 
