import { ClientFunction, Selector } from 'testcafe';
import { MockedCookieHook } from './hooks/MockedCookieHook';

const getWindowLocation = ClientFunction(() => window.location);

const mockedCookieHook = new MockedCookieHook()

fixture`Home`
    .page`${process.env.SITE_URL}/home/clients`
    .requestHooks(mockedCookieHook)

test('Open Add Client page from the Home page', async t => {
    const addClientButton = Selector('.ClientListManager').find('button')

    await t
        .expect(addClientButton.exists).ok()
        .click(addClientButton)

    const location = await getWindowLocation()
    
    await t
        .expect(location.pathname).eql('/client/add')
});

// TODO: Complete this test and implement cleanup to remove payment
test.skip('Create a new payment for an existing Client from the Home page', async t => {
    const firstClientTile = Selector('.ClientListPage').find('.ClientTile')

    await t
        .expect(firstClientTile.exists).ok()
        .click(firstClientTile)

    const location = await getWindowLocation()
    
    await t.expect(location.pathname).contains('/clients')

    const addPaymentButton = Selector('.ClientPaymentsManager').find('button')

    await t.click(addPaymentButton)

    const paymentAmountInput = Selector('div').withAttribute('data-testid', 'add-payment-amount-field').find('input')
    const dateIncurredInput = Selector('div').withAttribute('data-testid', 'add-payment-date-incurred-field').find('input')
    const submitPaymentButton = Selector('button').withAttribute('data-testid', 'add-payment-submit-button')

    await t
        .typeText(paymentAmountInput, '2000000')
        .typeText(dateIncurredInput, '01/01/2023')
        .click(submitPaymentButton)

    const paymentsList = Selector('.PaymentsList')

    await t.expect(paymentsList.exists).ok()

    const paymentTiles = paymentsList.find('.PaymentTile')

    console.log('paymentTiles')
    console.log(paymentTiles)

    await t.expect(paymentTiles.exists).ok()

    const newlyCreatedPayment = paymentTiles.find((node) => {
        console.log('node')
        console.log(node)
        const paymentAmount = node.find('div').withAttribute('data-testid', 'payment-tile-amount')
        console.log('paymentAmount')
        console.log(paymentAmount)

        return node.textContent == '2,000,000'
    })

    await t.expect(newlyCreatedPayment.exists).ok()
});