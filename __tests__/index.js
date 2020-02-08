/**
 * Created by BANO.notIT on 08.07.18.
 */

const fabric = require('../').default,
  config = require('./config')

test('fabric if function', () => {
  expect(fabric).toBeInstanceOf(Function)
})

test('fabric returns function', () => {
  expect(fabric(config)).toBeInstanceOf(Function)
})
