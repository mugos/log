//
const test = require('ava')
//
const { curry, log, logCond, logErr, tap, trace, traceA } = require('.')

test('trace', t => {
  t.is(trace('Hy'), 'Hy')
})

test('traceA', t => {
  t.is(traceA('Hy')(), 'Hy')
})

test('log', t => {
  t.is(log('--->', 'Hello You'), 'Hello You')
  t.is(log('--->')('You Curried Beuty'), 'You Curried Beuty')
})

test('logCond', t => {
  t.true(logCond(true, false))
  t.true(logCond(true)(false))
  t.true(logCond(true)('Hy'))
})
