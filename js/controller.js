const ChatController = ((model, view) => {
  async function handleSend() {
    let userMessage = view.getInput().trim();
    if (!userMessage) return;

    // Eliminar emojis del mensaje antes de buscar respuesta
    const cleanMessage = userMessage.replace(/[\p{Emoji}\u200d]+/gu, '').trim();

    view.appendMessage(userMessage, "user");
    const botReply = model.getResponse(cleanMessage);
    view.appendMessage(botReply, "IA bot");
    view.clearInput();
  }

  async function init() {
    await model.loadKnowledge();
    view.bindSend(handleSend);
  }

  return {
    init
  };
})(ChatModel, ChatView);

ChatController.init();

