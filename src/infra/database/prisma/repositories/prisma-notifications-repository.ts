import { Notification } from '@app/entities/notification';
import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}
  async findById(notificationId: string): Promise<Notification | null> {
    const prismaNotification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!prismaNotification) return null;

    const notification = PrismaNotificationMapper.toDomain(prismaNotification);

    return notification;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const prismaNotifications = await this.prisma.notification.findMany({
      where: { recipientId },
    });

    const notifications = prismaNotifications.map(
      PrismaNotificationMapper.toDomain,
    );

    return notifications;
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: { recipientId },
    });

    return count;
  }

  async create(notification: Notification): Promise<void> {
    const prismaNotificationData =
      PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.create({
      data: prismaNotificationData,
    });
  }

  async save(notification: Notification): Promise<void> {
    const prismaNotification = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.update({
      where: { id: prismaNotification.id },
      data: prismaNotification,
    });
  }
}
