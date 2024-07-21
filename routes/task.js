import express from "express"
import { isAuthenticated } from "../middlewares/auth.js";
import { deleteTask, getMyTasks, newTask, updateTask } from "../controllers/task.js";

const router = express.Router();

router.post("/newtask",isAuthenticated,newTask);//only logged in(isAuthenticated) user can do the CRUD operations

router.get("/getmytask",isAuthenticated,getMyTasks);

router.put("/:id",isAuthenticated,updateTask);

router.delete("/:id",isAuthenticated,deleteTask);


export default router;