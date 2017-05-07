import test from 'ava'
import { getCookie } from './util'

const cookieString = 'color=blue; margarine=butter; gables=stucco'

test('getCookie returns the correct value for a key in the cookie', t => {
    t.is(getCookie(cookieString, 'color'), 'blue')
    t.is(getCookie(cookieString, 'margarine'), 'butter')
    t.is(getCookie(cookieString, 'gables'), 'stucco')
})

test('getCookie returns null if provided key isn\'t in cookie', t => {
    t.is(getCookie(cookieString, 'barn'), null)
})
