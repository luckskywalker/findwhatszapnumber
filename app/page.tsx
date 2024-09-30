import {Nav, Card, Form} from "@/components";
import {getDatabase} from "@/database";
import {IEnterprise} from "@/typescript/enterprise";

export default async function page() {
  const {Enterprise} = await getDatabase();

  const enterprises = await Enterprise.find({});

  return (
    <div className="m-4">
      <Form.Search />
      <div className="flex flex-wrap mt-12 gap-3">
        {
          enterprises ? enterprises.map((enterprise: IEnterprise, key: number) => <Card.Enterprise enterprise={enterprise} key={key} />) : null
        }
      </div>
    </div>
  );
}
