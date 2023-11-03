import Header from "./header";

export default function CreationsLayout(props) {
  return (
    <>
      <Header />
      <main className="flex flex-col justify-end">
        <div>{props.children}</div>
      </main>
    </>
  );
}
