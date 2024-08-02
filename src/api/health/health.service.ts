import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
    constructor() { }
    
    async health() {
        return {
            success: true,
            statusCode: HttpStatus.OK,
            message: 'Application is up and running...'
        };
    }
}
