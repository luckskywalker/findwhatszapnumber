import SelectCategory from "@/components/Select/Category";
import SelectAddress from "@/components/Select/Address";

type TSearchFormProps = {
}

const SearchForm: React.FC<TSearchFormProps> = ({}) => {

  return (
    <form action="/">
      <div className="mb-4">
        <input className="input input-bordered w-full"
          type="text"
          name="keywords"
          placeholder="keywords"
        />
      </div>
      <div className="mb-4">
        <SelectAddress name="address" className="w-full"/>
      </div>
      <div className="mb-4">
        <SelectCategory className="w-full"/>
      </div>
      <div className="mb-4">
        <button
          type="submit"
          className="btn btn-primary w-full"
        >
          Search
        </button>
      </div>
    </form >
  );
};




export default SearchForm;