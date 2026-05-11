async function run() {
  const res = await fetch("https://website-joyce-payroll-lived.trycloudflare.com/api/v1/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": "viet-tutor-secret-key-2024",
    },
    body: JSON.stringify({ message: "quiz present simple", user_id: "test-grammar-1" }),
  });
  const data = await res.text();
  console.log(data);
}
run();
