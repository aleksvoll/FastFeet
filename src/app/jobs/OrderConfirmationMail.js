import Mail from '../../lib/Mail';

class OrderConfirmationMail {
  get key() {
    return 'OrderConfirmationMail';
  }

  async handle({ data }) {
    const { newOrder } = data;
    await Mail.sendmail({
      to: `${newOrder.deliveryMan.name} <${newOrder.deliveryMan.email}>`,
      subject: 'Nova entrega disponível',
      template: 'orderConfirmationMail',
      context: {
        deliveryMan: newOrder.deliveryMan.name,
        recipientName: newOrder.recipient.name,
        recipientDirection: newOrder.recipient.direction,
        recipientComplement: newOrder.recipient.complement,
        recipientState: newOrder.recipient.state,
        recipientCity: newOrder.recipient.city,
        recipientZipCode: newOrder.recipient.zip_code,
        productName: newOrder.product.name,
        productDescription: newOrder.product.description,
        sender: newOrder.product.sender.name,
        senderEmail: newOrder.product.sender.email,
      },
    });
  }
}

export default new OrderConfirmationMail();
