import { Mistral } from "@mistralai/mistralai";

export default async function chat({
  apiKey,
  input,
  userName
}: {
  apiKey: string;
  input: string;
  userName: string
}) {
  const mistral = new Mistral({apiKey});
  const stream = await mistral.chat.stream({
    model: "mistral-small-latest",
    messages: [
      { role: "user", content: input },
      {
        role: "system",
        content: `Your name is Jarvis and you are a helpful assistant for a customer whose name is ${userName}, who's ready to explore the solar system using the spacex travel agency`,
      },
    ],
    stream: true,
  });

  return stream;
}
