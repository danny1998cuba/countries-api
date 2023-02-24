const data = require('../data')

const fullData = (req, res) => {
    const countries = req.list
    const asArray = Object.values(countries)

    Object.keys(countries).forEach((key, index) => {
        const commonData = data.countries.common[key]
        asArray[index] = { id: key, ...asArray[index], ...commonData }
    })

    if (countries)
        res.json(asArray)
    else
        res.json('No data')
}

const name = (req, res) => {
    if (req.list) {
        res.json(Object.values(req.list).map(country => country.name))
    }
    else
        res.json('No data')
}

const nativeName = (req, res) => {
    if (req.list)
        res.json(Object.keys(req.list).map(key => data.countries.common[key].native))
    else
        res.json('No data')
}

const abrevs = (req, res) => {
    res.json(Object.keys(data.countries.common))
}

const filterByAbrev = (req, res, next) => {
    if (req.list) {
        let abrev = req.params.abrev.toUpperCase()

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

const filterByContinent = (req, continent) => {
    if (req.list) {
        let list = Object.keys(req.list).filter(key => data.countries.common[key].continent == continent)
        let list2 = {}
        list.forEach(el => { list2[el] = req.list[el] })
        req.list = list2
    }
    return req
}

const filterByLanguage = (req, language) => {
    if (req.list) {
        let list = []
        if (Array.isArray(language)) {
            list = Object.keys(req.list).filter(key => {
                return language.every(lang => {
                    return data.countries.common[key].languages.includes(lang)
                })
            })
        } else
            list = Object.keys(req.list).filter(key => data.countries.common[key].languages.some(lang => lang == language))


        let list2 = {}
        list.forEach(el => { list2[el] = req.list[el] })
        req.list = list2

    }
    return req
}


module.exports = {
    abrevs,
    filterByAbrev,
    filterByContinent,
    filterByLanguage,
    fullData,
    name,
    nativeName,
}