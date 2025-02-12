
export function getMaxPopulation(population: number) {
  const populationDigits = population.toString().length;

  return Math.ceil(population/(10**(populationDigits-1)))*(10**(populationDigits-1))
}