<template>
	<div class="login">
		<Card
			v-if="auth.userReturned"
			class="login__card">
			<template #title>Sign in</template>
			<template #content>
				<form>
					<div class="login__input-container">
						<label for="email">Email</label>
						<InputText
							id="email"
							v-model="form.email"
							class="login__input"
							:class="{ 'login__input--error': formErrors.email }"
							@keyup.enter="submit" />
						<small
							v-if="formErrors.email"
							id="email"
							class="login__input-error-message"
							>{{ formErrors.email }}</small
						>
					</div>
					<div class="login__input-container">
						<label for="password">Password</label>
						<InputText
							id="password"
							v-model="form.password"
							class="login__input"
							:class="{ 'login__input--error': formErrors.password }"
							type="password"
							:helper-text="formErrors.email"
							@keyup.enter="submit" />
						<small
							v-if="formErrors.password"
							id="password"
							class="login__input-error-message"
							>{{ formErrors.password }}</small
						>
					</div>
					<Button
						class="login__login-button"
						:loading="loading"
						@click="submit"
						@submit.stop>
						Login
					</Button>
				</form>
			</template>
		</Card>
		<ProgressSpinner v-else />
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/Auth'
import { useRouter } from 'vue-router'
import ProgressSpinner from 'primevue/progressspinner'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'

const form = ref({
	email: 'test@codedjen.com',
	password: 'password',
})
const formErrors = ref({
	email: null,
	password: null,
})
const loading = ref(false)

const router = useRouter()
const auth = useAuthStore()

async function submit() {
	formErrors.value.email = null
	formErrors.value.password = null
	loading.value = true
	try {
		await auth.login(form.value)
	} catch (error: any) {
		if (error.response?.status === 422) {
			formErrors.value.email = error.response?.data?.errors?.email?.[0]
			formErrors.value.password = error.response?.data?.errors?.password?.[0]
		}
		throw error
	} finally {
		loading.value = false
	}
	router.push('/')
}
</script>

<style scoped lang="scss">
.login {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 100%;

	.login__card {
		width: 500px;

		form {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: 8px;

			& > * {
				width: 100%;
			}

			.login__input-container {
				display: flex;
				flex-direction: column;
				gap: 5px;
				margin-bottom: 10px;

				.login__input-error-message {
					color: var(--p-red-500);
				}

				.login__input--error {
					border-color: var(--p-red-500);
				}
			}
		}
	}
}
</style>
