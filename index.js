const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const fetch = require("node-fetch");
process.env.PORT || 3000;

var express = require('express');
var app     = express();

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
})

client.on("messageCreate", msg => {
  if (msg.content == "gang"){
    msg.channel.send("shit")
  }
})

client.on("message", gotMessage);

async function gotMessage(msg){
  let tokens = msg.content.split(" ");

  if (tokens[0] == ".gif") {
    let keywords = "meme";

    if (tokens.length > 1) {
      keywords = tokens.slice(1, tokens.length).join(" ");
    }
    let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORKEY}"`;
    let response = await fetch(url);
    let data = await response.json();
    const index = Math.floor(Math.random() * data.results.length);
    msg.channel.send(data.results[index].url);

    
  }
};






 
