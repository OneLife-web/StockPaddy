import mongoose, { Schema } from "mongoose";

const permissionSchema = new Schema({
  module: { type: String, required: true }, // e.g., 'Inventory', 'Expense'
  can_create: { type: Boolean, default: false },
  can_edit: { type: Boolean, default: false },
  can_delete: { type: Boolean, default: false },
  can_view: { type: Boolean, default: false },
});

const roleSchema = new Schema({
  role_name: { type: String, required: true, unique: true },
  permissions: [permissionSchema], // Array of permissions for various modules
});

const Role = mongoose.models.Role || mongoose.model("Role", roleSchema);
export default Role;
