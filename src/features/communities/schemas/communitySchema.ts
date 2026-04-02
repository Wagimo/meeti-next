

import z from 'zod';

export const CommunitySchema = z.object({
    name: z.string().min(3, { error: 'El nombre de la comunidad debe tener al menos 3 caracteres' }),
    description: z.string().min(10, { error: 'La descripción de la comunidad debe tener al menos 10 caracteres' }),
});

export type CommunityFormType = z.infer<typeof CommunitySchema>