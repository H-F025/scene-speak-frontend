// commit時にgit addされたファイルにだけlint・formatを実行する設定
const config = {
  '**/*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  '**/*.{json,css,md}': ['prettier --write'],
}

export default config
