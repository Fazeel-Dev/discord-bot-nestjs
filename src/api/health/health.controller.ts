import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { Public } from 'src/decorators/public.decorator';
import { HealthService } from './health.service';

@ApiTags('Health')
@Controller({path:'status', version: '1'})
export class HealthController {
    constructor(
        private readonly healthService: HealthService,
    ) {}
    
    @Get()
    @Public()
    @ApiOperation({ summary: 'Get health of the server' })
    @ApiResponse({ type: SuccessResponseDto, status: HttpStatus.OK })
    async statusCheck(): Promise<SuccessResponseDto> {
        return this.healthService.health();
    }
}