const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const fetch = require("node-fetch");
process.env.PORT || 3000;

client.login(process.env.TOKEN);

client.on("ready", ()=> {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("messageCreate", msg => {
  if (msg.content == "gangg"){
    msg.reply("shit")
  }
})

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
    }
});





 
