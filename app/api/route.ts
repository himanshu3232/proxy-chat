import chat from "../utils/chat"
import { NextApiRequest, NextApiResponse } from 'next'
 
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {apiKey, input} = req.body;
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': "no-store",
  })
  const response = chat({apiKey, input})
  for await (const chunk of await response) {
    res.write(`data: ${chunk}\n\n`)
  }
  res.end()
}