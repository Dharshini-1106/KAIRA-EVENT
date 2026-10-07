import express from "express";
import mongoose from "mongoose";

const app = express();
const ages = ["Under 18", "18–35", "36–50", "50+"];

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  phone: { type: String, required: true, trim: true, maxlength: 30 },
  age: { type: String, required: true, enum: ages },
  eventId: { type: Number, default: null },
  eventTitle: { type: String, required: true, trim: true, maxlength: 200 },
}, { timestamps: true, versionKey: false });

const Registration = mongoose.model("Registration", registrationSchema);

app.disable("x-powered-by");
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (_request, response) => {
  response.json({ status: mongoose.connection.readyState === 1 ? "ok" : "database_unavailable" });
});

app.post("/api/registrations", async (request, response, next) => {
  const { name, email, phone, age, eventId = null, eventTitle = "EventHub" } = request.body || {};
  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    typeof phone !== "string" || !/^[+()\d.\s-]{7,30}$/.test(phone.trim()) ||
    !ages.includes(age) ||
    (eventId !== null && !Number.isInteger(eventId)) ||
    typeof eventTitle !== "string" || !eventTitle.trim()
  ) {
    return response.status(400).json({ error: "Please provide a valid name, email, phone number, age group, and event." });
  }

  try {
    const registration = await Registration.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      age,
      eventId,
      eventTitle: eventTitle.trim(),
    });
    return response.status(201).json({ id: registration.id, message: "Registration saved." });
  } catch (error) {
    return next(error);
  }
});

app.use((error, _request, response, _next) => {
  if (error.type === "entity.parse.failed") {
    return response.status(400).json({ error: "Request body must be valid JSON." });
  }
  console.error("API request failed:", error);
  return response.status(500).json({ error: "Registration could not be saved. Please try again." });
});

async function start() {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("Set MONGODB_URI to your MongoDB connection string before starting the API.");
  }

  await mongoose.connect(mongoUri);
  const port = Number(process.env.API_PORT || 3001);
  app.listen(port, "127.0.0.1", () => {
    console.log(`EventHub API listening at http://127.0.0.1:${port}`);
  });
}

start().catch((error) => {
  console.error("Could not start EventHub API:", error.message);
  process.exit(1);
});
