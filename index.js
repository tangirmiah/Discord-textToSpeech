const Discord = require("discord.js");
const client = new Discord.Client();

const googleTTS = require('google-tts-api');

require('dotenv').config()

const prefix = "_speak";
const prefix1 = "!speak";
// if (client.channels.id === "739587032791121941") {

// }
client.on("message", async (msg) => {
    // console.error(msg)
    if (msg.content.startsWith(prefix + "help") || msg.content.startsWith(prefix1 + "help")) {
        msg.reply("La lista delle lingue e i relativi codici sono \nITALIANO : it \nINGLESE : en\nBANGLA : bn\nPer la lista completa visitare https://cloud.google.com/text-to-speech/docs/voices")
    } else if (msg.content.startsWith(prefix) || msg.content.startsWith(prefix1)) {
        if (msg.member.voice.channel) {
            const playable = await msg.member.voice.channel.join();
            msg.replay(msg.content.slice(msg.content.indexOf(" ")));
            msg.replay(msg.content.slice(6, msg.content.indexOf(" ")));
            googleTTS(`${msg.content.slice(msg.content.indexOf(" "))}`, `${msg.content.slice(6, msg.content.indexOf(" "))}`, 1) // speed normal = 1 (default), slow = 0.24
                .then(function (url) {
                    // console.log(url); // https://translate.google.com/translate_tts?...
                    const dispatcher = playable.play(url)
                })
                .catch(function (err) {
                    console.error(err.stack);
                });
        } else {
            message.reply('You need to join a voice channel first!');
        }
    }

})

client.on("ready", () => {
    console.log("bot is connected")

})
client.login(`${process.env.BOT_TOKEN}`);