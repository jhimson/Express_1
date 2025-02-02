const express = require('express');
const port = 3000;
const app = express();

app.get('/greeting/:name', (req, res) => {
  res.send(`Hello, ${req.params.name}`);
});

app.get('/tip/:total/:tipPercentage', (req, res) => {
  let { total, tipPercentage } = req.params;
  res.send(`Tip: $${(total * tipPercentage) / 100}`);
});

app.get('/magic/:question', (req, res) => {
  const magicBallResponses = [
    'It is certain',
    'It is decidedly so',
    'Without a doubt',
    'Yes definitely',
    'You may rely on it',
    'As I see it yes',
    'Most likely',
    'Outlook good',
    'Yes',
    'Signs point to yes',
    'Reply hazy try again',
    'Ask again later',
    'Better not tell you now',
    'Cannot predict now',
    'Concentrate and ask again',
    "Don't count on it",
    'My reply is no',
    'My sources say no',
    'Outlook not so good',
    'Very doubtful',
  ];

  res.send(
    `<h1>${
      magicBallResponses[Math.floor(Math.random() * magicBallResponses.length)]
    }</h1>`
  );
});

app.get('/trivia/questions', (req, res) => {
  const getTrivia = async () => {
    try {
      const response = await axios.get('http://jservice.io/api/random');
      console.log(response.data);
      const { question, answer } = response.data[0];
      res.send(`
          <h1>Question: ${question} </h1>
          <h2>Answer: ${answer} </h2>
        `);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  getTrivia();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
