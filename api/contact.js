// Vercel Serverless Function: envía el formulario de VELORIA a Discord.
// Configura DISCORD_WEBHOOK_URL en Vercel > Settings > Environment Variables.
module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido." });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("Falta la variable DISCORD_WEBHOOK_URL.");
    return res.status(500).json({ error: "El formulario no está configurado todavía." });
  }

  // Solo aceptar URLs oficiales de webhook de Discord.
  let parsedUrl;
  try {
    parsedUrl = new URL(webhookUrl);
  } catch {
    return res.status(500).json({ error: "Configuración del webhook inválida." });
  }
  if (
    parsedUrl.protocol !== "https:" ||
    !["discord.com", "discordapp.com"].includes(parsedUrl.hostname) ||
    !parsedUrl.pathname.includes("/api/webhooks/")
  ) {
    console.error("La URL configurada no parece un webhook válido de Discord.");
    return res.status(500).json({ error: "Configuración del webhook inválida." });
  }

  const body = req.body || {};
  const clean = (value, max) =>
    typeof value === "string"
      ? value.trim().replace(/@/g, "@\u200b").slice(0, max)
      : "";

  const nombre = clean(body.nombre, 100);
  const correo = clean(body.correo, 200);
  const asunto = clean(body.asunto, 150);
  const mensaje = clean(body.mensaje, 1800);

  if (!nombre || !correo || !asunto || !mensaje) {
    return res.status(400).json({ error: "Completa todos los campos." });
  }

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
  return res.status(400).json({
    error: "Escribe un correo electrónico válido."
  });
}

  const discordPayload = {
    username: "VELORIA PERFUMES",
    allowed_mentions: { parse: [] },
    embeds: [{
      title: "Nuevo mensaje desde VELORIA",
      color: 0x6F2DBD,
      fields: [
        { name: "Nombre", value: nombre, inline: true },
        { name: "Correo", value: correo, inline: true },
        { name: "Asunto", value: asunto },
        { name: "Mensaje", value: mensaje }
      ],
      footer: { text: "Formulario de contacto · VELORIA PERFUMES" },
      timestamp: new Date().toISOString()
    }]
  };

  try {
    const discordResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload)
    });

    if (!discordResponse.ok) {
      console.error("Discord webhook respondió con estado:", discordResponse.status);
      return res.status(502).json({ error: "Discord no pudo recibir el mensaje." });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Error conectando con Discord:", error);
    return res.status(502).json({ error: "No se pudo conectar con Discord." });
  }
};
