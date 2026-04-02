
export const emailConfig = {
    from: {
        verification: 'Meeti <no-reply@meeti.com>',
        passwordReset: 'Meeti <no-reply@meeti.com>',
        default: 'Meeti <no-reply@meeti.com>',
    },
    tokenExpiration: '30 minutos', // 30 minutos
} as const;