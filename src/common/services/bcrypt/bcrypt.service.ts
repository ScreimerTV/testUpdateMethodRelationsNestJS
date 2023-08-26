import { BadRequestException, Injectable } from '@nestjs/common';
import { compare, hash, hashSync, compareSync } from 'bcrypt';
import { NumbersOfRoundsHashEnum } from 'src/common/enums/numbers-of-rounds-hash.enum';

/**
 * Service containing methods for encoding and comparing strings
 * with the Brycript library
 *
 * @author dgutierrez
 * @version 1.0
 * @since 23/08/2023
 */
@Injectable()
export class BcryptService {
  /**
   * Synchronous method that encodes a string, by default with 10 jumps.
   *
   * @param stringToHash string to be encoded
   * @param saltOrRounds number of jumps
   *
   * @returns coded string
   *
   * @author dgutierrez
   * @version 1.0
   * @since 23/08/2023
   */
  hashSync(
    stringToHash: string,
    saltOrRounds = NumbersOfRoundsHashEnum.LOW,
  ): string {
    try {
      return hashSync(stringToHash, saltOrRounds);
    } catch (error) {
      throw new BadRequestException('Error al codificar el string en Brycript');
    }
  }

  /**
   * Synchronous method that compares an unencoded string with an encoded string.
   *
   * @param stringSinCodificar uncoded string
   * @param stringCodificado coded string
   *
   * @returns true if the comparison is correct, false otherwise
   *
   * @author dgutierrez
   * @version 1.0
   * @since 23/08/2023
   */
  compareSync(stringSinCodificar: string, stringCodificado: string): boolean {
    if (!stringSinCodificar || !stringCodificado) {
      throw new BadRequestException(
        'Los datos no pueden ser nulos para la comparación en Brycript',
      );
    }

    return compareSync(stringSinCodificar, stringCodificado);
  }

  /**
   * Asynchronous method encoding a string
   *
   * @param stringToHash string to be encoded
   *
   * @returns coded string
   *
   * @author dgutierrez
   * @version 1.0
   * @since 23/08/2023
   */
  async hash(stringToHash: string): Promise<string> {
    try {
      return await hash(stringToHash, NumbersOfRoundsHashEnum.LOW);
    } catch (error) {
      throw new BadRequestException('Error al codificar el string en Brycript');
    }
  }

  /**
   * Asynchronous method that compares an unencoded string with an encoded string
   *
   * @param stringSinCodificar uncoded string
   * @param stringCodificado coded string
   *
   * @returns true if the comparison is correct, false otherwise
   *
   * @author dgutierrez
   * @version 1.0
   * @since 23/08/2023
   */
  async compare(
    stringSinCodificar: string,
    stringCodificado: string,
  ): Promise<boolean> {
    if (!stringSinCodificar || !stringCodificado) {
      throw new BadRequestException(
        'Los datos no pueden ser nulos para la comparación en Brycript',
      );
    }

    return compare(stringSinCodificar, stringCodificado);
  }
}
