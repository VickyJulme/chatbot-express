const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5005;

app.use(bodyParser.json());
app.use(cors());

const qa = [
    {
        "question": "What courses do you offer?",
        "answer": "We offer HR, Data Science, Marketing, UI/UX, Finance, Front-End Development, AIML, and Full-Stack Development. For more details, visit: <a href='https://hubnex.in/' target='_blank' rel='noopener noreferrer'>Courses Page</a>"
      },
      {
        "question": "Who are the mentors?",
        "answer": "Our mentors are experienced professionals with expertise in various fields. They offer valuable guidance to help you succeed... For more information, visit our Mentor page: <a href='https://maangler.in/campus-ambassador' target='_blank' rel='noopener noreferrer'>Mentors Page</a>"
      },
      {
        "question": "How can I enroll?",
        "answer": "You can enroll by visiting our enrollment page and following the instructions. <a href='http://www.example.com/enroll' target='_blank' rel='noopener noreferrer'>Enrollment Page</a>"
      },
      {
        "question": "What is the fee structure?",
        "answer": "The fee structure varies by course. Please visit our fee structure page for more details: <a href='http://www.example.com/fees' target='_blank' rel='noopener noreferrer'>Fee Structure Page</a>"
      },
      {
        "question": "Is there a certificate upon completion?",
        "answer": "Yes, upon successful completion of the course, you will receive a certificate recognizing your achievement."
      }
];

app.post('/api/chat', (req, res) => {
  const { question } = req.body; 
  const response = qa.find(q => q.question.toLowerCase() === question.toLowerCase());
  if (response) {
    res.json({ answer: response.answer, options: response.options || [] });
  } else {
    res.json({ answer: " Please click the 'Click here to proceed' button for more options." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
