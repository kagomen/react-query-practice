const Error = (props) => {
  return (
    <div className="m-8">
      <p>何かがおかしいようです</p>
      <pre>error message: {props.error.message}</pre>
      <button
        onClick={() => {
          props.resetErrorBoundary()
          props.reset()
        }}
        className="border border-stone-700 px-2 py-1"
      >再試行する</button>
    </div>
  )
}
export default Error