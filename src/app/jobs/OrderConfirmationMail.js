import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class OrderConfirmationMail {
  get key() {
    return 'OrderConfirmationMail';
  }

  handle({ data }) {}
}

export default new OrderConfirmationMail();
