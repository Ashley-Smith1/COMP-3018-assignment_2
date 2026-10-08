import app from "./app";

// Set the port number
const PORT: number = Number(process.env.PORT) || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});