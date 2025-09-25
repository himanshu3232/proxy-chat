import chat from '../utils/chat'; 

export const POST = async (req: Request) => {
  const { apiKey, input } = await req.json();

  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  const encoder = new TextEncoder();

  const response = chat({ apiKey, input });
  
  for await (const chunk of await response) {
    const text = chunk.data.choices[0].delta.content;
    typeof text === "string" && writer.write(encoder.encode(`data: ${text}\n\n`));
  }

  writer.close();
  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-store',
    },
  });
};


