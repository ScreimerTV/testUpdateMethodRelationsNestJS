/**
 * Enum defining the number of rounds for the hash performed by bcrypt or any other hashing algorithm
 *
 * @author dgutierrez
 * @version 1.0
 * @since 22/08/2023
 */
export enum NumbersOfRoundsHashEnum {
  LOW = 10,
  MEDIUM = 15,
  HIGH = 20,
  VERY_HIGH = 25,
  EXTREME = 30,
}
