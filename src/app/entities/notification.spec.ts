import { Content } from './content';
import { Notification } from './notification';

describe('Notification content', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      category: 'social',
      content: new Content('Você tem uma nova solicitação de amizade.'),
      createdAt: new Date(),
      recipientId: '52f94fc0-bf5e-486d-b8d0-4403713be95b',
    });

    expect(notification).toBeTruthy();
  });
});
