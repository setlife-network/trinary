import process from 'process';

export const hasStripeEnv = () => {
    if (!process.env.STRIPE_API_KEY || !process.env.STRIPE_SECRET) {
        return false
    } else {
        return true
    }
}