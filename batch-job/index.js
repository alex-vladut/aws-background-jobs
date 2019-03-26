const CUSTOMER_ARG = '-customer=';
const getInvoiceIdArg = (args) => {
  const invoiceIdArg = args.find(arg => arg.startsWith(CUSTOMER_ARG)) || CUSTOMER_ARG;
  return invoiceIdArg.substring(CUSTOMER_ARG.length);
};

const customerId = getInvoiceIdArg(process.argv);
if (customerId) {
  console.log(`Generating invoice for customer: ${customerId}`);
} else {
  console.error('Cannot generate invoice as no customer was provided.');
  process.exit(1);
}