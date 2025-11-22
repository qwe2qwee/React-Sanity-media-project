# ShareMe - Social Media Image Sharing Platform

A full-stack Pinterest-style social media application built with React and Sanity CMS. Users can share, save, and discover images across various categories.

## Demo

![ShareMe App](media-project/sharme_frontend/public/camera.png)

## Features

- **Google Authentication** - Secure sign-in with Google OAuth
- **Create & Upload Pins** - Share images with titles, descriptions, and categories
- **Save Pins** - Save your favorite pins to your profile
- **Comments** - Engage with other users through comments
- **Search** - Find pins by title, category, or description
- **Categories** - Browse content by categories:
  - Cars, Fitness, Wallpapers, Websites
  - Photo, Food, Nature, Art
  - Travel, Quotes, Cats, Dogs, and more
- **User Profiles** - View created and saved pins
- **Responsive Design** - Mobile-friendly with sidebar navigation
- **Masonry Layout** - Beautiful grid display for pins

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| React Router v6 | Navigation |
| Tailwind CSS | Styling |
| React Icons | Icons |
| React Masonry CSS | Grid Layout |
| Sanity Client | Backend Connection |

### Backend
| Technology | Purpose |
|------------|---------|
| Sanity CMS | Headless CMS |
| GROQ | Query Language |
| Sanity Image URL | Image Optimization |

## Project Structure

```
media-project/
├── sharme_frontend/          # React Frontend
│   ├── src/
│   │   ├── assets/           # Images & Videos
│   │   ├── components/       # React Components
│   │   │   ├── Login.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Feed.jsx
│   │   │   ├── Pin.jsx
│   │   │   ├── PinDetail.jsx
│   │   │   ├── CreatePin.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── UserProfile.jsx
│   │   │   └── MasonryLayout.jsx
│   │   ├── container/        # Page Containers
│   │   │   ├── Home.jsx
│   │   │   └── Pins.jsx
│   │   ├── utils/            # Utilities & Queries
│   │   │   ├── data.js       # GROQ Queries
│   │   │   └── fetchUser.js
│   │   ├── client.js         # Sanity Client Config
│   │   └── App.js            # Main App Component
│   └── public/
│
└── sharme_backend/           # Sanity Backend
    └── backend-shareme/
        └── schemas/          # Data Models
            ├── pin.js        # Pin Schema
            ├── user.js       # User Schema
            ├── comment.js    # Comment Schema
            ├── save.js       # Save Schema
            └── postedBy.js   # PostedBy Reference
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Cloud Console account (for OAuth)
- Sanity account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/qwe2qwee/React-Sanity-media-project.git
   cd React-Sanity-media-project/media-project
   ```

2. **Setup Backend (Sanity)**
   ```bash
   cd sharme_backend/backend-shareme
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../../sharme_frontend
   npm install
   ```

4. **Environment Variables**

   Create `.env` file in `sharme_frontend/`:
   ```env
   REACT_APP_GOOGLE_API_TOKEN=your_google_client_id
   REACT_APP_SANITY_PROJECT_ID=your_sanity_project_id
   REACT_APP_SANITY_TOKEN=your_sanity_token
   ```

### Running the Application

1. **Start Sanity Studio** (Backend)
   ```bash
   cd sharme_backend/backend-shareme
   npm run dev
   ```
   Sanity Studio will be available at `http://localhost:3333`

2. **Start React App** (Frontend)
   ```bash
   cd sharme_frontend
   npm start
   ```
   The app will be available at `http://localhost:3000`

## Data Models

### Pin
```javascript
{
  title: String,
  about: String,
  destination: URL,
  category: String,
  image: Image,
  userId: String,
  postedBy: Reference(User),
  save: Array[Save],
  comments: Array[Comment]
}
```

### User
```javascript
{
  userName: String,
  image: String (URL)
}
```

## Available Scripts

### Frontend
| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run tests |

### Backend
| Command | Description |
|---------|-------------|
| `npm run dev` | Start Sanity Studio |
| `npm run build` | Build Sanity Studio |
| `npm run deploy` | Deploy to Sanity |

## Deployment

### Frontend
The frontend can be deployed to platforms like:
- Netlify
- Vercel
- GitHub Pages

### Backend
Deploy Sanity Studio:
```bash
cd sharme_backend/backend-shareme
npm run deploy
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and unlicensed.

## Acknowledgments

- Inspired by Pinterest
- Built with Sanity CMS
- Styled with Tailwind CSS
