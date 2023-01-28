import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { ListRecipientNotifications } from './list-recipient-notifications';

describe('List recipient notifications', () => {
  it('should be able to list recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const listRecipientNotifications = new ListRecipientNotifications(
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

    const { notifications } = await listRecipientNotifications.execute({
      recipientId: '52f94fc0-bf5e-486d-b8d0-4403713be95b',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: recipientId1 }),
        expect.objectContaining({ recipientId: recipientId1 }),
      ]),
    );
  });
});
