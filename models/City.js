// models/City.js
import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  icon:     { type: String, default: "fa-magnifying-glass" },
  title:    { type: String, required: true },
  shortDesc:{ type: String, default: "" },
  longDesc: { type: String, default: "" },
  benefits: [{ type: String }],
  results:  { type: String, default: "" },
});

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer:   { type: String, required: true },
});

const CitySchema = new mongoose.Schema(
  {
    // Basic Info
    name:        { type: String, required: true },
    slug:        { type: String, required: true, unique: true, lowercase: true },
    region:      { type: String, default: "" },
    country:     { type: String, default: "India" },
    countryCode: { type: String, default: "IN" },
    population:  { type: String, default: "" },
    businesses:  { type: String, default: "" },
    nearbyAreas: [{ type: String }],
    marketDesc:  { type: String, default: "" },
    localKeyword:{ type: String, default: "" },
    status:      { type: String, enum: ["active", "inactive"], default: "active" },

    // SEO
    metaTitle:       { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    metaKeywords:    { type: String, default: "" },

    // GEO / AEO
    geoLat:      { type: Number, default: 0 },
    geoLng:      { type: Number, default: 0 },
    aeoSummary:  { type: String, default: "" },

    // Content
    heroHeading:    { type: String, default: "" },
    heroDesc:       { type: String, default: "" },
    introContent:   { type: String, default: "" },

    // Services & FAQs
    services: [ServiceSchema],
    faqs:     [FAQSchema],

    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.City || mongoose.model("City", CitySchema);