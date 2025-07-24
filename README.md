
# Multiplayer Pong React Client

⚠️ Work in progress

This React client application connects to a Node.js backend to provide a real-time multiplayer Pong game experience. It uses **Socket.IO** for websocket communication and a **custom state management system** inspired by my [ReactAsyncStateManagementWithWebworker](https://github.com/benjaminfkile/ReactAsyncStateManagementWithWebworker) to handle app state efficiently.

---

## Overview

- Connects to the backend via websocket to join the online player pool.
- Shows online players, challenges, and game invitations.
- Allows accepting or declining challenges.
- Manages the live Pong game view with real-time updates of ball and paddle positions.
- Uses a custom state management system with subscriptions and a web worker to update React state asynchronously.

---

## Architecture and State Management

### Custom State Manager

The app uses a custom **stateService** that:

- Maintains separate state slices for different UI parts (`appState`, `gameState`, `onlinePlayersState`, `myChallengesState`, `challengeAnswerState`).
- Uses immutable updates via a `mutate` function for consistency.
- Supports subscriptions where React components can subscribe to specific state slices.
- Offloads state updates and notifications to a **web worker** for asynchronous performance.
- Provides methods like `subscribe`, `unsubscribe`, `updateState`, and `manageSubscriptionAndStateUpdate` to manage state reactively.

This design reduces main-thread blocking and provides efficient granular state updates.

---

## Socket.IO Integration

The `socketService` client module manages websocket connection:

- Initiates connection on app start and emits `join_online` with a user ID (from `localStorage` or generated).
- Listens for server events like:
  - `receive_random_user_name` (to assign guest usernames),
  - `game_started` (to begin a Pong game),
  - `game_update` (real-time ball and paddle positions),
  - `game_over` and `score_update` (to show results).
- Sends events back to the server, including paddle position updates and heartbeats.

---

## Main Components

### `App`

- Root component that initializes socket connection and user service.
- Conditionally renders the online players list, challenges, challenge responses, or the active game screen.

### `OnlinePlayers`, `MyChallenges`, `ChallengeAnswer`

- UI components for browsing online users, managing outgoing challenges, and responding to incoming challenges.

### `Game`

- The gameplay interface showing paddles and ball.
- Subscribes to `gameState` and listens for socket events to update the UI.
- Captures mouse movements to send paddle updates to the server.
- Allows flipping the view horizontally.
- Shows game results at the end.

### UI Elements

- `Ball`, `Paddle1`, `Paddle2`: Visual components positioned using state.
- `GameResult`: Shows a Material UI dialog with win/loss and score info.

---

## How to Run

1. Clone this repository.

2. Run `npm install` to install dependencies.

3. Create a `.env` file in the root:

```
REACT_APP_API_URL=http://your-backend-url
REACT_APP_HEARTBEAT_INTERVAL=15000
```

4. Start the app with:

```
npm start
```

This will run the app in development mode, connecting to your backend server for gameplay.

---

## Notes

- This client relies on the backend’s API and websocket server to function correctly.
- User identity is stored in `localStorage` to persist sessions.
- The app uses a custom async state manager to keep UI performant and responsive.
- The project is a **work in progress** and may see significant updates.

---

## More Information

For details on the custom state manager, see [ReactAsyncStateManagementWithWebworker](https://github.com/benjaminfkile/ReactAsyncStateManagementWithWebworker).
