# prisma-todo-app

## 機能紹介(2025.07.21)

<div style="display:flex; column-gap: 8px">
    <img src="doc/image/1.png" />
    <img src="doc/image/2.png" />
    <img src="doc/image/3.png" />
</div>

## セットアップ手順

1. リポジトリをクローン

    ```bash
    git clone <このリポジトリのURL>
    cd prisma-todo-app
    ```

2. 依存パッケージをインストール

    ```bash
    npm ci
    ```

3. 環境変数ファイルを作成

    - `.env` ファイルをプロジェクトルートに対し、`DATABASE_URL`を設定してください。
    ```.env
    DATABASE_URL="postgresql://<user>:<password>@localhost:<port>/<database>"
    ```

    以下の値は、ご自身の環境に合わせて変更してください。

    - `<user>`：PostgreSQLのユーザー名（例：postgres）
    - `<password>`：そのユーザーのパスワード
    - `<port>`：PostgreSQLのポート（デフォルトは5432）
    - `<dbname>`：接続したいデータベース名

    ### データベース接続情報の確認方法(Linux)

    - postgreSQLが入っていない場合は事前にインストールしてください

        ```bash
        # PostgreSQLの接続情報を確認

        ## <user>の確認
        sudo -u postgres psql -c "\du"

        ## <password>の設定(パスワードは確認不可のため、忘れた場合は再設定を行う)
        sudo -u postgres psql
        ### 以下、PostgreSQLコンソール内で
        ALTER USER youruser WITH PASSWORD 'newpassword';
        \q

        ## <port>の確認
        grep '^port' /etc/postgresql/*/main/postgresql.conf
        ### または
        sudo ss -lntp | grep postgres

        ## <dbname>の確認
        sudo -u postgres psql -c "\l"
        ```

    .envの例
    ```.env
    DATABASE_URL="postgresql://postgres:newpassword@localhost:5432/dbname"
    ```

4. データベースをセットアップ

    ```bash
    # マイグレーションを適用
    npm run migrate:dev

    # Prismaクライアントを再生成
    npm run generate

    # Prisma Studioでデータベースを確認（オプション）
    npm run migrate:studio
    ```

5. 開発サーバーを起動

    ```bash
    npm run dev
    ```
