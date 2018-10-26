const curry = (f) => {
  return function currify() {
    const args = Array.prototype.slice.call(arguments)
    return args.length >= f.length
      ? f.apply(null, args)
      : currify.bind(null, ...args)
  }
}
const tap = curry((fn, x) => {
  fn(x)
  return x
})

// createLog :: prefix -> a -> IO(a) ->  a
const createLog = curry((impure, prefix, val) => tap(x => impure(prefix, x))(val))
// createLogErr :: prefix -> a -> IO(a) ->  a
const createLogErr = curry((impure, prefix, val) => tap(x => impure(prefix, x))(val))
// createLogCond :: a -> IO(val) -> a
const createLogCond = curry((impure, fakeX, actualX) => tap(
  (_) => createLog(impure, 'condDebug --->', actualX))(fakeX)
)
// createTrace :: a -> IO(a) -> a
const createTrace = (deps) => tap(createLog(deps, 'Tracer ----->'))
// createTraceA :: _ -> a -> IO(a) -> a
const createTraceA = (deps) => (a) => () => tap(createLog(deps, 'Tracer ----->'), a)

module.exports = {
  curry,
  tap,
  createLog,
  createLogCond,
  createLogErr,
  createTrace,
  createTraceA,
  log: createLog((a, b) => console.log(a, b)),
  logCond: createLogCond((a, b) => console.log(a, b)),
  logErr: createLogErr((a, b) => console.error(a, b)),
  trace: createTrace((a, b) => console.log(a, b)),
  traceA: createTraceA((a, b) => console.log(a, b)),
}
