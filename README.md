# Chatbot with WebSocket, React, Next.js, TailwindCSS

This project is a simple real-time chatbot application using WebSocket, React, Next.js, and TailwindCSS. It includes custom sounds for sent and received messages using Howler.js.

## Features

- Real-time communication via WebSocket.
- Unique channel generation using UUID.
- Modern and responsive user interface with TailwindCSS.
- Custom sounds for sending and receiving messages.

## Requirements

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/brayanquirozurrutia/chatbot-frontend.git
   cd chatbot-frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create the necessary directories for sounds and ensure to add the `send.mp3` and `receive.mp3` files in `public/sounds/`.

4. Set up a WebSocket server at `ws://localhost:8000/chat/ws/` (or adjust the URL as needed).

## Usage

1. Start the application:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open your browser at [http://localhost:3000](http://localhost:3000).

3. The app will generate a unique channel, and you can chat in real time.

## Project Structure

```
.
├── public/
│   ├── sounds/
│   │   ├── receive.mp3
│   │   └── send.mp3
├── src/
│   ├── app/
│   │   └── page.tsx
├── README.md
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── ...
```

## Technologies Used

- **React**: Library for building user interfaces.
- **Next.js**: Framework for React enabling server-side rendering.
- **TailwindCSS**: CSS framework for modern and responsive designs.
- **Howler.js**: Audio library for playing sounds.
- **UUID**: Universal unique identifier generator.
- **WebSocket**: Protocol for real-time communication.

## Customization

- Change the sounds: Replace the `send.mp3` and `receive.mp3` files in `public/sounds/`.
- Adjust the WebSocket server URL in `src/app/page.tsx`:

  ```typescript
  const socketInstance = new WebSocket(`ws://localhost:8000/chat/ws/${randomChannel}`);
  ```

- Modify the visual styles in `tailwind.config.js` or directly in the components.

---

## Author

Developed with ❤️ by [Brayan Nicolas Quiroz Urrutia](https://www.brayanquiroz.cl/).