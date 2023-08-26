//NestJS Core
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

//RxJS
import { Observable, map } from 'rxjs';

//Services
import { ValidationsService } from 'src/common/services/validations-service/validations.service';

/**
 * Interceptor that removes the 'password' attribute from the response
 *
 * @author dgutierrez
 * @version 1.0
 * @since 23/08/2023
 */
@Injectable()
export class RemovePasswordInterceptor implements NestInterceptor {
  constructor(private readonly validationsService: ValidationsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          // If the response is an array, removes the 'password' attribute from each element
          return data.map((item) => this.removePassword(item));
        } else {
          // If the response is not an array, remove the 'password' attribute
          return this.removePassword(data);
        }
      }),
    );
  }

  /**
   * Method that removes the 'password' attribute from the data
   *
   * @param data is the data to be validated
   *
   * @returns returns the data without the 'password' attribute
   *
   * @author dgutierrez
   * @version 1.0
   * @since 23/08/2023
   */
  private removePassword(data: any): any {
    if (
      this.validationsService.isDefined(data) &&
      this.validationsService.isDefined(data.user)
    ) {
      delete data.user.password;
      return data;
    }
    return data;
  }
}
