import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY,
});

async function getIncomeGrowth(userMessage) {
  let completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are an expert economist regarding the labour market, and you are to tell me my expected yearly income growth (on average) when I tell you my age and my industry. You are to return me an exact value, being the income growth you expect, in JSON format, such as below, with values being interpreted as in %
{
"growth": 7
}
Ensure that you ONLY output JSON. Do not explain at all. 
`,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
    model: "gpt-4o",
    response_format: { type: "json_object" },
  });
  try {
    let jsonObject = JSON.parse(completion.choices[0]["message"]["content"]);
    let growth = jsonObject["growth"];
    console.log(growth);
    return growth;
  } catch {
    console.error("Error parsing JSON, OpenAI error");
  }
}
// this function returns a promise, get value using .then
// promise value is the growth rate
export default getIncomeGrowth;
