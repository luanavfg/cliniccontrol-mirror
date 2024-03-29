import {
  Prisma,
  Appointment as PrismaAppointmentDto,
  PaymentMethod as PrismaPaymentMethod,
} from '@prisma/client';

import { AppointmentEntity } from '../../../core/domains/appointment/entities/appointment/entity';
import { CreateSingleAppointmentDto } from '../../../core/domains/appointment/use-cases/create-single-appointment/create-single-appointment-dto';
import { UpdateAppointmentInfoDto } from '../../../core/domains/appointment/use-cases/update-appointment-info/update-appointment-info-dto';
import { PaymentMethod } from '../../../core/shared/interfaces/payments';

export class PostgresqlPrismaAppointmentMapper {
  static toDomain(raw: PrismaAppointmentDto): AppointmentEntity {
    return new AppointmentEntity({
      ...raw,
      paymentMethod: raw.paymentMethod as unknown as PaymentMethod,
    });
  }

  static toPrismaCreate(raw: CreateSingleAppointmentDto): Prisma.AppointmentCreateArgs {
    return {
      data: {
        ...raw,
        paymentMethod: raw.paymentMethod as unknown as PrismaPaymentMethod,
        date: new Date(raw.date),
      },
    };
  }

  static toPrismaUpdate(raw: UpdateAppointmentInfoDto): Prisma.AppointmentUpdateArgs {
    return {
      data: {
        ...raw,
        done: raw.done as boolean,
      },
      where: {
        id: raw.id,
      },
    };
  }
}
