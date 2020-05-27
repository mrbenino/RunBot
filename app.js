const Telegraf = require('telegraf')
const config = require('config')
const bot = new Telegraf(config.get('token'))
const regex = /^(бег [0-9]{1,2})$/i

console.log('┌────────────────────┐')
console.log('│ bot by:  @mrbenino │')
console.log('└────────────────────┘')
// bot.use(Telegraf.log())

bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.command('echo', (ctx) => ctx.reply('Echo'))
bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.on('text', (ctx) => {
    let ms = ctx.message.text
    if (regex.test(ms)) {
        console.log('ok')
        ctx.reply('👍')
    } else {
        console.log('not ok')
    }
})


bot.launch() 