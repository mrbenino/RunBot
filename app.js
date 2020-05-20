const Telegraf = require('telegraf')
const config = require('config')
const bot = new Telegraf(config.get('token'))
const {
    Extra,
    Markup,
    Stage,
    session
  } = Telegraf
const ScenesGenerator = require('./Scenes')
const currScene = new ScenesGenerator()
const ageScene = currScene.GenAgeScene()
const nameScene = currScene.GenNameScene()
const runScene = currScene.GenRunScene()
const nextScene = currScene.GenNextScene()
const stage = new Stage([ageScene, nameScene, runScene, nextScene])

bot.use(Telegraf.log())
bot.use(session())
bot.use(stage.middleware())
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.command('echo', (ctx) => ctx.reply('Echo'))
bot.command('scenes', async (ctx) => {
    ctx.scene.enter('age')
})
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch() 