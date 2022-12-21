import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="A very beautiful places for getting together"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// export function getServerSideProps(context) {
//   const res = context.res;
//   const request = context.request;
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://erhan:070499@cluster0.1x98kyz.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db("MeetupDatabase");
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
