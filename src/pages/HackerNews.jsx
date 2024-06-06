import React, { useEffect, useState } from 'react';
import { Box, Container, Heading, Link, Spinner, Text, VStack, HStack } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const HackerNews = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        const storyIds = await response.json();
        const topStoryIds = storyIds.slice(0, 10); // Fetch top 10 stories for simplicity

        const storyPromises = topStoryIds.map(async (id) => {
          const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          return storyResponse.json();
        });

        const stories = await Promise.all(storyPromises);
        setStories(stories);
      } catch (error) {
        console.error('Error fetching top stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopStories();
  }, []);

  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h1" mb={8}>Hacker News</Heading>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <VStack spacing={8} align="stretch">
          {stories.map((story) => (
            <Box key={story.id} p={4} borderWidth="1px" borderRadius="md">
              <Link href={story.url} isExternal fontSize="xl" fontWeight="bold">
                {story.title} <ExternalLinkIcon mx="2px" />
              </Link>
              <HStack justifyContent="space-between" mt={2}>
                <Text>by {story.by}</Text>
                <Text>{story.score} points</Text>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}
    </Container>
  );
};

export default HackerNews;