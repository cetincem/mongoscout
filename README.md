# MongoScout

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.x-green.svg)](https://nodejs.org/)
[![OpenAI GPT-4](https://img.shields.io/badge/ai-gpt4-orange)](https://openai.com)

**MongoScout** is an intelligent exploration and analysis tool for MongoDB. It automatically discovers collections, analyzes document structure, detects relationships, and uses AI to generate meaningful business questions with scoring.

---

## 🚀 Features

* 🔍 **Schema Discovery**: Lists collections and inspects sample documents
* 📊 **Field Analysis**: Identifies top field values, data types, and trends
* 🔗 **Relationship Detection**: Finds links between collections (e.g. `user_id → users._id`)
* 🤖 **AI-Powered Insight Generator**: Uses ChatGPT to generate high-value questions from your schema
* 🧠 **Business-Focused Questions**: Questions are designed to guide decision-making and reveal growth opportunities
* 📈 **Scored Insights**: Each question is rated by relevance, depth, relational complexity, and visualization potential

---

## 🛠 Tech Stack

* Node.js + TypeScript
* MongoDB (local or Atlas)
* OpenAI GPT-4 (via API)

---

## 📦 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/mongoscout.git
cd mongoscout
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Environment Variables

Create a `.env` file:

```env
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
OPENAI_API_KEY=sk-...
```

### 4. Run the Project

```bash
npm run dev
```

---

## 📂 Project Structure

```
src/
├── index.ts                 # Entry point
├── config.ts                # (optional for future configs)
├── mongo/
│   ├── connector.ts         # Connect to MongoDB
│   ├── discover.ts          # Discover collections and fields
│   ├── analyzer.ts          # Field value distributions
│   └── relationships.ts     # Detect cross-collection links
├── generator/
│   └── questions.ts         # Question creation helpers
└── utils/
    └── llm.ts               # OpenAI integration for smart questions
```

---

## 📊 Example Output

<details>
<summary>🧠 Sample Output</summary>

```bash
📊 Strategic Business Questions:
- What is the growth rate of markets in different countries?
  🔹 Relevance: 5
  🔹 Insight Depth: 4
  🔹 Relationships: 3
  🔹 Visualization Fit: 5
  🔸 Total Score: 17

- How many unique users engage with each market over a specific period?
  🔹 Total Score: 16
...
```

</details>

---

## 📌 Roadmap Ideas

* [ ] Generate aggregation queries from selected questions
* [ ] Export results as JSON/CSV/Markdown
* [ ] Web UI for interactive question selection and chart display
* [ ] Smart tagging of questions by business area (growth, engagement, etc.)
* [ ] Add filters (score, type, collection, business focus)
* [ ] Implement step-based caching to avoid rerunning discovery every time

---

## 📃 License

MIT
