// models/Consultation.js
import mongoose from "mongoose";

const ConsultationSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    phone:       { type: String, required: true, trim: true },
    email:       { type: String, required: true, trim: true, lowercase: true },
    service:     { type: String, required: true },
    projectType: { type: String, default: "" },
    budget:      { type: String, default: "" },
    message:     { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "contacted", "converted", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Consultation ||
  mongoose.model("Consultation", ConsultationSchema);