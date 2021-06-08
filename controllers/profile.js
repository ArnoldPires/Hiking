const trail = require('../models/trail')
module.exports = {
    getIndex: async (req, res) => {
        try {
            const UsersHike = await trail.find({user: req.user._id})
            res.render('profile.ejs', {trails: UsersHike, user: req.user})
        }catch(err) {
            console.error(err)
        }
    },
}