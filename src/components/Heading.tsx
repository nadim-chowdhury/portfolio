export default function Heading({ title }: any) {
  return (
    <div className="my-10 flex items-center justify-center">
      <h1 className="text-3xl font-bold text-center tracking-wider bg-gradient-to-tr from-teal-600 to-cyan-600 inline-block text-transparent bg-clip-text">
        {title}
      </h1>
    </div>
  );
}
