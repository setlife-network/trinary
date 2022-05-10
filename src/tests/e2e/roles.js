require('dotenv').config()

import { Selector, Role } from 'testcafe';

export const testUser = Role(`${process.env.SITE_URL}/login`, async t => {
    const trinaryLoginButton = Selector('a').withAttribute('data-testid', 'login-button')

    await t.click(trinaryLoginButton);

    const githubSignInButton = Selector('input').withAttribute('data-signin-label', 'Sign in')

    await t
        .typeText('#login_field', process.env.TESTCAFE_ROLE_GITHUB_EMAIL)
        .typeText('#password', process.env.TESTCAFE_ROLE_GITHUB_PASSWORD)
        .click(githubSignInButton)

    // Uncomment the code below if Github token expires and requires
    // the authorization step to proceed with authentication

    // const githubAuthorizeButton = Selector('#js-oauth-authorize-btn')
    // await t.wait(2000).click(githubAuthorizeButton);

});