// Mpesa API integration
export class MpesaAPI {
  constructor() {
    this.consumerKey = "your_consumer_key"
    this.consumerSecret = "your_consumer_secret"
    this.baseURL = "https://sandbox.safaricom.co.ke" // Use production URL for live
  }

  async getAccessToken() {
    const auth = btoa(`${this.consumerKey}:${this.consumerSecret}`)

    try {
      const response = await fetch(`${this.baseURL}/oauth/v1/generate?grant_type=client_credentials`, {
        method: "GET",
        headers: {
          Authorization: `Basic ${auth}`,
        },
      })

      const data = await response.json()
      return data.access_token
    } catch (error) {
      console.error("Error getting access token:", error)
      throw error
    }
  }

  async initiateSTKPush(phoneNumber, amount, accountReference, transactionDesc) {
    const accessToken = await this.getAccessToken()
    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, -3)
    const shortCode = "174379" // Test shortcode
    const passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"
    const password = btoa(shortCode + passkey + timestamp)

    const payload = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: shortCode,
      PhoneNumber: phoneNumber,
      CallBackURL: "https://your-domain.com/api/mpesa/callback",
      AccountReference: accountReference,
      TransactionDesc: transactionDesc,
    }

    try {
      const response = await fetch(`${this.baseURL}/mpesa/stkpush/v1/processrequest`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      return await response.json()
    } catch (error) {
      console.error("Error initiating STK push:", error)
      throw error
    }
  }
}

export const mpesa = new MpesaAPI()
