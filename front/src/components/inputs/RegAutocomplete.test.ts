import userEvent from '@testing-library/user-event'
import { render, RenderOptions, RenderResult, waitFor } from '@testing-library/vue'
import PrimeVue from 'primevue/config'

import RegAutocomplete from '@/components/inputs/RegAutocomplete.vue'
import Club from '@/models/Club'

let props: RenderOptions['props'] = {}
let renderComponent: () => RenderResult

describe('RegAutocomplete.vue', () => {
	beforeAll(async () => {
		await Club.import()
	})
	beforeEach(() => {
		renderComponent = () =>
			render(RegAutocomplete, {
				props,
				global: {
					plugins: [PrimeVue],
					stubs  : {
						teleport: true,
					},
				},
			})
	})

	it('check search', async () => {
		await Club.import()
		props = {
			model         : Club,
			renderItemsCol: ['id', 'nom'],
			searchOn      : ['tokens'],
			optionLabel   : 'id',
			label         : 'test',
		}

		const wrapper = renderComponent()
		const input = wrapper.getByRole('combobox') as HTMLInputElement
		await userEvent.type(input, '5900')

		let liste: any = undefined

		await waitFor(() => {
			liste = wrapper.getByRole('listbox')
		})

		expect(wrapper.html()).toMatchSnapshot()

		if (liste instanceof HTMLElement) {
			const firstLi = liste.querySelector('li') as Element

			await userEvent.click(firstLi, {})
			expect(wrapper.html()).toMatchSnapshot()
		}
	})

	it('check error', async () => {
		await Club.import()
		props = {
			model         : Club,
			renderItemsCol: ['id', 'nom'],
			searchOn      : ['tokens'],
			label         : 'test',
			hasError      : true,
			errorInfo     : { errorText: 'erreur info' },
		}

		const wrapper = renderComponent()
		wrapper.getByText('erreur info')
	})
})