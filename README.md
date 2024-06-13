## 未解決

- コメントアウトしている部分が本番環境でうまく動作しなかった（開発環境では動作した）
- proxy 設定を無効にして、App.jsx に url を直書きすることで本番環境で問題なく動作した

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
