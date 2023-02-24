const data = require('../data')

const listByLanguage = (listType = ('countries' | 'continents' | 'languages')) => {
    return (req, res, next) => {
        const fromData = data[listType]
        let lang = req.lang || process.env.DEFAULT_LANGUAGE || 'en'

        req.list = fromData[lang]

        next()
    }
}

module.exports = listByLanguage