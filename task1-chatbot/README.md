# Task 1: Iron Lady FAQ Chatbot

A responsive, interactive chatbot that answers frequently asked questions about Iron Lady's leadership programs.

## Features

### Core Features ✅
- **Interactive Chat Interface** - Real-time conversation experience
- **FAQ Response System** - Answers key questions about Iron Lady programs:
  - What programs does Iron Lady offer?
  - What is the program duration?
  - Is the program online or offline?
  - Are certificates provided?
  - Who are the mentors/coaches?

### Enhanced Features ✨
- **AI-like Conversation** - Natural language understanding with context awareness
- **Quick Question Buttons** - One-click access to common questions  
- **Typing Indicators** - Realistic chat experience with typing animations
- **Smart Pattern Recognition** - Handles greetings, gratitude, and farewells
- **Fallback Responses** - Helpful suggestions when questions aren't understood
- **Responsive Design** - Works perfectly on desktop and mobile devices

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with gradients and animations
- **Architecture**: Object-oriented JavaScript with clean separation of concerns
- **Storage**: In-memory JavaScript objects for FAQ data
- **AI Simulation**: Pattern matching and keyword recognition for intelligent responses

## How to Run

### Method 1: Direct File Opening
1. Navigate to the `task1-chatbot` directory
2. Double-click `index.html` to open in your default browser

### Method 2: Local Server (Recommended)
1. Navigate to the `task1-chatbot` directory
2. If you have Python installed:
   ```bash
   python -m http.server 8000
   ```
3. Open `http://localhost:8000` in your browser

### Method 3: Live Server Extension
1. Install Live Server extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## File Structure

```
task1-chatbot/
├── index.html          # Main HTML file with chatbot interface
├── styles.css          # CSS styling with responsive design
├── script.js           # JavaScript functionality and AI logic
└── README.md          # This documentation file
```

## Usage Instructions

### Getting Started
1. Open the chatbot in your browser
2. You'll see a welcome message with available question topics
3. Either type your question or use the quick buttons

### Asking Questions
- **Type naturally**: "What courses do you have?"
- **Use quick buttons**: Click pre-defined question buttons
- **Ask follow-ups**: The bot maintains conversation context

### Supported Question Types
- **Programs**: Information about available leadership programs
- **Duration**: Time commitment for each program
- **Format**: Online, offline, or hybrid learning options
- **Certificates**: Credentials and certifications provided
- **Mentors**: Information about instructors and coaches
- **Contact**: How to reach Iron Lady team
- **Applications**: How to apply or register

## AI Features Implemented

### Natural Language Processing
- **Keyword Recognition**: Identifies key terms in user queries
- **Context Awareness**: Understands conversation flow
- **Pattern Matching**: Recognizes greetings, thanks, and goodbyes
- **Smart Suggestions**: Provides helpful alternatives for unclear questions

### Conversation Intelligence
- **Multi-turn Conversations**: Handles follow-up questions
- **Contextual Responses**: Tailored answers based on question type
- **Fallback Handling**: Graceful responses to unrecognized queries
- **Dynamic Content**: Rich, formatted responses with emojis and structure

### User Experience Enhancements
- **Typing Simulation**: Realistic chat bot behavior
- **Instant Responses**: Quick buttons for common questions
- **Responsive Feedback**: Visual confirmation of user interactions
- **Smooth Animations**: Enhanced visual appeal

## Demo Scenarios

### Scenario 1: New User Inquiry
```
User: "Hi, what programs do you offer?"
Bot: Provides comprehensive list of all Iron Lady programs with details
```

### Scenario 2: Specific Information Request
```
User: "How long is the leadership program?"
Bot: Detailed breakdown of duration for each program type
```

### Scenario 3: Application Process
```
User: "How do I apply?"
Bot: Step-by-step application process with contact information
```

## Future Enhancements (If Node.js becomes available)

- **OpenAI API Integration**: Real AI-powered responses
- **Database Storage**: Persistent conversation history
- **Admin Panel**: FAQ management interface
- **Analytics**: User interaction tracking
- **Multi-language Support**: Localization features

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## Performance

- **Load Time**: < 1 second
- **Response Time**: Instant for FAQ matches
- **Memory Usage**: Minimal JavaScript footprint
- **Mobile Optimized**: Fully responsive design

---

**Created for Iron Lady AI & Technology Intern Assignment**  
*Demonstrates: Frontend development, AI simulation, UX design, responsive web development*
