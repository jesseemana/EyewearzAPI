type PayloadType = {
  first_name: string,
  last_name: string,
  email: string,
  currency: string
  amount: string,
  tx_ref: string,
}

export type PaychanguResponseType = {
  message: string
  status: string
  data: {
    checkout_url: string
  }
}

const PAYCHANGU_SECRET_KEY = process.env.PAYCHANGU_TEST_KEY as string

export async function initiatePayment(payload: PayloadType) {
  return await fetch(`https://api.paychangu.com/payment`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${PAYCHANGU_SECRET_KEY!}`,
    }
  })
}

export async function verifyPayment(tx_ref: string) {
  return await fetch(`https://api.paychangu.com/verify-payment/${tx_ref}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${PAYCHANGU_SECRET_KEY!}`,
    }
  })
}
