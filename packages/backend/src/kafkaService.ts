const { Kafka } = require('kafkajs');
import dotenv from 'dotenv';

dotenv.config();

export const TOPICS = {
  FEEDBACK: 'feedback-updates',
  AI_INSIGHTS: 'ai-insights',
  RECORDINGS: 'recording-updates',
  NOTIFICATIONS: 'user-notifications',
  USER_ACTIVITY: 'user-activity',
  QUESTIONS: 'question-updates',
} as const;

export type TopicType = typeof TOPICS[keyof typeof TOPICS];


export const kafka = new Kafka({
  clientId: 'lingo-prep',
  brokers: ['localhost:9092'],
});


// פונקציה ליצירת ה-Producer
export const createProducer = async () => {
  const producer = kafka.producer();
  await producer.connect();
  return producer;
};

// פונקציה ליצירת ה-Consumer
export const createConsumer = async () => {
  const consumer = kafka.consumer({ groupId: 'lingo-prep' });
  await consumer.connect();
  await Promise.all(
    Object.values(TOPICS).map(topic => consumer.subscribe({ topic, fromBeginning: true }))
  );

  return consumer;
};

