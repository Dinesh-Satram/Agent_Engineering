# 🧠 Agent Engineering – AI Poem Generator

This project was built as part of the Agent Engineering Bootcamp. It showcases a basic AI-powered application using **TypeScript**, **Next.js**, **Tailwind CSS**, and the **AI SDK** with OpenAI's `gpt-4o` model.

---

## ✨ Features

- 🌐 Built with Next.js 14 and TypeScript
- 🎨 Styled using Tailwind CSS
- 🧠 Integrated with OpenAI via the AI SDK
- 📜 Generates real-time AI poems about coding
- ⚡ Streams model responses for better UX

---

## 📦 Tech Stack

- **Frontend:** Next.js + TypeScript
- **Styling:** Tailwind CSS
- **AI Integration:** OpenAI via AI SDK
- **Language:** TypeScript
- **Package Manager:** PNPM

---

## 🚀 Getting Started

### 1. Create the project

```bash
npx create-next-app@latest my-project --typescript --tailwind --eslint
cd my-project
```

### 2. Install the AI SDK

```bash
pnpm install ai @ai-sdk/openai
```

---

## 🧠 Backend API Route

Create a file at: `app/api/chat/route.ts`

```ts
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
  });

  return result.toDataStreamResponse();
}
```

---

## 🎨 Frontend Component

Create a file at: `app/page.tsx`

```tsx
"use client";

import { useChat } from "ai/react";

export default function Chat() {
  const { messages, handleSubmit, isLoading } = useChat();

  const generatePoem = () => {
    handleSubmit(new Event("submit") as any, {
      data: {
        messages: [
          {
            role: "user",
            content: "Write a beautiful short poem about coding and AI",
          },
        ],
      },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">AI Poem Generator</h1>

      <button
        onClick={generatePoem}
        disabled={isLoading}
        className="w-full bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
      >
        {isLoading ? "Generating..." : "Generate a Poem"}
      </button>

      <div className="mt-6">
        {messages.map((m) => (
          <div key={m.id} className="mb-4">
            {m.role === "assistant" && (
              <div className="bg-gray-100 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap font-serif">
                  {m.content}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🔐 API Key Setup

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Copy your API key
3. Create a `.env.local` file in the root folder:
```bash
OPENAI_API_KEY=your-actual-api-key-here
```
4. Ensure `.env.local` is added to your `.gitignore` file to prevent exposure.

---

## 🧪 Testing the App

```bash
pnpm run dev
```

- Open [http://localhost:3000](http://localhost:3000)
- Click "Generate a Poem"
- You’ll see a real-time streamed response from GPT-4o ✨

---

## 📚 Resources

- [AI SDK Documentation](https://sdk.vercel.ai/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [OpenAI API Docs](https://platform.openai.com/docs)

---

## 👨‍💻 Author

**Dinesh Babu Satram**  
Let’s build agents that create magic ✨  
[GitHub](https://github.com/Dinesh-Satram)

---

## 🛡️ License

This project is licensed under the MIT License.
