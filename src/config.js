import fs from 'fs'
import { promisify }from 'util'
import path from 'path'

// promise version of fs.stat
const PStat = promisify(fs.stat)
const PWriteFile = promisify(fs.writeFile)
const configPath = path.resolve(process.cwd(), '.config')

export async function createConfig ({API_KEY, LANG_FROM, LANG_TO}) {
    console.log('Необходима начальная конфигурация')
    const configString = `API_KEY=${API_KEY}\nLANG_FROM=${LANG_FROM}\nLANG_TO=${LANG_TO}`
    try {
        await PWriteFile(configPath, configString, 'UTF-8')
    } catch (err) {
        console.log(err)
    }
}

export async function defineConfig (options) {
    try {
        await PStat(configPath)
        const config = await readConfig()
    } catch (error) {
        if (error.errno === -2) {
            await createConfig(options)
        } else {
            console.log('Неизвестная ошибка')
            return
        }
    }
}

