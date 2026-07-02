import CityEditor from "../CityEditor";
import connectDB from "@/lib/mongodb";
import City from "@/models/City";
export const metadata = { title: "Edit City Page | Admin" };
export default async function EditCityPage({ params }) {
  const { id } = await params;
  await connectDB();
  let city = null;
  try { city = await City.findById(id).lean(); } catch { city = null; }
  if (!city) return <div style={{ padding: "40px", fontFamily: "'Inter',sans-serif" }}><h1 style={{ color: "#DC2626" }}>City not found.</h1></div>;
  const serialized = {
    ...city,
    _id:         city._id.toString(),
    nearbyAreas: (city.nearbyAreas || []).join(", "),
    faqs:        city.faqs || [],
    services:    city.services || [],
    createdAt:   city.createdAt?.toString(),
    updatedAt:   city.updatedAt?.toString(),
  };
  return <CityEditor existingCity={serialized} />;
}