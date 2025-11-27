# 🚀 Sassy_Talks

A modern, Zoom-style video-meeting web application built with **Next.js**, **Stream Video API**, and **Clerk Authentication**.

## 📌 Overview

**Sassy_Talks** is a fast, secure, and user-friendly video conferencing platform.
It allows users to **create meetings, join rooms, manage participants, and chat — just like Zoom**, but fully web-based and powered by Stream’s real-time video infrastructure.

Authentication and user management are handled via **Clerk**, providing seamless Sign-Up, Login, and Session control.

---

## 🛠️ Tech Stack

| Feature                  | Technology                                       |
| ------------------------ | ------------------------------------------------ |
| Framework                | **Next.js (App Router)**                         |
| Authentication           | **Clerk**                                        |
| Video + Audio + Meetings | **Stream Video API**                             |
| Styling                  | Your preferred styling (Tailwind / CSS / shadcn) |
| Deployment               | Vercel (recommended)                             |

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Ishaanvats74/SassyTalks.git
cd sassy_talks
```

### 2️⃣ Install dependencies

```bash
npm install
# or
yarn install
```

## ⚙️ Environment Variables  

Create a **.env.local** file in the root folder and add the following values:

```bash
# Clerk Authentication (Required)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Clerk Redirect URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Stream Video API (Required)
NEXT_PUBLIC_STREAM_API_KEY=
STREAM_SECRET_KEY=

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
---

## ▶️ Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open your browser at 👉 **[http://localhost:3000](http://localhost:3000)**

---


## ⭐ Features

### 🔐 **1. Authentication (Clerk)**

* User Sign-Up & Login
* Session handling
* User profiles & avatars

### 🎥 **2. Video Meetings (Stream API)**

* Create meetings
* Join meeting rooms
* Real-time audio/video
* Participant controls

### ⚡ **3. Modern UI**

* Fast, responsive layout
* Clean meeting dashboard
* Easy meeting creation flow

---

## 📘 Learn More

* Next.js Docs → [https://nextjs.org/docs](https://nextjs.org/docs)
* Clerk Auth Docs → [https://clerk.com/docs](https://clerk.com/docs)
* Stream Video API → [https://getstream.io/video/docs/](https://getstream.io/video/docs/)

---

## 🖐️ Contributing

Pull requests are welcome! If you want to contribute, feel free to open an issue.

