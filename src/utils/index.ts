
export function randomChoice<T>(list:T[]): T {

  return list[Math.floor(Math.random*list.length)]
}

export function randomInt(start:number, end:number): number {
  
  return Math.floor(Math.random() * (end - start) + start)
}