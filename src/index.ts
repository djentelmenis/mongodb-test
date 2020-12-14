import axios from 'axios';
import { MongoClient } from 'mongodb';
import { Item } from './types';

const mapSOData = (items: Item[]): any[] => {
  return items.map((item: Item) => {
    return {
      comment_count: item.comment_count,
      answer_count: item.answer_count,
      creation_date: item.creation_date,
      title: item.title,
      body_markdown: item.body_markdown,
      answers: item?.answers?.map((answer) => {
        return {
          _id: answer.answer_id,
          question_id: answer.question_id,
          body_markdown: answer.body_markdown,
          creation_date: answer.creation_date,
          is_accepted: answer.is_accepted,
          score: answer.score,
          user_id: answer.owner.user_id,
          owner: {
            _id: answer.owner.user_id,
            display_name: answer.owner.display_name,
            reputation: answer.owner.reputation,
          }
        };
      })
    }
  });
};

const SOUrl = 'https://api.stackexchange.com/2.2/questions?pagesize=100&order=desc&sort=creation&tagged=neo4j&site=stackoverflow&filter=!5-i6Zw8Y)4W7vpy91PMYsKM-k9yzEsSC1_Uxlf';
const mongoDBUrl = `mongodb://localhost:27017`;

const main = async () => {
  const response = await axios.get(SOUrl);
  const posts = mapSOData(response.data.items);

  const client = await MongoClient.connect(mongoDBUrl);

  const db = client.db('testDb');
  await db.dropDatabase();

  const postsCollection = db.collection('posts');
  await postsCollection.insertMany(posts);

  client.close();
};

main();
