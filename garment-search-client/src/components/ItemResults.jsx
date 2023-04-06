import { Alert, AlertIcon, SimpleGrid } from "@chakra-ui/react";
import ItemCard from "./ItemCard";

function ItemResults(props) {
  const { items } = props;

  if (items === null || items.length === 0) {
    return (
      <Alert status="info">
        <AlertIcon />
        There aren't any items.
      </Alert>
    );
  } else {
    return (
      <SimpleGrid columns={4} spacing="1em">
        {items.map((item) => (
          <ItemCard
            key={item.img_url}
            title={item.title}
            imgUrl={item.img_url}
          />
        ))}
      </SimpleGrid>
    );
  }
}

ItemResults.defaultProps = {
  items: [],
};

export default ItemResults;
