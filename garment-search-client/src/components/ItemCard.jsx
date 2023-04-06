import { Card, CardBody, Image, Text, Stack } from "@chakra-ui/react";

function ItemCard(props) {
  const { imgUrl, title } = props;

  return (
    <Card>
      <CardBody>
        <Image src={imgUrl} />
        <Stack mt="4" spacing="1">
          <Text size="md">{title}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

ItemCard.defaultProps = {
  imgUrl: "",
  title: "",
};

export default ItemCard;
