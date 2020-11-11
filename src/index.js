import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import callApiForTranslation from './api.js'
import { createConfig } from './config.js'

const argv = yargs(hideBin(process.argv))
    .command('configure <key> <from> <to>', 'начальная конфигурация', (yargs) => {
        yargs
            .option('key', {
                describe: 'API key'
            })
            .option('from', {describe: 'С какого языка переводить'})
            .option('to', {describe: 'На какой язык переводить'})
    }, async (argv) => {
        console.log('Конфигурация', argv)
        const configurationOptions = {
            API_KEY: argv.key,
            LANG_FROM: argv.from,
            LANG_TO: argv.to
        }
        await createConfig(configurationOptions)
    })
    .command('$0', 'перевести текст', (yargs) => {
        yargs
            .option('f', {
                alias: 'from',
                describe: 'language to translate from',
                default: CONFIG.LANG_FROM
            })
            .option('t', {
                alias: 'target',
                describe: 'language needed to translate to',
                default: CONFIG.LANG_TO
            })
            .option('m', {
                alias: 'msg',
                describe: 'message to translate'
            })
    }, async (argv) => {
        const options = {
            textToTranslate: argv.msg || argv._[0],
            langFrom: argv.f,
            lagnTo: argv.t,
            verbose: false
        }

        await callApiForTranslation(options)
    })
    .argv

