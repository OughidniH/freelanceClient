import { Router } from "express";
// import auth from "../middleware/auth.js";
import {
  postFreelance,
  getFreelances,
  getOneFreelance,
  deleteFreelance,
  updateFreelance,
} from "../controllers/freelance.js";

// test Router
// freelanceRouter.get("/", (req, res) => {
//   res.send("Hello freelence");
// });
const freelanceRouter = Router();

//   add freelance
// http://localhost:5000/freelance

freelanceRouter.post("/postFreelance", postFreelance);

//  get all freelances
// http://localhost:5000/freelances

freelanceRouter.get("/", getFreelances);

//  get One freelance
// http://localhost:5000/freelances/:id
freelanceRouter.get("/getFreelance/:id", getOneFreelance);

//  delete One freelance
// http://localhost:5000/freelance/:id

freelanceRouter.delete("/deleteFreelance/:id", deleteFreelance);

//  update One freelance
// http://localhost:5000/freelance/:id

freelanceRouter.patch("/updateFreelance/:id", updateFreelance);

export default freelanceRouter;
