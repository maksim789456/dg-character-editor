import { DgCharacterBaseStat, DgCharacterSkill, DgRoll, DgRollResult } from "@/src/model/character";

export function rollDice(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

export function rollDgStat(rate: number, modifier: number = 0): DgRoll {
  const roll = rollDice(100);
  const result = calcRollResult(rate, roll, modifier);

  return {
    rate,
    roll,
    modifier,
    result,
  }
}

export function calcRollResult(
  rate: number, roll: number, modifier: number = 0
): DgRollResult {
  const modifiedRate = Math.max(0, Math.min(100, rate + modifier));

  const is00 = roll === 100 || roll === 0;

  // Dice match check (11, 22, 33 ... 99, 00)
  const isMatchingDice =
    is00 || (roll >= 11 && roll <= 99 && roll % 11 === 0);

  // Critical success:
  // - Roll of 01
  // - Matching dice success (e.g. 11, 22, 33) where roll <= skill
  if (
    roll === 1 ||
    (isMatchingDice && roll <= modifiedRate)
  ) {
    return DgRollResult.CriticalSuccess;
  }

  // Fumble:
  // - Roll of 00
  // - Matching dice failure (e.g. 55, 66, 77) where roll > skill
  if (
    is00 ||
    (isMatchingDice && roll > modifiedRate)
  ) {
    return DgRollResult.Fumble;
  }

  // Normal roll
  return roll <= modifiedRate ? DgRollResult.Success : DgRollResult.Failure;
}