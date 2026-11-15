import { useState } from 'react'
import './FAQ.css'

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null)

  const questions = [
    {
      question: 'What is Netflix?',
      answer: 'Netflix is a streaming service that offers movies, TV shows and more.'
    },
    {
      question: 'How much does Netflix cost?',
      answer: 'Netflix offers different subscription plans based on your needs.'
    },
    {
      question: 'Where can I watch?',
      answer: 'You can watch Netflix on smart TVs, phones, tablets and computers.'
    },
    {
      question: 'How do I cancel?',
      answer: 'You can cancel your membership anytime through your account.'
    },
    {
      question: 'What can I watch on Netflix?',
      answer: 'You can watch movies, series, documentaries and much more.'
    },
    {
      question: 'Is Netflix good for kids?',
      answer: 'Netflix offers kids profiles with family-friendly entertainment.'
    }
  ]

  function handleFAQ(index) {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>

      <div className="faq-list">
        {questions.map((item, index) => (
          <div className="faq-item" key={index}>
            <div
              className="faq-question"
              onClick={() => handleFAQ(index)}
            >
              <h3>{item.question}</h3>
              <span>{activeIndex === index ? '×' : '+'}</span>
            </div>

            {activeIndex === index && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQ