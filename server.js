// Import the Express module
const express = require("express");

// Import the file system module
const fs = require("fs");

// Import the path module to work with file paths
const path = require("path");

// Import uuid to generate a unique ID for each note
const { v4: uuidv4 } = require("uuid");

// Create an Express application
const app = express();

// Set the port number for the server
const PORT = 3001;

// Allow the server to read JSON data from requests
app.use(express.json());

// Serve all files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Path to the JSON file used to store notes
const dataFilePath = path.join(__dirname, "data.json");

// Read notes from the JSON file
// Function to read data from the JSON file
const readData = () => {
  // Return an empty array if the file doesn't exist
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }

  // Read the file
  const data = fs.readFileSync(dataFilePath, "utf8");

  // Return an empty array if the file is empty
  if (data.trim() === "") {
    return [];
  }

  // Convert the JSON data into a JavaScript object
  return JSON.parse(data);
};
// Save notes to the JSON file
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Serve the home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Get all saved notes
app.get("/data", (req, res) => {
  const data = readData();
  res.json(data);
});

// Add a new note
app.post("/data", (req, res) => {
  // Create a new note with a unique ID
  const newData = { id: uuidv4(), ...req.body };

  // Get the existing notes
  const currentData = readData();

  // Add the new note
  currentData.push(newData);

  // Save the updated notes
  writeData(currentData);

  // Send a success response
  res.json({ message: "Data saved successfully", data: newData });
});

// Update a note
app.put("/data/:id", (req, res) => {
  const currentData = readData();
  const noteId = req.params.id;

  const noteIndex = currentData.findIndex((note) => note.id === noteId);

  if (noteIndex === -1) {
    return res.status(404).json({ message: "Note not found" });
  }

  currentData[noteIndex] = {
    ...currentData[noteIndex],
    ...req.body,
  };

  writeData(currentData);

  res.json({
    message: "Note updated successfully",
    data: currentData[noteIndex],
  });
});

// Delete a note
app.delete("/data/:id", (req, res) => {
  const currentData = readData();
  const noteId = req.params.id;

  const updatedData = currentData.filter((note) => note.id !== noteId);

  if (currentData.length === updatedData.length) {
    return res.status(404).json({ message: "Note not found" });
  }

  writeData(updatedData);

  res.json({ message: "Note deleted successfully" });
});
// Return the same data that was sent in the request
app.post("/echo", (req, res) => {
  res.json({ received: req.body });
});

// Handle routes that don't exist
// app.all("*", (req, res) => {
//   res.status(404).send("Route not found");
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
