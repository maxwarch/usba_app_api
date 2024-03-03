import { cleanup, fireEvent, render, RenderOptions, RenderResult } from '@testing-library/vue'

import RegButton from '@/components/inputs/RegButton.vue'

let props: RenderOptions['props'] = {}
let renderComponent: () => RenderResult

describe('RegButton.vue', () => {
	beforeEach(() => {
		renderComponent = () =>
			render(RegButton, {
				props,
				slots: {
					default: 'Bouton',
				},
			})
	})

	afterEach(cleanup)

	it('check comp elements', () => {
		const wrapper = renderComponent()

		const spanEl = wrapper.getByText('Bouton')
		const bt = spanEl.closest('button')

		expect(bt?.className).toContain('bt primary')
		const icon = wrapper.queryByTestId('icon')
		expect(icon).toBeNull()

		fireEvent.click(bt!)
		expect(wrapper.emitted().click).toBeTruthy()
	})

	it('check comp icon', () => {
		props = { icon: 'pi pi-check' }
		const wrapper = renderComponent()

		wrapper.getByTestId('icon')
	})

	it('check loading', () => {
		props = { loading: true }
		const wrapper = renderComponent()

		wrapper.getByTestId('loading')
		const spanEl = wrapper.getByText('Bouton')
		expect(spanEl.className).toContain('opacity-0')
	})
})