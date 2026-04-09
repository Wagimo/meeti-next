
import { FormError, FormInput, FormLabel, FormTextArea } from '@/components/forms'
import { useFormContext } from 'react-hook-form'
import { CommunityFormType } from '../schemas/communitySchema'
import { UploadDropzone } from '@/shared/utils/uploadthing'



export default function CommunityForm() {

    const { register, formState: { errors } } = useFormContext<CommunityFormType>()

    console.log(errors)
    return (
        <div className='space-y-4'>
            <div className='space-y-1'>
                <FormLabel htmlFor='community-name'>Nombre de la comunidad</FormLabel>
                <FormInput
                    id='community-name'
                    type="text"
                    placeholder='Ingresa el nombre de la comunidad'
                    {...register('name')}
                />
                {errors.name && <FormError>{errors.name.message}</FormError>}
            </div>

            <UploadDropzone
                endpoint={'meetiUploader'}
            />

            <div className='space-y-1'>

                <FormLabel htmlFor='community-description'>Descripción de la comunidad</FormLabel>
                <FormTextArea
                    id='community-description'
                    className='border border-slate-200 w-full p-2 h-40'
                    placeholder='Ingresa la descripción de la comunidad'
                    {...register('description')}
                />
                {errors.description && <FormError>{errors.description.message}</FormError>}
            </div>

        </div>
    )
}
