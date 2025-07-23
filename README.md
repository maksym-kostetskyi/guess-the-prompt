# Guess the Prompt

An interactive multiplayer web game where players create AI-generated images from prompts and compete to guess each other's prompts.

## 🎮 Project Overview

**Guess the Prompt** is a session-based multiplayer game that combines creativity and deduction. Players take turns creating prompts for AI image generation, while others attempt to guess the original prompts based on the generated images. The game features real-time multiplayer functionality with WebSocket connections, allowing for seamless collaborative gameplay.

## 🌐 Live Demo

[Play Now](https://guess-the-prompt-lf0nyrtda-mkost996-gmailcoms-projects.vercel.app//) - Hosted on Vercel

## 👨‍💻 Development

**Frontend Development**: [@maksym-kostetskyi](https://github.com/maksym-kostetskyi)

**Backend Development**: [@Profy8712](https://github.com/Profy8712/guess-the-prompt-backend)

## ✨ Features

### 🏠 Room Management

- **Create Room**: Start a new game session with customizable settings
- **Join Room**: Enter existing rooms using room ID
- **Copy Room ID**: Share room codes with friends via clipboard
- **Leave Room**: Exit current game session

### 👥 Player Management

- **Anonymous Play**: Quick start without registration
- **User Accounts**: Register and login for persistent stats
- **Admin Controls**: Room creators can manage game settings
- **Kick Players**: Admins can remove disruptive players
- **Player Stats**: Track games played and total scores

### 🎯 Game Features

- **Customizable Settings**:
  - Round count (5-10 rounds)
  - Prompt words (1-2 words)
  - Turn length (60-120 seconds)
- **Real-time Timer**: Live countdown for each turn
- **Image Generation**: AI-powered image creation from prompts
- **Score Tracking**: Points awarded for successful guesses
- **Final Score Screen**: Highlighted winner with complete rankings
- **Game Restart**: Admins can restart games for multiple rounds

### 🔄 Real-time Features

- **WebSocket Integration**: Live game updates and events
- **Player Status**: Real-time player joining/leaving notifications
- **Auto-kick Detection**: Automatic redirect when kicked from room
- **Game State Sync**: Synchronized game progress across all players

## 🛠 Technologies Used

### Frontend

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Chakra UI v3** - Modern component library
- **React Router Dom** - Client-side routing
- **React Icons** - Icon library

### Development Tools

- **ESLint** - Code linting and formatting
- **TypeScript Compiler** - Type checking
- **Vite TSConfig Paths** - Path mapping support

### Backend Integration

- **WebSocket API** - Real-time communication
- **REST API** - HTTP endpoints for game actions
- **Authentication** - Token-based user sessions

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (version 22.17.0 or higher)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/maksym-kostetskyi/guess-the-prompt.git
   cd guess-the-prompt
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 🎯 How to Play

1. **Join or Create**: Either create a new room or join an existing one with a room ID
2. **Set Rules**: Room admin configures game settings (rounds, words, time)
3. **Start Game**: Admin begins the game session
4. **Take Turns**: Each player creates prompts while others guess
5. **Score Points**: Earn points when someone guesses your prompt correctly
6. **Win**: Player with the highest score wins!
