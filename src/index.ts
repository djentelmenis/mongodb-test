import axios from 'axios';
import { MongoClient } from 'mongodb';
import { Item } from './types';

const mapSOData = (items: Item[]): { questions: any[]; answers: any[]; users: any[] } => {
  const questions: any[] = [];
  const answers: any[] = [];
  const users: any[] = [];

  const checkIfUserLogged = (newUser: Record<string, any>) => users.some((user) => user._id === newUser.user_id);

  items.forEach((item: Item) => {
    item?.answers?.forEach((answer) => {
      // Add answers
      answers.push({
        _id: answer.answer_id,
        question_id: answer.question_id,
        body_markdown: answer.body_markdown,
        creation_date: answer.creation_date,
        is_accepted: answer.is_accepted,
        score: answer.score,
        user_id: answer.owner.user_id,
      });

      // Add users
      if (!checkIfUserLogged(answer.owner))
        users.push({
          _id: answer.owner.user_id,
          display_name: answer.owner.display_name,
          reputation: answer.owner.reputation,
        });
    });

    // Arr questions
    questions.push({
      user_id: item.owner.user_id,
      comment_count: item.comment_count,
      answer_count: item.answer_count,
      creation_date: item.creation_date,
      title: item.title,
      body_markdown: item.body_markdown,
    });
  });

  return { questions, answers, users };
};

const SOUrl = 'https://api.stackexchange.com/2.2/questions?pagesize=100&order=desc&sort=creation&tagged=neo4j&site=stackoverflow&filter=!5-i6Zw8Y)4W7vpy91PMYsKM-k9yzEsSC1_Uxlf';
const mongoDBUrl = `mongodb://localhost:27017`;

const main = async () => {
  const response = await axios.get(SOUrl);

  const { questions, answers, users } = mapSOData(response.data.items);

  const client = await MongoClient.connect(mongoDBUrl);

  const db = client.db('testDb');
  await db.dropDatabase();

  const questionCollection = db.collection('questions');
  const answerCollection = db.collection('answers');
  const userCollection = db.collection('users');

  await questionCollection.insertMany(questions);
  await answerCollection.insertMany(answers);
  await userCollection.insertMany(users);

  client.close();
};

main();
