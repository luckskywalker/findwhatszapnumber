export default function Enterprise({params}: { params: { slug: string[] } }) {

  return <p>{JSON.stringify(params.slug)}</p>;
}