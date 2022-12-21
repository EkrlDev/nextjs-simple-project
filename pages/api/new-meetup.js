import { MongoClient } from "mongodb";

async function handler(req, res) {
  if ((req.method = "POST")) {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://erhan:070499@cluster0.1x98kyz.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db("MeetupDatabase");
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    client.close();
    res.status(201).json({ message: "Meetup inserted successfully" });
  }
}

export default handler;
