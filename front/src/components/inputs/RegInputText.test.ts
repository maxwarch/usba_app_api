import { cleanup, render, RenderOptions, RenderResult } from '@testing-library/vue'
import { shallowMount } from '@vue/test-utils'

import RegInputText from '@/components/inputs/RegInputText.vue'

let props: RenderOptions['props'] = {}
let renderComponent: () => RenderResult

describe('RegInputText.vue', () => {
	beforeEach(() => {
		renderComponent = () =>
			render(RegInputText, {
				props,
			})
	})

	afterEach(cleanup)

	it('check elements', () => {
		props = {
			modelValue: 'modele',
			label     : 'labelModele',
			inputClass: 'css-input-class',
			labelClass: 'css-label-class',
		}
		const wrapper = renderComponent()

		const label = wrapper.getByRole('label')
		expect(label.className).toBe('css-label-class reg-input--label')
		expect(label.textContent).toBe('labelModele')
		const input = wrapper.getByDisplayValue('modele') as HTMLInputElement
		expect(input.className).toBe('css-input-class reg-input--text')
		expect(input.getAttribute('type')).toBe('text')
	})

	it('test v-model', async () => {
		const wrapper = shallowMount(RegInputText, {
			props: {
				modelValue           : 'initialText',
				'onUpdate:modelValue': (e: Event) => wrapper.setProps({ modelValue: e as unknown as string }),
			},
		})

		expect(wrapper.find('input').element.value).toBe('initialText')

		await wrapper.find('input').setValue('test')
		expect(wrapper.emitted()).toHaveProperty('update:modelValue')
		expect(wrapper.props('modelValue')).toBe('test')
	})

	it('check error elements', () => {
		props = { modelValue: 'modele', hasError: true, errorInfo: { errorText: 'erreur test' } }
		const wrapper = renderComponent()

		const erreurText = wrapper.getByText('erreur test')
		expect(erreurText.className).toContain('reg-input--error-text')
		const input = wrapper.getByDisplayValue('modele')
		expect(input.className).toContain('reg-input--error-input')
	})
})
