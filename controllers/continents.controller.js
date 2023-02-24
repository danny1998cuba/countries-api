const data = require('../data')

const name = (req, res) => {
    if (req.list) {
        res.json(Object.values(req.list).map(continent => continent))
    }
    else
        res.json('No data')
}

const fullData = (req, res) => {
    const continents = req.list
    const asArray = Object.values(continents)

    Object.keys(continents).forEach((key, index) => {
        asArray[index] = { id: key, name: asArray[index] }
    })

    if (continents)
        res.json(asArray)
    else
        res.json('No data')
}

const abrevs = (req, res) => {
    res.json(Object.keys(data.continents.en))
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

const countriesCount = (req, res) => {
    let abrev = req.params.abrev.toUpperCase()

    if (/^[a-z]{2}$/i.test(abrev) && data.continents.en[abrev]) {
        res.json(
            Object.values(data.countries.common).filter(country =>
                country.continent == abrev
            ).length)
    } else
        res.json('Invalid abreviation')
}

module.exports = {
    abrevs,
    countriesCount,
    filterByAbrev,
    fullData,
    name
}