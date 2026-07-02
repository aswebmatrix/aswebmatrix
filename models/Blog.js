import mongoose from "mongoose";

const FAQSchema = new mongoose.Schema({
  question: { type: String },
  answer:   { type: String },
});

const BlogSchema = new mongoose.Schema(
  {
    title:           { type: String, required: true },
    slug:            { type: String, required: true, unique: true },
    excerpt:         { type: String, default: "" },
    content:         { type: String, default: "" },
    coverImage:      { type: String, default: "" },
    category:        { type: String, default: "General" },
    tags:            [String],
    author:          { type: String, default: "A.S Web Matrix" },
    status:          { type: String, default: "draft" },
    metaTitle:       { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    metaKeywords:    { type: String, default: "" },
    canonicalUrl:    { type: String, default: "" },
    geoTargetCity:   { type: String, default: "" },
    geoTargetRegion: { type: String, default: "" },
    aeoSummary:      { type: String, default: "" },
    faqs:            [FAQSchema],
    ogTitle:         { type: String, default: "" },
    ogDescription:   { type: String, default: "" },
    ogImage:         { type: String, default: "" },
    readingTime:     { type: Number, default: 1 },
    views:           { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);