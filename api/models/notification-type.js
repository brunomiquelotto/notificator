const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
    {
      identificator: String,
      defaultTitle: String,
      defaultDescription: String,
      accountId: String,
      type: String,
    },
    { collection: "notification_type" }
  );
  
const NotificationType = mongoose.model("notification_type", notificationSchema);

module.exports = NotificationType;