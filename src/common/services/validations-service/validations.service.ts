//NestJS Core
import { Injectable } from '@nestjs/common';

/**
 * Service that contains methods to validate data
 *
 * @author dgutierrez
 * @version 1.0
 * @since 23/08/2023
 */
@Injectable()
export class ValidationsService {
  /**
   * Method that verifies that a datum('data') is not undefined or empty
   *
   * @param input is the data to validate
   * @returns True is defined, false is null or undefined
   *
   * @author dgutierrez
   * @version 1.0
   * @since 23/08/2023
   */
  isDefined(input: any): boolean {
    return input !== undefined && input != null;
  }

  /**
   * Method that verifies that a string is not blank
   *
   * @param input is the data to be validated
   *
   * @returns returns a boolean value
   *
   * @author dgutierrez
   * @version 1.0
   * @since 23/08/2023
   */
  strHasValue(input: string): boolean {
    return this.isDefined(input) && input.trim() != '';
  }

  /**
   * Method that verifies that a piece of data contains only letters and numbers.
   *
   * @param input is the data to be validated
   *
   * @returns returns a boolean value
   *
   * @author dgutierrez
   * @version 1.0
   * @since 23/08/2023
   */
  strIsAlphaNumeric(input: string): boolean {
    if (this.strHasValue(input)) {
      // Se hace este parse porque en algunos casos no lo reconoce como tal
      input = input.toString();
      const match: RegExpMatchArray | null = input.match('^[a-zA-Z0-9]*$');
      if (this.isDefined(match) && this.isDefined(match?.input)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Method that verifies that a datum contains only numbers
   *
   * @param input is the data to be validated
   *
   * @returns returns a boolean value
   *
   * @author dgutierrez
   * @version 1.0
   * @since 23/08/2023
   */
  strValidateNumeric(input: string): boolean {
    if (this.strHasValue(input)) {
      // Se hace este parse porque en algunos casos no lo reconoce como tal
      input = input.toString();
      if (input.match('^[0-9]*$')) {
        return true;
      }
    }
    return false;
  }

  /**
   * Validates if a number is positive
   *
   * @param input Number to validate
   *
   * @returns true if positive, false negative
   *
   * @author dgutierrez
   * @version 1.0
   * @since 23/08/2023
   */
  isPositiveNumber(input: number): boolean {
    if (this.isDefined(input)) {
      return input > 0;
    }
    return false;
  }
}
