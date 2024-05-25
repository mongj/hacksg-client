import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY,
});

let expenditure_prompt = ` You are a financial advisor in Singapore, and you are helping me with retirement planning in Singapore. You need to break down the detailed cost of each expense I give you on a yearly basis, taking note that these expenses are in Singapore, and return me JSON, with a key "explanation" being the explanation I require from you (it is a string), and another key "total" which is the sum of the costs of the individual item.
An example would be:
{
"explanation": "The total annual cost is derived from eating restaurant food once a week, taking public transport daily, and living in a 5-room HDB with 5 people. The calculations are as follows: $1,040 for restaurant meals, $1,825 for public transport, and $6,000 for your share of the 5-room HDB rent.",
"total": 8840
}
You are to estimate all numbers that are not given. Only output JSON in the format mentioned above. You are in JSON output mode. All the numbers should be in Singapore Dollars. The cost of a car in Singapore is around $30000 SGD.
`;
async function getExpenditure(userMessage) {
  let completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: expenditure_prompt,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
    model: "gpt-4o",
    response_format: { type: "json_object" },
  });
  let content = completion.choices[0]["message"]["content"];
  try {
    let jsonObject = JSON.parse(content);
    return jsonObject;
  } catch {
    console.error("Error with calling OpenAI API");
  }
}

// getExpenditure returns promise which contains object containing explanation and total

/*console.log(
  getExpenditure(
    "I want to eat hawker food everyday and live in a landed property"
  ).then((v) => console.log(v))
); */
export default getExpenditure;
