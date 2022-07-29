const Discord = require("discord.js")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"], })
const fetch = require("node-fetch");
const pagination = require('discord.js-pagination');
const snekfetch = require('snekfetch');
process.env.PORT || 3000;
let prefix = '.';
require('events').EventEmitter.defaultMaxListeners = 15;
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

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  //client.user.setActivity("with Dick", { type: "PLAYING" })
})



client.on("messageCreate", msg => {
   const args = msg.content.slice().split();
    const command = args.shift().toLowerCase();
  if (command === 'gang') {
      msg.channel.send("shit")
    }
})

client.on("messageCreate", msg => {
  if (msg.content == "fakti") {
    msg.channel.send("🇱 🇮 🇪 🇱 🇮    🇫 🇦 🇰 🇹 🇮")
  }
})

client.on("messageCreate", msg => {
  if (msg.content == "ko tu") {
    msg.channel.send("es jau tur")
  }
})

client.on("messageCreate", msg => {
  if (msg.content == "kas tas bija") {
    msg.channel.send("https://media.discordapp.net/attachments/693907891563790377/916302830996946944/ezgif.com-gif-maker.gif")
  }
})

client.on('guildMemberAdd', guildMember =>{
   let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'viesis');
   guildMember.roles.add(welcomeRole); 
   guildMember.guild.channels.resolve('784866801925619722').send(`Welcome ,@${guildMember.user.id}>`)
})

//Reminder

client.on("messageCreate", async (msg) => {
  try {
    if (msg.author.bot || msg.channel.type === "dm") return;
    let query = msg.content.split(" ");


    if (query[0] === '.remind') {

      let text = "Ievadi ziņu nakamreiz DAVNI";

      if (query.length > 2) {
        text = query.slice(2, query.length).join(" ");
      }
      if (!Number(query[1])) return msg.reply("Input format [ **.remind <minutes> <text>** ]")
      else if (Number(query[1]) < 1) return msg.reply("Minimum value is 1");
      else if (Number(query[1]) > 525948) return msg.reply("Enter valid number");
      if (!query[2]) return msg.reply("Input format [ **.remind <minutes> <text>** ]");


      const embedPoll = new Discord.MessageEmbed()
        .setDescription(`Will remind you about **${text}** in **${Number(query[1])}** minutes`)
        .setTimestamp()
        .setColor('RANDOM')
      const qemb = await msg.channel.send({ embeds: [embedPoll] })

      const results = await qemb.awaitReactions({ time:Number(query[1]) * 1000 * 60})

     
      const resultsEmbed = new Discord.MessageEmbed()
        .setTitle('Reminder')
	      .setURL(msg.url) 
        .setDescription(`${text}`)     
      
      //.then(collected => console.log(`Collected ${collected.size} reactions`))
      //.catch(console.error);
      
      //msg.channel.send('${msg.author}',{ embeds: [resultsEmbed] });
      msg.channel.send({content: `${msg.author}`, embeds: [resultsEmbed],
});
    }
  }
  catch (err) {
    console.log(`Error in the main Functionality! ${err}`);
  }
});

//Reminder

//POLL

client.on("messageCreate", async (msg) => {
  try {
    if (msg.author.bot || msg.channel.type === "dm") return;
    let query = msg.content.split(" ");


    if (query[0] === '.poll') {

      let text = "Ievadi ziņu nakamreiz DAVNI";

      if (query.length > 2) {
        text = query.slice(2, query.length).join(" ");
      }
      if (!Number(query[1])) return msg.reply("Input format [ ***.poll <seconds> <text>*** ]")
      else if (Number(query[1]) < 5) return msg.reply("Minimum value is 5");
      if (!query[2]) return msg.reply("Input format [ **.poll <seconds> <text>** ]");


      const embedPoll = new Discord.MessageEmbed()
        .setTitle(`${msg.author.username}'s Poll!`)
        .setDescription(`**Question:** ${text} \n **Voting time:** ${Number(query[1])}sec`)
        .setTimestamp()
        .setColor('RANDOM')
      const qemb = await msg.channel.send({ embeds: [embedPoll] })
      qemb.react('👍');
      qemb.react('👎');

      const filter = (reaction) => {
        return reaction.emoji.name === '👍' || reaction.emoji.name === '👎';
      };
      const results = await qemb.awaitReactions({ filter, time:Number(query[1] * 1000)})

      const resultsEmbed = new Discord.MessageEmbed()
        .setTitle(`${qemb.author.username}'s Poll Results!`)
        .setDescription(`**Results for the question:** ${text}`)        
        .addField("👍:", `${results.get("👍").count - 1} Votes`)
        .addField('👎:', `${results.get("👎").count - 1} Votes`)
      //.then(collected => console.log(`Collected ${collected.size} reactions`))
      //.catch(console.error);


      msg.channel.send({ embeds: [resultsEmbed] });
    }
  }
  catch (err) {
    console.log(`Error in the main Functionality! ${err}`);
  }
});

//POLL

//8BALL
client.on("messageCreate", async (msg) => {
  try {

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    function doMagic8BallVoodoo() {
      var rand = ['kā es to redzu, jā.', 'vēlāk jautā vēlreiz.', 'labāk tagad nestāsti.', 'tagad nevar paredzēt.', 'koncentrējies un jautā vēlreiz.', 'ar to nerēķinies.', 'tas ir skaidrs.', 'tā noteikti ir.', 'visticamāk.', 'mana atbilde ir nē.', 'mani avoti saka nē.', 'perspektīva nav tik laba.', 'perspektīva laba.', 'atbilde miglaina, mēģini vēlreiz.', 'zīmes norāda uz jā.', 'ļoti apšaubāmi.', 'bez šaubām.', 'jā.', 'jā - noteikti.', 'vari paļauties uz to.'];

      if (!args[0]) return msg.reply("A kas japareģo? :thinking: Nakamreiz ievadi ko pareģot. :clown:");


      return rand[Math.floor(Math.random() * rand.length)];
    }
    if (command === '8ball') {
      msg.reply(doMagic8BallVoodoo());
    }
  }
  catch (err) {
    console.log(`Error in the main Functionality! ${err}`);
    msg.react('❌');
  }
});
//8BALL

/*RETARD
client.on("messageCreate", async (msg) => {
  try {

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    function retard() {
      var rand = ['https://media1.tenor.com/images/33f03dc04994af47305189d5da00f13c/tenor.gif?itemid=14638153', 'https://media1.tenor.com/images/fe3788c68a25911c139c027034e2f88a/tenor.gif?itemid=13936491', 'https://media.giphy.com/media/h8HmN0UcEKR0xWnv3R/giphy.gif', 'https://media.giphy.com/media/LkxWvkmpy2uznXth6A/giphy.gif'];



      return rand[Math.floor(Math.random() * rand.length)];
    }

    if (command === 'stoopid') {

      const embedgif = new Discord.MessageEmbed()
        .setTitle("XDDDDDDDDDDDDDDDDDDDDDDDD")
        .setColor('RANDOM')
        .setImage(retard())
      const qemb = await msg.channel.send({ embeds: [embedgif] })



      //msg.channel.send(retard());
    }
  }
  catch (err) {
    console.log(`Error in the main Functionality! ${err}`);
    msg.react('❌');
  }
});
*///RETARD

/*/SAY

client.on("messageCreate", async (msg) => {
  try {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'say') {
      let MSG = msg.content.split(" ");
      let Query = MSG.slice(1).join("+");
      let QueryD = MSG.slice(1).join(" ");
      if (!Query) msg.reply("Please specify something for me to say!")
      else {
        msg.channel.send(QueryD)
      }
    }
  } catch (err) {
    return console.log(err);
  }
});

*///SAY



//GIF
client.on("messageCreate", async (msg) => {
  try {
    let query = msg.content.split(" ");
    if (query[0] == ".gif") {
      let meme = "dark meme";
      if (query.length > 1) {
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

    }
  }
  catch (err) {
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

/*/NSFW REDDIT

client.on("messageCreate", async (msg) => {
  try {

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    function girls() {
      var rand = ['RealGirls', 'NSFW', 'BoltedOnTits', 'HighResNSFW', 'randomsexiness', 'ass', 'bigasses', 'SpreadEm', 'booty', 'thick', 'ShinyPorn', 'seethru', 'gonewild', 'Blonde', 'redheads', 'shorthairchicks', 'HappyEmbarrassedGirls', 'palegirls', 'SexyFrex', 'flexi', 'LegalTeens', 'theratio', 'milf', 'Hotchickswithtattoos', 'piercedtits', 'PiercedNSFW', 'pussy', 'rearpussy', 'HairyPussy', 'simps', 'selfshots', 'SexyGirlsInBoots', 'boobs', 'Boobies'];

      return rand[Math.floor(Math.random() * rand.length)];
    }
    if (command === 'nsfw') {
      const { body } = await snekfetch
        .get(`https://www.reddit.com/r/${girls()}.json?sort=top&t=week`)
      const allowed = msg.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
      if (!allowed.length) return msg.channel.send('Restricted content!');
      const randomnumber = Math.floor(Math.random() * allowed.length)

      //const embed = new Discord.MessageEmbed()
      //.setColor("RANDOM")
      //.setTitle(allowed[randomnumber].data.title)
      //.setDescription("Posted by: " + allowed[randomnumber].data.author)
      //.setImage(allowed[randomnumber].data.url)
      //.addField("Other info:", "Up votes: " + allowed[randomnumber].data.ups + " / //Comments: " + allowed[randomnumber].data.num_comments)
      //.setFooter({text:`NSFW provided by r/${girls()}`})

      //msg.guild.channels.cache.get("646362943063326720").send(/*{ embeds: [embed] }allowed[randomnumber].data.url);

    }
    msg.channel.send(allowed[randomnumber].data.url)
  } catch (err) {
    return console.log(err);
  }
});

*/







