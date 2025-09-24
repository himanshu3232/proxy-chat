import chat from '../utils/chat'; 

export const POST = async (req: Request) => {
  const { apiKey, input } = await req.json();

  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  const encoder = new TextEncoder();
  writer.write(encoder.encode('data: Starting stream\n\n'));

  const response = chat({ apiKey, input });
  for await (const chunk of await response) {
    writer.write(encoder.encode(`data: ${chunk}\n\n`));
  }

  writer.close();
  return new Response(stream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-store',
    },
  });
};