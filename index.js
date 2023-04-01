import express from "express";
const app=express();

const PORT=4000;

app.use(express.json());

//Mongodb connection
 const MONGO_URL="mongodb://127.0.0.1";
 async function createConnection(){
  const client=new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo is connected😃");
  return client;
 }
 const client= await createConnection();

app.get("/",function(request,response){
    response.send("hi world");
});
app.listen(PORT, ()=>console.log
('Server started🙂')
);

//api to create a room
app.post("/createRoom", async function (req, res) {
    const room_data=request.body;
    const result=await client
                .db("Hotel A")
                .collection("room_details")
                .insertMany(room_data);
    res.status(200).json({ output: 'Room Created Successfully'}) 
});

//Booking a room
app.post("/bookRoom", async function (req, res) {
    const book_room=request.body;
    const result=await client
                .db("Hotel A")
                .collection("book_room")
                .insertMany(book_room);
    res.status(200).json({ output: 'Room Booked Successfully'}) 
});

//List all rooms with booked data & List all customers
app.get("/booked_rooms", async function(request, response) {
    try{
    const booked_rooms=await client
                        .db("Hotel A")
                        .collection("book_room")
                        .find({})
                        .toArray();                 
    const booked_rooms_sorted = booked_rooms.sort((a, b) => a.roomNo - b.roomNo);
    response.send(booked_rooms_sorted);
    }catch(err){
      console.log(err);
    }
  });

