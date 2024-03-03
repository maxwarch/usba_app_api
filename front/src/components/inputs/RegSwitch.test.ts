import userEvent from '@testing-library/user-event'
import { cleanup, fireEvent, render, RenderOptions, RenderResult } from '@testing-library/vue'

import RegSwitch from '@/components/inputs/RegSwitch.vue'
import { clearEmitted } from '@/utils/testClearEmittedEvent'

let props: RenderOptions['props'] = {}
let renderComponent: () => RenderResult

describe('RegSwitch.vue', () => {
	beforeEach(() => {
		renderComponent = () =>
			render(RegSwitch, {
				props,
			})
	})

	afterEach(cleanup)

	it('check comp elements', async () => {
		props = { valueLeft: 'M', labelLeft: 'Garçon', valueRight: 'F', labelRight: 'Fille', colorLeft: 'bg-red', colorRight: 'bg-blue' }
		const wrapper = renderComponent()

		wrapper.getByText('Fille')
		const left = wrapper.getByText('Garçon')

		const bt = left.nextSibling as Element
		expect(bt.className).toContain('bg-red')

		await fireEvent.click(bt)
		expect(bt.className).toContain('bg-blue')
	})

	it('test v-model', async () => {
		props = {
			modelValue: 'M',
			valueLeft : 'M',
			valueRight: 'F',
		}
		const wrapper = renderComponent()
		const bt = wrapper.getByTestId('bt')

		await userEvent.click(bt)
		expect(wrapper.emitted('update:modelValue')[0]).toEqual(['F'])

		clearEmitted(wrapper)

		await userEvent.click(bt)
		expect(wrapper.emitted('update:modelValue')[0]).toEqual(['M'])
	})

	it('check error elements', () => {
		props = { modelValue: 'modele', hasError: true, errorInfo: { errorText: 'erreur test' } }
		const wrapper = renderComponent()

		const erreurText = wrapper.getByText('erreur test')
		expect(erreurText.className).toContain('reg-input--error-text')
	})
})