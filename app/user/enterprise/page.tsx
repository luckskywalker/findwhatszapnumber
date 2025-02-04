import {Form, Nav, Button, Card} from "@/components";
import {getDatabase} from "@/database";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/authOptions";
import {IEnterprise} from "@/typescript/enterprise";

async function page() {
  const {Enterprise, User} = await getDatabase();
  const session = await getServerSession(authOptions);
  const foundUser = await User.findOne({email: session?.user?.email});

  let userEnterprise: IEnterprise | null = null;
  if (foundUser) {
    userEnterprise = await Enterprise.findOne({user: foundUser._id});
  }

  const dafaultValues = {
    label: userEnterprise?.label, 
    description: userEnterprise?.description,
    phoneNumber: userEnterprise?.phoneNumber, 
    category: userEnterprise?.category, 
    address: userEnterprise?.address, 
  };

  return (
    <section className="m-4">
      <h2 className="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">My Enterprise</h2>
      <Form.Enterprise defaultValues={dafaultValues}/>
      <div className="flex flex-wrap mt-12 gap-3 justify-center">
        {
          userEnterprise ? <Card.Enterprise enterprise={userEnterprise} /> : null
        }
      </div>
    </section>
  );
}

export default page;
