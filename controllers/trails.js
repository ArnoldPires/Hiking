const Trail = require("../models/Trail");
const User = require("../models/User");
const cloudinary = require("../middleware/cloudinary");

module.exports = {
  getAllTrails: async (req, res) => {
    try {
      const TrailAllItems = await Trail.find();
      res.render("index.ejs", {
        trails: TrailAllItems,
        user: req.user
      });
    } catch (err) {
      console.error(err);
    }
  },

  getTrails: async (req, res) => {
    try {
      const TrailItems = await Trail.find({ user: req.user._id });
      res.render("profile.ejs", {
        trails: TrailItems,
        user: req.user
      });
    } catch (err) {
      console.error(err);
    }
  },

  createTrail: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const trail = await Trail.create({
        name: req.body.name,
        cloudinaryId: result.public_id,
        picture: result.secure_url,
        difficultly: req.body.difficultly,
        length: req.body.length,
        routeType: req.body.routeType,
        description: req.body.description,
        suitability: req.body.suitability,
        attractions: req.body.attractions,
        user: req.user,
      });
      res.redirect(`/trails/${trail._id}`);
    } catch (err) {
      console.error(err);
    }
  },

  getTrailById: async (req, res) => {
    const { id } = req.params;
    try {
      const trail = await Trail.findById(id).populate("user");
      res.render("trail.ejs", {
        trail: trail,
        user: req.user
      });
    } catch (e) {
      console.error(e);
    }
  },

  getUpdate: async (req, res) => {
    const { id } = req.params;
    try {
      const trail = await Trail.findById(id).populate("user");
      res.render("update.ejs", { trail, user: req.user });
    } catch (e) {
      console.error(e);
    }
  },

  putTrail: async (req, res) => {
    try {
      const trail = await Trail.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );
      res.redirect(`/trails/${trail._id}`);
    } catch (err) {
      console.error(err);
    }
  },

  deleteTrail: async (req, res) => {
    try {
      const trail = await Trail.findById({ _id: req.params.id });
      await cloudinary.uploader.destroy(trail.cloudinaryId);
      await Trail.remove({ _id: req.params.id });
      res.redirect("/profile");
    } catch (err) {
      console.error(err);
      res.redirect("/profile");
    }
  },
};