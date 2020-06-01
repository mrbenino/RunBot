const Telegraf = require('telegraf')
const config = require('config')
const bot = new Telegraf(config.get('token'))
const axios = require('axios');
const regex = /^(бег [0-9]*[.,]?[0-9]+$)$/i

console.log('┌────────────────────┐')
console.log('│ bot by:  @mrbenino │')
console.log('└────────────────────┘')
bot.use(Telegraf.log())

bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.command('echo', (ctx) => ctx.reply('Echo'))
bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.on('text', (ctx) => {
    let ms = ctx.message.text
    if (regex.test(ms)) {
        // console.log(ctx.message.from.username)
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }   
          let text = ctx.message.text.replace(/,/g, ".")
          text = text.match(`[0-9]*[.,]?[0-9]`)
        axios({
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            url: 'https://bot.mnml.pp.ua/inc/api.php',
            data: 'username='+ctx.message.from.username+'&result='+ text
        })
        .then(function (response) {
            let dump = 0
            let week_dump = 32
            let yor_dump = 0
            var today = new Date();
            var weekNumber = today.toLocaleDateString();
            let key = 0
            for (let i = 0; i < response.data.length; i++) {
                dump += Number(response.data[i].result)
                if(response.data[i].username == ctx.message.from.username){
                    yor_dump += Number(response.data[i].result)
                }
            }
            ctx.reply(`Left to run 🏃🏽‍♂️🏃‍♀️🏃🏽‍♂️ ${dump.toFixed(1)} km \nLeft last week 🏃🏽‍♂️🏃‍♀️ ${week_dump.toFixed(1)} km \n${ctx.message.from.first_name} you resalt 👟 ${yor_dump.toFixed(1)} km`)
        })
        .catch(function (error) {
            console.log(error);
        });

    } else {
        console.log('not ok')
    }
})

bot.launch()
