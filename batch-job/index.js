const AWS = require('aws-sdk');
const DateTime = require('luxon').DateTime;
const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: 'eu-central-1' });
const s3 = new AWS.S3({ region: 'eu-central-1' });

const CUSTOMER_ARG = '--customer';
const getInvoiceIdArg = (args) => {
  for (let i = 0; i < args.length; i++) {
    if (args[i] === CUSTOMER_ARG && i < args.length - 1) {
      return args[i + 1];
    }
  }
  return undefined;
};

const destinationS3Bucket = process.env.DESTINATION_BUCKET;
const customerId = getInvoiceIdArg(process.argv);
if (customerId) {
  console.log(`Generating invoice for customer: ${customerId}`);
  console.log(`Destination bucket: ${destinationS3Bucket}`);

  dynamoDb.get({
    TableName: 'batch.customer',
    Key: {
      id: customerId
    }
  }).promise()
    .then(response => {
      console.log(JSON.stringify(response));
      const customer = response.Item;
      const invoiceData = `
      Date: ${DateTime.local().toISODate()}
      Customer: ${customerId}
      Customer name: ${customer.name}
      Total spend: ${customer.totalSpend}`;

      return s3.putObject({
        Bucket: destinationS3Bucket,
        Key: `Invoice-${customerId}-${DateTime.local().toISODate()}.txt`,
        Body: invoiceData
      }).promise();
    }).then(() => console.log('Invoice generated successfully.'));
} else {
  console.error('Cannot generate invoice as no customer was provided.');
  process.exit(1);
}