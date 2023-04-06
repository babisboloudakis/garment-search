import { Input } from "@chakra-ui/react";
import { useState } from "react";

function SearchForm(props) {
  const { placeholder, onSubmit, width, size } = props;

  const [query, setQuery] = useState("");

  function handleChange(event) {
    setQuery(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(query);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Input
        size={size}
        width={width}
        placeholder={placeholder}
        onChange={handleChange}
        value={query}
      />
    </form>
  );
}

SearchForm.defaultProps = {
  placeholder: "Placeholder",
  onSubmit: () => {},
  width: "30em",
  size: "lg",
};

export default SearchForm;
