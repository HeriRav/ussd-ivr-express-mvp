import {
  processUssdMenu,
  type UssdReply
} from "../../domain/services/ussd-menu";

export class ProcessUssdRequest {
  execute(text: string): UssdReply {
    return processUssdMenu(text);
  }
}
