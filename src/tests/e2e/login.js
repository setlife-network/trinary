import { ClientFunction, Selector } from 'testcafe';

const getWindowLocation = ClientFunction(() => window.location);

fixture`Login`
    .page`${process.env.SITE_URL}/login`;

test('Clicking the Login button should open Github', async t => {
    const loginButton = Selector('a').withAttribute('data-testid', 'login-button')

    await t.click(loginButton)

    const { href } = await getWindowLocation()

    await t.expect(href).contains('github.com')
});