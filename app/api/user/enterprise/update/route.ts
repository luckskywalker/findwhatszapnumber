import {getDatabase} from "@/database";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";

export const POST = async (request: Request, response: Response) => {
  const {Enterprise, User} = await getDatabase();

  try {

    const session = await getServerSession(authOptions);
    let foundUser = null;

    if (session?.user) {
      foundUser = await User.findOne({email: session.user.email});
    }

    const reqData = await request.formData();
    
    let fileBuffer;
    let contentType;
    
    if (reqData.get("image") instanceof File) {
      const file: File = reqData.get("image") as File;
      const arraybuff = await file.arrayBuffer();
      fileBuffer = Buffer.from(arraybuff);
      const kTypeSymbol = Object.getOwnPropertySymbols(file).find(symbol => symbol.toString() === "Symbol(kType)") as symbol;
      const kTypeKey = kTypeSymbol.toString();
      contentType = file[kTypeKey as keyof File];
    }
    
    if (foundUser) {
      await Enterprise.findOneAndUpdate({user: foundUser._id}, {
        label: reqData.get("label"),
        description: reqData.get("description"),
        phoneNumber: reqData.get("phoneNumber"),
        address: reqData.get("address"),
        category: reqData.get("category"),
        subCategory: reqData.get("subCategory"),
        image: {
          data: fileBuffer,
          contentType: contentType
        }
      }, {upsert: true});
      return new Response(JSON.stringify({}), {status: 201});
    } else {
      throw Error("Session not found");
    }


  } catch (error) {
    console.error(error);
    return new Response("Failed to update enterprise", {status: 500});
  }
};