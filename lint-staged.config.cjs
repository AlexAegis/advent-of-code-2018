// For the glob features check out https://github.com/micromatch/micromatch
module.exports = {
	'*.(js|ts)': ['eslint --max-warnings=0', 'prettier --check'],
	'*.css': ['stylelint', 'prettier --list-different'],
	'*.scss': ['stylelint --syntax=scss', 'prettier --check'],
	'(*.json|.eslintrc|.prettierrc|.stylelintrc|.markdownlintrc)': [('eslint', 'prettier --check')],
	'*.md': ["markdownlint --ignore 'CHANGELOG.md' --ignore-path '.gitignore'", 'prettier --check'],
	'*.(yml|yaml)': ['prettier --check'],
	'*.rs': (fs) => {
		return [
			`cargo fmt --all --manifest-path solutions/rust/Cargo.toml -- --check ${fs.join(' ')}`,
			'cargo clippy --manifest-path solutions/rust/Cargo.toml -- ',
		];
	},
	'*.py': [
		'sh -c "cd solutions/python && pipenv -v run lint"',
		'sh -c "cd solutions/python && pipenv -v run test"',
	],
};