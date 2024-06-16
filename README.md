# ReactQuery について

## TanStackQuery ≒ ReactQuery

- 元々は React 専用のデータフェッチングライブラリで、ReactQuery という名前でした。
- Vue や Angular、Svelte など色んな JS フレームワークで使用できるようになり、名前を TanStackQuery に改名しました。

## Suspense 機能について

React の標準機能に Suspense という機能があります。  
具体的には以下のような条件分岐を

```js
if (status === "pending") {
  return <Loading />;
}
if (status === "error") {
  return <Error />;
}
return <Content />;
```

以下のように

```js
<Suspense fallback={<Loading />}>
  <Content />
</Suspense>
```

書くことができる、という機能です。

### Suspense のメリット

多分、めちゃくちゃ大雑把にまとめるとコードが簡単になる、ということだと思います……。
詳しくは[公式ドキュメント](https://ja.react.dev/reference/react/Suspense)を読んでください。
想像以上に複雑な話っぽいので調査中です。

## ReactQuery で Suspense 機能を使う

ReactQuery のデータフェッチングと一緒に Suspense 機能を使う場合、以下の選択肢があります

1. Suspense モードを有効にして、React 標準の Suspense 機能を使う
   -> useQuery（ReactQuery） + Suspense（React）
2. ReactQuery が提供している[^1]フックを使う
   -> useSuspenseQuery（ReactQuery）

なにか制約がない限り、基本的には 2 を利用すれば良いと思います。

<details>

<summary>useSuspenseQueryを選択する理由 （クリックで開きます）</summary>

理由としては、React の Suspense はまだ未完全（？）で、Next.js と Relay でのフェッチデータと、lazy や use を用いたデータ以外はサポート対象外であり不安定であると述べているからです。[参照](https://ja.react.dev/reference/react/Suspense)

また、[Suspensive[^1]の公式ドキュメント](https://suspensive.org/docs/react-query/useSuspenseQuery)には以下のようなことが書いてありました。

```js
// SuspenseモードでReact公式のSuspenseを使う場合

function App() {
  const { data } = useQuery({
    queryKey: "exampleKey",
    queryFn: fetchExampleData,
    suspense: true,
  });

  return (
    <p>{data}</p> // undefined
  );
}
// {data}を<Suspense>で囲ったとしても、型は TData | undefinedとなる
```

```js
// useSuspenseQueryを使う場合

function App() {
  const { data } = useSuspenseQuery({
    queryKey: "exampleKey",
    queryFn: fetchExampleData,
  });

  return (
    <p>{data}</p> // TData
  );
}

// {data}を<Suspense>で囲まなくても undefinedを返さないらしい
```

ただの推測ですが、Suspense 使用時に{data}の型が TData にならないことは、 React 公式が ReactQuery をサポートしてないことに起因しているのではないかなと思いました。  
とりあえず強いこだわりがない限り、ReactQuery に最適化された useSuspenseQuery を使っておくのが良いと思います。  
（私は TypeScript 使ってないので、よくわかりません）

</details>

[^1]: ReactQuery v4（現在は v5） までは、 [Suspensive](https://suspensive.org/) というライブラリを`npm install`することによって useSuspenseQuery を利用することが可能でした。ReactQuery v5 から、Suspensive の Suspense 機能は ReactQuery の標準機能となり、インストールが不要になりました。

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
