module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue'],
	rules: {
		'indentation': ['tab', { baseIndentLevel: 1 }],
		'selector-pseudo-element-no-unknown': [
			true,
			{
				ignorePseudoElements: ['v-deep']
			}
		],
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'tailwind',
					'apply',
					'variants',
					'responsive',
					'screen',
				],
			},
		],
		'number-leading-zero': 'never',
		'no-descending-specificity': null,
		'font-family-no-missing-generic-family-keyword': null,
		'selector-type-no-unknown': null,
		'no-duplicate-selectors': null,
		'no-empty-source': null,
		'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }]
	}
}