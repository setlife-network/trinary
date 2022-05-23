require('dotenv').config()

import { ClientFunction, Selector, Role } from 'testcafe';

const getWindowLocation = ClientFunction(() => window.location);

export const testUser = Role(`${process.env.SITE_URL}/login`, async t => {
    const trinaryLoginButton = Selector('a').withAttribute('data-testid', 'login-button')

    await t.click(trinaryLoginButton);

    const githubSignInButton = Selector('input').withAttribute('data-signin-label', 'Sign in')

    await t
        .typeText('#login_field', process.env.TESTCAFE_ROLE_GITHUB_EMAIL)
        .typeText('#password', process.env.TESTCAFE_ROLE_GITHUB_PASSWORD)
        .click(githubSignInButton)

    // Need the code below if Github token expires and requires
    // the authorization step to proceed with authentication
    const location = await getWindowLocation()
    
    if (location.host.includes('github.com')) {
        const githubAuthorizeButton = Selector('#js-oauth-authorize-btn')

        if (githubAuthorizeButton?.exists) {
            await t.click(githubAuthorizeButton);
        }
    }

});