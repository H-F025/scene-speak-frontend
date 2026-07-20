module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [0], // 日本語コミットメッセージのため無効化
  },
};