import { RequestHook } from 'testcafe';

// This class can be used as an alternative to the useRole(testUser)
// mechanism by logging in manually and finding your user's Cookie value 
// in the Request headers (DevTools > Network) then follow this guide
// https://testcafe.io/documentation/402842/guides/advanced-guides/intercept-http-requests#create-a-custom-request-hook 
export class MockedCookieHook extends RequestHook {
    constructor (requestFilterRules, responseEventConfigureOpts) {
        super(requestFilterRules, responseEventConfigureOpts);
    }

    onRequest (e) {
        e.requestOptions.headers['Cookie'] = 'set the cookie found in request headers here';
    }

    onResponse (e) {
    }
}