'use client'


import { Form, FormSubmit } from '@/components/forms'
import CommunityForm from './CommunityForm'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CommunityFormType, CommunitySchema } from '../schemas/communitySchema'
import { createCommunity } from '../actions/communityAction'
import toast from 'react-hot-toast'

export default function CreateCommunity() {

    const methods = useForm({
        resolver: zodResolver(CommunitySchema),
        mode: 'all',
        defaultValues: {
            name: '',
            description: ''
        }
    })


    const onSubmit = async (data: CommunityFormType) => {
        const { success, error } = await createCommunity(data)
        if (success) {
            toast.success(success)
        }
        if (error) {
            toast.error(error)
        }
    }
    return (

        <FormProvider {...methods}>

            <Form className='mt-10' onSubmit={methods.handleSubmit(onSubmit)}>
                <CommunityForm

                />
                <FormSubmit
                    value={"Crear Comunidad"}
                />

            </Form>
        </FormProvider>
    )
}