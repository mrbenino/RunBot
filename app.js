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
            console.table(response.data)
            for (let i = 0; i < response.data.length; i++) {
                response.data[i].total = Number(response.data[i].total)
            }
            console.table(response.data)

            ctx.reply(`───Статистика ${ctx.message.from.first_name} 👟───\n${ctx.message.from.first_name} Ваш результат 👟 сегодня ${response.data[0].total.toFixed(2)} km \n${ctx.message.from.first_name} результат за неделю 👟 ${response.data[1].total.toFixed(2)} km\n${ctx.message.from.first_name} результат за месяц 👟 ${response.data[2].total.toFixed(2)} km\n───Статистика группы 🌓🏃🏾‍♀️───\nЗа месяц 🏃‍♀️🏃🏻‍♂️🏃🏾‍♀️ ${response.data[5].total.toFixed(2)} km до 🌓\nВсего 🏃пробежали до 🌓 ${response.data[6].total.toFixed(2)} km\nНам осталось до 🌓 ${300000 - response.data[6].total.toFixed(2)} km\n`)
        })
        .catch(function (error) {
            console.log(error);
        });

    } else {
        console.log('not ok')
    }
})

bot.launch()
