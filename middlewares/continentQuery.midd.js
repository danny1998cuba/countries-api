const controller = require('../controllers').continentController;
const data = require('../data')

const continentQuery = (req, res, next) => {
    const name = req.query.name
    
    if (name != undefined) {
        controller.name(req, res)
    } else {
        controller.fullData(req, res)
    }
}

module.exports = continentQuery