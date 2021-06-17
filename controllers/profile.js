const Trail = require('../models/Trail')
module.exports = {
    getIndex: async (req, res) => {
        try {
            const UsersTrails = await Trail.find({user: req.user._id})
            res.render('profile.ejs', {trails: UsersTrails, user: req.user})
        }catch(err) {
            console.error(err)
        }
    },
}