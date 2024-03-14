<template>
	<div class="mx-auto flex w-10/12 flex-col gap-8 rounded-lg bg-white/20 p-10 lg:w-full">
		<h1 class="text-2xl font-bold text-white">Etes-vous élligible ?</h1>

		<div class="grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
			<dt>
				<label>Date d'approbation</label>
				<Calendar
					v-model="usbaData.ApprovalDate"
					showIcon
					:showOnFocus="false"
					class="h-[42px]"
					:pt="{
						dropdownButton: {
							root: {
								class:'bg-matisse-700 items-center cursor-pointer inline-flex overflow-hidden relative select-none text-center align-bottom transition duration-200 ease-in-out focus:outline-none focus:outline-offset-0 text-white bg-blue-500 hover:bg-matisse-800 rounded-r-md px-4 py-3 text-base'
							}
						},
						input: {
							class:'rounded-l-lg w-full'
						}
					}"
				/>
				<RegErrorText v-if="v$.ApprovalDate.$dirty && v$.ApprovalDate.required.$invalid" :error-info="{ errorText: 'Date d\'approbation est obligatoire'}" />
			</dt>

			<dt>
				<label>Année du prêt</label>
				<Calendar
					v-model="usbaData.ApprovalFY"
					showIcon
					:showOnFocus="false"
					class="h-[42px]"
					view="year"
					dateFormat="yy"
					:pt="{
						dropdownButton: {
							root: {
								class:'bg-matisse-700 items-center cursor-pointer inline-flex overflow-hidden relative select-none text-center align-bottom transition duration-200 ease-in-out focus:outline-none focus:outline-offset-0 text-white bg-blue-500 hover:bg-matisse-800 rounded-r-md px-4 py-3 text-base'
							}
						},
						input: {
							class:'rounded-l-lg w-full'
						}
					}"
				/>
				<RegErrorText v-if="v$.ApprovalFY.$dirty && v$.ApprovalFY.required.$invalid" :error-info="{ errorText: 'L\'année du prêt est obligatoire'}" />
			</dt>

			<RegInputNumber
				v-model.trim="usbaData.Term"
				input-class="rounded-l-lg"
				label-class="text-white text-lg"
				label="Nb mois"
				suffix=" mois"
				:hasError="v$.Term.$dirty && v$.Term.required.$invalid"
				:errorInfo="{errorText: 'Terme est obligatoire'}"
			/>

			<RegInputNumber
				v-model.trim="usbaData.NoEmp"
				input-class="rounded-l-lg"
				label-class="text-white text-lg"
				label="Number of employees"
				:hasError="v$.NoEmp.$dirty && v$.NoEmp.required.$invalid"
				:errorInfo="{errorText: 'Le nombre d\'employés est obligatoire'}"
			/>

			<dt>
				<label>Secteur</label>
				<select v-model="usbaData.Naics">
					<template v-for="item in itemsNaics" :key="item">
						<option :value="item">{{ item }}</option>
					</template>
				</select>
				<RegErrorText v-if="v$.Naics.$dirty && v$.Naics.required.$invalid" :error-info="{ errorText: 'Le secteur d\'activité est obligatoire'}" />
			</dt>

			<RegInputNumber
				v-model.trim="usbaData.GrAppv"
				input-class="rounded-l-lg"
				suffix=" €"
				:step="2000"
				:max="100000000"
				label-class="text-white text-lg"
				label="Montant Banque"
				:hasError="v$.GrAppv.$dirty && v$.GrAppv.required.$invalid"
				:errorInfo="{errorText: 'Le montant de la banque est obligatoire'}"
			/>

			<RegInputNumber
				v-model.trim="usbaData.CreateJob"
				input-class="rounded-l-lg"
				suffix=""
				label-class="text-white text-lg"
				label="Création d'emploi"
				:hasError="v$.GrAppv.$dirty && v$.GrAppv.required.$invalid"
				:errorInfo="{errorText: 'La création d\'emploi est obligatoire'}"
			/>

			<RegInputNumber
				v-model.trim="usbaData.RetainedJob"
				input-class="rounded-l-lg"
				suffix=""
				label-class="text-white text-lg"
				label="Nb d'emplois final"
				:hasError="v$.GrAppv.$dirty && v$.GrAppv.required.$invalid"
				:errorInfo="{errorText: 'Le nombre d\'emplois est obligatoire'}"
			/>
		</div>

		<div class="grid grid-cols-2">
			<dt>
				<label>Crédit revolving ?</label>
				<SelectButton
					v-model="usbaData.RevLineCr"
					:options="itemsRevLineCr" />
				<RegErrorText v-if="v$.RevLineCr.$dirty && v$.RevLineCr.required.$invalid" :error-info="{ errorText: 'Sélectionnez une option'}" />
			</dt>

			<dt>
				<label>&nbsp;</label>
				<SelectButton
					v-model="usbaData.FranchiseCode"
					:options="itemsFranchiseCode" />
				<RegErrorText v-if="v$.FranchiseCode.$dirty && v$.FranchiseCode.required.$invalid" :error-info="{ errorText: 'Sélectionnez une option'}" />
			</dt>

			<dt>
				<label>&nbsp;</label>
				<SelectButton
					v-model="usbaData.NewExist"
					:options="itemsNewExist" />
				<RegErrorText v-if="v$.NewExist.$dirty && v$.NewExist.required.$invalid" :error-info="{ errorText: 'Sélectionnez une option'}" />
			</dt>

			<dt>
				<label>&nbsp;</label>
				<SelectButton
					v-model="usbaData.LowDoc"
					:options="itemsLowDoc" />
				<RegErrorText v-if="v$.LowDoc.$dirty && v$.LowDoc.required.$invalid" :error-info="{ errorText: 'Sélectionnez une option'}" />
			</dt>

			<dt>
				<label>&nbsp;</label>
				<SelectButton
					v-model="usbaData.UrbanRural"
					:options="itemsUrbanRural"
					:pt="{
						root: {
							class:'w-full'
						}
					}" />
				<RegErrorText v-if="v$.UrbanRural.$dirty && v$.UrbanRural.required.$invalid" :error-info="{ errorText: 'Sélectionnez une option'}" />
			</dt>
		</div>

		<button class="mx-auto w-1/3 rounded bg-matisse-700 px-4 py-2 font-bold text-white hover:bg-matisse-800" @click="predict">Envoyer</button>
	</div>
</template>

<script setup lang="ts">
	import useVuelidate from '@vuelidate/core'
	import { required } from '@vuelidate/validators'
	import { isAxiosError } from 'axios'
	import Calendar from 'primevue/calendar'
	import SelectButton from 'primevue/selectbutton'
	import { useToast } from 'primevue/usetoast'
	import { reactive, toValue } from 'vue'

	import { API_VERSION } from '@/constants'
	import { useAuth } from '@/store/auth'
	import { api } from '@/store/interceptor'
	import { useUI } from '@/store/ui'

	const toast = useToast()
	const auth = useAuth()
	const uiStore = useUI()

	const itemsFranchiseCode = [
		'Franchise',
		'No Franchise',
	]

	const itemsNaics = [
		'Agriculture, forestry, fishing and hunting',
		'Utilities',
		'Construction',
		'Manufacturing',
		'Wholesale trade',
		'Retail trade',
		'Transportation and warehousing',
		'Information',
		'Finance and insurance',
		'Real estate and rental and leasing',
		'Professional, scientific, and technical services',
		'Management of companies and enterprises',
		'Administrative and support and waste management and remediation services',
		'Educational services',
		'Health care and social assistance',
		'Arts, entertainment, and recreation',
		'Accommodation and food services',
		'Other services (except public administration)',
		'Public administration',
	]

	const itemsNewExist = [
		'Existing business',
		'New business',
	]

	const itemsUrbanRural = [
		'Urban Zone',
		'Rural Zone',
	]

	const itemsRevLineCr = [
		'Yes',
		'No',
	]

	const itemsLowDoc = [
		'Yes Loan Program',
		'No Loan Program',
	]

	// type TUsbaData = {
	// 	ApprovalDate? : Date,
	// 	Term?         : number,
	// 	NoEmp?        : number,
	// 	FranchiseCode?: string,
	// 	Naics?        : string,
	// 	ApprovalFY?   : Date,
	// 	NewExist?     : string,
	// 	LowDoc?       : string,
	// 	GrAppv?       : number,
	// 	CreateJob?    : number,
	// 	RetainedJob?  : number,
	// 	UrbanRural?   : string,
	// 	RevLineCr?    : string,
	// }

	const usbaData = reactive({
		ApprovalDate : undefined,
		Term         : undefined,
		NoEmp        : undefined,
		FranchiseCode: undefined,
		Naics        : undefined,
		ApprovalFY   : '',
		NewExist     : undefined,
		LowDoc       : undefined,
		GrAppv       : undefined,
		CreateJob    : undefined,
		RetainedJob  : undefined,
		UrbanRural   : undefined,
		RevLineCr    : undefined,
	})

	const rules = {
		ApprovalDate : { required },
		Term         : { required },
		NoEmp        : { required },
		FranchiseCode: { required },
		Naics        : { required },
		ApprovalFY   : { required },
		NewExist     : { required },
		LowDoc       : { required },
		GrAppv       : { required },
		CreateJob    : { required },
		RetainedJob  : { required },
		UrbanRural   : { required },
		RevLineCr    : { required },
	}

	const v$ = useVuelidate(rules, usbaData)

	async function predict() {
		if (await v$.value.$validate()) {
			try {
				const sendData = { ...toValue(usbaData) }
				if (sendData.ApprovalFY)
					sendData.ApprovalFY = String(new Date(sendData.ApprovalFY!).getFullYear().toString())

				const { data } = await api.post(`/${API_VERSION}/predictions/usba`, { ...sendData })

				toast.add({ severity: 'info', summary: 'Prédiction', detail: data.result[0], life: 3000 })
			} catch (e) {
				if (isAxiosError(e) && e.response?.status == 403) {
					auth.logout()
					uiStore.loginVisible = true
				}
			}
		}
	}
</script>

<style scoped lang="scss">
:deep(.input-number){
	@apply border rounded-l-md border-gray-300 p-2 focus:outline-0 focus:outline-none focus:ring-0 w-full
}
:deep(.bt-plus){
	@apply w-10 bg-matisse-700 border-r-2 border-matisse-600 text-white hover:bg-matisse-800
}

:deep(.bt-minus){
	@apply w-10 bg-matisse-700 rounded-r-md text-white hover:bg-matisse-800
}

label{
	@apply text-white text-lg
}
select {
	@apply rounded-lg w-full
}
dt{
	@apply flex flex-col gap-y-2
}
</style>