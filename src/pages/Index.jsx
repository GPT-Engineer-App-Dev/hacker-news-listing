import { Container, Text, VStack, Link, Heading } from "@chakra-ui/react";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1">Welcome to the News Aggregator</Heading>
        <Text fontSize="2xl">Your Blank Canvas</Text>
        <Text>Chat with the agent to start making edits.</Text>
        <Link href="/hacker-news" color="teal.500" fontSize="xl">Go to Hacker News</Link>
      </VStack>
    </Container>
  );
};

export default Index;