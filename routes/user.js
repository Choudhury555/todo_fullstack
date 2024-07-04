import express from "express";
import { deleteUser, getAllUsers, getUserDetails, newUser, specialFunc, updateUser } from "../controllers/user.js";

const router = express.Router();

router.get("/all",getAllUsers);

router.post("/new",newUser);

router.get("/userid/special",specialFunc);

//dynamic routing
// router.get("/userid/:id",getUserDetails);
// router.put("/userid/:id",updateUser);
// router.delete("/userid/:id",deleteUser);

//either write above 3 lines or write this 1 line(both ae exaclty same)
//just use this syntax when there is some common route
router.route("/userid/:id").get(getUserDetails).put(updateUser).delete(deleteUser);


export default router;