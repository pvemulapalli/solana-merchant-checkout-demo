# Solana Merchant Checkout Demo

A merchant checkout prototype that simulates a real-world ecommerce purchase flow where a shopper sees product prices in USD and chooses to settle the transaction using a Solana wallet on Devnet.

---

## Project Summary

This demo was built to explore what blockchain-based payment rails look like from a merchant perspective.

The experience is intentionally framed like a normal ecommerce checkout:

- Shopper: April Summers  
- Merchant: Lilly's Boutique  
- Products priced in USD  
- Shipping, sales tax, and order summary included  
- Shopper chooses to pay using a connected Solana wallet  
- Payment is submitted and confirmed on Solana Devnet  

This project is designed as a practical merchant payments prototype, not a production-ready crypto checkout.

---

## What It Demonstrates

- Wallet-based checkout flow using Solana Devnet  
- Realistic ecommerce order experience with apparel products  
- USD-denominated pricing with approximate SOL settlement amount  
- Merchant-focused payment rail exploration  
- Visual proof of transaction confirmation and transaction signature  

---

## Why I Built It

I built this project to better understand where blockchain-based payment rails may fit alongside traditional merchant payment infrastructure.

My background is in payments, ecommerce, gateway integrations, tokenization, and enterprise sales engineering. This demo is part of a broader effort to explore how blockchain-based commerce may create value in real-world merchant flows.

---

## Tech Stack

- Next.js  
- React  
- Solana Web3.js  
- Solana Wallet Adapter  
- Phantom Wallet  
- Solana Devnet  

---

## Demo Notes

- Product prices are shown in USD  
- Payment is settled in SOL for this prototype  
- USD to SOL conversion is hardcoded for demo simplicity  
- This project uses Devnet only and does not use real funds  

---

## Local Setup

1. Install dependencies

npm install

2. Run the development server

npm run dev

3. Open the app

Open http://localhost:3000

---

## Wallet Setup

To test the checkout flow:

- Install the Phantom Wallet Chrome extension  
- Switch Phantom to Solana Devnet  
- Fund the wallet with test SOL using a Devnet faucet  
- Connect wallet in the app and complete the checkout flow  

---

## LinkedIn Demo Post

https://www.linkedin.com/posts/praveenvemulapalli_payments-fintech-blockchain-activity-7444024155689177088-79R0?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAAculQBHFIMlE-FVQ3KqO6XHFEjRkPJS-0

---

## Disclaimer

This is a prototype created for learning and demonstration purposes only. It is not production-ready and does not represent financial, legal, or security guidance.