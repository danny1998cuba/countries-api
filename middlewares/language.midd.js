const { supporteddLanguages } = require('../data')

const language = (req, res, next) => {
    let lang = req.params.language
    if (lang) {
        if (/^[a-z]{2}$/i.test(lang) && supporteddLanguages.includes(lang))
            req.lang = req.params.language
        else
            res.status(401).json({ error: "Unsupported API language" })
    }
    next()
}

module.exports = language
