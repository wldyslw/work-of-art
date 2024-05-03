import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  #feedback = [];
  #liked = [];

  getFeedback() {
    return this.#feedback;
  }

  addFeedback(details = {}) {
    const { name, body } = details;
    const entry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      name,
      body,
    };
    this.#feedback.push(entry);
  }

  getLiked() {
    return this.#liked;
  }

  toggleLiked(entry) {
    console.log(entry, this.#liked);
    const index = this.#liked.indexOf(entry);
    if (index > -1) {
      this.#liked.splice(index, 1);
      return false;
    } else {
      this.#liked.push(entry);
      return true;
    }
  }
}
