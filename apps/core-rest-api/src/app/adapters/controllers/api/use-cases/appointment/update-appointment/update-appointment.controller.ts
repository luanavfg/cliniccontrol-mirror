import { BadRequestException, Body, Controller, Param, Patch } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GlobalAppHttpException } from '../../../../../../shared/errors/globalAppHttpException';
import { UpdateAppointmentControllerBodyParamsInputDto, UpdateAppointmentControllerReqParamsInputDto } from "./input.dto";
import { NestjsUpdateAppointmentService } from "./nestjs-update-appointment.service";
import { UpdateAppointmentControllerOutputDto } from "./output.dto";


@ApiTags('Appointment')
@ApiBearerAuth()
@Controller({
  path: 'appointment',
})
export class UpdateAppointmentController {
  constructor(private updateAppointmentService: NestjsUpdateAppointmentService) {}

  @Patch(':id/update')
  async execute(
    @Param() { id }: UpdateAppointmentControllerReqParamsInputDto,
    @Body() updateAppointmentDto: UpdateAppointmentControllerBodyParamsInputDto)
    : Promise<UpdateAppointmentControllerOutputDto>{

    try {
      const isReqBodyEmpty = Object.keys(updateAppointmentDto).length === 0;

      if (isReqBodyEmpty) {
        throw new BadRequestException('Must provide at least one field to update');
      }

      await this.updateAppointmentService.execute({...updateAppointmentDto, id});

      return { message: 'Appointment updated successfully' };
    } catch (error) {
      throw new GlobalAppHttpException(error);
    }
  }
}
