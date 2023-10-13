import { Container, Grid, Header } from "semantic-ui-react";
import styled from "styled-components";

const BlockContent = () => {
  return (
    <Grid stackable centered>
      <Container text>
        <Header as="h3" style={{ marginBottom: 0 }}>
          Drag or drop file
        </Header>
        <Text>
          Drag or drop your new profile picture{" "}
          <UnderlinedText>here</UnderlinedText>.
        </Text>
      </Container>
    </Grid>
  );
};

const Text = styled.div`
  margin: 0;
  line-height: 1.5714285714285714;
  font-size: 14px;
  font-weight: 400;
  color: #637381;
`;

const UnderlinedText = styled.p`
  display: inline-block;
  color: #2065d1;
  text-decoration: underline;
`;

export default BlockContent;
