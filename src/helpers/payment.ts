type PayloadType = {
  first_name: string,
  last_name: string,
  email: string,
  currency: string,
  amount: string,
  tx_ref: string,
}

const PAYCHANGU_SECRET_KEY = process.env.PAYCHANGU_TEST_KEY as string

export async function initiatePayment(payload: PayloadType) {
  const response = await fetch(`https://api.paychangu.com/payment`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${PAYCHANGU_SECRET_KEY!}`,
    }
  })
  
  // @ts-ignore
  return response.json()
}

export async function verifyPayment(tx_ref: string) {
  const response = await fetch(`https://api.paychangu.com/verify-payment/${tx_ref}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${PAYCHANGU_SECRET_KEY!}`,
    }
  })
  
  // @ts-ignore
  return response.json()
}
