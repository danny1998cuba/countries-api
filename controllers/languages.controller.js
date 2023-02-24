const data = require('../data')

const fullData = (req, res) => {
    const langs = req.list
    const asArray = Object.values(langs)

    Object.keys(langs).forEach((key, index) => {
        const commonData = data.languages.common[key]
        asArray[index] = { id: key, ...asArray[index], ...commonData }
    })

    if (langs)
        res.json(asArray)
    else
        res.json('No data')
}

const name = (req, res) => {
    if (req.list) {
        res.json(Object.values(req.list).map(lang => lang.name))
    }
    else
        res.json('No data')
}

const nativeName = (req, res) => {
    if (req.list)
        res.json(Object.keys(req.list).map(key => data.languages.common[key].native))
    else
        res.json('No data')
}

const abrevs = (req, res) => {
    res.json(Object.keys(data.languages.common))
}

const filterByAbrev = (req, res, next) => {
    if (req.list) {
        let abrev = req.params.abrev.toLowerCase()

        if (req.list[abrev]) {
            req.list = { [abrev]: req.list[abrev] }
            next()
        } else {
            res.sendStatus(404)
        }
    }
    else
        res.json('No data')
}

const filterByRtl = (req) => {
    if (req.list) {
        let list = Object.keys(req.list).filter(key => data.languages.common[key].rtl == 1)
        let list2 = {}
        list.forEach(el => { list2[el] = req.list[el] })
        req.list = list2
    }
    return req
}

const countriesCount = (req, res) => {
    let abrev = req.params.abrev.toLowerCase()

    if (/^[a-z]{2}$/i.test(abrev) && data.languages.common[abrev]) {
        res.json(
            Object.values(data.countries.common).filter(country =>
                country.languages.some(lang => lang == abrev)
            ).length)
    } else
        res.json('Invalid abreviation')
}

module.exports = {
    abrevs,
    countriesCount,
    filterByAbrev,
    filterByRtl,
    fullData,
    name,
    nativeName
}