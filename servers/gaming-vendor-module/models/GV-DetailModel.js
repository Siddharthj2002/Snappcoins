import mongoose, { Schema } from "mongoose";

// Define the Vendor schema
const GamingVendorDetailsSchema = new Schema(
  {
    vendor_id: {
      type: String,
      required: true,
    },
    vendor_name: {
      type: String,
      required: true,
    },
    vendor_email: {
      type: String,
      required: true,
    },
    vendor_password: {
      type: String,
      required: true,
    },
    vendor_website: {
      type: String,
      required: true,
    },
    vendor_account_settings: {
      reminders: {
        type: Boolean,
        default: true,
      },
      promote: {
        type: Boolean,
        default: false,
      },
      profile_temp_disable: {
        type: Boolean,
        default: false,
      },
      newsletter: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

// Create the Vendor model using the Vendor schema
const GamingVendorDetailsModel = mongoose.model(
  "gaming_vendor_details",
  GamingVendorDetailsSchema
);

// Export the Vendor model
export { GamingVendorDetailsModel };