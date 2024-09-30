import {Schema, model, models, Model} from "mongoose";

import type {IEnterprise} from "@/typescript/enterprise";

interface EnterpriseModel extends Model<IEnterprise> {
}

const EnterpriseSchema = new Schema<IEnterprise, EnterpriseModel>({
  label: {
    type: String,
    required: [true, "Label is required!"],
  },
  description: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: Object,
  },
  category: {
    type: String
  },
  subCategory: {
    type: String
  },
  image: {
    data: Buffer,
    contentType: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: [true, "user is required!"]
  }

});

const Enterprise: EnterpriseModel = models?.Enterprise as EnterpriseModel || model<IEnterprise, EnterpriseModel>("Enterprise", EnterpriseSchema);

export default Enterprise;