import cors from "cors";

export const corsOptions = {
  origin: "https://tiktok-save4all.vercel.app",
  credentials: true,
};

export default cors(corsOptions);
