import { ClientFunction } from 'testcafe';
import { MockedCookieHook } from './hooks/MockedCookieHook';

const getWindowLocation = ClientFunction(() => window.location);

const mockedCookieHook = new MockedCookieHook()

fixture`Root`
    .page`${process.env.SITE_URL}`
    .requestHooks(mockedCookieHook)

test('Authenticated users are forwarded to the /home/clients page', async t => {
    const location = await getWindowLocation()

    await t
        .expect(location.pathname).eql('/home/clients')
})

test('Unauthenticated users are forwarded to the /login page', async t => {
    await t.removeRequestHooks(mockedCookieHook)

    const location = await getWindowLocation()

    await t
        .expect(location.pathname).eql('/login')
})