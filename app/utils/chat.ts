import { Mistral } from "@mistralai/mistralai";

export default async function chat({
  apiKey,
  input,
}: {
  apiKey: string;
  input: string;
}) {
  const mistral = new Mistral({apiKey});
  const stream = await mistral.chat.stream({
    model: "mistral-small-latest",
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
