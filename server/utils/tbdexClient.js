export default async function getTbdexHttpClient() {
  // eslint-disable-next-line no-eval
  const module = await eval('import("@tbdex/http-client")');
  const modules = {
    TbdexHttpClient: module.TbdexHttpClient,
    Rfq: module.Rfq,
    Close: module.Close,
    Quote: module.Quote,
    Order: module.Order,
    OrderStatus: module.OrderStatus,
    Message: module.Message,
  };
  return modules;
}
