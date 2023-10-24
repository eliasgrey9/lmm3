import express from "express";
// import UserRoutes from "./users";

const router = express.Router();


router.get("/", (req, res) => {
  res.send("All routes in here start with API");
});

//example
// router.use("/users", UserRoutes);



export default router;
