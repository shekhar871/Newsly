# Newsly
# Newsly – Tech News Summarizer

## Project Overview

Newsly is a web application that helps users stay updated with the latest technology news in a faster and simpler way. Instead of reading long articles, users can view short AI-generated summaries and quickly understand key information.

The goal of this project is to combine real-time data from news APIs with AI-based summarization to create a more efficient news reading experience.

---

## Problem Statement

Many tech articles are long and time-consuming to read. Users often want quick insights without going through full content.

Newsly solves this by providing:

* Real-time news updates
* Short and clear summaries
* Easy browsing of trending topics

---

## APIs Used

This project uses the following public APIs:

* **GNews API**
  Used to fetch the latest technology news articles based on keywords and categories.

* **Google Gemini API**
  Used to generate concise summaries of news articles using AI.

---

## Planned Features

The application will include:

* News search functionality (by keyword)
* Category-based filtering (e.g., AI, startups, gadgets)
* AI-generated summaries for each article
* Clean and responsive UI for better readability
* “Read more” link to original article

---

## Future Enhancements

* Save/bookmark articles
* Personalized news feed
* Dark mode toggle
* Trending topics section

---

## Tech Stack

Frontend:

* React.js
* Tailwind CSS

API Integration:

* Fetch / Axios

Tools:

* GitHub for version control
* Vercel or Netlify for deployment

---

## Project Structure (Planned)

```id="m1p7x2"
newsly/
│── public/
│── src/
│   ├── components/
│   ├── pages/
│   ├── services/   # API calls
│   ├── utils/
│   └── App.js
│── package.json
│── README.md
```

---

## Setup Instructions

```id="d9q4lm"
git clone https://github.com/your-username/newsly.git
cd newsly
npm install
npm run dev
```

Create a `.env` file and add:

```id="k2v8hs"
VITE_GNEWS_API_KEY=your_api_key
VITE_GEMINI_API_KEY=your_api_key
```

---

## Notes

This milestone focuses on planning and structuring the project. Implementation will be done in the next stages.

The project is designed to support features like search and filtering, which will be expanded in future milestones.
