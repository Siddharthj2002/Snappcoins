import express from "express";
import { check, body } from "express-validator";
import {
  getAccountSettings,
  setAccountSettings,
  changePassword,
} from "../controllers/GV-DetailController.js";

const router = express.Router();

// Get account settings for a vendor
router.get("/get-account-settings/:vendor_id", getAccountSettings);

// Set account settings for a vendor
router.post("/set-account-settings", setAccountSettings);

// Change password for a vendor
router.post(
  "/change-password",
  [
    check("new_password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters long")
      .matches(/^(?=.*[a-z])/)
      .withMessage("Password should contain at least one lowercase letter")
      .matches(/^(?=.*[A-Z])/)
      .withMessage("Password should contain at least one uppercase letter")
      .matches(/^(?=.*\d)/)
      .withMessage("Password should contain at least one digit")
      .matches(/^(?=.*[@$!%*?&])/)
      .withMessage(
        "Password should contain at least one special character (@,$,!,%,*,?,&)"
      ),
    body("new_password_confirmation")
      .notEmpty()
      .withMessage("Passwords do not match")
      .custom((value, { req }) => {
        if (value !== req.body.new_password) {
          throw new Error("Password confirmation does not match");
        }
        return true;
      }),
  ],
  changePassword
);

export default router;
