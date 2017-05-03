import test from 'ava'
import { getCookie } from './util'

const cookieString = 'color=blue; margarine=butter; gables=stucco'

test('getCookie returns a value for a given key', t => {
    t.is(getCookie(cookieString, 'color'), 'blue')
    t.is(getCookie(cookieString, 'margarine'), 'butter')
    t.is(getCookie(cookieString, 'gables'), 'stucco')
})

test('getCookie returns null if key isn\'t present', t => {
    t.is(getCookie(cookieString, 'barn'), null)
})
