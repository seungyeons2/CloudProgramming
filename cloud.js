const express = require("express");
const app = express();

app.listen(8080, () => {
  console.log("http://localhost:8080 에서 서버 실행중!!");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname + "/public"));

// MongoDB 연결

const { MongoClient } = require("mongodb");

let db;
const url =
  "mongodb+srv://admin:1345@cluster0.08ymak3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

new MongoClient(url)
  .connect()
  .then((client) => {
    console.log("DB 연결 성공");
    db = client.db("forum1");

    // app.listen(8080, () => {
    //   console.log("http://localhost:8080 에서 서버 실행중!!");
    // });
  })
  .catch((err) => {
    console.log("DB 연결 실패:", err);
  });

// api
app.get("/news1", (req, res) => {
  db.collection("post2")
    .insertOne({ title: "제목입니다.1" })
    .then((result) => {
      res.send("데이터 삽입 완료");
    })
    .catch((error) => {
      res.send("데이터 삽입 중 오류 발생");
    });
});

// 클라이언트가 /news1 경로로 GET 요청을 보내면,
// MongoDB의 post2 컬렉션에 {title: '제목입니다.1'}이라는
// 문서를 삽입하는 작업이 실행됨
// 이 코드의 목적은 사용자가 /news1 URL을 호출할 때마다
// post2라는 컬렉션에 새로운 문서를 추가하는 것

app.get("/news2", (req, res) => {
  db.collection("post2")
    .insertOne({ title: "제목입니다.2" })
    .then((result) => {
      res.send("데이터 삽입 완료");
    })
    .catch((error) => {
      res.send("데이터 삽입 중 오류 발생");
    });
});

// // 컬렉션에 있던 document 전부 출력하시오.
// app.get("/list", async (req, res) => {
//   let result = await db.collection("post").find().toArray();
//   res.send(result[0].title);
// });

app.get("/about", (req, res) => {
  res.send("about");
});

app.get("/news", (req, res) => {
  res.send("raining");
});

app.get("/shop", (req, res) => {
  res.send("쇼핑 페이지입니다.");
});

// // DB의 모든 게시물 가져오기
// app.get("/list", async (req, res) => {
//   let result = await db.collection("post2").find().toArray();
//   console.log(result);
//   res.send("DB 게시물, 첫글 : " + result[0].title);
//   //res.send(result[0].title);
// });

// ejs 세팅
app.set("view engine", "ejs");

// app.get("/list", (req, res) => {
//   res.render("list.ejs");
// });

// ejs 파일로 데이터 전송

app.get("/list", async (req, res) => {
  let result = await db.collection("post2").find().toArray();
  res.render("list.ejs", { 문서목록: result });
});
