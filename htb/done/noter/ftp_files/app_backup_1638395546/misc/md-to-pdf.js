const { mdToPdf } = require('md-to-pdf');


(async () => {
await mdToPdf({ content: process.argv[2] }, { dest: './misc/attachments/' + process.argv[3] + '.pdf'});
})();
