import { kafkaService, TOPICS, TopicType } from './kafkaService';

export class RealTimeManager {
  private appName: string;
  private consumer: any;

  constructor(appName: string) {
    this.appName = appName;
    this.consumer = kafkaService.createConsumer(appName);
  }

  async initialize(): Promise<void> {
    try {
      await kafkaService.connect();
      await this.consumer.connect();
      await this.consumer.subscribe({ 
        topics: Object.values(TOPICS),
        fromBeginning: false 
      });
      
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          try {
            const data = JSON.parse(message.value?.toString() || '{}');
            console.log(`📥 [${this.appName}] Received message from topic ${topic}:`, data.type || 'unknown');
            await this.handleKafkaMessage(topic, data);
          } catch (error) {
            console.error(`❌ [${this.appName}] Error processing message:`, error);
          }
        },
      });
      
      console.log(`✅ Real-time manager initialized for ${this.appName}`);
    } catch (error) {
      console.error(`❌ Failed to initialize real-time manager for ${this.appName}:`, error);
      throw error;
    }
  }

  private async handleKafkaMessage(topic: string, message: any): Promise<void> {
    try {
      const enrichedMessage = {
        ...message,
        receivedBy: this.appName,
        receivedAt: new Date().toISOString()
      };

      switch (topic) {
        case TOPICS.FEEDBACK:
          console.log(`[${this.appName}] Processing feedback:`, enrichedMessage);
          break;
        case TOPICS.AI_INSIGHTS:
          console.log(`[${this.appName}] Processing AI insights:`, enrichedMessage);
          break;
        case TOPICS.RECORDINGS:
          console.log(`[${this.appName}] Processing recording update:`, enrichedMessage);
          break;
        case TOPICS.NOTIFICATIONS:
          console.log(`[${this.appName}] Processing notification:`, enrichedMessage);
          break;
        case TOPICS.USER_ACTIVITY:
          console.log(`[${this.appName}] Processing user activity:`, enrichedMessage);
          break;
        default:
          console.log(`[${this.appName}] Unknown topic: ${topic}`);
      }
      
    } catch (error) {
      console.error(`[${this.appName}] Error handling Kafka message:`, error);
    }
  }

  async sendMessage(topic: TopicType, message: any): Promise<void> {
    try {
      await kafkaService.sendMessage(topic, {
        ...message,
        sentBy: this.appName,
        sentAt: new Date().toISOString()
      });
      console.log(`[${this.appName}] Message sent to topic ${topic}`);
    } catch (error) {
      console.error(`[${this.appName}] Error sending message:`, error);
      throw error;
    }
  }

  async shutdown(): Promise<void> {
    try {
      await this.consumer.disconnect();
      await kafkaService.disconnect();
      console.log(`✅ Real-time manager shut down for ${this.appName}`);
    } catch (error) {
      console.error(`❌ Error shutting down real-time manager for ${this.appName}:`, error);
    }
  }
}
