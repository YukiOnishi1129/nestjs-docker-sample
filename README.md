# nestjs-docker-sample

NestJS Docker 環境サンプル (TypeORM)

## 環境構築方法

### 1. 「.env」ファイルを作成し、「.env.sample」の中身をコピーして記述

### 2. 以下の手順でアプリケーションを起動

1. ビルド
   docker-compose build

2. コンテナ起動
   docker-compose up

3. サーバーにアクセス
   http://localhost:4000/

4. DB コンテナが起動できたかを確認

- DB コンテナにログイン
  docker exec -it 20211027_nestjs_typeorm_db /bin/bash

- MySQL にログイン
  mysql -u root -p
  ※パスワードは「pass」を記載

## swagger モックサーバーの立ち上げ

1. swagger ディレクトリへ移動

cd swagger

2. ビルド
   docker-compose build

3. コンテナ起動
   docker-compose up

4. アクセス

- swagger ui

  - http://localhost:8000

- swagger api (例)
  - http://localhost:4010/api/todos

#### swagger の yaml ファイル

- app コンテナで yarn start されるたびに、app/swagger/swagger-spec.yaml に最新のファイルが吐き出される。
  - 上記の swagger のコンテナは swagger-spec.yaml ファイルをもとに swagger-ui やモックサーバーを立ち上げている

## docker コマンド

```
// ビルド
docker-compose build

// コンテナ起動
docker-compose up

// コンテナ起動(バックグラウンド実行)
docker-compose up -d

// コンテナ停止
docker-compose down

// コンテナ停止&ボリューム削除(DBデータを削除)
docker-compose down -v

// appコンテナへログイン
docker exec -it 20211027_nestjs_typeorm_server sh

// dbコンテナへログイン
docker exec -it 20211027_nestjs_typeorm_db /bin/bash

```

### nest コマンド

- CRUD Generator

  ```
  nest g resource ドメイン名
  ```

  https://docs.nestjs.com/recipes/crud-generator
