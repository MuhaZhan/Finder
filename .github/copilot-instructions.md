# Copilot Instructions for Finder FTC

## Project Overview
**Finder FTC** is a Node.js/Express backend service for discovering FTC (FIRST Tech Challenge) mentors. It provides a RESTful API to retrieve mentor profiles with specializations (Programming, Engineering, Strategy).

**Core Architecture:**
- **Server:** Express.js running on port 3000 ([server.js](../server.js))
- **Static Assets:** Served from `public/` directory via Express static middleware
- **API Pattern:** Simple REST endpoints returning JSON mentor data
- **Data Source:** In-memory array of mentor objects (no database currently)

## Essential Commands
```bash
npm start          # Start server at http://localhost:3000
npm install        # Install dependencies (Express)
```

## Project Patterns & Conventions

### API Data Structure
Mentors follow this structure:
```javascript
{ 
  name: string,           // Full name
  role: string,          // Job title (e.g., "Programming Mentor")
  experience: string,    // Credential (e.g., "FTC Coach • 5 years")
  description: string    // Specializations/focus areas
}
```

### Middleware Order (Critical!)
The comment "← важно!" on line 7 highlights a critical pattern:
1. **Static middleware first** (`express.static("public")`) - serves frontend files
2. **JSON parser second** (`express.json()`) - for API request body parsing

**Why:** Static middleware intercepts requests to `/public/*`. If JSON middleware runs first, it unnecessarily processes file requests.

### Endpoint Pattern
- **GET /api/mentors** - Returns array of all mentor objects
- No authentication/authorization currently implemented
- No request validation or error handling (add if expanding)

## Development Notes

### Adding New Features
1. **New API endpoints:** Add `app.get()` or `app.post()` after line 11, before `app.listen()`
2. **Mentor data expansion:** Currently hardcoded array; would need database integration for persistence
3. **Frontend files:** Place in `public/` directory; automatically served at root path

### Common Issues
- **Port 3000 in use:** Server will fail silently; check `npm start` output
- **Public folder missing:** Static middleware won't error but `/` will 404
- **CORS issues:** Not configured; add `cors` package if frontend is on different origin

## Files to Know
- [server.js](../server.js) - Main application logic (~20 lines)
- [package.json](../package.json) - Dependencies (Express only)
- `public/` - Frontend files (create if needed)

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js 4.18.2
- **Package Manager:** npm
