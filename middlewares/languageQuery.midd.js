const controller = require('../controllers').languagesController;
const data = require('../data')

const languageQuery = (req, res, next) => {
    const name = req.query.name
    const native = req.query.native
    const rtl = req.query.rtl

    if (rtl != undefined) {
        req = controller.filterByRtl(req)
    }

    if (native != undefined) {
        controller.nativeName(req, res)
    } else if (name != undefined) {
        controller.name(req, res)
    } else {
        controller.fullData(req, res)
    }
}

module.exports = languageQuery