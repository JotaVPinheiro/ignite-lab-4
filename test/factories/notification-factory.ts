import { Content } from '@app/entities/content';
import { Notification, NotificationProps } from '@app/entities/notification';

type MakeNotificationOverride = Partial<NotificationProps>;

export function makeNotification(override: MakeNotificationOverride = {}) {
  return new Notification({
    category: 'social',
    content: new Content('Você tem uma nova solicitação de amizade.'),
    recipientId: '52f94fc0-bf5e-486d-b8d0-4403713be95b',
    ...override,
  });
}
