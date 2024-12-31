<template>
    <FloatingConfigurator />
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center gap-4">
            <img src="/images/table.png" alt="" width="50">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-16" style="border-radius: 53px">
                    <div class="text-center mb-8">
                        <!-- <img src="/images/billows-sm-primary.png" alt="Billows" class="mb-2 w-20 shrink-0 mx-auto" /> -->
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to TAbLe Admin!</div>
                        <span class="text-muted-color font-medium">Sign in to continue</span>
                    </div>
                    <!-- <div> -->
                    <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex flex-col w-full gap-3">
                        <!-- <label for="username" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label> -->
                        <div>
                            <label for="username" class="block">Account</label>
                            <InputText id="username" name="username" type="text" placeholder="Email address" class="w-full md:w-[30rem]" />
                            <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error.message }}</Message>
                        </div>

                        <div>
                            <!-- <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label> -->
                            <label for="password1" class="block">Password</label>
                            <Password id="password1" name="password" placeholder="Password" :toggleMask="true" fluid :feedback="false"></Password>
                            <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
                                <ul class="my-0flex flex-col gap-1">
                                    <li v-for="(error, index) of $form.password.errors" :key="index">{{ error.message }}</li>
                                </ul>
                            </Message>
                        </div>
                        <!-- <div class="flex items-center my-2 gap-8">
                            <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot password?</span>
                        </div> -->
                        <div class="mt-5">
                            <Button label="Sign In" class="w-full" type="submit"></Button>
                        </div>
                    </Form>
                    <!-- </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Form } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import dayjs from 'dayjs/esm'

import API from '@/api'
import Response from '@/utils/response'
import bus from '@/utils/mitt'

import FloatingConfigurator from '@/components/FloatingConfigurator.vue'

const router = useRouter()

const initialValues = reactive({
    username: '',
    password: ''
})

const resolver = zodResolver(
    z.object({
        username: z.string().min(1, { message: 'Account is required.' }),
        password: z.string().min(1, { message: 'Password is required.' })
        // password: z
        //     .string()
        //     .min(3, { message: 'Minimum 3 characters.' })
        //     .max(8, { message: 'Maximum 8 characters.' })
        //     .refine((value) => /[a-z]/.test(value), {
        //         message: 'Must have a lowercase letter.'
        //     })
        //     .refine((value) => /[A-Z]/.test(value), {
        //         message: 'Must have an uppercase letter.'
        //     })
        //     .refine((value) => /d/.test(value), {
        //         message: 'Must have a number.'
        //     })
    })
)

const onFormSubmit = (e) => {
    const { valid, values } = e
    if (valid) {
        bus.emit("handleLoadingShow")
        API.Access.login(values).then(
            (res) => {
                const { token, uid } = res
                localStorage.setItem("access", JSON.stringify({
                    token,
                    uid
                }))
                bus.emit("handleLoadingHide")
                router.push('/admin/product')
            },
            (err) => {
                bus.emit("handleLoadingHide")
                Response.error(err.message)
            }
        )
    }
}
</script>
