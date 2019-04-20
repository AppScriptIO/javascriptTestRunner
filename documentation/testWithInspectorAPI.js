// Example for using live reload for mocha test together with the inspector api.
const inspector = require('inspector')
inspector.open(9229, 'localhost', true)

process.env['SZN_DEBUG'] = true
import assert from 'assert'
import { assert as chaiAssertion } from 'chai'

suite('Constructable functionality', () => {
  test('Should .', () => {
    assert(false, '• Error')
  })
})

teardown(() => {
  // Keep Node alive to allow for inspecting objects.
  setTimeout(() => {}, 1000000000)
})
