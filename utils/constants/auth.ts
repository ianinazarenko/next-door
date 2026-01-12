export enum EAuthProviders {
    GitHub = 'github',
    Google = 'google',
}

export const ERROR_MESSAGES: { [key: string]: string } = {
    AccessDenied: 'Access denied. Please ensure your email is verified with your provider.',
    OAuthAccountNotLinked: 'This email is already registered with another provider.',
    OAuthSignin: 'Error when signing in with OAuth provider.',
    OAuthCallback: 'Error receiving response from OAuth provider.',
    CredentialsSignin: 'Sign in failed. Check the details you provided.',
    EmailSignin: 'Error sending email. Please try again.',
    Callback: 'An error occurred during the callback process.',
    Default: 'An unknown error occurred. Please try again.',
};
