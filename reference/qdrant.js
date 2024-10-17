const { QdrantClient } = require("@qdrant/js-client-rest");

// Initialize Qdrant client
const client = new QdrantClient({ url: "http://localhost:6333" });

// Collection name
const COLLECTION_NAME = "my_collection";

// Function to create a collection
async function createCollection() {
  await client.createCollection(COLLECTION_NAME, {
    vectors: {
      size: 384,
      distance: "Cosine"
    }
  });
  console.log("Collection created successfully");
}

// Function to add points (vectors) to the collection
async function addPoints() {
  const points = [
    {
      id: 1,
      vector: Array(384).fill(0).map(() => Math.random()),
      payload: { text: "First document" }
    },
    {
      id: 2,
      vector: Array(384).fill(0).map(() => Math.random()),
      payload: { text: "Second document" }
    }
  ];

  await client.upsert(COLLECTION_NAME, {
    wait: true,
    points: points
  });
  console.log("Points added successfully");
}

// Function to search for similar vectors
async function searchSimilar(queryVector) {
  const searchResult = await client.search(COLLECTION_NAME, {
    vector: queryVector,
    limit: 5
  });
  console.log("Search results:", searchResult);
  return searchResult;
}

// Main function to demonstrate usage
async function main() {
  try {
    // Create collection
    await createCollection();

    // Add points
    await addPoints();

    // Search for similar vectors
    const queryVector = Array(384).fill(0).map(() => Math.random());
    await searchSimilar(queryVector);

  } catch (error) {
    console.error("Error:", error);
  }
}

main();