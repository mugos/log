declare module 'log' {

  export function Trace<T>(a: T): T

  export function Log<T1, T2>(a: T1, b: T2): T2
  export function Log<T1, T2>(a: T1): (b: T2) => T2

  export function LogErr<T1, T2>(a: T1, b: T2): T2
  export function LogErr<T1, T2>(a: T1): (b: T2) => T2

  export function LogCond<T1, T2>(a: T1, b: T2): T2
  export function LogCond<T1, T2>(a: T1): (b: T2) => T2
}
