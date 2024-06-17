https://dev.classmethod.jp/articles/resolved-tanstack-query-v5-undefined-type-issue/
https://github.com/diggymo/tanstack-query-v5-suspense-survey/blob/main/src/App.tsx

## Error Boundary について

Suspense 機能でローディング画面の条件分岐は簡略化できましたが、エラーハンドリング部分については Suspense の責務外です。

```js
if (status === "pending") {
  return <Loading />;
}
// ↓ここ
if (status === "error") {
  return <Error />;
}
return <Content />;
```

これも簡単に書きたいところですが、React 標準ではクラスコンポーネントでしかエラーバウンダリーを書くことができないらしいです。

> 現在、関数コンポーネントとしてエラーバウンダリを書く方法はありません。
> [React - 補足](https://ja.react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)

なので代わりに react-error-boundary というライブラリを使用します。  
React 公式もこのライブラリ使ってねーって言ってます。

## react-error-boundary とは

関数コンポーネントとしてエラーバウンダリーを記述できるライブラリです。  
`npm install`して使います。

引数を持たないシンプルな実装は以下の通りです。

```js
import { ErrorBoundary } from "react-error-boundary";

<ErrorBoundary fallback={<div>Something went wrong</div>}>
  <ExampleApplication />
</ErrorBoundary>;
```

引数を持つ実装などは [公式 GitHub の README](https://github.com/bvaughn/react-error-boundary) を参照してください。

## ReactQuery で react-error-boundary を使う

throwOnError オプションは、デフォルトではエラーが発生したら必ずエラー境界に投げるわけではなく、
キャッシュにデータがある場合はエラーを投げないように設定されています。
このため、エラーを全てエラー境界で処理したい場合には、手動でエラーを投げる必要があります。
