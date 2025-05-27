import React from 'react';
import { Card, Container, Title, Text, List, Anchor } from '@mantine/core';

function About() {
  return (
    <Container size="md" py="xl" style={{ color: '#fff' }}>
      <Card shadow="sm" padding="lg" radius="md" style={{ backgroundColor: '#1c1c1e', color: '#f1f1f1' }}>
        <Title order={1} mb="md" style={{ color: '#7e57c2' }}>
          About Cinema Time
        </Title>
        <Text mb="lg" style={{ color: '#e0e0e0' }}>
          Welcome to <strong>Cinema Time</strong>, your ultimate companion for organizing unforgettable movie nights with friends and family. We’re here to make sure your cinema evenings are easy, fun, and memorable.
        </Text>

        <Title order={2} mb="sm" style={{ color: '#7e57c2' }}>Our Mission</Title>
        <Text mb="lg" style={{ color: '#e0e0e0' }}>
          We aim to bring people together through the magic of cinema. Whether you love thrilling action, heartwarming comedies, or inspiring documentaries, <strong>Cinema Time</strong> helps craft events everyone will enjoy.
        </Text>

        <Title order={2} mb="sm" style={{ color: '#7e57c2' }}>Features</Title>
        <List spacing="sm" mb="lg" styles={{ item: { color: '#d0d0d0' } }}>
          <List.Item><strong>Create Events:</strong> Customize date, time, and location for your movie nights.</List.Item>
          <List.Item><strong>Invite Friends:</strong> Send invites and get everyone on board easily.</List.Item>
          <List.Item><strong>Movie Recommendations:</strong> Receive curated suggestions based on your tastes.</List.Item>
          <List.Item><strong>Manage RSVP:</strong> Track who’s coming and organize your guest list smoothly.</List.Item>
        </List>

        <Title order={2} mb="sm" style={{ color: '#7e57c2' }}>Get In Touch</Title>
        <Text mb="lg" style={{ color: '#e0e0e0' }}>
          We love hearing from you! For feedback, questions, or suggestions, email us at <Anchor href="mailto:support@mcinema-time.com" style={{ color: '#90caf9' }}>support@cinema-time.com</Anchor>.
        </Text>

        <Title order={2} mb="sm" style={{ color: '#7e57c2' }}>Join Our Community</Title>
        <List spacing="sm" styles={{ item: { color: '#d0d0d0' } }}>
          <List.Item>Twitter: <Anchor href="https://twitter.com/cinema-time" target="_blank" style={{ color: '#90caf9' }}>@cinema-time</Anchor></List.Item>
          <List.Item>Facebook: <Anchor href="https://facebook.com/cinema-time" target="_blank" style={{ color: '#90caf9' }}>Cinema Time</Anchor></List.Item>
          <List.Item>Instagram: <Anchor href="https://instagram.com/cinema-time" target="_blank" style={{ color: '#90caf9' }}>@cinema-time</Anchor></List.Item>
        </List>
      </Card>
    </Container>
  );
}

export default About;