const Scene = require('telegraf/scenes/base')

class ScenesGenerator{
    GenAgeScene() {
        const age = new Scene('age')
        age.enter(async (ctx) => {
            await ctx.reply('Привет! Ты занимаешься бегом? Если да то давай знакомиться 🤓 сколько тебе лет?')
        })
        age.on('text', async (ctx) => {
            const currAge = Number(ctx.message.text)
            if (currAge && currAge > 0) {
                await ctx.reply('Да ты еще молод)')
                ctx.scene.enter('name')
            } else {
                await ctx.reply('Меня не проведешь! Напиши пожалуйста возраст цифрами и больше нуля')
                ctx.scene.reenter()
            }
        })
        age.on('message', (ctx) => ctx.reply('Давай лучше возраст'))
        return age
    }

    GenNameScene() {
        const name = new Scene('name')
        name.enter((ctx) => ctx.reply('Ох где мои манеры! Я совсем забыл представиться меня зовут ###### а как мне к тебе обращаться?'))
        name.on('text', async (ctx) => {
            const name = ctx.message.text
            if (name) {
                await ctx.reply(`Привет, ${name}`)
                ctx.scene.enter('run')
            } else {
                await ctx.reply('Я так и не понял, как тебя зовут')
                await ctx.scene.reenter()
            }
        })
        name.on('message', (ctx) => ctx.reply('Это явно не твое имя'))
        return name
    }
    GenRunScene() {
        const run = new Scene('run')
        run.enter((ctx) => ctx.reply('Думаю ты любишь бегать, сколько ты пробежал сегодня?'))
        run.on('text', async (ctx) => {
            const currRun = Number(ctx.message.text)
            if (run) {
                await ctx.reply(`Ого да ты спортсмен, ${currRun}км пробежит не каждый 🧐`)
                ctx.scene.enter('next')
            } else {
                await ctx.reply('Эх мы говорим на разных языках 😅 давай еще раз')
                await ctx.scene.reenter()
            }
        })
        run.on('message', (ctx) => ctx.reply('🙃'))
        return run
    }
    GenNextScene() {
        const next = new Scene('next')
        next.enter((ctx) => ctx.reply('Сколько планируешь пробежать завтра?'))
        next.on('text', async (ctx) => {
            const currNext = Number(ctx.message.text)
            if (next) {
                await ctx.reply(`Отличный план ${currNext}км это хорошее расстояние`)
                ctx.scene.leave()
            } else {
                await ctx.reply('Эх мы говорим на разных языках 😅 давай еще раз')
                await ctx.scene.reenter()
            }
        })
        next.on('message', (ctx) => ctx.reply('🙃'))
        return next
    }
}
module.exports = ScenesGenerator