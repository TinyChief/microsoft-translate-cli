import CONFIG from './config.js'
import got from 'got'

async function callApiForTranslation ({textToTranslate, langTo}) {
	const URL = `https://microsoft-translator-text.p.rapidapi.com/translate?to=${langTo}&api-version=3.0&profanityAction=NoAction&textType=plain`

    const res = await got.post(URL, {
		headers: {
			'content-type': "application/json",
			'x-rapidapi-key': CONFIG.API_KEY,
			'x-rapidapi-host': "microsoft-translator-text.p.rapidapi.com",
		},
		json: [
			{
				"Text": textToTranslate
			}
		]}
	)

    console.log(res.body)
}

export default callApiForTranslation