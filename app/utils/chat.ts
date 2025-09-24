import OpenAI from "openai";

export default async function chat({
  apiKey,
  input,
}: {
  apiKey: string;
  input: string;
}) {
  const client = new OpenAI({ apiKey });
  const stream = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content: input },
      {
        role: "system",
        content: `You are a helpful assistant for a consumer who's ready to explore the solar system using the spacex travel agency`,
      },
    ],
    stream: true,
  });

  return stream;
}
