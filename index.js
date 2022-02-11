const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"], })
const fetch = require("node-fetch");
const pagination = require('discord.js-pagination');
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
  client.user.setActivity("with Dick", {type: "PLAYING"})
})



client.on("messageCreate", msg => {
  if (msg.content == "gang"){
    msg.channel.send("shit")
  }
})

//POLL

  client.on("messageCreate", async (msg) => {
  try{
    if (msg.author.bot || msg.channel.type === "dm") return;
    let query = msg.content.split(" ");

    if(query[0] === '.poll'){
      
      
      let kkk = "Ievadi ziņu nakamreiz DAVNI";
      if(query.length > 1){
        kkk = query.slice(1, query.length).join(" ");
      }
       if(!query[1]) return msg.reply("Par ko balsot? :thinking:");

      const embedPoll = new Discord.MessageEmbed()
      .setTitle(`${msg.author.username}'s Poll!`)
      .setDescription(`**Question:** ${kkk} \n **Voting time:** 30sec`)
      .setTimestamp()
      .setColor('RED')
      const qemb = await msg.channel.send({ embeds: [embedPoll] })
      qemb.react('👍');
      qemb.react('👎');

      const filter = (reaction, user) => {
	    return reaction.emoji.name === '👍' || reaction.emoji.name === '👎';
      };
      const results = await qemb.awaitReactions({ filter, time:30000 })

      const resultsEmbed = new Discord.MessageEmbed()
      .setTitle(`${qemb.author.username}'s Poll Results!`)
      .setDescription(`**Results for the question:** ${kkk}`)
      .addField("👍:",`${results.get("👍").count-1} Votes`)
      .addField('👎:',`${results.get("👎").count-1} Votes`)
      //.then(collected => console.log(`Collected ${collected.size} reactions`))
      //.catch(console.error);

    
    msg.channel.send({ embeds: [resultsEmbed] });
    }}
        catch(err){
        console.log(`Error in the main Functionality! ${err}`);
        msg.react('❌');
    }
});

//POLL

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

    if(!args[0]) return msg.reply("A kas japareģo? :thinking: Nakamreiz ievadi ko pareģot. :clown:");


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

//RETARD
client.on("messageCreate", async (msg) => {
  try{

    if(!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    function retard() {
    var rand = ['https://media1.tenor.com/images/33f03dc04994af47305189d5da00f13c/tenor.gif?itemid=14638153','https://media1.tenor.com/images/fe3788c68a25911c139c027034e2f88a/tenor.gif?itemid=13936491','https://media.giphy.com/media/h8HmN0UcEKR0xWnv3R/giphy.gif','https://media.giphy.com/media/LkxWvkmpy2uznXth6A/giphy.gif'];

    

    return rand[Math.floor(Math.random()*rand.length)];
    }
    
    if(command === 'dumb'){

       const embedgif = new Discord.MessageEmbed()
      .setTitle("XDDDDDDDDDDDDDDDDDDDDDDDD")
      .setColor('RANDOM')
      .setImage(retard())
      const qemb = await msg.channel.send({ embeds: [embedgif] })



      //msg.channel.send(retard());
    }}
     catch(err){
        console.log(`Error in the main Functionality! ${err}`);
        msg.react('❌');
    }
});
//RETARD


//GIF
client.on("messageCreate", async (msg) => {
  try{
    let query = msg.content.split(" ");
    if(query[0] == ".gif") {
      let meme = "dark meme";
      if(query.length > 1){
        meme = query.slice(1, query.length).join(" ");
      }
      let url = `https://api.tenor.com/v1/search?q=${meme}&key=${process.env.TENORKEY}"`;
      let response = await fetch(url);
      let { results } = await response.json();
      let random = results[Math.floor(Math.random() * results.length)];
      let { gif } = random.media[0]; //parverš linku par media kas ļauj ievietot embeda
      //msg.channel.send(data.results[random].url);

      const gifcmd = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setImage(gif.url)
      msg.channel.send({ embeds: [gifcmd] })

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
//GIPHY
//GIF






 
