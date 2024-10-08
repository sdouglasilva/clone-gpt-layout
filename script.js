const resultado = document.querySelector("#result");
const userInput = document.querySelector("#userInput");

userInput.addEventListener("keypress", (e) => {
  if (userInput.value && e.key === "Enter") {
    SendQuestion();
  }
});

const OPENAI_API_KEY =
  "inserir sua chave de api";

function SendQuestion() {
  var question = userInput.value;
  let url = "https://api.openai.com/v1/completions";

  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: question },
      ],
      max_tokens: 2048,
      temperature: 0.5, // criatividade da resposta
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (resultado.value) resultado.value += "\n";

      if (json.error?.message) {
        resultado.value += `Error: ${json.error.message}`;
      } else if (json.choices?.[0].text) {
        var text = json.choices[0].text || "Sem resposta";
        resultado.value += "Chat GPT:" + text;
      }
      resultado.scrollTop = resultado.scrollHeight;
    })
    .catch((error) => console.error("Error:", error))
    .finally(() => {
      userInput.value = "";
      userInput.disable = false;
      userInput.focus();
    });
  if (resultado.value) resultado.value += "\n\n\n";
  resultado.value += `Eu:${question}`;
  userInput.value = "Carregando";
  userInput.disable = true;

  resultado.scrollTop = resultado.scrollHeight;
}
