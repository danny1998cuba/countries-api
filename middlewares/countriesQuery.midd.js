const controller = require('../controllers').countriesController;
const data = require('../data')

const countriesQuery = (req, res, next) => {
    const continent = req.query.continent
    const lang = req.query.lang
    const native = req.query.native
    const name = req.query.name

    if (continent != undefined) {
        if (/^[a-z]{2}$/i.test(continent) && data.continents.en[continent.toUpperCase()])
            req = controller.filterByContinent(req, continent.toUpperCase())
        else
            res.json('Invalid Continent')
    }

    if (lang != undefined) {
        if (Array.isArray(lang)) {

            lang.forEach((l, index) => {
                if (/^[a-z]{2}$/i.test(l) && data.languages.common[l.toLowerCase()]) {
                    lang[index] = l.toLowerCase()
                } else
                    res.json('Invalid language')
            })

            req = controller.filterByLanguage(req, lang)
        } else if (/^[a-z]{2}$/i.test(lang) && data.languages.common[lang.toLowerCase()]) {
            req = controller.filterByLanguage(req, lang.toLowerCase())
        }
        else {
            res.json('Invalid language')
        }
    }


    if (native != undefined) {
        controller.nativeName(req, res)
    } else if (name != undefined) {
        controller.name(req, res)
    } else {
        controller.fullData(req, res)
    }
}

module.exports = countriesQuery