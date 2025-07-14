import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import userRouts from "./src/routes/userRouts";
import authRouts from "./src/routes/authRouts";
import interviewMaterialsHub from "./src/routes/interview-materials-sub";
import workExperienceRoutes from "./src/routes/workExperienceRoutes";
import projectsRoutes from "./src/routes/projectsRoutes";
import profileRoutes from "./src/routes/profileRouts";
import answerRoutes from "./src/routes/answerRouts";
import aiInsightRoutes from "./src/routes/aIInsightRouts";

dotenv.config();

const allowedOrigins = (process.env.CORS_ORIGIN?.split(",") ?? [
  "http://localhost:3000",
  "http://localhost:5000",
]);
console.log("Allowed CORS origins:", allowedOrigins);

const normalize = (url: string) => url.replace(/\/+$/, ""); // מסיר / מיותר בסוף

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    console.log("Raw origin:", origin);
    if (!origin) return callback(null, true);

    const cleanOrigin = normalize(origin);
    const cleanAllowed = allowedOrigins.map(normalize);

    console.log("Clean origin:", cleanOrigin);
    console.log("Allowed origins:", cleanAllowed);

    if (
      cleanOrigin.startsWith("chrome-extension://") ||
      cleanAllowed.includes(cleanOrigin)
    ) {
      return callback(null, true);
    }

    callback(new Error("CORS blocked: Origin not allowed: " + cleanOrigin));
  },
  credentials: true,
};

dotenv.config();

const app: Application = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

console.log("✅ i am here in app");

// Routes
app.use("/users", userRouts);
app.use("/auth", authRouts);
app.use("/questions", answerRoutes);
app.use("/aiInsight", aiInsightRoutes);
app.use("/interview-materials-hub", interviewMaterialsHub);
app.use("/manager/interview-materials", interviewMaterialsHub);
app.use("/work-experience", workExperienceRoutes);
app.use("/personal-projects", projectsRoutes);
app.use("/profiles", profileRoutes);

export default app;