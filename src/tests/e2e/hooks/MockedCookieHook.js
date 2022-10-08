require('dotenv').config()

import { RequestHook } from 'testcafe';

// This class is needed after finding your user's Cookie value 
// in the Request headers (DevTools > Network) then set the value of the TESTCAFE_AUTH_COOKIE
// environment variable
// TESTCAFE_AUTH_COOKIE='session=abc123;sig=def456'
// for more details see this guide:
// https://testcafe.io/documentation/402842/guides/advanced-guides/intercept-http-requests#create-a-custom-request-hook
export class MockedCookieHook extends RequestHook {
    constructor (requestFilterRules, responseEventOptions) {
        super(requestFilterRules, responseEventOptions);
    }

    onRequest (e) {
        e.requestOptions.headers['Cookie'] = process.env.TESTCAFE_AUTH_COOKIE;
    }

    onResponse (e) {
    }
}