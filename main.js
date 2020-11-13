const fs = require("fs");
const keepAlive = require('./server');
const Canvas = require('canvas');
const { registerFont } = require('canvas')
registerFont('fonts/OpenSans-Regular.ttf', { family: 'FontName' });

const config = require("./config.json")
const spam_messages = require("./spam2.json")

const raid = require("./raid.json")
const Discord = require('discord.js');
const client = new Discord.Client();
const PREFIX = process.env.PREFIX;


var db = JSON.parse(fs.readFileSync("./level.json", "utf8"));
var db2 = JSON.parse(fs.readFileSync("./spam2.json", "utf8"));
var list= JSON.parse(fs.readFileSync("./raid.json", "utf8"));


//spam

const usersMap = new Map();
const LIMIT = 5;
const TIME = 4000;
const DIFF = 2000;

 

client.on('ready', () => {
  const activities_list = [
    "xxhelp", 
    "discord.me/languages",
    `${client.guilds.cache.size} Servers`
    ];
   setInterval(() => {

        const index = Math.floor(Math.random() * activities_list.length); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index], { type: "LISTENING" }); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000); 
  console.log('Ready!');

  
});




const isValidCommand = (message, cmdName) => (message.content.toLowerCase().startsWith(config.prefix + cmdName))



client.on("message", async message => {


    



if(message.guild.id=="") return;

     var ID = message.author.id.toString();


if(message.guild.id === ""){


}
//db.set('userInfo', { levelsystem: ""})
    
if (!db[message.author.id]) 
    db[message.author.id] = {
      spam:0,
      xp:0,
      lvl:0
      };

if (!db2[message.author.id]) 
    db2[message.author.id] = {
      spam:[]
      };


var userLevel = db[message.author.id];
var userSpam = db2[message.author.id];




  
if(isValidCommand(message,'raid')){
  
  userLevel.xp = userLevel.xp + 15
  if(message.guild.id =="") return;
  if(!message.member.hasPermission('ADMINISTRATOR')){
     message.channel.send("you are not the admin!").catch(console.log(Error))
  } 
  

  if(list.list.includes(message.guild.id)){
    return message.channel.send("Already registered.")
  }
    console.log("Start")
    userLevel.lvl++
   message.channel.send(message.author.username + ",").catch(console.log(Error))
        message.channel.send("```Your guild got registered. Rename your welcome channel to welcome```").catch(console.log(Error));
        
        list.list.push(message.guild.id)
        fs.writeFile("./raid.json", JSON.stringify(list), (x) => {
            if (x) console.error(x)
            }); 
            /*   
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { max: 1, time: 20000 });
        collector.on('collect', message => {
          if(raid.list.includes(message.guild.id))return;
            raid.list.push(message.guild.id)

            fs.writeFile("./raid.json", JSON.stringify(raid), (x) => {
            if (x) console.error(x)
            }); 
        })   */
        }


    var messages = message.content.length
    var Channel = message.channel.name.toLowerCase()
    if(Channel === "spam") {return}
    if(Channel === "counting") {return}
    else{
       userSpam.spam.push(messages)
    }

    if(userSpam.spam.length>13){
        userSpam.spam = []

      }
      /*
    if(userSpam.spam.length>20){
      if( message.member.hasPermission('MANAGE_ROLES') || message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('KICK_MEMBERS') ||  message.member.hasPermission('BAN_MEMBERS')) return
      if(message.guild.id =="")return
      if(userSpam.spam[userSpam.spam.length-1]==userSpam.spam[userSpam.spam.length-2]&&userSpam.spam[userSpam.spam.length-3]&&userSpam.spam[userSpam.spam.length-4]&&userSpam.spam[userSpam.spam.length-5]&&userSpam.spam[userSpam.spam.length-6]&&userSpam.spam[userSpam.spam.length-7]&&userSpam.spam[userSpam.spam.length-8]&&userSpam.spam[userSpam.spam.length-9]&&userSpam.spam[userSpam.spam.length-10]&&userSpam.spam[userSpam.spam.length-11]&&userSpam.spam[userSpam.spam.length-12]&&userSpam.spam[userSpam.spam.length-13]&&userSpam.spam[userSpam.spam.length-14]&&userSpam.spam[userSpam.spam.length-15]&&userSpam.spam[userSpam.spam.length-16]&&userSpam.spam[userSpam.spam.length-17]&&userSpam.spam[userSpam.spam.length-18]&&userSpam.spam[userSpam.spam.length-19]&&userSpam.spam[userSpam.spam.length-20]){
        
         message.channel.messages.fetch({limit: 100}).then(m => 
        {
        let filtered = m.filter(msg => msg.author.id === message.author.id) 
          message.channel.bulkDelete(filtered).then(messages =>console.log(`bulkdeleted from ${message.author.tag} => ${message.content}`)).catch(console.log("Error5"))
      })
        userSpam.spam=[]

       }
    }*/
    if(userSpam.spam.length>12){
      if(message.guild.id =="")return
      if(userSpam.spam[userSpam.spam.length-1]==userSpam.spam[userSpam.spam.length-2]&&userSpam.spam[userSpam.spam.length-3]&&userSpam.spam[userSpam.spam.length-4]&&userSpam.spam[userSpam.spam.length-5]&&userSpam.spam[userSpam.spam.length-6]&&userSpam.spam[userSpam.spam.length-7]&&userSpam.spam[userSpam.spam.length-8]&&userSpam.spam[userSpam.spam.length-9]&&userSpam.spam[userSpam.spam.length-10]&&userSpam.spam[userSpam.spam.length-11]){
        
            if(message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('MANAGE_ROLES') || message.member.hasPermission('KICK_MEMBERS') ||  message.member.hasPermission('BAN_MEMBERS')) return
           userLevel.spam++
        let author_ = message.author.username
        message.channel.send("```js\n"+ `"${author_} spammed."`+"```")
        console.log('\x1b[31m%s\x1b[0m', message.content.toString());

                    message.channel.messages.fetch({limit: 40}).then(m => 
        {
        let filtered = m.filter(msg => msg.author.id === message.author.id) 
          message.channel.bulkDelete(filtered).then(messages =>console.log(`bulkdeleted from ${message.author.tag} => ${message.content}`)).catch(console.log("Error5"))
      })
        userSpam.spam=[]
  
 
 

       fs.writeFile("./spam2.json", JSON.stringify(db2), (x) => {
        if (x) console.log("Error:link")
      });
    
    
               
      
      }}

    
    


//////mute
    if(usersMap.has(message.author.id)){


      if(Channel === "spam") return;

      if(Channel === "counting") {return}
      if(message.guild.id=="" ||message.guild.id=="" ) return;

      const userData = usersMap.get(message.author.id);
      const { lastMessage, timer } = userData;
      const difference = message.createdTimestamp -lastMessage.createdTimestamp;
      let msgCount = userData.msgCount;
      
      if(difference > 2500){
 
          clearTimeout(timer);
          userData.msgCount = 1;
          userData.message = message;
          userData.timer = setTimeout(() => {
            usersMap.delete(message.author.id);
          }, 3120);
          usersMap.set(message.author.id, userData);
      } else{
        msgCount++
      if(parseInt(msgCount) == 5){
      let role = message.guild.roles.cache.find(role => role.name == "muted");   
      if(role){
      message.member.roles.add(role)
            message.channel.setRateLimitPerUser(3,"spam")
            message.channel.messages.fetch({limit: 40}).then(m => 
        {
        let filtered = m.filter(msg => msg.author.id === message.author.id)
       
          message.channel.bulkDelete(filtered).then(messages =>console.log(`bulkdeleted from ${message.author.tag} => ${message.content}`)).catch(err => console.log(err))
      })

   
       console.log('\x1b[36m%s\x1b[0m', message.content.toString());
      }

      if(!role){
        
            if((message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('KICK_MEMBERS') ||  message.member.hasPermission('BAN_MEMBERS'))&& message.guild.id !="686011822226276578") return
            if(message.guild.id =="")return; 
       var rolep = await message.guild.roles.create({
        data: {
          name: "muted",
          color:"black",
          permissions: [], 
          position: message.member.roles.highest.position + 1
        }
        
      })
      message.member.roles.add(rolep)

      message.channel.setRateLimitPerUser(3,"spam")
   userLevel.spam++
            message.channel.messages.fetch({limit: 15}).then(m => 
        {
        let filtered = m.filter(msg => msg.author.id === message.author.id) 
          message.channel.bulkDelete(filtered).then(messages =>console.log(`bulkdeleted from ${message.author.tag} => ${message.content}`)).catch(console.log("Error1"))
      })}

      console.log("MUTED: "+ message.author.tag)
      const test = async () => {

    await new Promise((resolve)=>
   setTimeout(function(){
  message.channel.setRateLimitPerUser(0,"unmute")
 }, 11000) 
)
};
     test();
      setTimeout( () => {
        try{
           message.member.roles.remove(rolep);
          
        }catch(err){console.log("ERR role removed")}
        
          try{
          
           message.member.roles.remove(role);
         
        }catch(err){console.log("ERR role removed")}
       
        console.log("UNMUTED: "+message.author.tag)
      },15000)
      }else{
        userData.msgCount = msgCount;
        usersMap.set(ID, userData);
      }
      }
    } else {
      let fn = setTimeout(() => {
        usersMap.delete(message.author.id);
      }, 3400)
      usersMap.set(message.author.id, {
        msgCount: 1,
        lastMessage: message,
        timer: fn
      });

    }

  const args = message.content.slice(config.prefix.length).trim().split(' ');
  var user_mention = message.mentions.users.first() || client.users.resolve(args[0]);
  const member = message.mentions.members.first() || message.member;

 

  

var OS = require('os');
var oldCPUTime = 0
var oldCPUIdle = 0
function getLoad(){
    var cpus = OS.cpus()
    var totalTime = -oldCPUTime
    var totalIdle = -oldCPUIdle
    for(var i = 0; i < cpus.length; i++) {
        var cpu = cpus[i]
        for(var type in cpu.times) {
            totalTime += cpu.times[type];
            if(type == "idle"){
                totalIdle += cpu.times[type];
            }
        }
    }

    var CPUload = 100 - Math.round(totalIdle/totalTime*100)
    oldCPUTime = totalTime
    oldCPUIdle = totalIdle

    return {
        CPU:CPUload,
        mem:100 - Math.round(OS.freemem()/OS.totalmem()*100)
    }       }
 const acpu = getLoad()



  

  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  if(isValidCommand(message,"help")){

  let userz = message.author || message.mentions.members.first()
	const canvas = Canvas.createCanvas(250, 250);
	const ctx = canvas.getContext('2d');




	//const background = await Canvas.loadImage('./test.jpg');
	//ctx.drawImage( 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#7289da';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);


  ctx.rect(4, 4, canvas.width*0.97, canvas.height*0.97)
  ctx.fillStyle = "#373B41";
  ctx.fill()


	// Slightly smaller text placed above the member's display name
    	ctx.font = '12.5px FontName';
	ctx.fillStyle = "#FAFAB2";
	ctx.fillText("[ANTI SPAM / HELP ]", 10, canvas.height / 9.5);



	// Add an exclamation point here and below
  ctx.font = '14px FontName';
	ctx.fillStyle = '#FFFFFF';
	ctx.fillText("An ANTI SPAM / ANTI RAID Bot. \nBot will ignore <spam> channels.\nThe anti-raid option only works\nfor the channel <welcome>.\nRoles: [member]&[muted].\nEdit your <muted> role.", 10, canvas.height / 2.5);

  	ctx.font = '12px FontName';
	ctx.fillStyle ="#FFFFFF";
	ctx.fillText("\n-[xxraid]-[xxprofile]-[xxinvite]-[xxsupport]-", 5, canvas.height / 6);




  //"Ram", `Bot is using ${Math.round(used * 100) / 100} MB`

  ctx.font = '10px FontName';
	ctx.fillStyle = '#7289da';
	ctx.fillText(`Users: ${message.guild.memberCount} | Servers: ${ client.guilds.cache.size} | RAM: ${Math.round(used * 100) / 100} MB`, 10, 240);


	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

  message.channel.send(attachment).catch(console.log(Error));

  }





  if(isValidCommand(message, "invite")){
    if(message.guild.id =="xx") return;

  
    if(message.content.match(/(^https?:\/\/discord.gg|discord.gg)\/(.*)/ig)){
      if(Channel === "spam") return;

    if(message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('KICK_MEMBERS') ||  message.member.hasPermission('BAN_MEMBERS') || message.member.hasPermission('MANAGE_GUILD') ||  message.member.hasPermission('MANAGE_ROLES')) return
      
      message.delete()
      
      

    }


    const blacklist=["x"]

    
    const blocked = blacklist.filter(word => message.content.toLowerCase().includes(word));

   if (blocked.length > 0) {
    if(Channel === "spam") return;
    if(message.guild.id =="") return;
    if(message.member.hasPermission('ADMINISTRATOR')) return
    console.log(message.content)
    


    try{
      message.delete()
    }catch(err){console.log("test error")}
    


    
    

  }
  if(!message.author.bot){
    //console.log(message.guild.name + " |:" + message.author.tag+"==="+ message.content)
  }


  }


  
  );


client.on('guildMemberAdd', async (member,message) => {

if(!list.list.includes(member.guild.id)) return;
  const CHANNEL2 = 'logs';
  
    var logger2=client.channels.cache.find(channel => channel.name === CHANNEL2)
    if (logger2) {
      const embed2 = new Discord.MessageEmbed()
        .setTitle('Member joined')
        .addField('Author', member.displayName)
        .setColor('0x00AAFF');
      logger2.send(embed2)}
    



var randoms = Math.floor(Math.random() * 99*542) 
member.guild.channels.cache.find(channel => channel.name =="welcome").send(member.displayName+",your password is: "+randoms).then(msg => msg.channel.messages.fetch({ limit: 1 })).then(messages => {
var lastMessage = messages.first();
console.log("role created verified 1.")
})

client.on('message', async message => {

///
async function rank(password){
             


  let userz = message.author
  

  let date = userz.createdAt.toLocaleDateString();

	const canvas = Canvas.createCanvas(530, 170);
	const ctx = canvas.getContext('2d');

let list_ = [];
const flags = message.member.user.flags.serialize()
const flag_keys = Object.keys(flags);
const flag_values = Object.values(flags)
console.log(flag_keys)
for(let i = 0;i<flag_keys.length;i++){
  if(flag_values[i]===true){
    list_.push(flag_keys[i])
  }
 
}
for(let j =0;j<list_.length;j++){
 if(list_[j]=="VERIFIED_DEVELOPER"){
   var emoji_badges = await Canvas.loadImage('./verified_badge.png');
   console.log("yes")
 }
if(list_[j]=="VERIFIED_BOT"){
   var emoji_verfied_bot = ""
   console.log("yes")
 }
if(list_[j]=="HOUSE_BRAVERY"){
  var emoji_house_bravery = await Canvas.loadImage('./bravery.png');
   console.log("yes")
 }
if(list_[j]=="HOUSE_BRILLIANCE"){
  var emoji_house_brilliance = await Canvas.loadImage('./brilliance_.png');

   console.log("yes")
 }
if(list_[j]=="HOUSE_BALANCE"){
   var emoji_house_balance = await Canvas.loadImage('./balance.png');
   console.log("yes")
 }

if(list_[j]=="EARLY_SUPPORTER"){
   var emoji_early_supporter = "early.png"
   console.log("yes")
 }

}
  

	const background = await Canvas.loadImage('./unbenannt.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#FFFFFF';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

    
  ctx.fillStyle = "rgba(10,10, 10, 0.65)";
  ctx.fillRect(5, 5, canvas.width*0.98, canvas.height*0.95);

  try{
    	ctx.drawImage(emoji_badges, 380, 10, 30, 30);
  }catch(err){console.log("ok")}

  try{
     ctx.drawImage(emoji_house_brilliance, 412, 14, 25, 25);
  }catch(err){console.log("ok")}


      try{
     
  ctx.drawImage(emoji_house_bravery, 412, 14, 25, 25);
  }catch(err){console.log("ok")}
  
      try{
     
 
  ctx.drawImage(emoji_house_balance, 412, 14, 25, 25);
  }catch(err){console.log("ok")}
  


 

  	ctx.font = '20px FontName';
	 ctx.fillStyle = '#00FFFF';
		ctx.fillText(`${userz.username.normalize()}`, 180, 45);


  	ctx.font = '20px FontName';
	ctx.fillStyle = '#00FFFF';
	ctx.fillText("Welcome in "+message.guild.name+"\nThanks for entering the PW.", 180, 70);

  ctx.font = '20px FontName';
	ctx.fillStyle = '#00FFFF';
	//ctx.fillText( `Game: ${userz.presence.game ? userz.presence.game.name : 'Not playing.'}`, 180, 105);
  //let b = userz.presence.activities[0] ? userz.presence.activities.map(msg => msg.name): "No activity."
  ctx.fillText( `${b}`, 180, 95);

    
  ctx.font = '20px FontName';
	ctx.fillStyle = '#FFFFFF';
	ctx.fillText(`${date}`, 180, 120);

  ctx.font = '20px FontName';
	ctx.fillStyle = '#FFFFFF';
	ctx.fillText(`Your Position: #${message.guild.memberCount}`, 180, 145);
  
  
      
      
  ctx.beginPath();
ctx.arc(85, 87, 75, 0, 2 * Math.PI, false);
ctx.lineWidth = 3;
ctx.strokeStyle = 'white';
ctx.stroke();



  ctx.beginPath();
	// Start the arc to form a circle
	ctx.arc(85, 87, 72, 0, Math.PI * 2, true);
	// Put the pen down
	ctx.closePath();
	// Clip off the region you drew on
	ctx.clip();

  //"Ram", `Bot is using ${Math.round(used * 100) / 100} MB`
	const avatar = await Canvas.loadImage(userz.displayAvatarURL({ format: 'jpg' }));

	ctx.drawImage(avatar, 10, 10, 150, 150);


	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
  


  message.channel.send(attachment).catch(console.log(Error));

  }
  
///
if(message.content==randoms){

let role_ = message.guild.roles.cache.find(role => role.name == "member"); 
if(!role_){
verified = await member.guild.roles.create({
        data: {
          name: "member",
          color:"black",
          permissions: [], 
          position: member.roles.highest.position + 1
        }
          
      })
      message.member.roles.add(verified)
      //message.member.roles.remove()
      }
      message.member.roles.add(role_)
rank(randoms)
console.log("end")
}

})

}

) 

keepAlive()
        fs.writeFile("./level.json", JSON.stringify(db), (x) => {
            if (x) console.error(x)
            }); 

client.login(config.token);
