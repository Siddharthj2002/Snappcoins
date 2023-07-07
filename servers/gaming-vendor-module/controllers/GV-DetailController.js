import { GamingVendorDetailsModel } from "../models/GV-DetailModel.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

// Get account settings for a vendor
async function getAccountSettings(req, res, next) {
  try {
    const { vendor_id } = req.params;

    // Find the vendor by vendor_id
    const vendor = await GamingVendorDetailsModel.findOne({ vendor_id });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const { reminders, promote, profile_temp_disable, newsletter } =
      vendor.vendor_account_settings;

    res.status(200).json({
      success: true,
      reminders,
      promote,
      profile_temp_disable,
      newsletter,
    });
  } catch (error) {
    next(error);
  }
}

// Set account settings for a vendor
async function setAccountSettings(req, res, next) {
  try {
    const { vendor_id, reminders, promote, profile_temp_disable, newsletter } =
      req.body;

    // Find the vendor by vendor_id
    const vendor = await GamingVendorDetailsModel.findOne({ vendor_id });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Update the vendor's account settings
    vendor.vendor_account_settings.reminders = reminders;
    vendor.vendor_account_settings.promote = promote;
    vendor.vendor_account_settings.profile_temp_disable = profile_temp_disable;
    vendor.vendor_account_settings.newsletter = newsletter;

    // Save the updated vendor document
    await vendor.save();

    res.status(200).json({
      success: true,
      message: "Account settings updated successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

// Change password for a vendor
async function changePassword(req, res, next) {
  try {
    const { vendor_id, new_password } = req.body;

    // Handle validation errors
    const errors = validationResult(req);

    // Check if there are validation errors
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }

    // Generate salt for password hashing
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password
    const hashedPassword = await bcrypt.hash(new_password, salt);

    // Find the vendor by vendor_id
    const vendor = await GamingVendorDetailsModel.findOne({ vendor_id });

    // Update the vendor's password
    vendor.vendor_password = hashedPassword;
    await vendor.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    next(error);
  }
}

export { getAccountSettings, setAccountSettings, changePassword };
