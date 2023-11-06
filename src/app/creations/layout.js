import Header from "./header";

export default function CreationsLayout(props) {
  return (
    <div className="flex flex-col items-center">
      <Header className />
      <main className="flex flex-row">{props.children}</main>
    </div>
  );
}
