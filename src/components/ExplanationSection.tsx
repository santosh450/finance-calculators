interface Props {
  title: string;
  content: string;
}

export default function ExplanationSection({ title, content }: Props) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <p className="text-gray-600 leading-7">{content}</p>
    </section>
  );
}
