import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true
    },

    amount: {
      type: Number,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "card", "upi", "bank"],
      default: "upi"
    },

    tags: [String],

    date: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

transactionSchema.index({ userId: 1, date: -1 });

export const Transaction = mongoose.model(
  "Transaction",
  transactionSchema
);
