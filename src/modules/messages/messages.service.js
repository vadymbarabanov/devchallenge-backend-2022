export default class MessagesService {
  messagesRepo;
  constructor(messagesRepo) {
    this.messagesRepo = messagesRepo;
  }

  sendMessage(body) {
    this.messagesRepo.sendMessage(body);
  }
}
