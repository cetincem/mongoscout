# MongoScout

**MongoScout** is an intelligent exploration and analysis tool for MongoDB. It automatically discovers collections, analyzes document structure, detects relationships, and uses AI to generate meaningful business questions with scoring.

---

## 🚀 Features

* 🔍 **Schema Discovery**: Lists collections and inspects sample documents
* 📊 **Field Analysis**: Identifies top field values, data types, and trends
* 🔗 **Relationship Detection**: Finds links between collections (e.g. `user_id → users._id`)
* 🤖 **AI-Powered Question Generator**: Uses ChatGPT to generate high-value questions from your schema
* 🧠 **Scored Insights**: Each question is scored by relevance, insight depth, relationship use, and chartability

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
│   └── questions.ts         # AI-powered question generation
└── utils/
    └── llm.ts               # OpenAI integration
```

---

## 📈 Example Output

```bash
🤖 Smart AI Questions:
- What are the most active markets based on the number of activities? (score: 18)
- What is the trend of activities over time? (score: 17)
- What is the average activity per user? (score: 16)
...
```

---

## 📌 Roadmap Ideas

* [ ] Auto-generate MongoDB queries for each question
* [ ] Export insights as JSON or Markdown
* [ ] Web UI with visual dashboards
* [ ] Integration with chart libraries (e.g. Chart.js, ECharts)

---

## 📃 License

MIT
