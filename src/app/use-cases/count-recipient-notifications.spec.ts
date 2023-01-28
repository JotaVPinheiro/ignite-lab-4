import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    const recipientId1 = '52f94fc0-bf5e-486d-b8d0-4403713be95b';
    const recipientId2 = 'efebd05b-ae92-4b76-b520-5d73be0900f2';

    await notificationsRepository.create(
      makeNotification({ recipientId: recipientId1 }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: recipientId1 }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: recipientId2 }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: '52f94fc0-bf5e-486d-b8d0-4403713be95b',
    });

    expect(count).toEqual(2);
  });
});
