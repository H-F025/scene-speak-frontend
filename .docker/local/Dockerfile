# ローカル開発用Dockerfile。ホットリロード対応。
# git は host の pre-commit hook (.husky/pre-commit) からコンテナ内で
# lint-staged を実行するために必要 (staged file 検出に git を spawn する)
FROM node:22.22.3-slim
RUN apt-get update && apt-get install -y --no-install-recommends git \
  && rm -rf /var/lib/apt/lists/*
RUN corepack enable
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    pnpm install --frozen-lockfile

EXPOSE 3000

CMD ["pnpm", "dev"]
