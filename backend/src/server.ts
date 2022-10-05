import app from "./app";

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server reporting at ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
