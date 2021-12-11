const { model, Schema } = require("mongoose");
const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const ServiceSchema = new mongoose.Schema({
  name: { type: String },
  image: { type: String },
  subtitle: { type: String },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  slug: { type: String },
});
ServiceSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = model("Service", ServiceSchema);
