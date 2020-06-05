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
            // console.table(response.data)
            let today = new Date()
            let diff = today.getDay
            // console.log(today.toDateString())
            let temp_day = new Date()
            let actual_result = 0
            let month_resualt = 0
            let month_dump = 0
            let week_result = 0
            let dump = 0
            let yor_dump = 0
            
            for (let i = 0; i < response.data.length; i++) {
                dump += Number(response.data[i].result)
                temp_day.setTime(Date.parse(response.data[i].receipt_date))
                if(response.data[i].username == ctx.message.from.username){
                    yor_dump += Number(response.data[i].result)
                    if(temp_day.getFullYear == today.getFullYear && temp_day.getMonth == today.getMonth){
                        month_resualt += Number(response.data[i].result)
                    }
                }
                if(temp_day.getFullYear == today.getFullYear && temp_day.getMonth == today.getMonth){
                    month_dump += Number(response.data[i].result)
                }
                if (temp_day.getDate == today.getDate) {
                    actual_result += Number(response.data[i].result)
                }
            }
            console.table(response.data)
            for (let i = response.data.length - 1; i ; i--) {
                console.log(response.data[i].receipt_date)
                temp_day.setTime(Date.parse(response.data[i].receipt_date))
                if(temp_day.getDate == today.getDate){
                    week_result += Number(response.data[i].result)
                }else if(temp_day.getDay < today.getDay && temp_day.getDay != 0) {
                    week_result += Number(response.data[i].result)
                }else {break;}
            }

            ctx.reply(`───Статистика ${ctx.message.from.first_name} 👟───\n${ctx.message.from.first_name} Ваш результат 👟 сегодня ${actual_result.toFixed(2)} km \n${ctx.message.from.first_name} результат за неделю 👟 ${week_result.toFixed(2)} km\n${ctx.message.from.first_name} результат за месяц 👟 ${month_resualt.toFixed(2)} km\n${ctx.message.from.first_name} общий результат 👟 ${yor_dump.toFixed(2)} km\n───Статистика группы 🌓🏃🏾‍♀️───\nЗа месяц 🏃‍♀️🏃🏻‍♂️🏃🏾‍♀️ ${month_dump.toFixed(2)} km до 🌓\nВсего 🏃пробежали до 🌓 ${dump.toFixed(2)} km\nНам осталось до 🌓 ${300000 - dump.toFixed(2)} km\n`)
        })
        .catch(function (error) {
            console.log(error);
        });

    } else {
        console.log('not ok')
    }
})

bot.launch()
