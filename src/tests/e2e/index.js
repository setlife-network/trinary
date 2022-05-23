import { ClientFunction, Selector } from 'testcafe';
import { testUser } from './roles';

const getWindowLocation = ClientFunction(() => window.location);

fixture`Root`
    .page`${process.env.SITE_URL}`;

test('Unauthenticated users are forwarded to the /login page', async t => {
    const location = await getWindowLocation()

    await t
        .expect(location.pathname).eql('/login')
});

test('Authenticated users are forwarded to the /home/clients page', async t => {
    await t.useRole(testUser)

    const location = await getWindowLocation()

    await t
        .expect(location.pathname).eql('/home/clients')
});