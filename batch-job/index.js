const CUSTOMER_ARG = '--customer';
const getInvoiceIdArg = (args) => {
  for (let i = 0; i < args.length; i++) {
    if (args[i] === CUSTOMER_ARG && i < args.length - 1) {
      return args[i + 1];
    }
  }
  return undefined;
};

const customerId = getInvoiceIdArg(process.argv);
if (customerId) {
  console.log(`Generating invoice for customer: ${customerId}`);
} else {
  console.error('Cannot generate invoice as no customer was provided.');
  process.exit(1);
}