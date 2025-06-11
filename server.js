// server.js (ES Module version)
import express from "express"
import fetch from "node-fetch"
import btoa from "btoa"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 3000

const consumerKey = process.env.CONSUMER_KEY
const consumerSecret = process.env.CONSUMER_SECRET
const baseURL = "https://sandbox.safaricom.co.ke"

app.post("/api/stkpush", async (req, res) => {
  const { phoneNumber, amount, accountReference, transactionDesc } = req.body
  const shortCode = "174379"
  const passkey = process.env.PASSKEY
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -3)
  const password = Buffer.from(shortCode + passkey + timestamp).toString("base64")
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64")

  try {
    const tokenResponse = await fetch(
      `${baseURL}/oauth/v1/generate?grant_type=client_credentials`,
      { headers: { Authorization: `Basic ${auth}` } }
    )
    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    const payload = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: shortCode,
      PhoneNumber: phoneNumber,
      CallBackURL: "https://your-ngrok-url.ngrok.io/api/mpesa/callback",
      AccountReference: accountReference,
      TransactionDesc: transactionDesc,
    }

    const stkResponse = await fetch(`${baseURL}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    const stkData = await stkResponse.json()
    res.json(stkData)
  } catch (err) {
    console.error("Error:", err)
    res.status(500).json({ error: "STK Push Failed" })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
