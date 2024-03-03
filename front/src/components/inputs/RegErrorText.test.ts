import { cleanup, render, RenderOptions, RenderResult } from '@testing-library/vue'

import RegErrorText from '@/components/inputs/RegErrorText.vue'

let props: RenderOptions['props'] = {}
let renderComponent: () => RenderResult

describe('RegErrorText.vue', () => {
	beforeEach(() => {
		renderComponent = () =>
			render(RegErrorText, {
				props,
			})
	})

	afterEach(cleanup)

	it('check error one text', () => {
		props = { errorInfo: { errorText: 'erreur test' } }
		const wrapper = renderComponent()

		wrapper.getByTestId('errortext')
		wrapper.getByText('erreur test')
	})

	it('check error multi text', () => {
		props = { errorInfo: { errorText: ['erreur test', 'erreur 2'] } }
		const wrapper = renderComponent()

		wrapper.getByText('erreur test')
		wrapper.getByText('erreur 2')
	})
})