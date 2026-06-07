interface FAQ {
  question: string;
  answer: string;
}

interface Props {
  faqs: FAQ[];
}

export default function FaqSection({ faqs }: Props) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

      <div className="space-y-6">
        {faqs.map((faq) => (
          <div key={faq.question}>
            <h3 className="font-semibold text-lg">{faq.question}</h3>

            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
