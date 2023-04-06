import { Button, Flex, Text } from "@chakra-ui/react";

function Paginator(props) {
  const { page, onNext, onPrev } = props;

  return (
    <Flex justifyContent="space-evenly" width="100%">
      <Button disabled={page === 1} onClick={onPrev}>
        Previous Page
      </Button>
      <Text>{page}</Text>
      <Button onClick={onNext}>Next Page</Button>
    </Flex>
  );
}

Paginator.defaultProps = {
  page: 1,
  onNext: () => {},
  onPrev: () => {},
};

export default Paginator;
