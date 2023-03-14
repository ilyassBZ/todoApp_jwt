import express from "express";
const router = express.Router();

import {
  CreateTodo,
  GetUsersTodo,
  DeleteTodo,
  UpdateTodo,
} from "../controllers/todoController.js";
router.route("/").post(CreateTodo).get(GetUsersTodo).patch(UpdateTodo);
router.route("/:id").delete(DeleteTodo);

export default router;
