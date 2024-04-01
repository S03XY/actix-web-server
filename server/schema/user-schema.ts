import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: Schema.Types.String,
    walletAddress: Schema.Types.String,
  },
  { timestamps: true }
);

export const User = models.user || model("user", UserSchema);
