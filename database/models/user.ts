import {Schema, model, models, Model} from "mongoose";
import type {IUser} from "@/typescript/user";

interface UserModel extends Model<IUser> {
  createProfile(userProps: IUser): IUser;
}

const UserSchema = new Schema<IUser, UserModel>({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required!"],
  },
  name: {
    type: String,
    required: [true, "Username is required!"],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  }
}, {
  statics: {
    createProfile: async function (userProps: IUser) {
      const user = new models.User(userProps);
      const enterprise = new models.Enterprise({
        label: user.name,
        user: user._id
      });
      await user.save();
      await enterprise.save();
      return user; 
    }
  }

});


const User: UserModel = models?.User as UserModel || model<IUser, UserModel>("User", UserSchema);

export default User;