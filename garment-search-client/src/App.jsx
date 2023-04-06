import {
  Flex,
  Heading,
  VStack,
  Divider,
  Alert,
  Spinner,
} from "@chakra-ui/react";

import { useRef, useState } from "react";

import ItemResults from "./components/ItemResults";
import SearchForm from "./components/SearchForm";
import Paginator from "./components/Paginator";

function App() {
  const [items, setItems] = useState(null);
  const [page, setPage] = useState(1);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const lastQuery = useRef(null);

  function handleNextPage() {
    if (lastQuery.current === null) return;
    if (items !== null && items.length === 0) return;
    fetchItems(lastQuery.current, page + 1);
  }

  function handlePrevPage() {
    if (lastQuery.current === null) return;
    if (page === 1) return;
    fetchItems(lastQuery.current, page - 1);
  }

  async function fetchItems(query, page = 1) {
    setItems(null);
    setAlert(null);
    setPage(page);
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/garments/search/${query}?page=${page}`
      );

      if (!response.ok) {
        console.log(response);
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      const json = await response.json();
      setItems(json);
      lastQuery.current = query;
    } catch (error) {
      setAlert(error.message);
    }
    setLoading(false);
  }

  return (
    <Flex justifyContent="center" marginY="7%" paddingX="20%">
      <VStack spacing="10">
        <Heading
          as="h1"
          size="3xl"
          onClick={() => {
            window.location.reload();
          }}
        >
          Garment Search
        </Heading>

        <SearchForm
          placeholder="Type here to search for garments.."
          onSubmit={fetchItems}
        />

        {items !== null && <Divider />}

        {loading && (
          <Spinner
            thickness="4px"
            emptyColor="gray.200"
            color="gray.500"
            size="xl"
          />
        )}

        {items !== null && <ItemResults items={items} />}

        {alert !== null && <Alert status="error">Error: {alert}</Alert>}

        {items !== null && (
          <Paginator
            page={page}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
        )}
      </VStack>
    </Flex>
  );
}

export default App;
