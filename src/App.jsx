function App() {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-red-600">Hello World</h1>
        <input
          type="checkbox"
          value="light"
          className="toggle theme-controller"
        />
        <div className="flex">
          <button className="btn">คลิกฉัน</button>
          <button className="btn btn-neutral">Neutral</button>
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-secondary">Secondary</button>
          <button className="btn btn-accent">Accent</button>
          <button className="btn btn-ghost">Ghost</button>
          <button className="btn btn-link">Link</button>
        </div>
      </div>
    </>
  );
}

export default App;
