## ~~未解決~~

- コメントアウトしている部分が本番環境でうまく動作しなかった（開発環境では動作した）
- proxy 設定を無効にして、App.jsx に url を直書きすることで本番環境で問題なく動作した
- cors は設定済み

```js
// App.jsx

async function search(keyword) {
    try {
      // const res = await axios.get(`/search/${keyword}`)
      const res = await axios.get(`https://rakuten-api-proxy-practice-backend.kagome.workers.dev/search/${keyword}`)
      if (res.status === 200) {
        // レスポンスが成功した場合の処理
        setBooks(res.data.Items)
@@ -23,15 +23,8 @@ function App() {
    }
  }
```

```js
// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/search': {
  //       target: 'https://rakuten-api-proxy-practice-backend.kagome.workers.dev',
  //       changeOrigin: true,
  //     }
  //   }
  // }
});
```

## 結論

Vite の Server.proxy の設定は、ビルド時にパスの解決をしてくれるものではなかった。
なので、手動で設定する必要がある。
参考: https://github.com/vitejs/vite/discussions/8043

## 現状

以下のようにして解決

```js
// backend/index.js
// corsに本番環境のみ適用
app.use(
  cors({
    origin: "https://proxy-server-practice.pages.dev",
  })
);
```

```js
// vite.config.js
// 開発環境のcorsエラーはこちらで対応
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/search": {
        target: "https://rakuten-api-proxy-practice-backend.kagome.workers.dev",
        changeOrigin: true,
      },
    },
  },
});
```

```js
// App.jsx
const url = `${import.meta.env.VITE_SERVER_URL}/search/${keyword}`;
const { data, error, isLoading, mutate } = useSWR(url, fetcher);
```

```
// .env.development
VITE_SERVER_URL=''
```

```
// .env.production
VITE_SERVER_URL='https://rakuten-api-proxy-practice-backend.kagome.workers.dev'
```

注意

- `.env.[mode].local`は Git に無視されるので、push しても変更が反映されない
- もし環境変数を秘匿したい場合は、ホスティングサービスに手動で登録する必要がある
