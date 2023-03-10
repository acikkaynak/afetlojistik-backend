import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { SNS, Credentials, config } from 'aws-sdk';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class AWSSNSService {
  constructor(
    private readonly logger: PinoLogger,
    private configService: ConfigService
  ) {
    const credentials = new Credentials({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    });
    config.credentials = credentials;
    // Set the region
    config.update({ region: this.configService.get('aws.region') });
  }

  async sendSMS(phone: string, body: string): Promise<boolean> {
    if (this.configService.get<boolean>('debug.bypassSms')) {
      return true;
    }
    // Create publish parameters
    const params = {
      Message: JSON.stringify(body) /* required */,
      PhoneNumber: phone,
    };

    // Create the promise and SES service object
    const sns = new SNS({ apiVersion: '2010-03-31' });
    const publishResult = await sns.publish(params).promise();
    if (publishResult.$response.error === null) {
      return true;
    }
    this.logger.error(
      `[AWSSNSService] sendSMS: ${publishResult.$response.error}`
    );
    return false;
  }
}
