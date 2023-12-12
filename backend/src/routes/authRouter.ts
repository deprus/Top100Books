import express from "express";
import {
  fetchUsers,
  signIn,
  signOut,
  signUp,
} from "../controllers/authController";
import authenticateToken from "../middleware/authenticateToken";

const router = express.Router();

router.get("/users", fetchUsers);
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.get("/protected", authenticateToken);

export default router;
