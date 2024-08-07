import productsData from "../../public/productsFile.json"
import tags from "../../public/tagsFile.json"

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  const resultProducts = productsData.filter((product) => {
    const tag = tags.find((tag) => tag.name === query);
    const searchTerm = tag ? tag.id : query;
    return ["title", "caption"].some((key) => product[key].toLowerCase().includes(searchTerm.toLowerCase()));
  })

  res.status(200).json(resultProducts)
}
